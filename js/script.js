
$(document).ready(function () {


	// Adding a "JavaScript is Enabled" Body Class

	$("body").addClass("js");


	//Hide top button
	$('#go-to-top').fadeOut();

	//successfully subscrible message
	$("#newsletter button").click(function(event){
		alert("Subscribe successfully!")
	})

	$("#contact-form button").click(function(event){
		alert("Thanks for your feedback!")
	})


	//mouse special effect
	var canvas = document.getElementById("canvas")
	var ctx = canvas.getContext("2d")
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	var colors = ["251,91,63", "105,124,241", "228,238,56", "95,239,106", "239,170,95"]
	var dots = []
	var live = 50
	window.addEventListener("mousemove", function (event) {
		for (var i = 0; i < 10; i++) {
			dots.push({
				sx: event.x,
				sy: event.y,
				vx: 0.5 - Math.random(),
				vy: 0.5 - Math.random(),
				life: live,
				color: colors[parseInt(Math.random() * colors.length)],
				size: Math.random() * 5
			})
		}
	})

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		for (var i = 0; i < dots.length; i++) {
			dot = dots[i];
			ctx.beginPath();
			ctx.arc(dot.sx, dot.sy, dot.size, Math.PI * 2, false);
			ctx.fillStyle = "rgba(" + dot.color + "," + dot.life/live + ")";
			ctx.fill();
			dot.life--;
			if (dot.life <= 0) {
				dots.splice(i, 1)
			}
			dot.sx += dot.vx * 5;
			dot.vy += dot.vy * 5;
		}
	}
	setInterval(draw, 1)


	if ($('#index').length > 0) {
		// Podcast Player Controls

		$("#music-switch .player-controls a:first-child").click(function (event) {
			$(this).parent().toggleClass("playing");
			$("#music-switch audio")[0].play();
			event.preventDefault();
		});

		$("#music-switch .player-controls a:last-child").click(function (event) {
			$(this).parent().toggleClass("playing");
			$("#music-switch audio")[0].pause();
			event.preventDefault();
		});


		// Cover-Image auto play
		function changeImg(x) { //change list image 
			$('.imgList li').eq(x).fadeIn().siblings().fadeOut();
			$('.choiceList a').eq(x).addClass('cover').siblings().removeClass('cover')
		}

		var step = 0;
		changeImg(step);

		var timer = null;
		function autoPlay() {
			timer = setInterval(function () {
				step++;
				if (step === 5) {
					step = 0;
				}
				changeImg(step);
			}, 2000)
		}
		autoPlay();

		//click left button
		$('.leftBtn').click(function () {
			clearInterval(timer);
			step--;
			if (step === -1) {
				step = 4;
			}
			changeImg(step);
			autoPlay();
		})

		//click right button

		$('.rightBtn').click(function () {
			clearInterval(timer);
			step++;
			if (step === 5) {
				step = 0;
			}
			changeImg(step);
			autoPlay();
		})


		//click dot to change image
		$('.choiceList a').click(function () {
			clearInterval(timer);
			step = $(this).index();
			changeImg(step);
			autoPlay()
		})

		//Stop changing images when hover
		$('.imgList').mouseover(function () {
			clearInterval(timer);
		}).mouseout(function () {
			autoPlay()
		})


		// Top button(uesd to go back to web top)
		$(window).scroll(function () {
			if ($(window).scrollTop() > 950) {
				$('#go-to-top').fadeIn();
				$("#navbar").addClass("navbar-hide-top");
			}
			else {
				$('#go-to-top').fadeOut();
				$("#navbar").removeClass("navbar-hide-top");
			}
		})
	};

	if ($('#Attractions').length > 0){
		// AOS plugin
		AOS.init({
			duration: 1200
		});
	}

	if ($('#Introduction').length > 0){
		// AOS plugin
		AOS.init({
			duration: 500
		});
	}

	if ($('#Recommendations').length > 0){
		// AOS plugin
		AOS.init({
			duration: 1000
		});
		// Recommendations click expand button to show more info
		$(".routes article .expand-button button").click(function(event) {
			$(this).parent().parent().addClass("expanded");
			event.preventDefault();
		});
	};


	if ($('#Ticketing').length > 0){
		// AOS plugin
		AOS.init({
			duration: 1200
		});

		//Calculate total price to be paid
		$("#calculate").click(function(event) {
			$(" input#remarks + p ").empty();
			if ($("#amounts").val() > 0){
				var amount = $("#amounts").val()
				var unit = 0		
				if  ($("select#ticket").val() == "Adult"){
					var unit = 30;
				}
				else if ($("select#ticket").val() == "Child"){
					var unit = 15;
				}
				else if ($("select#ticket").val() == "Student"){
					var unit = 20;
				}
				var total = 0;		
				total = amount * unit;
				$(" input#remarks + p ").append("Total price to be paid:" + " AUD " + total);
				event.preventDefault();
			    }		

			else{
				alert("TypeError! Please enter a positive number!")
			}
		});


		// purchase success pop-up window
		$("#submit, .purchase-popup .close-button a").click(function(event) {
			$("body").toggleClass("show-purchase-popup");
			$("body .purchase-popup .cycle-slideshow").toggleClass("show-purchase-popup");
			event.preventDefault();
		});

		//Tour guide game
		$(".tour-guide nav#name button").click(function(event){
			let username = $(" input[name='name'] ").val()
			$("nav#name p").append(" " + username + " !" +" Follow the guidance below and wish you have a nice journey!");
			$("nav#name p").addClass("appear");
			$("nav#preference").addClass("appear");
			$(".tour-guide nav#name button").hide();
			event.preventDefault();
		})


		var userpreference = null
		$(".tour-guide nav#preference button").click(function(event){
			userpreference = $("select[name='preference']").val();
			console.log(userpreference);
			if (userpreference == 1){
				$("nav#preference p.first").addClass("appear");
			}

			else if (userpreference == 2){
				$("nav#preference p.second").addClass("appear");
				$("nav#route-choice").addClass("appear");
			}
			$("nav#route-choice").addClass("appear");
			$(".tour-guide nav#preference button").hide();
			event.preventDefault();	
		})



		$(".tour-guide nav#route-choice button").click(function(event){
			let userroute = $("select[name='route-choice']").val();
			console.log(userroute);
			if (userroute == 1){
				$("nav#route-choice p.first").addClass("appear");
				$("nav#route-choice").addClass("appear");
			}

			else if (userroute == 2){
				$("nav#route-choice p.second").addClass("appear");
				$("nav#route-choice").addClass("appear");
			}	

			else if (userroute == 3){
				$("nav#route-choice p.third").addClass("appear");
				$("nav#route-choice").addClass("appear");	
			}

			$(".tour-guide nav#route-choice + button").addClass("appear");
			$(".tour-guide nav#route-choice  button").hide();
			event.preventDefault();
		})

		$(".tour-guide nav#route-choice + button").click(function(event){
			if (userpreference == 1) {
				$(".tour-guide nav#personalise").addClass("appear");
				$("nav#personalise p.first").addClass("appear");
			}
			
			else if(userpreference == 2) {
				$(".tour-guide nav#personalise").addClass("appear");
				$("nav#personalise p.second").addClass("appear");
			}

			$(".tour-guide nav:last-child").addClass("appear");	
			$(".tour-guide nav#route-choice + button").hide();
		})

	};
    

})





