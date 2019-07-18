import { CancelablePromise } from "gv-api-web";
import moment from "moment";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";

import fileApi from "./api-client/file-api";
import { FilteringType } from "../components/table/components/filtering/filter.type";
import {
  mapToTableItems,
  TableItems
} from "../components/table/helpers/mapper";
import authService from "./auth-service";
import programsApi from "./api-client/programs-api";

const getDateFilters = (dateRange: DateRangeFilterType): string => {
  const start = dateRange.dateStart
    ? `start=${moment(dateRange.dateStart as string).toISOString()}&`
    : "";
  const end = dateRange.dateEnd
    ? `end=${moment(dateRange.dateEnd as string)
        .add(1, "day")
        .startOf("day")
        .toISOString()}`
    : "";
  return `?${start}${end}`;
};

const getTradesExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType
): string => {
  const filters = getDateFilters(dateRange);
  return `${process.env.REACT_APP_API_URL}/v1.0/programs/${id}/trades/export${
    dateRange.dateStart || dateRange.dateEnd ? filters : ""
  }`;
};

const getStatisticExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType
): string => {
  const filters = getDateFilters(dateRange);
  return `${
    process.env.REACT_APP_API_URL
  }/v1.0/programs/${id}/periods/export/statistic${
    dateRange.dateStart || dateRange.dateEnd ? filters : ""
  }`;
};

export const fetchStatisticExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType
): CancelablePromise<Blob> => {
  const authorization = authService.getAuthArg();
  const { dateStart, dateEnd } = dateRange;
  return programsApi
    .v10ProgramsByIdPeriodsExportStatisticGet(id, authorization)
    .then(blob => blob);
};

const getFileUrl = (id: string): string =>
  id ? `${process.env.REACT_APP_API_URL}/v1.0/file/${id}` : "";

const uploadFile = (
  file: File,
  authorization: string
): CancelablePromise<string> => {
  return fileApi
    .v10FileUploadPost(file, { authorization })
    .then(response => response.id);
};

const uploadDocument = (file: File, authorization: string): Promise<string> => {
  return fileApi
    .v10FileDocumentUploadPost(authorization, file)
    .then(response => response.id);
};

const filesService = {
  getTradesExportFileUrl,
  getStatisticExportFileUrl,
  fetchStatisticExportFileUrl,
  getFileUrl,
  uploadFile,
  uploadDocument
};
export default filesService;
