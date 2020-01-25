import { ScrollDataType } from "components/horizontal-list-shadow-container/horizontal-list-shadow-container";
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

export const useShadow = (): {
  ref: RefObject<HTMLDivElement>;
  scrollData: ScrollDataType;
  handleScroll: VoidFunction;
} => {
  const ref = useRef<HTMLDivElement>(null);
  const [endOfList, setEndOfList] = useState(0);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    console.log(ref.current.scrollWidth, ref.current.offsetWidth);
    setEndOfList(ref.current.scrollWidth - ref.current.offsetWidth);
  }, [ref.current, setEndOfList]);
  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    setScroll(ref.current.scrollLeft);
  }, [ref.current]);
  const scrollData = useMemo(() => ({ endOfList, scroll }), [
    endOfList,
    scroll
  ]);
  return {
    ref,
    scrollData,
    handleScroll
  };
};
