const toggleSidebarMultiItem = document.querySelectorAll( ".sidebar__menu--listItens" )

toggleSidebarMultiItem.forEach( li => {

  li.addEventListener( "click", ( e ) => {

    currentActive = document.querySelector( ".sidebar__menu--listItens.active" )

    if ( currentActive && currentActive !== li ) 
      currentActive.classList.toggle( "active" )
    
    li.classList.toggle( "active" )
  
    let toggleSidebarArrow = li.querySelector( "#menu-arrow" )
  
    if (toggleSidebarArrow)
      toggleSidebarArrow.classList.toggle( "active" )
  } )
})


const toogleMenuBars = document.querySelectorAll( ".sidebar__menu--barIcon" )
const navbarMenuIcon = document.querySelector( ".nav .sidebar__menu--barIcon" )

toogleMenuBars.forEach( icon => {

  icon.addEventListener( "click", ( e ) => {
    
    containerSidebar = document.querySelector( ".container__sidebar" )

    let initialWidth = document.body.clientWidth

    if ( initialWidth <= 480 && containerSidebar.classList.contains( "active" ) ) {
      containerSidebar.classList.toggle( "collapse" )  
    }

    else if ( initialWidth <= 480 && !containerSidebar.classList.contains( "active" )  ) {
      containerSidebar.classList.toggle( "active" )
      containerSidebar.classList.toggle( "collapse" )
    }
    else {
      containerSidebar.classList.toggle( "active" )  
    }

  })
})