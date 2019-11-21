import "./infinity-scroll.scss";

import React, { useCallback, useRef } from "react";

const _InfinityScroll: React.FC<Props> = ({ hasMore, loadMore, children }) => {
  const scroll: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const container: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(
    null
  );

  const handleScroll = useCallback(() => {
    if (scroll.current && container.current) {
      const scrollCurrent = scroll.current;
      const scrollTop = scrollCurrent.scrollTop;
      const clientHeight = window.innerHeight;
      const scrollHeight = container.current.getBoundingClientRect().height;
      const offsetBottom = scrollHeight - scrollTop - clientHeight;
      if (offsetBottom < 100 && hasMore) loadMore();
    }
  }, [hasMore, window.innerHeight, loadMore]);

  return (
    <div className="infinity-scroll" ref={scroll} onScroll={handleScroll}>
      <div className="infinity-scroll__container" ref={container}>
        {children}
      </div>
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  loadMore: () => void;
  hasMore?: boolean;
}

const InfinityScroll = React.memo<React.FC<Props>>(_InfinityScroll);
export default InfinityScroll;
