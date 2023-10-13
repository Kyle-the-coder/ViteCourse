import React, {
  Key,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type OverflowContainerProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  renderOverflow: (overflowAmount: number) => ReactNode;
  getKey: (item: T) => Key;
  className?: string;
};

export function OverFlowContainer<T>({
  items,
  getKey,
  renderItem,
  renderOverflow,
  className,
}: OverflowContainerProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [overflowAmount, setOverflowAmout] = useState(0);

  useLayoutEffect(() => {
    if (containerRef.current === null) return;
    const observer = new ResizeObserver((entries) => {
      const containerElement = entries[0]?.target;
      if (containerElement === null) return;
      console.log(containerElement);
    });

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [items]);
  return (
    <>
      <div className={className} ref={containerRef}>
        {items.map((item) => {
          return (
            <div data-item key={getKey(item)}>
              {renderItem(item)}
            </div>
          );
        })}
      </div>
      <div data-overflow>{renderOverflow(overflowAmount)}</div>
    </>
  );
}
