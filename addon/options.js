
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
		var key = this.id;
		var obj = {}
		//obj[key] = val;

    if (key == 'cardno') {
      chrome.storage.sync.set({ "cardno": val }, function() {
        console.log("cardno, " + val);
      });
    } else if (key == 'expiry') {
      chrome.storage.sync.set({ "expiry": val }, function() {
        console.log("expiry, " + val);
      });

    } else if (key == 'cvv') {
      chrome.storage.sync.set({ "cvv": val }, function() {
        console.log("cvv, " + val);
      });
    }

        //chrome.storage.sync.get("cardno", function(result) {
			  //// console.log('key after' + key);
  			//console.log(result);
  			//if (!(result.value === undefined)) {
  			//	val = result.value;
  			//}
  		//});
	});
});

function populateValues(){
	//$( "input" ).val(
	//	function(){
	//	var key = $(this).closest("label").text();
	//	var val = '';
	//	chrome.storage.sync.get(key, function(result){
	//		console.log('key' + key);
  	//		console.log('lol' + result.value);
  	//		if (!(result.value === undefined)) {
  	//			val = result.value;
  //
  	//		}
  //
  	//	});
	//	return val;
	//})
  getCache();
}

function getCache() {
  chrome.storage.sync.get('cardno', function (result) {
    console.log('lolx ' + result.cardno);
    if (!(result.cardno === undefined)) {
      val = result.cardno;
      $('#cardno').val(val);

    }
  });
  
  chrome.storage.sync.get('expiry', function (result) {
    console.log('lolx ' + result.expiry);
    if (!(result.expiry === undefined)) {
      val = result.expiry;
      $('#expiry').val(val);
    }
  });

  chrome.storage.sync.get('cvv', function (result) {
    console.log('lolx ' + result.cvv);
    if (!(result.cvv === undefined)) {
      val = result.cvv;
      $('#cvv').val(val);
    }
  });
}

