import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export class CalendarData {

  constructor ( { data } ) {
    this.data = data;
  }

  addCalendarToFirebase = async () => {
    try {

      const docRef = doc(db, `users/${auth.currentUser.uid}/calendar`, "data" );
      const docSnap = await getDoc( docRef );
  
      if ( !docSnap.exists() ) {
        await setDoc( docRef, this.data );
      }
      else {
        await updateDoc( docRef, this.data );
      }   
      
      return true;
      
    } catch (error) {
      console.error( error )
      return false
    }
  }

}