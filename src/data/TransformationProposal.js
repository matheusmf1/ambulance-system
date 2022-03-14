import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, deleteObject, listAll } from "firebase/storage";

export class TransformationProposal {

  constructor ( { data, id, type, file = false } ) {
    this.data = data;
    this.id = id;
    this.type = type;
    this.file = file;
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

      if ( this.file ) {

        const fileData = this.file['file'];
        const fileID = this.file['fileID'];

        await this.uploadFile( fileData, fileID );
      }

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
      
      if ( this.file ) {

        const fileData = this.file['file'];
        const fileID = this.file['fileID'];

        await this.uploadFile( fileData, fileID );
      }
      
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteTransformationProposalFromFirebase = async () => {
    try {
      
      const deleteRef = ref(storage, `${this.type}_transformationProposal/${this.id}` );

      const delete2 = async ( path ) => {

        await listAll( path ).then( ( dir ) => {
  
          dir.items.map( fileRef => {
            deleteObject( fileRef ).then( () => {
            })
            .catch((error) => {
              console.error( error )
            });
          });

          dir.prefixes.forEach( folderRef => delete2( folderRef ) )
    
          }).catch( ( error ) => {
          console.error( error )
        })
      }

      await delete2( deleteRef )

      await deleteDoc( doc( db, `${this.type}_transformationProposal`, `/${this.id}` ) );
      
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }

  uploadFile = async ( file, fileID ) => {
    const storageRef = ref( storage, `${this.type}_transformationProposal/${this.data['id']}/${file['name']}` );

    const deleteRef = ref(storage, `${this.type}_transformationProposal/${this.data['id']}/${fileID}/` );
  
    await listAll( deleteRef ).then( ( listResult ) => {

      listResult.items.map( item => {
        deleteObject( item ).then( () => {})
        .catch((error) => {
          console.error( error )
        });
      })

    }).catch( ( error ) => {
      console.log('Erro ao listar os objetos')
      console.error( error )
    })


    await uploadBytes( storageRef, file ).then((snapshot) => {
      console.log( "Feito upload do arquivo" )
    });
  }


}