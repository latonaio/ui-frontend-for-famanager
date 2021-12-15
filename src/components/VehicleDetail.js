import React from 'react'
import {Button, Card, Form, Grid, List} from "semantic-ui-react";

// TODO どこかで一元管理したい
const THRESHOLD_LABEL = {
  1: "最小",
  2: "小",
  3: "中",
  4: "大",
  5: "最大",
};

export default class VehicleDetail extends React.Component {
  handleNextButton = (workID) => {
    this.props.history.push(`/TemplateRegister/${workID}`);
  };

  render() {
    const positionThresholdLevel = this.props.position_threshold_level;
    const probabilityThresholdLevel = this.props.probability_threshold_level;

    const workList = [];
    for (let i = 0; i < this.props.vehicle.works.length; i++) {
      const work = this.props.vehicle.works[i];
      workList.push(
        <List.Item key={"list-item-" + i}>
          <List.Content floated={"right"}>
            <Button
              size={"big"}
              compact
              onClick={this.handleNextButton.bind(this, work.work_id)}
              content={"テスト撮影へ"}
            />
          </List.Content>
          <List.Header>
            {work.name}
          </List.Header>
        </List.Item>
      );
    }

    let className = "";
    if (this.props.isUpdating) {
      className = "disabled loading";
    }

    const updateButton =
      <Button floated={"right"} onClick={this.props.updateThreshold} className={className}>
        更新
      </Button>;

    return (
      <Card fluid style={{fontSize: "1.2em", marginTop: "0"}}>
        <Card.Content>
          <Grid verticalAlign={"middle"} textAlign={"center"} relaxed columns={3}>
            <Grid.Row>
              <Grid.Column>{"車種"}</Grid.Column>
              <Grid.Column>{"型番(車両型式)"}</Grid.Column>
              <Grid.Column>{"カメラ"}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>{this.props.vehicle.name}</Grid.Column>
              <Grid.Column>{this.props.vehicle.no}</Grid.Column>
              <Grid.Column>{this.props.vehicle.usage_id}</Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        <Card.Content as={Form}>
          <Form.Input
            label={`ずれ感度: ${THRESHOLD_LABEL[positionThresholdLevel]}`}
            min={1}
            max={5}
            onChange={this.props.handleChange}
            step={1}
            type='range'
            value={positionThresholdLevel}
            name={"position_threshold_level"}
          />
          <Form.Input
            label={`検出感度: ${THRESHOLD_LABEL[probabilityThresholdLevel]}`}
            min={1}
            max={5}
            onChange={this.props.handleChange}
            step={1}
            type='range'
            value={probabilityThresholdLevel}
            name={"probability_threshold_level"}
          />
          {updateButton}
        </Card.Content>
        <Card.Content>
          <List divided verticalAlign='middle' size={"large"}>
            {workList}
          </List>
        </Card.Content>
      </Card>
    );
  }
}