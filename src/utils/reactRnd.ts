// a little function to help us with reordering the result
export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const sortItems = (items) => {
  return items.sort((a, b) => a.index > b.index);
};

export const getItemsFromProps = (props) => {
  const keys = Object.keys(props).sort((k1, k2) =>
    props[k1].index > props[k2].index ? 1 : -1
  );
  return keys.map((k) => ({
    key: k,
    ...props[k]
  }));
};
