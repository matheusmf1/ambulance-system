import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc, collection, query, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export class Bill {
  
  constructor ( { data, id, billType } ) {
    this.data = data;
    this.id = id;
    this.billType = billType;
  }

  addBillToFirebase = async () => {
    try {

      const refID = doc(db, "ids", `bills_${this.billType}` )
      const docSnap = await getDoc( refID );
  
      if ( !docSnap.exists() ) {
        await setDoc( doc( db, "ids", `bills_${this.billType}` ), { id: 0 } );
      }
      
      //Update id counter
      await updateDoc( doc( db, "ids", `bills_${this.billType}` ), { id: increment( 1 ) } );

      const idSnap = await getDoc( doc( db, "ids", `bills_${this.billType}` ) );
      const idData = idSnap.data();

      //Set new document id
      this.data['id'] = idData['id']
      await setDoc( doc( db, `bills_${this.billType}`, `${this.data['id']}` ), this.data );
      
      return true
      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getBillFromFirebase = async () => {

    try {
      const docRef = doc( db, `bills_${this.billType}`, this.id );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateBillOnFirebase = async () => {
    try {
      const docRef = doc( db, "customers", this.id );
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteBillFromFirebase = async () => {
    try {
      await deleteDoc( doc( db, "customers", `/${this.id}` ) );
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }


}