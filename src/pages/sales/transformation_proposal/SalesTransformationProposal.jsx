import React from 'react'

import NewTransformationProposal from '../../../components/GetQuote_Sales/transformation_proposal/NewTransformationProposal'

export default function SalesNewTransformationProposal() {

  const pathName = window.location.pathname
  const sessionName = pathName.split("/")[1];
  
  return (
    <>
      <NewTransformationProposal session={sessionName}/>
    </>
  )
}