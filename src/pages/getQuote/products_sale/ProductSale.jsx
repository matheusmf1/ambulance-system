import React from 'react'

import NewProductsSale from "../../../components/GetQuote_Sales/products_sale/newProductsSale/NewProductsSale"

export default function GetQuoteProductSale() {

  const pathName = window.location.pathname
  const sessionName = pathName.split("/")[1];
  
  return (
    <>
      <NewProductsSale session={sessionName}/>
    </>
    )
  }
