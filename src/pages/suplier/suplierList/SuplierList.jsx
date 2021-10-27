import React from 'react'
import Table from '../../../components/tables/searchTable/table';

import { tableProviderData } from "../../../assets/mock/tableProviderData";

export default function SuplierList() {

  const tableColumns = {
    id: "Código",
    name: "Nome",
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
        tableName="Lista de Forncedores"
        columns={tableColumns}
        data={tableProviderData}
        link="fornecedor"
      />

    </>
  )
}
