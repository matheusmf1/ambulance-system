import {React, useState, useEffect} from 'react'
import {
  MailOutline,
  LocalPhone,
  Info,
  PhoneAndroid,
  Web
} from "@material-ui/icons";

import BusinessIcon from '@material-ui/icons/Business';
import userImage from '../../../assets/images/user.png'

import InputCpfCnpj from '../../../components/inputs/input--cpfCnpj';
import InputPhoneNumber from '../../../components/inputs/input--phoneNumber'
import InputCep from '../../../components/inputs/input--cep';

import { Supplier } from "../../../data/Supplier"


export default function SupplierInfo( props ) {

  const [ data, setData ] = useState( '' );
  const [ supplierData, setSupplierData ] = useState( '' );
  const [ idRef, setIdRef ] = useState( '' );

  useEffect( () => {

    let userID = props.match.params.id;

    if ( !data ) {
      fetchUserData( userID )
    }

  }, []);


  const fetchUserData = async ( id ) => {

    setIdRef( id )
    let billData = JSON.parse( localStorage.getItem( 'supplierInfo' ) );

    if ( billData ) {

      if ( billData['id'].toString() !== id.toString() ) {

        console.log( "Feching data from firebase" )

        const supplier = new Supplier( { id: id } )
        const supplierData = await supplier.getSupplierFromFirebase();

        if ( supplierData ) {
          setData( supplierData )
          setSupplierData( supplierData )
        }
        else {
          alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
          window.close();
        }
 
      }
      else {
        setData( billData )
        setSupplierData( billData )
      }
    } 
    else {
      console.log( "Feching data from firebase after updating" )
  
      const supplier = new Supplier( { id: id } )
      const supplierData = await supplier.getSupplierFromFirebase();

      if ( supplierData ) {
        setData( supplierData )
        setSupplierData( supplierData )
      }
      else {
        alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
        window.close();
      }
    }

  }

  const handleInformationChange = ( id ) => ( e ) => {
    setSupplierData( { ...supplierData, [id]: e.target.value } )
  }

  const checkCep = ( e ) => {

    let cep = e.target.value.replace( /\D/g, '' );
    
    setSupplierData( { ...supplierData, "cep": cep } );

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
          setSupplierData( { ...supplierData, "cep": cep, "address": data['logradouro'], "neighborhood": data['bairro'], "city": data['localidade'], "state": data['uf'] } );
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

    const supplier = new Supplier( { data: supplierData, id: idRef } )
    const result = await supplier.updateSupplierOnFirebase();

    if ( result ) {
      alert( "Fornecedor atualizado com sucesso" )
      localStorage.removeItem( 'supplierInfo' )
      window.location.reload()
    }

    else {
      alert( "Algo deu errado ao atualizar as informações. Por favor verifique todas as informações e tente novamente." )
    }
  }


  return (
    <main className="user">

      <div className="userTitleContainer">
        <h1 className="userTitle">Editar Fornecedor</h1>
        <button onClick={handleSubmit} className="userUpdateButton">Atualizar</button>
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

            <span className="userShowTitle">Informações do Fornecedor</span>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">CNPJ:</h6> 
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

            <div className="userShowInfo">
              <Web className="userShowIcon" />
          
              <a className="userShowInfoTitle" href={`http://${data.site}`} target="_blank" rel="noopener noreferrer">
                {/* { data.site != "" ? data.site : 'Campo não informado' } */}
                { data.site }
              </a>
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
          
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            
            <div className="userUpdateLeft">
              
              <div className="userUpdateItem">
                <label>Responsável</label>
                <input
                  type="text"
                  defaultValue={ supplierData.responsable }
                  className="userUpdateInput"
                  onChange={handleInformationChange('responsable')}
                />
              </div>

              <div className="userUpdateItem">
                <label>CPF/CNPJ</label>
                <InputCpfCnpj defaultValue={ supplierData.cnpj_cpf } className="userUpdateInput" onChange={handleInformationChange('cnpj_cpf')}/>
              </div>

              <div className="userUpdateItem">
                <label>Celular</label>
                <InputPhoneNumber mask="(99) 99999-9999" defaultValue={ supplierData.mobile } className="userUpdateInput" onChange={handleInformationChange('mobile')}/>
              </div>

              <div className="userUpdateItem">
                <label>CEP</label>
                <InputCep defaultValue={ supplierData.cep } className="userUpdateInput" onChange={checkCep} />
              </div>

              <div className="userUpdateItem">
                <label>Complemento</label>
                <input
                  type="text"
                  defaultValue={ supplierData.aditionalInformation }
                  className="userUpdateInput"
                  onChange={handleInformationChange('aditionalInformation')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Cidade</label>
                <input
                  type="text"
                  defaultValue={ supplierData.city }
                  className="userUpdateInput"
                  onChange={handleInformationChange('city')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Estado</label>
                <select name="estados-brasil" className="userUpdateInput" value={ supplierData.state } onChange={handleInformationChange('state')}>
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
                  defaultValue={ supplierData.contact }
                  className="userUpdateInput"
                  onChange={handleInformationChange('contact')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  defaultValue={ supplierData.email }
                  className="userUpdateInput"
                  onChange={handleInformationChange('email')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Telefone</label>
                <InputPhoneNumber mask="(99) 9999-9999" defaultValue={ supplierData.telephone } className="userUpdateInput" onChange={handleInformationChange('telephone')}/>
              </div>

              <div className="userUpdateItem">
                <label>Endereço</label>
                <input
                  type="text"
                  defaultValue={ supplierData.address }
                  className="userUpdateInput"
                  onChange={handleInformationChange('address')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Número</label>
                <input
                  type="text"
                  defaultValue={ supplierData.addressNumber }
                  className="userUpdateInput"
                  onChange={handleInformationChange('addressNumber')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Bairro</label>
                <input
                  type="text"
                  defaultValue={ supplierData.neighborhood }
                  className="userUpdateInput"
                  onChange={handleInformationChange('neighborhood')}
                />
              </div>
            </div>

            <div className="userUpdateItem--textArea">            
              <label className="form__input--label">Informações adicionais</label>
              <textarea
                className="form__input"
                rows="2"
                defaultValue={supplierData.moreInfo}
                onChange={handleInformationChange('moreInfo')}></textarea>          
            </div>

          </form> 
        </div>    
    </div>
 
  </main>

  )
}