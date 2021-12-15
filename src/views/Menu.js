import React, {Component} from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import {Button, Grid} from "semantic-ui-react";
import WindowSizeListener from 'react-window-size-listener'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Menu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      gridHeight: 800,
      latestImageId: null
    };

    this.style = {
      buttonStyle: {
        fontSize: "60px",
        borderRadius: "30px",
        color: "rgb(242, 242, 242)",
        backgroundColor: "rgb(160, 158, 159)",
        position: "relative",
        width: "90%",
        height: "45%",
        padding: "0",
        verticalAlign: 'middle',
      },
    };

    this.handleToTestShooting = this.handleToTestShooting.bind(this);
    this.handleToAnnotationRegister = this.handleToAnnotationRegister.bind(this);
    this.handleToMasterSetting = this.handleToMasterSetting.bind(this);
    this.handleToProductionStart = this.handleToProductionStart.bind(this);
  }

  handleToTestShooting = () => {
    this.props.history.push('/TestShooting');
  };
  handleToAnnotationRegister = () => {
    if (this.state.latestImageId === null) {
      alert("テスト用画像が取得されていません。テスト撮影画面から画像を取得してください。");
    } else {
      this.props.history.push('/AnnotationRegister/' + this.state.latestImageId);
    }
  };
  handleToProductionStart = () => {
    this.props.history.push('/ProductionStart');
  };
  handleToMasterSetting = () => {
    this.props.history.push('/MasterSetting');
  };

  render() {
    return (
      <div class="ui fluid container">
        <WindowSizeListener onResize={windowSize => {
          let gridHeight = windowSize.windowHeight - 200;
          this.setState({gridHeight: gridHeight});
        }}/>

        <Header title="Menu" dispTitle={"メンテナンス画面"}/>

        <Grid centered style={{height: this.state.gridHeight + "px"}} columns={2}>
          <Grid.Row style={{height: this.state.gridHeight + "px"}}>
            <Grid.Column className="menu-grid-cell" width={6} style={{display: "flex"}}>
              <Button onClick={this.handleToMasterSetting} className="menu-button"
                      style={this.style.buttonStyle}>
                <FontAwesomeIcon icon="cogs"/>
                <div className={"menu-button-text"}> マスタ設定</div>
              </Button>
            </Grid.Column>
            <Grid.Column className="menu-grid-cell" width={6} style={{display: "flex"}}>
              <Button onClick={this.handleToProductionStart} className="menu-button"
                      style={this.style.buttonStyle}>
                <FontAwesomeIcon icon="file-export"/>
                <div className={"menu-button-text"}> 本番撮影<br/>開始</div>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Footer/>
      </div>
    )
  }
}


export default Menu;