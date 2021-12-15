import React, {createRef} from 'react';

const NO_IMAGE = "/no_image.jpg";

class WorkCanvas extends React.Component {
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
    img.src = this.props.imagePath;
    const redrawRect = this.redrawRect;
    const rateCoordinates = this.props.rateCoordinates;
    const isRegistered = this.props.isRegistered;
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
      if (Object.keys(rateCoordinates).length !== 0) {
        redrawRect(ctx, {
            left: rateCoordinates.left * width,
            right: rateCoordinates.right * width,
            top: rateCoordinates.top * height,
            bottom: rateCoordinates.bottom * height,
          }, isRegistered ? "blue" : "red"
        )
      }
    };

    this.image = img;

    this.redrawImage = this.redrawImage.bind(this);
    this.redrawRect = this.redrawRect.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
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
    ctx.lineWidth = 5;
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

    if (this.props.isRegistered || this.props.isFocus) {
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
      this.redrawRect(
        ctx,
        {
          left: this.x0,
          right: this.x1,
          top: this.y0,
          bottom: this.y1,
        },
        'red');
      console.log('Current coordinate is %4d %4d %4d %4d',
        this.x0, this.y0, this.y0, this.y1);

      const rateCoordinates = {
        left: Math.min(this.x0, this.x1) / this.renderingImageWidth,
        right: Math.max(this.x0, this.x1) / this.renderingImageWidth,
        top: Math.min(this.y0, this.y1) / this.renderingImageHeight,
        bottom: Math.max(this.y0, this.y1) / this.renderingImageHeight,
      };

      this.props.setRateCoordinates(rateCoordinates);
    }

    this.isDrawingRect = !this.isDrawingRect;
  }

  render() {
    if (!this.props.imagePath) {
      return (
        <div className={"image-area"}>
          <img src={NO_IMAGE} alt={"Failed"} className="canvas"/>
        </div>
      );
    } else {
      return (
        <canvas className="canvas" ref={this.canvasRef}
                style={{width: "100%", height: "100%", padding: "0", margin: "0"}}
                onMouseDown={this.onMouseDown}/>
      );
    }
  }
}

export default WorkCanvas;
