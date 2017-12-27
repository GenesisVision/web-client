import React from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { dateFormat } from '../../../utils/formatter';

const Dashboard = (props) => {
  return (
    <ResponsiveContainer height={400}>
      <AreaChart data={props.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey='x' tickFormatter={dateFormat} />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Area type='monotone' dataKey='y' stackId='1' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Dashboard;
