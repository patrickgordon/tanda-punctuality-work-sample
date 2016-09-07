import React from 'react';
import Label from 'react-bootstrap/lib/Label'

export const PunctualityHeader = (props) => {
  const {name, stats} = props
  const {punctual, arrivedLate, leftEarly} = stats
  return (
    <div className="text-center">
      <h3>{name}'s Punctuality</h3>
      <div>
        <h4>
          <Label>PUNCTUAL {punctual}</Label>&nbsp;
          <Label>ARRIVED LATE {arrivedLate}</Label>&nbsp;
          <Label>LEFT EARLY {leftEarly}</Label>&nbsp;
        </h4>
      </div>
    </div>
  )
}

export default PunctualityHeader;
