const documentEditor = ace.edit(document.getElementById('documentEditor'), {
  mode: 'ace/mode/json',
  theme: 'ace/theme/katzenmilch',
  fontSize: '14px'
});

const inputButton = document.getElementById('importButton');
inputButton.addEventListener('click', event => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: 'cf8e9ig-pgXCJLM-4h_8lkO7',
      clientId: '559178029904-o2hg6atu0jgucuns8mgfn61532galeqk.apps.googleusercontent.com',
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      scope: "https://www.googleapis.com/auth/drive.file"
    }).then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
        if (!isSignedIn) {
          gapi.auth2.getAuthInstance().signIn();
          return;
        }

        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
          range: 'Class Data!A2:E',
        }).then(response => {
          const range = response.result;
          if (range.values.length > 0) {
            console.log('Name, Major:');
            for (let i = 0; i < range.values.length; i++) {
              const row = range.values[i];
              console.log(row[0] + ', ' + row[4]);
            }
          } else {
            console.log('No data found.');
          }
        }, response => {
          alert(response.result.error.message);
        });
      });
    }, error => {
      alert(JSON.stringify(error, null, 2));
    });
  });
});