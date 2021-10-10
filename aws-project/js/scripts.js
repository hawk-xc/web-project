/*
[Table of contents]

1. Document ready function
	1.1. Owl Carousel call
	1.2. Navbar-toggle function
	1.3. Initialize tooltips
	1.4. Focus form field
	1.5. Contacts form
	1.6. Initialize WOW
2. Document load function
	2.1. Header mouse parallax
	2.2. Header scroll parallax
	2.3. Sticky navbar
	2.4. Isotope
	2.5. Skill bars
	2.6. Blog slider
	2.7. Navigation
------------------------------------------------------------*/

(function() {
	"use strict";

	/*
	1. Document ready function
	------------------------------------------------------------*/
	$(document).ready(function() {

		/*
		1.1. Owl Carousel call
		------------------------------------------------------------*/
		$(function() {
			$(".header-slider").owlCarousel({
				singleItem: true,
				autoPlay: 3000,
				mouseDrag: false,
				touchDrag: false,
				transitionStyle: "fade",
				navigation: false,
				pagination: true
			});

		});


		/*
		1.2. Navbar-toggle function
		------------------------------------------------------------*/
		$(function() {
			$(".navbar-toggle").click(function() {
				var nav = $("nav .navbar-items");
				nav.hasClass("responsive") ? nav.removeClass("responsive") : nav.addClass("responsive");
			});
		});


		/*
		1.3. Initialize tooltips
		------------------------------------------------------------*/
		$(function() {
			$("[data-toggle='tooltip']").tooltip();
		});


		/*
		1.4. Focus form field
		------------------------------------------------------------*/
		$(function() {
			$(".form-field").click(function(e) {
				$(this).find("input, textarea").focus();
				$(".form-field").removeClass("focused");
				$(this).addClass("focused");
				e.stopPropagation();
			});

			$("html").click(function() {
				$(".form-field").removeClass("focused");
			});
		});


		/*
		1.5. Contacts form
		------------------------------------------------------------*/
		$(function() {
			var inputName = $("#contacts-name");
			var inputEmail = $("#contacts-email");
			var inputSubject = $("#contacts-subject");
			var inputMessage = $("#contacts-message");
			$("#contacts-send").click(function() {
				var name = inputName.val();
				var email = inputEmail.val();
				var subject = inputSubject.val();
				var message = inputMessage.val();
				var valid = true;

				if (name == "") {
					inputName.parent(".form-field").addClass("invalid");
					valid = false;
				}

				if (email == "") {
					inputEmail.parent(".form-field").addClass("invalid");
					valid = false;
				}

				if (subject == "") {
					inputSubject.parent(".form-field").addClass("invalid");
					valid = false;
				}

				if (message == "") {
					inputMessage.parent(".form-field").addClass("invalid");
					valid = false;
				}

				var postData = {
					"name": name,
					"email": email,
					"subject": subject,
					"message": message
				};

				if (valid) {
					$.post("mail.php", postData, function(response) {
						$("#contacts-messages").empty().removeClass("error");
						for (var i = 0, n = response.length; i < n; i++) {
							if (response[i].status == 0) $("#contacts-messages").addClass("error");
							$("#contacts-messages").append(response[i].message + "<br>");
						}
					}, "json");
				}
				return false;
			});

			$("#section-contacts .contacts-form input, #section-contacts .contacts-form textarea").keyup(function() {
				$(this).parent(".form-field").removeClass("invalid");
			});
		});


		/*
		1.6. Initialize WOW
		------------------------------------------------------------*/
		$(function() {
			new WOW().init();
		});
	});


	/*
	2. Document load function
	------------------------------------------------------------*/
	$(window).load(function() {

		/*
		2.1. Header mouse parallax
		------------------------------------------------------------*/
		$(function() {
			$("header").mousemove(function(e) {
				var factor = 0.01;
				var x = (e.pageX - $(this).offset().left - ($(this).width() / 2)) * factor;
				var y = (e.pageY - $(this).offset().top - ($(this).height() / 2)) * factor;
				$(this).find(".header-slider .slide").children().css({"transform": "translate3d(" + x + "px, " + y + "px, 0)"});
			});
		});


		/*
		2.2. Header scroll parallax
		------------------------------------------------------------*/
		$(function() {
			var element = $("header .header-slider .slide");
			var endOffset = $("header").height() - 50;
			shift();
			$(window).scroll(function() {
				shift();
			});
			function shift() {
				var currentOffset = $(document).scrollTop();
				var y = currentOffset / 10;
				var opacity = 1 - currentOffset / endOffset;

				if (currentOffset <= endOffset) {
					element.css({
						"transform": "translateY(" + y + "px)",
						"opacity": opacity
					});
				}
			}
		});


		/*
		2.3. Sticky navbar
		------------------------------------------------------------*/
		$(function() {
			/* add "sticky" class */
			var element = $("nav");
			var offset = element.offset().top + element.height();
			makeSticky();
			$(window).scroll(function() {
				makeSticky();
				setWidth();
			});
			function makeSticky() {
				if ($(window).scrollTop() >= offset) {
					element.addClass("sticky");
					$("main").css("padding-top", element.height());
				} else {
					element.removeClass("sticky");
					$("main").css("padding-top", 0);
				}
			}

			/* set width */
			setWidth();
			$(window).resize(function() {
				setWidth();
			});
			function setWidth() {
				var width = $("main").width();
				$("nav.sticky").css("max-width", width);
			}
		});


		/*
		2.4. Isotope
		------------------------------------------------------------*/
		$(function() {
			var $container = $("#section-works .grid");
			$container.imagesLoaded(function() {
				$container.isotope({
					masonry: {
						columnWidth: "#section-works .grid .item-size",
						gutter: "#section-works .grid .gutter-size"
					},
					itemSelector: "#section-works .grid .item",
					percentPosition: true
				});
			});

			$("#section-works .filter li").click(function() {
				$("#section-works .filter li").removeClass("current");
				$(this).addClass("current");
				var category = $(this).attr("data-filter");
				$("#section-works .grid .item").each(function() {
					$(this).removeClass("disabled");
					if (!$(this).hasClass(category) && category != "*") $(this).addClass("disabled");
				});
			});

			$("#section-works .grid .item").click(function(e) {
				if ($(this).hasClass("disabled")) {
					e.preventDefault();
				}
			});
		});


		/*
		2.5. Skill bars
		------------------------------------------------------------*/
		$(function() {
			$("#section-about .skill-bar").each(function() {
				var skill_bar = $(this);
				var value_left = parseInt(skill_bar.find(".value").text()) < 100 ? parseInt(skill_bar.find(".value").text()) / 100 * skill_bar.width() - skill_bar.find(".value").outerWidth() : skill_bar.width() - skill_bar.find(".value").outerWidth();
				var bar_left = parseInt(skill_bar.find(".value").text()) < 100 ? parseInt(skill_bar.find(".value").text()) - 100 + "%" : 0;
				skill_bar.find(".value").css("left", value_left);
				skill_bar.find(".bar").css("left", bar_left);
			});
		});


		/*
		2.6. Blog slider
		------------------------------------------------------------*/
		$(function() {
			$("#section-blog .blog-post .blog-slider").owlCarousel({
				autoPlay: 4000,
				singleItem: true,
				mouseDrag: false,
				touchDrag: true,
				navigation: true,
				navigationText: false,
				pagination: false
			});
		});


		/*
		2.7. Navigation
		------------------------------------------------------------*/
		$(function() {
			var links = $("nav .navbar-items a");
			var navHeight = $("nav").height();

			links.click(function() {
				var refSection = $($(this).attr("href"));
				$("html, body").animate({
					scrollTop: refSection.offset().top - navHeight
				}, 500);
				return false;
			});

			$(document).on("scroll", onScroll);
			function onScroll() {
				var currentScroll = $(document).scrollTop();
				links.each(function() {
					var currentLink = $(this);
					var refSection = $(currentLink.attr("href"));
					if (refSection.offset().top - 80 <= currentScroll && refSection.offset().top - 80 + refSection.outerHeight() >= currentScroll) {
						links.removeClass("current");
						currentLink.addClass("current");
					}
				});
			}
		});
	});
})(jQuery);