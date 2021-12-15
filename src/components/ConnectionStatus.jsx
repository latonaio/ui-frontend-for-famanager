import {Grid, Header, Icon, Segment} from 'semantic-ui-react'
import React from "react";

const ICON = {
  0: {
    color: 'red',
    name: 'exclamation triangle',
  },
  1: {
    color: 'blue',
    name: 'check square',
  }
}

class ConnectionStatus extends React.Component {
  render() {
    return (
      <Segment clearing className={"connection-status"}>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header content={"接続状況"} size={"huge"}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <Header content={"カメラ接続"} size={"medium"}/>
            </Grid.Column>
            <Grid.Column width={6} textAlign={"center"}>
              <Icon
                name={ICON[this.props.camera.state].name}
                color={ICON[this.props.camera.state].color}
                size={"large"}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <Header content={"カメラ"} size={"medium"}/>
            </Grid.Column>
            <Grid.Column width={6} textAlign={"center"}>
              <Header content={this.props.camera.usage_id} size={"medium"}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default ConnectionStatus;
