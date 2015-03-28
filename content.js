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
$.fancybox( '<div><h1>Lorem Lipsum</h1><p>Lorem lipsum</p></div> <div><button type="button" class="btn btn-default" id="close-fancy">Left</button></div>', {
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

// alert('lol2');

$(function() {
//   // Handler for .ready() called.
	$( "body" ).append( "<h1>Test2</h1>" );
});


