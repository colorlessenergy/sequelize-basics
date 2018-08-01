var req = new XMLHttpRequest();
var url = '/title';

let title = document.querySelector('h1');

req.open('GET',url,true);
req.addEventListener('load',onLoad);
req.addEventListener('error',onError);

req.send();

function onLoad() {
  console.log(this)
   var response = this.responseText;
   var parsedResponse = JSON.parse(response);

   // access your data newly received data here and update your DOM with appendChild(), findElementById(), etc...
   var messageToDisplay = parsedResponse['title'];
   title.textContent = messageToDisplay;
   console.log(messageToDisplay, 'RANNED HOMIE')
   // append child (with text value of messageToDisplay for instance) here or do some more stuff
}

function onError() {
  // handle error here, print message perhaps
  console.log('error receiving async AJAX call');
}