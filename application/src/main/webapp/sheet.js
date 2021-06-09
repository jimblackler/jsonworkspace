export function getSheet(data) {
  return {
    properties: {},
    sheets: [{
      properties: {gridProperties: {frozenRowCount: 1}},

      data: [{
        rowData: [
          {
            values: [
              {userEnteredValue: {stringValue: 'a'}},
              {userEnteredValue: {stringValue: 'b'}},
              {userEnteredValue: {stringValue: 'c'}}
            ]
          },
          {
            values: [
              {userEnteredValue: {numberValue: 1}},
              {userEnteredValue: {numberValue: 2}},
              {userEnteredValue: {numberValue: 3}}
            ]
          }
        ]
      }]
    }]
  };
}