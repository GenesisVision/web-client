import { DateRangeFilterType } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeRequestValueFunc } from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { FilteringType } from "components/table/components/filtering/filter.type";
import { CancelablePromise } from "gv-api-web";
import * as qs from "qs";
import fileApi from "services/api-client/file-api";
import partnershipApi from "shared/services/api-client/partnership-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";

const SERVER_QUERY_DATE_RANGE_MIN_FILTER_NAME = "DateFrom";
const SERVER_QUERY_DATE_RANGE_MAX_FILTER_NAME = "DateTo";
const SERVER_REQUEST_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
const SERVER_REQUEST_DATE_RANGE_MAX_FILTER_NAME = "dateTo";

const getDateFiltersForQuery = (
  dateRange: DateRangeFilterType
): FilteringType =>
  composeRequestValueFunc(
    SERVER_QUERY_DATE_RANGE_MIN_FILTER_NAME,
    SERVER_QUERY_DATE_RANGE_MAX_FILTER_NAME
  )(dateRange);

const getDateFiltersForRequest = (
  dateRange: DateRangeFilterType
): FilteringType =>
  composeRequestValueFunc(
    SERVER_REQUEST_DATE_RANGE_MIN_FILTER_NAME,
    SERVER_REQUEST_DATE_RANGE_MAX_FILTER_NAME
  )(dateRange);

const getTradesExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType
): string => {
  const dateFilter = getDateFiltersForQuery(dateRange);
  const queryString = "?" + qs.stringify(dateFilter);
  return `${process.env.REACT_APP_API_URL}/v1.0/programs/${id}/trades/export${queryString}`;
};

const getPeriodExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType
): string => {
  const dateFilter = getDateFiltersForQuery(dateRange);
  const queryString = "?" + qs.stringify(dateFilter);
  return `${process.env.REACT_APP_API_URL}/v1.0/programs/${id}/periods/export${queryString}`;
};

const getStatisticExportFile = (
  id: string,
  dateRange: DateRangeFilterType
): CancelablePromise<Blob> => {
  const authorization = authService.getAuthArg();
  const opts = getDateFiltersForRequest(dateRange);
  return programsApi
    .exportProgramPeriodsFinStatistic(id, authorization, opts)
    .then(blob => blob);
};

const getReferralHistoryFile = (
  dateRange: DateRangeFilterType
): CancelablePromise<Blob> => {
  const authorization = authService.getAuthArg();
  const opts = getDateFiltersForRequest(dateRange);
  return partnershipApi.exportHistory(authorization, opts).then(blob => blob);
};

const getFileUrl = (id?: string): string =>
  id ? `${process.env.REACT_APP_API_URL}/v2.0/file/${id}` : "";

const uploadFile = (
  file: File,
  authorization: string
): CancelablePromise<string> =>
  fileApi.uploadFile(file, { authorization }).then(response => response.id);

const uploadDocument = (file: File, authorization: string): Promise<string> =>
  fileApi.uploadFile(file, { authorization }).then(response => response.id);

const filesService = {
  getReferralHistoryFile,
  getTradesExportFileUrl,
  getStatisticExportFile,
  getPeriodExportFileUrl,
  getFileUrl,
  uploadFile,
  uploadDocument
};
export default filesService;
