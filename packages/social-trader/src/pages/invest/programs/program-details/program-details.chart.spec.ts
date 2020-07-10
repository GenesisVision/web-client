import {
  ChartPeriodType,
  TChartPeriod
} from "components/chart/chart-period/chart-period.helpers";
import { ABSOLUTE_PROFIT_CHART_TEST_ID } from "components/details/details-statistic-section/details-chart-section/absolute-profit-chart-section/absolute-profit-chart-elements";
import { BALANCE_CHART_TEST_ID } from "components/details/details-statistic-section/details-chart-section/balance-chart-section/balance-chart-elements";
import { PROFIT_CHART_TEST_ID } from "components/details/details-statistic-section/details-chart-section/profit-chart-section/profit-chart-elements";
import { getSelectItemSelector } from "components/select/select-item";
import {
  AbsoluteProfitChart,
  ProgramBalanceChart,
  ProgramFollowDetailsFull,
  ProgramProfitPercentCharts
} from "gv-api-web";
import { Browser, Page } from "puppeteer";
import { PROGRAMS_ROUTE } from "routes/programs.routes";
import { api } from "services/api-client/swagger-custom-client";
import { getDefaultDateRange, subtractDate } from "utils/dates";
import { separateThousand } from "utils/formatter";
import {
  ASYNC_TEST_TIMEOUT,
  getBrowser,
  testT,
  useTestHelpers
} from "utils/test-helpers";

describe("Program details - chart", () => {
  let details: ProgramFollowDetailsFull | undefined;
  let profitPercentCharts: ProgramProfitPercentCharts | undefined;
  let absoluteProfitChart: AbsoluteProfitChart | undefined;
  let balanceChart: ProgramBalanceChart | undefined;
  const statisticCurrency = "USDT";
  const programName = "entryfee0-10-20";
  const url = `${PROGRAMS_ROUTE}/${programName}`;
  let page: Page;
  let browser: Browser;
  const profitChartTabSelector = testT("asset-details:chart.tabs.profit");
  const absoluteProfitChartTabSelector = testT(
    "asset-details:chart.tabs.absolute-profit"
  );
  const balanceChartTabSelector = testT("asset-details:chart.tabs.balance");
  const chartOptions = {
    ...getDefaultDateRange()
  };

  beforeEach(async () => {
    browser = await getBrowser();
    page = await browser.newPage();
    const { openPage, waitForLoadBlurLoader } = useTestHelpers(page);
    await openPage(url);
    await waitForLoadBlurLoader(".details-statistics");
    const programsApi = api.programs();
    details = await programsApi.getProgramDetails(programName);
    profitPercentCharts = await programsApi.getProgramProfitPercentCharts(
      details.id,
      { ...chartOptions, currencies: [statisticCurrency] }
    );
    absoluteProfitChart = await programsApi.getProgramAbsoluteProfitChart(
      details.id,
      { ...chartOptions, currency: statisticCurrency }
    );
    balanceChart = await programsApi.getProgramBalanceChart(details.id, {
      ...chartOptions,
      currency: statisticCurrency
    });
  }, ASYNC_TEST_TIMEOUT);
  describe("Chart tabs", () => {
    it("should open balance chart", async () => {
      const {
        waitForSelector,
        hasElement,
        getDataIdElementSelector,
        safeClick
      } = useTestHelpers(page);
      await safeClick(getDataIdElementSelector(balanceChartTabSelector));
      await waitForSelector(".details-chart__profit");
      const hasChart = await hasElement(
        getDataIdElementSelector(BALANCE_CHART_TEST_ID)
      );
      expect(hasChart).toBeTruthy();
    });
    it("should open profit abs", async () => {
      const {
        waitForLoadBlurLoader,
        waitForSelector,
        hasElement,
        getDataIdElementSelector,
        safeClick
      } = useTestHelpers(page);
      await safeClick(
        getDataIdElementSelector(testT(absoluteProfitChartTabSelector))
      );
      await waitForSelector(".details-chart__profit");
      await waitForLoadBlurLoader(".details-chart__container");
      const hasChart = await hasElement(
        getDataIdElementSelector(ABSOLUTE_PROFIT_CHART_TEST_ID)
      );
      expect(hasChart).toBeTruthy();
    });
    it("should open profit %", async () => {
      const {
        waitForLoadBlurLoader,
        waitForSelector,
        hasElement,
        getDataIdElementSelector,
        safeClick
      } = useTestHelpers(page);
      await safeClick(getDataIdElementSelector(profitChartTabSelector));
      await waitForLoadBlurLoader(".details-chart__container");
      await waitForSelector(".details-chart__profit");
      const hasChart = await hasElement(
        getDataIdElementSelector(PROFIT_CHART_TEST_ID)
      );
      expect(hasChart).toBeTruthy();
    });
  });

  describe("Profit chart", () => {
    it("should has profit chart percent", async () => {
      const {
        waitForLoadBlurLoader,
        waitForSelector,
        getStatisticsItemValue,
        getDataIdElementSelector,
        safeClick
      } = useTestHelpers(page);
      await safeClick(getDataIdElementSelector(profitChartTabSelector));
      await waitForLoadBlurLoader(".details-chart__container");
      await waitForSelector(".details-chart__profit");
      const value = await getStatisticsItemValue(
        testT("asset-details:chart.percent")
      );
      expect(value).toBe(`${profitPercentCharts!.statistic.profitPercent} %`);
    });
    describe("Periods", () => {
      const getPeriodSelector = (period: TChartPeriod): string =>
        testT(`asset-details:chart-period.${ChartPeriodType[period]}-short`);
      it("Day", async () => {
        const {
          getStatisticsItemValue,
          safeClick,
          getDataIdElementSelector
        } = useTestHelpers(page);
        await safeClick(
          getDataIdElementSelector(getPeriodSelector("day"), "button")
        );
        const dateFrom = subtractDate(new Date(), 1, "day");
        profitPercentCharts = await programsApi.getProgramProfitPercentCharts(
          details!.id,
          { dateFrom, currencies: [statisticCurrency] }
        );
        const value = await getStatisticsItemValue(
          testT("asset-details:chart.percent")
        );
        expect(value).toBe(
          `${separateThousand(profitPercentCharts.statistic.profitPercent)} %`
        );
      });
      it("Week", async () => {
        const {
          getStatisticsItemValue,
          safeClick,
          getDataIdElementSelector
        } = useTestHelpers(page);
        await safeClick(
          getDataIdElementSelector(getPeriodSelector("week"), "button")
        );
        const dateFrom = subtractDate(new Date(), 1, "week");
        profitPercentCharts = await programsApi.getProgramProfitPercentCharts(
          details!.id,
          { dateFrom, currencies: [statisticCurrency] }
        );
        const value = await getStatisticsItemValue(
          testT("asset-details:chart.percent")
        );
        expect(value).toBe(`${profitPercentCharts.statistic.profitPercent} %`);
      });
      it("Month", async () => {
        const {
          getStatisticsItemValue,
          safeClick,
          getDataIdElementSelector
        } = useTestHelpers(page);
        await safeClick(
          getDataIdElementSelector(getPeriodSelector("month"), "button")
        );
        const dateFrom = subtractDate(new Date(), 1, "month");
        profitPercentCharts = await programsApi.getProgramProfitPercentCharts(
          details!.id,
          { dateFrom, currencies: [statisticCurrency] }
        );
        const value = await getStatisticsItemValue(
          testT("asset-details:chart.percent")
        );
        expect(value).toBe(`${profitPercentCharts.statistic.profitPercent} %`);
      });
      it("Year", async () => {
        const {
          getStatisticsItemValue,
          safeClick,
          getDataIdElementSelector
        } = useTestHelpers(page);
        await safeClick(
          getDataIdElementSelector(getPeriodSelector("year"), "button")
        );
        const dateFrom = subtractDate(new Date(), 1, "year");
        profitPercentCharts = await programsApi.getProgramProfitPercentCharts(
          details!.id,
          { dateFrom, currencies: [statisticCurrency] }
        );
        const value = await getStatisticsItemValue(
          testT("asset-details:chart.percent")
        );
        expect(value).toBe(
          `${separateThousand(profitPercentCharts.statistic.profitPercent)} %`
        );
      });
      it("All", async () => {
        const {
          getStatisticsItemValue,
          safeClick,
          getDataIdElementSelector
        } = useTestHelpers(page);
        await safeClick(
          getDataIdElementSelector(getPeriodSelector("all"), "button")
        );
        const dateFrom = undefined;
        profitPercentCharts = await programsApi.getProgramProfitPercentCharts(
          details!.id,
          { dateFrom, currencies: [statisticCurrency] }
        );
        const value = await getStatisticsItemValue(
          testT("asset-details:chart.percent")
        );
        expect(value).toBe(
          `${separateThousand(profitPercentCharts.statistic.profitPercent)} %`
        );
      });
    });
    describe("Currencies", () => {
      const getCurrencySelectSelector = (dataId: string) =>
        `${dataId}[name="currency"]`;
      it("should has request currency", async () => {
        const { getTextContent } = useTestHelpers(page);
        const value = await getTextContent(getCurrencySelectSelector("button"));
        expect(value).toBe(statisticCurrency);
      });
      it("should change currency", async () => {
        const newCurrency = "ETH";
        const {
          getDataIdElementSelector,
          waitForSelector,
          getTextContent,
          safeClick,
          getStatisticsItemValue
        } = useTestHelpers(page);
        await safeClick(getCurrencySelectSelector("button"));
        await waitForSelector(".select__options");
        await safeClick(
          getDataIdElementSelector(getSelectItemSelector(newCurrency), "button")
        );
        const currencyButtonText = await getTextContent(
          getCurrencySelectSelector("button")
        );
        expect(currencyButtonText).toBe(newCurrency);
        profitPercentCharts = await programsApi.getProgramProfitPercentCharts(
          details!.id,
          { ...chartOptions, currencies: [newCurrency] }
        );
        const percentValue = await getStatisticsItemValue(
          testT("asset-details:chart.percent")
        );
        expect(percentValue).toBe(
          `${separateThousand(profitPercentCharts.statistic.profitPercent)} %`
        );
      });
    });
  });

  afterEach(() => {
    browser.close();
  });
});
