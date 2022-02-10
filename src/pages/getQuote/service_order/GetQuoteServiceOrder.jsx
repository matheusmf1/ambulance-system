import React from 'react'
import NewServiceOrder from '../../../components/GetQuote_Sales/service_order/newServiceOrder/NewServiceOrder'

export default function GetQuoteServiceOrder() {

  const pathName = window.location.pathname
  const sessionName = pathName.split("/")[1];
  
  return (
    <>
      <NewServiceOrder session={sessionName}/>
    </>
  )
}