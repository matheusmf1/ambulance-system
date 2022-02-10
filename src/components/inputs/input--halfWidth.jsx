import "./input--halfWidth.css";


export default function Input_HalfWidth( props ) {
  return(
    <div class="form__input--halfWidth">
    <label class="form__input--label"> { props.inputTitle } </label>
    <input class="form__input" type="text" placeholder={ props.placeholder } required/>
  </div>

  )
}