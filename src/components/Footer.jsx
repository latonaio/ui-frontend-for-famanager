import React from 'react'
import {MuiThemeProvider} from "@material-ui/core";
import theme from "../theme";

const name = process.env.REACT_APP_FACTORY_NAME;

export default class FooterComponent extends React.Component {

  render() {
    let footerImage = "";
    if (!this.props.hideImage) {
      footerImage = <img className={"footer-image"} src={'/footer_image.png'} alt={"footer_image"}/>;
    }

    return (
      <MuiThemeProvider theme={theme}>
        {footerImage}
        <div className="Footer">
          {name}
        </div>
      </MuiThemeProvider>
    )
  }
}
