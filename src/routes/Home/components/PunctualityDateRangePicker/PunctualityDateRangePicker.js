import React from 'react'
import DateRange from 'react-date-range/lib/DateRange'
import defaultRanges from 'react-date-range/lib/defaultRanges'
import Popover from 'react-bootstrap/lib/Popover'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

export const PunctualityDateRangePicker = (props) => {
  const {values, handleChange} = props
  const {startDate, endDate} = values
  const dateDisplayFormat = 'DD-MM-YYYY'

  const popoverClickRootClose = (
    <Popover id="popover-trigger-click-root-close" title="Choose dates..." style={{maxWidth: "600px"}}>
      <DateRange startDate={startDate} endDate={endDate} firstDayOfWeek={1} format="YYYY-MM-DD"
                 ranges={defaultRanges}
                 onChange={handleChange}
                 theme={{
                   Calendar: {width: 200},
                   PredefinedRanges: {marginLeft: 10, marginTop: 10}
                 }}/>
    </Popover>
  )

  return (
    <div>
      <OverlayTrigger trigger="click" rootClose placement="left" overlay={popoverClickRootClose}>
        <Button><Glyphicon glyph="calendar"/> {startDate.format(dateDisplayFormat).toString()}
          {" "} to {endDate.format(dateDisplayFormat).toString()}</Button>
      </OverlayTrigger>
    </div>
  )
}

PunctualityDateRangePicker.propTypes = {
  values: React.PropTypes.object.isRequired
}

export default PunctualityDateRangePicker

