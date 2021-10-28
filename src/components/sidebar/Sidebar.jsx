import React from 'react'
import './sidebar.css'
import logoRescue from '../../assets/images/logo-rescue.png';
import DashboardIcon from "@material-ui/icons/Dashboard";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { CurvedArrow } from './curvedArrow';


export default function Sidebar() {
	
  return (
		<aside className="container__sidebar active">
			
			<div className="sidebar__logo">
				<a href="" className="sidebar__logo--anchor">
        	<img src={logoRescue} className="sidebar__logo--image" alt="logo"/>
				</a>

				<div className="container__title">
					<h5 className="sidebar__logo--title">Rescue</h5>
					<p className="sidebar__logo--Subtitle">Veículos Especiais</p>
				</div>

				<MenuOutlinedIcon className="sidebar__menu--barIcon"/>


				{/* <div className="sidebar__menu--barIcon">
					<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 25 25" 
						width="25px" height="25px" stroke="black" stroke-width="0.1">
						<path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/>
					</svg>        
				</div> */}

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
						<li className="sidebar__menu--listItens">		
							<a>

								<PeopleAltOutlinedIcon/>
								<span className="sidebar__menu--title">Clientes</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
						
							<ul id="product" className="sidebar__submenu">
							
								<span className="sidebar__menu--closed-Title">Clientes</span>
						
								<li>
									<a href="/novocliente">								
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Cadastrar</span>
									</a>
								</li>
						
								<li>
									<a href="/cliente">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Visualizar</span>            
									</a>
								</li>
						
							</ul>
						</li>

						{/* FORNECEDORES */}
						<li className="sidebar__menu--listItens">		
							<a>	
								<Inventory2OutlinedIcon/>
								<span className="sidebar__menu--title">Fornecedores</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
						
							<ul id="product" className="sidebar__submenu">

								<span className="sidebar__menu--closed-Title">Fornecedores</span>
						
								<li>
									<a href="/novofornecedor">								
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Cadastrar</span>
									</a>
								</li>
						
								<li>
									<a href="/fornecedor">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Visualizar</span>            
									</a>
								</li>
						
							</ul>
						</li>

						{/* FUNCIONARIOS */}
						<li className="sidebar__menu--listItens">		
							<a>	

								<BadgeOutlinedIcon/>
								<span className="sidebar__menu--title">Funcionarios</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
						
							<ul id="product" className="sidebar__submenu">

								<span className="sidebar__menu--closed-Title">Funcionarios</span>
						
								<li>
									<a href="/novofuncionario">								
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Cadastrar</span>
									</a>
								</li>
						
								<li>
									<a href="/funcionario">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Visualizar</span>            
									</a>
								</li>
						
							</ul>
						</li>


						{/* VENDAS */}
						<li className="sidebar__menu--listItens">
							<a>
								<ShoppingCartOutlinedIcon/>	
								<span className="sidebar__menu--title">Vendas</span>
								<CurvedArrow id="menu-arrow" class_name={"sidebar__menu--arrow sidebar__menu--icons"}/>
							</a>
						
							<ul id="product" className="sidebar__submenu">  

								<span className="sidebar__menu--closed-Title">Vendas</span>        
								
								<li>
									<a href="nova-os">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Ordem de Serviço</span>
									</a>
								</li>

								<li>
									<a href="nova-venda">								
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Venda de Produto</span>
									</a>
								</li>

								<li>
									<a href="nova-transformacao">								
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Transformação</span>
									</a>
								</li>
						
								{/* <li className="">
									<a href="">
										<RemoveOutlinedIcon/>
										<span className="sidebar__submenu--title">Lista de OS</span>
									</a>
								</li> */}
						
							</ul>
						</li>

					</ul>
				</nav>
			</div>

    </aside>  
  )
}
