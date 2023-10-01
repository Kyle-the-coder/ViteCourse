import React from "react";

type ListProps<T> = {
  items: T[];
  getKey: (item: T) => React.Key;
  renderItem: (item: T) => React.ReactNode;
};

export function List<T>({ items, getKey, renderItem }: ListProps<T>) {
  return (
    <div>
      {items.map((item) => {
        return <div key={getKey(item)}>{renderItem(item)} </div>;
      })}
    </div>
  );
}
