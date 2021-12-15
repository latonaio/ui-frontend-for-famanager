import React from 'react'
import {Button} from 'semantic-ui-react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class BackToMenuButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.style = {
      buttonStyle: {
        fontSize: "25px",
        borderRadius: "10px",
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0)",
        width: "200px",
        padding: "0",
        textAlign: "left",
        position: "fixed",
        left: "20px",
        top: "5%",
        verticalAlign: "middle",
        textShadow: "3px 3px 3px rgba(0, 0, 0, 0.6)"
      },
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    if (this.props.unLoadCheck()) {
      this.props.history.push('/Menu');
    }
  }

  render() {
    return (
      <Button className={"menu-button"} style={this.style.buttonStyle} onClick={this.handleOnClick}>
        <FontAwesomeIcon icon="arrow-alt-circle-left" style={{fontSize: "30px"}}/>
        <div className={"menu-button-text"}>メイン画面<br/>に戻る</div>
      </Button>
    );
  }
}

export default BackToMenuButton;