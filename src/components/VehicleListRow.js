import React from 'react'
import {Button, Icon, Table} from 'semantic-ui-react'

export default class VehicleListRow extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>
          {this.props.row.name}
        </Table.Cell>
        <Table.Cell>
          {this.props.row.no}
        </Table.Cell>
        <Table.Cell>
          {/*{this.props.row.no}*/}
          {this.props.row.usage_id}
        </Table.Cell>
        <Table.Cell textAlign={"right"}>
          <Button size={"mini"} onClick={this.props.selectVehicle.bind(this, this.props.index)} compact>
            <Icon name='angle right' size={"big"}/>
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}