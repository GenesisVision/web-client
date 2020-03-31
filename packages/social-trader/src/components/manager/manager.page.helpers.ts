import { useSelector } from "react-redux";
import { idSelector } from "reducers/header-reducer";

export const useIsOwnPage = (id: string) => {
  const selfId = useSelector(idSelector);
  return id === selfId;
};
