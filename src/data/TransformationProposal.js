import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

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
      this.data['id'] = idData['id'];

      let file = this.data[ 'information_file' ]
      this.data[ 'information_file' ] = file['name']

      await setDoc( doc( db, `${this.type}_transformationProposal`, `${this.data['id']}` ), this.data );
      await this.uploadFile( file )
      
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

  uploadFile = async ( file ) => {
    const storageRef = ref( storage, `${this.type}_transformationProposal/${file['name']}` );

    await uploadBytes( storageRef, file ).then((snapshot) => {
      console.log( "Feito upload do arquivo" )
    });
  }


}