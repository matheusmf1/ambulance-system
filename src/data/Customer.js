import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export class Customer {

  constructor ( { data, id } ) {
    this.data = data;
    this.id = id;
  }

  addCustomerToFirebase = async () => {
    try {

      const refID = doc(db, `users/${auth.currentUser.uid}/ids`, "customers")
      const docSnap = await getDoc( refID );
  
      if ( !docSnap.exists() ) {
        await setDoc( doc( db, `users/${auth.currentUser.uid}/ids`, "customers" ), { id: 0 } );
      }
      
      //Update id counter
      await updateDoc( doc( db, `users/${auth.currentUser.uid}/ids`, "customers"), { id: increment( 1 ) } );

      const idSnap = await getDoc( doc( db, `users/${auth.currentUser.uid}/ids`, "customers" ) );
      const idData = idSnap.data();

      //Set new document id
      this.data['id'] = idData['id']
      await setDoc( doc( db, `users/${auth.currentUser.uid}/customers`, `${this.data['id']}` ), this.data );
        
      return true
      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getCustomerFromFirebase = async () => {

    try {
      const docRef = doc( db, `users/${auth.currentUser.uid}/customers`, this.id );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateCustomerOnFirebase = async () => {
    try {
      const docRef = doc( db, `users/${auth.currentUser.uid}/customers`, this.id );
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteCustomerFromFirebase = async () => {
    try {
      await deleteDoc( doc( db, `users/${auth.currentUser.uid}/customers`, `/${this.id}` ) );
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }

}