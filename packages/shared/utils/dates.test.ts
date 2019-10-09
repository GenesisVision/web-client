import { formatDate, localizedDate } from "./dates";

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

    expect(date1).toBe("2019-09-06 14:09:45");
    expect(date2).toBe("2019-06-03 16:13:26");
    expect(date3).toBe("2019-06-03 15:33:13");
  });
});
