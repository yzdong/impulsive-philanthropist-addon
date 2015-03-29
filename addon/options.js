
$(function() {
	populateValues();

//   // Handler for .ready() called.
	$( ".polaroid" ).click(function() {
		// console.log('lol');
	  $(this).toggleClass("active");
	  var categories = [];
	  var cat = $(this).find('p').text();
	  if ($(this).hasClass("active")){
	  	
	  	
	  	console.log($(this).find('p').text())
	  	
	  		chrome.storage.sync.get('categories', function(result){
	  			// console.log('lol' + result);
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


	$( "input" ).blur(function() {
		var val = $(this).val();
		var key = $(this).closest("label").text();
		var obj = {}
		console.log(val);
		obj[key] = val;
		chrome.storage.sync.set({'obj': '123'}, function() {
          	console.log(obj);
        });

        chrome.storage.sync.get('obj', function(result){
			// console.log('key after' + key);
  			console.log('lol after' + result.value);
  			if (!(result.value === undefined)) {
  				val = result.value;

  			}

  		});
	});

	
});

function populateValues(){
	$( "input" ).val(
		function(){
		var key = $(this).closest("label").text();
		var val = '';
		chrome.storage.sync.get(key, function(result){
			console.log('key' + key);
  			console.log('lol' + result.value);
  			if (!(result.value === undefined)) {
  				val = result.value;

  			}

  		});
		return val;
	})
}

