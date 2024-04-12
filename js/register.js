$(document).ready(function() {

	// Adding a "JavaScript is Enabled" Body Class

	$("body").addClass("js");

    $(".more-padding").submit(function(event) {

		let Username = $("#Username").val();
		let Password = $("#Password").val();
		let complete = false;

		console.log(Username);
		console.log(Password);

		if(Username != "" && Password != "") {
            $("#Username").removeClass("error");
            $("#Password").removeClass("error");
			complete = true;
		}

		if(Username == "") {
			$("#Username").addClass("error");
		}

		if(Password == "") {
			$("#Password").addClass("error");
		}

		if(complete) {

			console.log("Complete Form");
			$(".more-padding button").html("Successful!").attr('disabled', true);
        }
        else {
            console.log("Incomplete Form");
            $(".more-padding button").html("Try Again");

		// 	$(".name").html(firstName);

		// 	let age = $("input[name=age]:checked").val();
		// 	if(age != "") {
		// 		$(".name").attr("title", `Age: ${age}`);
		// 	}

		// }
		// else {
		// 	console.log("Incomplete Form");
		// 	$("#part-of-story-form form button").html("Try Again");
		}
		event.preventDefault();

	});

});