import React from 'react'
import {Table} from 'semantic-ui-react'
import ListRow from './VehicleListRow';

export default class VehicleList extends React.Component {
  render() {
    const rows = [];
    for (let i = 0; i < this.props.rows.length; i++) {
      rows.push(
        <ListRow row={this.props.rows[i]} selectVehicle={this.props.selectVehicle} index={i}/>
      );
    }
    return (
      <Table verticalAlign={'large'} size={"small"} basic={'very'} style={{fontSize: "1.2em"}}>
        <Table.Header>
          <Table.HeaderCell content={"車種"}/>
          <Table.HeaderCell content={"型番(車両型式)"}/>
          <Table.HeaderCell content={"カメラ"}/>
          <Table.HeaderCell content={""}/>
        </Table.Header>
        {rows}
      </Table>
    );
  }
}