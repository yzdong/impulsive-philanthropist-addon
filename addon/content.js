var pattern=/^http?:\/\/([a-zA-Z\d-]+\.){0,}zalora\.sg$/;
var viewtext_base_url = "https://www.google.com";
var newurl;

console.log(window.location.href.toString());

// if (pattern.test(window.location.href.toString())) // if it matches pattern defined above
// {

	console.log("correct link");
	newurl = viewtext_base_url; //+ encodeURIComponent(window.location.href);
	// chrome.extension.sendRequest({redirect: newurl}); // send message to redirect

	// alert('lol');
	var $width = 700;
// for window smaller than 800px (or else)
	if ($(window).width() < 860){
	    $width = "80%" // or whatever for small devices
	}
	
	//HTML content:
$.fancybox( '<div><h1>Lorem Lipsum</h1><p>Lorem lipsum</p></div> <button type = "button" class="btn btn-default" id="payment">Pay $10</button><button type="button" class="btn btn-default" id="close-fancy">Left</button></div>', {
    helpers: {
    	title : 'Before you go on',
        overlay : {
            css : {
                'background' : 'rgba(255,255,255,0.5)'
            }
        }
	}
});


$("#close-fancy").click(function(){
	$.fancybox.close();
});

$(function() {
//   // Handler for .ready() called.
  $( "body" ).append( "<h1>Test2</h1>" );
});

$('document').ready(function(){  
  $('#payment').on('click', function(){
     chrome.runtime.sendMessage({ 
      method: 'POST', 
      action: 'xhttp',
      url: 'http://localhost:4567/payment' 
      }, function(responseText) {
        alert('Success')
      });
    })
  })

// function getAccountInfo() {
//   var req = new XMLHttpRequest();
//   req.open("GET", 'http://localhost:4567/account', true);
//   req.onload = function(e) {
//     if (req.readyState === 4) {
//       if (req.status === 200) {
//         setupPaymentDetails(req.responseText)
//       } else {
//         console.error(req.statusText);
//       }
//     }
//   }
//   req.send(null)
// };

// function setupPaymentDetails(properties) {
//   var account_info = JSON.parse(properties);
//   var client_token = account_info.client_token;
//   console.log(client_token)
//   braintree.setup(
//     client_token,
//     'dropin', {
//       container: 'dropin'
//   });
// }



