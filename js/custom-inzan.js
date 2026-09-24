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

        // ==========================================================================
        // Weekly Performance Schedule Data & Controller
        // ==========================================================================
        var scheduleData = {
            mon: [
                { time: "06:30 AM – 07:45 AM", cat: "sc", catName: "S&C", title: "Early Dawn Strength & Velocity", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
                { time: "10:00 AM – 11:15 AM", cat: "olympic", catName: "Olympic", title: "Snatch Technique & Bar Path", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Technical Focus" },
                { time: "05:00 PM – 06:15 PM", cat: "sc", catName: "S&C", title: "Barbell Hypertrophy & Force Curve", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
                { time: "07:00 PM – 08:15 PM", cat: "calisthenics", catName: "Calisthenics", title: "Gymnastic Ring Strength & Levers", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Skill Focus" },
                { time: "08:30 PM – 09:45 PM", cat: "sc", catName: "S&C", title: "Athletic Conditioning & Anaerobic Engine", coach: "Performance Staff", ratio: "1:6 Ratio", intensity: "Max Effort" },
                { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Athlete Floor & Recovery Suites", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
            ],
            tue: [
                { time: "06:30 AM – 07:45 AM", cat: "calisthenics", catName: "Calisthenics", title: "Movement Prep & Kinetic Spine Flow", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Mobility Focus" },
                { time: "11:00 AM – 12:15 PM", cat: "olympic", catName: "Olympic", title: "Clean & Jerk Bar Velocity Workshop", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Technical Focus" },
                { time: "05:30 PM – 06:45 PM", cat: "sc", catName: "S&C", title: "Posterior Chain & Deadlift Mastery", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
                { time: "07:15 PM – 08:30 PM", cat: "calisthenics", catName: "Calisthenics", title: "Handstand Balance & Scapular Lock", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Skill Focus" },
                { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Athlete Floor & Recovery Suites", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
            ],
            wed: [
                { time: "06:30 AM – 07:45 AM", cat: "sc", catName: "S&C", title: "Tri-Phasic Power & Explosive RFD", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
                { time: "10:00 AM – 11:15 AM", cat: "calisthenics", catName: "Calisthenics", title: "Functional Mobility & Joint Longevity", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Restoration" },
                { time: "05:00 PM – 06:15 PM", cat: "olympic", catName: "Olympic", title: "Olympic Complexes & Turnover Speed", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Technical Focus" },
                { time: "07:00 PM – 08:15 PM", cat: "sc", catName: "S&C", title: "Metabolic Engine & Turf Sled Sprints", coach: "Performance Staff", ratio: "1:6 Ratio", intensity: "Max Intensity" },
                { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Athlete Floor & Recovery Suites", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
            ],
            thu: [
                { time: "06:30 AM – 07:45 AM", cat: "sc", catName: "S&C", title: "Foundational Squat & Bilateral Force", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
                { time: "11:00 AM – 12:15 PM", cat: "calisthenics", catName: "Calisthenics", title: "Strict Gymnastics & Weighted Pull-Ups", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Strength Focus" },
                { time: "05:30 PM – 06:45 PM", cat: "sc", catName: "S&C", title: "Speed-Strength & Reactive Jump Profiling", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "Power Focus" },
                { time: "07:15 PM – 08:30 PM", cat: "olympic", catName: "Olympic", title: "Olympic Lifting Bar Velocity Testing", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Technical Focus" },
                { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Athlete Floor & Recovery Suites", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
            ],
            fri: [
                { time: "08:30 AM – 10:00 AM", cat: "sc", catName: "S&C", title: "Friday Athlete Team Engine Challenge", coach: "Head Coaching Staff", ratio: "Team Format", intensity: "Max Energy" },
                { time: "10:30 AM – 12:00 PM", cat: "olympic", catName: "Olympic", title: "Olympic Weightlifting Open Platform", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Technical Focus" },
                { time: "04:00 PM – 05:30 PM", cat: "calisthenics", catName: "Recovery", title: "Mobility, Ice Bath & Tissue Regeneration", coach: "Coach Kareem S.", ratio: "Recovery Lab", intensity: "Restorative" },
                { time: "08:00 AM – 10:00 PM", cat: "open", catName: "Open Gym", title: "Open Athlete Floor Access", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
            ],
            sat: [
                { time: "08:00 AM – 09:30 AM", cat: "sc", catName: "S&C", title: "Weekend Barbell Club: Heavy Bilateral", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
                { time: "10:30 AM – 12:00 PM", cat: "calisthenics", catName: "Calisthenics", title: "Advanced Bodyweight Skills (Muscle-Up)", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Skill Focus" },
                { time: "04:30 PM – 06:00 PM", cat: "olympic", catName: "Olympic", title: "Olympic Lifting Video Kinematic Review", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Diagnostic" },
                { time: "06:30 PM – 08:00 PM", cat: "sc", catName: "S&C", title: "High-Velocity Sled & Sprint Conditioning", coach: "Performance Staff", ratio: "1:6 Ratio", intensity: "Max Effort" },
                { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Athlete Floor & Recovery Suites", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
            ],
            sun: [
                { time: "06:30 AM – 07:45 AM", cat: "sc", catName: "S&C", title: "Early Dawn Strength & Acceleration", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
                { time: "10:00 AM – 11:15 AM", cat: "olympic", catName: "Olympic", title: "Olympic Lifting Precision & Squat Snatch", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Technical Focus" },
                { time: "05:30 PM – 06:45 PM", cat: "calisthenics", catName: "Calisthenics", title: "Strict Bodyweight Strength & Ring Dips", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Strength Focus" },
                { time: "07:15 PM – 08:30 PM", cat: "sc", catName: "Recovery", title: "Restoration, Foam Rolling & Kinetic Flow", coach: "Performance Staff", ratio: "Recovery Lab", intensity: "Restorative" },
                { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Athlete Floor & Recovery Suites", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
            ]
        };

        var currentScheduleDay = "mon";
        var currentScheduleFilter = "all";

        function renderSchedule() {
            var $container = $("#scheduleGridContainer");
            if ($container.length === 0) return;

            var items = scheduleData[currentScheduleDay] || [];
            if (currentScheduleFilter !== "all") {
                items = items.filter(function(it) {
                    return it.cat === currentScheduleFilter;
                });
            }

            if (items.length === 0) {
                $container.html('<div style="grid-column: 1/-1; text-align:center; padding: 40px; color:#777; font-size:14px;"><i class="fa fa-info-circle mr-5"></i> No group sessions under this filter for ' + currentScheduleDay.toUpperCase() + '. Open Gym is available 6:00 AM – 11:00 PM.</div>');
                return;
            }

            var html = "";
            items.forEach(function(item) {
                html += '<div class="schedule-card">' +
                    '<div>' +
                        '<div class="schedule-card-top">' +
                            '<span class="schedule-time-badge"><i class="fa fa-clock-o mr-5"></i> ' + item.time + '</span>' +
                            '<span class="schedule-cat-badge">' + item.catName + '</span>' +
                        '</div>' +
                        '<h4 class="schedule-card-title">' + item.title + '</h4>' +
                        '<div class="schedule-card-meta">' +
                            '<span><i class="fa fa-user-circle"></i> ' + item.coach + '</span>' +
                            '<span><i class="fa fa-users"></i> ' + item.ratio + '</span>' +
                            '<span><i class="fa fa-bolt" style="color:#25D366;"></i> ' + item.intensity + '</span>' +
                        '</div>' +
                    '</div>' +
                    '<button type="button" class="schedule-reserve-btn" onclick="bookScheduleSlot(\'' + item.title.replace(/'/g, "\\'") + '\', \'' + currentScheduleDay + '\', \'' + item.time + '\')">' +
                        '<i class="fa fa-calendar-plus-o mr-5"></i> Reserve Slot' +
                    '</button>' +
                '</div>';
            });

            $container.html(html);
        }

        window.switchScheduleDay = function(day) {
            currentScheduleDay = day;
            $(".schedule-day-tab").removeClass("active");
            $(".schedule-day-tab[data-day='" + day + "']").addClass("active");
            renderSchedule();
        };

        window.filterScheduleCategory = function(cat) {
            currentScheduleFilter = cat;
            $(".schedule-filter-pill").removeClass("active");
            $(".schedule-filter-pill[data-filter='" + cat + "']").addClass("active");
            renderSchedule();
        };

        window.bookScheduleSlot = function(sessionName, day, time) {
            var dayNames = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
            var fullDay = dayNames[day] || day;
            
            // Map session to time window in form
            var $timeSelect = $("#athleteTime");
            if (time.indexOf("AM") !== -1) {
                $timeSelect.val("Morning (6:00 AM – 10:00 AM)");
            } else if (time.indexOf("10:") !== -1 || time.indexOf("11:") !== -1 || time.indexOf("12:") !== -1) {
                $timeSelect.val("Midday (10:00 AM – 4:00 PM)");
            } else {
                $timeSelect.val("Evening (4:00 PM – 11:00 PM)");
            }

            var note = "Interested in reserving: " + sessionName + " (" + fullDay + ", " + time + ").";
            $("#athleteMessage").val(note);

            var $target = $("#assessment");
            if ($target.length > 0) {
                $("html, body").animate({
                    scrollTop: $target.offset().top - 80
                }, 600, "easeInOutExpo", function() {
                    $("#athleteName").focus();
                });
            }

            showToast("Selected: " + sessionName + " (" + fullDay + "). Complete your profile below!", "fa fa-calendar-check-o");
        };

        // Render initial schedule
        renderSchedule();

        // ==========================================================================
        // Interactive 60s Diagnostic Assessment Calculator
        // ==========================================================================
        var diagState = {
            step: 1,
            goal: "power",
            experience: "intermediate",
            frequency: "4-5",
            focus: "none"
        };

        var diagProtocols = {
            power: {
                title: "INZAN TRI-PHASIC EXPLOSIVE POWER PROTOCOL",
                coach: "Coach Youssef R. (Head of S&C, CSCS)",
                phase: "Force-Velocity Profiling & Reactive Ground Force",
                frequency: "4 Sessions / Week (Semi-Private 1:6)",
                milestone: "+15–22% RFD • +10cm Vertical Leap",
                pathwayVal: "Sport Performance"
            },
            olympic: {
                title: "INZAN OLYMPIC KINEMATIC MASTERY PROTOCOL",
                coach: "Coach Ahmed M. (EWF Certified, USAW L2)",
                phase: "Hook Grip, Triple Extension & Bar Turnover Velocity",
                frequency: "3–4 Technical Lifting Sessions / Week",
                milestone: "Clean Bar Path • +15-25kg Barbell Total in 12 Weeks",
                pathwayVal: "Strength Skills (Olympic & Calisthenics)"
            },
            calisthenics: {
                title: "INZAN RELATIVE BODYWEIGHT & RING STRENGTH",
                coach: "Coach Kareem S. (Gymnastic Specialist)",
                phase: "Straight-Arm Scapular Stabilization & Lever Progressions",
                frequency: "4 Movement & Gymnastic Sessions / Week",
                milestone: "Strict Muscle-Up • Back Lever • Scapular Bulletproofing",
                pathwayVal: "Strength Skills (Olympic & Calisthenics)"
            },
            hypertrophy: {
                title: "INZAN FUNCTIONAL HYPERTROPHY & RECOMPOSITION",
                coach: "Coach Youssef R. & Hanadi H. (RD, CISSN)",
                phase: "Mechanical Tension, Force Vectors & Macro Blueprint",
                frequency: "4–5 Strength & Conditioning Sessions / Week",
                milestone: "Lean Muscle Hypertrophy • Optimized Body Composition",
                pathwayVal: "Body Recomposition & Conditioning"
            },
            rehab: {
                title: "INZAN KINETIC RESTORATION & RETURN TO PLAY",
                coach: "Inzan Sports Science & Physical Therapy Team",
                phase: "Joint Deceleration, Tendon Loading & Kinetic Symmetry",
                frequency: "3 Targeted Corrective Sessions / Week",
                milestone: "100% Pain-Free Kinetic Chain • Safe Return to Maximal Loads",
                pathwayVal: "Private 1-on-1 Coaching"
            }
        };

        window.selectDiagOption = function(step, value, el) {
            diagState[step] = value;
            var $stepCard = $(el).closest(".diag-step-card");
            $stepCard.find(".diag-option-btn").removeClass("selected");
            $(el).addClass("selected");
        };

        window.nextDiagStep = function() {
            if (diagState.step < 4) {
                diagState.step++;
                updateDiagUI();
            } else if (diagState.step === 4) {
                // Calculate and show result
                diagState.step = 5;
                updateDiagUI();
                renderDiagResult();
            }
        };

        window.prevDiagStep = function() {
            if (diagState.step > 1) {
                diagState.step--;
                updateDiagUI();
            }
        };

        function updateDiagUI() {
            $(".diag-step-card").removeClass("active");
            $("#diagStep" + diagState.step).addClass("active");

            var percent = (diagState.step <= 4) ? (diagState.step * 25) : 100;
            $("#diagProgressFill").css("width", percent + "%");

            $(".diagnostic-step-dot").each(function(idx) {
                var dotNum = idx + 1;
                $(this).removeClass("active done");
                if (dotNum < diagState.step) {
                    $(this).addClass("done").html('<i class="fa fa-check"></i>');
                } else if (dotNum === diagState.step) {
                    $(this).addClass("active").text(dotNum);
                } else {
                    $(this).text(dotNum);
                }
            });
        }

        function renderDiagResult() {
            var proto = diagProtocols[diagState.goal] || diagProtocols["power"];
            $("#diagResultProtocol").text(proto.title);
            $("#diagMetricCoach").text(proto.coach);
            $("#diagMetricPhase").text(proto.phase);
            $("#diagMetricFreq").text(proto.frequency);
            $("#diagMetricMilestone").text(proto.milestone);
        }

        window.applyDiagnosticToForm = function() {
            var proto = diagProtocols[diagState.goal] || diagProtocols["power"];
            $("#athleteGoal").val(proto.pathwayVal);

            var summaryNote = "DIAGNOSTIC ASSESSMENT RESULTS:\n" +
                "• Recommended Protocol: " + proto.title + "\n" +
                "• Primary Goal: " + diagState.goal.toUpperCase() + "\n" +
                "• Training Age: " + diagState.experience.toUpperCase() + "\n" +
                "• Commitment: " + diagState.frequency + " days/week\n" +
                "• Kinetic Focus: " + diagState.focus.toUpperCase();

            $("#athleteMessage").val(summaryNote);

            var $target = $("#assessment");
            if ($target.length > 0) {
                $("html, body").animate({
                    scrollTop: $target.offset().top - 80
                }, 600, "easeInOutExpo", function() {
                    $("#athleteName").focus();
                });
            }

            showToast("Diagnostic Applied! Your customized pathway is ready below.", "fa fa-check-circle");
        };

        window.consultDiagnosticWhatsApp = function() {
            var proto = diagProtocols[diagState.goal] || diagProtocols["power"];
            var text = encodeURIComponent(
                "Hi Inzan Athletics! I just completed the 60-Second Athletic Diagnostic.\n" +
                "My Recommended Protocol is: " + proto.title + "\n" +
                "Experience: " + diagState.experience + " | Days: " + diagState.frequency + "/wk\n" +
                "Focus/Injuries: " + diagState.focus + "\n" +
                "I would like to discuss booking my in-person screening at Garden 8."
            );
            window.open("https://wa.me/201000061243?text=" + text, "_blank");
        };

        // ==========================================================================
        // Facility Tour Video Reel Modal
        // ==========================================================================
        window.openVideoReel = function(e) {
            if (e && e.preventDefault) e.preventDefault();
            $("#inzanVideoModal").fadeIn(300);
            $("body").css("overflow", "hidden");
        };

        window.closeVideoReel = function() {
            $("#inzanVideoModal").fadeOut(250);
            $("body").css("overflow", "auto");
        };

        // ==========================================================================
        // Athlete Portal Gateway Modal
        // ==========================================================================
        window.openPortalModal = function(e) {
            if (e && e.preventDefault) e.preventDefault();
            $("#inzanPortalModal").fadeIn(300);
            $("body").css("overflow", "hidden");
        };

        window.closePortalModal = function() {
            $("#inzanPortalModal").fadeOut(250);
            $("body").css("overflow", "auto");
        };

        window.switchPortalTab = function(tabName) {
            $(".portal-tab-btn").removeClass("active");
            $(".portal-tab-btn[data-tab='" + tabName + "']").addClass("active");
            if (tabName === "login") {
                $("#portalTabLogin").show();
                $("#portalTabFeatures").hide();
            } else {
                $("#portalTabLogin").hide();
                $("#portalTabFeatures").show();
            }
        };

        window.handlePortalDemoLogin = function(e) {
            if (e && e.preventDefault) e.preventDefault();
            var $btn = $("#portalLoginBtn");
            $btn.prop("disabled", true).html('<i class="fa fa-circle-o-notch fa-spin"></i> Authenticating Athlete...');

            setTimeout(function() {
                $btn.prop("disabled", false).html('<i class="fa fa-sign-in mr-5"></i> Access Athlete Dashboard');
                $("#portalLoginFeedback").html(
                    '<div style="background:rgba(37,211,102,0.1); border:1px solid #25D366; border-radius:4px; padding:14px; margin-top:15px; color:#FFFFFF; font-size:12px; line-height:1.6;">' +
                        '<div style="color:#25D366; font-weight:700; font-size:13px; margin-bottom:4px;"><i class="fa fa-check-circle"></i> DEMO ATHLETE PROFILE LOADED</div>' +
                        'Athlete: <strong>Omar H. (ID: INZ-2026-084)</strong><br>' +
                        'Strain Today: <strong>14.2</strong> &bull; Recovery: <strong>88% (Green)</strong><br>' +
                        'Next Session: <strong>Today 6:30 PM &bull; S&C Team (Garden 8)</strong>' +
                    '</div>'
                );
                showToast("Connected to Inzan Athlete Cloud Demo!", "fa fa-bolt");
            }, 900);
        };

        // Close cinema modals on background click or ESC
        $("#inzanVideoModal, #inzanPortalModal").on("click", function(e) {
            if ($(e.target).closest(".inzan-cinema-dialog").length === 0) {
                closeVideoReel();
                closePortalModal();
            }
        });

        $(document).on("keydown", function(e) {
            if (e.key === "Escape") {
                closeVideoReel();
                closePortalModal();
            }
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
