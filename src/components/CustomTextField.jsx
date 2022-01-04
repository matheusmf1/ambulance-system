import React, {Component} from "react";
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";

const CustomStyliedTextField = styled(TextField)`
  width: -webkit-fill-available;
  width: -moz-available;
  width: fill-available;

  .MuiOutlinedInput-root {
    border-radius: 10px !important;
  }
`;

class CustomTextField extends Component {
  
  render() {
    return (
      <CustomStyliedTextField {...this.props} />
    );
  }
}

export default CustomTextField;