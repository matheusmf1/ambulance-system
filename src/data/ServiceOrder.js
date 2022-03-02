import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export class ServiceOrder {

  constructor ( { data, id, type } ) {
    this.data = data;
    this.id = id;
    this.type = type;
  }

  addServiceOrderToFirebase = async () => {
    try {

      const refID = doc(db, "ids", "serviceOrder")
      const docSnap = await getDoc( refID );
  
      if ( !docSnap.exists() ) {
        await setDoc( doc( db, "ids", "serviceOrder" ), { id: 0 } );
      }
      
      //Update id counter
      await updateDoc( doc( db, "ids", "serviceOrder" ), { id: increment( 1 ) } );

      const idSnap = await getDoc( doc( db, "ids", "serviceOrder" ) );
      const idData = idSnap.data();

      //Set new document id
      this.data['id'] = idData['id']

      //Necessary to convert to string because it has a function inside of its properties
      //Remember to convert to json when fetch data
      let { tableDataProdutos, tableDataServicos, ...data } = this.data      
      tableDataProdutos = JSON.stringify( tableDataProdutos )
      tableDataServicos = JSON.stringify( tableDataServicos )

      let obj = {
        ...data,
        "tableDataProdutos": tableDataProdutos,
        "tableDataServicos": tableDataServicos
      }

      await setDoc( doc( db, `${this.type}_serviceOrder`, `${this.data['id']}` ), obj );
      
      return true
      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getServiceOrderFromFirebase = async () => {

    try {
      const docRef = doc( db, `${this.type}_serviceOrder`, this.id );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateServiceOrderOnFirebase = async () => {
    try {
      const docRef = doc( db, `${this.type}_serviceOrder`, this.id );
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteServiceOrderFromFirebase = async () => {
    try {
      await deleteDoc( doc( db, `${this.type}_serviceOrder`, `/${this.id}` ) );
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }


}