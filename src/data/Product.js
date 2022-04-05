import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export class Product {

  constructor ( { data, id } ) {
    this.data = data;
    this.id = id;
  }

  addProductToFirebase = async () => {
    try {

      const refDoc = doc(db, `users/${auth.currentUser.uid}/products`, `${this.id}` )
      const docSnap = await getDoc( refDoc );
  
      if ( !docSnap.exists() ) {
        await setDoc( doc( db, `users/${auth.currentUser.uid}/products`, `${this.id}` ), this.data );
        return true;
      }

      else {
        alert( "Já existe um produto com essa etiqueta. Por favor verifique o código da etiqueta ou vá em editar para alterar suas informações." )
        return false
      }

      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getProductFromFirebase = async () => {

    try {
      const docRef = doc( db, `users/${auth.currentUser.uid}/products`, `${this.id}` );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateProductOnFirebase = async () => {
    try {
      const docRef = doc( db, `users/${auth.currentUser.uid}/products`, `${this.id}` );
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteProductFromFirebase = async () => {
    try {
      await deleteDoc( doc( db, `users/${auth.currentUser.uid}/products`, `/${this.id}` ) );
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }
}