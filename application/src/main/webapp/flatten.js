function flatten(stem, inValue, consumer) {
  if (inValue.constructor === Object) {
    for (const [key, value] of Object.entries(inValue)) {
      flatten(stem ? `${stem}.${key}` : key, value, consumer);
    }
    return;
  }
  if (Array.isArray(inValue)) {
    inValue.forEach(
        (row, index) => flatten(`${stem}[${index}]`, row, consumer));
    return;
  }
  consumer(stem, inValue);
}

export function flattened(inArray) {
  const outArray = [];
  inArray.forEach(row => {
    const outRow = {};
    flatten('', row, (key, value) => outRow[key] = value);
    outArray.push(outRow);
  });
  return outArray;
}
