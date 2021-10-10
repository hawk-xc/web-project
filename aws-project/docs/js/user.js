(function() {
	"use strict";
	$(window).load(function() {
		$(function() {
			var links = $("#sidebar").find("a");
			changeCurrent();

			$(document).scroll(function() {
				changeCurrent();
			});

			function changeCurrent() {
				var currentScroll = $(document).scrollTop();
				links.each(function() {
					var currentLink = $(this);
					var refSection = $(currentLink.attr("href"));
					if (refSection.offset().top - 100 <= currentScroll && refSection.offset().top + refSection.outerHeight() >= currentScroll) {
						links.removeClass("current");
						currentLink.addClass("current");
					}
				});
			}

			links.click(function() {
				var refSection = $($(this).attr("href"));
				$("html, body").animate({
					scrollTop: refSection.offset().top - 60
				}, 100);
				return false;
			});
		});

		$(function() {
			var $window = $(window);
			window.prettyPrint && prettyPrint();
		});
	});
})(jQuery);