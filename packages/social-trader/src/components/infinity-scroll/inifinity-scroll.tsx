import React, { useCallback, useRef } from "react";

import "./infinity-scroll.scss";

export const loadOnScroll = ({
  scroll,
  container,
  hasMore,
  loadMore
}: {
  scroll: HTMLDivElement;
  container: HTMLDivElement;
  hasMore?: boolean;
  loadMore: () => void;
}) => {
  const scrollTop = scroll.scrollTop;
  const clientHeight = window.innerHeight;
  const scrollHeight = container.getBoundingClientRect().height;
  const offsetBottom = scrollHeight - scrollTop - clientHeight;
  if (offsetBottom < 100 && hasMore) loadMore();
};

const _InfinityScroll: React.FC<Props> = ({ hasMore, loadMore, children }) => {
  const scroll: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const container: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(
    null
  );

  const handleScroll = useCallback(() => {
    if (scroll.current && container.current) {
      loadOnScroll({
        scroll: scroll.current,
        container: container.current,
        hasMore,
        loadMore
      });
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
