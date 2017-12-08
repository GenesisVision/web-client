import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip } from 'recharts'


const TraderChart = (props) => (
  <ResponsiveContainer height={90}>
    <AreaChart data={props.chart}>
      <CartesianGrid strokeDasharray='1 1' />
      <Tooltip />
      <Area type='monotone' dataKey='x' stroke='#8884d8' fill='#8884d8' isAnimationActive={false} />
    </AreaChart>
  </ResponsiveContainer>
)

TraderChart.propTypes = {
  chart: PropTypes.array.isRequired
}

export default TraderChart;
