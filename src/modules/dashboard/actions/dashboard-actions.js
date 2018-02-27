import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./dashboard-actions.constants";

const fetchDashboard = () => {
  return {
    type: actionTypes.DASHBOARD,
    payload: Promise.resolve([
      {
        id: 1,
        investedTokens: 10,
        name: "Program A",
        level: 4,
        avatar: 100,
        balance: 15,
        investorsCount: 2,
        endOfPeriod: "2018-02-27T10:33:45.802Z",
        avgProfit: 22,
        avaibleInvestments: 100,
        totalProfit: 10,
        chart: [
          { name: "01/01", profit: 4000, fund: 2000, totalProfit: 4000 },
          {
            name: "01/05",
            profit: 0,
            fund: 2000,
            lose: -2000,
            totalProfit: 1000
          },
          { name: "01/10", profit: 2000, fund: 2000, totalProfit: 3000 },
          { name: "01/15", profit: 2780, fund: 2000, totalProfit: 5780 },
          {
            name: "01/20",
            profit: 0,
            fund: 2000,
            lose: -1890,
            totalProfit: 3110
          },
          { name: "01/25", profit: 2390, fund: 2000, totalProfit: 4280 },
          { name: "01/30", profit: 5490, fund: 2000, totalProfit: 9770 }
        ]
      },
      {
        id: 1,
        investedTokens: 100,
        name: "Program B",
        level: 5,
        avatar: 100,
        balance: 15,
        investorsCount: 2,
        endOfPeriod: "2018-02-27T10:33:45.802Z",
        avgProfit: 22,
        avaibleInvestments: 100,
        totalProfit: 40,
        chart: [
          { name: "01/01", profit: 4000, fund: 2000, totalProfit: 4000 },
          {
            name: "01/05",
            profit: 0,
            fund: 2000,
            lose: -2000,
            totalProfit: 1000
          },
          { name: "01/10", profit: 2000, fund: 2000, totalProfit: 3000 },
          { name: "01/15", profit: 2780, fund: 2000, totalProfit: 5780 },
          {
            name: "01/20",
            profit: 0,
            fund: 2000,
            lose: -1890,
            totalProfit: 3110
          },
          { name: "01/25", profit: 2390, fund: 2000, totalProfit: 4280 },
          { name: "01/30", profit: 5490, fund: 2000, totalProfit: 9770 }
        ]
      }
    ])
  };
};

const dashboardActions = { fetchDashboard };
export default dashboardActions;
