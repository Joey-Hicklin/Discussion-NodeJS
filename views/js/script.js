var $;
require("jsdom").env("", function(err, window) {
	if (err) {
		console.error(err);
		return;
	}
	$ = require("jquery")(window);
	doSomething();
});

function statementRatingChange(ratingReturn, elementID, which){
	$('#'+elementID).find('.statementRating:nth-child('+which+')').css({
		"height":((ratingReturn[which]/ratingReturn[0])*100)+'%'
	});
}

function postRatingChange(ratingReturn, elementID, which){
	$('#'+elementID).find('.postRating:nth-child('+which+')').css({
		"width":((ratingReturn[which]/ratingReturn[0])*100)+'%'
	});
}

function ratingDisplay(type, ID, f){
	// send each ID, wether for STATEMENT or POST
	// get back number of total ratings, number of G, B and R
	var jqxhr = $.ajax({
		url: "ratingDisplay.php",
		method: 'POST',
		data: {
			'type':type,
			'id':ID
		}
	}).done(function(a,success){
		f(a);
	});
}

function viewDisplay(a){
	$('#view_content').html(a);
	$('.post').find('.statementContent:first').css("border-top","0.2vw solid black");
	$('.post').find(".statementContent:last").css("border-bottom","0.2vw solid black");
	$('.post').find('.statement:last').css({
		"margin-bottom":"0.8vw",
		"border-bottom":"none"
	});

	/////////////////////////////////   RATING CHARTS   ///////////////////////////////////////

	$('.statement').each(function(index, el) {
		ratingDisplay("STATEMENT", $(this).find('.statementID').html(), function(a){
			if (a.charAt(0) != "0"){
				ratingReturn = a.split("!");
				var element = $('.statement:eq('+index+')');
				element.find('.statementRatingBox').removeClass('noRating');

				element.find('.statementRating:nth-child(1)').css({
					"height":((ratingReturn[1]/ratingReturn[0])*100).toString()+"%"
				});
				element.find('.statementRating:nth-child(2)').css({
					"height":((ratingReturn[2]/ratingReturn[0])*100).toString()+"%"
				});
				element.find('.statementRating:nth-child(3)').css({
					"height":((ratingReturn[3]/ratingReturn[0])*100).toString()+"%"
				});
			}
		})
	});

	$('.post').each(function(index, el) {

		ratingDisplay("POST", $(this).find('.postID').html(), function(a){
			if (a.charAt(0) != "0"){
				ratingReturn = a.split("!");
				var element = $('.post:eq('+index+')');
				element.find('.postRatingBox').removeClass('noRating');

				element.find('.postRating:nth-child(1)').css({
					"width":((ratingReturn[1]/ratingReturn[0])*100).toString()+"%"
				});
				element.find('.postRating:nth-child(2)').css({
					"width":((ratingReturn[2]/ratingReturn[0])*100).toString()+"%"
				});
				element.find('.postRating:nth-child(3)').css({
					"width":((ratingReturn[3]/ratingReturn[0])*100).toString()+"%"
				});
			}
		})

		 ////////////////////////   POST SLIDE DISPLAY   ////////////////////////

		$(this).contents('.statement').not(':first').hide();

		if ($(this).contents('.statement').length > 1){

			$(this).contents('.postReadMore').click(function(event) {
				parental = $(this).offsetParent('.post');
				parental.contents('.statement').slideDown(1000);
				parental.contents('.postRatingBox').animate({"margin-top": "1vw",}, 500, function() {
					parental.contents('.postButton').css({
						display: 'inline-block',
						opacity: '0'
					});
					parental.contents('.postReadMore').fadeOut(500);
					parental.contents('.postButton').animate({opacity:"1"}, 500);
				});
			});
		} else{
			$(this).contents('.postReadMore').hide();
			$(this).contents('.postRatingBox').hide();
		}
	});
} // viewDisplay function

function grabSidebarValues(){
	view = ($('#sidebarView').val());  ///// set variables for sidebar selections
 	viewIn = ($('#sidebarIn').val()); /////
 	sortA = ($('#sortAmount').val()); /////
 	displayN = ($('#displayNum').val()); //
 	return {
 		"view":view,
 		"viewIn":viewIn,
 		"sortA":sortA,
 		"displayN":displayN
 	}
} // grabSidebarValues function

function A(loggedIn){
	animateStarted = false;
	a = Date.now()+11000;
	postInterval = setInterval(function(){setPostTimer(animateStarted, loggedIn, a, '.postTimer', "POST!")},1000);
	$('.postTimer').css("color","rgba(255,0,0,1)").removeClass('postTimerReady');
	return "Starting Timer Manually";
} // A() manual timer function

function B(loggedIn){
	animateStarted = false;
	a = Date.now()+11000;
	postInterval = setInterval(function(){setPostTimer(animateStarted, loggedIn, a, '.mainTopicTimer', "MAIN!")},1000);
	$('.mainTopicTimer').css("color","rgba(255,0,0,1)").removeClass('postTimerReady');
	return "Starting Timer Manually";
} // B() manual timer function

Number.prototype.pad = function(n) {
    return new Array(n).join('0').slice((n || 2) * -1) + this;
} // timer padding function

function htmlspecialchars(str) {
  return str.replace('&', '&amp;').replace('"', '&quot;').replace("'", '&#039;').replace('<', '&lt;').replace('>', '&gt;');
} // HTML special chars function

function getData(callback){
	var jqxhr = $.ajax({
		url: "api.php",
		method: 'GET',
		dataType: 'JSON'
	}).done(function(a,success){
		console.log(a);
		callback(a);
	}) // end of .done function
	.fail(function(a){ // getData error reporting
		console.log("error");
		console.log(a);
	});
} // getData function

function animateTimer(newHTML, element){
	console.log("animated started");
	$(element).animate({
		"color":"rgba(255,0,0,0.2)"
	},4000,function() {
		setTimeout(function(){
			$(element).addClass('postTimerReady');
			$(element).html(newHTML);
			console.log("animated!");
		},1000)
	});
} // animate timer function

function setPostTimer(animateStarted, loggedIn, time, element, Html){
	var lastAct = time - Date.now();

	if (loggedIn == 1 && lastAct > 1){
		
		if (((lastAct/1000) % 60) < 5.0000001 && ((lastAct/1000/60) << 0) < 1){
			if (animateStarted == false){
				window.animateStarted = true;
				animateTimer(Html, element);
			}
		}

		if (element == '.mainTopicTimer'){
			if (((lastAct/1000/60/60) << 0) < 10){
				hr = String((Math.round((lastAct/1000/60/60) << 0)).pad(2));
				
			} else{
				hr = String((Math.round((lastAct/1000/60/60) << 0)));
				
			}
			if (((lastAct/1000/60 << 0) % 60) < 10){
				min = String(((lastAct/1000/60 << 0) % 60).pad(2));
				
			} else{
				min = String(((lastAct/1000/60 << 0) % 60));
				
			}
		} else{
			if ((lastAct/1000/60 << 0) < 10){
				min = String((lastAct/1000/60 << 0).pad(2));
				
			} else{
				min = String((lastAct/1000/60 << 0));
				
			}
		}

		if (((lastAct/1000) % 60) < 10){
			sec = String((Math.round((lastAct/1000) % 60)).pad(2));
			
		} else{
			sec = String((Math.round((lastAct/1000) % 60)));
			
		}

		if (element == '.mainTopicTimer'){
			$(element).removeClass('postTimerReady');
			$(element).html(hr+":"+min+":"+sec);
			$('body').fadeIn(500);
		} else{
			$(element).removeClass('postTimerReady');
			$(element).html(min+":"+sec);
			$('body').fadeIn(500);
		}

	} else if (loggedIn == 1) {
		
		if (typeof postInterval !== 'undefined'){
			window.clearInterval(postInterval);
			animateStarted = false;
			
			// set html to "Respond Ready!"
			// add class that gives new style
		}
		console.log("Post timer is up!");
	} else{
		
	}
} // setPostTimer function

function menuToggle(e, f) {	// declare your click variable and its class-swapping parent
	$(e).on('click', function(g) {	// when the click variable is clicked... 
		//g.preventDefault();	// if it's an anchor element, prevent default behavior (e.g., don't go to the href)
		var span = $(this);	// this is the click variable
			spanParent = span.closest(f);	// this is the closest (hierarchical) class-swapping parent
		if (spanParent.hasClass('inactive')) {	// if the parent HAS the 'active' class when the click variable is clicked...
			spanParent.removeClass('inactive');	// remove the 'active' class from the parent
			spanParent.animate({
				"left": "0vw"
			});
			$('.sidebarTab').css({
				"transform":"translateY(-50%) rotate(0deg)",
				"right":"-2.5vw"
			});
			$('.post').animate({"left":"58%"});
		} else {	// otherwise, if the parent does NOT have the 'active' class when the click variable is clicked...
			spanParent.animate({
				"left": "-15.1vw"
			});
			spanParent.addClass('inactive');	// add the 'active' class to the parent
			$('.sidebarTab').css({
				"transform":"translateY(-50%) rotate(180deg)",
				"right":"-3vw"
			});
			$('.post').animate({"left":"50%"});
		}
	});
} // jQuery function Menu Toggle

function sendViewData(view, viewIn, sortA, displayN, layerType, layerID, f){
	layerType = layerType || "N"; // "POST" for post, "STATEMENT" for statement, "N" for neither
	layerID = layerID || "N"; // "N" if ID is not set
	var jqxhr = $.ajax({
		url: "view_content.php",
		method: 'POST',
		data: {'V':view,'VI':viewIn,'S':sortA,'D':displayN,'LT':layerType,'LID':layerID}
	}).done(function(a,success){
		f(a);
	});
} // sendViewData function

function sendPostData(postContent){
	var jqxhr = $.ajax({
		url: "newPost.php",
		method: 'POST',
		data: {"postContent":postContent}
	}).done(function(data,success){
		console.log(data);
		window.onbeforeunload = null;
		switch (rT){
			case 'mT':
				window.location = "main_topic.php";
				break;
			case 'P':
				window.location = "main_topic.php";

				// revert page back to previous view state (http://bit.ly/1TciLg3)
				// use pushState() ---- (http://bit.ly/27n1U0p)
				// possibly send ?hash? data through GET statement

				// When a human writes code, they are inscribing their intelligence into a machine.

				// rewrite all view processes through GET statements, resending the page info

				break;
			case 'S':
				window.location = "main_topic.php";
				break;
		}
	});
} // sendPostData() function

function sendSignUpData(signEmail, signPass, signPassVerify){
	var jqxhr = $.ajax({
		url: "sign_up.php",
		method: 'POST',
		data: {
			"email":signEmail,
			"password":signPass,
			"verifyPassword":signPassVerify
		}
	}).done(function(data,success){
		console.log(data);
		if (data.indexOf("exists") > -1){
			$('.signErrorEmail').html('That email is already signed up, try logging in').show();
		} else{
			$('.signErrorEmail').hide();
		}
		if (data.indexOf("passMatch") > -1) {
			$('.signErrorPass').html('Your passwords don\'t match');
		} else{
			$('.signErrorPass').hide();
		}
		if (data.indexOf("success") > -1){
			console.log("sign success!");
			sendLogInData(signEmail, signPass);
		}
	});
} // sendSignUpData() function

function sendLogInData(email, pass){
	var jqxhr = $.ajax({
		url: "login.php",
		method: 'POST',
		data: {
			"email":email,
			"password":pass
		}
	}).done(function(data,success){
		console.log(data);
		if (data.indexOf("success") > -1){
			location.reload();
		} else if (data.indexOf("passWrong") > -1){
			$('.loginError').html("That password doesn\'t match the password we have for that email").show();
		}
	});
} // sendLogInData() function

function sendRateData(typeShort, clickID, affiliation, callback){
	var jqxhr = $.ajax({
		url: "rate.php",
		method: 'POST',
		data: {
			"type":typeShort,
			"id":clickID,
			"rating":affiliation
		}
	}).done(function(data,success){
		if (affiliation == "3"){
			switch (data){
				case "0":
				$('.neutralButton').addClass('greyButton');
				$('.disagreeButton').addClass('greyButton');
				break;

				case "1":
				$('.agreeButton').addClass('greyButton');
				$('.disagreeButton').addClass('greyButton');
				break;

				case "2":
				$('.neutralButton').addClass('greyButton');
				$('.agreeButton').addClass('greyButton');
				break;
			}
    		$('.respondBlackout').show();
		} else{
			switch (affiliation){
				case "0":
				$('.agreeButton').removeClass('greyButton');
				$('.neutralButton').addClass('greyButton');
				$('.disagreeButton').addClass('greyButton');
				break;

				case "1":
				$('.agreeButton').addClass('greyButton');
				$('.neutralButton').removeClass('greyButton');
				$('.disagreeButton').addClass('greyButton');
				break;

				case "2":
				$('.agreeButton').addClass('greyButton');
				$('.neutralButton').addClass('greyButton');
				$('.disagreeButton').removeClass('greyButton');
				break;
			}
			callback(data);
		}
	});
} // sendRateData() function

function viewLayer(type, clickID, viewIn){
	$('.blackout').hide();

	sV = grabSidebarValues();
	nL = $('.originalLayer').clone(true, true);
	nL.html($('.layerButton').length);
	nL.removeClass('originalLayer');
	$('.layerButton:last').after(nL);

	layerObjects.push( {"layerID":clickID, "layerContent":$('.respondTopic').html(), "layerType":type} );

	sendViewData(sV.view, viewIn, sV.sortA, sV.displayN, type, clickID, function(a){
		viewDisplay(a);
		threeButtons('.postRespondButton');
	    threeButtons('.postRateButton');
	    threeButtons('.postViewButton');
	    threeButtons('.statementRespondButton');
	    threeButtons('.statementRateButton');
	    threeButtons('.statementViewButton');
	});
} // viewLayer function

function viewNum(sqlLayerType, clickID, affiliation){
	$.ajax({
		url: 'viewNum.php',
		type: 'POST',
		dataType: 'JSON',
		data: {
			"type": sqlLayerType,
			"id": clickID,
			"aff": affiliation
		}
	})
	.done(function(data, success) {
		switch(affiliation){
			case 0:
			$('.viewNumA').html(data);
			break;

			case 1:
			$('.viewNumN').html(data);
			break;

			case 2:
			$('.viewNumD').html(data);
			break;
		}
	});
} // viewNum function

function threeButtons(clickedButton){
    	$(clickedButton).click(function(event) {
    		element = $(this);

    		if (clickedButton.search("post") > -1){ //-----------------// get type
    			type = clickedButton.substring(1,5); //               /
    		} else if (clickedButton.search("statement") > -1){ //   /
    			type = clickedButton.substring(1,10); //            /
    		}

	    	clickID = $(this).closest("."+type).find("."+type+"ID").html(); // get the ID of the clicked element

	    	if (clickedButton.search("Respond") > -1){ //--------------------// set words for title and buttons
	    		if (loggedIn == 1){
	    			if (lastPostTime-Date.now()+(15*60*1000) < 0.998){
		    			$('.viewNum').hide();
		    			$('.respondBox span').html("Respond In:"); //               /
		    			$('.agreeButton .threeButtonText').html("AGREEMENT"); //                    /
		    			$('.neutralButton .threeButtonText').html("NEUTRALITY"); //                /
		    			$('.disagreeButton .threeButtonText').html("DISAGREEMENT"); //            /
		    			$('.respondBlackout').show();
		    			$('.respondBlackout').find('.respondTopic').html(""); // clear the topic content
		    		} else {
		    			alert ("Please wait for the Post Timer to finish. That's the middle timer in the toolbar.");
		    		}
	    		} else{
	    			$('.loginBlackout').show();
	    		}

    		} else if (clickedButton.search("View") > -1){ //             /
    			$('.respondBox span').html("View Responses In:"); //     /
    			$('.agreeButton .threeButtonText').html("AGREEMENT"); //                /
    			$('.neutralButton .threeButtonText').html("NEUTRALITY"); //            /
    			$('.disagreeButton .threeButtonText').html("DISAGREEMENT"); //        /

    			if (type == "post"){
		 			sqlLayerType = "POST";
		 		} else if (type == "statement"){
		 			sqlLayerType = "STATEMENT";
		 		}
		 		
	    		viewNum(sqlLayerType, clickID, 0);
	    		viewNum(sqlLayerType, clickID, 1);
	    		viewNum(sqlLayerType, clickID, 2);

	    		$('.viewNum').css("display","inline-block");
	    		$('.respondBlackout').show();
	    		$('.respondBlackout').find('.respondTopic').html(""); // clear the topic content
    			
    		} else if (clickedButton.search("Rate") > -1){
    			lastRateCheck = lastRateTime-Date.now()+(2*60*1000);

    			if (lastRateCheck > 0.998){
    				alert("Please wait until the RATE timer has finished before rating something else. That\'s the right-most timer in the upper left corner of the toolbar.");
    			} else{
    				if (type == "post"){
			 			sqlLayerType = "POST";
			 		} else if (type == "statement"){
			 			sqlLayerType = "STATEMENT";
			 		}

			 		elementID = element.closest('.'+type).attr('id');

			 		$('.viewNum').hide();
					$('.respondBox span').html("This "+type.charAt(0).toUpperCase()+type.slice(1)+" is:");
					$('.agreeButton .threeButtonText').html("WELL SPOKEN");
					$('.neutralButton .threeButtonText').html("NOT HELPFUL");
					$('.disagreeButton .threeButtonText').html("RUDE/INSULTING");
		    		$('.respondBlackout').find('.respondTopic').html(""); // clear the topic content
			 		sendRateData(sqlLayerType, clickID, "3", function(a){});
    			}
    		}

	    	if (type == "post"){
	    		$(this).closest('.post').find('.statement').each(function(index, el) {
		    		$('<p>').html($(this).find('.statementContent span').html()).appendTo($('.respondBlackout').find('.respondTopic'));
		    	});
		    	typeShort = "P";
	    	} else{
	    		$('.respondBlackout').find('.respondTopic').html($(this).closest('.statementContentBox').find('.statementContent span').html());
	    		typeShort = "S";
	    	}

	    	$('.respondTopic').css({
	    		"font-size": '2.5vw'
	    	});

	    	///////////////////////////////////////////////   CLICK STATES   ////////////////////////////////////


	    	$('.agreeButton').off("click");
	    	$('.agreeButton').click(function(event) { //--------------------------------// GREEN BUTTON CLICK

	    		if (clickedButton.search("Respond") > -1){
	    			if (lastPostTime-Date.now()+(15*60*1000) < 0.998){
	    				window.location = 'respond.php?rS=0&rT='+typeShort+'&id='+clickID;
	    			} else{
	    				alert ("Please wait for the Post Timer to finish. That's the middle timer in the toolbar.");
	    			}

	    		} else if (clickedButton.search("View") > -1){
	    			viewIn = 0;
	    			viewLayer(type, clickID, viewIn);
	    			$('#sidebarIn option').removeAttr('selected');
	    			$('#sidebarIn option:nth-child(1)').attr('selected', 'selected');

	    		} else if (clickedButton.search("Rate") > -1){
	    			sendRateData(sqlLayerType, clickID, "0", function(a){
	    				ratingDisplay(sqlLayerType, clickID, function(a){
	    					
	    					if (a.charAt(0) != "0"){
								ratingReturn = a.split("!");
								$('#'+elementID).find('.'+type+"RatingBox").removeClass('noRating');

								lastRateTime = Date.parse(ratingReturn[4]);
		    					lastRate = lastRateTime+(2*60*1000);
								animateStarted = false;
								postInterval = setInterval(function(){setPostTimer(animateStarted, loggedIn, lastRate, '.rateTimer', "RATE!")},1000);
								$('.rateTimer').css("color","rgba(255,0,0,1)");

								if (type == 'statement'){
									statementRatingChange(ratingReturn, elementID, 1);
									statementRatingChange(ratingReturn, elementID, 2);
									statementRatingChange(ratingReturn, elementID, 3);
								} else{
									postRatingChange(ratingReturn, elementID, 1);
									postRatingChange(ratingReturn, elementID, 2);
									postRatingChange(ratingReturn, elementID, 3);
								}
							}
						});
	    			});
	    		}
	    	});

	    	$('.neutralButton').off("click");
	    	$('.neutralButton').click(function(event) { //--------------------------------// BLUE BUTTON CLICK

	    		if (clickedButton.search("Respond") > -1){
	    			if (lastPostTime-Date.now()+(15*60*1000) < 0.998){
	    				window.location = 'respond.php?rS=1&rT='+typeShort+'&id='+clickID;
	    			} else{
	    				alert ("Please wait for the Post Timer to finish. That's the middle timer in the toolbar.");
	    			}

	    		} else if (clickedButton.search("View") > -1){
	    			viewIn = 1;
	    			viewLayer(type, clickID, viewIn);
	    			$('#sidebarIn option').removeAttr('selected');
	    			$('#sidebarIn option:nth-child(2)').attr('selected', 'selected');

	    		} else if (clickedButton.search("Rate") > -1){
	    			sendRateData(sqlLayerType, clickID, "1", function(a){
	    				ratingDisplay(sqlLayerType, clickID, function(a){
							if (a.charAt(0) != "0"){
								ratingReturn = a.split("!");
								$('#'+elementID).find('.'+type+"RatingBox").removeClass('noRating');

								lastRateTime = Date.parse(ratingReturn[4]);
		    					lastRate = lastRateTime+(2*60*1000);
								animateStarted = false;
								postInterval = setInterval(function(){setPostTimer(animateStarted, loggedIn, lastRate, '.rateTimer', "RATE!")},1000);

								if (type == 'statement'){
									statementRatingChange(ratingReturn, elementID, 1);
									statementRatingChange(ratingReturn, elementID, 2);
									statementRatingChange(ratingReturn, elementID, 3);
								} else{
									postRatingChange(ratingReturn, elementID, 1);
									postRatingChange(ratingReturn, elementID, 2);
									postRatingChange(ratingReturn, elementID, 3);
								}
							}
						});
	    			});
	    		}
	    	});

	    	$('.disagreeButton').off("click");
	    	$('.disagreeButton').click(function(event) { //--------------------------------// RED BUTTON CLICK

	    		if (clickedButton.search("Respond") > -1){
	    			if (lastPostTime-Date.now()+(15*60*1000) < 0.998){
	    				window.location = 'respond.php?rS=2&rT='+typeShort+'&id='+clickID;
	    			} else{
	    				alert ("Please wait for the Post Timer to finish. That's the middle timer in the toolbar.");
	    			}

	    		} else if (clickedButton.search("View") > -1){
	    			viewIn = 2;
	    			viewLayer(type, clickID, viewIn);
	    			$('#sidebarIn option').removeAttr('selected');
	    			$('#sidebarIn option:nth-child(3)').attr('selected', 'selected');

	    		} else if (clickedButton.search("Rate") > -1){
	    			sendRateData(sqlLayerType, clickID, "2", function(a){
	    				ratingDisplay(sqlLayerType, clickID, function(a){
							if (a.charAt(0) != "0"){
								ratingReturn = a.split("!");
								$('#'+elementID).find('.'+type+"RatingBox").removeClass('noRating');

								lastRateTime = Date.parse(ratingReturn[4]);
		    					lastRate = lastRateTime+(2*60*1000);
								animateStarted = false;
								postInterval = setInterval(function(){setPostTimer(animateStarted, loggedIn, lastRate, '.rateTimer', "RATE!")},1000);

								if (type == 'statement'){
									statementRatingChange(ratingReturn, elementID, 1);
									statementRatingChange(ratingReturn, elementID, 2);
									statementRatingChange(ratingReturn, elementID, 3);
								} else{
									postRatingChange(ratingReturn, elementID, 1);
									postRatingChange(ratingReturn, elementID, 2);
									postRatingChange(ratingReturn, elementID, 3);
								}
							}
						});
	    			});
	    		}
	    	});
	    });
    } // threeButtons function

function checkLayerButtons(element){ // check for first or last layer
	if (element == 1){
		$('.layerNavPrev').hide();
	} else{
		$('.layerNavPrev').show();
	}
	if (element == ($('.layerButton').length - 1)) {
		$('.layerNavNext').hide();
	} else{
		$('.layerNavNext').show();
	}
} // checkLayerButtons function


////////////////////////////////////////////////////////   DOCUMENT READY   /////////////////////////////////////////////////////

$(document).ready(function(){

 	getData(function(a){

		loggedIn = a.login;

		if (loggedIn == 1){
			timerReady = 0;

			if (a.lastMain == ''){
				lastMainTime = 0; // allow posting, should user have never posted before
			} else{
				lastMainTime = Date.parse(a.lastMain);
				// console.log(lastMainTime);
			}

			if (a.lastPost == ''){
				lastPostTime = 0;
			} else{
				lastPostTime = Date.parse(a.lastPost);
			}

			if (a.lastRate == ''){
				lastRateTime = 0;
			} else{
				lastRateTime = Date.parse(a.lastRate);
			}
			
			lastPostCheck = lastPostTime-Date.now()+(15*60*1000); // switch "15" for algorithm to check acceptance rate
			lastMainCheck = lastMainTime-Date.now()+(48*60*60*1000);
			lastRateCheck = lastRateTime-Date.now()+(2*60*1000);

			$('.tls').hide()
			$('.signUpButton').hide();
			$('.logInButton').hide();
			$('.mainRespondButton').click(function(event) {

				if (lastMainCheck < 0.998 && lastPostCheck < 0.998){
					$('.respondBlackout').show();
					$('.respondBlackout').find('.respondTopic').html($('.mainTopicFront').html());
					$('.agreeButton').click(function(event) {
			    		window.location = 'respond.php?rS=0&rT=mT';
			    	});
			    	$('.neutralButton').click(function(event) {
			    		window.location = 'respond.php?rS=1&rT=mT';
			    	});
			    	$('.disagreeButton').click(function(event) {
			    		window.location = 'respond.php?rS=2&rT=mT';
			    	});
				} else {
					alert("You need to wait until your Main Topic Timer has run down. That's the timer all the way to your left, up in the toolbar.");
				}
			});

			if (lastPostCheck > 0.998){
				lastPost = lastPostTime+(15*60*1000); // switch "15" for algorithm to check acceptance rate
				animateStarted = false;
				postInterval = setInterval(function(){setPostTimer(animateStarted, loggedIn, lastPost, '.postTimer', "2")},1000);

			} else {
				$('.postTimer').addClass('postTimerReady').html("2");
				timerReady++;
			}

			if (lastMainCheck > 0.998){
				lastMain = lastMainTime+(48*60*60*1000);
				animateStarted = false;
				postInterval = setInterval(function(){setPostTimer(animateStarted, loggedIn, lastMain, '.mainTopicTimer', "1")},1000);

			} else {
				$('.mainTopicTimer').addClass('postTimerReady').html("1");
				timerReady++;
			}

			if (lastRateCheck > 0.998){
				lastRate = lastRateTime+(2*60*1000);
				animateStarted = false;
				postInterval = setInterval(function(){setPostTimer(animateStarted, loggedIn, lastRate, '.rateTimer', "3")},1000);

			} else {
				$('.rateTimer').addClass('postTimerReady').html("3");
				timerReady++;
			}
		} else{
			$('.timer').hide();
			$('.logOutButton').hide();
			$('.mainRespondButton').click(function(event) {
				$('.loginBlackout').show();
			});
			$('.statementRespondButton').click(function(event) {
				$('.loginBlackout').show();
			});
			$('.postRespondButton').click(function(event) {
				$('.loginBlackout').show();
			});
			$('body').fadeIn(700);
		}
		if (timerReady == 3){
			$('body').fadeIn(700);
		}
		
		if (window.location.pathname.indexOf("respond")>-1){ // if on respond page, retrieve data from GET  ----// node

			rT = a.rT; // rT = Response Type (Main Topic, Post or Statement)
			rS = a.rS; // rS = Response Style (Agree, Neutral, Disagree)
			ID = a.id; // ID of content being responded to

			window.onbeforeunload = function(){ return 'YOU WILL LOSE ALL INFORMATION YOU HAVE ENTERED!' };
			
			switch(rT){
				case "mT":
					$('.viewTopic').css({
						"font-size":"7vw",
						"text-align":"center"
					});
					break;
				case "P":
					break;
				case "S":
					$('.viewTopic').css({
						"text-align":"center"
					});
					break;
			}
		}

		return loggedIn, lastMainTime, lastPostTime;
	}); // getData()

	menuToggle($('.sidebarTab'),$('.sidebarBox'));

	layerObjects = [0];

	$('.logOutButton').click(function(event) {
 		window.location = "logout.php";
 	});

 	$('.respondBlackout').click(function(event) {
 		$('.agreeButton').removeClass('greyButton');
 		$('.neutralButton').removeClass('greyButton');
 		$('.disagreeButton').removeClass('greyButton');
 	});

 	$('.toolbarSignUp').click(function(event) {
 		$('.blackout').hide();
 		$('.signUpBlackout').show();
 	});

 	$('#loginSubmit').click(function(event) {
 		sendLogInData($('#loginEmail').val(), $('#loginPass').val());
 	});


 	////////////////////////   SIGN UP   ///////////////////////////////

 	$('#signPassVerify').keyup(function(event) {
 		if ($(this).val() == $('#signPass').val()){
 			$('.signErrorPass').hide();
 		} else{
 			$('.signErrorPass').html('Your passwords don\'t match').show();
 		}
 	});

 	$('#signEmail').focusout(function(event) {
 		signEmail = $('#signEmail').val();
 		sendSignUpData(signEmail, "!", "?");
 	});

 	$('.signUpSubmit').click(function(event) {
 		signEmail = $('#signEmail').val();
 		signPass = $('#signPass').val();
 		signPassVerify = $('#signPassVerify').val();
 		if (signEmail.indexOf("@") > -1){
 			sendSignUpData(signEmail, signPass, signPassVerify);
 		} else{
 			$('.signErrorEmail').html("Please enter a valid email address").show();
 		}
 	});

 	//------------------------------------------------------------------//

	if (window.location.pathname.indexOf("view")>-1){
		$('#mainLayer').css('display', 'inline-block');
		$('#mainLayer').click(function(event) {
			window.location = "main_topic.php";
		});
	} // various
	
	sendViewData("P", "0", "H", "5", "N", "N", function(a){
		viewDisplay(a);
		threeButtons('.postRespondButton');
	    threeButtons('.postRateButton');
	    threeButtons('.postViewButton');
	    threeButtons('.statementRespondButton');
	    threeButtons('.statementRateButton');
	    threeButtons('.statementViewButton');
	}); // sendViewData() DEFAULT

 	$('.layerButton').click(function(event) {
 		thisLayerText = parseInt($(this).text());
 		$('.layerBlackout .layerContent').html(layerObjects[thisLayerText].layerContent);

 		checkLayerButtons(thisLayerText);

 		$('.layerBlackout').show();
 	});

 	$('.layerNavGo').click(function(event) {
 		sV = grabSidebarValues(); // associate the values of selections in the sidebar to an object in variable "sV"

		sendViewData(view, viewIn, sortA, displayN, layerObjects[thisLayerText].layerType, layerObjects[thisLayerText].layerID, function(a){
			viewDisplay(a);
			threeButtons('.postRespondButton');
		    threeButtons('.postRateButton');
		    threeButtons('.postViewButton');
		    threeButtons('.statementRespondButton');
		    threeButtons('.statementRateButton');
		    threeButtons('.statementViewButton');
		});
		removeCount = $('.layerButton').length;
		for (var i = thisLayerText+1; i < removeCount; i++) {
			console.log(i);
			$('.layerButton:last').remove();
		}
		spliceNum1 = thisLayerText+1;
		spliceNum2 = layerObjects.length-thisLayerText+1;
		layerObjects.splice(spliceNum1,spliceNum2);
		$('.layerBlackout').hide();
	});

	$('.layerNavPrev').click(function(event) {
		thisLayerText-=1;
		$('.layerBlackout .layerContent').html(layerObjects[thisLayerText].layerContent);
		checkLayerButtons(thisLayerText);
	});
	$('.layerNavNext').click(function(event) {
		thisLayerText+=1;
		$('.layerBlackout .layerContent').html(layerObjects[thisLayerText].layerContent);
		checkLayerButtons(thisLayerText);
	});

 ////////////////////////////////   VIEW SIDEBAR   /////////////////////////////////////////

 	originalValues = grabSidebarValues();
 	reset = 0;

 	$('select').change(function(event) {

 		if (reset == 0){ // if this is the first change

 			reset = 1; // note that it is the first change
 			Rview = ($('#sidebarView').val()); ////// set reset return values
		 	RviewIn = ($('#sidebarIn').val()); /////
		 	RsortA = ($('#sortAmount').val()); /////
		 	RdisplayN = ($('#displayNum').val()); //
 		}

 		$('.sidebarShowing').hide(); // hide the display page results

 		$('.sidebarConfirmBox').show(); // show the 2 search buttons and 1 reset button
 	}); // unfinished reset mechanism


 	$('.sidebarConfirmCLButton').click(function(event) { // when user submits new search from sidebar...
	 	sV = grabSidebarValues();
	 	layerType = layerObjects[layerObjects.length-1].layerType; //
	 	layerID = layerObjects[layerObjects.length-1].layerID; //-//
	 	$('.sidebarConfirmBox').hide(); // hide 3 buttons
 		$('.sidebarShowing').show(); // show display page results
 		sendViewData(sV.view, sV.viewIn, sV.sortA, sV.displayN, layerType, layerID, function(a){
 			viewDisplay(a);
 			threeButtons('.postRespondButton');
		    threeButtons('.postRateButton');
		    threeButtons('.postViewButton');
		    threeButtons('.statementRespondButton');
		    threeButtons('.statementRateButton');
		    threeButtons('.statementViewButton');
 		}); // send query to PHP
 	});


 //-----------------------------------------------------   RESPOND PAGE   ---------------------------------------------------//


 ////////////////////////////////////   STATEMENT CLONER   ////////////////////////////////

 	$('.cloneButton').click(function(){ // When "Add another Statement" is clicked

 		if($('.statementInputBox').length < 5){ // if there are less than 5 statements

	 		$('.cloneBox').clone(true,true).insertAfter('.cloneBox'); // clone the last statement box

	 		$('.cloneButton').eq(0).removeClass('cloneButton').hide(); // clear "clone" classes from element that was just cloned
	 		$('.cloneBox').eq(0).removeClass('cloneBox'); //////////////
	 		$('.clone').eq(0).removeClass('clone');///////////////////

	 		$('.clone').val('').focus(); // Clear any text inside the latest statement entry and focus user in that box

	 		window.scrollTo(0,document.body.scrollHeight); // keep the page on the bottom of the screen, so the latest statement box doesn't appear below where the user sees
	 	}
	 	if($('.statementInputBox').length == 5){ // if this is the 5th statement
	 		$('.cloneButton').eq(0).removeClass('cloneButton').hide(); // remove the "clone" class and hide the last "add statement" button
	 	}
 	});
 	

 /////////////////////////   REVIEW RESPONSE STATEMENTS   ///////////////////////////////////

 	$('.reviewPostButton').click(function(event) { // when you click the "Review Post" button...

 		respondStatements = this.form.elements['statements[]']; // collect the info from all statement boxes and insert them into an array

 		$('.blackout').hide(); // close any open pop-ups
 		$('.reviewContent').html('').css({ // clear the display box and customize some css to give room for the text, and make it so the paragraphs are more readable
 			"font-size":"2vw",
 			"text-align":"left"
 		});

 		if (respondStatements.length == null){  // If there is only 1 statement, it is not an array
 			$('<p>').addClass('statementReview').append(htmlspecialchars(respondStatements.value)).appendTo('.reviewContent'); // create a paragraph element, give it a class, place the statement info inside the paragraph tag (ignoring html content) and put the now-filled paragraph inside the review area
 		} else {
 			for (var i = 0; i < respondStatements.length; i++) { // loop through statement boxes...
	 			$('<p>').addClass('statementReview').append(htmlspecialchars(respondStatements[i].value)).appendTo('.reviewContent'); // do the same as above
	 		}
 		}

 		$('.submitPost').css("display","inline-block"); // Show the submit button in the display box
 		$('.reviewContent').show(); // show the "review" display box
 		$('.viewTopic').hide(); // hide the "view topic" display box, if shown

 		$('.viewTopicBlackout').show(); // display "review" pop-up
 	});
 	$('.submitPost').click(function(event) { // when user submits post

 		var postContent = ""; // make a blank variable to populate with data
 		if (respondStatements.length == null){  // If there is only 1 statement, it is not an array
 			postContent = respondStatements.value;
 		} else {
	 		for (var i = 0; i < respondStatements.length; i++) {
	 			if (respondStatements[i].value.length !== 0){
	 				postContent = postContent.concat(respondStatements[i].value);

	 				postContent = postContent.concat("~^"); // use unused character combination to create delimiters for breaking the string up, once it is sent
 				}
	 		}
	 		postContent = postContent.substring(0, postContent.length-2); // Chop off the last ~^ delimiter
	 	}

 		sendPostData(postContent); // send the post to the server through newPost.php
 	});

 /////////////////////////////////////////   Click Hides   ////////////////////////////////////////////

	$('.optionsToolbar').click(function() {
		$('.blackout').hide();
		$('.optionBlackout').show();
	});
	$('.toolbarLogin').click(function(event) {
 		$('.blackout').hide();
 		$('.loginBlackout').show();
 	});
	$('.signUpButton').click(function(event) {
		$('.blackout').hide();
		$('.signUpBlackout').show();
	});
	$('.logInButton').click(function(event) {
		$('.blackout').hide();
		$('.loginBlackout').show();
	});
	$('.blackout').click(function(){
		$('.blackout').hide();
	});
	$('.respondSubjectButton').click(function(event) {
 		$('.blackout').hide();
 		$('.reviewContent').hide();
 		$('.submitPost').hide();
 		$('.viewTopic').show();
 		$('.viewTopicBlackout').show();
 	});
	

 //////////  Blackout Boxes stop propagations   ///////////////////

	$('.optionBox').click(function(event) {
		event.stopPropagation();
	});
	$('.loginBox').click(function(event) {
		event.stopPropagation();
	});
	$('.respondTopicBox').click(function(event) {
		event.stopPropagation();
	});
	$('.respondBox').click(function(event) {
		event.stopPropagation();
	});
	$('.viewTopicBox').click(function(event) {
		event.stopPropagation();
	});
	$('.layerBox').click(function(event) {
		event.stopPropagation();
	});
	$('.signUpForm').click(function(event) {
		event.stopPropagation();
	});	
}); // document ready end