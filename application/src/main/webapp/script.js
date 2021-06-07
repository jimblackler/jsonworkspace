const documentEditor = ace.edit(document.getElementById('documentEditor'), {
  mode: 'ace/mode/json',
  theme: 'ace/theme/katzenmilch',
  fontSize: '14px'
});

const inputButton = document.getElementById('importButton');
inputButton.addEventListener('click', event => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: 'AIzaSyC97MSNOaclB2Xc7JnHgdIvMVlhDFI-LDg',
      clientId: '559178029904-nnh2tt89arkjvoihcfua4obgpth6076u.apps.googleusercontent.com',
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      scope: "https://www.googleapis.com/auth/drive.file"
    }).then(() => {
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        gapi.auth2.getAuthInstance().signIn();
        return;
      }

      gapi.client.sheets.spreadsheets.create({
        properties: {
          title: 'good afternoon?'
        }
      }).then(response => {
        alert(response);
      });

    }, error => {
      alert(JSON.stringify(error, null, 2));
    });
  });
});