import { CancelablePromise } from "gv-api-web";
import * as qs from "qs";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeRequestValueFunc } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";

import fileApi from "./api-client/file-api";
import programsApi from "./api-client/programs-api";
import authService from "./auth-service";

const SERVER_DATE_RANGE_MIN_FILTER_NAME = "DateFrom";
const SERVER_DATE_RANGE_MAX_FILTER_NAME = "DateTo";

const getDateFilters = (dateRange: DateRangeFilterType): FilteringType => {
  const dateFilter = composeRequestValueFunc(
    SERVER_DATE_RANGE_MIN_FILTER_NAME,
    SERVER_DATE_RANGE_MAX_FILTER_NAME
  )(dateRange);
  return dateFilter;
};

const getTradesExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType
): string => {
  const dateFilter = getDateFilters(dateRange);
  const queryString = "?" + qs.stringify(dateFilter);
  return `${process.env.REACT_APP_API_URL}/v1.0/programs/${id}/trades/export${queryString}`;
};

const getPeriodExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType
): string => {
  const dateFilter = getDateFilters(dateRange);
  const queryString = "?" + qs.stringify(dateFilter);
  return `${process.env.REACT_APP_API_URL}/v1.0/programs/${id}/periods/export${queryString}`;
};

const getStatisticExportFile = (
  id: string,
  dateRange: DateRangeFilterType
): CancelablePromise<Blob> => {
  const authorization = authService.getAuthArg();
  const opts = getDateFilters(dateRange);
  return programsApi
    .exportProgramPeriodsFinStatistic(id, authorization, opts)
    .then(blob => blob);
};

const getFileUrl = (id?: string): string =>
  id ? `${process.env.REACT_APP_API_URL}/v1.0/file/${id}` : "";

const uploadFile = (
  file: File,
  authorization: string
): CancelablePromise<string> =>
  fileApi.uploadFile(file, { authorization }).then(response => response.id);

const uploadDocument = (file: File, authorization: string): Promise<string> =>
  fileApi.uploadFile(file, { authorization }).then(response => response.id);

const filesService = {
  getTradesExportFileUrl,
  getStatisticExportFile,
  getPeriodExportFileUrl,
  getFileUrl,
  uploadFile,
  uploadDocument
};
export default filesService;
