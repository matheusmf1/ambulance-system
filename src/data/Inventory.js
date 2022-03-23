import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export class Inventory {

  constructor ( { data, id } ) {
    this.data = data;
    this.id = id;
  }

  addMaterialInventoryToFirebase = async () => {
    try {

      const refDoc = doc(db, "inventory", `${this.id}` )
      const docSnap = await getDoc( refDoc );
  
      if ( !docSnap.exists() ) {
        await setDoc( doc( db, "inventory", `${this.id}` ), this.data );
        return true;
      }

      else {
        alert( "Já existe um produto com esse código para esse fornecedor. Por favor verifique o código do produto, ou vá em editar para alterar suas informações." )
        return false
      }

      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getMaterialInventoryFromFirebase = async () => {

    try {
      const docRef = doc( db, "inventory", `${this.id}` );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateMaterialInventoryOnFirebase = async () => {
    try {
      const docRef = doc( db, "inventory", `${this.id}` );
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteMaterialInventoryFromFirebase = async () => {
    try {
      await deleteDoc( doc( db, "inventory", `/${this.id}` ) );
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }

  incrementMaterialInventoryOnFirebase = async () => {}

  dicrementMaterialInventoryOnFirebase = async () => {}

}