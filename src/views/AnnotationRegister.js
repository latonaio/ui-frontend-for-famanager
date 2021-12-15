import React from 'react'
import {Button, Grid} from 'semantic-ui-react'
import {apiUrl, publicUrl} from '../config';
import Header from '../components/Header';
import "../../node_modules/video-react/dist/video-react.css";
import Canvas from '../containers/Canvas';
import NextButton from "../components/NextButton";
import Footer from "../components/Footer";
import BackToMenuButton from "../components/BackToMenuButton";

const emptyPoint = {point_id: null, point_image_path: null};
const labelNumbers = ["①", "②", "③", "④", "⑤"];

const MAX_POINT_COUNT = 5;

export class AnnotationRegister extends React.Component {
  constructor(props, context) {
    super(props, context);
    const params = this.props.match;

    const imageId = parseInt(params.params.id, 10);
    this.state = {
      imageId: imageId,
      image: null,
      points: [
        emptyPoint,
        emptyPoint,
        emptyPoint,
        emptyPoint,
        emptyPoint
      ],
      isZoom: false,
      redirectTo: "",
    };

    this.imagePath = null;
    this.isRunning = true;

    this.style = {
      buttonStyle: {
        fontSize: "30px",
        borderRadius: "10px",
        color: "rgb(242, 242, 242)",
        backgroundColor: "rgb(160, 158, 159)",
        position: "relative",
        width: "180px",
        height: "70px",
        padding: "0",
        textAlign: "center",
        verticalAlign: 'middle'
      },
    };

    if (this.state.imageId !== undefined && !isNaN(this.state.imageId)) {
      this.fetchImage();
      this.fetchPoints();
    }

    this.savePointCoordinates = this.savePointCoordinates.bind(this);
    this.handlePointOnClick0 = this.handlePointOnClick0.bind(this);
    this.handlePointOnClick1 = this.handlePointOnClick1.bind(this);
    this.handlePointOnClick2 = this.handlePointOnClick2.bind(this);
    this.handlePointOnClick3 = this.handlePointOnClick3.bind(this);
    this.handlePointOnClick4 = this.handlePointOnClick4.bind(this);
    this.handleDeletePointOnClick0 = this.handleDeletePointOnClick0.bind(this);
    this.handleDeletePointOnClick1 = this.handleDeletePointOnClick1.bind(this);
    this.handleDeletePointOnClick2 = this.handleDeletePointOnClick2.bind(this);
    this.handleDeletePointOnClick3 = this.handleDeletePointOnClick3.bind(this);
    this.handleDeletePointOnClick4 = this.handleDeletePointOnClick4.bind(this);
    this.zoomPoint = this.zoomPoint.bind(this);
    this.deletePoint = this.deletePoint.bind(this);
    this.handleAllViewButton = this.handleAllViewButton.bind(this);
    this.toggleButtonColor = this.toggleButtonColor.bind(this);
    this.togglePointColor = this.togglePointColor.bind(this);
    this.handleZoomViewButton = this.handleZoomViewButton.bind(this);

    this.isProcessingCheck = this.isProcessingCheck.bind(this);
    this.getNext = this.getNext.bind(this);
  }

  componentWillUnmount() {
    this.isRunning = false;
  }

  fetchImage() {
    fetch(apiUrl + "/annotation-register/get/" + this.state.imageId).then(response => {
      return response.json();
    }).then(response => {
      if (response !== undefined && response.length > 0) {
        const image = response[0];
        if (image.image_path !== null) {
          this.setState({
            currentImagePath: publicUrl + image.image_path,
            image: image
          });
          this.imagePath = publicUrl + image.image_path;
        }
      }
    });
  }

  fetchPoints() {
    fetch(apiUrl + "/annotation-register/fetch-points/" + this.state.imageId).then(response => {
      return response.json();
    }).then(response => {
      const points = [];
      if (response !== undefined) {
        for (let i = 0; i < Math.min(response.length, MAX_POINT_COUNT); i++) {
          points.push(response[i]);
          const deleteButton = document.getElementById("delete-button-" + i.toString());
          if (deleteButton !== null) {
            deleteButton.classList.remove("disabled");
          }
        }
        for (let i = response.length; i < MAX_POINT_COUNT; i++) {
          points.push(emptyPoint);
          const deleteButton = document.getElementById("delete-button-" + i.toString());
          if (deleteButton !== null) {
            deleteButton.classList.add("disabled");
          }
        }
      }
      this.setState({points: points});
    });

    if (this.isRunning) {
      setTimeout(
        function () {
          this.fetchPoints();
        }.bind(this),
        3000
      );
    } else {
      console.log("fetchPoints End");
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

  handlePointOnClick0() {
    this.zoomPoint(0);
  }

  handlePointOnClick1() {
    this.zoomPoint(1);
  }

  handlePointOnClick2() {
    this.zoomPoint(2);
  }

  handlePointOnClick3() {
    this.zoomPoint(3);
  }

  handlePointOnClick4() {
    this.zoomPoint(4);
  }

  zoomPoint(i) {
    if (this.state.points[i].point_image_path) {
      this.setState({
        currentImagePath: publicUrl + this.state.points[i].point_image_path,
        isZoom: true,
      });
      this.toggleButtonColor(true);
      this.togglePointColor(i);
    }
  }

  handleDeletePointOnClick0() {
    this.deletePoint(0);
  }

  handleDeletePointOnClick1() {
    this.deletePoint(1);
  }

  handleDeletePointOnClick2() {
    this.deletePoint(2);
  }

  handleDeletePointOnClick3() {
    this.deletePoint(3);
  }

  handleDeletePointOnClick4() {
    this.deletePoint(4);
  }

  deletePoint(i) {
    document.getElementById("delete-button-" + i.toString()).classList.add("disabled");
    if (this.state.points[i].point_id && window.confirm("このポイントを削除しますか?")) {
      this.props.deletePoint(this.state.imageId, this.state.points[i].point_id);
      this.setState(
        {
          currentImagePath: this.imagePath,
          isZoom: false
        }
      );
      this.togglePointColor(null);
      this.toggleButtonColor(false);
    } else {
      document.getElementById("delete-button-" + i.toString()).classList.remove("disabled");
    }
  }

  handleAllViewButton() {
    this.setState(
      {
        currentImagePath: this.imagePath,
        isZoom: false
      }
    );
    this.togglePointColor(null);
    this.toggleButtonColor(false);
  }

  handleZoomViewButton() {
    if (!this.state.isZoom) {
      if (this.state.points[0].point_id) {
        this.zoomPoint(0);
      } else {
        alert("ポイントが登録されていません");
      }
    }
  }

  toggleButtonColor(isZoom) {
    if (isZoom) {
      document.getElementById("zoom-view-button").classList.add("selected-view");
      document.getElementById("all-view-button").classList.remove("selected-view");
    } else {
      document.getElementById("zoom-view-button").classList.remove("selected-view");
      document.getElementById("all-view-button").classList.add("selected-view");
    }
  }

  togglePointColor(selected) {
    for (let i = 0; i < this.state.points.length; i++) {
      if (i === selected) {
        document.getElementById("point-" + i.toString())
          .classList.add("selected-point");
      } else {
        document.getElementById("point-" + i.toString())
          .classList.remove("selected-point");
      }
    }
  }

  isProcessingCheck() {
    return true;
  }

  getNext() {
    if (this.isProcessingCheck()) {
      return "/ProductionStart/";
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="ui fluid container">
        <Header title="GoodPointRegister" dispTitle={"良否判定ポイント登録"} fontSize={"35px"}/>

        <Grid centered className="Grid">
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={11} className="setting-column">
              <div className={'setting-contents'} key={this.state.currentImagePath}>
                <Canvas centerd currentImagePath={this.state.currentImagePath}
                        savePointCoordinates={this.savePointCoordinates} isZoom={this.state.isZoom}/>
              </div>
            </Grid.Column>
            <Grid.Column width={4} className="setting-column">
              <div style={{marginRight: "20px"}}>
                <Button className={'ui right floated menu-button'} onClick={this.handleZoomViewButton}
                        style={this.style.buttonStyle} id={'zoom-view-button'}>
                  <div style={{textShadow: "3px 3px 3px rgba(0, 0, 0, 0.6)"}}> 個別画像</div>
                </Button>
                <Button className={'ui right floated menu-button selected-view'} onClick={this.handleAllViewButton}
                        style={this.style.buttonStyle} id={'all-view-button'}>
                  <div style={{textShadow: "3px 3px 3px rgba(0, 0, 0, 0.6)"}}> 全体画像</div>
                </Button>
              </div>
              <div style={{clear: "both", paddingTop: "20px"}}>
                <p className={'point-list-item'} id={'point-0'}>
                  <span onClick={this.handlePointOnClick0}>
                    {labelNumbers[0]}
                    {this.state.points[0].point_image_path
                    && this.state.points[0].point_image_path.replace("/uploads/", "")}
                  </span>
                  <Button onClick={this.handleDeletePointOnClick0} className={'ui right floated'}
                          style={{color: "red"}} id={"delete-button-0"}>削除</Button>
                </p>
                <p className={'point-list-item'} id={'point-1'}>
                  <span onClick={this.handlePointOnClick1}>
                    {labelNumbers[1]}
                    {this.state.points[1].point_image_path
                    && this.state.points[1].point_image_path.replace("/uploads/", "")}
                  </span>
                  <Button onClick={this.handleDeletePointOnClick1} className={'ui right floated'}
                          style={{color: "red"}} id={"delete-button-1"}>削除</Button>
                </p>
                <p className={'point-list-item'} id={'point-2'}>
                  <span onClick={this.handlePointOnClick2}>
                    {labelNumbers[2]}
                    {this.state.points[2].point_image_path
                    && this.state.points[2].point_image_path.replace("/uploads/", "")}
                  </span>
                  <Button onClick={this.handleDeletePointOnClick2} className={'ui right floated'}
                          style={{color: "red"}} id={"delete-button-2"}>削除</Button>
                </p>
                <p className={'point-list-item'} id={'point-3'}>
                  <span onClick={this.handlePointOnClick3}>
                    {labelNumbers[3]}
                    {this.state.points[3].point_image_path
                    && this.state.points[3].point_image_path.replace("/uploads/", "")}
                  </span>
                  <Button onClick={this.handleDeletePointOnClick3} className={'ui right floated'}
                          style={{color: "red"}} id={"delete-button-3"}>削除</Button>
                </p>
                <p className={'point-list-item'} id={'point-4'}>
                  <span onClick={this.handlePointOnClick4}>
                    {labelNumbers[4]}
                    {this.state.points[4].point_image_path
                    && this.state.points[4].point_image_path.replace("/uploads/", "")}
                  </span>
                  <Button onClick={this.handleDeletePointOnClick4} className={'ui right floated'}
                          style={{color: "red"}} id={"delete-button-4"}>削除</Button>
                </p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <BackToMenuButton unLoadCheck={this.isProcessingCheck} history={this.props.history}/>
        <NextButton
          getNext={this.getNext}
          history={this.props.history}
          label={<span style={{verticalAlign: "middle"}}> 本番撮影 <br/> 開始へ </span>}
          leftIcon={""}
          rightIcon={"arrow-alt-circle-right"}
        />
        <Footer/>
      </div>
    )
  }
}


export default AnnotationRegister;