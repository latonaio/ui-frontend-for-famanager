import React, {createRef} from 'react';
import {Button, Grid} from "semantic-ui-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Canvas extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.isDrawingRect = false;

    this.canvasRef = createRef();
    const getContext = (): CanvasRenderingContext2D => {
      const canvas: any = this.canvasRef.current;
      return canvas.getContext('2d');
    };
    const setRenderingImageSize = (width, height) => {
      this.renderingImageWidth = width;
      this.renderingImageHeight = height;
    };

    // onload用
    const img = new Image();
    const annotationList = this.props.annotationList;
    img.src = this.props.currentImagePath;
    const redrawRect = this.redrawRect;
    img.onload = function () {
      const ctx: CanvasRenderingContext2D = getContext();

      ctx.canvas.height = ctx.canvas.clientHeight;
      ctx.canvas.width = ctx.canvas.clientWidth;

      let height;
      let width;
      if (ctx.canvas.height < ctx.canvas.width * img.height / img.width) {
        // 画像の縦幅にあわせる
        width = img.width * (ctx.canvas.height / img.height);
        height = ctx.canvas.height;
      } else {
        // 画像の横幅にあわせる
        width = ctx.canvas.width;
        height = img.height * (ctx.canvas.width / img.width);
      }
      setRenderingImageSize(width, height);

      ctx.drawImage(img, 0, 0, img.width, img.height,
        0, 0, width, height);

      if (annotationList) {
        annotationList.forEach(
          (annotation) => {
            redrawRect(ctx, annotation.coordinates);
          }
        );
      }
    };

    this.isRegistered = false;
    this.image = img;

    this.buttonClass = "";
    if (this.props.isZoom) {
      this.buttonClass = " disabled";
    }

    this.redrawImage = this.redrawImage.bind(this);
    this.redrawRect = this.redrawRect.bind(this);
    this.redrawMarker = this.redrawMarker.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.handleRegisterButton = this.handleRegisterButton.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
    this.toggleButtons = this.toggleButtons.bind(this);
  }

  redrawImage(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height,
      0, 0, this.renderingImageWidth, this.renderingImageHeight);
  }

  redrawRect(ctx: CanvasRenderingContext2D, coordinates, color) {
    ctx.beginPath();

    const left = coordinates.left;
    const right = coordinates.right;
    const top = coordinates.top;
    const bottom = coordinates.bottom;

    // left
    ctx.moveTo(left, top);
    ctx.lineTo(left, bottom);

    // right
    ctx.moveTo(right, top);
    ctx.lineTo(right, bottom);

    // top
    ctx.moveTo(left, top);
    ctx.lineTo(right, top);

    // bottom
    ctx.moveTo(left, bottom);
    ctx.lineTo(right, bottom);

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  redrawMarker(ctx: CanvasRenderingContext2D, coordinate) {
    const x = coordinate.x;
    const y = coordinate.y;

    ctx.beginPath();

    ctx.moveTo(x, y - 30);
    ctx.lineTo(x, y + 30);

    ctx.moveTo(x - 30, y);
    ctx.lineTo(x + 30, y);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  onMouseDown(event) {
    const canvas: any = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rect = event.target.getBoundingClientRect();

    if (this.props.isZoom) {
      // 個別画像表示の場合は無視する
      return;
    }

    if (this.isRegistered) {
      // 登録済みの場合は無視する
      return;
    }

    if ((event.clientX - rect.left) > this.renderingImageWidth
      || (event.clientY - rect.top) > this.renderingImageHeight) {
      // 画像外がタップされた場合は無視する
      return;
    }

    if (!this.isDrawingRect) {
      this.x0 = event.clientX - rect.left;
      this.y0 = event.clientY - rect.top;

      this.redrawImage(ctx);
      this.redrawMarker(ctx, {x: this.x0, y: this.y0});
    } else {
      this.x1 = event.clientX - rect.left;
      this.y1 = event.clientY - rect.top;

      this.redrawImage(ctx);
      this.redrawRect(ctx, {
        left: this.x0,
        right: this.x1,
        top: this.y0,
        bottom: this.y1,
      }, "red");

      console.log('Current coordinate is %4d %4d %4d %4d',
        this.x0, this.x1, this.y0, this.y1);
    }

    this.isDrawingRect = !this.isDrawingRect;
  }

  handleRegisterButton() {
    if (!this.isDrawingRect && this.x0 && this.x1 && this.y0 && this.y1) {
      const canvas: any = this.canvasRef.current;
      const ctx = canvas.getContext('2d');

      const coordinates = {
        left: Math.min(this.x0, this.x1),
        right: Math.max(this.x0, this.x1),
        top: Math.min(this.y0, this.y1),
        bottom: Math.max(this.y0, this.y1),
      };

      this.isRegistered = true;
      this.redrawImage(ctx);
      this.redrawRect(ctx, coordinates, "blue");

      this.toggleButtons();
    } else {
      alert("ポイントを選択してください");
    }
  }

  handleSaveButton() {
    if (this.isRegistered) {
      const canvas: any = this.canvasRef.current;
      const ctx = canvas.getContext('2d');

      const rateCoordinates = {
        left: Math.min(this.x0, this.x1) / this.renderingImageWidth,
        right: Math.max(this.x0, this.x1) / this.renderingImageWidth,
        top: Math.min(this.y0, this.y1) / this.renderingImageHeight,
        bottom: Math.max(this.y0, this.y1) / this.renderingImageHeight,
      };

      this.props.savePointCoordinates(rateCoordinates);
      this.redrawImage(ctx);

      this.handleCancelButton();
    }
  }

  handleCancelButton() {
    this.isRegistered = false;
    this.isDrawingRect = false;
    this.x0 = null;
    this.y0 = null;
    this.x1 = null;
    this.y1 = null;

    const canvas: any = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    this.redrawImage(ctx);
    this.toggleButtons();
  }

  toggleButtons() {
    const registerElement = document.getElementById("register-button");
    const saveElement = document.getElementById("save-button");

    if (this.isRegistered) {
      registerElement.classList.add("disabled");
      saveElement.classList.remove("disabled");
    } else {
      registerElement.classList.remove("disabled");
      saveElement.classList.add("disabled");
    }
  }

  render() {
    return (
      <div>
        <div className={"image-area"}>
          <canvas className="canvas" ref={this.canvasRef}
                  onMouseDown={this.onMouseDown}/>
        </div>
        <Grid centered className="Grid button-area" columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Button id="register-button" onClick={this.handleRegisterButton}>
                <FontAwesomeIcon icon="hand-pointer"/>
                <div> ポイント<br/>登録</div>
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button id="save-button" onClick={this.handleSaveButton} className="disabled">
                <FontAwesomeIcon icon="save"/>
                <div> ポイント<br/>保存</div>
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button id="cancel-button" onClick={this.handleCancelButton}>
                <FontAwesomeIcon icon="times"/>
                <div>
                  ポイント<br/>登録取消
                </div>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Canvas;
