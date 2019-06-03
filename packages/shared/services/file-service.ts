import { CancelablePromise } from "gv-api-web";

import fileApi from "./api-client/file-api";

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
  getFileUrl,
  uploadFile,
  uploadDocument
};
export default filesService;
