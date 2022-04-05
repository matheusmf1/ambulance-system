import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export class Employee {

  constructor ( { data, id } ) {
    this.data = data;
    this.id = id;
  }

  addEmployeeToFirebase = async () => {
    try {

      const refID = doc(db, `users/${auth.currentUser.uid}/ids`, "employees")
      const docSnap = await getDoc( refID );
  
      if ( !docSnap.exists() ) {
        await setDoc( doc( db, `users/${auth.currentUser.uid}/ids`, "employees" ), { id: 0 } );
      }
      
      //Update id counter
      await updateDoc( doc( db, `users/${auth.currentUser.uid}/ids`, "employees"), { id: increment( 1 ) } );

      const idSnap = await getDoc( doc( db, `users/${auth.currentUser.uid}/ids`, "employees" ) );
      const idData = idSnap.data();

      //Set new document id
      this.data['id'] = idData['id']
      await setDoc( doc( db, `users/${auth.currentUser.uid}/employees`, `${this.data['id']}` ), this.data );
      
      return true
      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getEmployeeFromFirebase = async () => {

    try {
      const docRef = doc( db, `users/${auth.currentUser.uid}/employees`, this.id );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateEmployeeOnFirebase = async () => {
    try {
      const docRef = doc( db, `users/${auth.currentUser.uid}/employees`, this.id );
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteEmployeeFromFirebase = async () => {
    try {
      await deleteDoc( doc( db, `users/${auth.currentUser.uid}/employees`, `/${this.id}` ) );
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }
}