import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

export class Customer {

  // constructor (
  //   id, responsable, contact, corporate_name, fantasy_name,cnpj_cpf, email,
  //   telephone, mobile, cep, address, addressNumber, aditionalInformation, 
  //   neighborhood, city, state, moreInfo ) {
  //   this.id = id;
  //   this.responsable = responsable;
  //   this.contact = contact;
  //   this.corporate_name = corporate_name;
  //   this.fantasy_name = fantasy_name;
  //   this.cnpj_cpf = cnpj_cpf;
  //   this.email = email;
  //   this.telephone = telephone;
  //   this.mobile = mobile;
  //   this.cep = cep;
  //   this.address = address;
  //   this.addressNumber = addressNumber;
  //   this.aditionalInformation = aditionalInformation;
  //   this.neighborhood = neighborhood;
  //   this.city = city;
  //   this.state = state;
  //   this.moreInfo = moreInfo;
  // }


  constructor ( data ) {
    this.data = data;
  }

  addCustomerToFirebase = async () => {
    try {
      //Update id counter
      await updateDoc( doc( db, "ids", "customers"), { id: increment( 1 ) } );

      const idSnap = await getDoc( doc( db, "ids", "customers" ) );
      const idData = idSnap.data();

      //Set new document id
      this.data['id'] = idData['id']
      await setDoc( doc( db, "customers", `${this.data['id']}` ), this.data );
      
      return true
      
    } catch (error) {
      console.error( error )
      alert( "Algo deu errado ao salvar as informações" )
      return false
    }
  }


}