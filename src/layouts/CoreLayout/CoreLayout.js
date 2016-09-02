import React from 'react'
import Header from '../../components/Header'
import '../../styles/global.styles'

export const CoreLayout = ({ children }) => (
  <div className="page-container" style={{marginTop: "30px"}}>
    <div className="view-container">
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
