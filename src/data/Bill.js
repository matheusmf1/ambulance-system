import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc, collection, query, getDocs, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, deleteObject, listAll } from "firebase/storage";

export class Bill {
  
  constructor ( { data, id, billType, file = false } ) {
    this.data = data;
    this.id = id;
    this.billType = billType;
    this.file = file;
  }

  addBillToFirebase = async () => {
    try {

      const refID = doc(db, "ids", `bills_${this.billType}` )
      const docSnap = await getDoc( refID );
  
      if ( !docSnap.exists() ) {
        await setDoc( doc( db, "ids", `bills_${this.billType}` ), { id: 0 } );
      }
      
      //Update id counter
      await updateDoc( doc( db, "ids", `bills_${this.billType}` ), { id: increment( 1 ) } );

      const idSnap = await getDoc( doc( db, "ids", `bills_${this.billType}` ) );
      const idData = idSnap.data();

      //Set new document id
      this.data['id'] = idData['id']

      if ( this.file ) {

        const fileData = this.file['file'];
        const fileID = this.file['fileID'];

        this.data[ fileID ] = fileData['name'];

        await this.uploadFile( fileData, fileID );
      }
      
      await setDoc( doc( db, `bills_${this.billType}`, `${this.data['id']}` ), this.data );
          
      return true
      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getBillFromFirebase = async () => {

    try {
      const docRef = doc( db, `bills_${this.billType}`, `${this.id}` );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateBillOnFirebase = async () => {
    try {
      const docRef = doc( db, `bills_${this.billType}`, `${this.id}` );

      if ( this.file ) {

        const fileData = this.file['file'];
        const fileID = this.file['fileID'];

        this.data[ fileID ] = fileData['name'];

        await this.uploadFile( fileData, fileID );
      }

      await updateDoc( docRef, this.data );
  
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteBillFromFirebase = async () => {
    try {
      await deleteDoc( doc( db, `bills_${this.billType}`, `/${this.id}` ) );
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }

  uploadFile = async ( file, fileID ) => {
    const storageRef = ref( storage, `bills_${this.billType}/${this.data['id']}/${fileID}/${file['name']}` );

    const deleteRef = ref(storage, `bills_${this.billType}/${this.data['id']}/${fileID}/` );
  
    await listAll( deleteRef ).then( ( listResult ) => {

      console.log( listResult )
      listResult.items.map( item => {
        deleteObject( item ).then( () => {
          console.log( 'Deletado' )
        })
        .catch((error) => {
          console.log( 'Erro' )
          console.error( error )
        });
      })

    }).catch( ( error ) => {
      console.log('Errrrroooooo')
      console.error( error )
    })


    await uploadBytes( storageRef, file ).then((snapshot) => {
      console.log( "Feito upload do arquivo" )
    });
  }

}