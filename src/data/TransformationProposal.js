import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export class TransformationProposal {

  constructor ( { data, id, type } ) {
    this.data = data;
    this.id = id;
    this.type = type;
  }

  addTransformationProposalToFirebase = async () => {
    try {

      const refID = doc(db, "ids", "transformationProposal")
      const docSnap = await getDoc( refID );
  
      if ( !docSnap.exists() ) {
        await setDoc( doc( db, "ids", "transformationProposal" ), { id: 0 } );
      }
      
      //Update id counter
      await updateDoc( doc( db, "ids", "transformationProposal" ), { id: increment( 1 ) } );

      const idSnap = await getDoc( doc( db, "ids", "transformationProposal" ) );
      const idData = idSnap.data();

      //Set new document id
      this.data['id'] = idData['id']

      await setDoc( doc( db, `${this.type}_transformationProposal`, `${this.data['id']}` ), this.data );
      
      return true
      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getTransformationProposalFromFirebase = async () => {

    try {
      const docRef = doc( db, `${this.type}_transformationProposal`, this.id );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateTransformationProposalOnFirebase = async () => {
    try {
      const docRef = doc( db, `${this.type}_transformationProposal`, this.id );
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteTransformationProposalFromFirebase = async () => {
    try {
      await deleteDoc( doc( db, `${this.type}_transformationProposal`, `/${this.id}` ) );
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }


}