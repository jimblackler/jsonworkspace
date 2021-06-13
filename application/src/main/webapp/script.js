import {API_KEY} from '/apiKey.js'
import {flattened} from '/flatten.js'
import {getSheet} from '/sheet.js'

const DISCOVERY_DOCS =
    ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

const documentEditor = ace.edit(
    document.getElementById('documentEditor'),
    {mode: 'ace/mode/json', theme: 'ace/theme/katzenmilch', fontSize: '14px'});
const doc = localStorage.getItem('document');
if (doc !== null) {
  documentEditor.setValue(doc, -1);
}

const inputButton = document.getElementById('importButton');
const importData = () => {
  const progress = document.getElementById('importProgress');
  progress.style.visibility = 'visible';
  gapi.load('client:auth2', () => {
    gapi.client.init({apiKey: API_KEY, discoveryDocs: DISCOVERY_DOCS})
        .then(() => fetch('getToken'))
        .then(response => {
          if (!response.ok) {
            alert(response.statusText);
            progress.style.visibility = 'hidden';
            return Promise.reject();
          }
          return response.json();
        })
        .then(data => {
          if (!('accessToken' in data)) {
            window.location.href = '/login';
            progress.style.visibility = 'hidden';
            return Promise.reject();
          }
          gapi.auth.setToken({
            access_token: data.accessToken,
          });
          const object = JSON.parse(documentEditor.getValue());
          if (Array.isArray(object)) {
            return gapi.client.sheets.spreadsheets.create(
                getSheet(flattened(object)));
          }
          throw new Error('Data must be a JSON array');
        })
        .then(response => {
          localStorage.removeItem('importing');
          return gapi.client.sheets.spreadsheets
              .batchUpdate({
                spreadsheetId: response.result.spreadsheetId,
                resource: {
                  requests: [{
                    autoResizeDimensions: {
                      dimensions: {
                        sheetId: response.result.sheets[0].properties.sheetId,
                        dimension: 'COLUMNS'
                      }
                    }
                  }]
                }
              })
              .then(() => location.href = response.result.spreadsheetUrl);
        })
        .catch(err => {
          progress.style.visibility = 'hidden';
          if (err.status === 401) {
            if ('headers' in err && 'www-authenticate' in err.headers &&
                err.headers['www-authenticate'].includes('invalid_token')) {
              window.location.href = '/logout?redirect=%2Flogin';
              return;
            }
          }
          localStorage.removeItem('importing');
          if ('result' in err && 'error' in err.result &&
              'message' in err.result.error) {
            alert(err.result.error.message);
          } else if (err instanceof Error) {
            alert(err.message);
          }
        });
  });
};

if (localStorage.getItem('importing')) {
  importData();
}

inputButton.addEventListener('click', () => {
  localStorage.setItem('importing', 'true');
  importData();
});

document.addEventListener('visibilitychange', function logData() {
  if (document.visibilityState === 'hidden') {
    localStorage.setItem('document', documentEditor.getValue());
  }
});