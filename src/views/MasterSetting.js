import React, {Component} from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToMenuButton from "../components/BackToMenuButton";
import {Grid, Header as SHeader} from "semantic-ui-react";
import VehicleList from "../components/VehicleList";
import VehicleDetail from "../components/VehicleDetail";

class MasterSetting extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selected_vehicle: null,
      position_threshold_level: "1",
      probability_threshold_level: "1",
    };

    this.props.fetchVehicles();

    this.selectVehicle = this.selectVehicle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateThreshold = this.updateThreshold.bind(this);
    this.vehicleDetailArea = this.vehicleDetailArea.bind(this);
  }

  handleChange(e, {name, value}) {
    this.setState({[name]: value});
  }

  updateThreshold() {
    this.props.updateThreshold(
      this.state.selected_vehicle.vehicle_id,
      this.state.position_threshold_level,
      this.state.probability_threshold_level,
    );
  }

  selectVehicle(index) {
    this.setState({selected_vehicle: this.props.rows[index]});
    this.setState({position_threshold_level: this.props.rows[index].position_threshold_level});
    this.setState({probability_threshold_level: this.props.rows[index].probability_threshold_level});
  }

  vehicleDetailArea() {
    if (this.state.selected_vehicle === null) {
      return "";
    } else {
      return (
        <div>
          <SHeader size="huge" style={{color: "white", marginTop: "20px"}}>
            車種詳細
          </SHeader>
          <VehicleDetail
            vehicle={this.state.selected_vehicle}
            position_threshold_level={this.state.position_threshold_level}
            probability_threshold_level={this.state.probability_threshold_level}
            handleChange={this.handleChange}
            updateThreshold={this.updateThreshold}
            isUpdating={this.props.isUpdating}
            history={this.props.history}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div class="ui fluid container">
        <Header title="MasterSetting" dispTitle={"マスタ設定"}/>
        <Grid centered className="Grid">
          <Grid.Row color={"white"}>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <Grid>
                <Grid.Column width={8}>
                  <SHeader size="huge" style={{color: "white", marginTop: "20px"}}>
                    車種選択
                  </SHeader>
                  <div className={"vehicle-list"}>
                    <VehicleList
                      rows={this.props.rows}
                      selectVehicle={this.selectVehicle}/>
                  </div>
                </Grid.Column>
                <Grid.Column width={8}>
                  <this.vehicleDetailArea/>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
        <BackToMenuButton unLoadCheck={() => true} history={this.props.history}/>
        <Footer/>
      </div>
    )
  }
}


export default MasterSetting;