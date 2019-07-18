import { CancelablePromise } from "gv-api-web";
import moment from "moment";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";

import { FilteringType } from "../components/table/components/filtering/filter.type";
import {
  TableItems,
  mapToTableItems
} from "../components/table/helpers/mapper";
import fileApi from "./api-client/file-api";
import programsApi from "./api-client/programs-api";
import authService from "./auth-service";

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

const getStatisticExportFile = (
  id: string,
  dateRange: DateRangeFilterType
): CancelablePromise<Blob> => {
  const authorization = authService.getAuthArg();
  const opts = {
    dateFrom: dateRange.dateStart as Date,
    dateTo: dateRange.dateEnd as Date
  };
  return programsApi
    .v10ProgramsByIdPeriodsExportStatisticGet(id, authorization, opts)
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
  getStatisticExportFile,
  getFileUrl,
  uploadFile,
  uploadDocument
};
export default filesService;
