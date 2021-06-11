export function getSheet(data) {
  const keys = [];
  data.forEach(row => {
    for (const [key, value] of Object.entries(row)) {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    }
  });

  const values = [];
  keys.forEach(key => values.push({userEnteredValue: {stringValue: key}}));

  const rowData = [{values}];
  data.forEach(row => {
    const rowValues = [];
    keys.forEach(key => {
      const rowElement = row[key];
      if (rowElement === undefined) {
        rowValues.push({});
      } else {
        if (typeof rowElement === 'number') {
          rowValues.push({userEnteredValue: {numberValue: rowElement}});
        } else if (typeof rowElement === 'boolean') {
          rowValues.push({userEnteredValue: {boolValue: rowElement}});
        } else {
          rowValues.push({userEnteredValue: {stringValue: rowElement}});
        }
      }
    });
    rowData.push({values: rowValues});
  });

  return {
    properties: {},
    sheets:
        [{properties: {gridProperties: {frozenRowCount: 1}}, data: [{rowData}]}]
  };
}