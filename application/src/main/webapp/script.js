import {getSheet} from '/sheet.js'

const API_KEY = 'AIzaSyC97MSNOaclB2Xc7JnHgdIvMVlhDFI-LDg';
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
inputButton.addEventListener('click', () => {
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
            'access_token': data.accessToken,
          });
          return gapi.client.sheets.spreadsheets.create(
              getSheet(JSON.parse(documentEditor.getValue())))  ;
        })
        .catch(err => {
          progress.style.visibility = 'hidden';
          if (err.status === 401) {
            if ('headers' in err && 'www-authenticate' in err.headers &&
                err.headers['www-authenticate'].includes('invalid_token')) {
              window.location.href = '/logout?redirect=%2Flogin';
            } else if ('result' in err && 'error' in err.result &&
                'message' in err.result.error) {
              alert(err.result.error.message);
            } else {
              alert('Inauthenticated');
            }
          } else if (err instanceof Error) {
            alert(err.message);
          }
        })
        .then(response => {
          location.href = response.result.spreadsheetUrl;
        });
  });
});

document.addEventListener('visibilitychange', function logData() {
  if (document.visibilityState === 'hidden') {
    localStorage.setItem('document', documentEditor.getValue());
  }
});
