export const VERSION_ID = "VERSION_ID";
export const VERSION_FIELD = "version";

export const logVersion = () => {
  if (typeof document !== "undefined") {
    console.log(document.getElementById(VERSION_ID)?.dataset[VERSION_FIELD]);
  }
};
