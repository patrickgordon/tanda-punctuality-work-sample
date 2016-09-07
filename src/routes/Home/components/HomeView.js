import React from 'react'
import classes from './HomeView.scss'
import harambe from '../assets/harambe.jpg'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import Image from 'react-bootstrap/lib/Image'
import moment from 'moment'
import find from 'lodash/find'
import PunctualityTable from './PunctualityTable/PunctualityTable'
import PunctualityHeader from './PunctualityHeader/PunctualityHeader'

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
      return moment(cell).format('h:mma')
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
    var {data, stats} = this.props

    var panelHeader = (
      <Row>
        <Col xs={12}>
          <div>
            <div className={classes['inline']}>
              <Image src={harambe} circle={true} style={{width: "50px", height: "50px", marginRight: "10px"}}/>
            </div>
            <div className={classes['inline']}>
              <h4>Harambe</h4>
            </div>
            <div className={classes['inline'] + " pull-right"}>
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
              <Row>
                <Col xs={6} xsOffset={3}>
                  <PunctualityHeader name="Harambe" stats={stats}/>
                </Col>
              </Row>
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
