(function () {
    window.onload = function () {
        var navWrapper = $(".navWrapper ul");

        $(".toggle").click(function () {
            navWrapper.slideToggle("slow", function () {
                //Animation complete.
            });
        });

        enquire.register("screen and (min-width: 768px)", {
            // OPTIONAL
            // If supplied, triggered when a media query matches.
            match: function () {
                // removes any display setting inlined in the html
                navWrapper.css('display', '')
            }
        });

        var slider = $("#slider"),
            imagesUl = slider.find("ul"),
            images = slider.find("ul li"),
            numberOfImages = images.length,
            imageWithPercentage = 100 / numberOfImages,
            currentImage = 0
            ;

        imagesUl.css("width", numberOfImages * 100 + "%");

        images.each(function (i) {
            $(this).css({
                "left": imageWithPercentage * i + "%",
                "width": imageWithPercentage + "%"
            });
        });

        slider.find(".prev").click(function () {
            moveToImage(currentImage - 1);
        });

        slider.find(".next").click(function () {
            moveToImage(currentImage + 1);
        });

        function moveToImage(imageIndex) {
            var marginLeftPercent = (imageIndex * -100) + "%";

            if (imageIndex < 0) {
                marginLeftPercent = (numberOfImages - 1) * -100 + "%";
                imageIndex = numberOfImages - 1;
            }

            else if (imageIndex >= numberOfImages) {
                marginLeftPercent = "0%";
                imageIndex = 0;
            }

            currentImage = imageIndex;

            imagesUl.animate({"margin-left": marginLeftPercent});

            updateCurrentDot(imageIndex);
        }//moveToImage

        function createDots() {
            var dotUl = $(".dotNav");

            if (numberOfImages > 1) {
                for (var i = 0; i < numberOfImages; i++) {
                    dotUl.append(
                        '<li data-prop-index=' + i + ' class="dotNavItem"></li>'
                    );
                }//for

                var dots = dotUl.find("li");
                dots.click(function () {
                    var imageToShow = parseInt($(this).attr("data-prop-index"));
                    moveToImage(imageToShow);
                });

                dots.first().addClass("active");

            }// if
        }

        function updateCurrentDot(dotIndex) {
            if (numberOfImages > 1) {
                var dots = $(".dotNavItem");

                dots.removeClass("active");
                dots.get(dotIndex).className += " active";
            }
        }

        createDots();

        if (numberOfImages > 1) {
            window.setInterval(function () {
                moveToImage(currentImage + 1);
            }, 2000);
        }
    };// init
})();