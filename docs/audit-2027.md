# Inzan Athletics website audit

Date: 24 September 2026  
Scope: live homepage (`https://inzanathletics.com/`), mobile viewport (390×844), and local source in `inzan-site/`.

## Current assessment

The site has a strong dark, high-performance visual direction and the service offering is broad. It currently behaves like a long brochure page built on an older jQuery theme. The biggest opportunity is to make the first visit outcome-driven: a visitor should understand the centre's current status, choose a goal, see proof, and book an assessment within one or two taps.

## Findings

### High priority

1. **Conflicting availability message.** The hero says “SOON IN EGYPT!” while the page also says group/private training and financing are available, and lists a New Cairo address. This creates uncertainty at the exact moment a visitor decides whether to enquire. Replace it with a current, dated status such as “Now welcoming athletes in New Cairo” or an honest waitlist CTA.

2. **No primary conversion action above the fold.** The hero only offers a scroll cue. Add a clear primary button (“Book an assessment”) and secondary action (“See training zones” or WhatsApp) with the phone number visible on mobile.

3. **The live page ships a JavaScript error.** Browser console reports `TypeError: $(...).fitVids is not a function` from `js/all.js`. Remove the stale fitVids call or load the matching dependency. Errors during initialization can silently disable later interactions.

4. **Contact and newsletter forms need visible success/error states.** The accessibility tree exposes fields and submit buttons, but no clear booking flow, field labels, privacy explanation, confirmation state, or spam protection is apparent. Make the form explicitly say what happens next, validate inline, and show a success message without losing entered data.

5. **Placeholder editorial content is still public.** News cards are authored by “JOHN DOE”, use dates without a year, and the “Read more” controls are buttons with no visible article destination. Replace with real author/date data or remove the section until the CMS content is ready.

### Medium priority

6. **Information architecture is too flat.** About, facility zones, process, ten training types, philosophy, news, newsletter, contact, and map all live on one scroll. Add a sticky section nav and a short “Choose your path” block (beginner, performance athlete, team, nutrition) that routes visitors to relevant proof and CTA.

7. **Copy needs an editorial pass.** Visible text contains “accomodate”, “ensures”/subject agreement issues, “Afterwhich”, “asses”, “exercieses”, “ques”, “intented”, and “Bodybuidling”. Simplify long paragraphs, use sentence case, and describe outcomes in concrete terms.

8. **Trust proof is missing.** Add coach bios and credentials, facility photography/video, assessment methodology, testimonials with consent, measurable outcomes, opening hours, and a map/location card. “Science-based • data-driven • relentless” needs evidence beside it.

9. **Social links are dead placeholders.** Facebook, Instagram, and Twitter currently point to `#`. Link to the real profiles or remove them. Add WhatsApp as a first-class contact channel for the local audience.

10. **Mobile navigation is functional but not conversion-focused.** At 390×844 the menu collapses to an icon and expands to anchor links. Keep the menu, but add a persistent bottom “Book assessment”/WhatsApp action and ensure the menu has a visible close state, focus return, and sufficiently large hit targets.

### Lower priority / modernization

11. **The implementation is dated.** The source loads jQuery 1.11.2 plus many theme plugins and legacy icon fonts. Plan a progressive migration to semantic HTML, modern CSS, minimal JavaScript, and a componentized content model. Do not rewrite the whole site before fixing the conversion path and content.

12. **Performance likely depends on oversized imagery and background effects.** Convert portfolio/blog images to AVIF/WebP with responsive `srcset`, lazy-load below-the-fold media, preload only the hero image/font, and remove parallax/video effects on constrained devices. Measure LCP, INP, CLS, and total transfer size before and after.

13. **Accessibility needs a dedicated pass.** Preserve the existing image alt text, but add explicit labels for newsletter/contact fields, verify heading hierarchy and keyboard focus, provide a meaningful accessible name for the hamburger control, avoid icon glyphs as the only labels, and check contrast over the dark hero image. Remove `maximum-scale=1.0` from the viewport meta tag so users can zoom.

14. **SEO and discoverability can be stronger.** Add canonical and Open Graph metadata, LocalBusiness/ SportsActivityLocation structured data, stable page titles for future service pages, a real blog/article URL structure, and sitemap/robots verification. Use location language consistently: New Cairo, Cairo, Egypt.

## Recommended 2027 direction

Position the site as a premium performance centre with a clear local launch story. The homepage should follow this sequence:

1. Hero: current availability, one sentence on who it is for, “Book an assessment”, WhatsApp, and a real facility image/video.
2. Proof strip: location, assessment-led coaching, small groups, coach credentials, and an outcome/testimonial.
3. “Find your starting point”: cards for general fitness, sport performance, strength skills, and nutrition/recovery.
4. What happens in the first 30 days: assessment → program → coached sessions → progress review.
5. Training zones with real photos and concise descriptions.
6. Coach and facility proof, then testimonials/results.
7. Pricing or transparent package ranges, financing explanation, hours, map, and a short booking form.

## Suggested delivery order

**Sprint 1 (days):** fix the fitVids error; resolve availability wording; replace placeholders; correct copy; repair social links; add hero CTA, WhatsApp, form labels, confirmation/error states, and zoom support.

**Sprint 2 (1–2 weeks):** restructure the homepage around the conversion sequence; add real proof assets, coach profiles, hours/map, testimonials, and a dedicated assessment booking flow; improve mobile sticky actions.

**Sprint 3 (1–2 weeks):** optimize images/fonts/scripts; add schema/OG/sitemap; run accessibility and keyboard QA; measure Core Web Vitals on representative mobile devices.

**Later:** migrate away from the legacy theme/plugin stack and add service/article landing pages that can rank and convert independently.

## Audit evidence

- Live desktop and mobile pages load and expose the expected sections and anchor navigation.
- Live browser console: `TypeError: $(...).fitVids is not a function` in `https://inzanathletics.com/js/all.js`.
- Live mobile viewport tested at 390×844; menu collapses to an icon and expands to anchor links.
- Local source confirms jQuery 1.11.2 and multiple legacy plugins; placeholder author text and dead social `#` links are present in `index.html`.
