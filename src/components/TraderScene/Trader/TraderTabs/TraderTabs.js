import { NavLink } from 'react-router-dom'
import React from 'react'
import Route from 'react-router-dom/Route'

const TraderTabs = ({ traderUrl }) => (
  <div>
    <nav className="nav nav-tabs">
      <NavLink className="nav-item nav-link" to={`${traderUrl}/stats`}>Statistic</NavLink>
      <NavLink className="nav-item nav-link" to={`${traderUrl}/trading-history`}>Trading History</NavLink>
    </nav>
    <div className="tab-content">
      <div className="tab-pane fade show active">
        <Route path={`${traderUrl}/stats`} render={() => (<span>Statistic</span>)} />
      </div>
      <div className="tab-pane fade show active">
        <Route path={`${traderUrl}/trading-history`} render={() => (<span>Trading History</span>)} />
      </div>
    </div>
  </div>
)

export default TraderTabs
