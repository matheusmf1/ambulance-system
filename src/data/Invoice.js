import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, storage, auth } from "../firebase";
import { ref, uploadBytes, deleteObject, listAll } from "firebase/storage";

export class Invoice {

  constructor ( { data, id, invoiceType, file = false } ) {
    this.data = data;
    this.id = id;
    this.invoiceType = invoiceType;
    this.file = file;
  }

  addInvoiceToFirebase = async () => {
    try {

      const refDoc = doc(db, `users/${auth.currentUser.uid}/invoices`, `${this.id}` )
      const docSnap = await getDoc( refDoc );
  
      if ( !docSnap.exists() ) {
        
        if ( this.file ) {
          const fileData = this.file['file'];
          await this.uploadFile( fileData );
        }

        await setDoc( doc( db, `users/${auth.currentUser.uid}/invoices`, `${this.id}` ), this.data );
        return true;

      }
      else {
        alert( "Já existe uma nota fiscal cadastrada com esse número. Por favor verifique o número da nota ou vá em editar para alterar suas informações." )
        return false
      }
      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getInvoiceFromFirebase = async () => {

    try {
      const docRef = doc( db, `users/${auth.currentUser.uid}/invoices`, `${this.id}` );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateInvoiceOnFirebase = async () => {
    try {
      const docRef = doc( db, `users/${auth.currentUser.uid}/invoices`, `${this.id}` );
      
      if ( this.file ) {
        const fileData = this.file['file'];
        await this.uploadFile( fileData );
      }
      
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteInvoiceFromFirebase = async () => {
    try {
      
      const deleteRef = ref(storage, `${auth.currentUser.uid}/invoices/${this.invoiceType}/${this.id}` );      

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

      await deleteDoc( doc( db, `users/${auth.currentUser.uid}/invoices`, `/${this.id}` ) );
      
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }

  uploadFile = async ( file ) => {
    const storageRef = ref( storage, `${auth.currentUser.uid}/invoices/${this.data['invoice_type']}/${this.data['id']}/${file['name']}` );

    const deleteRef = ref(storage, `${auth.currentUser.uid}/invoices/${this.data['invoice_type']}/${this.data['id']}/` );
  
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