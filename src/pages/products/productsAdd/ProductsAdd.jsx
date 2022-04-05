import { React, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Product } from '../../../data/Product';


export default function ProductsAdd() {

  const [ isLoading, setIsLoading ] = useState( false );
  const history = useHistory();

  const [productsData, setProductsData] = useState(
    {
      product_sale_value: "",
      id: ""
    },
  );


  const handleInformationChange = ( id ) => ( e ) => {

    if ( id === 'product_sale_value' ) {
      let amount = parseFloat( e.target.value.toString() ).toFixed(2)
      setProductsData( { ...productsData, [id]: amount } )
    }

    else {
      setProductsData( { ...productsData, [id]: e.target.value } )
    }
  }

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    setIsLoading( true );
    
    const data = new Product( { data: productsData, id: productsData['id'] } );
    const result = await data.addProductToFirebase();

    if ( result ) {
      alert( "Produto cadastrado com sucesso" );
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
        <h4>Cadastrar Produto</h4>
      </div>

      <div className="form__content">
        <form onSubmit={handleSubmit}>

          <div className="form__content--inputs">

            <div className="form__input--halfWidth">
              <label className="form__input--label">Valor de Venda - (R$)*</label>
              <input className="form__input" type="number" step=".01" placeholder="Informe o valor" min={0} onChange={handleInformationChange('product_sale_value')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Etiqueta*</label>
              <input className="form__input" type="text" placeholder="Etiqueta" onChange={handleInformationChange('id')} required/>
            </div>
          </div>
          
          <div className="form__container--buttons">
            <button type="submit" disabled={isLoading} className="form__button form__button--add">Adicionar</button>
            <button type="reset" disabled={isLoading} className="form__button form__button--cancel">Corrigir</button>
          </div>

        </form>

      </div>
      
    </main>
    )
  }