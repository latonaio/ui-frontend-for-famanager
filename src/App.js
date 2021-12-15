import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import Menu from './views/Menu';
import {Login} from "./components/Login";
import {Helmet} from 'react-helmet';

import AnnotationRegister from './containers/AnnotationRegister';
import ProductionStart from './containers/ProductionStart';
import MasterSetting from './containers/MasterSetting';
import TemplateRegister from "./containers/TemplateRegister";
// font awesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faCameraRetro,
  faCheckSquare,
  faCogs,
  faCut,
  faFileExport,
  faHandPointer,
  faSave,
  faStop,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCameraRetro,
  faCheckSquare,
  faCogs,
  faFileExport,
  faHandPointer,
  faSave,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faStop,
  faCut,
  faTimes
);

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "rgb(59, 56, 56)",
    height: "100%",
  },
};

class App extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <style>{'body { background-color: rgb(59,56,56); }'}</style>
        </Helmet>
        <Switch>
          <Route path="/Menu" component={Menu}/>
          <Route path="/AnnotationRegister/:id" component={AnnotationRegister}/>
          <Route path="/ProductionStart" component={ProductionStart}/>
          <Route path="/MasterSetting" component={MasterSetting}/>
          <Route path="/TemplateRegister/:work_id" component={TemplateRegister}/>
          <Route path="/" exact={true} component={Login}/>
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);
