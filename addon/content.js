

var serverHost = "http://localhost:4567";

	//HTML content:
$.fancybox( '<div><h1>Before you make this purchase...</h1><p>17% of clothing purchases will never be worn by their owners. Consider a donation instead.</p></div> <button type = "button" class="btn btn-default" id="payment">Donate $10</button><button type="button" class="btn btn-default" id="close-fancy">I need these shoes</button></div>', {
    helpers: {
    	title : 'Before you make this purchase...',
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
  initCharitiesList();

  $('#payment').on('click', function(){
     chrome.runtime.sendMessage({ 
      method: 'POST', 
      action: 'xhttp',
      url: serverHost + '/payment'
      }, function(responseText) {
        responseMessage(responseText)
      });
    })
  })

function responseMessage(response) {
  $('.fancybox-inner').empty().append(JSON.parse(response).message)
}

// function getAccountInfo() {
//   var req = new XMLHttpRequest();
//   req.open("GET", serverHost + '/account', true);
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

function initCharitiesList() {
  ajaxCall(serverHost + "/charity/all/", "GET", function(result) {
    var arr = result.split(',');

    for (var i=0; i<arr.length; i++) {
      ajaxCall(serverHost + "/charity/" + arr[i] + "/", "GET", function(result) {
        var json = $.parseJSON(result);
        $('.card-list').append('<div class="card"><div class="title" title="' + json.description + '">' + json.name
        + '</div>'
        + '<div class="card-image"><img src="' + json.logoAbsoluteUrl + '"></img></div>'
        + '</div></div>');
      });
    }
  });
}

function ajaxCall(url, type, callback) {
  chrome.runtime.sendMessage({
    method: type,
    action: 'xhttp',
    url: url,
    contentType: 'application/json'
    //data: 'q=something'
  }, callback);
}



