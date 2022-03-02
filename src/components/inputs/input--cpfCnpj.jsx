import {React, useState} from 'react';
import CpfCnpj from '@react-br-forms/cpf-cnpj-mask';

export default function InputCpfCnpj( props ) {

  const [ cpfCnpj, setCpfCnpj ] = useState( '' );
  const [ mask, setMask ] = useState( '' );

  const { onChange, className, defaultValue, placeholder, required } = props;

  return(
    <CpfCnpj
      value={defaultValue ? defaultValue : cpfCnpj}
      className={className ? className: "form__input"}
      placeholder={placeholder ? placeholder :"Informe o CPF ou CNPJ" }
      onChange={ ( e, type ) => {
        setCpfCnpj( e.target.value );
        setMask( type === "CPF" )
        onChange( e )
      }}
      required={required ? required : false}
    />
  )
}