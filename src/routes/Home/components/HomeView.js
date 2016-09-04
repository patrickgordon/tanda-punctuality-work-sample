import React from 'react'
import classes from './HomeView.scss'
import harambe from '../assets/harambe.jpg'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import Image from 'react-bootstrap/lib/Image'
import forEach from 'lodash/forEach'
import moment from 'moment'

import PunctualityTable from './PunctualityTable/PunctualityTable'

export class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this._formatData = this._formatData.bind(this)
  }

  _formatData(roster) {

    var formattedData = []

    forEach(roster, (item) => {
      var formattedRosterItem = {}
      formattedRosterItem.date = moment(item.date).format('MMMM Do YYYY')
      formattedRosterItem.start = moment(item.start).format('h:mma')
      formattedRosterItem.finish = moment(item.finish).format('h:mma')
      formattedData.push(formattedRosterItem)
    })
    console.log(formattedData)
    return formattedData
  }

  render() {
    var {roster} = this.props
    if (roster && (roster.length > 0)) {
      roster = this._formatData(roster)
    }

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
                <Col xs={12}>
                  <PunctualityTable roster={roster}/>
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
