import React from 'react'
import { Table } from '../../../components/tables/searchTable/table'

import { tableClientData } from '../../../assets/mock/tableClientData';

export default function CustomerList() {

  const tableColumns = {
    id: "Código",
    name: "Nome",
    company_name: "Empresa",
    cnpj_cpf: "CPNJ/CPF",
    email: "Email",
    telephone: "Telefone",
    mobile: "Celular",
    city: "Cidade",
    action: "Opções",
  };

  return (
    <>
    
      <Table
        tableName="Lista de Clientes"
        columns={tableColumns}
        data={tableClientData}
        link="cliente"
      />
      
    </>
  )
}
