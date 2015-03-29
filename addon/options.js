
$(function() {
//   // Handler for .ready() called.
	$( ".polaroid" ).click(function() {
		// console.log('lol');
	  $(this).toggleClass("active");
	  var categories = [];
	  var cat = $(this).find('p').text();
	  if ($(this).hasClass("active")){
	  	
	  	
	  	console.log($(this).find('p').text())
	  	
	  		chrome.storage.sync.get('categories', function(result){
	  			console.log('lol' + result);
	  			if (result.value === undefined) {
	  				categories.push(cat);
	  			}
	  			else{
	  				categories = result.value;
	  				categories.push(cat);
	  			}

	  		});
          chrome.storage.sync.set({'categories': categories}, function() {
          	console.log("saved");
        	});
	  } else {
	  	chrome.storage.sync.get('categories', function(result){
	  		if (!(result.value === undefined)) {
	  			categories = result.value;
	  			categories.splice(categories.indexOf(cat),1);
	  		}
	  		
	  	});
	  	chrome.storage.sync.set({'categories': categories}, function() {
          		console.log("saved deleted");
        });

	  }

	});

	
});


