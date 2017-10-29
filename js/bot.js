$(document).ready(function() {
	$("#puf").hide();

	$("#form").submit(function(e){
		$("#puf").show();
		
			var search = $("#msg").val();
		//window.scrollBy(0, 500);
		search = search.split(" ");
		var stringArray = new Array();
		var queryString = " ";
		for(var i = 0; i < search.length; i++){
			stringArray.push(search[i]);
			if(search[i] == '+') {
				search[i] = '%2B';
			}
			if(search[i] == '%') {
				search[i] = '%25';
			}
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

		function pageRedirect() {
			window.location.href = "display.html";
		}

		e.preventDefault();
	});
});