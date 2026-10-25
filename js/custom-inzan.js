/**
 * INZAN ATHLETICS - Custom Commercial Gym Interactions & Live System Sync
 * Version: 6.0.0 (Live CRM Sync: Packages, Coaches, Schedule & Member App Assessment)
 * Connected to: faa-test-guide-v2 / db-inzanathletics (admin.inzanathletics.com)
 */

(function($) {
    "use strict";

    var FIRESTORE_BASE_URL = "https://firestore.googleapis.com/v1/projects/faa-test-guide-v2/databases/db-inzanathletics/documents";
    var CRM_API_BASE_URL = "https://admin.inzanathletics.com";

    // ==========================================================================
    // Clean, authentic gym interactions
    // ==========================================================================
    var soundEnabled = false;
    function playSyntheticTone() {}
    window.toggleInzanSound = function() {};

    // ==========================================================================
    // 1. 3D Perspective Card Tilt & Dynamic Spotlight Sheen
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

            card.style.setProperty("--mouse-x", x + "px");
            card.style.setProperty("--mouse-y", y + "px");

            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -5;
            var rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = "perspective(800px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg) scale3d(1.01, 1.01, 1.01)";
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
    // 2. Mobile Quick Action Bottom Drawer Controller
    // ==========================================================================
    window.toggleBottomDrawer = function() {
        var $drawer = $("#inzanBottomDrawer");
        if ($drawer.is(":visible")) {
            window.closeBottomDrawer();
        } else {
            $drawer.css("display", "flex").hide().fadeIn(250);
            $("body").css("overflow", "hidden");
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
    // 3. Toast Helper
    // ==========================================================================
    function showToast(message, iconClass) {
        iconClass = iconClass || "fa fa-check-circle";
        var $toast = $("#inzanToast");
        if ($toast.length === 0) return;
        $toast.html('<i class="' + iconClass + '" style="color:#FFFFFF; font-size:18px;"></i> <span>' + message + '</span>');
        $toast.stop(true, true).fadeIn(300).delay(4200).fadeOut(400);
    }
    window.showToast = showToast;

    // ==========================================================================
    // 4. Real Inzan Coaches, Packages & Schedule Datasets (Synced with CRM)
    // ==========================================================================
    var inzanCoachesCatalog = [
        { id: "coach_ahmed_tarek", name: "Ahmed Tarek", specialty: "Head of Strength & Conditioning", category: "Personal Training", certifications: "CSCS • Athletic Performance Specialist", bio: "Specializes in force-velocity profiling, athletic strength development, compound barbell mechanics, and injury-resilient programming.", image: "images/full-width-images/fac.jpg", featuredOnWebsite: true, sortOrder: 1 },
        { id: "coach_beezo", name: "Beezo", specialty: "Senior Strength & Performance Coach", category: "Personal Training", certifications: "Senior S&C • Metabolic Conditioning", bio: "High-intensity strength and athletic conditioning leader focused on explosive power, work capacity, and body recomposition.", image: "images/full-width-images/facility-1.jpg", featuredOnWebsite: true, sortOrder: 2 },
        { id: "coach_akram_hammad", name: "Akram Hammad", specialty: "Olympic Weightlifting & Power Specialist", category: "Personal Training", certifications: "EWF • Weightlifting & Power Coach", bio: "Specialist in the snatch, clean & jerk, barbell velocity, triple extension mechanics, and explosive lower-body power.", image: "images/portfolio/projects-4.jpg", featuredOnWebsite: true, sortOrder: 3 },
        { id: "coach_ahmed_ezzat", name: "Ahmed Ezzat", specialty: "Strength & Hypertrophy Specialist", category: "Personal Training", certifications: "ISSA • Biomechanics & Hypertrophy", bio: "Focuses on progressive overload, structural balance, joint-friendly hypertrophy, and postural mechanics.", image: "images/full-width-images/facility-2.jpg", featuredOnWebsite: true, sortOrder: 4 },
        { id: "coach_bassem_youssef", name: "Bassem Youssef", specialty: "Functional Strength & Athletic Conditioning", category: "Personal Training", certifications: "Functional Strength • Mobility Specialist", bio: "Builds durable athletes through multi-planar strength, core stiffness, and energy system conditioning.", image: "images/full-width-images/Test.jpg", featuredOnWebsite: true, sortOrder: 5 },
        { id: "coach_kareem_awny", name: "Kareem Awny", specialty: "Calisthenics & Gymnastics Lead", category: "Studio & Academies", certifications: "Calisthenics & Ring Strength Specialist", bio: "Leads Inzan's Calisthenics Academy, specializing in gymnastic ring strength, strict muscle-up progressions, handstand balance, and scapular control.", image: "images/portfolio/projects-5.jpg", featuredOnWebsite: true, sortOrder: 6 },
        { id: "coach_heidi_el_hariri", name: "Heidi El Hariri", specialty: "Women's Strength & Studio Lead", category: "Studio & Academies", certifications: "Group Conditioning & Women's Performance", bio: "Specializes in women's strength training, metabolic conditioning, glute & core mechanics, and high-energy small group coaching.", image: "images/full-width-images/ast.jpg", featuredOnWebsite: true, sortOrder: 7 },
        { id: "coach_melissia_magdy", name: "Dr. Melissia Magdy", specialty: "Clinical & Sports Nutrition Specialist", category: "Allied Health", certifications: "Clinical Dietitian • Sports Nutrition & InBody", bio: "Designs individualized sports nutrition blueprints, macronutrient periodization, and body recomposition plans aligned with your training load.", image: "images/full-width-images/ast.jpg", featuredOnWebsite: true, sortOrder: 8 },
        { id: "coach_dr_heba", name: "Dr. Heba", specialty: "Sports Physiotherapy & Recovery Lead", category: "Allied Health", certifications: "DPT • Orthopedic & Sports Rehabilitation", bio: "Leads movement screening, injury rehabilitation, dry needling, manual therapy, and return-to-sport protocols.", image: "images/full-width-images/facility-2.jpg", featuredOnWebsite: false, sortOrder: 9 },
        { id: "coach_moaz_azoz", name: "Moaz Azoz", specialty: "Calisthenics & Bodyweight Mastery", category: "Studio & Academies", certifications: "Calisthenics Academy Coach", bio: "Coaches strict bodyweight progressions, levers, bar dynamics, and upper-body relative strength.", image: "images/portfolio/projects-5.jpg", featuredOnWebsite: false, sortOrder: 10 },
        { id: "coach_kogy", name: "Kogy", specialty: "Boxing & Striking Conditioning Coach", category: "Studio & Academies", certifications: "Boxing & Combat Conditioning", bio: "Delivers technical boxing combinations, footwork, head movement, and combat anaerobic conditioning.", image: "images/full-width-images/facility-1.jpg", featuredOnWebsite: false, sortOrder: 11 },
        { id: "coach_mariam_atef", name: "Mariam Atef", specialty: "Mobility, Flexibility & Core Specialist", category: "Studio & Academies", certifications: "Mobility Flow & Postural Control", bio: "Helps athletes unlock thoracic, hip, and ankle range of motion while building deep core stability.", image: "images/full-width-images/ast.jpg", featuredOnWebsite: false, sortOrder: 12 },
        { id: "coach_nour_amin", name: "Nour Amin", specialty: "Athletic Conditioning & SGF Coach", category: "Studio & Academies", certifications: "Small Group Fitness & Conditioning", bio: "Coaches small group functional sessions focused on speed, agility, and metabolic stamina.", image: "images/full-width-images/fac.jpg", featuredOnWebsite: false, sortOrder: 13 },
        { id: "coach_zeyad_gad", name: "Zeyad Gad", specialty: "Strength & Conditioning Coach", category: "Studio & Academies", certifications: "Strength & Athletic Development", bio: "Guides athletes through foundational barbell lifts, sprint mechanics, and structured strength blocks.", image: "images/portfolio/projects-4.jpg", featuredOnWebsite: false, sortOrder: 14 },
        { id: "coach_begad_amr", name: "Begad Amr", specialty: "Youth Athletics & Performance Coach", category: "Studio & Academies", certifications: "Youth Athletic Development", bio: "Develops coordination, speed, and foundational strength for youth and emerging competitive athletes.", image: "images/full-width-images/Test.jpg", featuredOnWebsite: false, sortOrder: 15 },
        { id: "coach_mazen", name: "Mazen", specialty: "Strength & Functional Training Coach", category: "Studio & Academies", certifications: "Functional Strength Coach", bio: "Focuses on compound lifting technique, kettlebell mechanics, and full-body conditioning.", image: "images/full-width-images/facility-1.jpg", featuredOnWebsite: false, sortOrder: 16 },
        { id: "coach_abdelrahman_jad", name: "Abdelrahman Jad", specialty: "Performance & Conditioning Coach", category: "Studio & Academies", certifications: "Athletic Conditioning Specialist", bio: "Coaches high-output conditioning and progressive strength tracks on the main training floor.", image: "images/full-width-images/fac.jpg", featuredOnWebsite: false, sortOrder: 17 },
        { id: "coach_farida_hosny", name: "Farida Hosny", specialty: "Studio & Functional Fitness Coach", category: "Studio & Academies", certifications: "Group Fitness & Toning Specialist", bio: "Leads dynamic studio conditioning, lower-body sculpting, and core endurance sessions.", image: "images/full-width-images/ast.jpg", featuredOnWebsite: false, sortOrder: 18 },
        { id: "coach_farida_nabil", name: "Farida Nabil", specialty: "Studio & Movement Specialist", category: "Studio & Academies", certifications: "Movement & Functional Studio Coach", bio: "Specializes in functional movement flows, core control, and posture correction.", image: "images/full-width-images/ast.jpg", featuredOnWebsite: false, sortOrder: 19 },
        { id: "coach_haya_khaled", name: "Haya Khaled", specialty: "Women's Conditioning & Studio Coach", category: "Studio & Academies", certifications: "Studio & Athletic Conditioning", bio: "Empowering group classes and athletic conditioning tailored for all fitness levels.", image: "images/full-width-images/facility-2.jpg", featuredOnWebsite: false, sortOrder: 20 },
        { id: "coach_sarah_maghawry", name: "Sarah Maghawry", specialty: "Group Fitness & Core Specialist", category: "Studio & Academies", certifications: "Studio & Core Conditioning", bio: "High-energy studio instruction combining metabolic intervals with controlled strength work.", image: "images/full-width-images/ast.jpg", featuredOnWebsite: false, sortOrder: 21 },
        { id: "coach_christine_sonia", name: "Christine Sonia", specialty: "Dance Fitness & Rhythm Conditioning", category: "Studio & Academies", certifications: "Studio Rhythm & Cardio Specialist", bio: "Brings high-energy rhythm, coordination, and cardiovascular conditioning to the Inzan studio.", image: "images/full-width-images/facility-2.jpg", featuredOnWebsite: false, sortOrder: 22 },
        { id: "coach_nada_khayal", name: "Nada Khayal", specialty: "Studio & Mobility Coach", category: "Studio & Academies", certifications: "Mobility & Studio Specialist", bio: "Focuses on active recovery, joint longevity, and body control.", image: "images/full-width-images/ast.jpg", featuredOnWebsite: false, sortOrder: 23 },
        { id: "coach_carol_hany", name: "Carol Hany", specialty: "Functional Studio & Toning Coach", category: "Studio & Academies", certifications: "Studio Strength & Toning", bio: "Coaches structured studio sessions emphasizing form, tempo, and muscular endurance.", image: "images/full-width-images/facility-2.jpg", featuredOnWebsite: false, sortOrder: 24 },
        { id: "coach_sabina", name: "Sabina", specialty: "Flexibility, Pilates & Core Flow", category: "Studio & Academies", certifications: "Pilates & Postural Alignment", bio: "Specializes in core stabilization, spinal alignment, and controlled flexibility training.", image: "images/full-width-images/ast.jpg", featuredOnWebsite: false, sortOrder: 25 },
        { id: "coach_semary", name: "Semary Coach", specialty: "Floor Strength & Conditioning Coach", category: "Personal Training", certifications: "Floor Service & Strength Guidance", bio: "Provides hands-on floor supervision, spotting, and movement cues across all lifting zones.", image: "images/full-width-images/fac.jpg", featuredOnWebsite: false, sortOrder: 26 }
    ];

    var inzanPackagesCatalog = [
        // 1. GYM MEMBERSHIPS
        {
            id: "pkg_inzan_1_month",
            name: "1 Month Gym Membership",
            category: "Memberships",
            price: 5500,
            duration: "1 Month (30 Days)",
            sessions: 30,
            description: "Full access to Inzan Athletics main training floor, Eleiko platforms, gymnastic rig, and turf track.",
            features: ["Full Gym Floor & Turf Access", "1 InBody Composition Scan", "3 Complimentary PT Assessment Sessions (Valid 1 Week)", "2 Guest Invitations"],
            badge: "SHORT TERM",
            featuredOnWebsite: true,
            sortOrder: 1
        },
        {
            id: "pkg_inzan_3_months",
            name: "3 Months Gym Membership",
            category: "Memberships",
            price: 13200,
            duration: "3 Months (90 Days)",
            sessions: 90,
            description: "Quarterly athletic membership ideal for structured 12-week training blocks and measurable strength progression.",
            features: ["Full Gym Floor & Recovery Access", "3 InBody Scans + 3 Free PT Sessions", "5 Guest Invitations", "Up to 14 Days Freeze Allowance"],
            badge: "POPULAR",
            featuredOnWebsite: true,
            sortOrder: 2
        },
        {
            id: "pkg_inzan_6_months",
            name: "6 Months Gym Membership",
            category: "Memberships",
            price: 22000,
            duration: "6 Months (180 Days)",
            sessions: 180,
            description: "Half-year performance membership with comprehensive baseline screening, nutrition check-ins, and freeze flexibility.",
            features: ["Full Facility & Open Platform Access", "6 InBody Scans + 3 Free PT Sessions", "10 Guest Invitations", "Up to 30 Days Freeze Allowance"],
            badge: "BEST VALUE",
            featuredOnWebsite: true,
            sortOrder: 3
        },
        {
            id: "pkg_inzan_basic_annual",
            name: "Basic Annual Membership (12 Months)",
            category: "Memberships",
            price: 30000,
            duration: "12 Months (365 Days)",
            sessions: 365,
            description: "Year-round access to Inzan Athletics in Garden 8 with 3 complimentary PT onboarding sessions (valid 1 week).",
            features: ["365 Days Full Gym Access", "3 Complimentary PT Sessions (Valid 1 Week)", "12 Monthly InBody Scans & 15 Invitations", "30 Days Membership Freeze"],
            badge: "ANNUAL",
            featuredOnWebsite: true,
            sortOrder: 4
        },
        {
            id: "pkg_inzan_premium_annual",
            name: "Premium Annual Membership (12 Months)",
            category: "Memberships",
            price: 40000,
            duration: "12 Months (365 Days)",
            sessions: 365,
            description: "Our flagship all-inclusive annual tier with 6 complimentary PT sessions (valid 2 weeks), priority booking, and VIP perks.",
            features: ["365 Days All-Access Membership", "6 Complimentary PT Sessions (Valid 2 Weeks)", "Unlimited InBody Scans & 20 Guest Invites", "45 Days Freeze + Nutrition Consultation"],
            badge: "FLAGSHIP VIP",
            featuredOnWebsite: true,
            sortOrder: 5
        },
        {
            id: "pkg_inzan_youth_under16",
            name: "Youth Athletic Membership [Under 16]",
            category: "Memberships",
            price: 10000,
            duration: "3 Months (90 Days)",
            sessions: 90,
            description: "Supervised athletic development membership for youth athletes under 16 focusing on coordination, speed, and safe mechanics.",
            features: ["Supervised Youth Training Hours", "60-Min Biomechanical Movement Screen", "Age-Appropriate Strength & Speed Progression", "2 InBody Growth & Composition Checks"],
            badge: "YOUTH U16",
            featuredOnWebsite: true,
            sortOrder: 6
        },
        // 2. PERSONAL TRAINING (PT)
        {
            id: "pkg_inzan_pt_single",
            name: "1-on-1 Personal Training (Single Session)",
            category: "Personal Training",
            price: 1500,
            duration: "7 Days Validity",
            sessions: 1,
            description: "Single 60-minute private coaching session for technique review, Olympic lift tuning, or movement diagnostics.",
            features: ["60-Min Dedicated 1-on-1 Coaching", "Barbell Video Technique Breakdown", "Custom Warmup & Mobility Prescription"],
            badge: "DROP-IN PT",
            featuredOnWebsite: true,
            sortOrder: 7
        },
        {
            id: "pkg_inzan_pt_12",
            name: "PT Transformation Package (12 Sessions)",
            category: "Personal Training",
            price: 13200,
            duration: "1 Month Expiry",
            sessions: 12,
            description: "Our standard 1-month private coaching block (3x/week). Includes complimentary initial assessment and custom programming.",
            features: ["12 Private 1-on-1 Sessions (Valid 1 Month)", "Complimentary 60-Min Fitness Assessment", "Custom Periodized Training Blueprint", "Up to 1 Week Freeze Allowed"],
            badge: "MOST BOOKED PT",
            featuredOnWebsite: true,
            sortOrder: 8
        },
        {
            id: "pkg_inzan_pt_24",
            name: "PT Elite Performance Block (24 Sessions)",
            category: "Personal Training",
            price: 23000,
            duration: "2 Months Expiry",
            sessions: 24,
            description: "Intensive 24-session private coaching package engineered for dramatic body recomposition, strength PRs, or competition prep.",
            features: ["24 Private 1-on-1 Coaching Sessions", "Complimentary Baseline & Mid-Block Re-Test", "2 Sports Nutrition Consultations", "Priority Platform & Coach Scheduling"],
            badge: "ELITE PT",
            featuredOnWebsite: true,
            sortOrder: 9
        },
        // 3. ACADEMIES & SGF
        {
            id: "pkg_inzan_calisthenics_12",
            name: "Inzan Calisthenics Academy (12 Sessions)",
            category: "Academies & SGF",
            price: 6000,
            duration: "1 Month (12 Sessions)",
            sessions: 12,
            description: "Coached by Coach Kareem Awny & Coach Moaz Azoz. Master gymnastic rings, strict muscle-ups, handstands, and levers.",
            features: ["12 Coached Academy Sessions (3x / Week)", "Strict 1:6 Coach-to-Athlete Ratio", "Ring Support, Handstand & Lever Progressions", "Scapular & Wrist Bulletproofing"],
            badge: "ACADEMY",
            featuredOnWebsite: true,
            sortOrder: 10
        },
        {
            id: "pkg_inzan_sgf_12",
            name: "Small Group Fitness - SGF (12 Sessions)",
            category: "Academies & SGF",
            price: 6000,
            duration: "1 Month (12 Sessions)",
            sessions: 12,
            description: "High-performance small group Strength & Conditioning and Olympic lifting sessions capped at 6 athletes per platform.",
            features: ["12 Small Group S&C / Weightlifting Sessions", "Strict 1:6 Platform Cap", "Force-Velocity & Compound Barbell Tracking", "Morning & Evening Shifts Available"],
            badge: "1:6 SMALL GROUP",
            featuredOnWebsite: true,
            sortOrder: 11
        },
        {
            id: "pkg_inzan_sgf_24",
            name: "Small Group Fitness - SGF (24 Sessions)",
            category: "Academies & SGF",
            price: 10500,
            duration: "2 Months (24 Sessions)",
            sessions: 24,
            description: "8-week Small Group Performance package combining barbell strength, turf conditioning, and technical skill work.",
            features: ["24 Small Group Sessions (Valid 60 Days)", "1:6 Coach-to-Athlete Ratio", "Includes Day-1 Assessment & Day-30 Re-Test", "Access to All S&C and Olympic Tracks"],
            badge: "8-WEEK TRACK",
            featuredOnWebsite: true,
            sortOrder: 12
        },
        // 4. STUDIO CLASSES
        {
            id: "pkg_inzan_boxing_8",
            name: "Boxing & Striking Studio (8 Sessions)",
            category: "Studio Classes",
            price: 4500,
            duration: "1 Month (8 Sessions)",
            sessions: 8,
            description: "Technical boxing, footwork, pad work, and combat conditioning led by Coach Kogy.",
            features: ["8 Coached Boxing Sessions", "Technical Combinations & Defensive Footwork", "High-Output Anaerobic Conditioning"],
            badge: "STUDIO",
            featuredOnWebsite: true,
            sortOrder: 13
        },
        {
            id: "pkg_inzan_studio_12",
            name: "Studio Classes Pack (12 Sessions)",
            category: "Studio Classes",
            price: 5500,
            duration: "45 Days (12 Sessions)",
            sessions: 12,
            description: "Flexible multi-class pack valid across Women's Strength, Mobility & Core Flow, Pilates, and Studio Conditioning.",
            features: ["12 Studio Sessions Across All Disciplines", "Led by Heidi El Hariri, Mariam Atef & Studio Team", "Valid for 45 Days"],
            badge: "MULTI-CLASS",
            featuredOnWebsite: true,
            sortOrder: 14
        },
        // 5. ALLIED HEALTH (NUTRITION & PHYSIO)
        {
            id: "pkg_inzan_nutrition_4",
            name: "Sports Nutrition Package (4 Consultations)",
            category: "Allied Health",
            price: 2500,
            duration: "1 Month (4 Visits)",
            sessions: 4,
            description: "Led by Dr. Melissia Magdy. Complete nutritional periodization, grocery blueprint, and weekly InBody tracking.",
            features: ["4 Weekly 1-on-1 Nutrition Consultations", "4 InBody Composition & Water Analyses", "Tailored Macronutrient & Meal Blueprint", "Supplement & Intra-Workout Fueling Guide"],
            badge: "NUTRITION",
            featuredOnWebsite: true,
            sortOrder: 15
        },
        {
            id: "pkg_inzan_physio_6",
            name: "Sports Physiotherapy & Rehab (6 Sessions)",
            category: "Allied Health",
            price: 4800,
            duration: "45 Days (6 Sessions)",
            sessions: 6,
            description: "Led by Dr. Heba. Clinical orthopedic assessment, manual therapy, dry needling, and return-to-lifting progression.",
            features: ["6 Clinical Physiotherapy & Rehab Sessions", "Joint Biomechanics & Pain Diagnostics", "Manual Therapy, Dry Needling & Recovery", "Coordinated Hand-off with Your Inzan Coach"],
            badge: "REHAB & RECOVERY",
            featuredOnWebsite: true,
            sortOrder: 16
        }
    ];

    // Schedule Timetable Dataset (Synced with real Inzan coaches & classes)
    var scheduleData = {
        mon: [
            { time: "07:00 AM – 08:15 AM", cat: "sc", catName: "S&C", title: "Early Dawn Strength & Velocity", coach: "Ahmed Tarek", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "10:00 AM – 11:15 AM", cat: "olympic", catName: "Olympic", title: "Snatch Technique & Bar Path", coach: "Akram Hammad", ratio: "1:6 Ratio", intensity: "Technical Focus" },
            { time: "05:00 PM – 06:15 PM", cat: "sc", catName: "S&C", title: "Barbell Hypertrophy & Force Curve", coach: "Ahmed Ezzat", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "07:00 PM – 08:15 PM", cat: "calisthenics", catName: "Calisthenics", title: "Gymnastic Ring Strength & Levers", coach: "Kareem Awny", ratio: "1:6 Ratio", intensity: "Skill Focus" },
            { time: "08:30 PM – 09:45 PM", cat: "sc", catName: "S&C", title: "Athletic Conditioning & Turf Sleds", coach: "Beezo", ratio: "1:6 Ratio", intensity: "Max Effort" },
            { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Athlete Floor & Recovery Suites", coach: "Semary Coach", ratio: "Unrestricted", intensity: "Open Access" }
        ],
        tue: [
            { time: "07:00 AM – 08:15 AM", cat: "calisthenics", catName: "Calisthenics", title: "Movement Prep & Spine Mobility Flow", coach: "Mariam Atef", ratio: "1:6 Ratio", intensity: "Mobility Focus" },
            { time: "11:00 AM – 12:15 PM", cat: "olympic", catName: "Olympic", title: "Clean & Jerk Technique Workshop", coach: "Akram Hammad", ratio: "1:6 Ratio", intensity: "Technical Focus" },
            { time: "05:30 PM – 06:45 PM", cat: "sc", catName: "S&C", title: "Posterior Chain & Deadlift Focus", coach: "Bassem Youssef", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "07:00 PM – 08:15 PM", cat: "calisthenics", catName: "Calisthenics", title: "Handstand Balance & Scapular Control", coach: "Moaz Azoz", ratio: "1:6 Ratio", intensity: "Skill Focus" },
            { time: "08:15 PM – 09:30 PM", cat: "studio", catName: "Boxing", title: "Boxing & Striking Conditioning", coach: "Kogy", ratio: "1:8 Ratio", intensity: "High Intensity" },
            { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Training Floor", coach: "Semary Coach", ratio: "Unrestricted", intensity: "Open Access" }
        ],
        wed: [
            { time: "07:00 AM – 08:15 AM", cat: "sc", catName: "S&C", title: "Explosive Power & Plyometrics", coach: "Ahmed Tarek", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "10:30 AM – 11:45 AM", cat: "studio", catName: "Studio", title: "Women's Strength & Metabolic Conditioning", coach: "Heidi El Hariri", ratio: "1:8 Ratio", intensity: "High Intensity" },
            { time: "05:00 PM – 06:15 PM", cat: "olympic", catName: "Olympic", title: "Olympic Complexes & Turnover Speed", coach: "Akram Hammad", ratio: "1:6 Ratio", intensity: "Technical Focus" },
            { time: "07:00 PM – 08:15 PM", cat: "sc", catName: "S&C", title: "Metabolic Conditioning & Turf Sled Sprints", coach: "Beezo", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "08:15 PM – 09:30 PM", cat: "calisthenics", catName: "Calisthenics", title: "Calisthenics Academy: Ring Muscle-Ups", coach: "Kareem Awny", ratio: "1:6 Ratio", intensity: "Skill Focus" },
            { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Training Floor", coach: "Semary Coach", ratio: "Unrestricted", intensity: "Open Access" }
        ],
        thu: [
            { time: "07:00 AM – 08:15 AM", cat: "sc", catName: "S&C", title: "Foundational Squat & Strength", coach: "Ahmed Ezzat", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "11:00 AM – 12:15 PM", cat: "calisthenics", catName: "Calisthenics", title: "Strict Gymnastics & Weighted Pull-Ups", coach: "Kareem Awny", ratio: "1:6 Ratio", intensity: "Strength Focus" },
            { time: "05:30 PM – 06:45 PM", cat: "sc", catName: "S&C", title: "Speed-Strength & Jump Mechanics", coach: "Ahmed Tarek", ratio: "1:6 Ratio", intensity: "Power Focus" },
            { time: "07:00 PM – 08:15 PM", cat: "olympic", catName: "Olympic", title: "Olympic Lifting Barbell Technique", coach: "Akram Hammad", ratio: "1:6 Ratio", intensity: "Technical Focus" },
            { time: "08:15 PM – 09:30 PM", cat: "studio", catName: "Boxing", title: "Boxing Combinations & Conditioning", coach: "Kogy", ratio: "1:8 Ratio", intensity: "High Intensity" },
            { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Training Floor", coach: "Semary Coach", ratio: "Unrestricted", intensity: "Open Access" }
        ],
        fri: [
            { time: "09:00 AM – 10:15 AM", cat: "sc", catName: "S&C", title: "Aerobic Base & Work Capacity", coach: "Bassem Youssef", ratio: "1:6 Ratio", intensity: "Moderate-High" },
            { time: "10:30 AM – 11:45 AM", cat: "calisthenics", catName: "Calisthenics", title: "Ring Muscle-Up Progressions & Core", coach: "Kareem Awny", ratio: "1:6 Ratio", intensity: "Skill Focus" },
            { time: "04:30 PM – 05:45 PM", cat: "olympic", catName: "Olympic", title: "Olympic Lifting Video Technique Review", coach: "Akram Hammad", ratio: "1:6 Ratio", intensity: "Technical Focus" },
            { time: "06:00 PM – 07:15 PM", cat: "sc", catName: "S&C", title: "Friday Athletic Team Conditioning", coach: "Beezo", ratio: "1:8 Ratio", intensity: "High Intensity" },
            { time: "08:00 AM – 10:00 PM", cat: "open", catName: "Open Gym", title: "Open Training Floor", coach: "Semary Coach", ratio: "Unrestricted", intensity: "Open Access" }
        ],
        sat: [
            { time: "09:00 AM – 10:15 AM", cat: "sc", catName: "S&C", title: "Hypertrophy & Structural Balance", coach: "Ahmed Ezzat", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "11:00 AM – 12:30 PM", cat: "olympic", catName: "Olympic", title: "Olympic Weightlifting Club & Heavy Pulls", coach: "Akram Hammad", ratio: "1:6 Ratio", intensity: "Heavy Focus" },
            { time: "04:00 PM – 05:15 PM", cat: "calisthenics", catName: "Calisthenics", title: "Movement Fundamentals & Flow", coach: "Moaz Azoz", ratio: "1:6 Ratio", intensity: "Skill Focus" },
            { time: "05:30 PM – 06:45 PM", cat: "studio", catName: "Studio", title: "Women's Sculpt & Core Conditioning", coach: "Heidi El Hariri", ratio: "1:8 Ratio", intensity: "High Intensity" },
            { time: "07:00 PM – 08:15 PM", cat: "sc", catName: "S&C", title: "Sprint Acceleration & Deceleration Clinic", coach: "Nour Amin", ratio: "1:6 Ratio", intensity: "Max Velocity" },
            { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Training Floor", coach: "Semary Coach", ratio: "Unrestricted", intensity: "Open Access" }
        ],
        sun: [
            { time: "07:00 AM – 08:15 AM", cat: "sc", catName: "S&C", title: "Early Sunday Power & Plyometrics", coach: "Ahmed Tarek", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "10:30 AM – 11:45 AM", cat: "calisthenics", catName: "Calisthenics", title: "Calisthenics Joint Prehab & Thoracic ROM", coach: "Mariam Atef", ratio: "1:6 Ratio", intensity: "Restorative" },
            { time: "05:00 PM – 06:15 PM", cat: "olympic", catName: "Olympic", title: "Snatch & Jerk Complex Integration", coach: "Akram Hammad", ratio: "1:6 Ratio", intensity: "Technical Focus" },
            { time: "06:30 PM – 07:45 PM", cat: "sc", catName: "S&C", title: "Total Body Functional Strength", coach: "Zeyad Gad", ratio: "1:6 Ratio", intensity: "High Intensity" },
            { time: "08:00 PM – 09:15 PM", cat: "studio", catName: "Studio", title: "Pilates & Core Alignment", coach: "Sabina", ratio: "1:8 Ratio", intensity: "Core Focus" },
            { time: "06:00 AM – 11:00 PM", cat: "open", catName: "Open Gym", title: "Open Athlete Floor & Recovery Suites", coach: "Semary Coach", ratio: "Unrestricted", intensity: "Open Access" }
        ]
    };

    var newsArticles = {
        1: {
            title: "BIOMECHANICAL PROFILING: WHY INZAN STARTS EVERY ATHLETE WITH MOVEMENT SCREENING",
            meta: "COACH AHMED TAREK &bull; 18 SEPTEMBER 2026",
            category: "SPORTS SCIENCE & ASSESSMENT",
            image: "images/full-width-images/Test.jpg",
            content: "<p>At Inzan Athletics, we reject one-size-fits-all programming. Before an athlete touches a loaded barbell or performs high-intensity intervals, they undergo our comprehensive 60-minute Biomechanical Baseline Assessment.</p><p>Using high-speed video analysis, InBody body composition scanning, and standardized movement screens (overhead squat, thoracic rotation, hip internal/external range, and ankle dorsiflexion), our coaching staff identifies kinetic compensations before they manifest as chronic injuries. We map your force-velocity profile to ensure your program develops the exact physical qualities your body currently lacks.</p><p>Whether your goal is competing at an elite level or lifting pain-free into your sixties, our diagnostic protocol sets the standard for high-performance training in Egypt.</p>"
        },
        2: {
            title: "THE OLYMPIC LIFTING TRANSFER: DEVELOPING TRIPLE EXTENSION & ROTATIONAL POWER",
            meta: "COACH AKRAM HAMMAD &bull; 04 SEPTEMBER 2026",
            category: "STRENGTH & TECHNICAL MASTERY",
            image: "images/full-width-images/facility-1.jpg",
            content: "<p>The snatch and clean & jerk are the ultimate expressions of Rate of Force Development (RFD). No single gym exercise produces higher power outputs than the triple extension of ankles, knees, and hips executed during a maximal Olympic pull.</p><p>At our Garden 8 facility, Olympic weightlifting is taught through strict technical progressions: hook grip mastery, bar path trajectory, barbell turnover speed, and active overhead receiving positions. Athletes across basketball, football, martial arts, and track notice immediate transfers in first-step acceleration, vertical leap, and deceleration control.</p><p>All sessions are supervised with strict 1:6 coach-to-athlete ratios on dedicated Eleiko-standard lifting platforms.</p>"
        },
        3: {
            title: "CALISTHENICS VS. HEAVY IRON: INTEGRATING RELATIVE BODYWEIGHT STRENGTH",
            meta: "COACH KAREEM AWNY &bull; 22 AUGUST 2026",
            category: "MOVEMENT & PERIODIZATION",
            image: "images/full-width-images/ast.jpg",
            content: "<p>A common mistake in commercial gym training is viewing calisthenics and heavy barbell lifting as opposing philosophies. Inzan's High Performance methodology merges relative bodyweight mastery with progressive loaded resistance.</p><p>By mastering gymnastic ring support holds, strict pull-up variations, handstand wall drills, and parallel bar dips in our Calisthenics Academy, athletes cultivate unparalleled scapular stability and rotational core stiffness. When paired with heavy deadlifts and squats, this dual stimulus protects vulnerable shoulder and lumbar joints while promoting balanced hypertrophy.</p>"
        }
    };

    // ==========================================================================
    // 5. Live Packages Rendering & Filtering
    // ==========================================================================
    var currentPackageCategory = "featured";
    var currentPackageSearch = "";

    function formatEGP(amount) {
        var num = Number(amount) || 0;
        return "EGP " + num.toLocaleString("en-US");
    }

    function inferPackageCategory(pkg) {
        if (pkg.category && ["Memberships", "Personal Training", "Academies & SGF", "Studio Classes", "Allied Health"].indexOf(pkg.category) !== -1) {
            return pkg.category;
        }
        var n = (pkg.name || "").toLowerCase();
        if (n.indexOf("nutrition") !== -1 || n.indexOf("physio") !== -1 || n.indexOf("rehab") !== -1 || n.indexOf("recovery") !== -1 || n.indexOf("massage") !== -1) {
            return "Allied Health";
        }
        if (n.indexOf("calisthenics") !== -1 || n.indexOf("sgf") !== -1 || n.indexOf("academy") !== -1 || n.indexOf("small group") !== -1 || n.indexOf("track") !== -1) {
            return "Academies & SGF";
        }
        if (n.indexOf("boxing") !== -1 || n.indexOf("studio") !== -1 || n.indexOf("pilates") !== -1 || n.indexOf("yoga") !== -1 || n.indexOf("zumba") !== -1 || n.indexOf("class") !== -1) {
            return "Studio Classes";
        }
        if (n.indexOf("pt") !== -1 || n.indexOf("personal") !== -1 || n.indexOf("private") !== -1 || n.indexOf("partner") !== -1 || n.indexOf("session") !== -1) {
            return "Personal Training";
        }
        return "Memberships";
    }

    function buildPackageFeatures(pkg) {
        if (Array.isArray(pkg.features) && pkg.features.length > 0) {
            return pkg.features;
        }
        var feats = [];
        if (pkg.duration || pkg.expiryDays) {
            feats.push("Validity: " + (pkg.duration || (pkg.expiryDays + " Days")));
        }
        if (pkg.sessions) {
            feats.push(pkg.sessions >= 30 ? "Full Gym Floor & Facility Access" : (pkg.sessions + " Coached Sessions Included"));
        }
        if (Number(pkg.freePtSessions) > 0) {
            feats.push(pkg.freePtSessions + " Complimentary PT Sessions");
        }
        if (Number(pkg.inbodyCount) > 0) {
            feats.push(pkg.inbodyCount + " InBody Composition Scans");
        }
        if (Number(pkg.invitationsCount) > 0) {
            feats.push(pkg.invitationsCount + " Guest Invitations");
        }
        if (Number(pkg.freezeDays) > 0) {
            feats.push("Up to " + pkg.freezeDays + " Days Freeze Allowance");
        }
        if (feats.length === 0) {
            feats.push("Includes Complimentary 60-Min Assessment");
            feats.push("Available in the Inzan Member App");
        }
        return feats.slice(0, 4);
    }

    function renderInzanPackages() {
        var $grid = $("#packagesGridContainer");
        if ($grid.length === 0) return;

        $("#totalPackagesBadge").text(inzanPackagesCatalog.length);

        var filtered = inzanPackagesCatalog.filter(function(pkg) {
            if (pkg.isActive === false) return false;
            var price = Number(pkg.price) || 0;
            if (price <= 0) return false;

            if (currentPackageSearch) {
                var q = currentPackageSearch.toLowerCase();
                var hay = ((pkg.name || "") + " " + (pkg.category || "") + " " + (pkg.description || "")).toLowerCase();
                return hay.indexOf(q) !== -1;
            }

            if (currentPackageCategory === "featured") {
                return pkg.featuredOnWebsite === true;
            }
            if (currentPackageCategory === "all_crm") {
                return true;
            }
            return inferPackageCategory(pkg) === currentPackageCategory;
        });

        // Sort featured first, then sortOrder, then price
        filtered.sort(function(a, b) {
            var fa = a.featuredOnWebsite ? 0 : 1;
            var fb = b.featuredOnWebsite ? 0 : 1;
            if (fa !== fb) return fa - fb;
            var sa = Number(a.sortOrder) || 999;
            var sb = Number(b.sortOrder) || 999;
            if (sa !== sb) return sa - sb;
            return (Number(a.price) || 0) - (Number(b.price) || 0);
        });

        // Cap display at 36 when browsing all 247 unless searching
        var displayList = (!currentPackageSearch && currentPackageCategory === "all_crm") ? filtered.slice(0, 36) : filtered.slice(0, 24);

        if (displayList.length === 0) {
            $grid.html(
                '<div style="grid-column: 1/-1; text-align:center; padding: 40px 20px; border:1px solid #2B2B2B; border-radius:8px; background:#111;">' +
                    '<i class="fa fa-search" style="font-size:24px; color:#666; margin-bottom:10px;"></i>' +
                    '<div style="color:#FFF; font-weight:700; margin-bottom:6px;">No matching packages found</div>' +
                    '<div style="color:#888; font-size:13px;">Try clearing your search or selecting "All System Packages".</div>' +
                '</div>'
            );
            return;
        }

        var html = "";
        displayList.forEach(function(pkg) {
            var catLabel = inferPackageCategory(pkg);
            var badge = pkg.badge || catLabel.toUpperCase();
            var features = buildPackageFeatures(pkg);
            var durationLabel = pkg.duration || (pkg.expiryDays ? (pkg.expiryDays + " Days") : (pkg.sessions ? (pkg.sessions + " Sessions") : "Flexible"));
            var safeName = (pkg.name || "Inzan Package").replace(/'/g, "\\'");

            var featuresHtml = "";
            features.forEach(function(f) {
                featuresHtml += '<li><i class="fa fa-check"></i> <span>' + f + '</span></li>';
            });

            html += '<div class="inzan-pkg-card tilt-card' + (pkg.badge === "FLAGSHIP VIP" || pkg.badge === "MOST BOOKED PT" ? ' pkg-card-highlight' : '') + '">' +
                '<div class="card-spotlight"></div>' +
                '<div>' +
                    '<div class="pkg-card-top">' +
                        '<span class="pkg-cat-pill">' + catLabel + '</span>' +
                        '<span class="pkg-badge-pill">' + badge + '</span>' +
                    '</div>' +
                    '<h3 class="pkg-card-title">' + pkg.name + '</h3>' +
                    '<div class="pkg-price-row">' +
                        '<span class="pkg-price-val">' + formatEGP(pkg.price) + '</span>' +
                        '<span class="pkg-duration-lbl">/ ' + durationLabel + '</span>' +
                    '</div>' +
                    (pkg.description ? '<p class="pkg-card-desc">' + pkg.description + '</p>' : '') +
                    '<ul class="pkg-features-list">' + featuresHtml + '</ul>' +
                '</div>' +
                '<div class="pkg-card-actions">' +
                    '<button type="button" class="pkg-select-btn" onclick="openAssessmentModal({ membershipType: \'' + safeName + '\' })">' +
                        '<i class="fa fa-calendar-check-o mr-5"></i> Select &amp; Book Assessment' +
                    '</button>' +
                '</div>' +
            '</div>';
        });

        $grid.html(html);
    }
    window.renderInzanPackages = renderInzanPackages;

    window.filterInzanPackages = function(cat, btnEl) {
        currentPackageCategory = cat;
        $(".package-filter-pill").removeClass("active");
        if (btnEl) {
            $(btnEl).addClass("active");
        } else {
            $(".package-filter-pill[data-pkg-cat='" + cat + "']").addClass("active");
        }
        renderInzanPackages();
    };

    window.handlePackageSearch = function(query) {
        currentPackageSearch = (query || "").trim();
        renderInzanPackages();
    };

    function populatePackageDropdowns() {
        var baseOptions = [
            "Premium Annual",
            "Basic Annual",
            "6 Months",
            "3 Months",
            "1 Month",
            "Youth [Under 16]",
            "Guest"
        ];
        var html = '<optgroup label="Standard Inzan Memberships">';
        baseOptions.forEach(function(opt) {
            html += '<option value="' + opt + '">' + (opt === "Guest" ? "Guest (Prospective Member / Trial)" : opt) + '</option>';
        });
        html += '</optgroup>';

        var featuredList = inzanPackagesCatalog.filter(function(p) { return p.featuredOnWebsite; });
        if (featuredList.length > 0) {
            html += '<optgroup label="Live Inzan Packages (EGP)">';
            featuredList.forEach(function(p) {
                html += '<option value="' + p.name.replace(/"/g, "&quot;") + '">' + p.name + ' — ' + formatEGP(p.price) + '</option>';
            });
            html += '</optgroup>';
        }

        html += '<optgroup label="Training Pathways">' +
            '<option value="Foundational Athleticism">Foundational Athleticism</option>' +
            '<option value="Sport Performance">Sport Performance</option>' +
            '<option value="Strength Skills (Olympic & Calisthenics)">Strength Skills (Olympic &amp; Calisthenics)</option>' +
            '<option value="Body Recomposition & Conditioning">Body Recomposition &amp; Conditioning</option>' +
            '<option value="Private 1-on-1 Coaching">Private 1-on-1 Coaching</option>' +
        '</optgroup>';

        $(".inzan-membership-type-select").html(html);
    }

    // ==========================================================================
    // 6. Live Coaches Rendering, Filtering & Dropdown Sync
    // ==========================================================================
    var currentCoachFilter = "featured";

    var fallbackCoachPhotos = [
        "images/full-width-images/fac.jpg",
        "images/portfolio/projects-4.jpg",
        "images/portfolio/projects-5.jpg",
        "images/full-width-images/ast.jpg",
        "images/full-width-images/facility-1.jpg",
        "images/full-width-images/facility-2.jpg"
    ];

    function renderInzanCoaches() {
        var $container = $("#coachesGridContainer");
        if ($container.length === 0) return;

        $("#totalCoachesCount").text(inzanCoachesCatalog.length);

        var filtered = inzanCoachesCatalog.filter(function(c) {
            if (c.active === false) return false;
            if (currentCoachFilter === "featured") {
                return c.featuredOnWebsite === true;
            }
            if (currentCoachFilter === "all") {
                return true;
            }
            return (c.category || "Personal Training") === currentCoachFilter;
        });

        filtered.sort(function(a, b) {
            var sa = Number(a.sortOrder) || 99;
            var sb = Number(b.sortOrder) || 99;
            if (sa !== sb) return sa - sb;
            return (a.name || "").localeCompare(b.name || "");
        });

        var html = "";
        filtered.forEach(function(coach, idx) {
            var photo = coach.image || coach.avatar || fallbackCoachPhotos[idx % fallbackCoachPhotos.length];
            var role = coach.specialty || coach.discipline || coach.role || "Inzan Performance Coach";
            var badge = coach.certifications || coach.category || "Certified Inzan Specialist";
            var bio = coach.bio || ("Dedicated Inzan Athletics " + role + " coaching athletes at Garden 8, New Cairo.");
            var safeName = (coach.name || "").replace(/'/g, "\\'");

            html += '<div class="col-sm-6 col-md-3 mb-30">' +
                '<div class="coach-card tilt-card">' +
                    '<div class="card-spotlight"></div>' +
                    '<div class="coach-photo-wrap">' +
                        '<img src="' + photo + '" alt="' + coach.name + '" loading="lazy" />' +
                    '</div>' +
                    '<div class="coach-info">' +
                        '<h3 class="coach-name">' + coach.name + '</h3>' +
                        '<div class="coach-role">' + role + '</div>' +
                        '<div class="coach-credentials-badge">' + badge + '</div>' +
                        '<p class="coach-bio">' + bio + '</p>' +
                        '<button type="button" class="coach-book-btn" onclick="openAssessmentModal({ coachName: \'' + safeName + '\' })">' +
                            '<i class="fa fa-calendar-check-o mr-5"></i> Book with ' + coach.name +
                        '</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        });

        $container.html(html);
    }
    window.renderInzanCoaches = renderInzanCoaches;

    window.filterInzanCoaches = function(cat, btnEl) {
        currentCoachFilter = cat;
        $(".coach-filter-pill").removeClass("active");
        if (btnEl) {
            $(btnEl).addClass("active");
        } else {
            $(".coach-filter-pill[data-coach-cat='" + cat + "']").addClass("active");
        }
        renderInzanCoaches();
    };

    function populateCoachDropdowns() {
        var html = '<option value="">-- Select from Active Inzan Coaches (' + inzanCoachesCatalog.length + ') --</option>';
        inzanCoachesCatalog.forEach(function(c) {
            var spec = c.specialty || c.category || "Inzan Coach";
            html += '<option value="' + c.name.replace(/"/g, "&quot;") + '">' + c.name + ' — ' + spec + '</option>';
        });
        $(".inzan-coach-dropdown").html(html);
    }

    // ==========================================================================
    // 7. Weekly Schedule Rendering & Booking
    // ==========================================================================
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
            var safeTitle = (item.title || "").replace(/'/g, "\\'");
            var safeCoach = (item.coach || "").replace(/'/g, "\\'");
            var safeTime = (item.time || "").replace(/'/g, "\\'");
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
                '<button type="button" class="schedule-reserve-btn" onclick="bookScheduleSlot(\'' + safeTitle + '\', \'' + currentScheduleDay + '\', \'' + safeTime + '\', \'' + safeCoach + '\')">' +
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
    };

    window.filterScheduleCategory = function(cat) {
        currentScheduleFilter = cat;
        $(".schedule-filter-pill").removeClass("active");
        $(".schedule-filter-pill[data-filter='" + cat + "']").addClass("active");
        renderSchedule();
    };

    window.bookScheduleSlot = function(sessionName, day, time, coachName) {
        var dayNames = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
        var fullDay = dayNames[day] || day;
        var startHour = (time || "10:00 AM").split("–")[0].trim();
        var isMorning = time.indexOf("AM") !== -1 || time.indexOf("12:") !== -1;

        openAssessmentModal({
            shift: isMorning ? "Morning [8AM - 4PM]" : "Night [4PM - 11PM]",
            preferredHour: startHour,
            coachName: (coachName && coachName !== "Semary Coach" && coachName !== "Staff On Duty") ? coachName : "",
            notes: "Class / Slot Reservation Request: " + sessionName + " (" + fullDay + " at " + time + (coachName ? " with " + coachName : "") + ")."
        });
    };

    // ==========================================================================
    // 8. Live Firestore REST Sync with db-inzanathletics
    // ==========================================================================
    function parseFirestoreValue(valObj) {
        if (!valObj || typeof valObj !== "object") return null;
        if ("stringValue" in valObj) return valObj.stringValue;
        if ("integerValue" in valObj) return Number(valObj.integerValue);
        if ("doubleValue" in valObj) return Number(valObj.doubleValue);
        if ("booleanValue" in valObj) return Boolean(valObj.booleanValue);
        if ("timestampValue" in valObj) return valObj.timestampValue;
        if ("nullValue" in valObj) return null;
        if ("arrayValue" in valObj) {
            var vals = (valObj.arrayValue && valObj.arrayValue.values) || [];
            return vals.map(parseFirestoreValue);
        }
        if ("mapValue" in valObj) {
            return parseFirestoreFields((valObj.mapValue && valObj.mapValue.fields) || {});
        }
        return null;
    }

    function parseFirestoreFields(fields) {
        var out = {};
        if (!fields) return out;
        Object.keys(fields).forEach(function(k) {
            out[k] = parseFirestoreValue(fields[k]);
        });
        return out;
    }

    function parseFirestoreDoc(doc) {
        var id = (doc.name || "").split("/").pop();
        var data = parseFirestoreFields(doc.fields || {});
        data.id = id;
        return data;
    }

    function syncLiveInzanSystemData() {
        // 1. Sync Live Coaches from db-inzanathletics
        fetch(FIRESTORE_BASE_URL + "/coaches?pageSize=100")
            .then(function(res) { return res.ok ? res.json() : null; })
            .then(function(json) {
                if (!json || !Array.isArray(json.documents)) return;
                var liveCoaches = json.documents.map(parseFirestoreDoc).filter(function(c) {
                    return c.name && c.active !== false && String(c.status || "Active").toLowerCase() !== "inactive";
                });
                if (liveCoaches.length > 0) {
                    // Merge with local photos/bios where available
                    var byName = {};
                    inzanCoachesCatalog.forEach(function(localC) {
                        byName[localC.name.toLowerCase()] = localC;
                    });
                    inzanCoachesCatalog = liveCoaches.map(function(c, idx) {
                        var existing = byName[(c.name || "").toLowerCase()] || {};
                        return $.extend({}, existing, c, {
                            image: c.image || c.avatar || existing.image || fallbackCoachPhotos[idx % fallbackCoachPhotos.length]
                        });
                    });
                    renderInzanCoaches();
                    populateCoachDropdowns();
                }
            })
            .catch(function() {});

        // 2. Sync Live Packages from db-inzanathletics
        fetch(FIRESTORE_BASE_URL + "/packages?pageSize=300")
            .then(function(res) { return res.ok ? res.json() : null; })
            .then(function(json) {
                if (!json || !Array.isArray(json.documents)) return;
                var livePackages = json.documents.map(parseFirestoreDoc).filter(function(p) {
                    return p.name && p.isActive !== false && Number(p.price) > 0;
                });
                if (livePackages.length > 0) {
                    inzanPackagesCatalog = livePackages;
                    renderInzanPackages();
                    populatePackageDropdowns();
                }
            })
            .catch(function() {});

        // 3. Sync Live Class Schedules from db-inzanathletics
        fetch(FIRESTORE_BASE_URL + "/classSchedules?pageSize=100")
            .then(function(res) { return res.ok ? res.json() : null; })
            .then(function(json) {
                if (!json || !Array.isArray(json.documents)) return;
                var docs = json.documents.map(parseFirestoreDoc).filter(function(s) {
                    return s.className && s.dayOfWeek;
                });
                if (docs.length >= 7) {
                    var dayMap = {
                        monday: "mon", mon: "mon",
                        tuesday: "tue", tue: "tue",
                        wednesday: "wed", wed: "wed",
                        thursday: "thu", thu: "thu",
                        friday: "fri", fri: "fri",
                        saturday: "sat", sat: "sat",
                        sunday: "sun", sun: "sun"
                    };
                    var grouped = { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] };
                    docs.forEach(function(s) {
                        var dKey = dayMap[String(s.dayOfWeek || "").toLowerCase()];
                        if (!dKey) return;
                        grouped[dKey].push({
                            time: s.timeSlot || ((s.startTime || "10:00 AM") + (s.endTime ? " – " + s.endTime : "")),
                            cat: s.categoryKey || "sc",
                            catName: s.categoryLabel || s.discipline || "S&C",
                            title: s.className,
                            coach: s.instructorName || "Inzan Coach",
                            ratio: s.ratioLabel || (s.capacity ? ("Max " + s.capacity) : "1:6 Ratio"),
                            intensity: s.intensity || "Coached Session",
                            sortOrder: Number(s.sortOrder) || 50
                        });
                    });
                    Object.keys(grouped).forEach(function(k) {
                        if (grouped[k].length > 0) {
                            grouped[k].sort(function(a, b) { return a.sortOrder - b.sortOrder; });
                            scheduleData[k] = grouped[k];
                        }
                    });
                    renderSchedule();
                    renderBentoScheduleTicker();
                }
            })
            .catch(function() {});
    }

    // ==========================================================================
    // 9. Unified Assessment Request Modal & Live CRM Submission
    // ==========================================================================
    window.selectInlineShift = function(shiftVal, btnEl) {
        $("#athleteShift").val(shiftVal);
        $("#inzanContactForm .inzan-shift-btn[data-shift]").removeClass("active");
        $(btnEl).addClass("active");
        if (shiftVal.indexOf("Morning") !== -1 && $("#athleteTime").val() === "06:30 PM") {
            $("#athleteTime").val("10:00 AM");
        } else if (shiftVal.indexOf("Night") !== -1 && $("#athleteTime").val() === "10:00 AM") {
            $("#athleteTime").val("06:30 PM");
        }
    };

    window.selectModalShift = function(shiftVal, btnEl) {
        $("#modalShift").val(shiftVal);
        $(".inzan-modal-shift-btn").removeClass("active");
        $(btnEl).addClass("active");
        if (shiftVal.indexOf("Morning") !== -1 && $("#modalPreferredHour").val() === "06:30 PM") {
            $("#modalPreferredHour").val("10:00 AM");
        } else if (shiftVal.indexOf("Night") !== -1 && $("#modalPreferredHour").val() === "10:00 AM") {
            $("#modalPreferredHour").val("06:30 PM");
        }
    };

    window.toggleInlinePreferredCoach = function(flag, btnEl) {
        $("#athletePrefCoachFlag").val(flag);
        $("#inzanContactForm .inzan-pref-coach-btn").removeClass("active");
        if (btnEl) {
            $(btnEl).addClass("active");
        } else {
            $("#inzanContactForm .inzan-pref-coach-btn[data-pref='" + flag + "']").addClass("active");
        }
        if (flag === "yes") {
            $("#inlinePreferredCoachFields").slideDown(200);
        } else {
            $("#inlinePreferredCoachFields").slideUp(200);
        }
    };

    window.toggleModalPreferredCoach = function(flag, btnEl) {
        $("#modalPrefCoachFlag").val(flag);
        $(".inzan-modal-pref-btn").removeClass("active");
        if (btnEl) {
            $(btnEl).addClass("active");
        } else {
            $(".inzan-modal-pref-btn[data-pref='" + flag + "']").addClass("active");
        }
        if (flag === "yes") {
            $("#modalPreferredCoachFields").slideDown(200);
        } else {
            $("#modalPreferredCoachFields").slideUp(200);
        }
    };

    window.openAssessmentModal = function(prefill) {
        prefill = prefill || {};
        $("#modalAssessmentSuccessBox").hide();
        $("#inzanModalAssessmentForm").show();

        if (prefill.membershipType) {
            var $sel = $("#modalMembershipType");
            if ($sel.find("option[value='" + prefill.membershipType.replace(/'/g, "\\'") + "']").length === 0) {
                $sel.prepend('<option value="' + prefill.membershipType + '">' + prefill.membershipType + '</option>');
            }
            $sel.val(prefill.membershipType);
        }

        if (prefill.shift) {
            var $shiftBtn = $(".inzan-modal-shift-btn[data-shift='" + prefill.shift + "']");
            window.selectModalShift(prefill.shift, $shiftBtn);
        }

        if (prefill.preferredHour) {
            $("#modalPreferredHour").val(prefill.preferredHour);
        }

        if (prefill.coachName) {
            window.toggleModalPreferredCoach("yes");
            $("#modalCoachSelect").val(prefill.coachName);
            $("#modalCoachName").val(prefill.coachName);
        }

        if (prefill.notes) {
            $("#modalNotes").val(prefill.notes);
        }

        $("#inzanAssessmentModal").fadeIn(250);
        $("body").css("overflow", "hidden");
        setTimeout(function() {
            $("#modalFullName").focus();
        }, 260);
    };

    window.closeAssessmentModal = function() {
        $("#inzanAssessmentModal").fadeOut(200);
        $("body").css("overflow", "auto");
    };

    window.resetInlineAssessmentForm = function() {
        $("#inzanSuccessBox").slideUp(250, function() {
            $("#inzanContactForm").slideDown(300);
        });
    };

    function toFirestoreValue(v) {
        if (v === null || v === undefined) return { nullValue: null };
        if (typeof v === "boolean") return { booleanValue: v };
        if (typeof v === "number") {
            return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
        }
        return { stringValue: String(v) };
    }

    function submitAssessmentToInzanCRM(payload) {
        var nowIso = new Date().toISOString();
        var todayDate = nowIso.split("T")[0];

        var docFields = {
            clientId: toFirestoreValue("guest"),
            clientName: toFirestoreValue(payload.fullName),
            fullName: toFirestoreValue(payload.fullName),
            phone: toFirestoreValue(payload.phone),
            email: toFirestoreValue(payload.email),
            membershipId: toFirestoreValue(payload.membershipId || "Guest"),
            age: toFirestoreValue(payload.age || "21 to 30"),
            membershipType: toFirestoreValue(payload.membershipType || "Guest"),
            shift: toFirestoreValue(payload.shift || "Morning [8AM - 4PM]"),
            preferredHour: toFirestoreValue(payload.preferredHour || "10:00 AM"),
            preferredCoach: toFirestoreValue(Boolean(payload.preferredCoach)),
            coachName: toFirestoreValue(payload.coachName || ""),
            preferredCoachName: toFirestoreValue(payload.coachName || ""),
            referralSource: toFirestoreValue(payload.referralSource || ""),
            type: toFirestoreValue("InBody & Physical Assessment"),
            status: toFirestoreValue("Pending"),
            date: toFirestoreValue(todayDate),
            time: toFirestoreValue(payload.preferredHour || "10:00 AM"),
            notes: toFirestoreValue(payload.notes || ""),
            source: toFirestoreValue("website"),
            createdAt: toFirestoreValue(nowIso)
        };

        // 1. Primary: Direct write to Inzan Firestore (db-inzanathletics/assessments)
        var firestorePromise = fetch(FIRESTORE_BASE_URL + "/assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fields: docFields })
        }).then(function(res) {
            if (!res.ok) throw new Error("Firestore status " + res.status);
            return res.json();
        }).then(function(doc) {
            var docId = (doc.name || "").split("/").pop();
            return { ok: true, id: docId };
        });

        // 2. Fallback: CRM Public API endpoint
        return firestorePromise.catch(function() {
            return fetch(CRM_API_BASE_URL + "/api/public/assessment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }).then(function(res) {
                if (!res.ok) throw new Error("API status " + res.status);
                return res.json();
            });
        });
    }

    // ==========================================================================
    // 10. Pathway, News, Studio & Bento Helpers
    // ==========================================================================
    window.selectPathway = function(goalValue) {
        openAssessmentModal({ membershipType: goalValue });
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
    };

    window.closeNewsModal = function() {
        $("#inzanNewsModal").fadeOut(200);
        $("body").css("overflow", "auto");
    };

    // Video Tour Cinema Lightbox
    window.openVideoReel = function(e) {
        if (e && e.preventDefault) e.preventDefault();
        $("#inzanVideoModal").fadeIn(300);
        $("body").css("overflow", "hidden");
    };

    window.closeVideoReel = function() {
        $("#inzanVideoModal").fadeOut(250);
        $("body").css("overflow", "auto");
    };

    // Member Portal Gateway Modal
    window.openPortalModal = function(e) {
        if (e && e.preventDefault) e.preventDefault();
        $("#inzanPortalModal").fadeIn(300);
        $("body").css("overflow", "hidden");
        return false;
    };

    window.closePortalModal = function() {
        $("#inzanPortalModal").fadeOut(250);
        $("body").css("overflow", "auto");
    };

    // Hero Athlete Pillar Switcher
    var heroPillars = {
        olympic: {
            badge: "STRENGTH SKILLS",
            coach: "Coach Ahmed Tarek & Coach Akram Hammad",
            title: "OLYMPIC WEIGHTLIFTING PLATFORM",
            desc: "Snatch, Clean & Jerk technical mastery on sanctioned competition platforms. Hook grip, bar velocity, and receiving depth under dedicated Olympic coaching.",
            sessions: "3–4",
            cap: "Max 6",
            spec: "Eleiko IPF",
            bg: "images/full-width-images/Test.jpg"
        },
        calisthenics: {
            badge: "MOVEMENT & MASTERY",
            coach: "Coach Kareem Awny & Coach Moaz Azoz",
            title: "CALISTHENICS & RING STRENGTH",
            desc: "Strict ring muscle-ups, handstand alignment, front levers, and scapular bulletproofing. Build immense relative bodyweight strength and joint resilience.",
            sessions: "3–4",
            cap: "Max 6",
            spec: "Gymnastic Rig",
            bg: "images/full-width-images/ast.jpg"
        },
        sc: {
            badge: "SPORT PERFORMANCE",
            coach: "Coach Ahmed Tarek, Coach Beezo & Coach Ahmed Ezzat",
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

    // Bento Grid Facility Zone Switcher
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
            title: "Movement Prep, Physiotherapy & InBody Bay",
            desc: "Clinical sports nutrition & physiotherapy suite led by Dr. Melissia Magdy and Dr. Heba, featuring InBody composition scanning and soft-tissue recovery.",
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

    // Bento Grid Kinetic Joint Screening Explorer
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

    // Render Bento Schedule Ticker (Live Today at Inzan)
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
                    '<div class="ticker-time"><i class="fa fa-clock-o mr-5"></i>' + item.time.split("–")[0].trim() + ' &bull; ' + item.coach + '</div>' +
                    '<div class="ticker-name">' + item.title + '</div>' +
                '</div>' +
                '<span class="ticker-badge open">' + item.catName + '</span>' +
            '</a>';
        }
        $ticker.html(html);
    }

    // Athlete Track Studio (Interactive Playground)
    var studioState = {
        pillar: "sc",
        time: "morning",
        level: "intermediate"
    };

    var studioTracks = {
        sc: {
            title: "STRENGTH & CONDITIONING TRACK",
            coach: "Ahmed Tarek",
            coachLabel: "Coach Ahmed Tarek & Coach Beezo",
            split: "Barbell Overload • Turf Sled Sprints • Posterior Chain",
            bay: "Main Floor Racks & Turf Track",
            frequency: "4 Sessions / Week (Small Group Max 6)",
            goalVal: "Small Group Fitness - SGF (12 Sessions)"
        },
        olympic: {
            title: "OLYMPIC WEIGHTLIFTING TRACK",
            coach: "Akram Hammad",
            coachLabel: "Coach Akram Hammad (EWF Specialist)",
            split: "Snatch Technique • Clean & Jerk • Pull Velocity",
            bay: "Competition 8x8 Eleiko Platform Bay",
            frequency: "3–4 Technical Lifting Sessions / Week",
            goalVal: "Small Group Fitness - SGF (12 Sessions)"
        },
        calisthenics: {
            title: "CALISTHENICS & RING MASTERY TRACK",
            coach: "Kareem Awny",
            coachLabel: "Coach Kareem Awny & Coach Moaz Azoz",
            split: "Ring Support • Strict Levers • Scapular Bulletproofing",
            bay: "Structural Gymnastic Ceiling Rig",
            frequency: "3–4 Academy Sessions / Week",
            goalVal: "Inzan Calisthenics Academy (12 Sessions)"
        },
        private: {
            title: "PRIVATE 1-ON-1 ATHLETIC COACHING",
            coach: "Ahmed Tarek",
            coachLabel: "Senior Inzan PT Staff (Dedicated 1:1)",
            split: "Custom Biomechanical Periodization & Private Screening",
            bay: "Private VIP Lifting Station",
            frequency: "3 Private Sessions / Week (12 Sessions / Month)",
            goalVal: "PT Transformation Package (12 Sessions)"
        }
    };

    function updateStudioMonitor() {
        var track = studioTracks[studioState.pillar] || studioTracks["sc"];
        var timeLabel = (studioState.time === "morning") ? "Early Dawn (7:00 AM – 11:00 AM)" :
                        (studioState.time === "midday") ? "Midday (11:00 AM – 4:00 PM)" : "Evening Prime (5:00 PM – 10:00 PM)";
        var levelLabel = (studioState.level === "beginner") ? "Foundation / Novice" :
                         (studioState.level === "intermediate") ? "Intermediate Lifter" : "Competitive Athlete";

        $("#studioTrackTitle").text(track.title);
        $("#studioTrackDetail").text("Engineered for " + levelLabel + " training during " + timeLabel + ". Structured in strict small-group or 1-on-1 format with dedicated platform space.");
        $("#studioMetaCoach").text(track.coachLabel);
        $("#studioMetaSplit").text(track.split);
        $("#studioMetaBay").text(track.bay);
        $("#studioMetaFreq").text(track.frequency);

        var waText = encodeURIComponent(
            "Hi Inzan Athletics! I just customized my program on your Athlete Track Studio:\n" +
            "• Track: " + track.title + "\n" +
            "• Lead Coach: " + track.coachLabel + "\n" +
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
        var shiftVal = (studioState.time === "evening") ? "Night [4PM - 11PM]" : "Morning [8AM - 4PM]";
        var hourVal = (studioState.time === "morning") ? "09:00 AM" :
                      (studioState.time === "midday") ? "01:00 PM" : "06:30 PM";

        openAssessmentModal({
            membershipType: track.goalVal,
            shift: shiftVal,
            preferredHour: hourVal,
            coachName: track.coach,
            notes: "ATHLETE TRACK STUDIO CONFIGURATION: " + track.title + " | Level: " + studioState.level.toUpperCase() + " | Bay: " + track.bay
        });
    };

    // ==========================================================================
    // 11. Core Initializer
    // ==========================================================================
    var inzanInitialized = false;

    function initInzanFeatures() {
        if (inzanInitialized) return;
        inzanInitialized = true;

        init3DTilt();

        // Render initial catalog & schedule immediately, then sync live with Firestore
        renderInzanPackages();
        populatePackageDropdowns();
        renderInzanCoaches();
        populateCoachDropdowns();
        renderSchedule();
        renderBentoScheduleTicker();
        updateStudioMonitor();

        // Pull live updates from db-inzanathletics
        syncLiveInzanSystemData();

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

        $("#inzanVideoModal, #inzanPortalModal, #inzanAssessmentModal").on("click", function(e) {
            if ($(e.target).closest(".inzan-cinema-dialog, .inzan-modal-dialog").length === 0) {
                closeVideoReel();
                closePortalModal();
                closeAssessmentModal();
            }
        });

        $(document).on("keydown", function(e) {
            if (e.key === "Escape") {
                closeNewsModal();
                closeVideoReel();
                closePortalModal();
                closeAssessmentModal();
                closeBottomDrawer();
            }
        });

        // 1. Inline Assessment Booking Form Handler (#inzanContactForm)
        $("#inzanContactForm").on("submit", function(e) {
            e.preventDefault();
            var $form = $(this);
            var $submitBtn = $("#submit_btn");

            if ($("#_anti_spam").val() !== "") {
                return false;
            }

            var fullName = ($("#athleteName").val() || "").trim();
            var phone = ($("#athletePhone").val() || "").trim();
            var email = ($("#athleteEmail").val() || "").trim();
            var membershipId = ($("#athleteMembershipId").val() || "Guest").trim() || "Guest";
            var age = $("#athleteAge").val() || "21 to 30";
            var membershipType = $("#athleteGoal").val() || "Premium Annual";
            var shift = $("#athleteShift").val() || "Morning [8AM - 4PM]";
            var preferredHour = ($("#athleteTime").val() || "").trim();
            var prefCoachFlag = $("#athletePrefCoachFlag").val() === "yes";
            var coachName = prefCoachFlag ? ($("#athleteCoachName").val() || $("#athleteCoachSelect").val() || "").trim() : "";
            var referralSource = prefCoachFlag ? ($("#athleteReferralSource").val() || "Social Media") : "";
            var notes = ($("#athleteMessage").val() || "").trim();

            $form.find(".inzan-form-control").css("border-color", "");

            if (!fullName || !phone || !email || !preferredHour || (prefCoachFlag && !coachName)) {
                if (!fullName) $("#athleteName").css("border-color", "#FF4444");
                if (!phone) $("#athletePhone").css("border-color", "#FF4444");
                if (!email) $("#athleteEmail").css("border-color", "#FF4444");
                if (!preferredHour) $("#athleteTime").css("border-color", "#FF4444");
                if (prefCoachFlag && !coachName) $("#athleteCoachName").css("border-color", "#FF4444");

                showToast("Please complete all required fields (Name, Phone, Email, Preferred Hour" + (prefCoachFlag ? ", Coach Name" : "") + ").", "fa fa-exclamation-triangle");
                return;
            }

            $submitBtn.prop("disabled", true).html('<i class="fa fa-circle-o-notch fa-spin"></i> Submitting to Inzan System...');

            var payload = {
                fullName: fullName,
                phone: phone,
                email: email,
                membershipId: membershipId,
                age: age,
                membershipType: membershipType,
                shift: shift,
                preferredHour: preferredHour,
                preferredCoach: prefCoachFlag,
                coachName: coachName,
                referralSource: referralSource,
                notes: notes
            };

            submitAssessmentToInzanCRM(payload)
                .then(function(res) {
                    $submitBtn.prop("disabled", false).html('<i class="fa fa-calendar-check-o mr-10"></i> Submit Request');
                    $("#successAthleteName").text(fullName);
                    $("#successAthleteGoal").text(membershipType);
                    $("#successAthleteTime").text(shift + " • " + preferredHour);
                    if (res && res.id) {
                        $("#successRefBadge").text("Inzan CRM Ref: #" + String(res.id).slice(0, 8).toUpperCase() + " • Status: Pending Coach Assignment");
                    }

                    var waMessage = encodeURIComponent(
                        "Hi Inzan Athletics! I just submitted my Assessment Request in the system.\n" +
                        "• Name: " + fullName + "\n" +
                        "• Phone: " + phone + "\n" +
                        "• Email: " + email + "\n" +
                        "• Membership ID: " + membershipId + " (" + membershipType + ")\n" +
                        "• Shift & Time: " + shift + " at " + preferredHour +
                        (prefCoachFlag && coachName ? ("\n• Preferred Coach: " + coachName + " (" + referralSource + ")") : "") +
                        (notes ? ("\n• Notes: " + notes) : "")
                    );
                    $("#successWhatsAppBtn").attr("href", "https://wa.me/201000061243?text=" + waMessage);

                    $form.slideUp(300, function() {
                        $("#inzanSuccessBox").slideDown(350);
                    });

                    showToast("Assessment logged in the Inzan System! Welcome, " + fullName + ".", "fa fa-check-circle");
                })
                .catch(function() {
                    $submitBtn.prop("disabled", false).html('<i class="fa fa-calendar-check-o mr-10"></i> Submit Request');
                    showToast("Could not reach server. Please try again or message us on WhatsApp.", "fa fa-exclamation-circle");
                });
        });

        // 2. Modal Assessment Booking Form Handler (#inzanModalAssessmentForm)
        $("#inzanModalAssessmentForm").on("submit", function(e) {
            e.preventDefault();
            var $form = $(this);
            var $submitBtn = $("#modalAssessmentSubmitBtn");

            var fullName = ($("#modalFullName").val() || "").trim();
            var phone = ($("#modalPhone").val() || "").trim();
            var email = ($("#modalEmail").val() || "").trim();
            var membershipId = ($("#modalMembershipId").val() || "Guest").trim() || "Guest";
            var age = $("#modalAge").val() || "21 to 30";
            var membershipType = $("#modalMembershipType").val() || "Premium Annual";
            var shift = $("#modalShift").val() || "Morning [8AM - 4PM]";
            var preferredHour = ($("#modalPreferredHour").val() || "").trim();
            var prefCoachFlag = $("#modalPrefCoachFlag").val() === "yes";
            var coachName = prefCoachFlag ? ($("#modalCoachName").val() || $("#modalCoachSelect").val() || "").trim() : "";
            var referralSource = prefCoachFlag ? ($("#modalReferralSource").val() || "Social Media") : "";
            var notes = ($("#modalNotes").val() || "").trim();

            $form.find(".inzan-form-control").css("border-color", "");

            if (!fullName || !phone || !email || !preferredHour || (prefCoachFlag && !coachName)) {
                if (!fullName) $("#modalFullName").css("border-color", "#FF4444");
                if (!phone) $("#modalPhone").css("border-color", "#FF4444");
                if (!email) $("#modalEmail").css("border-color", "#FF4444");
                if (!preferredHour) $("#modalPreferredHour").css("border-color", "#FF4444");
                if (prefCoachFlag && !coachName) $("#modalCoachName").css("border-color", "#FF4444");

                showToast("Please complete all required fields (Name, Phone, Email, Preferred Hour" + (prefCoachFlag ? ", Coach Name" : "") + ").", "fa fa-exclamation-triangle");
                return;
            }

            $submitBtn.prop("disabled", true).html('<i class="fa fa-circle-o-notch fa-spin"></i> Submitting...');

            var payload = {
                fullName: fullName,
                phone: phone,
                email: email,
                membershipId: membershipId,
                age: age,
                membershipType: membershipType,
                shift: shift,
                preferredHour: preferredHour,
                preferredCoach: prefCoachFlag,
                coachName: coachName,
                referralSource: referralSource,
                notes: notes
            };

            submitAssessmentToInzanCRM(payload)
                .then(function(res) {
                    $submitBtn.prop("disabled", false).html('<i class="fa fa-check-circle mr-5"></i> Submit Request');
                    $("#modalSuccessName").text(fullName);
                    $("#modalSuccessType").text(membershipType);
                    $("#modalSuccessShift").text(shift + " • " + preferredHour);
                    if (res && res.id) {
                        $("#modalSuccessRef").text("Inzan CRM Ref: #" + String(res.id).slice(0, 8).toUpperCase() + " • Status: Pending Coach Assignment");
                    }

                    var waMessage = encodeURIComponent(
                        "Hi Inzan Athletics! I just submitted my Assessment Request in the system.\n" +
                        "• Name: " + fullName + "\n" +
                        "• Phone: " + phone + "\n" +
                        "• Email: " + email + "\n" +
                        "• Membership ID: " + membershipId + " (" + membershipType + ")\n" +
                        "• Shift & Time: " + shift + " at " + preferredHour +
                        (prefCoachFlag && coachName ? ("\n• Preferred Coach: " + coachName + " (" + referralSource + ")") : "") +
                        (notes ? ("\n• Notes: " + notes) : "")
                    );
                    $("#modalSuccessWhatsAppBtn").attr("href", "https://wa.me/201000061243?text=" + waMessage);

                    $form.slideUp(250, function() {
                        $("#modalAssessmentSuccessBox").slideDown(300);
                    });

                    showToast("Assessment request submitted to the Inzan System!", "fa fa-check-circle");
                })
                .catch(function() {
                    $submitBtn.prop("disabled", false).html('<i class="fa fa-check-circle mr-5"></i> Submit Request');
                    showToast("Could not reach server. Please try again or message us on WhatsApp.", "fa fa-exclamation-circle");
                });
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

        $(".mobile-nav").off("click").on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            if ($(".desktop-nav").hasClass("mobile-open") || $(".desktop-nav").hasClass("js-opened")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Smooth Scroll Navigation Engine
        function smoothScrollToTarget(targetId) {
            if (!targetId || targetId === "#") return;
            var cleanId = targetId.replace(/^#/, "");
            var $target = (cleanId === "top" || cleanId === "home") ? $("body") : $("#" + cleanId);

            if ($target.length) {
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

        $(document).on("click", "a[href^='#']", function(e) {
            var href = $(this).attr("href");
            if (href && href.charAt(0) === "#" && href.length > 1) {
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

            desktopNavLinks.removeClass("active");
            $(".desktop-nav ul li a[href='#" + activeSection + "']").addClass("active");

            mobileDockButtons.removeClass("active");
            if (activeSection === "packages") {
                $(".inzan-mob-bar-btn[href='#packages']").addClass("active");
            } else if (activeSection === "schedule") {
                $(".inzan-mob-bar-btn[href='#schedule']").addClass("active");
            } else if (activeSection === "assessment") {
                $(".inzan-mob-bar-btn[href='#assessment']").addClass("active");
            }
        });
    }

    $(document).ready(initInzanFeatures);

    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(initInzanFeatures, 1);
    } else {
        document.addEventListener("DOMContentLoaded", initInzanFeatures);
    }

})(jQuery);
