import {wsUrl} from '../config';
import React from 'react';
import JSMpeg from '@cycjimmy/jsmpeg-player';

class MJpegPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.msjpeg = null;
    this.port = this.props.port;

    this.els = {
      videoWrapper: null,
    };
  }

  componentDidMount() {
    this.msjpeg = new JSMpeg.VideoElement(
      this.els.videoWrapper,
      `${wsUrl}:${this.port}`,
      {
        autoplay: true,
      },
      {
        preserveDrawingBuffer: true
      },
    );
    this.props.setPlayer(this.msjpeg);
  }

  componentWillUnmount() {
    console.log("unmount");
    if (this.msjpeg !== undefined && this.msjpeg !== null) {
      this.msjpeg.destroy();
    }
  }

  render() {
    return <div id="videoCanvas" style={{width: "100%", height: "100%", padding: "0", margin: "0"}}
                ref={videoWrapper => this.els.videoWrapper = videoWrapper}/>
  }
}

export default MJpegPlayer;
