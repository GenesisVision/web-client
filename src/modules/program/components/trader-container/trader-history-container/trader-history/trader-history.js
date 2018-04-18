import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  ResponsiveContainer
} from "recharts";
import moment from "moment";
import React from "react";

import "./trader-history.css";

class TraderHistory extends React.Component {
  dateFormatter = date => moment(date).format("MMMM Do HH:mm");

  render() {
    const { data } = this.props;
    const chartData = data.map(x => ({
      profit: x.profit,
      date: x.date.getTime()
    }));
    const brushStartIndex =
      chartData.length - 200 > 0 ? chartData.length - 200 : 0;
    return (
      <div className="trader-history-card card">
        <div className="trader-container__header">Trader History</div>
        <div className="trader-history__body card-body">
          <ResponsiveContainer height={400}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="date"
                type="category"
                axisLine={false}
                tickFormatter={this.dateFormatter}
              />
              <YAxis dataKey="profit" axisLine={false} />
              <Tooltip labelFormatter={this.dateFormatter}/>
              <Brush dataKey="date" startIndex={brushStartIndex} />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#03bdaf"
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
export default TraderHistory;
