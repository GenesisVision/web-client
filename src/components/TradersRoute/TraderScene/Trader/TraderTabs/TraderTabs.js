import { NavLink } from 'react-router-dom'
import React from 'react'
import Route from 'react-router-dom/Route'

import StatisticTab from './StatisticTab/StatisticTab'
import TradingHistoryTab from './TradingHistoryTab/TradingHistoryTab'

import { traderTabUrl } from '../../TraderScene.constants'

const TraderTabs = ({ traderUrl }) => (
  <div>
    <nav className="nav nav-tabs">
      <NavLink className="nav-item nav-link" to={`${traderUrl}/${traderTabUrl.statistics}`}>Statistic</NavLink>
      <NavLink className="nav-item nav-link" to={`${traderUrl}/${traderTabUrl.tradingHistory}`}>Trading History</NavLink>
    </nav>
    <div className="tab-content">
      <div className="tab-pane fade show active">
        <Route path={`${traderUrl}/${traderTabUrl.statistics}`} render={() => (<StatisticTab />)} />
      </div>
      <div className="tab-pane fade show active">
        <Route path={`${traderUrl}/${traderTabUrl.tradingHistory}`} render={() => (<TradingHistoryTab />)} />
      </div>
    </div>
  </div>
)

export default TraderTabs
