// make variables for the html elements
const fetchButton = document.getElementById("fetchButton");
//const urlTextBox = document.getElementById("urlTextBox");
const dataResultArea = document.getElementById("mainResults");

//variables for location pull
let url = "https://api.open-meteo.com/v1/forecast?latitude=-27.859770&longitude=153.387820&current=temperature_2m";
let lat = -27.875;
let lon = 153.375;


//Get latlon and fill URL  
function success(pos) {
    const crd = pos.coords;
    lat = crd.latitude;
    lon = crd.longitude;
    url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`

    getRequest(url);

  }

// Make a GET api request
async function getRequest(someURL) {
    // clear out the data printout area of the html page
    dataResultArea.innerHTML = "";
    
    // Fetch a response from the REST API
    const response = await fetch(someURL);
    
    // extract the JSON payload from the response
    const result = await response.json();
    
    // Sometimes the payload is actually a string instead of an object. If so convert
    // it to an object
    let objResult = (typeof result == "object") ? result  : JSON.parse(result);
    
    // and either way, convert the object to a string to print out. 
    let strResult = JSON.stringify(objResult, undefined, 2);
    dataResultArea.innerHTML = `<pre><code>${strResult}</code></pre>`;
    
    // return the JSON object
    return objResult;
}


// Make the GET request when the fetch button is clicked
fetchButton.addEventListener('click', async (event) => {
    
    navigator.geolocation.getCurrentPosition(success);

    let data = await getRequest(url);
    // Do something else with 'data' if you want
});


// Also fetch the URL if it changes
urlTextBox.addEventListener('change', async (event) => {
    let url = urlTextBox.value;
    let data = await getRequest(url);
    // Do something else with 'data' if you want
});



  
  
