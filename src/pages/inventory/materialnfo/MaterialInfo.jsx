import {React, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { db } from '../../../firebase';
import { collection, getDocs, query, orderBy, limit  } from 'firebase/firestore';
import { Inventory } from "../../../data/Inventory";


export default function MaterialInfo( props ) {

  const [ data, setData ] = useState( '' );
  const [ idRef, setIdRef ] = useState( '' );
  const [ codProduto, setCodProduto ] = useState( '' );

  useEffect( () => {

    let userID = props.match.params.id;

    if ( !data ) {
      fetchUserData( userID )
    }

  }, []);

  const fetchUserData = async ( id ) => {

    setIdRef( id )
    let fetchData = JSON.parse( localStorage.getItem( 'materialInfo' ) );

    if ( fetchData ) {

      if ( fetchData['id'].toString() !== id.toString() ) {

        console.log( "Feching data from firebase" )

        const inventory = new Inventory( { id: id } )
        const inventoryData = await inventory.getMaterialInventoryFromFirebase();

        if ( inventoryData ) {
          setData( inventoryData )
          setCodProduto( inventoryData['id'].split( '_' )[1] )
        }
        else {
          alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
          window.close();
        }
 
      }
      else {
        setData( fetchData )
        setCodProduto( fetchData['id'].split( '_' )[1] )
      }
    } 
    else {
      console.log( "Feching data from firebase after updating" )
  
      const inventory = new Inventory( { id: id } )
      const inventoryData = await inventory.getMaterialInventoryFromFirebase();

      if ( inventoryData ) {
        setData( inventoryData )
        setCodProduto( inventoryData['id'].split( '_' )[1] )
      }
      else {
        alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
        window.close();
      }
    }

  }

  let history = useHistory();

  const handleInformationChange = ( id ) => ( e ) => {

    if ( id === "product_entryDate" ) {
      let formatedDate = (e.target.value).toString().replaceAll( "-", "/" )
      setData( { ...data, [id]: `${new Date( formatedDate )}` } );
    }
    
    else {
      setData( { ...data, [id]: e.target.value } )
    }
  }


  const handleSubmit = async ( e ) => {

    e.preventDefault();

    const updateData = new Inventory( { data: data, id: idRef } );

    const result = await updateData.updateMaterialInventoryOnFirebase();

    if ( result ) {
      alert( "Material atualizado com sucesso" );
      localStorage.removeItem( "materialInfo" );
      history.push("/almoxarifado");
    }
    else {
      alert( "Algo deu errado ao salvar as informações, por favor verifique todas as informações." )
    }

    
  }

  return (
  
    <main className="form__container">

      <div className="form__title">
        <h4>Cadastrar Material</h4>
      </div>

      <div className="form__content">
        <form onSubmit={handleSubmit}>

          <div className="form__content--inputs">

          <div className="form__input--halfWidth">
            <label className="form__input--label">Fornecedor*</label>
            <input className="form__input" type="text" value={data['supplier_id']} placeholder="Fornecedor" disabled/>
          </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Código do Produto*</label>
              <input className="form__input" type="text" value={codProduto} placeholder="Código produto" disabled/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Nome do Produto*</label>
              <input className="form__input" type="text" placeholder="Nome produto" value={data['product_name']} onChange={handleInformationChange('product_name')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Quantidade*</label>
              <input className="form__input" type="number" placeholder="Informe a quantidade" min={0} value={ data['product_quantity'] } onChange={handleInformationChange('product_quantity')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Valor unitário - (R$)*</label>
              <input className="form__input" type="number" step=".01" placeholder="Informe o valor" min={0} value={data['product_value']} onChange={handleInformationChange('product_value')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Data Entrada*</label>
              <input className="form__input" type="date" value={ data.product_entryDate ? new Date( data.product_entryDate ).toISOString().split("T")[0] : '' } onChange={handleInformationChange('product_entryDate')} required/>
            </div>

          </div>
          
          <div className="form__container--buttons">
            <button type="submit" className="form__button form__button--add">Atualizar</button>
          </div>

        </form>

      </div>
      
    </main>
    )
  }