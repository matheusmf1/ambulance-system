import React from 'react'
import { Table } from '../../../components/tables/searchTable/table';

import { tableProviderData } from "../../../assets/mock/tableProviderData";

export default function SupplierList() {

  const tableColumns = {
    id: "Código",
    contact: "Contato",
    email: "Email",
    telephone: "Telefone",
    mobile: "Celular",
    cnpj_cpf: "CPNJ/CPF",
    city: "Cidade",
    action: "Opções",
  };

  return (
    <>
      <Table
        tableName="Lista de Fornecedores"
        columns={tableColumns}
        data={tableProviderData}
        link="fornecedor"
        linkCadastro="/fornecedores/cadastro"
      />

    </>
  )
}
