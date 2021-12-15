import React, {Component} from 'react'
import {Button, Grid, Header as SHeader, Segment, Tab} from 'semantic-ui-react'
import Header from '../components/Header';
import "../../node_modules/video-react/dist/video-react.css";
import Footer from "../components/Footer";
import BackToMenuButton from "../components/BackToMenuButton";
import MJpegPlayer from "../components/MjpegPlayer";
import ConnectionStatus from "../components/ConnectionStatus";
import WorkCanvas from "../components/WorkCanvas";
import path from "path";
import VehicleInfoArea from "../containers/VehicleInfoArea";

const MAX_POINT_COUNT = 5;
const LABEL_NUMBERS = [
  <span>&#9312;</span>,  // ①
  <span>&#9313;</span>,  // ②
  <span>&#9314;</span>,  // ③
  <span>&#9315;</span>,  // ④
  <span>&#9316;</span>,  // ⑤
];

export class TemplateRegister extends Component {
  constructor(props, context) {
    super(props, context);
    const params = this.props.match;
    this.workID = parseInt(params.params.work_id, 10);

    this.props.getImageByWorkID(this.workID);
    this.props.fetchPointsByWorkID(this.workID);

    this.state = {
      imageId: null,
      imagePath: null,
      image: null,
      player: null,
      rateCoordinates: {},
      isRegistered: false,
      selectedIndex: null,
    };

    this.isProcessing = false;
    this.isRunning = true;

    this.pointButtonArea = this.pointButtonArea.bind(this);

    this.pointListArea = this.pointListArea.bind(this);

    this.mainTabular = this.mainTabular.bind(this);
    this.mainPanes = this.mainPanes.bind(this);
    this.streamingMainPane = this.streamingMainPane.bind(this);
    this.pointMainPane = this.pointMainPane.bind(this);
    this.buttonArea = this.buttonArea.bind(this);

    this.props.getCameraByUsageID(this.workID);
  }

  componentDidMount() {
    // FIXME workIDとusageIDが同一の前提で実装している
    this.timerID = setInterval(() => this.props.getCameraByUsageID(this.workID), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    this.props.stopRtspToWs();
  }

  handleStartButton = () => this.props.getRtspToWsPort(this.workID);
  handleEndButton = () => this.props.stopRtspToWs();
  setPlayer = (player) => this.setState({player: player});

  handleCaptureButton = () => {
    const base64 = this.state.player.els.canvas.toDataURL('image/jpeg', 1.0);
    this.props.registerImage(this.workID, this.convertToBlob(base64));
  }

  convertToBlob = (base64) => {
    const binaryData = atob(base64.replace(/^.*,/, ''));
    const buffer = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      buffer[i] = binaryData.charCodeAt(i);
    }
    return new Blob([buffer.buffer], {
      type: 'image/jpeg',
    });
  }

  handleRegisterButton = () => {
    console.log(this.state.rateCoordinates)
    if (Object.keys(this.state.rateCoordinates).length !== 0) {
      this.setState({isRegistered: true})
    } else {
      alert("ポイントが選択されていません。");
    }
  };
  handleCancelButton = () => this.resetCoordinates();
  handleSaveButton = () => {
    this.props.registerPoint(this.props.imageID, this.state.rateCoordinates);
    this.resetCoordinates();
  };

  resetCoordinates = () => this.setState({isRegistered: false, rateCoordinates: {}});

  handleAllButton = () => this.setState({selectedIndex: null});
  handleFocusButton = () => {
    if (this.props.point.length > 0) {
      this.handlePointClick(0);
    }
  };

  handlePointClick = (index) => {
    this.setState({selectedIndex: index});
    this.resetCoordinates();
  }
  handleDeleteButton = (index) => {
    this.handleAllButton();
    if (this.props.point[index].point_id !== null && window.confirm("このポイントを削除しますか?")) {
      this.props.deletePoint(this.props.imageID, this.props.point[index].point_id);
    }
  }

  savePointCoordinates(rateCoordinates) {
    let count = 0;
    for (let i = 0; i < this.state.points.length; i++) {
      if (this.state.points[i].point_id) {
        count++;
      }
    }
    if (count < MAX_POINT_COUNT) {
      if (window.confirm("ポイントを保存しますか?")) {
        this.props.registerPoint(this.state.imageId, rateCoordinates);
      }
    } else {
      alert(`登録できるポイントは${MAX_POINT_COUNT}つまでです`);
    }
  }

  setRateCoordinates = (rateCoordinates) => this.setState({rateCoordinates: rateCoordinates});

  pointButtonArea() {
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Button
              id="start-button"
              onClick={this.handleAllButton}
              content={<div>全体画像</div>}
              fluid={true}
              className={"view-area-button"}
              disabled={this.state.selectedIndex === null}
              size={"huge"}
              compact
            />,
          </Grid.Column>
          <Grid.Column>
            <Button
              id="start-button"
              onClick={this.handleFocusButton}
              content={<div>個別画像</div>}
              fluid={true}
              className={"view-area-button"}
              disabled={this.state.selectedIndex !== null}
              size={"huge"}
              compact
            />,
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  pointListArea() {
    const cards = [];
    for (let i = 0; i < Math.min(this.props.point.length, MAX_POINT_COUNT); i++) {
      cards.push(
        <Segment clearing={true}
                 key={`point-${this.props.point[i].point_id}${this.state.selectedIndex === i ? "-selected" : ""}`}
                 style={this.state.selectedIndex === i ? {backgroundColor: "rgb(160, 158, 159)"} : {}}>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column verticalAlign={"middle"}>
                <SHeader as={'span'} size={"big"} onClick={this.handlePointClick.bind(this, i)}
                         content={[LABEL_NUMBERS[i], " ", path.basename(this.props.point[i].point_image_path)]}/>
                <Button floated={"right"} compact size={"big"} disabled={false} content={"削除"} style={{color: "red"}}
                        onClick={this.handleDeleteButton.bind(this, i)}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )
    }

    for (let i = this.props.point.length; i < MAX_POINT_COUNT; i++) {
      cards.push(
        <Segment clearing={true} key={`void-point-${i}`} className={"point-segment"}>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column verticalAlign={"middle"}>
                <SHeader as={'span'} size={"big"} content={LABEL_NUMBERS[i]}/>
                <Button floated={"right"} compact size={"big"} disabled={true} content={"削除"}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )
    }

    return cards;
  }

  buttonArea(args) {
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

  streamingMainPane() {
    const buttons = [
      <Button
        id="start-button"
        onClick={this.handleStartButton}
        icon={"camera retro"}
        labelPosition={'left'}
        content={<div>テスト<br/>撮影開始</div>}
        fluid={false}
        className={"button-area-button"}
        disabled={this.props.port !== null}
      />,
      <Button
        id="end-button"
        onClick={this.handleEndButton}
        icon={"stop"}
        labelPosition={'left'}
        content={<div>テスト<br/>撮影終了</div>}
        fluid={false}
        className={"button-area-button"}
        disabled={this.props.port === null}
      />,
      <Button
        id="capture-button"
        onClick={this.handleCaptureButton}
        icon={"cut"}
        labelPosition={'left'}
        content={<div>画像取得<br/><span style={{fontSize: "0.8em"}}>(テスト用)</span></div>}
        fluid={false}
        className={"button-area-button"}
        disabled={this.props.port === null}
      />
    ];

    let player = <div style={{width: "100%", height: "100%", padding: "0", margin: "0"}}/>;
    if (this.props.port !== null) {
      player = <MJpegPlayer port={this.props.port} setPlayer={this.setPlayer}/>;
    }

    return (
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
              <ConnectionStatus
                camera={this.props.camera}
              />
            </div>
            <div style={{textAlign: "right", marginRight: "20px", marginTop: "20px"}}>
            </div>
            <VehicleInfoArea workID={this.workID}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  pointMainPane() {
    const buttons = [
      <Button
        id="register-button"
        onClick={this.handleRegisterButton}
        icon={"hand pointer"}
        labelPosition={'left'}
        content={<div>ポイント<br/>登録</div>}
        fluid={false}
        className={"button-area-button"}
        disabled={this.state.isRegistered}
      />,
      <Button
        id="save-button"
        onClick={this.handleSaveButton}
        icon={"save"}
        labelPosition={'left'}
        content={<div>ポイント<br/>保存</div>}
        fluid={false}
        className={"button-area-button"}
        disabled={!this.state.isRegistered}
      />,
      <Button
        id="cancel-button"
        onClick={this.handleCancelButton}
        icon={"times"}
        labelPosition={'left'}
        content={<div>ポイント<br/>登録取消</div>}
        fluid={false}
        className={"button-area-button"}
        disabled={!this.state.isRegistered}
      />
    ];

    let canvas = <div style={{width: "100%", height: "100%", padding: "0", margin: "0"}}/>;
    if (this.props.imageURL !== null) {
      let imageURL = this.props.imageURL;
      if (this.state.selectedIndex !== null) {
        imageURL = this.props.point[this.state.selectedIndex].pointImageURL;
      }
      canvas = <WorkCanvas imagePath={imageURL}
                           setRateCoordinates={this.setRateCoordinates}
                           rateCoordinates={this.state.rateCoordinates}
                           key={imageURL + this.state.isRegistered}
                           isRegistered={this.state.isRegistered}
                           isFocus={this.state.selectedIndex !== null}
      />;
    }

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <div className={"image-area"} style={{width: "1260px", height: "700px"}}>
              {canvas}
            </div>
            <this.buttonArea buttons={buttons}/>
          </Grid.Column>
          <Grid.Column width={4} className="setting-column">
            <this.pointButtonArea/>
            <this.pointListArea/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  mainPanes() {
    const style = {
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderStyle: "none",
      paddingLeft: "0",
      paddingTop: "0",
    };

    return [
      {
        menuItem: 'ストリーミング',
        render: () =>
          <Tab.Pane style={style}>
            {this.streamingMainPane()}
          </Tab.Pane>
      },
      {
        menuItem: '取得画像',
        render: () =>
          <Tab.Pane style={style}>
            {this.pointMainPane()}
          </Tab.Pane>
      },
    ];
  }

  mainTabular() {
    return (
      <Grid.Column width={15} style={{marginTop: "0", marginLeft: "0"}}>
        <Tab
          className={"point-register-main"}
          menu={{fluid: true, vertical: true, tabular: true}}
          grid={{paneWidth: 15, tabWidth: 1}}
          panes={this.mainPanes()}
        />
      </Grid.Column>
    )
  }

  render() {
    return (
      <div className="ui fluid container">
        <Header title="GoodPointRegister" dispTitle={"テスト撮影画面"}/>
        <Grid centered className="Grid">
          <Grid.Row>
            <this.mainTabular/>
          </Grid.Row>
        </Grid>
        <BackToMenuButton unLoadCheck={() => true} history={this.props.history}/>
        <Footer/>
      </div>
    )
  }
}


export default TemplateRegister;
