import React, { useState } from 'react';
import logoRescue from '../../assets/images/logo-rescue.png';
import DashboardIcon from "@material-ui/icons/Dashboard";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { CurvedArrow } from './curvedArrow';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { PaymentsOutlined } from '@mui/icons-material';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import './sidebar.css';

export default function Sidebar() {

	const [ hasOpenTab, setHasOpenTab ] = useState( false );
	const [ openTabElement, setOpenTabElement ] = useState( false );

	const openTabMenuItem = ( e ) => {
		let mainTarget = e.target;

		const getTargetLi = () => {
			while ( !mainTarget.classList.contains( "sidebar__menu--listItens" ) ) {
	
				let parentTarget = mainTarget.parentElement;

				if ( parentTarget.classList.contains( "sidebar__menu--listItens" ) ) {
					return parentTarget
				}
				else {
					mainTarget = parentTarget;
				}
			}
		}

		const targetLi = getTargetLi()

		if ( targetLi === openTabElement ) {

			// fechar o que ja esta aberto
			let arrow = targetLi.querySelector( "#menu-arrow" );

			if ( arrow ) {
				targetLi.classList.toggle( "active" );
				arrow.classList.toggle( "active" );
			}

			setHasOpenTab( false );
			setOpenTabElement( null );	
		}

		else {

			if ( hasOpenTab ) {

				let arrow = openTabElement.querySelector( "#menu-arrow" );
	
				if ( arrow ) {
					openTabElement.classList.toggle( "active" );
					arrow.classList.toggle( "active" );
				}
			}

			let arrow = targetLi.querySelector( "#menu-arrow" );

			if ( arrow ) {
				targetLi.classList.toggle( "active" );
				arrow.classList.toggle( "active" );
			}

			setHasOpenTab( true );
			setOpenTabElement( targetLi );	
		}
	}

	const toogleMenuBars = ( e ) => {

		let mainTarget = e.target;
		
		const getTargetAside = () => {
			while ( !mainTarget.classList.contains( "container__sidebar" ) ) {
	
				let parentTarget = mainTarget.parentElement;

				if ( parentTarget.classList.contains( "container__sidebar" ) ) {
					return parentTarget
				}
				else {
					mainTarget = parentTarget;
				}
			}
		}

		const targetAside = getTargetAside();

		let initialWidth = document.body.clientWidth;
		
		if ( initialWidth <= 480 && targetAside.classList.contains( "active" ) ) {
			targetAside.classList.toggle( "collapse" )  
		}

		else if ( initialWidth <= 480 && !targetAside.classList.contains( "active" )  ) {
			targetAside.classList.toggle( "active" )
			targetAside.classList.toggle( "collapse" )
		}
		else {
			targetAside.classList.toggle( "active" )  
		}

	}
	
  return (
		<aside className="container__sidebar active" id='sideMenu'>
			
			<div className="sidebar__logo">
				<a href="/" className="sidebar__logo--anchor">
        	<img src={logoRescue} className="sidebar__logo--image" alt="logo"/>
				</a>

				<div className="container__title">
					<h5 className="sidebar__logo--title">Rescue</h5>
					<p className="sidebar__logo--Subtitle">Veículos Especiais</p>
				</div>

				<MenuOutlinedIcon className="sidebar__menu--barIcon" onClick={toogleMenuBars}/>
			</div>

			<div className="sidebar__scrollbar">
				<nav className="sidebar__menu">
				
					<ul>

						{/* DASHBOARD */}
						<li className="sidebar__menu--listItens">
							<a href="/">
								<DashboardIcon /> 
								<span className="sidebar__menu--title">Home</span>
							</a>
						</li>


						{/* CLIENTES */}
						<li className="sidebar__menu--listItens" onClick={openTabMenuItem}>		
							<a>

								<PeopleAltOutlinedIcon/>
								<span className="sidebar__menu--title">Clientes</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
						
							<ul id="product" className="sidebar__submenu">
							
								<span className="sidebar__menu--closed-Title">Clientes</span>
						
								<li>
									<a href="/clientes/cadastro">								
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Cadastrar</span>
									</a>
								</li>
						
								<li>
									<a href="/clientes">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Visualizar</span>            
									</a>
								</li>
						
							</ul>
						</li>

						{/* FORNECEDORES */}
						<li className="sidebar__menu--listItens" onClick={openTabMenuItem}>		
							<a>	
								<Inventory2OutlinedIcon/>
								<span className="sidebar__menu--title">Fornecedores</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
						
							<ul id="product" className="sidebar__submenu">

								<span className="sidebar__menu--closed-Title">Fornecedores</span>
						
								<li>
									<a href="/fornecedores/cadastro">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Cadastrar</span>
									</a>
								</li>
						
								<li>
									<a href="/fornecedores">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Visualizar</span>            
									</a>
								</li>
						
							</ul>
						</li>

						{/* FUNCIONARIOS */}
						<li className="sidebar__menu--listItens" onClick={openTabMenuItem}>		
							<a>	

								<BadgeOutlinedIcon/>
								<span className="sidebar__menu--title">Funcionários</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
						
							<ul id="product" className="sidebar__submenu">

								<span className="sidebar__menu--closed-Title">Funcionários</span>
						
								<li>
									<a href="/funcionarios/cadastro">								
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Cadastrar</span>
									</a>
								</li>
						
								<li>
									<a href="/funcionarios">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Visualizar</span>            
									</a>
								</li>
						
							</ul>
						</li>

						{/* VENDAS */}
						<li className="sidebar__menu--listItens" onClick={openTabMenuItem}>
							<a>
								<ShoppingCartOutlinedIcon/>	
								<span className="sidebar__menu--title">Vendas</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
						
							<ul id="product" className="sidebar__submenu">  

								<span className="sidebar__menu--closed-Title">Vendas</span>        
								
								<li>
									<a href="/venda/nova-os">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Ordem de Serviço</span>
									</a>
								</li>

								<li>
									<a href="/venda/nova-venda">								
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Venda de Produto</span>
									</a>
								</li>

								<li>
									<a href="/venda/nova-transformacao">								
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Transformação</span>
									</a>
								</li>

								<li>
									<a href="/vendas">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Visualização</span>
									</a>
								</li>
						
							</ul>
						</li>

						{/* ORCAMENTO */}
						<li className="sidebar__menu--listItens" onClick={openTabMenuItem}>
							<a>
								<FeedOutlinedIcon/>
								<span className="sidebar__menu--title">Orçamento</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
						
							<ul id="product" className="sidebar__submenu">  

								<span className="sidebar__menu--closed-Title">Orçamento</span>        
								
								<li>
									<a href="/orcamento/nova-os">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Ordem de Serviço</span>
									</a>
								</li>

								<li>
									<a href="/orcamento/nova-venda">								
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Venda de Produto</span>
									</a>
								</li>

								<li>
									<a href="/orcamento/nova-transformacao">								
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Transformação</span>
									</a>
								</li>
						
								<li>
									<a href="/orcamentos">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Visualização</span>
									</a>
								</li>
						
							</ul>
						</li>

						{/* FINANCEIRO */}
						<li className="sidebar__menu--listItens" onClick={openTabMenuItem}>
							<a>
								<PaymentsOutlined/>
								<span className="sidebar__menu--title">Financeiro</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
						
							<ul id="product" className="sidebar__submenu">  

								<span className="sidebar__menu--closed-Title">Financeiro</span>        
								
								<li>
									<a href="/financeiro/pagar">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Contas a Pagar</span>
									</a>
								</li>

								<li>
									<a href="/financeiro/receber">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Contas a Receber</span>
									</a>
								</li>

								<li>
									<a href="/financeiro/pagas">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Contas Pagas</span>
									</a>
								</li>

								<li>
									<a href="/financeiro/recebidos">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Contas Recebidas</span>
									</a>
								</li>
							</ul>
						</li>

						{/* ALMOXARIFADO */}
						<li className="sidebar__menu--listItens" onClick={openTabMenuItem}>
							<a>
								<WarehouseOutlinedIcon/>
								<span className="sidebar__menu--title">Almoxarifado</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
		
							<ul id="warehouse" className="sidebar__submenu">  

								<span className="sidebar__menu--closed-Title">Almoxarifado</span>        
								
								<li>
									<a href="/almoxarifado">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Estoque</span>
									</a>
								</li>

								<li>
									<a href="/almoxarifado/cadastro">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Cadastro Material</span>
									</a>
								</li>
						
							</ul>

						</li>

						{/* PRODUTOS */}
						<li className="sidebar__menu--listItens" onClick={openTabMenuItem}>
							<a>
								<LocalOfferOutlinedIcon/>
								<span className="sidebar__menu--title">Produtos</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
		
							<ul id="warehouse" className="sidebar__submenu">  

								<span className="sidebar__menu--closed-Title">Produtos</span>        
								
								<li>
									<a href="/produtos">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Visualizar</span>
									</a>
								</li>

								<li>
									<a href="/produtos/cadastro">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Cadastro</span>
									</a>
								</li>
						
							</ul>

						</li>

						{/* NOTA FISCAL */}
						<li className="sidebar__menu--listItens" onClick={openTabMenuItem}>
							<a>
								<ReceiptLongOutlinedIcon/>
								<span className="sidebar__menu--title">Nota Fiscal</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
		
							<ul id="warehouse" className="sidebar__submenu">  

								<span className="sidebar__menu--closed-Title">Nota Fiscal</span>

								<li>
									<a href="/nota-fiscal/entrada/cadastro">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Cadastrar Entrada</span>
									</a>
								</li>
								
								<li>
									<a href="/nota-fiscal/entrada">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Visualizar Entradas</span>
									</a>
								</li>

								<li>
									<a href="/nota-fiscal/saida/cadastro">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Cadastrar Saída</span>
									</a>
								</li>

								<li>
									<a href="/nota-fiscal/saida">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Visualizar Saídas</span>
									</a>
								</li>	
						
							</ul>

						</li>

						{/* CALENDARIO */}
						<li className="sidebar__menu--listItens" onClick={openTabMenuItem}>
							<a>
								<CalendarMonthOutlinedIcon/>
								<span className="sidebar__menu--title">Calendário</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
		
							<ul id="warehouse" className="sidebar__submenu">  

								<span className="sidebar__menu--closed-Title">Calendário</span>

								<li>
									<a href="/calendario">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Visualizar</span>
									</a>
								</li>
						
							</ul>

						</li>

					</ul>
				</nav>
			</div>

    </aside>  
  )
}