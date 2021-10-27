import React from 'react'

import '../service_order/newServiceOrder/newServiceOrder.css';

import logoRescue from '../../../assets/images/logo-rescue.png';
import InputFile from '../../../components/inputs/input--file';

export default function NewTransformationProposal() {

  return (
  
    <main class="form__container">
      
      <h4 className="os__container--title">Nova Proposta de Tranformação</h4>

      {/* HEADER */}
      <div className="os__header--container">

        <div class="os__header--containerImage">
          <img src={logoRescue} alt="" class="os__header--image" />

          <div class="os__header--content">

            <h6>Rescue Transformação de veículos especiais Eireli</h6>

            <h6 class="info">CNPJ: 33.972.355/0001-00</h6>
            <h6 class="info">Rua Machado, 55 Vila Sorocabana</h6>
            <h6 class="info">Guarulhos/SP - CEP: 07025-210</h6>

          </div>

        </div>

        
        <div class="os__header--content">

          <h6 class="info">(11) 2847-0356 - (11) 95651-2030</h6>
          <h6 class="info">adm@rescueveiculosespeciais.com.br</h6>
          <h6 class="info">www.rescueveiculosespeciais.com.br</h6>
          <h6 class="info">Responsável:</h6>
        </div>
      </div>


      <div class="form__content">
        <form action="page-list-product.html">
          <div class="form__content--inputs">

            {/* INFO INICIAL */}
            <div className="osForm__content--container">

              <div className="osForm__titleWithDate--container">

                <div className="osForm__titleWithDate--title">
                  <label className="form__input--labelInLine" htmlFor="os-number">Proposta Nº</label>
                  <input className="osForm__input--OSnumber" id="os-number" type="number" required/>
                </div>

                <div className="osForm__titleWithDate--title">
                  <label className="form__input--labelInLine">Data Entrada</label>
                  <input className="osForm__input--date" type="date" required/>   
                </div>

              </div>


              <div class="form__input--halfWidth">
                <label class="form__input--label">Código do Cliente*</label>
                <input class="form__input" type="text" placeholder="Nome do responsável" required/>
              </div>

              <div class="form__input--halfWidth">
                <label class="form__input--label">OPÇÃO DE BUSCAR CLIENTE</label>
                <input class="form__input" type="text" placeholder="Nome do responsável" required/>
              </div>

              <div class="form__input--halfWidth">
                <label class="form__input--label">Empresa*</label>
                <input class="form__input" type="text" placeholder="Nome da empresa" required/>
              </div>

              <div class="form__input--halfWidth">
                <label class="form__input--label">CNPJ/CPF*</label>
                <input class="form__input" type="text" placeholder="Informe o CNPJ ou CPF" required/>
              </div>


              <div class="form__input--halfWidth">
                <label class="form__input--label">Endereço*</label>
                <input class="form__input" type="text" placeholder="Informe o endereço" required/>
              </div>

              <div class="form__input--halfWidth">
                <label class="form__input--label">CEP</label>
                <input class="form__input" type="text" placeholder="Informe o endereço"/>
              </div>

              <div class="form__input--halfWidth">
                <label class="form__input--label">Cidade*</label>
                <input class="form__input" type="text" placeholder="Informe o endereço" required/>
              </div>


              <div class="form__input--halfWidth">
                <label class="form__input--label">Estado*</label>
                <select name="estados-brasil" class="form__input">
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
                  <option value="SP" selected>São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>              
              </div>

              <div class="form__input--halfWidth">
                <label class="form__input--label">Email*</label>
                <input class="form__input" type="email" placeholder="Endereço de email"/>
              </div>

              <div class="form__input--halfWidth">
                <label class="form__input--label">Telefone*</label>
                <input class="form__input" type="text" placeholder="Número de telefone" required/>
              </div>
            </div>


            {/* INFORMACOES  */}
            <div className="osForm__content--container">
              <h6 className="os__content--title">Informações</h6>
              
              <div class="osForm__input">
                <label class="form__input--label">Veículo*</label>
                <input class="form__input" type="text" placeholder="Veículo" required/>
              </div>

              <div class="osForm__input">
                <label class="form__input--label">Marca*</label>
                <input class="form__input" type="text" placeholder="Marca" required/>
              </div>

              <div class="osForm__input">
                <label class="form__input--label">Modelo*</label>
                <input class="form__input" type="text" placeholder="Modelo" required/>
              </div>

              <div class="osForm__input">
                <label class="form__input--label">Chassi*</label>
                <input class="form__input" type="text" placeholder="Chassi" required/>
              </div>

              <div class="osForm__input">
                <label class="form__input--label">Arquivo</label>
                <input class="form__input" type="file"/>
                {/* <InputFile/> */}
              </div>


            </div>



            {/* DADOS PAGAMENTO */}
            <div className="osForm__content--container">
          
              <h6 className="os__content--title">Dados do Pagamento</h6>
          
              <div class="osForm__input">
                <label class="form__input--label">Vencimento*</label>
                <input class="form__input" type="text" placeholder="Vencimento" required/>
              </div>

              <div class="osForm__input">
                <label class="form__input--label">Valor*</label>
                <input class="form__input" type="text" placeholder="Valor" required/>
              </div>


              <div class="osForm__input">          
                <label class="form__input--label">Formas de Pagamento*</label>
                <select name="forma-pagamento" class="form__input">
                  <option value="Boleto">Boleto</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Depósito">Depósito</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="PIX" selected>PIX</option>
                  <option value="Transferência">Transferência</option>   
                </select> 

              </div>

              <div class="osForm__input">
                <label class="form__input--label">Parcelas</label>
                <input class="form__input" type="text" placeholder="nº parcelas ou não"/>
              </div>

            </div>

           
            {/* ASSINATURA E DADOS BANCARIOS */}

            <div className="osForm__content--container">

              <div className="os__signatureField--container">
                <input type="text"/>
                <h3>Solicitado por:</h3>
              </div>

              <div className="os__signatureBankInfo--content">

                <h6>DADOS BANCÁRIOS</h6>
                <h6 class="info">BANCO BRADESCO</h6>
                <h6 class="info">AG: 0593</h6>
                <h6 class="info">C/C: 20.867-1</h6>
                <h6 class="info">Rescue Transformação de veículos especiais Eireli</h6>
                <h6 class="info">CNPJ: 33.972.355/0001-00 (Chave PIX)</h6>

                <div className="osForm__titleWithDate--title">
                  <label className="form__input--labelInLine">Data Saída</label>
                  <input className="osForm__input--date" type="date" required/>   
                </div>

              </div>

            </div>


          </div>

          
         
          <div class="footer__button--container">
            
            <div className="footer__button--buttons">
              <button type="submit" class="form__button form__button--add">Adicionar</button>
              <button type="reset" class="form__button form__button--calcel">Corrigir</button>
            </div>

            <div className="footer__button--status">
              <label>STATUS</label>
              <select name="forma-pagamento" class="form__input">
                <option value="Cancelado">Cancelado</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluído">Concluído</option>
              </select> 
            </div>       

          </div>

        </form>

      </div>

    </main>
    )
  }
