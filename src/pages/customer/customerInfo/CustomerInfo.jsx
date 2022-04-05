import {React, useState, useEffect} from 'react';
import {
  MailOutline,
  LocalPhone,
  Info,
  PhoneAndroid,
} from "@material-ui/icons";

import "./customerInfo.css";

import BusinessIcon from '@material-ui/icons/Business';

import userImage from '../../../assets/images/user.png'

import InputCpfCnpj from '../../../components/inputs/input--cpfCnpj';
import InputPhoneNumber from '../../../components/inputs/input--phoneNumber'
import InputCep from '../../../components/inputs/input--cep';
import { Customer } from "../../../data/Customer";


export default function CustomerInfo( props ) {

  const [ data, setData ] = useState( '' );
  const [ customerData, setCustomerData ] = useState( '' );
  const [ idRef, setIdRef ] = useState( '' );
  const [ isLoading, setIsLoading ] = useState( false );

  useEffect( () => {

    let userID = props.match.params.id;

    if ( !data ) {
      fetchUserData( userID )
    }

  }, []);

  const fetchUserData = async ( id ) => {

    setIdRef( id )
    let billData = JSON.parse( localStorage.getItem( 'customerInfo' ) );

    if ( billData ) {

      if ( billData['id'].toString() !== id.toString() ) {

        console.log( "Feching data from firebase" )

        const customer = new Customer( { id: id } )
        const customerData = await customer.getCustomerFromFirebase();

        if ( customerData ) {
          setData( customerData )
          setCustomerData( customerData )
        }
        else {
          alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
          window.close();
        }
 
      }
      else {
        setData( billData )
        setCustomerData( billData )
      }
    } 
    else {
      console.log( "Feching data from firebase after updating" )
  
      const customer = new Customer( { id: id } )
      const customerData = await customer.getCustomerFromFirebase();

      if ( customerData ) {
        setData( customerData )
        setCustomerData( customerData )
      }
      else {
        alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
        window.close();
      }
    }

  }

  const handleInformationChange = ( id ) => ( e ) => {
    setCustomerData( { ...customerData, [id]: e.target.value } )    
  }


  const checkCep = ( e ) => {

    let cep = e.target.value.replace( /\D/g, '' );
    console.log( cep )
    
    setCustomerData( { ...customerData, "cep": cep } );


    if ( cep.length === 8 ) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then( response => {
        if (response.ok)
          return response.json()
      })
      .then( data => {
        if ( data.erro ) {
          throw new Error( "Não foi possível encontrar o CEP informado, por favor tente novamente" )
        }
        else {
          console.log( data )
          setCustomerData( { ...customerData, "cep": cep, "address": data['logradouro'], "neighborhood": data['bairro'], "city": data['localidade'], "state": data['uf'] } );
        }
      })
      .catch( error => {
        console.error( error )
        alert( 'Não foi possível encontrar o CEP informado, por favor tente novamente' )
      })
    }

  }

  const handleSubmit = async ( e ) => {

    e.preventDefault();
    setIsLoading( true );

    const customer = new Customer( { data: customerData, id: idRef } )
    const result = await customer.updateCustomerOnFirebase();

    if ( result ) {
      alert( "Cliente atualizado com sucesso" );
      localStorage.removeItem( 'customerInfo' );
      window.location.reload();
    }

    else {
      alert( "Algo deu errado ao atualizar as informações. Por favor verifique todas as informações e tente novamente." );
      setIsLoading( false );
    }
  }

  return (
    <main className="user">

      <div className="userTitleContainer">
        <h1 className="userTitle">Editar Cliente</h1>
        <button onClick={handleSubmit} disabled={isLoading} className="userUpdateButton">Atualizar</button>
      </div>

      <div className="userContainer">
      
        <div className="userShow">
          
          <div className="userShowTop">
            <img
              src={userImage}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">Contato: { data.contact } </span>
              <span className="userShowUsername">Responsável: { data.responsable } </span>
              <span className="userShowUserTitle">Código: { data.id }</span>
            </div>
          </div>
          
          <div className="userShowBottom">

            <span className="userShowTitle">Informações do Cliente</span>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Nome Fantasia</h6> 
              <span className="userShowInfoTitle">{ data.fantasy_name }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Razão Social</h6> 
              <span className="userShowInfoTitle">{ data.corporate_name }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">CNPJ</h6> 
              <span className="userShowInfoTitle">{ data.cnpj_cpf }</span>
            </div>

            <div className="userShowInfo">
              <LocalPhone className="userShowIcon" />
              <span className="userShowInfoTitle">{ data.telephone }</span>
            </div>
            
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{ data.mobile }</span>
            </div>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{ data.email }</span>
            </div>


            <span className="userShowTitle">Endereço</span>

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle"><h6 className="userShowInfoTitle--Subtitle">CEP:</h6> { data.cep }</span>
            </div>            

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle"><h6 className="userShowInfoTitle--Subtitle">Endereço:</h6> { data.address }, { data.addressNumber }</span>
            </div>

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle"><h6 className="userShowInfoTitle--Subtitle">Complemento:</h6> { data.aditionalInformation }</span>
            </div>

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle"><h6 className="userShowInfoTitle--Subtitle">Bairro:</h6> { data.neighborhood }</span>
            </div>


            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle"><h6 className="userShowInfoTitle--Subtitle">Cidade/Estado:</h6> { data.city } - { data.state }</span>
            </div>

            <span className="userShowTitle">Informações Adicionais</span>

            <div className="userShowInfo">
              <Info className="userShowIcon" />
              <span className="userShowInfoTitle">{ data.moreInfo } </span>
            </div>

          </div>
        </div>
      
        <div className="userUpdate">

          <span className="userUpdateTitle">Editar</span>
          
          <form onSubmit={handleSubmit} className="userUpdateForm">
            
            <div className="userUpdateLeft">
              
              <div className="userUpdateItem">
                <label>Responsável</label>
                <input
                  type="text"
                  defaultValue={ customerData.responsable }
                  className="userUpdateInput"
                  onChange={handleInformationChange('responsable')}
                />
              </div>
              
              <div className="userUpdateItem">
                <label>CPF/CNPJ</label>
                <InputCpfCnpj defaultValue={ customerData.cnpj_cpf } className="userUpdateInput" onChange={handleInformationChange('cnpj_cpf')}/>
              </div>

              <div className="userUpdateItem">
                <label>Razão Social</label>
                <input
                  type="text"
                  defaultValue={ customerData.corporate_name }
                  className="userUpdateInput"
                  onChange={handleInformationChange('corporate_name')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Telefone</label>
                <InputPhoneNumber mask="(99) 9999-9999" defaultValue={ customerData.telephone } className="userUpdateInput" onChange={handleInformationChange('telephone')}/>
              </div>

              <div className="userUpdateItem">
                <label>CEP</label>
                <InputCep defaultValue={ customerData.cep } className="userUpdateInput" onChange={ checkCep } />
              </div>

              <div className="userUpdateItem">
                <label>Número</label>
                <input
                  type="text"
                  defaultValue={ customerData.addressNumber }
                  className="userUpdateInput"
                  onChange={handleInformationChange('addressNumber')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Bairro</label>
                <input
                  type="text"
                  defaultValue={ customerData.neighborhood }
                  className="userUpdateInput"
                  onChange={handleInformationChange('neighborhood')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Estado</label>
                <select name="estados-brasil" className="userUpdateInput" value={ customerData.state } onChange={handleInformationChange('state')}>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                </select>
              </div>

            </div>

            <div className="userUpdateRight--singleItem">

              <div className="userUpdateItem">
                <label>Contato</label>
                <input
                  type="text"
                  defaultValue={ customerData.contact }
                  className="userUpdateInput"
                  onChange={handleInformationChange('contact')}
                />
              </div>
              
              <div className="userUpdateItem">
                <label>Nome Fantasia</label>
                <input
                type="text"
                defaultValue={ customerData.fantasy_name }
                className="userUpdateInput"
                  onChange={handleInformationChange('fantasy_name')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  defaultValue={ customerData.email }
                  className="userUpdateInput"
                  onChange={handleInformationChange('email')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Celular</label>
                <InputPhoneNumber mask="(99) 99999-9999" defaultValue={ customerData.mobile } className="userUpdateInput" onChange={handleInformationChange('mobile')}/>
              </div>
             
              <div className="userUpdateItem">
                <label>Endereço</label>
                <input
                  type="text"
                  defaultValue={ customerData.address }
                  className="userUpdateInput"
                  onChange={handleInformationChange('address')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Complemento</label>
                <input
                  type="text"
                  defaultValue={ customerData.aditionalInformation }
                  className="userUpdateInput"
                  onChange={handleInformationChange('aditionalInformation')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Cidade</label>
                <input
                  type="text"
                  defaultValue={ customerData.city }
                  className="userUpdateInput"
                  onChange={handleInformationChange('city')}
                />
              </div>
                 
            </div>

              <div className="userUpdateItem--textArea">            
                <label className="form__input--label">Informações adicionais</label>
                <textarea className="form__input" rows="2" defaultValue={ customerData.moreInfo } onChange={handleInformationChange('moreInfo')}></textarea>          
              </div>

          </form> 

        </div>
    
      </div>
 
  </main>

  )
}