import {React} from 'react';
import InputMask from 'react-input-mask';

export default function InputPhoneNumber( props ) {

  const { onChange, placeholder, mask, className, defaultValue } = props;

  return(
    <InputMask
      mask={mask}
      className={className ? className: "form__input"}
      defaultValue={defaultValue}
      type="tel"
      placeholder={placeholder}
      onChange={ ( e ) => {
        onChange( e )
      }}
      required/>
  )
}