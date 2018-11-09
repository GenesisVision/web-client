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

const addLogoSrc = key => data => {
  const target = data[key];

  if (target === null || target === undefined) {
    return data;
  }

  if (Array.isArray(target)) {
    target.forEach(ip => {
      ip.logoSrc = getFileUrl(ip.logo);
    });
  }

  if (typeof target === "object") {
    target.logoSrc = getFileUrl(target.logo);
  }

  if (typeof target === "string") {
    data.logoSrc = getFileUrl(target);
  }

  return data;
};

const filesService = { getFileUrl, uploadFile, addLogoSrc, uploadFileProxy };
export default filesService;
