import React from 'react'
import VictoryPie from 'victory-pie/lib/components/victory-pie'
import VictoryLabel from 'victory-core/lib/victory-label/victory-label'

export const PunctualityChart = (props) => {

  const {data} = props

  return (
    <div style={{maxWidth: "210px", margin: "auto"}}>
      <VictoryPie innerRadius={100} data={data}
                  style={
                  {
                    data: {fill: (data) => data.isPunctualityValue ? "#008CBA" : "#E5FFFF"},
                    labels: {fill: "#008CBA", fontSize: 84, fontWeight: "bold"}
                  }
                  }
                  labelComponent={<VictoryLabel x={0} y={0} textAnchor="middle" verticalAnchor="middle"/>}>
      </VictoryPie>
    </div>
  )
}

PunctualityChart.propTypes = {
  data: React.PropTypes.array.isRequired
}

export default PunctualityChart

