import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export class ProductSale {

  constructor ( { data, id, type } ) {
    this.data = data;
    this.id = id;
    this.type = type;
  }

  addProductSaleToFirebase = async () => {
    try {

      const refID = doc(db, "ids", "productsSale")
      const docSnap = await getDoc( refID );
  
      if ( !docSnap.exists() ) {
        await setDoc( doc( db, "ids", "productsSale" ), { id: 0 } );
      }
      
      //Update id counter
      await updateDoc( doc( db, "ids", "productsSale" ), { id: increment( 1 ) } );

      const idSnap = await getDoc( doc( db, "ids", "productsSale" ) );
      const idData = idSnap.data();

      //Set new document id
      this.data['id'] = idData['id']

      //Necessary to convert to string because it has a function inside of its properties
      //Remember to convert to json when fetch data
      let { tableDataProdutos, ...data } = this.data      
      tableDataProdutos = JSON.stringify( tableDataProdutos )

      let obj = {
        ...data,
        "tableDataProdutos": tableDataProdutos
      }

      await setDoc( doc( db, `${this.type}_productsSale`, `${this.data['id']}` ), obj );
      
      return true
      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getProductSaleFromFirebase = async () => {

    try {
      const docRef = doc( db, `${this.type}_productsSale`, this.id );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateProductSaleOnFirebase = async () => {
    try {
      const docRef = doc( db, `${this.type}_productsSale`, this.id );
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteProductSaleFromFirebase = async () => {
    try {
      await deleteDoc( doc( db, `${this.type}_productsSale`, `/${this.id}` ) );
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }


}