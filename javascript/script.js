$(document).ready(function() {
  $("#uploadButton").click(function() {
   
  
  getAuthorizationCode()

  });


function getAuthorizationCode() {
  var clientId = '67818761375-rgfcuff6ukb5gttn95fglus8uq0fmrgs.apps.googleusercontent.com';
  var redirectUri = 'http://localhost:8081'; // Replace with your actual redirect URI
  var scope = 'https://www.googleapis.com/auth/youtube.upload';

  // Extract authorization code from the URL query parameters
  var urlParams = new URLSearchParams(window.location.search);
  var authorizationCode = urlParams.get('code');

  if (!authorizationCode) {
    // If authorization code is not present in the URL, redirect user to authorization URL
    var authorizationUrl = 'https://accounts.google.com/o/oauth2/auth?response_type=code' +
      '&client_id=' + encodeURIComponent(clientId) +
      '&redirect_uri=' + encodeURIComponent(redirectUri) +
      '&scope=' + encodeURIComponent(scope);
    window.location.href = authorizationUrl;
  } else {
    // Make a POST request to your server with the authorization code
    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbwdvNW0o8TbjTdIQyDAxNmSbHLzA_H9CcAjhMtcgrcKwYd6sAbv3pYFf6dLUlan3F5L/exec',
      type: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: { code: authorizationCode },
      headers: {
        'origin': 'http://localhost:8081'
      },
      success: function(response) {
        console.log('POST request successful');
        console.log(response); // Log the response from the server
      },
      error: function(xhr, status, error) {
        console.error('Error making POST request:', error);
      }
    });

  }
}


// 4/0AeaYSHCwUcmGpQsroQ_EbHSkBf0BGJAkfBIZiWtKf_wWrC69oWh7ALkbGe3bzB9oWVGQGQ

});
