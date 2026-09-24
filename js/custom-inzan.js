/**
 * INZAN ATHLETICS - Custom Commercial Gym Interactions & Scripts
 */

(function($) {
    "use strict";

    // News Data for interactive modal reader
    var newsArticles = {
        1: {
            title: "GROUP TRAINING NOW AVAILABLE!",
            meta: "JOHN DOE | 1 NOVEMBER",
            category: "COACHING & PERFORMANCE",
            image: "images/blog/post-prev-1.jpg",
            content: "<p>Small Group Training sessions [4-6 Athletes] with a Certified Fitness Instructor [CFI] are now officially active on the training floor. Engineered for athletes who thrive in a high-energy, motivating environment without compromising individualized coaching attention.</p><p>Every session includes a progressive neuromuscular warm-up, targeted compound lifts, athletic conditioning, and recovery protocols. Group slots are strictly capped at 6 athletes per coach to maintain elite standard execution, precision form cueing, and injury prevention.</p><p>Book your assessment at the front desk or contact us below to reserve your squad slot.</p>"
        },
        2: {
            title: "PRIVATE TRAINING NOW AVAILABLE!",
            meta: "JOHN DOE | 9 DECEMBER",
            category: "ELITE 1-ON-1",
            image: "images/blog/post-prev-2.jpg",
            content: "<p>Private 1-on-1 Training sessions with our Senior Certified Personal Trainers [CPT] are now accepting dedicated athletes. These intensive sessions are customized exclusively for individuals requiring undivided technical focus, advanced periodization, and relentless accountability.</p><p>Whether preparing for collegiate track, mastering Olympic snatch technique, or executing targeted body recomposition, our CPTs construct your daily biometric tracking, velocity-based training protocols, and lifestyle nutrition architecture.</p><p>Limited coach availability. Inquire directly via phone or our contact portal to schedule your intake interview.</p>"
        },
        3: {
            title: "FINANCING OPTIONS NOW AVAILABLE!",
            meta: "JOHN DOE | 7 DECEMBER",
            category: "MEMBERSHIP & ACCESS",
            image: "images/blog/post-prev-3.jpg",
            content: "<p>We believe elite athletic training infrastructure should be accessible to truly committed athletes. We are proud to announce our partnership with leading regional financial providers to offer 0% interest and flexible installment payment solutions for all Annual and Semi-Annual training packages.</p><p>Members can now split comprehensive full-facility access, regular physiological testing, and coaching programs across 6, 12, or 18 easy monthly payments.</p><p>Speak with our Member Services team at Garden 8, New Cairo to configure your customized payment schedule today.</p>"
        }
    };

    // Toast notification helper
    function showToast(message, iconClass) {
        iconClass = iconClass || "fa fa-check-circle";
        var $toast = $("#inzanToast");
        $toast.html('<i class="' + iconClass + '" style="color:#FFFFFF; font-size:18px;"></i> <span>' + message + '</span>');
        $toast.stop(true, true).fadeIn(300).delay(3500).fadeOut(400);
    }

    // Modal helpers
    window.openNewsModal = function(id) {
        var article = newsArticles[id];
        if (!article) return;

        $("#modalCategory").text(article.category);
        $("#modalTitle").text(article.title);
        $("#modalMeta").text(article.meta);
        $("#modalImage").attr("src", article.image);
        $("#modalBody").html(article.content);
        $("#inzanNewsModal").fadeIn(250);
        $("body").css("overflow", "hidden");
    };

    window.closeNewsModal = function() {
        $("#inzanNewsModal").fadeOut(200);
        $("body").css("overflow", "auto");
    };

    $(document).ready(function() {

        // Close modal on background click or ESC
        $("#inzanNewsModal").on("click", function(e) {
            if ($(e.target).closest(".inzan-modal-dialog").length === 0) {
                closeNewsModal();
            }
        });

        $(document).on("keydown", function(e) {
            if (e.key === "Escape") {
                closeNewsModal();
            }
        });

        // Initialize Facility Carousel
        if ($(".facility-slider").length > 0 && typeof $.fn.owlCarousel === "function") {
            $(".facility-slider").owlCarousel({
                slideSpeed: 400,
                paginationSpeed: 500,
                singleItem: true,
                autoPlay: 6000,
                stopOnHover: true,
                navigation: false,
                pagination: true
            });
        }

        // Initialize Magnific Popup for Zone Training Works Grid
        if (typeof $.fn.magnificPopup === "function") {
            $(".work-lightbox-link").magnificPopup({
                type: "image",
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1]
                },
                image: {
                    titleSrc: function(item) {
                        return item.el.find(".work-title").text() || "Inzan Athletics Zone";
                    }
                },
                mainClass: "mfp-fade",
                removalDelay: 300
            });
        }

        // Interactive Map Toggle & Leaflet Map
        var mapInitialized = false;
        var inzanMap = null;

        $("#mapToggleBtn").on("click", function(e) {
            e.preventDefault();
            var $drawer = $("#mapDrawer");
            var $btn = $(this);

            if ($drawer.is(":visible")) {
                $drawer.slideUp(350);
                $btn.html('Open the map <i class="fa fa-angle-down"></i>');
            } else {
                $drawer.slideDown(350, function() {
                    $btn.html('Close the map <i class="fa fa-angle-up"></i>');
                    
                    if (!mapInitialized && typeof L !== "undefined") {
                        // Garden 8, New Cairo coordinates
                        var lat = 30.0384;
                        var lng = 31.4782;

                        inzanMap = L.map("inzanMapContainer", {
                            center: [lat, lng],
                            zoom: 15,
                            zoomControl: true,
                            scrollWheelZoom: false
                        });

                        // Dark Matter tile layer (elegant dark theme matching #000000 / #1A1A1A)
                        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
                            attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
                            subdomains: "abcd",
                            maxZoom: 19
                        }).addTo(inzanMap);

                        // Custom marker icon
                        var customIcon = L.divIcon({
                            className: "custom-gym-pin",
                            html: '<div style="background:#000000; border:2px solid #FFFFFF; border-radius:50%; width:34px; height:34px; display:flex; align-items:center; justify-content:center; box-shadow:0 0 15px rgba(255,255,255,0.6);"><i class="fa fa-map-marker" style="color:#FFFFFF; font-size:18px;"></i></div>',
                            iconSize: [34, 34],
                            iconAnchor: [17, 34]
                        });

                        var marker = L.marker([lat, lng], { icon: customIcon }).addTo(inzanMap);
                        marker.bindPopup('<div style="color:#000; font-family:sans-serif; text-align:center;"><strong style="letter-spacing:1px;">INZAN ATHLETICS</strong><br><span style="font-size:11px; color:#555;">Garden 8, New Cairo, Egypt</span></div>').openPopup();

                        mapInitialized = true;
                    } else if (inzanMap) {
                        inzanMap.invalidateSize();
                    }
                });
            }
        });

        // Contact Form Interactive Handling
        $("#inzanContactForm").on("submit", function(e) {
            e.preventDefault();
            var $form = $(this);
            var name = $("#name").val().trim();
            var email = $("#email").val().trim();
            var message = $("#message").val().trim();
            var $submitBtn = $("#submit_btn");

            if (!name || !email || !message) {
                showToast("Please fill in all required fields.", "fa fa-exclamation-circle");
                return;
            }

            // Visual loading state
            $submitBtn.prop("disabled", true).html('<i class="fa fa-circle-o-notch fa-spin"></i> Sending...');

            setTimeout(function() {
                $submitBtn.prop("disabled", false).html("Submit Message");
                $form[0].reset();
                showToast("Thank you, " + name + "! Your inquiry has been sent to info@inzan.ca.", "fa fa-check");
            }, 800);
        });

        // Newsletter Interactive Handling
        $("#newsletterForm").on("submit", function(e) {
            e.preventDefault();
            var email = $("#newsletterEmail").val().trim();
            var $btn = $(this).find("button[type='submit']");

            if (!email) return;

            $btn.prop("disabled", true).html('<i class="fa fa-circle-o-notch fa-spin"></i> Subscribing...');

            setTimeout(function() {
                $btn.prop("disabled", false).html("Subscribe");
                $("#newsletterEmail").val("");
                showToast("Thank you for subscribing to Inzan Athletics!", "fa fa-check");
            }, 600);
        });

        // Mobile Nav Drawer Toggle
        $(".mobile-nav").on("click", function() {
            var $nav = $(".desktop-nav");
            if ($nav.hasClass("mobile-open")) {
                $nav.removeClass("mobile-open").slideUp(250);
            } else {
                $nav.addClass("mobile-open").slideDown(250);
            }
        });

        $(".desktop-nav a").on("click", function() {
            if ($(window).width() <= 1024) {
                $(".desktop-nav").removeClass("mobile-open").slideUp(200);
            }
        });

        // Navbar ScrollSpy active class handling
        var sections = $("section[id], div[id='home']");
        var navLinks = $(".desktop-nav ul li a");

        $(window).on("scroll", function() {
            var curPos = $(this).scrollTop() + 120;

            sections.each(function() {
                var top = $(this).offset().top;
                var bottom = top + $(this).outerHeight();
                var id = $(this).attr("id");

                if (curPos >= top && curPos <= bottom) {
                    navLinks.removeClass("active");
                    $(".desktop-nav ul li a[href='#" + id + "']").addClass("active");
                }
            });

            // If at very top
            if ($(this).scrollTop() < 100) {
                navLinks.removeClass("active");
                $(".desktop-nav ul li a[href='#home']").addClass("active");
            }
        });

    });

})(jQuery);
