import fileService from "services/file-service";

const useUrl = () => {
  return {
    getUrl: (path?: string): string => fileService.getFileUrl(path)
  };
};

export default useUrl;
