import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export class CalendarData {

  constructor ( { data } ) {
    this.data = data;
  }

  addCalendarToFirebase = async () => {
    try {

      const docRef = doc(db, "calendar", "data" );
      const docSnap = await getDoc( docRef );
  
      if ( !docSnap.exists() ) {
        // console.log( 'Nao existe, criando calendar no firebase' )
        await setDoc( docRef, this.data );
      }
      else {
        // console.log( 'Atualizando calendar no firebase' );
        await updateDoc( docRef, this.data );
      }   
      
      return true;
      
    } catch (error) {
      console.error( error )
      return false
    }
  }

}