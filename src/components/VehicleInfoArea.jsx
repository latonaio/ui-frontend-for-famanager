import React, {Component} from "react";
import {Grid, Segment} from "semantic-ui-react";

const THRESHOLD_LABEL = {
  1: "最小",
  2: "小",
  3: "中",
  4: "大",
  5: "最大",
};

export class VehicleInfoArea extends Component {
  constructor(props, context) {
    super(props, context);

    this.props.getVehicleByWorkID(this.props.workID);
    this.props.getWork(this.props.workID);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.workID !== this.props.workID) {
      this.props.getVehicleByWorkID(this.props.workID);
      this.props.getWork(this.props.workID);
    }
  }

  vehicleInfoRows = (args) => {
    const rows = [];
    for (let i = 0; i < args.content.length; i++) {
      rows.push(
        <Grid.Row columns={2}>
          <Grid.Column>
            {args.content[i].key}:
          </Grid.Column>
          <Grid.Column>
            {args.content[i].value}
          </Grid.Column>
        </Grid.Row>
      );
    }

    return rows;
  }

  render = () => {
    let positionThresholdLevel = "";
    if (this.props.work.positionThresholdLevel) {
      positionThresholdLevel = THRESHOLD_LABEL[this.props.work.positionThresholdLevel];
    }
    let probabilityThresholdLevel = "";
    if (this.props.work.probabilityThresholdLevel) {
      probabilityThresholdLevel = THRESHOLD_LABEL[this.props.work.probabilityThresholdLevel];
    }

    const rowsContent = [
      {key: "車種", value: <div>{this.props.vehicle.name}</div>},
      {key: "車両型式", value: <div>{this.props.vehicle.no}</div>},
      {key: "ワーク種類", value: <div>{this.props.work.name}</div>},
      {key: "感度", value: <div>ずれ感度: {positionThresholdLevel}<br/>検出感度: {probabilityThresholdLevel}</div>},
    ];

    return (
      <Segment style={{fontSize: "1.3em"}}>
        <Grid>
          <this.vehicleInfoRows content={rowsContent}/>
        </Grid>
      </Segment>
    )
  }
}