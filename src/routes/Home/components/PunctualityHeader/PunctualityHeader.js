import React from 'react';
import Label from 'react-bootstrap/lib/Label'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import PunctualityChart from '../PunctualityChart/PunctualityChart'

export const PunctualityHeader = (props) => {
  const {name, stats, numInvalidRows} = props
  const {punctual, punctualPercent, notPunctualPercent, arrivedLate, leftEarly} = stats

  var chartData = [
    {x: [punctualPercent], y: punctualPercent, isPunctualityValue: true},
    {x: [], y: notPunctualPercent, isPunctualityValue: false}
  ]

  return (
    <Row>
      <Col xs={6} xsOffset={3}>
        <Row>
          <Col xs={12} className="text-center">
            <PunctualityChart data={chartData}/>
            <div>
              <p>
                {name} was punctual {punctualPercent}% of the time.
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} className="text-center">
            <div className="inline">
              <h4>
                <Label>PUNCTUAL {punctual}</Label>&nbsp;
              </h4>
            </div>
            <div className="inline">
              <h4>
                <Label>ARRIVED LATE {arrivedLate}</Label>&nbsp;
              </h4>
            </div>
            <div className="inline">
              <h4>
                <Label>LEFT EARLY {leftEarly}</Label>&nbsp;
              </h4>
            </div>
            <div className="inline">
              <h4>
                <Label>INVALID ROWS {numInvalidRows}</Label>
              </h4>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PunctualityHeader;
