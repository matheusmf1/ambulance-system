import {React} from 'react';
import InputMask from 'react-input-mask';

export default function InputCep( props ) {

  const { onChange, className, defaultValue, disabled } = props;

  return(
    <InputMask
      mask="99999-999"
      className={className ? className: "form__input"}
      value={ defaultValue ? defaultValue : null }
      type="text"
      placeholder="Informe o CEP"
      onChange={ ( e ) => { onChange( e ) } }
      required
      disabled={ disabled ? disabled : false }
      />
  )
}