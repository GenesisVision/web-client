import { CancelablePromise } from "gv-api-web";

import fileApi from "./api-client/file-api";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";

const getExportFileUrl = (
  id: string,
  dateRange: DateRangeFilterType
): string => {
  const start = dateRange.dateStart
    ? `start=${new Date(dateRange.dateStart as string).toISOString()}&`
    : "";
  const end = dateRange.dateEnd
    ? `end=${new Date(dateRange.dateEnd as string).toISOString()}`
    : "";
  const filters = `?${start}${end}`;
  return `${process.env.REACT_APP_API_URL}/v1.0/programs/${id}/trades/export${
    dateRange.dateStart || dateRange.dateEnd ? filters : ""
  }`;
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
  getExportFileUrl,
  getFileUrl,
  uploadFile,
  uploadDocument
};
export default filesService;
