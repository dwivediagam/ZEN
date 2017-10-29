'use strict';

var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + window.apiKey;

$(function () {
  $("#puf").hide();
  $('#fileform').on('submit', uploadFiles);
});

/**
 * 'submit' event handler - reads the image bytes and sends it to the Cloud
 * Vision API.
 */
function uploadFiles (event) {
  event.preventDefault(); // Prevent the default form post
	document.getElementById('id01').style.display='none';
  // Grab the file and asynchronously convert to base64.
  var file = $('#fileform [name=fileField]')[0].files[0];
  var reader = new FileReader();
  reader.onloadend = processFile;
  reader.readAsDataURL(file);
}

/**
 * Event handler for a file's data url - extract the image data and pass it off.
 */
function processFile (event) {
  var content = event.target.result;
  sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
}

/**
 * Sends the given file contents to the Cloud Vision API and outputs the
 * results.
 */
function sendFileToCloudVision (content) {
  var type = $('#fileform [name=type]').val();

  // Strip out the file prefix when you convert to json.
  var request = {
    requests: [{
      image: {
        content: content
      },
      features: [{
        type: "DOCUMENT_TEXT_DETECTION",
        maxResults: 200
      }]
    }]
  };

  $("#puf").show();
  $.post({
    url: CV_URL,
    data: JSON.stringify(request),
    contentType: 'application/json'
  }).fail(function (jqXHR, textStatus, errorThrown) {
     $('#result').text('ERRORS: ' + textStatus + ' ' + errorThrown);
    // $('#result').append('<h2 style="text-align:centre;font-size:40px;color:black;font-family: 'Saira', sans-serif;">TEXT NOT FOUND :(</h2>');
  }).done(displayJSON);
}

/**
 * Displays the results.
 */
function displayJSON (data) {
  console.log(data);
  var contents = data.responses[0].textAnnotations[0].description;

  console.log(contents);

    contents = encodeURIComponent(contents);

    console.log(contents);

    var search = contents.split(" ");
    var stringArray = new Array();
    var queryString = " ";
    for(var i = 0; i < search.length; i++){
      stringArray.push(search[i]);
      // if(search[i] == '+') {
      //   search[i] = '%2B';
      // }
      // if(search[i] == '%') {
      //   search[i] = '%25';
      // }
      if(i != search.length - 1)
        queryString = queryString + search[i] + "+";
      else 
        queryString = queryString + search[i];
    }

    $.ajax({
      url : 'https://api.wolframalpha.com/v2/query?input=' + queryString + '&format=html,image,plaintext&output=JSON&appid=Q4WPE9-25JW66UKQV',
      type : 'GET',
      dataType : 'jsonp',
      success : function(data) {
        //console.log(data);
        var StringOutput = "", imgLink = "";
        //pageRedirect();
        $("#result").empty();
        for(var j=0;j<data.queryresult.pods.length;j++) {

          $("#result").append(data.queryresult.pods[j].markup.data);
          window.scrollBy(0, 100);
          $("#puf").hide();
        }
      }
    });

  var evt = new Event('results-displayed');
  evt.results = contents;
  document.dispatchEvent(evt);
}
