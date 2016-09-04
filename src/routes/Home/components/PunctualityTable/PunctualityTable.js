import React from 'react'
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable'
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn'

export const PunctualityTable = (props) => {
  const {roster} = props
  return (
    <BootstrapTable data={roster} pagination={true} hover={true} condensed={true}>
      <TableHeaderColumn dataField="date" isKey={true} dataAlign="center" dataSort={true}>Day</TableHeaderColumn>
      <TableHeaderColumn dataField="start" dataSort={true}>Rostered Start</TableHeaderColumn>
      <TableHeaderColumn dataField="finish" dataSort={true}>Rostered Finish</TableHeaderColumn>
    </BootstrapTable>
  )
}

PunctualityTable.propTypes = {
  roster: React.PropTypes.array.isRequired
}

export default PunctualityTable
