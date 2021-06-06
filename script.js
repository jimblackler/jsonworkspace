const documentEditor = ace.edit(document.getElementById('documentEditor'), {
  mode: 'ace/mode/json',
  theme: 'ace/theme/katzenmilch',
  fontSize: '14px'
});

const inputButton = document.getElementById('importButton');
inputButton.addEventListener('click', event => {
  alert('bo');
});