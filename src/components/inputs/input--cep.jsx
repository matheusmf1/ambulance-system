import {React} from 'react';
import InputMask from 'react-input-mask';

export default function InputCep( props ) {

  const { onBlur, className, defaultValue } = props;

  return(
    <InputMask
      mask="99999-999"
      className={className ? className: "form__input"}
      defaultValue={defaultValue}
      type="text"
      placeholder="Informe o CEP"
      onBlur={ ( e ) => {
        onBlur( e )
      } }
      required/>
  )
}