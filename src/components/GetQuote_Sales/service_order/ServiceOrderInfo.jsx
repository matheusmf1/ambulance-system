import { React, useState, useEffect } from 'react'
import logoRescue from '../../../assets/images/logo-rescue.png';
import { TableOS } from '../../tables/responsiveTable/table';
import InputCpfCnpj from '../../inputs/input--cpfCnpj';
import InputPhoneNumber from '../../inputs/input--phoneNumber';
import InputCep from '../../inputs/input--cep';
import { useHistory } from "react-router-dom"
import { ServiceOrder } from "../../../data/ServiceOrder";

export default function ServiceOrderInfo( props ) {

  const [ data, setData ] = useState( '' );
  const [ idRef, setIdRef ] = useState( '' );
  const [ hasInstallment, setHasInstallment ] = useState( false );
  const [ valuesInstallmentData, setValuesInstallmentData ] = useState( '' );

  const [ tableDataProdutos, setTableDataProdutos ] = useState( null );
  const [ tableDataServicos, setTableDataServicos ] = useState( null );
  const [ hasTableData, setHasTableData ] = useState( false );

  const [valorTotalProduto, setValorTotalProduto] = useState(0);
  const [valorTotalServico, setValorTotalServico] = useState(0);
  
  
  const history = useHistory();
  const pathName = props.match.url;
  const sessionName = pathName.split( "/" )[1];

  useEffect( () => {

    let userID = props.match.params.id;

    if ( !data ) {
      fetchUserData( userID )
    }

  }, []);


  const fetchUserData = async ( id ) => {

    setIdRef( id )
    let serviceData = JSON.parse( localStorage.getItem( 'quoteSalesInfo' ) );
    console.log( serviceData );

    if ( serviceData ) {

      if ( serviceData['id'].toString() !== id.toString() ) {

        console.log( "Feching data from firebase" )

        const service = new ServiceOrder( { id: id } )
        const serviceData = await service.getServiceOrderFromFirebase();

        if ( serviceData ) {
          setData( serviceData )
          setHasInstallment( serviceData['paymentInfo']['installments'] === "1"? false : true );
          const firstInstallment = serviceData['paymentInfo']['installmentsData'].filter( data => data['installment'] === "1")[0];
          setValuesInstallmentData( firstInstallment );

          setTableDataProdutos( serviceData['tableDataProdutos'] );
          setTableDataServicos( serviceData['tableDataServicos'] );
  
          setHasTableData( true )
        }
        else {
          alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
          window.close();
        }
 
      }
      else {
        setData( serviceData )
        setHasInstallment( serviceData['paymentInfo']['installments'] === "1"? false : true );
        const firstInstallment = serviceData['paymentInfo']['installmentsData'].filter( data => data['installment'] === "1")[0];
        setValuesInstallmentData( firstInstallment );

        setTableDataProdutos( serviceData['tableDataProdutos'] );
        setTableDataServicos( serviceData['tableDataServicos'] );

        setHasTableData( true )
      }
    } 
    else {
      console.log( "Feching data from firebase after updating" )
  
      const service = new ServiceOrder( { id: id } )
        const serviceData = await service.getServiceOrderFromFirebase();

      if ( serviceData ) {
        setData( serviceData )
        setHasInstallment( serviceData['paymentInfo']['installments'] === "1"? false : true );
        const firstInstallment = serviceData['paymentInfo']['installmentsData'].filter( data => data['installment'] === "1")[0];
        setValuesInstallmentData( firstInstallment );

        setTableDataProdutos( serviceData['tableDataProdutos'] );
        setTableDataServicos( serviceData['tableDataServicos'] );

        setHasTableData( true )
      }
      else {
        alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
        window.close();
      }
    }

  }


  const checkCep = ( e ) => {

    let cep = e.target.value.replace( /\D/g, '' );
    setData( { ...data, "cep": cep } );

    if ( cep.length === 8 ) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then( response => {
        if (response.ok)
          return response.json()
      })
      .then( dataCep => {
        if ( dataCep.erro ) {
          throw new Error( "Não foi possível encontrar o CEP informado, por favor tente novamente" )
        }
        else {
          setData( { ...data, "cep": cep, "address": dataCep['logradouro'], "neighborhood": dataCep['bairro'], "city": dataCep['localidade'], "state": dataCep['uf'] } );
        }
      })
      .catch( error => {
        console.error( error )
        alert( 'Não foi possível encontrar o CEP informado, por favor tente novamente' )
      })
    }
  }

  const defineStatusFieldOptions = () => {
    
    if ( sessionName === 'venda' ) {
      return (
        <select className="form__input" value={data['status']} onChange={handleInformationChange( 'status' )}>
          <option value="cancelado_naoAprovado">Cancelado</option>
          <option value="aprovado">Aprovado Orçamento</option>
          <option value="emAndamento">Em Andamento</option>
          <option value="concluido">Concluído</option>
        </select>       
      );
    }

    else if ( sessionName === 'orcamento' ) {
      return (
        <select className="form__input" value={data['status']} onChange={handleInformationChange( 'status' )}>
          <option value="cancelado_naoAprovado">Não Aprovado</option>
          <option value="aprovado">Aprovado</option>
        </select>       
      );
    }
  }

  const installmentElements = () => setHasInstallment( !hasInstallment )

  const renderInstallment = () => {
    if ( hasInstallment ){

      let totalAmount = data['amountPay']
      if ( isNaN(totalAmount) ) {
        totalAmount = 0
      }
      
      let installmentsNumber = data[ 'paymentInfo']['installments']
      let amountPerInstallment = parseFloat( 0 ).toFixed(3).slice(0, -1)
      if ( installmentsNumber > 0 ) {
        amountPerInstallment = parseFloat( totalAmount / installmentsNumber ).toFixed(3).slice(0, -1)
      }

      return(
        <>
          <div className="form__input--halfWidth">
            <label className="form__input--label"> Número de Parcelas:</label>
            <input className="form__input" type="number" required placeholder="Informe o nº de parcelas" min="1" value={ parseInt(data['paymentInfo']['installments'])} onChange={handleInformationChange('installments')}/>
          </div>

          <div className="form__input--halfWidth">
            <label className="form__input--label"> Valor de cada parcela:</label>
            <input className="form__input" type="text" disabled value={`R$ ${amountPerInstallment}`}/>
          </div>
        </>
        );
    }
    else {
      return <></>
    }


  }

  const handleInformationChange = ( id ) => ( e ) => {

    if ( id === "entryDate" || id === "dueDate" || id === "outputDate" ) {
      let formatedDate = (e.target.value).toString().replaceAll( "-", "/" )

      if ( id === "entryDate" || id === "outputDate" )
        setData( { ...data, [id]: `${new Date( formatedDate )}` } );
      
      else
        setValuesInstallmentData( { ...valuesInstallmentData, [id]: `${new Date( formatedDate )}` } );
    }

    else if ( id === 'amountPay' ) {
      // let amount = parseFloat( e.target.value.toString() ).toFixed(2)
      setData( { ...data, [id]: e.target.value.toString() } )
    }

    else if ( id === 'paymentType' ) {
      setValuesInstallmentData( { ...valuesInstallmentData, [id]: e.target.value } );
    }

    else if ( id === 'installments' ) {
      let paymentInfo = {
        installments: `${e.target.value}`,
        installmentsData: [] 
      }

      setData( { ...data, 'paymentInfo': paymentInfo } )
    }

    else {
      setData( { ...data, [id]: e.target.value } )
    }
  }

  const unifyData = () => {

    const totalInstallments = parseInt( data['paymentInfo']['installments'] )
    let installmentAmountPay = 0
    if ( totalInstallments !== 0 ) {
      installmentAmountPay = parseFloat( data['amountPay'] / totalInstallments ).toFixed(3).slice(0, -1)
    }

    const installmentDataArray = []
    for ( let i = 0; i < totalInstallments; i++ ) {
      
      let installmentBody = {
        installmentAmountPay: `${ installmentAmountPay }`,
        dueDate: '',          
        receiptFile: '',
        paymentDate: '',
        amountPaid: "",
        paymentType: `${valuesInstallmentData['paymentType']}`,
        installment: `${i + 1}`,
        paymentStatus: "toPay"
      }
    
      let date = new Date( valuesInstallmentData['dueDate'] )
      let day = parseInt(date.getDate())
      let month = parseInt(date.getMonth()) + 1
      let year = parseInt(date.getFullYear())
      
      let correntInstallmentMonth = month + i
    
      if ( correntInstallmentMonth > 12 ) {
        correntInstallmentMonth = correntInstallmentMonth - 12
        year = year + 1
      }

      let lastDayCurrentInstallmentMonth = new Date( year, correntInstallmentMonth, 0).getDate();

      if ( day > lastDayCurrentInstallmentMonth ) {
        day = lastDayCurrentInstallmentMonth
      }

      let installmentDate = new Date(`${year}/${correntInstallmentMonth}/${day}`)
      installmentBody['dueDate'] = `${installmentDate}`
      installmentDataArray.push( installmentBody )
    }

    let paymentInfo = {
      installments: `${totalInstallments}`,
      installmentsData: installmentDataArray
    }

    data['paymentInfo'] = paymentInfo;

    tableDataProdutos['columns'].forEach( item => {

      if ( item.Header === "SubTotal" ) {
        item.Cell = "TableText";
        item.accessor = "";
      }
      else if ( item.Cell.name !== undefined ) {
        item.Cell = item.Cell.name;
      }
    })

    tableDataServicos['columns'].forEach( item => {
      if ( item.Header === "SubTotal" ) {
        item.Cell = "TableText";
        item.accessor = "";
      }
      else if ( item.Cell.name !== undefined ) {
        item.Cell = item.Cell.name;
      }
    })
    
    data['tableDataProdutos'] = tableDataProdutos;
    data['tableDataServicos'] = tableDataServicos;
    return data

  }

  const renderTable1 = () => {

    if ( hasTableData ) {
      return <TableOS tableData={ tableDataProdutos } setTableData={setTableDataProdutos} setValorTotal={setValorTotalProduto}/>
    }

  }

  const renderTable2 = () => {

    if ( hasTableData ) {
      return <TableOS tableData={ tableDataServicos } setTableData={setTableDataServicos} setValorTotal={setValorTotalServico}/>
    }

  }

  const handleSubmit = async ( e ) => {
    e.preventDefault();

    const finalData = unifyData();
    console.log( finalData )

    const serviceOrder = new ServiceOrder( { data: finalData, id: idRef } );
    const result = await serviceOrder.updateServiceOrderOnFirebase();

    if ( result ) {
      alert( "Ordem de Serviço cadastrada com sucesso" )
      localStorage.removeItem( 'quoteSalesInfo' );
      history.push( `/${sessionName}s` );
    }
    else {
      alert( "Algo deu errado ao salvar as informações, por favor verifique todas as informações." )
    }
  }

  return (
  
    <main className="form__container">
      
      <h4 className="os__container--title">Nova Ordem de Serviço</h4>

      {/* HEADER */}
      <div className="os__header--container">

        <div className="os__header--containerImage">
          <img src={logoRescue} alt="logo empresa Rescue" className="os__header--image"/>

          <div className="os__header--content">

            <h6>Rescue Transformação de veículos especiais Eireli</h6>

            <h6 className="info">CNPJ: 33.972.355/0001-00</h6>
            <h6 className="info">Rua Machado, 55 Vila Sorocabana</h6>
            <h6 className="info">Guarulhos/SP - CEP: 07025-210</h6>

          </div>

        </div>
       
        <div className="os__header--content">

          <h6 className="info">(11) 2847-0356 - (11) 95651-2030</h6>
          <h6 className="info">adm@rescueveiculosespeciais.com.br</h6>
          <h6 className="info">www.rescueveiculosespeciais.com.br</h6>

          <div className='os__header--responsableInfo'>
            <h6 className="info">Responsável:</h6>
            <input className='os__header--responsableInput' type="text" value={data['responsable']} onChange={handleInformationChange('responsable')}/>
          </div>

        </div>
      </div>


      <div className="form__content">
        <form onSubmit={handleSubmit}>
          <div className="form__content--inputs">

            {/* INFO INICIAL */}
            <div className="osForm__content--container">

              <div className="osForm__titleWithDate--container">

                <div className="osForm__titleWithDate--title">
                  <label className="form__input--labelInLine">{`Ordem de Serviço ${data['id']}`}</label>
                </div>

                <div className="osForm__titleWithDate--title">
                  <label className="form__input--labelInLine">Data Entrada</label>
                  <input className="osForm__input--date" type="date" value={ data.entryDate ? new Date( data.entryDate ).toISOString().split("T")[0] : '' } onChange={handleInformationChange('entryDate')} required />
                </div>

              </div>


              <div className="form__input--halfWidth">
                <label className="form__input--label">Código do Cliente*</label>
                <input className="form__input" type="text" placeholder="Nome do responsável" value={data.clientNumber} onChange={handleInformationChange('clientNumber')} required/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">OPÇÃO DE BUSCAR CLIENTE</label>
                <input className="form__input" type="text" placeholder="Nome do responsável"/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">Empresa*</label>
                <input className="form__input" type="text" placeholder="Nome da empresa" value={data.companyName} onChange={handleInformationChange('companyName')} required/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">CPF/CNPJ*</label>
                <InputCpfCnpj onChange={handleInformationChange('cpf')} defaultValue={data.cpf} required={true}/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">CEP*</label>
                <InputCep onChange={checkCep} defaultValue={data.cep}/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">Endereço*</label>
                <input className="form__input" type="text" placeholder="Informe o endereço" value={data['address']} onChange={handleInformationChange('address')} required/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">Cidade*</label>
                <input className="form__input" type="text" placeholder="Informe a Cidade" value={data['city']} onChange={handleInformationChange('city')} required/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">Estado*</label>
                <select name="estados-brasil" className="form__input" value={data['state']} onChange={handleInformationChange('state')}>
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

              <div className="form__input--halfWidth">
                <label className="form__input--label">Email*</label>
                <input className="form__input" type="email" placeholder="Endereço de email" value={data['email']} onChange={handleInformationChange('email')}/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">Telefone*</label>
                <InputPhoneNumber placeholder="Informe o número de telefone" mask="(99) 9999-9999" defaultValue={data['telephone']} onChange={handleInformationChange('telephone')}/>
              </div>
            </div>

            {/* EQUIPAMENTO */}
            <div className="osForm__content--container">
              
              <h6 className="os__content--title">Equipamento</h6>

              <div className="osForm__input">
                <label className="form__input--label">Veículo*</label>
                <input className="form__input" type="text" placeholder="Veículo" value={data['equipament_vehicle']} onChange={handleInformationChange('equipament_vehicle')} required/>
              </div>

              <div className="osForm__input">
                <label className="form__input--label">Marca*</label>
                <input className="form__input" type="text" placeholder="Marca" value={data['equipament_brand']} onChange={handleInformationChange('equipament_brand')} required/>
              </div>


              <div className="osForm__input">
                <label className="form__input--label">Modelo*</label>
                <input className="form__input" type="text" placeholder="Modelo" value={data['equipament_model']} onChange={handleInformationChange('equipament_model')} required/>
              </div>

              <div className="osForm__input">
                <label className="form__input--label">Placa*</label>
                <input className="form__input" type="text" placeholder="Placa" value={data['equipament_plate']} onChange={handleInformationChange('equipament_plate')} required/>
              </div>

              <div className="osForm__input">
                <label className="form__input--label">Prefixo</label>
                <input className="form__input" type="text" placeholder="Prefixo" value={data['equipament_prefix']} onChange={handleInformationChange('equipament_prefix')}/>
              </div>

            </div>

            {/* PRODUTOS */}
            <div className="osForm__content--container">
              <h6 className="os__content--title">Produtos</h6>
              { renderTable1() }
            </div>

            {/* SERVICOS */}
            <div className="osForm__content--container">
              <h6 className="os__content--title">Serviços</h6>
              { renderTable2() }
              <h3 className="os__content--sumTableTitle">Total da Ordem de Serviço R$ { ( parseFloat(valorTotalProduto)  + parseFloat(valorTotalServico) ) } </h3>        
            </div>

            {/* DADOS PAGAMENTO */}
            <div className="osForm__content--container">
              <h6 className="os__content--title">Dados do Pagamento</h6>
              
              <div className="osForm__input">
                <label className="form__input--label">Vencimento*</label>
                <input className="form__input" type="date" placeholder="Vencimento" value={ valuesInstallmentData.dueDate ? new Date( valuesInstallmentData.dueDate ).toISOString().split("T")[0] : '' } onChange={handleInformationChange('dueDate')} required/>
              </div>

              <div className="osForm__input">
                <label className="form__input--label">Valor*</label>
                <input className="form__input" type="number" min="1" step=".01" placeholder="Valor" value={ data['amountPay'] } onChange={handleInformationChange('amountPay')} required/>
              </div>

              <div className="osForm__input">
                <label className="form__input--label">Formas de Pagamento*</label>
                <select name="forma-pagamento" className="form__input" value={ valuesInstallmentData.paymentType ? valuesInstallmentData.paymentType : '' } onChange={handleInformationChange('paymentType')}>
                  <option value="boleto">Boleto</option>
                  <option value="cheque">Cheque</option>
                  <option value="deposito">Depósito</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="pix">PIX</option>
                  <option value="transferencia">Transferência</option>   
                </select> 
              </div>

              <div className="osForm__input">
                <label className="form__input--label">Parcelas</label>
                <select name="forma-pagamento" className="form__input" value={ hasInstallment } onChange={installmentElements} >
                  <option value={true}>Sim</option>
                  <option value={false}>Não</option>
                </select>  
              </div>

              { renderInstallment() }

            </div>
           
            {/* ASSINATURA E DADOS BANCARIOS */}
            <div className="osForm__content--container">

              <div className="os__signatureField--container">
                <input className='os__header--responsableInput' type="text" value={ data['requestedBy'] } onChange={handleInformationChange('requestedBy')}/>
                <h3 className="info">Solicitado por:</h3>
              </div>

              <div className="os__signatureBankInfo--content">

                <h6>DADOS BANCÁRIOS</h6>
                <h6 className="info">BANCO BRADESCO</h6>
                <h6 className="info">AG: 0593</h6>
                <h6 className="info">C/C: 20.867-1</h6>
                <h6 className="info">Rescue Transformação de veículos especiais Eireli</h6>
                <h6 className="info">CNPJ: 33.972.355/0001-00 (Chave PIX)</h6>


                <div className="osForm__titleWithDate--title">
                  <label className="form__input--labelInLine">Data Saída</label>
                  <input className="osForm__input--date" type="date" value={ data.outputDate ? new Date( data.outputDate ).toISOString().split("T")[0] : '' } onChange={handleInformationChange('outputDate')}/>
                </div>

              </div>

            </div>

          </div>
  
         
          <div className="footer__button--container">
            
            <div className="footer__button--buttons">
              <button type="submit" className="form__button form__button--add">Atualizar</button>
            </div>

            <div className="footer__button--status">
              <label>STATUS</label>
              { defineStatusFieldOptions( sessionName ) }
            </div>

          </div>

        </form>

      </div>

    </main>
    )
}