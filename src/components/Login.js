import React, {Component} from 'react';

import { Redirect } from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
};

export class Login extends Component {

  render() {
    // ログイン処理は特になし
    return (<Redirect to={{pathname: '/Menu'}}/>);
  }
}

export default withStyles(styles)(Login);
