import {React, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { Product } from '../../../data/Product';


export default function ProductsInfo( props ) {

  const [ data, setData ] = useState( '' );
  const [ idRef, setIdRef ] = useState( '' );
  const [ isLoading, setIsLoading ] = useState( false );
  const history = useHistory();

  useEffect( () => {

    let userID = props.match.params.id;

    if ( !data ) {
      fetchUserData( userID )
    }

  }, []);

  const fetchUserData = async ( id ) => {

    setIdRef( id )
    let fetchData = JSON.parse( localStorage.getItem( 'productsInfo' ) );

    if ( fetchData ) {

      if ( fetchData['id'].toString() !== id.toString() ) {

        console.log( "Feching data from firebase" )

        const product = new Product( { id: id } );
        const productData = await product.getProductFromFirebase();

        if ( productData ) {
          setData( productData )
        }
        else {
          alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
          window.close();
        }
 
      }
      else {
        setData( fetchData )
      }
    } 
    else {
      console.log( "Feching data from firebase after updating" )
  
      const product = new Product( { id: id } );
      const productData = await product.getProductFromFirebase();

      if ( productData ) {
        setData( productData )
      }
      else {
        alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
        window.close();
      }
    }

  }

  const handleInformationChange = ( id ) => ( e ) => {
    setData( { ...data, [id]: e.target.value } );
  }


  const handleSubmit = async ( e ) => {
    e.preventDefault();
    setIsLoading( true );

    data['product_sale_value'] = parseFloat( data['product_sale_value'] ).toFixed(2);
    
    const updateData = new Product( { data: data, id: idRef } );

    const result = await updateData.updateProductOnFirebase();

    if ( result ) {
      alert( "Produto atualizado com sucesso" );
      localStorage.removeItem( "productsInfo" );
      history.push("/produtos");
    }
    else {
      alert( "Algo deu errado ao salvar as informações, por favor verifique todas as informações." );
      setIsLoading( false );
    }

    
  }

  return (
  
    <main className="form__container">

      <div className="form__title">
        <h4>{ `Informações do material - ${ data['id'] }` }</h4>
      </div>

      <div className="form__content">
        <form onSubmit={handleSubmit}>

          <div className="form__content--inputs">

            <div className="form__input--halfWidth">
              <label className="form__input--label">Valor de Venda - (R$)*</label>
              <input className="form__input" type="number" step=".01" placeholder="Informe o valor" min={0} value={data['product_sale_value']} onChange={handleInformationChange('product_sale_value')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Etiqueta</label>
              <input className="form__input" type="text" placeholder="Etiqueta" value={data['id']} disabled/>
            </div>
      
          </div>
          
          <div className="form__container--buttons">
            <button type="submit" disabled={isLoading} className="form__button form__button--add">Atualizar</button>
          </div>

        </form>

      </div>
      
    </main>
    )
  }