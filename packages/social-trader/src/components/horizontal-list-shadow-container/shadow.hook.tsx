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
    ref.current.scrollTo(0, 0);
    setScroll(0);
  }, [ref.current, endOfList]);
  useEffect(() => {
    if (!ref.current) return;
    setEndOfList(
      Math.floor(
        ref.current.scrollWidth - ref.current.getBoundingClientRect().width
      )
    );
  }, [ref.current]);
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
