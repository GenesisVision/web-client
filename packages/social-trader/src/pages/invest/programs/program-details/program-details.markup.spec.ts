import {
  ProgramFollowDetailsFull,
  ProgramProfitPercentCharts
} from "gv-api-web";
import { Browser, Page } from "puppeteer";
import { PROGRAMS_ROUTE } from "routes/programs.routes";
import programsApi from "services/api-client/programs-api";
import { distanceDate, subtractDate } from "utils/dates";
import {
  formatCurrencyValue,
  formatValue,
  separateThousand
} from "utils/formatter";
import {
  ASYNC_TEST_TIMEOUT,
  getBrowser,
  useTestHelpers
} from "utils/test-helpers";

describe("Program details - Page markup", () => {
  let details: ProgramFollowDetailsFull | undefined;
  let statistic: ProgramProfitPercentCharts | undefined;
  const statisticCurrency = "USDT";
  const programName = "entryfee0-10-20";
  const url = `${PROGRAMS_ROUTE}/${programName}`;
  let page: Page;
  let browser: Browser;

  beforeAll(async () => {
    browser = await getBrowser();
    page = await browser.newPage();
    const {
      authorize,
      openPage,
      waitForLoadBlurLoader,
      getAuth
    } = useTestHelpers(page);
    await authorize();
    const authorization = await getAuth();
    await openPage(url);
    await waitForLoadBlurLoader(".details-statistics");
    details = await programsApi.getProgramDetails("createrefactoring", {
      authorization
    });
    statistic = await programsApi.getProgramProfitPercentCharts(details.id, {
      authorization,
      dateFrom: subtractDate(new Date(), 1, "month"),
      currencies: [statisticCurrency]
    });
  }, ASYNC_TEST_TIMEOUT);
  it("should be titled at program name", async () => {
    const title = await page.title();
    expect(title.toLowerCase()).toContain(programName.toLowerCase());
  });
  describe("Performance", () => {
    it("should has currency", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { currency } = details!.tradingAccountInfo;
      const testValue = currency;
      const pageValue = await getStatisticsItemValue(
        "program-details-page.description.currency"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has leverage", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { leverageMin, leverageMax } = details!.tradingAccountInfo;
      const testValue = `${leverageMin}:${leverageMax}`;
      const pageValue = await getStatisticsItemValue(
        "program-details-page.description.leverage"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has period", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { periodStarts, periodEnds } = details!.programDetails;
      const testValue = distanceDate(periodStarts, periodEnds);
      const pageValue = await getStatisticsItemValue(
        "program-details-page.description.period"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has age", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { ageDays } = details!.programDetails;
      const testValue = `${ageDays} days`;
      const pageValue = await getStatisticsItemValue(
        "program-details-page.description.age"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has genesis ratio", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { genesisRatio } = details!.programDetails;
      const testValue = String(genesisRatio);
      const pageValue = await getStatisticsItemValue(
        "program-details-page.description.genesis-ratio"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has genesis investment scale", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { investmentScale } = details!.programDetails;
      const testValue = String(investmentScale);
      const pageValue = await getStatisticsItemValue(
        "program-details-page.description.investment-scale"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has genesis volume scale", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { volumeScale } = details!.programDetails;
      const testValue = String(volumeScale);
      const pageValue = await getStatisticsItemValue(
        "program-details-page.description.volume-scale"
      );
      expect(pageValue).toBe(testValue);
    });
  });
  describe("Statistic", () => {
    it("should has genesis volume scale", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { balance } = statistic!.statistic;
      const testValue = `${separateThousand(balance)} ${
        details!.tradingAccountInfo.currency
      }`;
      const pageValue = await getStatisticsItemValue(
        "program-details-page.statistics.equity"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has investors", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { investors } = statistic!.statistic;
      const testValue = String(investors);
      const pageValue = await getStatisticsItemValue(
        "program-details-page.statistics.investors"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has trades", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { trades } = statistic!.statistic;
      const testValue = String(trades);
      const pageValue = await getStatisticsItemValue(
        "program-details-page.statistics.trades"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has profit factor", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { profitFactor } = statistic!.statistic;
      const testValue = String(profitFactor);
      const pageValue = await getStatisticsItemValue(
        "program-details-page.statistics.profit-factor"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has max drawdown", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { maxDrawdown } = statistic!.statistic;
      const testValue = `${formatValue(maxDrawdown, 2)}%`;
      const pageValue = await getStatisticsItemValue(
        "program-details-page.statistics.max-drawdown"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has success trades", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { successTradesPercent } = statistic!.statistic;
      const testValue = `${successTradesPercent}%`;
      const pageValue = await getStatisticsItemValue(
        "program-details-page.statistics.success-trades"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has trading volume", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { tradingVolume } = statistic!.statistic;
      const testValue = `${tradingVolume} ${
        details!.tradingAccountInfo.currency
      }`;
      const pageValue = await getStatisticsItemValue(
        "program-details-page.statistics.trading-volume"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has sharpe ratio", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { sharpeRatio } = statistic!.statistic;
      const testValue = formatValue(sharpeRatio, 2);
      const pageValue = await getStatisticsItemValue(
        "program-details-page.statistics.sharpe-ratio"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has sortino ratio", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { sortinoRatio } = statistic!.statistic;
      const testValue = formatValue(sortinoRatio, 2);
      const pageValue = await getStatisticsItemValue(
        "program-details-page.statistics.sortino-ratio"
      );
      expect(pageValue).toBe(testValue);
    });
    it("should has profit percent", async () => {
      const { getStatisticsItemValue } = useTestHelpers(page);
      const { profitPercent } = statistic!.statistic;
      const testValue = `${formatCurrencyValue(
        profitPercent,
        statisticCurrency
      )} %`;
      const pageValue = await getStatisticsItemValue(
        "details-page.chart.percent"
      );
      expect(pageValue).toBe(testValue);
    });
  });

  afterAll(() => {
    browser.close();
  });
});
