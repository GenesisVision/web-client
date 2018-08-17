const getFileUrl = id => {
  if (id === null) return "";
  return `${process.env.REACT_APP_API_URL}/v1.0/file/${id}`;
};

const filesService = { getFileUrl };
export default filesService;
