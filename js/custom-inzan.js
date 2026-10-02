/**
 * INZAN ATHLETICS - Custom Commercial Gym Interactions & Scripts
 * Version: 4.0.0 (Immersive Next-Level Suite)
 */

(function($) {
    "use strict";

    // ==========================================================================
    // 1. Synthesized Web Audio Engine (Tactile UI Micro-Feedback, Opt-In)
    // ==========================================================================
    var audioCtx = null;
    var soundEnabled = false;

    // Check localStorage preference
    try {
        if (localStorage.getItem("inzan_sound") === "true") {
            soundEnabled = true;
        }
    } catch(e) {}

    function getAudioContext() {
        if (!audioCtx) {
            var AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playSyntheticTone(freq, duration, type) {
        if (!soundEnabled) return;
        try {
            var ctx = getAudioContext();
            if (!ctx) return;
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.type = type || "sine";
            osc.frequency.setValueAtTime(freq || 1050, ctx.currentTime);
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (duration || 0.04));
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + (duration || 0.04));
        } catch(e) {}
    }

    window.toggleInzanSound = function() {
        soundEnabled = !soundEnabled;
        try {
            localStorage.setItem("inzan_sound", soundEnabled ? "true" : "false");
        } catch(e) {}

        var $btn = $("#inzanSoundToggle");
        var $icon = $("#soundToggleIcon");
        var $text = $("#soundToggleText");

        if (soundEnabled) {
            $btn.addClass("sound-on");
            $icon.attr("class", "fa fa-volume-up");
            $text.text("Audio: On");
            playSyntheticTone(1200, 0.08, "triangle");
            showToast("Tactile Audio Enabled", "fa fa-volume-up");
        } else {
            $btn.removeClass("sound-on");
            $icon.attr("class", "fa fa-volume-off");
            $text.text("Audio: Off");
            showToast("Tactile Audio Muted", "fa fa-volume-off");
        }
    };

    function updateSoundToggleUI() {
        var $btn = $("#inzanSoundToggle");
        var $icon = $("#soundToggleIcon");
        var $text = $("#soundToggleText");
        if (soundEnabled) {
            $btn.addClass("sound-on");
            $icon.attr("class", "fa fa-volume-up");
            $text.text("Audio: On");
        } else {
            $btn.removeClass("sound-on");
            $icon.attr("class", "fa fa-volume-off");
            $text.text("Audio: Off");
        }
    }

    // ==========================================================================
    // 2. Cinematic Telemetry Preloader Engine
    // ==========================================================================
    function initCinematicPreloader() {
        var $preloader = $("#inzanPreloader");
        if ($preloader.length === 0) return;

        var hasLoadedBefore = false;
        try {
            hasLoadedBefore = sessionStorage.getItem("inzan_preloaded") === "true";
        } catch(e) {}

        var $num = $("#preloaderNum");
        var $bar = $("#preloaderBar");
        var $status = $("#preloaderStatus");

        var progress = 0;
        var targetDuration = hasLoadedBefore ? 350 : 1350;
        var startTime = null;

        var statusMessages = [
            { pct: 0, msg: "INITIALIZING KINETIC SYSTEMS..." },
            { pct: 28, msg: "CALIBRATING ELEIKO PLATFORMS..." },
            { pct: 58, msg: "SYNCHRONIZING NEW CAIRO TIMETABLE..." },
            { pct: 88, msg: "CONFIGURING ATHLETE CLOUD..." },
            { pct: 100, msg: "SYSTEM READY &bull; ACCESS GRANTED" }
        ];

        function getStatusMessage(p) {
            var current = statusMessages[0].msg;
            for (var i = 0; i < statusMessages.length; i++) {
                if (p >= statusMessages[i].pct) {
                    current = statusMessages[i].msg;
                }
            }
            return current;
        }

        function stepPreloader(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var rawPct = Math.min(100, Math.floor((elapsed / targetDuration) * 100));

            if (rawPct > progress) {
                progress = rawPct;
                $num.text(progress < 10 ? "0" + progress : progress);
                $bar.css("width", progress + "%");
                $status.html(getStatusMessage(progress));

                if (progress % 20 === 0 && soundEnabled) {
                    playSyntheticTone(800 + progress * 4, 0.02, "sine");
                }
            }

            if (progress < 100) {
                requestAnimationFrame(stepPreloader);
            } else {
                // Preloader 100% complete: Trigger shutter curtain reveal
                try {
                    sessionStorage.setItem("inzan_preloaded", "true");
                } catch(e) {}

                if (soundEnabled) {
                    playSyntheticTone(1450, 0.1, "triangle");
                }

                setTimeout(function() {
                    $preloader.addClass("loaded");
                    $("body").addClass("preloader-finished");

                    // Hide completely after curtain animation
                    setTimeout(function() {
                        $preloader.addClass("hidden-complete");
                    }, 850);
                }, 150);
            }
        }

        requestAnimationFrame(stepPreloader);
    }

    // ==========================================================================
    // 3. Hero Ambient Kinetic Mesh Canvas
    // ==========================================================================
    function initHeroParticles() {
        var canvas = document.getElementById("heroParticleCanvas");
        if (!canvas) return;
        var ctx = canvas.getContext("2d");
        if (!ctx) return;

        var width = 0;
        var height = 0;
        var particles = [];
        var maxParticles = window.innerWidth <= 768 ? 22 : 45;
        var maxDistance = window.innerWidth <= 768 ? 80 : 120;
        var animFrameId = null;
        var isCanvasVisible = true;

        var pointer = { x: null, y: null, radius: 140 };

        function resizeCanvas() {
            var parent = canvas.parentElement;
            if (!parent) return;
            width = canvas.width = parent.offsetWidth;
            height = canvas.height = parent.offsetHeight;
        }

        function createParticles() {
            particles = [];
            for (var i = 0; i < maxParticles; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    radius: Math.random() * 1.8 + 1,
                    alpha: Math.random() * 0.5 + 0.3
                });
            }
        }

        function draw() {
            if (!isCanvasVisible) return;
            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles
            for (var a = 0; a < particles.length; a++) {
                var p1 = particles[a];

                // Pointer interaction
                if (pointer.x !== null && pointer.y !== null) {
                    var dxp = pointer.x - p1.x;
                    var dyp = pointer.y - p1.y;
                    var distP = Math.sqrt(dxp * dxp + dyp * dyp);
                    if (distP < pointer.radius) {
                        var force = (pointer.radius - distP) / pointer.radius;
                        p1.x -= (dxp / distP) * force * 1.5;
                        p1.y -= (dyp / distP) * force * 1.5;
                    }
                }

                // Move particle
                p1.x += p1.vx;
                p1.y += p1.vy;

                // Bounce off edges
                if (p1.x < 0 || p1.x > width) p1.vx *= -1;
                if (p1.y < 0 || p1.y > height) p1.vy *= -1;

                // Draw dot
                ctx.beginPath();
                ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(37, 211, 102, " + p1.alpha + ")";
                ctx.fill();

                // Draw lines between particles
                for (var b = a + 1; b < particles.length; b++) {
                    var p2 = particles[b];
                    var dx = p1.x - p2.x;
                    var dy = p1.y - p2.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        var lineAlpha = (1 - dist / maxDistance) * 0.22;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = "rgba(37, 211, 102, " + lineAlpha + ")";
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            animFrameId = requestAnimationFrame(draw);
        }

        // Pointer listeners
        window.addEventListener("mousemove", function(e) {
            var rect = canvas.getBoundingClientRect();
            if (e.clientY <= rect.bottom && e.clientY >= rect.top) {
                pointer.x = e.clientX - rect.left;
                pointer.y = e.clientY - rect.top;
            } else {
                pointer.x = null;
                pointer.y = null;
            }
        });

        window.addEventListener("mouseleave", function() {
            pointer.x = null;
            pointer.y = null;
        });

        // Optimize performance: pause canvas when hero is out of view
        if ("IntersectionObserver" in window) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        if (!isCanvasVisible) {
                            isCanvasVisible = true;
                            draw();
                        }
                    } else {
                        isCanvasVisible = false;
                        cancelAnimationFrame(animFrameId);
                    }
                });
            }, { threshold: 0.05 });
            observer.observe(canvas.parentElement || canvas);
        }

        resizeCanvas();
        createParticles();
        draw();

        window.addEventListener("resize", function() {
            resizeCanvas();
        });
    }

    // ==========================================================================
    // 4. Desktop Precision Dual-Ring Cursor
    // ==========================================================================
    function initPrecisionCursor() {
        if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
            return; // Touch devices use native tap
        }

        var $dot = $("#inzanCursorDot");
        var $ring = $("#inzanCursorRing");
        if ($dot.length === 0 || $ring.length === 0) return;

        var mouseX = -100;
        var mouseY = -100;
        var ringX = -100;
        var ringY = -100;
        var isCursorInWindow = false;

        document.addEventListener("mousemove", function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isCursorInWindow) {
                isCursorInWindow = true;
                $dot.css("opacity", "1");
                $ring.css("opacity", "1");
            }
            $dot.css("transform", "translate3d(" + mouseX + "px, " + mouseY + "px, 0) translate(-50%, -50%)");
        });

        document.addEventListener("mouseleave", function() {
            isCursorInWindow = false;
            $dot.css("opacity", "0");
            $ring.css("opacity", "0");
        });

        // Hover expand on interactive elements
        var interactiveSelector = "a, button, .btn, .story-pill-item, .schedule-day-tab, .schedule-filter-pill, .diag-option-btn, .tilt-card, .inzan-mob-bar-btn";
        $(document).on("mouseenter", interactiveSelector, function() {
            $("body").addClass("cursor-active");
            if (soundEnabled) {
                playSyntheticTone(1400, 0.015, "sine");
            }
        });
        $(document).on("mouseleave", interactiveSelector, function() {
            $("body").removeClass("cursor-active");
        });

        // Butter-smooth lerp loop for the outer ring
        function renderCursorRing() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            $ring.css("transform", "translate3d(" + ringX + "px, " + ringY + "px, 0) translate(-50%, -50%)");
            requestAnimationFrame(renderCursorRing);
        }
        renderCursorRing();
    }

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

    // ==========================================================================
    // 6. Mobile Athletic Story Highlights Reel Controller
    // ==========================================================================
    var storyData = {
        facility: {
            author: "GARDEN 8 FACILITY",
            category: "HIGH PERFORMANCE CENTRE",
            title: "THE ARCHITECTURE OF ELITE TRAINING",
            desc: "Explore Egypt's leading sports science venue: competition Eleiko barbell platforms, custom gymnastic rig, 25-meter indoor sprint turf, and biomechanical testing lab.",
            image: "images/full-width-images/facility-1.jpg"
        },
        olympic: {
            author: "COACH AHMED M.",
            category: "OLYMPIC WEIGHTLIFTING",
            title: "TRIPLE EXTENSION & BAR VELOCITY",
            desc: "Technical progressions in the snatch and clean & jerk. High-speed video analysis and barbell trajectory tracking on Eleiko platforms.",
            image: "images/portfolio/projects-4.jpg"
        },
        sc: {
            author: "COACH YOUSSEF R.",
            category: "STRENGTH & CONDITIONING",
            title: "FORCE-VELOCITY & RFD LAB",
            desc: "Tri-phasic velocity-based power development. Measure explosive ground reaction force and anaerobic threshold.",
            image: "images/full-width-images/fac.jpg"
        },
        calisthenics: {
            author: "COACH KAREEM S.",
            category: "CALISTHENICS & RINGS",
            title: "RELATIVE BODYWEIGHT MASTERY",
            desc: "Strict gymnastic ring strength, front levers, handstand balance, and bulletproof scapular stabilization.",
            image: "images/portfolio/projects-5.jpg"
        },
        diagnostic: {
            author: "SPORTS SCIENCE TEAM",
            category: "MOVEMENT DIAGNOSTIC",
            title: "60-MIN BIOMECHANICAL SCREEN",
            desc: "Every athlete undergoes our joint mobility screen, kinetic asymmetry test, and force baseline before loaded programming.",
            image: "images/full-width-images/Test.jpg"
        },
        nutrition: {
            author: "HANADI H. (RD, CISSN)",
            category: "PERFORMANCE NUTRITION",
            title: "PERIODIZED FUEL & RECOMPOSITION",
            desc: "Custom macronutrient blueprints and intra-workout fueling to maximize neuromuscular output and recovery.",
            image: "images/full-width-images/ast.jpg"
        }
    };

    var storyKeys = ["facility", "olympic", "sc", "calisthenics", "diagnostic", "nutrition"];
    var currentStoryIdx = 0;
    var storyTimer = null;
    var storyProgressVal = 0;
    var storyDuration = 5000;
    var isStoryPaused = false;

    window.openStoryModal = function(key) {
        var idx = storyKeys.indexOf(key);
        currentStoryIdx = idx >= 0 ? idx : 0;
        $("#inzanStoryModal").css("display", "flex").hide().fadeIn(250);
        $("body").css("overflow", "hidden");
        loadStorySlide(currentStoryIdx);
        if (soundEnabled) playSyntheticTone(1150, 0.04, "sine");
    };

    window.closeStoryModal = function() {
        clearInterval(storyTimer);
        $("#inzanStoryModal").fadeOut(200);
        $("body").css("overflow", "auto");
    };

    function loadStorySlide(idx) {
        clearInterval(storyTimer);
        storyProgressVal = 0;
        $("#storyProgressFill").css("width", "0%");

        var key = storyKeys[idx];
        var item = storyData[key];
        if (!item) return;

        $("#storyAuthorName").text(item.author);
        $("#storyCategory").text(item.category);
        $("#storyCaptionTitle").text(item.title);
        $("#storyCaptionDesc").text(item.desc);
        $("#storyMediaView").attr("src", item.image);

        // Animate story progress bar
        var intervalTime = 50;
        var stepAmount = (intervalTime / storyDuration) * 100;

        storyTimer = setInterval(function() {
            if (!isStoryPaused) {
                storyProgressVal += stepAmount;
                $("#storyProgressFill").css("width", Math.min(100, storyProgressVal) + "%");
                if (storyProgressVal >= 100) {
                    clearInterval(storyTimer);
                    window.nextStorySlide();
                }
            }
        }, intervalTime);
    }

    window.nextStorySlide = function() {
        if (currentStoryIdx < storyKeys.length - 1) {
            currentStoryIdx++;
            loadStorySlide(currentStoryIdx);
            if (soundEnabled) playSyntheticTone(1250, 0.03, "sine");
        } else {
            window.closeStoryModal();
        }
    };

    window.prevStorySlide = function() {
        if (currentStoryIdx > 0) {
            currentStoryIdx--;
            loadStorySlide(currentStoryIdx);
            if (soundEnabled) playSyntheticTone(950, 0.03, "sine");
        }
    };

    // Pause story timer on touch/hold
    $(document).on("mousedown touchstart", ".story-media-view, .story-caption-overlay", function() {
        isStoryPaused = true;
    });
    $(document).on("mouseup touchend", ".story-media-view, .story-caption-overlay", function() {
        isStoryPaused = false;
    });

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
        $toast.html('<i class="' + iconClass + '" style="color:#25D366; font-size:18px;"></i> <span>' + message + '</span>');
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
            { time: "08:00 AM – 09:15 AM", cat: "sc", catName: "S&C", title: "Weekend Engine & Aerobic Base Building", coach: "Head Coach Youssef R.", ratio: "1:6 Ratio", intensity: "Moderate-High" },
            { time: "10:00 AM – 11:15 AM", cat: "calisthenics", catName: "Calisthenics", title: "Ring Muscle-Up Mastery & Core Levers", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Skill Focus" },
            { time: "04:30 PM – 06:00 PM", cat: "olympic", catName: "Olympic", title: "Olympic Lifting Video Kinematic Review", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Diagnostic" },
            { time: "06:15 PM – 07:30 PM", cat: "sc", catName: "S&C", title: "Friday Athletic Throwdown", coach: "Coaching Team", ratio: "1:8 Ratio", intensity: "High Intensity" },
            { time: "08:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Athlete Floor & Recovery Suites", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
        ],
        sat: [
            { time: "09:00 AM – 10:15 AM", cat: "sc", catName: "S&C", title: "Hypertrophy & Kinetic Structural Balance", coach: "Coach Youssef R.", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "11:00 AM – 12:30 PM", cat: "olympic", catName: "Olympic", title: "Olympic Weightlifting Club & Heavy Pulls", coach: "Coach Ahmed M.", ratio: "1:6 Ratio", intensity: "Heavy Focus" },
            { time: "04:00 PM – 05:15 PM", cat: "calisthenics", catName: "Calisthenics", title: "Acrobatic Fundamentals & Movement Flow", coach: "Coach Kareem S.", ratio: "1:6 Ratio", intensity: "Skill Focus" },
            { time: "05:30 PM – 07:00 PM", cat: "sc", catName: "S&C", title: "Sprint Acceleration & Deceleration Lab", coach: "Performance Staff", ratio: "1:6 Ratio", intensity: "Max Velocity" },
            { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Athlete Floor & Recovery Suites", coach: "Staff On Duty", ratio: "Unrestricted", intensity: "Open Access" }
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

        if (soundEnabled) playSyntheticTone(1500, 0.1, "triangle");
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

    // Athlete Portal Gateway Modal
    window.openPortalModal = function(e) {
        if (e && e.preventDefault) e.preventDefault();
        $("#inzanPortalModal").fadeIn(300);
        $("body").css("overflow", "hidden");
        if (soundEnabled) playSyntheticTone(1200, 0.04, "sine");
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
            if (soundEnabled) playSyntheticTone(1500, 0.12, "triangle");
            showToast("Connected to Inzan Athlete Cloud Demo!", "fa fa-bolt");
        }, 900);
    };

    // ==========================================================================
    // 9. Core Initializer
    // ==========================================================================
    var inzanInitialized = false;

    function initInzanFeatures() {
        if (inzanInitialized) return;
        inzanInitialized = true;

        // Initialize Immersive Suite
        initCinematicPreloader();
        initHeroParticles();
        initPrecisionCursor();
        init3DTilt();
        updateSoundToggleUI();

        // Render initial timetable & diagnostic
        renderSchedule();
        updateDiagUI();

        // Add spotlight divs to static tilt cards
        $(".roadmap-step, .coach-card").each(function() {
            $(this).addClass("tilt-card");
            if ($(this).find(".card-spotlight").length === 0) {
                $(this).prepend('<div class="card-spotlight"></div>');
            }
        });

        // Close modals on background click or ESC
        $("#inzanNewsModal, #inzanStoryModal").on("click", function(e) {
            if ($(e.target).closest(".inzan-modal-dialog, .story-modal-card").length === 0) {
                closeNewsModal();
                closeStoryModal();
            }
        });

        $("#inzanVideoModal, #inzanPortalModal").on("click", function(e) {
            if ($(e.target).closest(".inzan-cinema-dialog").length === 0) {
                closeVideoReel();
                closePortalModal();
            }
        });

        $(document).on("keydown", function(e) {
            if (e.key === "Escape") {
                closeNewsModal();
                closeStoryModal();
                closeVideoReel();
                closePortalModal();
                closeBottomDrawer();
            } else if (e.key === "ArrowRight") {
                if ($("#inzanStoryModal").is(":visible")) nextStorySlide();
            } else if (e.key === "ArrowLeft") {
                if ($("#inzanStoryModal").is(":visible")) prevStorySlide();
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

        // Mobile Nav Drawer Toggle
        $(".mobile-nav").on("click", function() {
            var $nav = $(".desktop-nav");
            var isExpanded = $(this).attr("aria-expanded") === "true";
            $(this).attr("aria-expanded", !isExpanded);

            if ($nav.hasClass("mobile-open")) {
                $nav.removeClass("mobile-open").slideUp(250);
            } else {
                $nav.addClass("mobile-open").slideDown(250);
            }
            if (soundEnabled) playSyntheticTone(1100, 0.03, "sine");
        });

        $(".desktop-nav a").on("click", function() {
            if ($(window).width() <= 1024) {
                $(".mobile-nav").attr("aria-expanded", "false");
                $(".desktop-nav").removeClass("mobile-open").slideUp(200);
            }
        });

        // ScrollSpy Navbar
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

            if ($(this).scrollTop() < 100) {
                navLinks.removeClass("active");
                $(".desktop-nav ul li a[href='#home']").addClass("active");
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
