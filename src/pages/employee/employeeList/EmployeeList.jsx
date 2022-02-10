import React from 'react'
import { Table } from '../../../components/tables/searchTable/table';

import { tableEmployeeData } from "../../../assets/mock/tableEmployeeData";

export default function EmployeeList() {

  const tableColumns = {
    id: "Código",
    name: "Nome",
    email: "Email",
    telephone: "Telefone",
    mobile: "Celular",
    cpf: "CPF",
    city: "Cidade",
    action: "Opções",
  };

  return (
    <>
      <Table
        tableName="Lista de Funcionários"
        columns={tableColumns}
        data={tableEmployeeData}
        link="funcionario"
        linkCadastro="/funcionarios/cadastro"
      />

    </>
  )
}
