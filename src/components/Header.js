import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import theme from '../theme'

const styles = {
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "40px",
    fontWeight: "1000",
    marginRight: "5%",
  },
};

function header(props) {
  const {classes} = props;
  let fontSize = "40px";
  if (props.fontSize) {
    fontSize = props.fontSize;
  }
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static" color="primary" elevation="0.0">
        <img className="header-image" src={'/header_image.png'} alt={"header_image"}/>
        <img className="header-logo" src={'/latona_logo.png'} alt={"latona_logo"} style={{right: "12%"}}/>
        <img className="header-logo" src={'/aion_logo.png'} alt={"aion_logo"} style={{right: "0"}}/>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.title}
                      style={
                        {
                          marginTop: "65px",
                          marginBottom: "10px",
                          fontSize: fontSize,
                          marginRight: "5%"
                        }
                      }>
            FA&nbsp;制御装置管理&nbsp;ビジョンシステム&nbsp;{props.dispTitle}
          </Typography>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(header);
