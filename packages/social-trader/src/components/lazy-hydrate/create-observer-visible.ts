import useFlag from "hooks/flag.hook";
import { RefObject, useEffect } from "react";

const isBrowser = typeof window !== "undefined";

export const createUseObserverVisible = (
  observerOptions: IntersectionObserverInit = {}
) => (ref: RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useFlag();

  useEffect(() => {
    if (!ref.current || !ref.current.childElementCount || isVisible) return;

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          observer.disconnect();
          setIsVisible();
        }
      });
    }, observerOptions);

    io.observe(ref.current.children[0]);

    return () => {
      io.disconnect();
    };
  }, [ref]);

  return isBrowser ? isVisible : true;
};
