$(document).ready(function() {
	$("#puf").hide();

	$("#form").submit(function(e){
		$("#puf").show();
		
			var search = $("#msg").val();
			var s1 = search.match(/your/g);
			var s2 = search.match(/name/g);
			var s3 = search.match(/who/g);
			var s4 = search.match(/you/g);
			var s5 = search.match(/about/g);
			var s6 = search.match(/yourself/g);
			var s7 = search.match(/who/g);
			var s12 = search.match(/Who/g);
			var s8 = search.match(/made/g);
			var s9 = search.match(/you/g);
			var s10 = search.match(/built/g);
			var s11 = search.match(/created/g);
			if((s1 && s2)||((s3||s12) && s4)||(s5 && s6))
			{
				$("#result").empty();
				$("#result").append('<h2>My name is Zen</h2>');
				window.scrollBy(0, 100);
					$("#puf").hide();
			}
			
			if(((s7||s12) && s8 && s9)||((s7||s12) && s10 && s9)||((s7||s12) && s11 && s9))
			{
				$("#result").empty();
				$("#result").append('<h2>Gagan Ganapathy</h2><h2>Pradeep Gangwar</h2><h2>Arindam Das Modak</h2><h2>Agam Dwivedi</h2>');
				window.scrollBy(0, 100);
					$("#puf").hide();
			}
			console.log(search);
			search = encodeURIComponent(search);
			console.log(search);
			
		//window.scrollBy(0, 500);
		search = search.split(" ");
		var stringArray = new Array();
		var queryString = " ";
		for(var i = 0; i < search.length; i++){
			stringArray.push(search[i]);
			search[i].replace(/\+/g,"%2B");
      		search[i].replace("%","%25");
			// if(search[i] == '+') {
			// 	search[i] = '%2B';
			// }
			// if(search[i] == '%') {
			// 	search[i] = '%25';
			// }
			if(i != search.length - 1)
				queryString = queryString + search[i] + "+";
			else 
				queryString = queryString + search[i];
		}
	if(!((s1 && s2)||((s3||s12) && s4)||(s5 && s6)) && !(((s7||s12) && s8 && s9)||((s7||s12) && s10 && s9)||((s7||s12) && s11 && s9))){
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
					window.scrollBy(0, 80);
					$("#puf").hide();
				}	
			}
		});
	}
		function pageRedirect() {
			window.location.href = "display.html";
		}

		e.preventDefault();
	});
});
