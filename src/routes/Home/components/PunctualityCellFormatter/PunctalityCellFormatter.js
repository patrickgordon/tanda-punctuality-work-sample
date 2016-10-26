import React from 'react'
import Label from 'react-bootstrap/lib/Label'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

export const PunctualityCellFormatter = (props) => {
  const {toolTipKey, text, toolTipText, labelText} = props

  const tooltip = (
    <Tooltip id={toolTipKey}>{toolTipText}</Tooltip>
  )

  return (
    <div>
      {text} <OverlayTrigger placement="top" overlay={tooltip}><Label>{labelText}</Label></OverlayTrigger>
    </div>
  )
}

PunctualityCellFormatter.propTypes = {
  toolTipKey: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
  toolTipText: React.PropTypes.string.isRequired,
  labelText: React.PropTypes.string.isRequired
}

export default PunctualityCellFormatter

