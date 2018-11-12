import FileApi, { fileApiProxy } from "./api-client/file-api";

const getFileUrl = id => {
  if (!id) return "";
  return `${process.env.REACT_APP_API_URL}/v1.0/file/${id}`;
};

const uploadFile = (file, authorization) => {
  return FileApi.v10FileUploadPost(file, { authorization }).then(
    response => response.id
  );
};

const uploadFileProxy = (file, authorization) => {
  return fileApiProxy
    .v10FileUploadPost(file, { authorization })
    .then(response => response.data.id);
};

const uploadDocument = (file, authorization) => {
  return FileApi.v10FileDocumentUploadPost(authorization, file).then(
    response => response.id
  );
};

const filesService = {
  getFileUrl,
  uploadFile,
  uploadFileProxy,
  uploadDocument
};
export default filesService;
