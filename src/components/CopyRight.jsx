import React, { Component } from 'react';
import Typography from '@mui/material/Typography';

class CopyRight extends Component {
  render() {
    return (
      <Typography className="form__text--link" align="center" {...this.props}>
        {'Copyright © '}
        <a className='form__text--link' href="https://matheusmf.com/" target="_blank" rel="noreferrer">
          Matheus Mandotti
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
}

export default CopyRight;