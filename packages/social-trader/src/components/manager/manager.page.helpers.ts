import { useSelector } from "react-redux";
import { idSelector } from "reducers/header-reducer";

export const useIsOwnPage = (id: string) => {
  const selfId = useSelector(idSelector);
  if (selfId === undefined) return undefined;
  return id === selfId;
};
