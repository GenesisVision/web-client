import fileService from "shared/services/file-service";

const useUrl = (path?: string): string => fileService.getFileUrl(path);

export default useUrl;
