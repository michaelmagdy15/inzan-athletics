/**
 * INZAN ATHLETICS - Custom Commercial Gym Interactions & Scripts
 * Version: 4.0.0 (Immersive Next-Level Suite)
 */

(function($) {
    "use strict";

    // ==========================================================================
    // Clean, authentic gym interactions (zero synthetic audio or fake canvas/HUD)
    // ==========================================================================
    var soundEnabled = false;
    function playSyntheticTone() {}
    window.toggleInzanSound = function() {};
    function updateSoundToggleUI() {}
    function initCinematicPreloader() {}
    function initHeroParticles() {}
    function initPrecisionCursor() {}

    // ==========================================================================
    // 5. 3D Perspective Card Tilt & Dynamic Spotlight Sheen
    // ==========================================================================
    function init3DTilt() {
        if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
            return;
        }

        $(document).on("mousemove", ".tilt-card", function(e) {
            var card = this;
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            // Set CSS vars for radial spotlight sheen
            card.style.setProperty("--mouse-x", x + "px");
            card.style.setProperty("--mouse-y", y + "px");

            // Compute 3D rotation
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
            var rotateY = ((x - centerX) / centerX) * 6;  // Max 6 deg

            card.style.transform = "perspective(800px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg) scale3d(1.02, 1.02, 1.02)";
        });

        $(document).on("mouseleave", ".tilt-card", function() {
            var card = this;
            card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    }

    // Story highlights no-op fallbacks
    window.openStoryModal = function() {};
    window.closeStoryModal = function() {};
    window.nextStorySlide = function() {};
    window.prevStorySlide = function() {};

    // ==========================================================================
    // 7. Mobile Quick Action Bottom Drawer Controller
    // ==========================================================================
    window.toggleBottomDrawer = function() {
        var $drawer = $("#inzanBottomDrawer");
        if ($drawer.is(":visible")) {
            window.closeBottomDrawer();
        } else {
            $drawer.css("display", "flex").hide().fadeIn(250);
            $("body").css("overflow", "hidden");
            if (soundEnabled) playSyntheticTone(1100, 0.04, "sine");
        }
    };

    window.closeBottomDrawer = function() {
        $("#inzanBottomDrawer").fadeOut(200);
        $("body").css("overflow", "auto");
    };

    window.handleDrawerBackdropClick = function(e) {
        if ($(e.target).closest(".inzan-drawer-panel").length === 0) {
            window.closeBottomDrawer();
        }
    };

    // ==========================================================================
    // 8. Core Content Data & Handlers (Articles, Schedule, Diagnostic)
    // ==========================================================================
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

    function showToast(message, iconClass) {
        iconClass = iconClass || "fa fa-check-circle";
        var $toast = $("#inzanToast");
        if ($toast.length === 0) return;
        $toast.html('<i class="' + iconClass + '" style="color:#FFFFFF; font-size:18px;"></i> <span>' + message + '</span>');
        $toast.stop(true, true).fadeIn(300).delay(4000).fadeOut(400);
    }
    window.showToast = showToast;

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
        if (soundEnabled) playSyntheticTone(1100, 0.04, "sine");
    };

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
        if (soundEnabled) playSyntheticTone(1050, 0.04, "sine");
    };

    window.closeNewsModal = function() {
        $("#inzanNewsModal").fadeOut(200);
        $("body").css("overflow", "auto");
    };

    // Schedule Timetable Dataset
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
            { time: "06:30 AM – 07:45 AM", cat: "calisthenics", catName: "Calisthenics", title: "Movement Prep & Spine Mobility Flow", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Mobility Focus" },
            { time: "11:00 AM – 12:15 PM", cat: "olympic", catName: "Olympic", title: "Clean & Jerk Technique Workshop", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Technical Focus" },
            { time: "05:30 PM – 06:45 PM", cat: "sc", catName: "S&C", title: "Posterior Chain & Deadlift Focus", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "07:15 PM – 08:30 PM", cat: "calisthenics", catName: "Calisthenics", title: "Handstand Balance & Scapular Control", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Skill Focus" },
            { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Training Floor", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
        ],
        wed: [
            { time: "06:30 AM – 07:45 AM", cat: "sc", catName: "S&C", title: "Explosive Power & Plyometrics", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "10:00 AM – 11:15 AM", cat: "calisthenics", catName: "Calisthenics", title: "Functional Mobility & Joint Longevity", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Restoration" },
            { time: "05:00 PM – 06:15 PM", cat: "olympic", catName: "Olympic", title: "Olympic Complexes & Turnover Speed", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Technical Focus" },
            { time: "07:00 PM – 08:15 PM", cat: "sc", catName: "S&C", title: "Metabolic Conditioning & Turf Sled Sprints", coach: "Performance Staff", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Training Floor", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
        ],
        thu: [
            { time: "06:30 AM – 07:45 AM", cat: "sc", catName: "S&C", title: "Foundational Squat & Strength", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "11:00 AM – 12:15 PM", cat: "calisthenics", catName: "Calisthenics", title: "Strict Gymnastics & Weighted Pull-Ups", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Strength Focus" },
            { time: "05:30 PM – 06:45 PM", cat: "sc", catName: "S&C", title: "Speed-Strength & Jump Mechanics", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "Power Focus" },
            { time: "07:15 PM – 08:30 PM", cat: "olympic", catName: "Olympic", title: "Olympic Lifting Barbell Technique", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Technical Focus" },
            { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Training Floor", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
        ],
        fri: [
            { time: "08:00 AM – 09:15 AM", cat: "sc", catName: "S&C", title: "Aerobic Base & Work Capacity", coach: "Head Coach Youssef R.", ratio: "1:6 Ratio", intensity: "Moderate-High" },
            { time: "10:00 AM – 11:15 AM", cat: "calisthenics", catName: "Calisthenics", title: "Ring Muscle-Up Progressions & Core", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Skill Focus" },
            { time: "04:30 PM – 06:00 PM", cat: "olympic", catName: "Olympic", title: "Olympic Lifting Video Technique Review", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Technical Focus" },
            { time: "06:15 PM – 07:30 PM", cat: "sc", catName: "S&C", title: "Friday Athletic Team Conditioning", coach: "Coaching Team", ratio: "1:8 Ratio", intensity: "High Intensity" },
            { time: "08:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Training Floor", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
        ],
        sat: [
            { time: "09:00 AM – 10:15 AM", cat: "sc", catName: "S&C", title: "Hypertrophy & Structural Balance", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "11:00 AM – 12:30 PM", cat: "olympic", catName: "Olympic", title: "Olympic Weightlifting Club & Heavy Pulls", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Heavy Focus" },
            { time: "04:00 PM – 05:15 PM", cat: "calisthenics", catName: "Calisthenics", title: "Movement Fundamentals & Flow", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Skill Focus" },
            { time: "05:30 PM – 07:00 PM", cat: "sc", catName: "S&C", title: "Sprint Acceleration & Deceleration Clinic", coach: "Performance Staff", ratio: "1:6 Ratio", intensity: "Max Velocity" },
            { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Training Floor", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
        ],
        sun: [
            { time: "07:00 AM – 08:15 AM", cat: "sc", catName: "S&C", title: "Early Sunday Power & Plyometrics", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "10:30 AM – 11:45 AM", cat: "calisthenics", catName: "Calisthenics", title: "Calisthenics Joint Prehab & Thoracic ROM", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Restorative" },
            { time: "05:00 PM – 06:15 PM", cat: "olympic", catName: "Olympic", title: "Snatch & Jerk Complex Integration", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Technical Focus" },
            { time: "06:30 PM – 07:45 PM", cat: "sc", catName: "S&C", title: "Total Body Functional Strength", coach: "Performance Staff", ratio: "1:6 Ratio", intensity: "High Intensity" },
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
            html += '<div class="schedule-card tilt-card">' +
                '<div class="card-spotlight"></div>' +
                '<div>' +
                    '<div class="schedule-card-top">' +
                        '<span class="schedule-time-badge"><i class="fa fa-clock-o mr-5"></i> ' + item.time + '</span>' +
                        '<span class="schedule-cat-badge">' + item.catName + '</span>' +
                    '</div>' +
                    '<h4 class="schedule-card-title">' + item.title + '</h4>' +
                    '<div class="schedule-card-meta">' +
                        '<span><i class="fa fa-user-circle"></i> ' + item.coach + '</span>' +
                        '<span><i class="fa fa-users"></i> ' + item.ratio + '</span>' +
                        '<span><i class="fa fa-bolt" style="color:#AAAAAA;"></i> ' + item.intensity + '</span>' +
                    '</div>' +
                '</div>' +
                '<button type="button" class="schedule-reserve-btn" onclick="bookScheduleSlot(\'' + item.title.replace(/'/g, "\\'") + '\', \'' + currentScheduleDay + '\', \'' + item.time + '\')">' +
                    '<i class="fa fa-calendar-plus-o mr-5"></i> Reserve Slot' +
                '</button>' +
            '</div>';
        });

        $container.html(html);
    }
    window.renderSchedule = renderSchedule;

    window.switchScheduleDay = function(day) {
        currentScheduleDay = day;
        $(".schedule-day-tab").removeClass("active");
        $(".schedule-day-tab[data-day='" + day + "']").addClass("active");
        renderSchedule();
        if (soundEnabled) playSyntheticTone(1200, 0.03, "sine");
    };

    window.filterScheduleCategory = function(cat) {
        currentScheduleFilter = cat;
        $(".schedule-filter-pill").removeClass("active");
        $(".schedule-filter-pill[data-filter='" + cat + "']").addClass("active");
        renderSchedule();
        if (soundEnabled) playSyntheticTone(1300, 0.03, "sine");
    };

    window.bookScheduleSlot = function(sessionName, day, time) {
        var dayNames = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
        var fullDay = dayNames[day] || day;
        
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

        if (soundEnabled) playSyntheticTone(1400, 0.08, "triangle");
        showToast("Selected: " + sessionName + " (" + fullDay + "). Complete your profile below!", "fa fa-calendar-check-o");
    };

    // Diagnostic Assessment Calculator Dataset
    var diagState = {
        step: 1,
        goal: "power",
        experience: "intermediate",
        frequency: "4-5",
        focus: "none"
    };

    var diagProtocols = {
        power: {
            title: "SPORT PERFORMANCE & SPEED TRACK",
            coach: "Coach Youssef R. (Head of Strength & Conditioning)",
            phase: "Sprint Mechanics, Acceleration & Power Development",
            frequency: "3–4 Small Group Sessions / Week",
            milestone: "Measured gains in vertical jump, sprint split & power output",
            pathwayVal: "Sport Performance"
        },
        olympic: {
            title: "OLYMPIC WEIGHTLIFTING TRACK",
            coach: "Coach Ahmed M. (Olympic Lifting Specialist)",
            phase: "Snatch, Clean & Jerk Technique, Mobility & Barbell Cycling",
            frequency: "3–4 Technical Sessions / Week",
            milestone: "Consistent bar path, deep receiving positions & steady PR progression",
            pathwayVal: "Strength Skills (Olympic & Calisthenics)"
        },
        calisthenics: {
            title: "CALISTHENICS & BODYWEIGHT STRENGTH TRACK",
            coach: "Coach Kareem S. (Gymnastics & Movement Specialist)",
            phase: "Scapular Control, Ring Work, Handstands & Lever Progressions",
            frequency: "3–4 Movement Sessions / Week",
            milestone: "Strict pull-up volume, ring muscle-up progression & joint durability",
            pathwayVal: "Strength Skills (Olympic & Calisthenics)"
        },
        hypertrophy: {
            title: "STRENGTH & CONDITIONING TRACK",
            coach: "Coaching Staff & Nutritional Guidance",
            phase: "Progressive Compound Overload, Hypertrophy & Work Capacity",
            frequency: "4 Sessions / Week",
            milestone: "Measurable gains in lean muscle mass, work capacity & strength benchmarks",
            pathwayVal: "Body Recomposition & Conditioning"
        },
        rehab: {
            title: "MOVEMENT RESTORATION & PRIVATE COACHING",
            coach: "Senior Coaching Staff & Movement Specialists",
            phase: "Joint Mobility, Muscle Imbalance Correction & Progressive Loading",
            frequency: "2–3 Private / Semi-Private Sessions / Week",
            milestone: "Pain-free movement patterns, restored range of motion & confident lifting",
            pathwayVal: "Private 1-on-1 Coaching"
        }
    };

    window.selectDiagOption = function(stepName, value, el) {
        diagState[stepName] = value;
        var $stepCard = $(el).closest(".diag-step-card");
        $stepCard.find(".diag-option-btn").removeClass("selected");
        $(el).addClass("selected");
        if (soundEnabled) playSyntheticTone(1250, 0.03, "sine");
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

    window.nextDiagStep = function() {
        if (diagState.step < 4) {
            diagState.step++;
            updateDiagUI();
        } else if (diagState.step === 4) {
            diagState.step = 5;
            updateDiagUI();
            renderDiagResult();
        }
        if (soundEnabled) playSyntheticTone(1350, 0.04, "sine");
    };

    window.prevDiagStep = function() {
        if (diagState.step > 1) {
            diagState.step--;
            updateDiagUI();
        }
        if (soundEnabled) playSyntheticTone(1000, 0.04, "sine");
    };

    window.applyDiagnosticToForm = function() {
        var proto = diagProtocols[diagState.goal] || diagProtocols["power"];
        $("#athleteGoal").val(proto.pathwayVal);

        var summaryNote = "PROGRAM FINDER RESULTS:\n" +
            "• Recommended Track: " + proto.title + "\n" +
            "• Primary Goal: " + diagState.goal.toUpperCase() + "\n" +
            "• Experience Level: " + diagState.experience.toUpperCase() + "\n" +
            "• Frequency: " + diagState.frequency + " days/week\n" +
            "• Training Focus: " + diagState.focus.toUpperCase();

        $("#athleteMessage").val(summaryNote);

        var $target = $("#assessment");
        if ($target.length > 0) {
            $("html, body").animate({
                scrollTop: $target.offset().top - 80
            }, 600, "easeInOutExpo", function() {
                $("#athleteName").focus();
            });
        }

        if (soundEnabled) playSyntheticTone(1500, 0.1, "triangle");
        showToast("Recommended track applied! Complete your details below.", "fa fa-check-circle");
    };

    window.consultDiagnosticWhatsApp = function() {
        var proto = diagProtocols[diagState.goal] || diagProtocols["power"];
        var text = encodeURIComponent(
            "Hi Inzan Athletics! I just completed the 60-Second Program Finder on your website.\n" +
            "My Recommended Track is: " + proto.title + "\n" +
            "Experience: " + diagState.experience + " | Frequency: " + diagState.frequency + " days/wk\n" +
            "Focus: " + diagState.focus + "\n" +
            "I would like to discuss booking an assessment session at Garden 8."
        );
        window.open("https://wa.me/201000061243?text=" + text, "_blank");
    };

    // Video Tour Cinema Lightbox
    window.openVideoReel = function(e) {
        if (e && e.preventDefault) e.preventDefault();
        $("#inzanVideoModal").fadeIn(300);
        $("body").css("overflow", "hidden");
        if (soundEnabled) playSyntheticTone(1100, 0.04, "sine");
    };

    window.closeVideoReel = function() {
        $("#inzanVideoModal").fadeOut(250);
        $("body").css("overflow", "auto");
    };

    // Member Portal Gateway Modal
    window.openPortalModal = function(e) {
        if (e && e.preventDefault) e.preventDefault();
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        var isMobile = /android|iphone|ipad|ipod|iemobile|mobile/i.test(userAgent);

        if (!isMobile) {
            window.location.href = "https://admin.inzanathletics.com";
            return false;
        }

        $("#inzanPortalModal").fadeIn(300);
        $("body").css("overflow", "hidden");
        if (soundEnabled) playSyntheticTone(1200, 0.04, "sine");
        return false;
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
        if (soundEnabled) playSyntheticTone(1300, 0.03, "sine");
    };

    window.handlePortalDemoLogin = function(e) {
        if (e && e.preventDefault) e.preventDefault();
        var $btn = $("#portalLoginBtn");
        $btn.prop("disabled", true).html('<i class="fa fa-circle-o-notch fa-spin"></i> Checking credentials...');

        setTimeout(function() {
            $btn.prop("disabled", false).html('<i class="fa fa-sign-in mr-5"></i> Member Sign In');
            $("#portalLoginFeedback").html(
                '<div style="background:rgba(255,255,255,0.06); border:1px solid #444444; border-radius:4px; padding:14px; margin-top:15px; color:#FFFFFF; font-size:12px; line-height:1.6;">' +
                    '<div style="color:#FFFFFF; font-weight:700; font-size:13px; margin-bottom:4px;"><i class="fa fa-check-circle mr-5"></i> ACTIVE MEMBER ACCOUNT</div>' +
                    'Member: <strong>Omar H. (Garden 8 Member)</strong><br>' +
                    'Current Plan: <strong>Small Group Strength (4x / week)</strong><br>' +
                    'Next Booked Class: <strong>Today 6:30 PM &bull; Strength & Conditioning with Coach Youssef</strong>' +
                '</div>'
            );
            if (soundEnabled) playSyntheticTone(1500, 0.12, "triangle");
            showToast("Member profile verified.", "fa fa-check");
        }, 900);
    };

    // ==========================================================================
    // LEONARDO.AI AESTHETIC SUITE CONTROLLERS
    // ==========================================================================

    // 1. Hero Athlete Pillar Switcher
    var heroPillars = {
        olympic: {
            badge: "STRENGTH SKILLS",
            coach: "Coach Ahmed M. (USAW/EWF Specialist)",
            title: "OLYMPIC WEIGHTLIFTING PLATFORM",
            desc: "Snatch, Clean & Jerk technical mastery on sanctioned competition platforms. Hook grip, bar velocity, and receiving depth under dedicated Olympic coaching.",
            sessions: "3–4",
            cap: "Max 6",
            spec: "Eleiko IPF",
            bg: "images/full-width-images/Test.jpg"
        },
        calisthenics: {
            badge: "MOVEMENT & MASTERY",
            coach: "Coach Kareem S. (Gymnastics Specialist)",
            title: "CALISTHENICS & RING STRENGTH",
            desc: "Strict ring muscle-ups, handstand alignment, front levers, and scapular bulletproofing. Build immense relative bodyweight strength and joint resilience.",
            sessions: "3–4",
            cap: "Max 6",
            spec: "Gymnastic Rig",
            bg: "images/full-width-images/ast.jpg"
        },
        sc: {
            badge: "SPORT PERFORMANCE",
            coach: "Coach Youssef R. (Head of S&C, CSCS)",
            title: "STRENGTH & CONDITIONING SQUAD",
            desc: "Progressive compound barbell loading, sprint acceleration, turf sled work, and anaerobic threshold conditioning. Maximum athletic output.",
            sessions: "4–5",
            cap: "Max 6",
            spec: "Rogue Turf",
            bg: "images/full-width-images/facility-1.jpg"
        }
    };

    window.switchHeroPillar = function(pillar) {
        var data = heroPillars[pillar];
        if (!data) return;

        $(".showcase-pill").removeClass("active");
        $(".showcase-pill[onclick*='" + pillar + "']").addClass("active");

        var $card = $("#heroPillarCard");
        $card.css("opacity", "0.7");
        setTimeout(function() {
            $("#heroPillarBg").css("background-image", "url('" + data.bg + "')");
            $("#heroPillarBadge").text(data.badge);
            $("#heroPillarCoach").text(data.coach);
            $("#heroPillarTitle").text(data.title);
            $("#heroPillarDesc").text(data.desc);
            $("#heroPillarSessions").text(data.sessions);
            $("#heroPillarCap").text(data.cap);
            $("#heroPillarSpec").text(data.spec);
            $card.css("opacity", "1");
        }, 150);
    };

    // 2. Bento Grid Facility Zone Switcher
    var bentoZones = {
        platforms: {
            tag: "OLYMPIC BARBELL BAYS",
            title: "Competition Barbell Platforms & Racks",
            desc: "Dedicated 8x8 Eleiko lifting platforms, calibrated bumper plates, and competition needle-bearing barbells. Designed for maximal power output without overcrowding.",
            bg: "images/full-width-images/fac.jpg"
        },
        turf: {
            tag: "25M SPRINT & ACCELERATION TRACK",
            title: "Heavy Prowlers, Sleds & Turf Lanes",
            desc: "Shock-absorbing dual-density indoor turf engineered for sprint acceleration, decelerations, sled pushes, and multi-directional speed drills.",
            bg: "images/full-width-images/facility-1.jpg"
        },
        rig: {
            tag: "GYMNASTIC & BODYWEIGHT RIGGING",
            title: "Custom Ceiling-Mounted Ring Rigs & Bars",
            desc: "Structural steel rig supporting competition wooden rings, parallel dip bars, and climbing ropes for advanced calisthenics and shoulder longevity.",
            bg: "images/full-width-images/ast.jpg"
        },
        recovery: {
            tag: "RECOVERY & PREP SUITE",
            title: "Movement Prep, Bands & Restoration Bays",
            desc: "Dedicated soft-tissue prep zones with hyperice percussion units, mobility bands, and foam rollers to optimize joint recovery between heavy splits.",
            bg: "images/full-width-images/facility-2.jpg"
        }
    };

    window.switchBentoZone = function(zoneKey, el) {
        var data = bentoZones[zoneKey];
        if (!data) return;

        $(".bento-pill").removeClass("active");
        $(el).addClass("active");

        $("#bentoFacilityBg").css("background-image", "url('" + data.bg + "')");
        $("#bentoZoneTag").text(data.tag);
        $("#bentoZoneTitle").text(data.title);
        $("#bentoZoneDesc").text(data.desc);
    };

    // 3. Bento Grid Kinetic Joint Screening Explorer
    var jointTests = {
        shoulder: {
            badge: "UPPER CHAIN SCREEN",
            name: "Overhead Dowel Mobility & T-Spine Extension",
            detail: "Evaluates active glenohumeral clearance, lat length, and rib cage flare. Ensures safe receiving positions for snatches and ring handstands.",
            outcome: "<i class=\"fa fa-check-circle mr-5\"></i> Fixes forward barbell drift & shoulder impingement"
        },
        hip: {
            badge: "POSTERIOR CHAIN SCREEN",
            name: "Hip Hinge Symmetry & Deep Squat Clearing",
            detail: "Measures femoral rotation, pelvic neutral control, and hamstring tension under hip flexion. Eliminates butt-wink and lower back shear force.",
            outcome: "<i class=\"fa fa-check-circle mr-5\"></i> Optimizes maximal squat depth & deadlift power"
        },
        ankle: {
            badge: "LOWER EXTREMITY SCREEN",
            name: "Weight-Bearing Ankle Dorsiflexion (Knee-to-Wall)",
            detail: "Quantifies tibial forward travel over talocrural joint. Tight ankles cause heel lift, valgus knee collapse, and missed Olympic snatches.",
            outcome: "<i class=\"fa fa-check-circle mr-5\"></i> Restores upright torso in cleans & Olympic receiving"
        },
        core: {
            badge: "TRUNK STIFFNESS SCREEN",
            name: "Rotational Core Anti-Extension & Bracing Test",
            detail: "Assesses intra-abdominal pressure generation and anti-rotation stability under unilateral loading. Protects lumbar spine under heavy compound lifts.",
            outcome: "<i class=\"fa fa-check-circle mr-5\"></i> 100% spinal rigidity during heavy pulls & squats"
        }
    };

    window.inspectJoint = function(jointKey, el) {
        var data = jointTests[jointKey];
        if (!data) return;

        $(".joint-btn").removeClass("active");
        $(el).addClass("active");

        $("#jointBadge").text(data.badge);
        $("#jointTestName").text(data.name);
        $("#jointTestDetail").text(data.detail);
        $("#jointTestOutcome").html(data.outcome);
    };

    // 4. Render Bento Schedule Ticker (Live Today at Inzan)
    function renderBentoScheduleTicker() {
        var $ticker = $("#bentoScheduleTicker");
        if ($ticker.length === 0) return;

        var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        var todayKey = days[new Date().getDay()] || "mon";
        var list = scheduleData[todayKey] || scheduleData["mon"];

        var html = "";
        var count = Math.min(3, list.length);
        for (var i = 0; i < count; i++) {
            var item = list[i];
            html += '<a href="#schedule" class="ticker-item">' +
                '<div>' +
                    '<div class="ticker-time"><i class="fa fa-clock-o mr-5"></i>' + item.time.split("–")[0].trim() + '</div>' +
                    '<div class="ticker-name">' + item.title + '</div>' +
                '</div>' +
                '<span class="ticker-badge open">' + item.catName + '</span>' +
            '</a>';
        }
        $ticker.html(html);
    }

    // 5. Athlete Track Studio (Interactive Playground)
    var studioState = {
        pillar: "sc",
        time: "morning",
        level: "intermediate"
    };

    var studioTracks = {
        sc: {
            title: "STRENGTH & CONDITIONING TRACK",
            coach: "Coach Youssef R. (CSCS)",
            split: "Barbell Overload • Turf Sled Sprints • Posterior Chain",
            bay: "Main Floor Racks & Turf Track",
            frequency: "4 Sessions / Week (Small Group Max 6)",
            goalVal: "Body Recomposition & Conditioning"
        },
        olympic: {
            title: "OLYMPIC WEIGHTLIFTING TRACK",
            coach: "Coach Ahmed M. (USAW L2 / EWF)",
            split: "Snatch Technique • Clean & Jerk • Pull Velocity",
            bay: "Competition 8x8 Eleiko Platform Bay",
            frequency: "3–4 Technical Lifting Sessions / Week",
            goalVal: "Strength Skills (Olympic & Calisthenics)"
        },
        calisthenics: {
            title: "CALISTHENICS & RING MASTERY TRACK",
            coach: "Coach Kareem S. (Gymnastics Specialist)",
            split: "Ring Support • Strict Levers • Scapular Bulletproofing",
            bay: "Structural Gymnastic Ceiling Rig",
            frequency: "3–4 Movement Sessions / Week",
            goalVal: "Strength Skills (Olympic & Calisthenics)"
        },
        private: {
            title: "PRIVATE 1-ON-1 ATHLETIC COACHING",
            coach: "Head Coaching Staff (Dedicated 1:1)",
            split: "Custom Biomechanical Periodization & Private Screening",
            bay: "Private VIP Lifting Station",
            frequency: "2–3 Private Sessions / Week",
            goalVal: "Private 1-on-1 Coaching"
        }
    };

    function updateStudioMonitor() {
        var track = studioTracks[studioState.pillar] || studioTracks["sc"];
        var timeLabel = (studioState.time === "morning") ? "Early Dawn (6:30 AM – 10:00 AM)" :
                        (studioState.time === "midday") ? "Midday (10:00 AM – 4:00 PM)" : "Evening Prime (5:00 PM – 9:00 PM)";
        var levelLabel = (studioState.level === "beginner") ? "Foundation / Novice" :
                         (studioState.level === "intermediate") ? "Intermediate Lifter" : "Competitive Athlete";

        $("#studioTrackTitle").text(track.title);
        $("#studioTrackDetail").text("Engineered for " + levelLabel + " training during " + timeLabel + ". Structured in strict small-group format with dedicated platform space.");
        $("#studioMetaCoach").text(track.coach);
        $("#studioMetaSplit").text(track.split);
        $("#studioMetaBay").text(track.bay);
        $("#studioMetaFreq").text(track.frequency);

        var waText = encodeURIComponent(
            "Hi Inzan Athletics! I just customized my program on your Athlete Track Studio:\n" +
            "• Track: " + track.title + "\n" +
            "• Preferred Window: " + timeLabel + "\n" +
            "• Experience Level: " + levelLabel + "\n" +
            "I'd like to book my 60-min baseline movement screening at Garden 8."
        );
        $("#studioWhatsAppBtn").attr("href", "https://wa.me/201000061243?text=" + waText);
    }

    window.selectStudioPillar = function(pillarKey, el) {
        studioState.pillar = pillarKey;
        $(".studio-seg-pill[data-group='pillar']").removeClass("active");
        $(el).addClass("active");
        updateStudioMonitor();
    };

    window.selectStudioTime = function(timeKey, el) {
        studioState.time = timeKey;
        $(".studio-seg-pill[data-group='time']").removeClass("active");
        $(el).addClass("active");
        updateStudioMonitor();
    };

    window.selectStudioLevel = function(levelKey, el) {
        studioState.level = levelKey;
        $(".studio-seg-pill[data-group='level']").removeClass("active");
        $(el).addClass("active");
        updateStudioMonitor();
    };

    window.applyStudioToBooking = function() {
        var track = studioTracks[studioState.pillar] || studioTracks["sc"];
        $("#athleteGoal").val(track.goalVal);
        
        var timeVal = (studioState.time === "morning") ? "Morning (6:00 AM – 10:00 AM)" :
                      (studioState.time === "midday") ? "Midday (10:00 AM – 4:00 PM)" : "Evening (4:00 PM – 11:00 PM)";
        $("#athleteTime").val(timeVal);

        var note = "ATHLETE TRACK STUDIO CONFIGURATION:\n" +
            "• Selected Track: " + track.title + "\n" +
            "• Preferred Timing: " + timeVal + "\n" +
            "• Experience Level: " + studioState.level.toUpperCase() + "\n" +
            "• Allocated Bay: " + track.bay;
        $("#athleteMessage").val(note);

        var $target = $("#assessment");
        if ($target.length > 0) {
            $("html, body").animate({
                scrollTop: $target.offset().top - 80
            }, 600, "easeInOutExpo", function() {
                $("#athleteName").focus();
            });
        }
        showToast("Studio Program configured! Complete your profile below.", "fa fa-check-circle");
    };

    // ==========================================================================
    // 9. Core Initializer
    // ==========================================================================
    var inzanInitialized = false;

    function initInzanFeatures() {
        if (inzanInitialized) return;
        inzanInitialized = true;

        init3DTilt();

        // Render initial timetable, ticker, studio, and diagnostic
        renderSchedule();
        renderBentoScheduleTicker();
        updateStudioMonitor();
        updateDiagUI();

        // Add spotlight divs to static tilt cards and bento cells
        $(".roadmap-step, .coach-card, .bento-cell, .leonardo-showcase-card, .leonardo-studio-card").each(function() {
            $(this).addClass("tilt-card");
            if ($(this).find(".card-spotlight").length === 0) {
                $(this).prepend('<div class="card-spotlight"></div>');
            }
        });

        // Close modals on background click or ESC
        $("#inzanNewsModal").on("click", function(e) {
            if ($(e.target).closest(".inzan-modal-dialog").length === 0) {
                closeNewsModal();
            }
        });

        $("#inzanVideoModal, #inzanPortalModal").on("click", function(e) {
            if ($(e.target).closest(".inzan-cinema-dialog, .inzan-modal-dialog").length === 0) {
                closeVideoReel();
                closePortalModal();
            }
        });

        $(document).on("keydown", function(e) {
            if (e.key === "Escape") {
                closeNewsModal();
                closeVideoReel();
                closePortalModal();
                closeBottomDrawer();
            }
        });

        // Facility Carousel
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

        // Zone Lightbox Grid
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

        // Dark Map Drawer & Leaflet Map
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
                        var lat = 30.0384;
                        var lng = 31.4782;

                        inzanMap = L.map("inzanMapContainer", {
                            center: [lat, lng],
                            zoom: 15,
                            zoomControl: true,
                            scrollWheelZoom: false
                        });

                        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
                            attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
                            subdomains: "abcd",
                            maxZoom: 19
                        }).addTo(inzanMap);

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

        // Assessment Booking Form
        $("#inzanContactForm").on("submit", function(e) {
            e.preventDefault();
            var $form = $(this);
            var $submitBtn = $("#submit_btn");

            if ($("#_anti_spam").val() !== "") {
                return false;
            }

            var name = $("#athleteName").val().trim();
            var phone = $("#athletePhone").val().trim();
            var email = $("#athleteEmail").val().trim();
            var goal = $("#athleteGoal").val();
            var timePref = $("#athleteTime").val() || "Anytime";
            var message = $("#athleteMessage").val().trim();

            $form.find(".inzan-form-control").css("border-color", "");

            if (!name || !phone || !email || !goal) {
                if (!name) $("#athleteName").css("border-color", "#FF4444");
                if (!phone) $("#athletePhone").css("border-color", "#FF4444");
                if (!email) $("#athleteEmail").css("border-color", "#FF4444");
                if (!goal) $("#athleteGoal").css("border-color", "#FF4444");

                showToast("Please complete all required fields (Name, Phone, Email, Goal).", "fa fa-exclamation-triangle");
                return;
            }

            $submitBtn.prop("disabled", true).html('<i class="fa fa-circle-o-notch fa-spin"></i> Reserving Assessment Slot...');

            setTimeout(function() {
                $submitBtn.prop("disabled", false).html("Confirm Assessment Request");
                
                $("#successAthleteName").text(name);
                $("#successAthleteGoal").text(goal);
                $("#successAthleteTime").text(timePref);
                
                var waMessage = encodeURIComponent("Hi Inzan Athletics! I just booked my 60-min assessment online.\nName: " + name + "\nPhone: " + phone + "\nGoal: " + goal + "\nPreferred Time: " + timePref + (message ? "\nNotes: " + message : ""));
                $("#successWhatsAppBtn").attr("href", "https://wa.me/201000061243?text=" + waMessage);

                $form.slideUp(300, function() {
                    $("#inzanSuccessBox").slideDown(350);
                });

                if (soundEnabled) playSyntheticTone(1500, 0.15, "triangle");
                showToast("Assessment booked! Welcome to Inzan Athletics, " + name + ".", "fa fa-check-circle");
            }, 800);
        });

        // Newsletter Form
        $("#newsletterForm").on("submit", function(e) {
            e.preventDefault();
            var email = $("#newsletterEmail").val().trim();
            var $btn = $(this).find("button[type='submit']");

            if (!email) return;

            $btn.prop("disabled", true).html('<i class="fa fa-circle-o-notch fa-spin"></i> Subscribing...');

            setTimeout(function() {
                $btn.prop("disabled", false).html("Subscribe");
                $("#newsletterEmail").val("");
                if (soundEnabled) playSyntheticTone(1400, 0.08, "triangle");
                showToast("Subscribed! Performance Intel will be sent to " + email, "fa fa-check-circle");
            }, 600);
        });

        // Architectural Mobile Nav Drawer Controller
        function openMobileMenu() {
            var $nav = $(".desktop-nav");
            var $btn = $(".mobile-nav");
            $btn.addClass("is-active active").attr("aria-expanded", "true");
            $nav.addClass("mobile-open js-opened").css("display", "block");
            $("body").addClass("mobile-nav-open").css("overflow", "hidden");
            if (soundEnabled) playSyntheticTone(1100, 0.03, "sine");
        }

        function closeMobileMenu() {
            var $nav = $(".desktop-nav");
            var $btn = $(".mobile-nav");
            $btn.removeClass("is-active active").attr("aria-expanded", "false");
            $nav.removeClass("mobile-open js-opened").css("display", "none");
            $("body").removeClass("mobile-nav-open").css("overflow", "");
        }

        window.openMobileMenu = openMobileMenu;
        window.closeMobileMenu = closeMobileMenu;

        // Mobile Nav Drawer Toggle
        $(".mobile-nav").off("click").on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            if ($(".desktop-nav").hasClass("mobile-open") || $(".desktop-nav").hasClass("js-opened")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Precision Smooth Scroll Navigation Engine
        function smoothScrollToTarget(targetId) {
            if (!targetId || targetId === "#") return;
            var cleanId = targetId.replace(/^#/, "");
            var $target = (cleanId === "top" || cleanId === "home") ? $("body") : $("#" + cleanId);

            if ($target.length) {
                // If mobile drawer is open, close it cleanly
                if ($(".desktop-nav").hasClass("mobile-open") || $(".desktop-nav").hasClass("js-opened")) {
                    closeMobileMenu();
                }

                var navHeight = $(".main-nav").outerHeight() || 60;
                var targetTop = 0;

                if (cleanId === "top" || cleanId === "home") {
                    targetTop = 0;
                } else {
                    var $heading = $target.find(".section-title, .inzan-subheading, h2, h1").first();
                    if ($heading.length) {
                        targetTop = Math.max(0, $heading.offset().top - navHeight - 16);
                    } else {
                        targetTop = Math.max(0, $target.offset().top - navHeight - 10);
                    }
                }

                try {
                    window.scrollTo({
                        top: targetTop,
                        behavior: "smooth"
                    });
                } catch(e) {
                    $("html, body").stop().animate({
                        scrollTop: targetTop
                    }, 450);
                }
            }
        }

        window.smoothScrollToTarget = smoothScrollToTarget;

        // Intercept clicks on internal anchor links
        $(document).on("click", "a[href^='#']", function(e) {
            var href = $(this).attr("href");
            if (href && href.charAt(0) === "#" && href.length > 1) {
                // If button triggers modal or has custom JS, let its handler run
                if ($(this).hasClass("nav-portal-btn") || $(this).hasClass("work-lightbox-link") || $(this).attr("onclick")) {
                    if ($(".desktop-nav").hasClass("mobile-open")) {
                        closeMobileMenu();
                    }
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                smoothScrollToTarget(href);
            }
        });

        // Dual ScrollSpy (Desktop Navbar + Mobile Bottom Dock)
        var spySections = $("section[id], div[id='home']");
        var desktopNavLinks = $(".desktop-nav ul li a");
        var mobileDockButtons = $(".inzan-mob-bar-btn");

        $(window).on("scroll", function() {
            var scrollPos = $(this).scrollTop();
            var headerHeight = $(".main-nav").outerHeight() || 60;
            var curPos = scrollPos + headerHeight + 35;

            var activeSection = "home";
            spySections.each(function() {
                var top = $(this).offset().top;
                var bottom = top + $(this).outerHeight();
                var id = $(this).attr("id");

                if (curPos >= top && curPos <= bottom) {
                    activeSection = id;
                }
            });

            if (scrollPos < 100) {
                activeSection = "home";
            }

            // Sync Desktop Nav Active State
            desktopNavLinks.removeClass("active");
            $(".desktop-nav ul li a[href='#" + activeSection + "']").addClass("active");

            // Sync Mobile Dock Active State
            mobileDockButtons.removeClass("active");
            if (activeSection === "zone-training") {
                $(".inzan-mob-bar-btn[onclick*='toggleBottomDrawer']").addClass("active");
            } else if (activeSection === "schedule") {
                $(".inzan-mob-bar-btn[href='#schedule']").addClass("active");
            } else if (activeSection === "assessment") {
                $(".inzan-mob-bar-btn[href='#assessment']").addClass("active");
            }
        });
    }

    // Attach to DOM ready
    $(document).ready(initInzanFeatures);

    // Fallback: If DOM is already interactive or complete
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(initInzanFeatures, 1);
    } else {
        document.addEventListener("DOMContentLoaded", initInzanFeatures);
    }

})(jQuery);
