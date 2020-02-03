import { formatDate, humanizeDate, localizedDate } from "./dates";

describe("test dates functions", () => {
  it("should format date to localized string", () => {
    const date1 = localizedDate("2019-09-16T06:18:31.0705650+00:00");
    const date2 = localizedDate("2019-09-25T07:25:55.6606750+00:00");
    const date3 = localizedDate("2019-09-03T12:17:39.4087020+00:00");
    expect(date1).toBe("Sep 16, 2019");
    expect(date2).toBe("Sep 25, 2019");
    expect(date3).toBe("Sep 3, 2019");
  });

  it("should format date to long string", () => {
    const date1 = formatDate("2019-09-06T11:09:45.3192730+00:00");
    const date2 = formatDate("2019-06-03T13:13:26.7498180+00:00");
    const date3 = formatDate("2019-06-03T12:33:13.1385000+00:00");

    expect(date1).toBe("2019-09-06 11:09:45");
    expect(date2).toBe("2019-06-03 13:13:26");
    expect(date3).toBe("2019-06-03 12:33:13");
  });

  it("should format period into string", () => {
    const period1 = humanizeDate(
      "2019-10-09T09:59:25.7601750+00:00",
      "2020-01-06T09:59:25.7601750+00:00"
    );
    const period2 = humanizeDate(
      "2019-08-27T07:13:46.0872100+00:00",
      "2019-10-03T21:33:10.9392540+00:00"
    );
    const period3 = humanizeDate(
      "2019-08-20T14:45:24.6779810+00:00",
      "2019-08-27T07:13:46.0872100+00:00"
    );
    const period4 = humanizeDate(
      "2019-10-03T21:33:10.9392540+00:00",
      "2019-10-09T09:59:25.7601750+00:00"
    );
    const period5 = humanizeDate(
      "2019-09-05T09:50:35.4116020+00:00",
      "2019-09-05T15:15:52.8617580+00:00"
    );
    const period6 = humanizeDate(
      "2019-09-05T15:16:53.5976620+00:00",
      "2019-09-05T15:21:51.5987380+00:00"
    );

    expect(period1).toBe("2 months 28 days");
    expect(period2).toBe("1 month 6 days");
    expect(period3).toBe("6 days 16 hours");
    expect(period4).toBe("5 days 12 hours");
    expect(period5).toBe("5 hours 25 minutes");
    expect(period6).toBe("4 minutes");
  });
});
