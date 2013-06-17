"use strict";

$.fn.digits = function () {
    return this.each(function () {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    });
};

var toggleClosed = '<img src="/old/images/toggle_open.png" width="15" height="25">Open';
var toggleOpen = '<img src="/old/images/toggle_close.png" width="15" height="24">Close';
var tableCellHeightSetup = function () {
    $("tr.info_txt").each(function (i) {
        var that = $(this), rowHeight = parseInt(that.height(), 10), mod = (i % 2), tdCells = $(that.find("td div.tdCell")), tds;
        if (mod === 1) {
            tds = $(that.find("td"));
            tds.each(function () {
                var tdThat = $(this);
                tdThat.addClass("zebra_highlight");
            });
        }
        tdCells.each(function () {
            var tdCellThat = $(this),
                topPadding = parseInt(tdCellThat.css("padding-top"), 10),
                bottomPadding = parseInt(tdCellThat.css("padding-bottom"), 10),
                newHeight = rowHeight - topPadding - bottomPadding;
            tdCellThat.height(newHeight);
        });
    });
};
var homeClassZebraStripe = function () {
    $(".class_item").each(function (i) {
        var that = $(this), mod = (i % 2);
        if (mod === 1) {
            that.addClass("zebra_highlight");
        }
    });
};
// var footerLinkSetup = function () {
//     $("a.footer-social-links").each(function () {
//         var that = $(this);
//         // that.on("mouseover", function () {});
//     });

// };
var tempSubNav = "", tempOverNav = "", headerNavOut = function () {
    if (tempSubNav !== "") {
        tempSubNav.hide();
        tempSubNav = "";
    }
    if (tempOverNav !== "") {
       if(tempOverNav.attr('rel') !== "active"){
           tempOverNav.removeClass("active");
       } else {
           tempOverNav.removeAttr('rel');
       }
       tempOverNav = "";
    }
    $("#navOff").hide();
    $("#navOff").off("mouseover", headerNavOut);
};
var headerNavOver = function (e) {
    // deal with open subnav
    var that = e.target,
        par = $(that).parent(),
        subNav = $(par).find(".subNavBox");
    if (tempSubNav !== "" && tempSubNav !== $(subNav)) {
           tempSubNav.hide();
           tempSubNav = "";
           $("#navOff").hide();
           $("#navOff").off("mouseover", headerNavOut);
    }
    if (tempOverNav !== "" && tempOverNav !== $(that)) {
       if(tempOverNav.attr('rel') !== "active"){
           tempOverNav.removeClass("active");
       } else {
           tempOverNav.removeAttr('rel');
       }
       tempOverNav = "";
    }
    if (subNav.length > 0) {
        // add rollover functionality
        // that.on("mouseover", headerNavOver);
        if($(that).hasClass("active")){
            $(that).attr('rel', "active");
        }
        $(that).addClass("active");
        tempOverNav = $(that);
        tempSubNav = $(subNav);
        $(subNav).show();
        //get $(navOff).height -- make navOff that height
        // setMouseOut
        $("#navOff").css("height", $(subNav).height() + 131);
        $("#navOff").show();
        $("#navOff").on("mouseover", headerNavOut);
    }
};
var navSetup = function () {
    "use strict";
    $("header nav ul li a.topLink").each(function () {
        var that = $(this);
        // add rollover functionality
        that.on("mouseover", headerNavOver);
    });

};
var clientLogosCarousel = function () {
    // slider 1
    if($( '#slider1' )){
        $( '#slider1' ).lemmonSlider({
            infinite: true
        });
    }
    if($( '#slider2' )){
        $( '#slider2' ).lemmonSlider({
            infinite: false
        });
    }
};
var homeColumnSetup = function () {
    // cycle all home_col for max height
    var colHeight = 0;
    $(".home_col").each(function () {
        var that = $(this);
        // console.log(that.height());
        if(colHeight <= that.height()){
            colHeight = that.height();
        }
    });
    colHeight += 64;
    $("#home_recent_blog_posts").height(colHeight);
    $("#home_recent_blog_posts .sectionFooterBanner").width($("#home_recent_blog_posts").width() - 34);
    $("#home_recent_blog_posts .sectionFooterBanner").css({"left" : "17px"});
    $("#home_upcoming_classes").height(colHeight);
    $("#home_upcoming_classes .sectionFooterBanner").width($("#home_upcoming_classes").width() - 20);
    $("#home_upcoming_classes .sectionFooterBanner").css({"left" : "40px"});
    $("#home_twitter_box").height(colHeight-62);
    $(".home_twitter_after").css({
       "top": (colHeight-49) +"px"
    });
    $("#home_mid_title").css({
          "top": ($("#midSection").height() + 366) +"px"
       });
    $("#client_carousel").css({
             "top": ($("#midSection").height() + 366 + 102) +"px"
          });
    $(".home_twitter_after").show();
    // then cycle through individual columns and set height and banners
    var tempHeight = $("#main").height();
    if($("#home_mid_title").offset()){
        $("#main").height( tempHeight + $("#home_mid_title").offset().top);
    }

};

var clickToggle = function () {
    var that = $(this);
    var relAttr = that.attr("rel");
    var par = $(that.parent().parent());
    var tr = par.nextAll('tr');
    for (var i = 0; i < tr.length; i++) {
        var rel = $(tr[i]).attr('rel');
        if (rel === relAttr){
            var divs = $(tr[i]).find('div');
            for(var j = 0; j < divs.length; j++){
                if($(divs[j]).is(":hidden")){
                    $(divs[j]).slideDown();

                } else {
                    $(divs[j]).slideUp();
                }
            }
        }
    }
    if(that.data("state") === "closed"){
        that.data("state", "open");
        that.html(toggleOpen);
    } else {
        that.data("state", "closed");
        that.html(toggleClosed);
    }
};

var tableToggleSetup = function () {
    $(".toggleBTN").each(function () {
        var that = $(this);
        that.on("click", clickToggle);
        if(that.data("state") === "closed"){
            var relAttr = that.attr("rel");
            var par = $(that.parent().parent());
            var tr = par.nextAll('tr');
            for (var i = 0; i < tr.length; i++) {
                var rel = $(tr[i]).attr('rel');
                if (rel === relAttr){
                    var divs = $(tr[i]).find('div');
                    for(var j = 0; j < divs.length; j++){
                        $(divs[j]).hide();
                    }
                }
            }
        }
    });
};

var sidebarSetup = function () {

    if ($("#sidebar")) {
        var sidebar = $('#sidebar').outerHeight(true);

        //set variable to adjust leftArea div to match sidebar
        //get class name on each class landing page
        var txt = $('.iconTxt h5').text();
        //if class name === this, set new height to match sidebar
        if ( txt === 'Advanced Mac OS X' ) {
            $(".leftArea.heightFix").css("min-height", sidebar + 100);
        }
        else if ( txt === 'Beginning Cocoa' ){
            $(".leftArea.heightFix").css("min-height", sidebar + 300);
        }
        else if ( txt === 'Beginning iOS Commuter Class' || txt === 'Cocoa II' ) {
            $(".leftArea.heightFix").css("min-height", sidebar);
        }
        else if ( txt === 'Cocoa Commuter Class in Spanish' || txt === 'Django' || txt === 'Mobile Design - Corporate Training' ){
            $(".leftArea.heightFix").css("min-height", sidebar + 20);
        }
    }

    if($("#side_twitter_box")){
        var twitterHeight = $("#side_twitter_box").height();
        $(".side_twitter_after").css({
           "top": (twitterHeight + 20) +"px"
        });
        $(".side_twitter_after").show();
    }
};
var updateFacebookCount = function () {
    var facebookURL = "http://graph.facebook.com/bignerdranch/";
    var jqxhr = $.ajax({
        url: facebookURL,
        dataType: "json"
    });
    jqxhr.success(function (payload) {
        if (payload.hasOwnProperty("likes")) {
            $("#facebookCount").html(payload.likes);
            $("#facebookCount").digits();
        }
    });
};
var updateTweetCount = function () {
    var twitterURL = "https://api.twitter.com/1/users/show.json?screen_name=bignerdranch&callback=processTweetCount";
    $.ajax({
        url: twitterURL,
        dataType: "jsonp"
    });
};
var processTweetCount = function (payload) {
    if (payload.hasOwnProperty("followers_count")) {
        $("#twitterCount").html(payload.followers_count);
        $("#twitterCount").digits();
    }
};
var homePageCarousel = function () {
    if ($('#homeSlideShow.carousel').length > 0) {
        $('.carousel').carousel({
            interval: 5000
        });
    }
};
var innerPageCarousel = function () {
	if($('#topCarouselApp').length > 0 || $('#testimonialCarousel').length > 0 || $('#sidebarCarousel').length > 0) {
        $('.carousel#topCarouselApp, .carousel#testimonialCarousel, .carousel#sidebarCarousel').carousel({interval: 8000});
        if($("#carouselControlDots")) {
            $('#carouselControlDots a').each(function(i) {
                var that = $(this);
                that.on("click",function(e){
                    // console.log($(e.target).parent());
                    // var btn = $(e.target).parent();
                    e.preventDefault();
                    $('#topCarouselApp.carousel, #testimonialCarousel.carousel, #sidebarCarousel').carousel("pause");
                    $('.carousel').carousel(i);
                    $('.carousel').carousel("cycle");
                });
            });
            $('.carousel#topCarouselApp').on("slide", function (){
                // turn off active-dot
                $("#carouselControlDots a.active-dot").removeClass("active-dot");
            });
            $('.carousel#topCarouselApp').on("slid", function (){
                // get active carousel item
                // turn on new active dot
                $("#carouselControlDots a[data-discnumber='"+ $("#topCarouselSlides div.active").data("itemnum") +"']").addClass("active-dot");
            });
        }
    }
    if($('.carousel#topCarouselMini, .carousel#topCarousel').length > 0) {
       $('.carousel#topCarouselMini, .carousel#topCarousel').carousel({interval: 8000});
    }
};
var showAppOverview = function () {
	$(".appOverview").click(function(e){
		e.preventDefault();
		$('.appInfoOverview').show();
		$('.appInfoPress').hide();
	});
};
var showAppPress = function () {
	$(".appPress").click(function(e){
		e.preventDefault();
		$('.appInfoOverview').hide();
		$('.appInfoPress').show();
	});
};
var imageRollover = function () {
    $('.locationATL').mouseenter(function(){
        $('.locationImageATL').hide();
        $('.locationImageATL2').show();
    });
    $('.locationATL').mouseleave(function(){
        $('.locationImageATL').show();
        $('.locationImageATL2').hide();
    });
    $('.locationAmdam').mouseenter(function(){
        $('.locationImageAmdam').hide();
        $('.locationImageAmdam2').show();
    });
    $('.locationAmdam').mouseleave(function(){
        $('.locationImageAmdam').show();
        $('.locationImageAmdam2').hide();
    });
    $('.locationWest').mouseenter(function(){
        $('.locationImageWest').hide();
        $('.locationImageWest2').show();
    });
    $('.locationWest').mouseleave(function(){
        $('.locationImageWest').show();
        $('.locationImageWest2').hide();
    });
    $('.locationYour').mouseenter(function(){
        $('.locationImageYour').hide();
        $('.locationImageYour2').show();
    });
    $('.locationYour').mouseleave(function(){
        $('.locationImageYour').show();
        $('.locationImageYour2').hide();
    });

    //corporate training gift certificate image
    $('.give_nerdy_image').mouseenter(function(){
        $('.give_nerdy_normal').hide();
        $('.give_nerdy_rollover').show();
    });
    $('.give_nerdy_image').mouseleave(function(){
        $('.give_nerdy_normal').show();
        $('.give_nerdy_rollover').hide();
    });

};
var toggleNewsArrow = function () {
    $('.news_accordion_2013').on('click', function () {
        $('.newsYear13Arrow').toggle();
    });
    $('.news_accordion_2012').on('click', function () {
        $('.newsYear12Arrow').toggle();
    });
    $('.news_accordion_2011').on('click', function () {
        $('.newsYear11Arrow').toggle();
    });
};

var collapse = function () {
	if($('.collapse').length > 0){
		$('.collapse').collapse();
	}
},	submitForm = function () {
	$('#searchInputSubmit_side, #searchInputSubmit_side_sidebar').click( function(e){
		e.preventDefault();
		$('#mc-embedded-subscribe-form, #mc-embedded-subscribe-form_sidebar').submit();
	});

};

var //removes duplicate li in cocoa class listing page
	individualClassListingFix = function () {
	var demonstrateFluency = $("li:contains('Demonstrate fluency in Objective-C')");
	if($(demonstrateFluency)){
		$($(demonstrateFluency)[1]).hide();
	}

};
var //removes html5 fb button from ie7 and inserts <!-- <iframe> -->
	ie7FBFix = function () {
		if(!Modernizr.generatedcontent){
			var fb = $('.fbCodeContainer');
			$(fb).html('');
			$(fb).append('<iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fbignerdranch&amp;send=false&amp;layout=standard&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=35" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:35px;" allowTransparency="true"></iframe>');
		}
};
var renderBlogPost = function() {
	$.ajax({
		url: "/old/js/blog.xml",  // URLs should always be absolute
        type: 'post',
		dataType: 'xml'
	}).success(function(payload) {
		var stories = $(payload).find("item");
		var link1 = $($(stories[0]).find("link")[0]).text();
        var link2 = $($(stories[1]).find("link")[0]).text();

		var date1 = $($(stories[0]).find("pubDate")[0]).text();
        var date2 = $($(stories[1]).find("pubDate")[0]).text();

		var title1 = $($(stories[0]).find("title")[0]).text();
        var title2 = $($(stories[1]).find("title")[0]).text();

        var description1 = $($(stories[0]).find("description")[0]).text();
        var description2 = $($(stories[1]).find("description")[0]).text();

		var dateDisplayed1 = new Date(date1);
        var dateDisplayed2 = new Date(date2);

		$('.blog-brief.one a').attr("href", link1);  // you're only updating the attribute, not what goes inside the tag
        $('.blog-brief.two a').attr("href", link2);  // you're only updating the attribute, not what goes inside the tag

		$('.blog-brief.one .blog-title').text(title1);  // you're only updating the text inside the tag
        $('.blog-brief.two .blog-title').text(title2);  // you're only updating the text inside the tag

        $('.blog-brief.one .blog-txt').html(description1 + " [...continued]");  // you're only updating the text inside the tag
        $('.blog-brief.two .blog-txt').html(description2 + " [...continued]");  // you're only updating the text inside the tag

		$('.blog-brief.one .mon').text(moment(dateDisplayed1).format('MMM'));  // you're only updating the text inside the tag
        $('.blog-brief.two .mon').text(moment(dateDisplayed2).format('MMM'));  // you're only updating the text inside the tag

        $('.blog-brief.one .numberDay').text(moment(dateDisplayed1).format('d'));  // you're only updating the text inside the tag
        $('.blog-brief.two .numberDay').text(moment(dateDisplayed2).format('d'));  // you're only updating the text inside the tag

	});

};

var renderCareerOpenings = function (payload) {
    $.ajax({
        url: "https://api.resumatorapi.com/v1/jobs?apikey=tH0VrAqn9eL8HtSNvH5daq0RImO58F9x",  // URLs should always be absolute
        type: 'get',
        headers: null,
        dataType: 'json'
    }).success(function(payload) {
        var $current_openings = $('.current_openings');
        $(payload).each(function (i) {
            if (payload[i].status === 'Open') {
                // console.log(payload[i]);
                $current_openings.append('<a href="http://bignerdranch.theresumator.com/apply/' + payload[i].board_code + '" target="_blank" class="opening-title-link"><h6 class="opening-title">' + payload[i].title + '</h6></a>');
                $current_openings.append('<span><strong>Location: </strong>' + payload[i].country_id + '</span>');
                $current_openings.append('<span><strong>Department: </strong>' + payload[i].department + '</span>');
            };
        });
    });
};

var showContactInfo = function () {
	$('.officeInfoEU').click(function(e) {
		e.preventDefault();
		$('p.europeOffice, a.officeInfoUS').show();
		$('p.usOffice, a.officeInfoEU').hide();
	});
	$('.officeInfoUS').click(function(e) {
		e.preventDefault();
		$('p.europeOffice, a.officeInfoUS').hide();
		$('p.usOffice, a.officeInfoEU').show();
	});

};
var validateForm = function () {
	$("span.form_submit_yellow_btn a").click(function(event){
        $('.rounded_form').css('border', '1px solid #ccc');
		var firstName = $("input[name='firstName']").val();
			if (firstName === "") {
				event.preventDefault();
				$('#firstName').css('border', '1px solid #e8ae10');
			}
		var lastName = $("input[name='lastName']").val();
			if (lastName === "") {
				event.preventDefault();
				$('#lastName').css('border', '1px solid #e8ae10');
			}
		var company = $("input[name='company']").val();
			if (company === "") {
				event.preventDefault();
				$('#company').css('border', '1px solid #e8ae10');
			}
		var title = $("input[name='title']").val();
			if (title === "") {
				event.preventDefault();
				$('#title').css('border', '1px solid #e8ae10');
			}
		var email = $("input[name='email']").val();
			if (! validEmail(email)) {
				event.preventDefault();
				$('#email').css('border', '1px solid #e8ae10');
			}
		var phone = $("input[name='phone']").val();
			if (! validPhone(phone)) {
				event.preventDefault();
				$('#phone').css('border', '1px solid #e8ae10');
			}
		var address = $("textarea[name='address']").val();
			if (address === "") {
				event.preventDefault();
				$('#address').css('border', '1px solid #e8ae10');
			}
		var referral = $("select[name='onsite_lead_referral']").val();
			if (referral === "") {
				event.preventDefault();
				$('#referral').css('border', '1px solid #e8ae10');
			}
		var course = $("select[name='onsite_lead_offering_id']").val();
			if (course === "") {
				event.preventDefault();
				$('#course').css('border', '1px solid #e8ae10');
			}
		var custom = $("textarea[name='custom']").val();
			if (custom === "") {
				event.preventDefault();
				$('#custom').css('border', '1px solid #e8ae10');
			}
		var company2 = $("input[name='company2']").val();
			if (company2 === "") {
				event.preventDefault();
				$('#company2').css('border', '1px solid #e8ae10');
			}
		var city = $("input[name='city']").val();
			if (city === "") {
				event.preventDefault();
				$('#city').css('border', '1px solid #e8ae10');
			}
		var time = $("input[name='time']").val();
			if (time === "") {
				event.preventDefault();
				$('#time').css('border', '1px solid #e8ae10');
			}
		var firstName2 = $("input[name='firstName2']").val();
			if (firstName2 === "") {
				event.preventDefault();
				$('#firstName2').css('border', '1px solid #e8ae10');
			}
		var lastName2 = $("input[name='lastName2']").val();
			if (lastName2 === "") {
				event.preventDefault();
				$('#lastName2').css('border', '1px solid #e8ae10');
			}

		function validEmail(elementValue){
			var emailPattern = /^[a-zA-Z0-9.%+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
			return emailPattern.test(elementValue);
		}

		function validPhone(elementValue){
			var phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
			return phonePattern.test(elementValue);
		}
	});
};

jQuery("document").ready(function () {
	tableCellHeightSetup();
	homeClassZebraStripe();
	homeColumnSetup();
	navSetup();
	clientLogosCarousel();
	tableToggleSetup();
	sidebarSetup();
    validateForm();
    homePageCarousel();
    innerPageCarousel();
	showAppOverview();
	showAppPress();
	toggleNewsArrow();
    updateTweetCount();
    updateFacebookCount();
    imageRollover();
    collapse();
    submitForm();
    ie7FBFix();
    individualClassListingFix();
    renderBlogPost();
    showContactInfo();
    renderCareerOpenings();
});

function findNonReplyTweet(data) {

    if (!$.isArray(data)) {
        return null;
    }
    if (data.length === 0) {
        return null;
    }

    for (var i = 0; i < data.length; i++) {
        var tweet = data[i];
        var message = tweet.text;
        if (message.substr(0, 1) !== '@') {
            return tweet;
        }
    }
}

function linkify(inputText) {
	var replacedText, replacePattern1, replacePattern2, replacePattern3;

	//URLs starting with http://, https://, or ftp://
	replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

	//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
	replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
	replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

	//Change email addresses to mailto:: links.
	//replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
	//replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

	//hash tags
	var pattern4 = /\s#([^ ]*)/gim;
	//replacedText = replacedText.replace(pattern4, '$1<a href="http://twitter.com/#!/search/%23$2">#$2</a>');
	replacedText = replacedText.replace(pattern4, ' <a href="http://twitter.com/#!/search/%23$1">#$1</a>');

	return replacedText;
}

function processTweets(selector, url) {

    // var numTweetsToCheck = 40;
    // var urlWithCount = url + "?count=" + numTweetsToCheck;

    $.ajax({
        // dataType: "jsonp",
        dataType: "json",
        // url: urlWithCount,
        url: url,
        success: function (data) {
            var tweet = findNonReplyTweet(data);
            var date = new Date(tweet.created_at);
            $('#' + selector).append('<p><span class="bnrYellow"><b>' + moment(date).format("D MMM YYYY h:mm A") + ' | </b></span>' + '<span class="linkify">' + linkify(tweet.text) + '</span></p>');
        }
    });
}



$(document).ready(function () {

    // Retrieve latest tweet from Aaron
    // processTweets("aarontweet", "//twitter.com/statuses/user_timeline/AaronHillegass.json");
    processTweets("aarontweet", "/old/js/AaronHillegass.json");

    // Retrieve latest tweet from Big Nerd Ranch
    // processTweets("bnrtweet", "//twitter.com/statuses/user_timeline/BigNerdRanch.json");
    processTweets("bnrtweet", "/old/js/BigNerdRanch.json");

});