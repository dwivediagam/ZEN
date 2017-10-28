$(document).ready(function() {
	$("#buttons").click(function(e){
		var search = $("#msg").val();
		search = search.split(" ");
		var stringArray = new Array();
		var queryString = " ";
		for(var i =0; i < search.length; i++){
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
			url : 'https://api.wolframalpha.com/v2/query?input=' + queryString + '&format=image,plaintext&output=JSON&appid=Q4WPE9-25JW66UKQV',
			type : 'GET',
			dataType : 'jsonp',
			success : function(data) {
				var StringOutput = data.queryresult.pods[1].subpods[0].plaintext;
				$("#list").append('<li> <div class="jumbotron"><h3><b> Gags:&nbsp</b><br><div class="row" style="width:100%;margin-top:10%;height:75%;"><ul style="list-style:none;">' + StringOutput + '</ul></div></div></li>').fadeIn(2000);
			}
		});

		function getOutput(data) {

		}
		e.preventDefault();
	});
});