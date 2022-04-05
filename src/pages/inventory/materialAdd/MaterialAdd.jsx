import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Inventory } from '../../../data/Inventory';
import { db, auth } from '../../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';


export default function MaterialAdd() {

  const [ suppliersData, setSuppliersData ] = useState( [] );

  useEffect( async () => {

    const supplierCollectionRef = collection( db, `users/${auth.currentUser.uid}/suppliers` );
    const queryResult = query( supplierCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );

    setSuppliersData( docSnap.docs.map( doc => ( {...doc.data()} ) ) );
    

  }, []);


  const [materialData, setMaterialData] = useState(
    {
      id: "",
      supplier_id: "choose",
      product_name: "",
      product_quantity: "",
      product_value: "",
      product_totalValue: "",
      product_entryDate: "",
      product_quantityLimit: "",
      product_underQuantityLimit: false,
    },
  );

  let history = useHistory();

  const handleInformationChange = ( id ) => ( e ) => {

    if ( id === "product_entryDate" ) {
      let formatedDate = (e.target.value).toString().replaceAll( "-", "/" )
      setMaterialData( { ...materialData, [id]: `${new Date( formatedDate )}` } );
    }

    else if ( id === 'product_value' ) {
      let amount = parseFloat( e.target.value.toString() ).toFixed(2);

      if ( materialData['product_quantity'] !== "" && isNaN(amount) !== true ) {
        let totalValue = parseFloat( materialData['product_quantity'] * parseFloat(amount) ).toFixed(2);
        setMaterialData( { ...materialData, "product_totalValue": totalValue, "product_value": amount } )
      }
      else {
        setMaterialData( { ...materialData, [id]: amount, "product_totalValue": "" } )
      }
    }

    else if ( id === 'product_quantity' ) {
      let amount = parseInt( e.target.value.toString() );

      if ( materialData['product_value'] !== "" && isNaN(amount) !== true ) {
        let totalValue = parseFloat( materialData['product_value'] * parseInt(amount) ).toFixed(2);
        setMaterialData( { ...materialData, "product_totalValue": totalValue, "product_quantity": amount.toString() } )
      }
      else {
        setMaterialData( { ...materialData, [id]: amount.toString(), "product_totalValue": "" } )
      }
    }
    
    else {
      setMaterialData( { ...materialData, [id]: e.target.value } )
    }
  }

  const handleSubmit = async ( e ) => {

    e.preventDefault();

    if ( materialData['supplier_id'] === "choose" ) {
      alert( "Selecione o fornecedor!" );
    }
    else {

      materialData['id'] = `${materialData['supplier_id']}_${materialData['id']}`;
      materialData['product_underQuantityLimit'] = parseInt(materialData['product_quantity']) < parseInt(materialData['product_quantityLimit']) ? true: false;

      const data = new Inventory( { data: materialData, id: materialData['id'] } );
  
      const result = await data.addMaterialInventoryToFirebase();
  
      if ( result ) {
        alert( "Material cadastrado com sucesso" );
        history.push("/almoxarifado");
      }
      else {
        alert( "Algo deu errado ao salvar as informações, por favor verifique todas as informações." )
      }
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
            <select name="estados-brasil" className="form__input" value={materialData['supplier_id']} onChange={handleInformationChange('supplier_id')} required>
              <option value="choose">Escolha o Fornecedor</option>

                {
                  suppliersData.map( (data, key) => {
                    return (<option value={data['id']} key={key}>{data['id']} - {data['responsable']}</option>);
                  })
                }

            </select>
          </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Código do Produto*</label>
              <input className="form__input" type="text" placeholder="Código produto" onChange={handleInformationChange('id')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Nome do Produto*</label>
              <input className="form__input" type="text" placeholder="Nome produto" onChange={handleInformationChange('product_name')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Quantidade*</label>
              <input className="form__input" type="number" placeholder="Informe a quantidade" min={0} onChange={handleInformationChange('product_quantity')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Quantidade mínima desejada*</label>
              <input className="form__input" type="number" placeholder="Informe a quantidade para alertar quando o estoque estiver baixo" min={0} onChange={handleInformationChange('product_quantityLimit')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Valor unitário - (R$)*</label>
              <input className="form__input" type="number" step=".01" placeholder="Informe o valor" min={0} onChange={handleInformationChange('product_value')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Valor Total no Estoque - (R$)*</label>
              <input className="form__input" type="number" step=".01" placeholder="Informe o valor" min={0} value={materialData['product_totalValue']} disabled/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Data Entrada*</label>
              <input className="form__input" type="date" onChange={handleInformationChange('product_entryDate')} required/>
            </div>

          </div>
          
          <div className="form__container--buttons">
            <button type="submit" className="form__button form__button--add">Adicionar</button>
            <button type="reset" className="form__button form__button--calcel">Corrigir</button>
          </div>

        </form>

      </div>
      
    </main>
    )
  }