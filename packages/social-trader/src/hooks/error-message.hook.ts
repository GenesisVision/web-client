import { useState } from "react";
import { ResponseError } from "utils/types";

export type TErrorMessage = string;
export const nullValue: TErrorMessage = "";

const useErrorMessage = (
  initValue: TErrorMessage = nullValue
): {
  errorMessage: TErrorMessage;
  setErrorMessage: (error: ResponseError) => void;
  cleanErrorMessage: () => void;
} => {
  const [errorMessage, setErrorMessageInner] = useState<TErrorMessage>(
    initValue
  );
  const setErrorMessage = ({ errorMessage }: ResponseError) =>
    setErrorMessageInner(errorMessage);
  const cleanErrorMessage = () => setErrorMessageInner(nullValue);
  return { errorMessage, setErrorMessage, cleanErrorMessage };
};

export default useErrorMessage;
