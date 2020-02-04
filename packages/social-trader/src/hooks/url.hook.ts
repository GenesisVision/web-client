import fileService from "services/file-service";

export type ImageQualityType = "Low" | "Medium" | "High";

const useUrl = () => {
  return {
    getUrl: (path?: string, quality?: ImageQualityType): string =>
      fileService.getFileUrl(path, quality)
  };
};

export default useUrl;
