import React from 'react'
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable'
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn'

export const PunctualityTable = (props) => {
  const {data, dayFormatter, timeFormatter, trClassFormat} = props
  return (
    <BootstrapTable data={data} hover={true} condensed={true} trClassName={trClassFormat} pagination={true}>
      <TableHeaderColumn dataField="date" isKey={true} dataAlign="center" dataSort={true}
                         dataFormat={dayFormatter}>Day</TableHeaderColumn>
      <TableHeaderColumn dataField="rosterStart" dataFormat={timeFormatter}>Rostered Start</TableHeaderColumn>
      <TableHeaderColumn dataField="shiftStart" dataFormat={timeFormatter}>Actual Start</TableHeaderColumn>
      <TableHeaderColumn dataField="rosterFinish" dataFormat={timeFormatter}>Rostered Finish</TableHeaderColumn>
      <TableHeaderColumn dataField="shiftFinish" dataFormat={timeFormatter}>Actual Finish</TableHeaderColumn>
    </BootstrapTable>
  )
}

PunctualityTable.propTypes = {
  data: React.PropTypes.array.isRequired
}

export default PunctualityTable
