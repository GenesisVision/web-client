const getFileUrl = id => {
  if (id == undefined) return "";
  return `${process.env.REACT_APP_API_URL}/api/files/${id}`;
};

const filesService = { getFileUrl };
export default filesService;
