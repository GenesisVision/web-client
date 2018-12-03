import fileApi from "./api-client/file-api";

const getFileUrl = id => {
  if (!id) return "";
  return `${process.env.REACT_APP_API_URL}/v1.0/file/${id}`;
};

const uploadFile = (file, authorization) => {
  return fileApi
    .v10FileUploadPost(file, { authorization })
    .then(response => response.id);
};

const uploadDocument = (file, authorization) => {
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
