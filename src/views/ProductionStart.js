import React, {Component} from 'react';
import {Button, Card, Grid, Header as SHeader, Icon, Segment} from "semantic-ui-react";
import MJpegPlayer from "../components/MjpegPlayer";
import Header from "../components/Header";
import BackToMenuButton from "../components/BackToMenuButton";
import Footer from "../components/Footer";
import VehicleInfoArea from "../containers/VehicleInfoArea";

const CONNECTED = {
  iconColor: "blue",
  iconName: "check square",
};

const DISCONNECT = {
  iconColor: "red",
  iconName: "exclamation triangle",
};

const MAX_POINT_COUNT = 5;

const LABEL_NUMBERS = [
  <span>&#9312;</span>,  // ①
  <span>&#9313;</span>,  // ②
  <span>&#9314;</span>,  // ③
  <span>&#9315;</span>,  // ④
  <span>&#9316;</span>,  // ⑤
];

export class ProductionStart extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      player: null,
      selectedDeviceIndex: 0,
      workID: 1,
    }

    this.props.fetchVehicles();
    this.props.getAllCamera();
  }

  componentDidMount = () => {
    this.props.setTemplatesToAll();
    this.timerID1 = setInterval(() => this.callGetMatchingRate(), 1000);
    this.timerID2 = setInterval(() => this.props.getAllCamera(), 2000);
  }

  componentWillUnmount = () => {
    this.props.stopRtspToWs();
    clearInterval(this.timerID1);
    clearInterval(this.timerID2);
  }

  callGetMatchingRate = () => this.props.getMatchingRate(this.state.workID);

  // FIXME workIDとusageIDが同一の前提で実装している
  handleStartButton = () => this.props.getRtspToWsPort(this.state.workID);

  handleEndButton = () => this.props.stopRtspToWs();

  handleCameraClick = (usageID) => {
    this.props.stopRtspToWs();
    // FIXME workIDとusageIDが同一の前提で実装している
    this.setState({workID: usageID});
  }

  resultRow = (index, matching) => {
    if (this.props.port === null
      || matching.matching_rate === undefined
      || matching.pass_threshold === undefined) {
      return this.emptyResultRow(index);
    }

    let color = matching.matching_rate > matching.pass_threshold ? "blue" : "#be1414";
    let icon =
      <Icon.Group>
        <Icon style={{color: "white", fontSize: "3em"}} name={"circle"} size={"huge"}/>
        {
          matching.matching_rate > matching.pass_threshold
            ? <Icon style={{color, fontSize: "3.5em"}} name={"check circle"} size={"huge"}/>
            : <Icon style={{color: "#d21414", fontSize: "3.5em"}} name={"times circle"} size={"huge"}/>
        }
      </Icon.Group>;

    return (
      <Grid.Row style={{paddingTop: "0.4em", paddingBottom: "0.4em", height: '57px'}}>
        <Grid.Column width={3} style={{fontSize: "4.5em", color, fontWeight: "bold"}}>
          {LABEL_NUMBERS[index]}
        </Grid.Column>
        <Grid.Column width={3}>
          {icon}
        </Grid.Column>
        <Grid.Column width={10} textAlign={"left"} style={{fontSize: "2.0em", fontWeight: "bold", color}}>
          (一致率:{(String(Math.round(matching.matching_rate * 1000) / 1000) + "000").slice(0, 5)})
        </Grid.Column>
      </Grid.Row>
    );
  }

  emptyResultRow = (index) => {
    return (
      <Grid.Row style={{paddingTop: "0.4em", paddingBottom: "0.4em", height: '57px'}}>
        <Grid.Column width={3} style={{fontSize: "4.5em", fontWeight: "bold", color: 'black'}}>
          {LABEL_NUMBERS[index]}
        </Grid.Column>
        <Grid.Column width={3}/>
        <Grid.Column width={10}/>
      </Grid.Row>
    );
  }

  resultRows = () => {
    const rows = [];
    this.props.matching.map((r, index) => rows.push(this.resultRow(index, r)));

    for (let i = this.props.matching.length; i < MAX_POINT_COUNT; i++) {
      rows.push(this.emptyResultRow(i));
    }

    return rows;
  }

  resultArea = () =>
    <Segment className={"connection-status"}>
      <SHeader content={'判定結果'} size={"huge"} style={{color: "white"}}/>
      <Grid textAlign={"center"} verticalAlign={"middle"} style={{marginTop: "1em", marginBottom: "0em"}}>
        {this.resultRows()}
      </Grid>
    </Segment>

  currentVehicleArea = () =>
    <Card style={{fontSize: "1.5em"}}>
      <Card.Content>
        <Card.Header content={"車種情報"}/>
      </Card.Content>
      <Card.Content>
        <Card.Description content={this.props.currentVehicle.name}/>
        <Card.Meta content={this.props.currentVehicle.no}/>
      </Card.Content>
    </Card>

  buttonArea = (args) => {
    const gridColumns = [];
    for (let i = 0; i < args.buttons.length; i++) {
      gridColumns.push(
        <Grid.Column textAlign={"center"}>
          {args.buttons[i]}
        </Grid.Column>
      );
    }

    return (
      <Grid centered columns={args.buttons.length} style={{marginTop: "0.5em"}}>
        <Grid.Row className={"button-area"}>
          {gridColumns}
        </Grid.Row>
      </Grid>
    );
  }

  connectionStatusArea = () => {
    const deviceRows = [];

    for (let i = 0; i < this.props.cameras.length; i++) {
      let icon;
      if (this.props.cameras[i].state === 1) {
        icon = CONNECTED;
      } else {
        icon = DISCONNECT;
      }

      deviceRows.push(
        <Grid.Row className={"narrow"} columns={1}>
          <Grid.Column>
            <Button fluid compact disabled={this.state.workID === this.props.cameras[i].usage_id}
                    onClick={this.handleCameraClick.bind(this, this.props.cameras[i].usage_id)}
                    className={"reversed-disable"}>
              <Grid>
                <Grid.Row className={""} verticalAlign={"middle"}>
                  <Grid.Column width={13} textAlign={"left"}>
                    <SHeader content={"カメラ" + this.props.cameras[i].usage_id} size={"large"}
                             style={{color: "black", textShadow: "0 0 0"}}/>
                  </Grid.Column>
                  <Grid.Column width={3} textAlign={"center"}>
                    <Icon name={icon.iconName} color={icon.iconColor} size={"large"}/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Button>
          </Grid.Column>
        </Grid.Row>
      )
    }

    return (
      <Segment clearing className={"connection-status"}>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <SHeader content={"接続状況"} size={"huge"}/>
            </Grid.Column>
          </Grid.Row>
          {deviceRows}
        </Grid>
      </Segment>
    );
  }

  render() {
    const buttons = [
      <Button
        id="start-button"
        onClick={this.handleStartButton}
        icon={"camera retro"}
        labelPosition={'left'}
        content={<div>本番<br/>撮影開始</div>}
        fluid={false}
        className={"button-area-button"}
        disabled={!this.props.isAvailable || this.props.port !== null}
      />,
      <Button
        id="end-button"
        onClick={this.handleEndButton}
        icon={"stop"}
        labelPosition={'left'}
        content={<div>本番<br/>撮影終了</div>}
        fluid={false}
        className={"button-area-button"}
        disabled={!this.props.isAvailable || this.props.port === null}
      />
    ];

    let player = <div id="videoCanvas" style={{width: "100%", height: "100%", padding: "0", margin: "0"}}/>;
    if (this.props.port !== null) {
      player = <MJpegPlayer port={this.props.port}
                            setPlayer={() => {
                              // 何もしない
                            }}/>;
    }

    return (
      <div className="ui fluid container">
        <Header title="GoodPointRegister" dispTitle={"本番撮影開始"}/>
        <Grid centered className="Grid">
          <Grid.Row>
            <Grid.Column width={15}>
              <Grid centered className="Grid">
                <Grid.Row>
                  <Grid.Column width={1}/>
                  <Grid.Column width={15} style={{marginTop: "0", marginLeft: "0"}}>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={12}>
                          <div className={"image-area"} style={{width: "1260px", height: "700px"}}>
                            {player}
                          </div>
                          <this.buttonArea buttons={buttons}/>
                        </Grid.Column>
                        <Grid.Column width={4} className="setting-column">
                          <div>
                            <this.connectionStatusArea/>
                          </div>
                          <this.resultArea/>
                          <VehicleInfoArea workID={this.state.workID}/>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <BackToMenuButton unLoadCheck={() => true} history={this.props.history}/>
        <Footer hideImage/>
      </div>
    );
  }
}


export default ProductionStart;
