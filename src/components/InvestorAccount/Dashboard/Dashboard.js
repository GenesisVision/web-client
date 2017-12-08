import React, { Component } from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

class Dashboard extends Component {
  formatDate = (attr) => {
    return (new Date(+attr)).toDateString();
  };

  render() {
    return (
      <ResponsiveContainer height={400}>
        <AreaChart data={this.props.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey='x' tickFormatter={this.formatDate} />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Area type='monotone' dataKey='y' stackId='1' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default Dashboard;
