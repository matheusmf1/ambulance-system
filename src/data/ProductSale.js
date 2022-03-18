import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export class ProductSale {

  constructor ( { data, id } ) {
    this.data = data;
    this.id = id;
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

      if ( this.data['mainService'] === "orcamento" && this.data['status'] === "aprovado" ) {
        this.data['mainService'] = "venda";
      }

      await setDoc( doc( db, `orcamento_venda_productsSale`, `${this.data['id']}` ), this.data );
      
      return true
      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getProductSaleFromFirebase = async () => {

    try {
      const docRef = doc( db, `orcamento_venda_productsSale`, `${this.id}` );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateProductSaleOnFirebase = async () => {
    try {
      const docRef = doc( db, `orcamento_venda_productsSale`, `${this.id}` );

      if ( this.data['mainService'] === "orcamento" && this.data['status'] === "aprovado" ) {
        this.data['mainService'] = "venda";
      }
      
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteProductSaleFromFirebase = async () => {
    try {
      await deleteDoc( doc( db, `orcamento_venda_productsSale`, `/${this.id}` ) );
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }


}