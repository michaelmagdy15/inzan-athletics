/**
 * INZAN ATHLETICS - Custom Commercial Gym Interactions & Scripts
 */

(function($) {
    "use strict";

    // News Data for interactive modal reader (Sports Science & Coaching Articles)
    var newsArticles = {
        1: {
            title: "BIOMECHANICAL PROFILING: WHY INZAN STARTS EVERY ATHLETE WITH MOVEMENT SCREENING",
            meta: "COACH YOUSSEF R. &bull; 18 SEPTEMBER 2026",
            category: "SPORTS SCIENCE & ASSESSMENT",
            image: "images/full-width-images/Test.jpg",
            content: "<p>At Inzan Athletics, we reject one-size-fits-all programming. Before an athlete touches a loaded barbell or performs high-intensity intervals, they undergo our comprehensive 60-minute Biomechanical Baseline Assessment.</p><p>Using high-speed video analysis and standardized movement screens (overhead squat, thoracic rotation, hip internal/external range, and ankle dorsiflexion), our coaching staff identifies kinetic compensations before they manifest as chronic injuries. We map your force-velocity profile to ensure your program develops the exact physical qualities your body currently lacks.</p><p>Whether your goal is competing at an elite level or lifting pain-free into your sixties, our diagnostic protocol sets the standard for high-performance training in Egypt.</p>"
        },
        2: {
            title: "THE OLYMPIC LIFTING TRANSFER: DEVELOPING TRIPLE EXTENSION & ROTATIONAL POWER",
            meta: "COACH AHMED M. &bull; 04 SEPTEMBER 2026",
            category: "STRENGTH & TECHNICAL MASTERY",
            image: "images/full-width-images/facility-1.jpg",
            content: "<p>The snatch and clean & jerk are the ultimate expressions of Rate of Force Development (RFD). No single gym exercise produces higher power outputs than the triple extension of ankles, knees, and hips executed during a maximal Olympic pull.</p><p>At our Garden 8 facility, Olympic weightlifting is taught through strict technical progressions: hook grip mastery, bar path trajectory, barbell turnover speed, and active overhead receiving positions. Athletes across basketball, football, martial arts, and track notice immediate transfers in first-step acceleration, vertical leap, and deceleration control.</p><p>All sessions are supervised with strict 1:6 coach-to-athlete ratios on dedicated Eleiko-standard lifting platforms.</p>"
        },
        3: {
            title: "CALISTHENICS VS. HEAVY IRON: INTEGRATING RELATIVE BODYWEIGHT STRENGTH",
            meta: "COACH KAREEM S. &bull; 22 AUGUST 2026",
            category: "MOVEMENT & PERIODIZATION",
            image: "images/full-width-images/ast.jpg",
            content: "<p>A common mistake in commercial gym training is viewing calisthenics and heavy barbell lifting as opposing philosophies. Inzan's High Performance methodology merges relative bodyweight mastery with progressive loaded resistance.</p><p>By mastering gymnastic ring support holds, strict pull-up variations, handstand wall drills, and parallel bar dips, athletes cultivate unparalleled scapular stability and rotational core stiffness. When paired with heavy deadlifts and squats, this dual stimulus protects vulnerable shoulder and lumbar joints while promoting balanced hypertrophy.</p><p>Explore our specialized Calisthenics & Gymnastics Zone to discover how gymnastic conditioning will transform your athleticism.</p>"
        }
    };

    // Pathway selector helper: pre-selects goal dropdown and scrolls smoothly to assessment form
    window.selectPathway = function(goalValue) {
        var $select = $("#athleteGoal");
        if ($select.length > 0 && goalValue) {
            $select.val(goalValue);
        }
        var $target = $("#assessment");
        if ($target.length > 0) {
            $("html, body").animate({
                scrollTop: $target.offset().top - 80
            }, 600, "easeInOutExpo", function() {
                $("#athleteName").focus();
            });
        }
    };

    // Toast notification helper
    function showToast(message, iconClass) {
        iconClass = iconClass || "fa fa-check-circle";
        var $toast = $("#inzanToast");
        $toast.html('<i class="' + iconClass + '" style="color:#25D366; font-size:18px;"></i> <span>' + message + '</span>');
        $toast.stop(true, true).fadeIn(300).delay(4000).fadeOut(400);
    }

    // Modal helpers
    window.openNewsModal = function(id) {
        var article = newsArticles[id];
        if (!article) return;

        $("#modalCategory").text(article.category);
        $("#modalTitle").text(article.title);
        $("#modalMeta").html(article.meta);
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

        // Assessment Booking & Inquiry Form Interactive Handling
        $("#inzanContactForm").on("submit", function(e) {
            e.preventDefault();
            var $form = $(this);
            var $submitBtn = $("#submit_btn");

            // Anti-spam honeypot verification
            if ($("#_anti_spam").val() !== "") {
                return false;
            }

            var name = $("#athleteName").val().trim();
            var phone = $("#athletePhone").val().trim();
            var email = $("#athleteEmail").val().trim();
            var goal = $("#athleteGoal").val();
            var timePref = $("#athleteTime").val() || "Anytime";
            var message = $("#athleteMessage").val().trim();

            // Clear previous errors
            $form.find(".inzan-form-control").css("border-color", "");

            if (!name || !phone || !email || !goal) {
                if (!name) $("#athleteName").css("border-color", "#FF4444");
                if (!phone) $("#athletePhone").css("border-color", "#FF4444");
                if (!email) $("#athleteEmail").css("border-color", "#FF4444");
                if (!goal) $("#athleteGoal").css("border-color", "#FF4444");

                showToast("Please complete all required fields (Name, Phone, Email, Goal).", "fa fa-exclamation-triangle");
                return;
            }

            // Visual loading state
            $submitBtn.prop("disabled", true).html('<i class="fa fa-circle-o-notch fa-spin"></i> Reserving Assessment Slot...');

            setTimeout(function() {
                $submitBtn.prop("disabled", false).html("Confirm Assessment Request");
                
                // Populate personalized confirmation
                $("#successAthleteName").text(name);
                $("#successAthleteGoal").text(goal);
                $("#successAthleteTime").text(timePref);
                
                // Configure direct WhatsApp confirmation link
                var waMessage = encodeURIComponent("Hi Inzan Athletics! I just booked my 60-min assessment online.\nName: " + name + "\nPhone: " + phone + "\nGoal: " + goal + "\nPreferred Time: " + timePref + (message ? "\nNotes: " + message : ""));
                $("#successWhatsAppBtn").attr("href", "https://wa.me/201000061243?text=" + waMessage);

                // Smoothly replace form with confirmation box
                $form.slideUp(300, function() {
                    $("#inzanSuccessBox").slideDown(350);
                });

                showToast("Assessment booked! Welcome to Inzan Athletics, " + name + ".", "fa fa-check-circle");
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
                showToast("Subscribed! Performance Intel will be sent to " + email, "fa fa-check-circle");
            }, 600);
        });

        // Mobile Nav Drawer Toggle with Accessibility
        $(".mobile-nav").on("click", function() {
            var $nav = $(".desktop-nav");
            var isExpanded = $(this).attr("aria-expanded") === "true";
            $(this).attr("aria-expanded", !isExpanded);

            if ($nav.hasClass("mobile-open")) {
                $nav.removeClass("mobile-open").slideUp(250);
            } else {
                $nav.addClass("mobile-open").slideDown(250);
            }
        });

        $(".desktop-nav a").on("click", function() {
            if ($(window).width() <= 1024) {
                $(".mobile-nav").attr("aria-expanded", "false");
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
