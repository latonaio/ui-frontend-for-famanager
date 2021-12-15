import React from 'react'
import {Button} from 'semantic-ui-react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class NextButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.style = {
      buttonStyle: {
        fontSize: "40px",
        borderRadius: "10px",
        color: "rgb(242, 242, 242)",
        backgroundColor: "rgb(160, 158, 159)",
        width: "350px",
        height: "120px",
        padding: "0",
        textAlign: "center",
        position: "fixed",
        right: "20px",
        bottom: "27.5%",
        textShadow: "3px 3px 3px rgba(0, 0, 0, 0.6)"
      },
      buttonTextStyle: {
        paddingLeft: "5%",
        paddingRight: "5%",
      }
    };

    if (this.props.leftIcon) {
      this.style.buttonTextStyle.paddingLeft = "30%";
    }
    if (this.props.rightIcon) {
      this.style.buttonTextStyle.paddingRight = "25%";
    }

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick () {
    const next = this.props.getNext();
    if (next !== null) {
      this.props.history.push(next);
    }
  }

  render() {
    return (
      <Button className={"menu-button"} style={this.style.buttonStyle} onClick={this.handleOnClick}>
        <FontAwesomeIcon icon={this.props.leftIcon}/>
        <div className={"menu-button-text"} style={this.style.buttonTextStyle}>{this.props.label}</div>
        <FontAwesomeIcon icon={this.props.rightIcon} style={{marginLeft: "65%"}}/>
      </Button>
    );
  }
}

export default NextButton;