import { DateRangeFilterType } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeRequestValueFunc } from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { FilteringType } from "components/table/components/filtering/filter.type";
import { ImageLocation } from "gv-api-web";
import { handleErrors } from "gv-api-web/src/utils";
import * as qs from "qs";
import Token from "services/api-client/token";
import { getApiUrl, getPublicRuntimeConfig } from "utils/config-helpers";

import { api } from "./api-client/swagger-custom-client";

const SERVER_QUERY_DATE_RANGE_MIN_FILTER_NAME = "DateFrom";
const SERVER_QUERY_DATE_RANGE_MAX_FILTER_NAME = "DateTo";
const SERVER_REQUEST_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
const SERVER_REQUEST_DATE_RANGE_MAX_FILTER_NAME = "dateTo";

const apiUrl = getApiUrl();
const { apiUrl: clientUrl } = getPublicRuntimeConfig();

const fetchBlob = (url: string) => {
  const headers = Token.create().getHeader();
  return fetch(`${apiUrl}${url}`, {
    headers
  })
    .then(handleErrors)
    .then(data => data.blob());
};

const getDateFiltersForQuery = (
  dateRange: DateRangeFilterType
): FilteringType =>
  composeRequestValueFunc(
    SERVER_QUERY_DATE_RANGE_MIN_FILTER_NAME,
    SERVER_QUERY_DATE_RANGE_MAX_FILTER_NAME
  )(dateRange);

const getDateRangeQueryString = (
  dateRange: DateRangeFilterType,
  timeframe?: string
) => {
  const filter = getDateFiltersForQuery(dateRange);
  if (timeframe) filter.Timeframe = timeframe;
  return "?" + qs.stringify(filter);
};

const getDateFiltersForRequest = (
  dateRange: DateRangeFilterType
): FilteringType =>
  composeRequestValueFunc(
    SERVER_REQUEST_DATE_RANGE_MIN_FILTER_NAME,
    SERVER_REQUEST_DATE_RANGE_MAX_FILTER_NAME
  )(dateRange);

const getReportsExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType,
  timeframe?: string
): Promise<Blob> => {
  const queryString = getDateRangeQueryString(dateRange, timeframe);
  return fetchBlob(
    `/v2.0/programs/${id}/periods/export/investorreport${queryString}`
  );
};

const getFinancialStatisticExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType,
  timeframe?: string
): Promise<Blob> => {
  const queryString = getDateRangeQueryString(dateRange, timeframe);
  return fetchBlob(
    `/v2.0/programs/${id}/periods/export/financialstatistic${queryString}`
  );
};

const getAnalyticsExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType,
  timeframe?: string
): Promise<Blob> => {
  const queryString = getDateRangeQueryString(dateRange, timeframe);
  return fetchBlob(
    `/v2.0/programs/${id}/periods/export/analytics${queryString}`
  );
};

const getProgramTradesExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType
): string => {
  const queryString = getDateRangeQueryString(dateRange);
  return `${apiUrl}/v1.0/programs/${id}/trades/export${queryString}`;
};

const getPeriodExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType
): string => {
  const queryString = getDateRangeQueryString(dateRange);
  return `${apiUrl}/v1.0/programs/${id}/periods/export${queryString}`;
};

const getAccountTradesExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType
): Promise<Blob> => {
  const queryString = getDateRangeQueryString(dateRange);
  return fetchBlob(`/v2.0/tradingaccount/${id}/trades/export${queryString}`);
};

const getStatisticExportFile = (id: string, dateRange: DateRangeFilterType) => {
  const queryString = getDateRangeQueryString(dateRange);
  return fetchBlob(
    `/v2.0/programs/${id}/periods/export/statistic${queryString}`
  );
};

const getReferralHistoryFile = (
  dateRange: DateRangeFilterType
): Promise<Blob> => {
  const queryString = getDateRangeQueryString(dateRange);
  return fetchBlob(`/v2.0/partnership/rewards/history/export${queryString}`);
};

const getFileUrl = (
  id?: string,
  quality: "Low" | "Medium" | "High" = "Low"
): string => (id ? `${clientUrl}/v2.0/file/${id}?quality=${quality}` : "");

const uploadFile = (
  uploadedFile: File,
  location?: ImageLocation
): Promise<string> =>
  api
    .files()
    .uploadFile({
      uploadedFile,
      location
    })
    .then((response: any) => response.id);

const uploadDocument = (uploadedFile: File): Promise<string> =>
  api
    .files()
    .uploadFile({ uploadedFile })
    .then((response: any) => response.id);

const filesService = {
  getReportsExportFileUrl,
  getFinancialStatisticExportFileUrl,
  getAnalyticsExportFileUrl,
  getAccountTradesExportFileUrl,
  getReferralHistoryFile,
  getProgramTradesExportFileUrl,
  getStatisticExportFile,
  getPeriodExportFileUrl,
  getFileUrl,
  uploadFile,
  uploadDocument
};
export default filesService;
