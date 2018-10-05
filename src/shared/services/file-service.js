import FileApi, { fileApiProxy } from "services/api-client/file-api";

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

const filesService = { getFileUrl, uploadFile, uploadFileProxy };
export default filesService;
