import React from 'react';
import Label from 'react-bootstrap/lib/Label'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

export const PunctualityHeader = (props) => {
  const {name, stats} = props
  const {punctual, arrivedLate, leftEarly, invalidRows} = stats
  return (
    <Row>
      <Col xs={6} xsOffset={3}>
        <Row>
          <Col xs={12} className="text-center">
            <h3>{name}'s Punctuality</h3>
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
                <Label>INVALID {invalidRows}</Label>
              </h4>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PunctualityHeader;
