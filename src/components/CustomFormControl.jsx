import React, {Component} from "react";
import FormControl from '@mui/material/FormControl';
import { styled } from "@mui/material/styles";

const CustomStyliedFormControl = styled(FormControl)`
  width: -webkit-fill-available;
  width: -moz-available;
  width: fill-available;

  .MuiOutlinedInput-root {
    border-radius: 10px !important;
  }
`;

class CustomFormControl extends Component {
  
  render() {
    return (
      <CustomStyliedFormControl {...this.props} />
    );
  }
}

export default CustomFormControl;