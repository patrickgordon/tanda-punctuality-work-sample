import React from 'react'
import harambe from '../assets/harambe.jpg'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import Image from 'react-bootstrap/lib/Image'
import moment from 'moment'
import find from 'lodash/find'
import humanizeDuration from 'humanize-duration/humanize-duration'
import PunctualityTable from './PunctualityTable/PunctualityTable'
import PunctualityHeader from './PunctualityHeader/PunctualityHeader'
import PunctualityCellFormatter from './PunctualityCellFormatter/PunctualityCellFormatter'

export class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.dayFormatter = this.dayFormatter.bind(this)
    this.timeFormatter = this.timeFormatter.bind(this)
    this.trClassFormat = this.trClassFormat.bind(this)
  }

  dayFormatter(cell, row) {
    return moment(cell).format('MMMM Do YYYY')
  }

  timeFormatter(cell, row) {
    if (cell) {
      var formattedTime = moment(cell).format('h:mma')
      var difference
      var labelText

      // This will format the finishing early
      if (row.shiftFinish == cell) {
        if ((row.shiftFinish) && (row.shiftFinish < row.rosterFinish)) {

          // Calculate the difference and humanize it
          difference = moment(row.rosterFinish).diff(moment(row.shiftFinish))
          labelText = humanizeDuration(difference, {units: ['m'], round: true})

          return <PunctualityCellFormatter toolTipKey={row.id} text="Left early" toolTipText={formattedTime}
                                           labelText={labelText}/>
        } else {
          if (row.rosterFinish) {
            return 'On time'
          }
        }
      }

      // This will format the starting late
      if (row.shiftStart == cell) {
        if ((row.shiftStart) && (row.shiftStart > row.rosterStart)) {
          difference = moment(row.rosterStart).diff(moment(row.shiftStart))
          labelText = humanizeDuration(difference, {units: ['m'], round: true})
          return <PunctualityCellFormatter toolTipKey={row.id} text="Arrived late" toolTipText={formattedTime}
                                           labelText={labelText}/>
        } else {
          if (row.rosterStart) {
            return 'On time'
          }
        }
      }
      return formattedTime
    }
    else {
      return 'No time clocked'
    }
  }

  /***
   * This function formats the invalid rows (i.e. those that have no shift times or no roster times) with a 'danger'
   * class which makes the row red.
   * @param rowData - not used for this func
   * @param rIndex - the index of the row of data
   * @returns {string}
   */
  trClassFormat(rowData, rIndex) {
    const {invalidDataRowIds} = this.props
    if (find(invalidDataRowIds, (item) => {
        return item === rowData.id
      })) {
      return 'danger'
    }
  }

  render() {
    var {data, stats, invalidDataRowIds} = this.props
    const numInvalidRows = invalidDataRowIds.length

    var panelHeader = (
      <Row>
        <Col xs={12}>
          <div>
            <div className="inline">
              <Image src={harambe} circle={true} style={{width: "50px", height: "50px", marginRight: "10px"}}/>
            </div>
            <div className="inline">
              <h4>Harambe</h4>
            </div>
            <div className="inline pull-right">
              <h4>buttons here</h4>
            </div>
          </div>
        </Col>
      </Row>
    )

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Panel header={panelHeader}>
              <PunctualityHeader name="Harambe" stats={stats} numInvalidRows={numInvalidRows}/>
              <Row>
                <Col xs={12}>
                  <PunctualityTable data={data} dayFormatter={this.dayFormatter}
                                    timeFormatter={this.timeFormatter} trClassFormat={this.trClassFormat}/>
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default HomeView
