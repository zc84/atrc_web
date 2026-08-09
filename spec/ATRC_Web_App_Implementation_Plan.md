# ATRC Talent Platform — Unified Web and iPhone Experience Implementation Plan

## Implementation Status — 9 August 2026

The first implementation milestone and the approved Web/iPhone preview extension are complete:

- [x] Screen 01 — Home / Landing page
- [x] Screen 02 — Advanced Technologies catalogue
- [x] Career Pathways, Opportunities Center, Talent Enablement, and Career Planner overview pages
- [x] Shared responsive application header and footer
- [x] Complete English/Arabic content for every implemented route, including dynamic data, filters, careers, footer content, document titles, and accessible labels
- [x] RTL layouts verified across implemented desktop, mobile, and iPhone preview screens
- [x] Technology search, category filters, save interaction, and empty state
- [x] Lazy-loaded ATRC film feature with playback controls and reduced-motion fallback
- [x] Film-caption A/B experiment: preserved 5.5-second classic captions (A), full-duration cinematic crawl (B), stable 50/50 browser assignment, forced QA parameters, EN/AR content, and RTL support
- [x] Responsive desktop, tablet, and mobile layouts for completed screens
- [x] Reduced-motion and keyboard-focus foundations
- [x] Production build verified with Vite
- [x] Web header phone entry, `/iphone/home` placeholder, adaptive iPhone frame, EN/AR, RTL, and Return-to-Web flow
- [x] Unified master specification created; superseded mobile specification and legacy source document removed

A/B QA routes:

- Classic film captions: `/?videoCaptions=a`
- Cinematic film crawl: `/?videoCaptions=b`
- Unforced traffic: stable 50/50 assignment stored in browser storage and exposed through `data-video-captions-variant`

Next planned screen: Advanced Technology detail experience, followed by the Career Test entry and question journey.

## Product Direction Update — 9 August 2026

This document is the single master specification for the ATRC Talent Platform client experience.

The previously planned native iOS and Android applications are replaced by a **browser-based iPhone experience** delivered inside the same Web application. Users enter this experience by selecting the phone icon in the Web header. The browser then opens a dedicated iPhone route and renders the mobile product inside an adaptive iPhone frame, with a persistent and accessible way to return to the Web experience.

The iPhone experience is not a responsive copy of the public website and not merely a visual demo. It is a primary product channel for mobile users, with complete acquisition, activation, conversion, and retention journeys: discovery, Career Test, registration, profile, Save/Apply, reports, Career Planner, CV Builder, Habit Tracker, and AI Chat preview. It shares localisation, feature services, client state, analytics, and design tokens with the Web experience.

Native-only capabilities use browser-safe equivalents or clearly labelled fallbacks. No native application, App Store package, Android application, signing workflow, native SDK, or guaranteed background execution is required.

The iPhone experience must remain lightweight, but performance is achieved through mobile-specific composition, progressive disclosure, scoped data, code splitting, and browser-native capabilities rather than by removing user journeys. Web may provide more space and advanced productivity tools, but it must not be required to complete a core youth-facing journey.

## Mobile Business Value and Parity

The target audience is expected to discover, evaluate, register, return, and act primarily from mobile devices. The iPhone experience therefore owns the complete customer lifecycle:

1. **Acquire** — discover Technologies, Pathways, Programmes, Articles, and Career Test entry points from direct links and search.
2. **Activate** — complete Career Test, registration, onboarding, and a meaningful first profile state without leaving iPhone.
3. **Convert** — Save content, Apply to programmes, access reports, build/export a usable CV, and begin a Career Plan.
4. **Retain** — return to Dashboard, continue Planner tasks, track Habits/Goals/Routines, review progress, and receive browser-safe reminders.
5. **Build trust** — preserve EN/AR state, accessibility, privacy/account controls, transparent AI availability, and reliable cross-session state.

Business rules:

- No primary CTA may lead to an iPhone screen that is only decorative or non-functional, except AI Chat while its provider is explicitly unavailable.
- Login, registration, onboarding, Career Test, result access, Save, Apply, profile completion, Planner progress, Habit tracking, report access, CV PDF export, Logout, and Delete Account must be completable inside the iPhone experience.
- Web handoff is optional for enhanced productivity, external/provider-owned content, or formats that are genuinely desktop-specific. It must not be a prerequisite for conversion.
- Every interrupted multi-step journey must autosave locally and resume from the last valid step.
- Direct `/iphone/*` links must be shareable and must open the relevant content or action, not only the Dashboard.
- Mobile funnel events must distinguish view, start, completion, abandonment, resume, error, and Web handoff so product loss can be measured.
- Any mobile feature reduction requires an explicit product decision supported by analytics or a technical constraint; it may not be introduced solely to simplify implementation.
- English and Arabic mobile funnels must have functional parity; no CTA, field, validation, upload, export, or completion state may be omitted or deferred in RTL.

## Mobile Specification Review and Resolutions

| Previous mobile requirement | Review finding | Master specification resolution |
| --- | --- | --- |
| Separate native iOS and Android applications | Conflicts with the approved single-Web-application direction and duplicates feature delivery | Replace both native clients with one browser-based iPhone experience in the existing Web deployment |
| Swift/SwiftUI and Kotlin/Jetpack Compose stacks | No longer applicable without native binaries | Use the existing Web stack, shared services, and dedicated iPhone presentation components |
| iOS and Android device shells | Approved scope is iPhone only | Use one adaptive contemporary iPhone frame with no device selector or Android variant |
| Native navigation and deep links to mobile Web | Browser routes can own both application navigation and cross-experience transitions | Use dedicated `/iphone/*` routes, central route mapping, browser history, and source-route restoration |
| Native local notifications and remote push readiness | Browsers cannot guarantee background delivery when closed | Provide in-app reminders and optionally use the Notification API after explicit user action, with a clear fallback and no delivery guarantee |
| Device storage, Keychain, and Android Keystore | Native secure stores are unavailable, but useful mobile workflows need continuity | Persist non-sensitive client state through versioned browser storage behind service interfaces; never store secrets |
| Native Share, file picker, and document viewer behavior | Browser support is sufficient for common lightweight actions but not heavy processing | Use Web Share, browser file input, download, and document preview where lightweight; hand off parsing and generation to Web |
| Native build, signing, store review, and publishing | Outside the approved delivery model | Remove from delivery phases, required inputs, testing, and acceptance criteria |
| English-only mobile launch with future RTL readiness | Would create a language regression when switching from the bilingual Web experience | Share the current EN/AR state and require full RTL in the iPhone experience |
| Duplicate mobile feature services and data | Risks divergent profile, saved, test, and planner state | Share domain services and client state; keep only presentation and navigation mode-specific |
| Full duplication of desktop layouts inside the iPhone frame | Creates a heavy bundle and poor mobile ergonomics | Preserve functional parity while redesigning workflows for mobile through steps, progressive disclosure, scoped data, and lazy feature loading |
| AI Buddy as a fully connected chatbot | No AI provider is installed in the current stage | Deliver the complete chat presentation UI with transparent preview messaging, a disabled composer, and no model or network calls |

For implementation planning, this approved product direction supersedes the native iOS/Android delivery clauses in the July 2026 Functional Scope of Work. All non-native functional requirements from that source remain represented in this master specification.

## 1. Objective

Deliver a **production-grade client-facing Web application with a dedicated browser-based iPhone experience** for the ATRC Talent Platform.

The application must provide a complete, polished Web experience across desktop, tablet, and mobile browsers plus a purpose-built iPhone companion experience that runs in the browser while remaining independent from backend services during the current implementation stage.

Both presentation modes will be built so that future backend, CMS, identity, Career Test, CRM, LMS, analytics, and AI integrations can be connected through shared service contracts without redesigning either interface.

---

## 2. Current Implementation Scope

### Included

- Production-grade Web application
- Browser-based iPhone application experience inside the same codebase and deployment
- Phone icon in the Web header that opens the iPhone experience
- Dedicated `/iphone/*` route namespace
- Adaptive modern iPhone frame for desktop and tablet browser preview
- Persistent return-to-Web action that restores the originating Web route
- iPhone-specific navigation shell, bottom tabs, app bars, dashboard, and screen hierarchy
- Mobile-first functional parity for all core user journeys with local client persistence
- Installable browser-app metadata and iPhone Home Screen support
- Full-screen iPhone rendering on narrow/standalone viewports and framed preview on desktop/tablet
- Responsive desktop, tablet, and mobile layouts
- English and Arabic
- Full RTL support
- ATRC design system and reusable UI components
- Public website pages
- Advanced Technologies
- Career Pathways
- Talent Enablement Programs
- Career Planner
- Card-based iPhone dashboard
- Saved Items and Reports
- Functional Habit Tracker, Goals, Routines, streaks, badges, local analytics, and browser-safe reminders
- AI Chat preview UI with provider-unavailable status
- Career Test user experience
- Registration and account screens
- User Profile
- Saved items
- AI CV Builder user experience
- Articles and supporting pages
- Site-wide client-side search
- SEO foundations
- Client-side analytics instrumentation
- Accessibility
- Performance optimisation
- Browser compatibility
- Automated UI testing
- Service contracts for later integrations

### Not included in the current stage

- Backend services
- Databases
- Headless CMS implementation
- Live business APIs
- UAE Pass integration
- SMS/OTP provider integration
- Email delivery
- CRM integration
- LearnWorlds integration
- Career Test vendor API
- Remote analytics provider
- Server-side document processing
- Server-side AI/LLM processing
- Production data persistence outside the browser/client application
- Native iOS or Android application development
- App Store or Google Play packaging, review, signing, and distribution
- Swift, SwiftUI, Kotlin, Jetpack Compose, native navigation, Keychain, or Android Keystore
- Native push-notification infrastructure or native notification scheduling
- Native UAE Pass SDK integration
- AI provider, AI SDK, model inference, RAG, embeddings, streaming responses, or chat persistence
- Server-side document parsing, background jobs, native-only integrations, or unbounded desktop-style data grids

---

# 3. Product and UX Requirements

The application must:

- feel futuristic, premium, and youth-oriented;
- remain consistent with ATRC branding;
- avoid generic template-style presentation;
- use interactive storytelling where appropriate;
- avoid text-heavy layouts;
- prioritise important information visually;
- support content discovery through cards, grids, progressive disclosure, filters, and contextual navigation;
- provide a consistent experience in English and Arabic;
- fully support RTL layouts;
- work on desktop, tablet, and mobile;
- support major modern browsers;
- provide a clearly discoverable phone icon in the Web header without disrupting the existing primary navigation;
- treat the iPhone experience as a primary mobile product rather than a miniature website or secondary preview;
- preserve language, login, registration, profile, Career Test, Saved Items, applications, reports, Planner, CV, and Habit state across Web and iPhone modes;
- complete all core customer journeys in-frame and use Web handoff only as an optional enhanced view;
- show AI capability status honestly and never simulate generated responses when no AI provider is configured;
- keep iPhone controls reachable with touch-sized targets and respect simulated safe areas;
- provide a visible return-to-Web action on every top-level iPhone screen;
- use semantic markup and accessible interaction patterns;
- target fast page rendering and an average page-load objective of approximately 2.5 seconds under normal UAE conditions, subject to final media and hosting.

---

# 4. Unified Client Architecture

## 4.1 Application structure

Recommended modular structure:

```text
src/
  app/
    routing/
    layout/
    configuration/
    localisation/
    experience-mode/
    pwa/
  features/
    home/
    technologies/
    pathways/
    programs/
    career-test/
    career-planner/
    account/
    profile/
    cv-builder/
    articles/
    search/
    iphone-shell/
    dashboard/
    saved-items/
    reports/
    habit-tracker/
  shared/
    ui/
    forms/
    media/
    accessibility/
    analytics/
    utilities/
    device-frame/
    offline/
  services/
    auth/
    profile/
    content/
    career-test/
    programs/
    saved-items/
    cv-builder/
    search/
    analytics/
    habits/
    notifications/
    deep-links/
  data/
    content/
    configuration/
```

## 4.2 Architecture rules

1. UI components must not call external endpoints directly.
2. All data access must go through service interfaces.
3. The current implementation uses client-bundled structured data and client-side application state.
4. Future API implementations must be replaceable behind the same interfaces.
5. Environment-specific settings must be configuration-driven.
6. No production secrets may be included in the browser bundle.
7. EN/AR content and direction must be handled centrally.
8. All content-heavy sections must use reusable, data-driven templates.
9. Web and iPhone routes must share domain services, structured content identifiers, and route mapping; iPhone routes request only the data slice required for the active screen.
10. The experience mode must be derived from the route and must not depend on user-agent detection.
11. iPhone routes must live under `/iphone/*`; equivalent Web and iPhone entities must use stable shared content identifiers.
12. Switching modes must preserve the source route so the user can return to the same Web context where possible.
13. The iPhone mode must not initialise AI SDKs, generate documents, parse large uploads, start background workers, or load heavy analytics/charting engines.
14. Non-sensitive feature state uses versioned browser storage behind shared service interfaces; transient navigation and UI state remains in memory or session storage.
15. No visual iPhone frame may constrain the semantic document, keyboard navigation, screen-reader access, or automated testing hooks.
16. Optional enhanced-workspace and external-provider transitions use `DeepLinkService`, preserve state, disclose the destination, and must never replace a required core iPhone action.
17. Core user journeys must use the same feature services in Web and iPhone modes; mode-specific differences belong to presentation and navigation only.
18. The iPhone experience must provide a Web App Manifest, Home Screen icons, standalone display configuration, safe-area support, and a minimal versioned service-worker strategy for the application shell and explicitly cacheable content.
19. Service-worker caching must never cache sensitive form submissions, personal exports, auth tokens, or stale mutable account data.
20. Language and `dir` are owned by the application root and inherited by every Web/iPhone route, portal, dialog, sheet, toast, and overlay.
21. Directional layout must use CSS logical properties and direction-aware component APIs rather than duplicated left/right styles.
22. Mixed-direction values must use semantic isolation (`bdi`, `dir="auto"`, or explicit `dir="ltr"` for email, URL, phone, code, and identifier fields) so Arabic labels do not reorder user data.

---

# 5. Epic W1 — Design System and Application Shell

## Requirements

- ATRC visual system
- Responsive grid
- LTR/RTL foundations
- Reusable components
- Consistent motion and interaction
- Accessibility
- Mobile-first responsive behaviour
- Shared Web/iPhone design tokens with mode-specific composition
- Browser-based iPhone safe areas, status bar, home indicator, and frame scaling
- Installable iPhone Web App shell and standalone display mode

## Components

- [x] Header
- [x] Main navigation
- [x] Mobile navigation
- [x] Footer
- [x] Buttons and CTA variants
- [x] Cards
- [ ] Grid/list patterns
- [ ] Tabs
- [ ] Accordions
- [ ] Modals
- [ ] Drawers
- [ ] Carousels
- [x] Chips and tags
- [x] Search controls
- [x] Filters
- [x] Inputs
- [ ] Selects
- [ ] Upload controls
- [ ] Progress indicators
- [ ] Notifications/feedback messages
- [x] Empty states
- [ ] Error states
- [ ] Restricted-content state
- [ ] Skeleton/loading states
- [ ] Media blocks
- [x] Video blocks
- [ ] Data-table and comparison layouts
- [x] EN/AR language switch
- [x] RTL mirroring
- [x] Reduced-motion support
- [x] Header phone icon with accessible label and tooltip
- [x] iPhone experience frame
- [ ] iPhone app navigation shell
- [ ] iPhone bottom tabs and app bars
- [x] Return-to-Web control
- [ ] Web-handoff feedback for heavyweight workflows
- [ ] AI Chat preview screen and provider-status message
- [ ] Web App Manifest, iPhone icons, install metadata, and offline shell

## Experience switching requirements

- The phone icon appears in the desktop and tablet Web header and remains available from the responsive navigation menu.
- Activating the icon opens the mapped iPhone route when one exists, otherwise `/iphone/home`.
- The iPhone frame uses one adaptive modern iPhone model; there is no device-model selector.
- On large viewports, the complete device is centred in a restrained preview environment and scales to remain fully visible.
- On narrow iPhone-class and standalone viewports, the outer decorative device frame is removed and the application renders full-bleed with safe-area spacing. The iPhone silhouette is used only for desktop/tablet preview.
- Browser Back/Forward navigation must work across experience-mode changes.
- A persistent Return to Web action restores the originating Web route; `/` is the fallback.
- Focus moves to the iPhone application landmark after entry and returns to the phone trigger after exit where technically possible.
- The frame is presentational and must be hidden from assistive technology; only the application content is exposed semantically.
- The iPhone experience may be added to the Home Screen and must launch directly into the application shell without the desktop preview background.

---

# 6. Epic W2 — Home / Landing Page

## Sections

### Hero — Design Your Future

- Primary CTA: **Take a Quiz**
- Secondary CTA: **Login**
- Strong visual focal point
- Responsive hero composition

### Future Statistics

- Key future/technology statistics
- Animated or interactive presentation with accessible fallback

### Our Mission

- Main ATRC mission statement
- CTA to About

### Talent Enablement Preview

- Selected programs/initiatives
- CTA: **Explore ATRC Programs**

### Career Paths Overview

- Grid-based pathway overview
- CTA: **More About Career Paths**

### Advanced Technologies Overview

- Technology cards
- Quick descriptions
- CTA into technology catalogue
- Direct links to technology details

### Featured Spotlights / Future Heroes

- Slider or card carousel
- Image/content support
- Responsive interaction

### Career Quiz CTA

- Strong CTA to Career Test

### Footer

- About
- Contact
- FAQ
- Useful Materials
- Privacy
- Terms
- ATRC links

## iPhone acquisition presentation

- Public iPhone Home provides immediate Career Test, Explore Technologies, Explore Pathways, Programmes, Search, and Login/Register actions before authentication.
- The first viewport prioritises one activation CTA based on available client state and does not require horizontal navigation discovery.
- Returning authenticated users land on Dashboard rather than the public acquisition screen.

---

# 7. Epic W3 — Advanced Technologies

## Catalogue

The application must provide a configurable Advanced Technology catalogue supporting ATRC-defined domains, including:

- AI and Digital Science — STEM
- AI and Digital Science — Non-STEM
- Quantum
- Renewable & Sustainable Energy
- Propulsion & Space
- Directed Energy
- Autonomous Robotics
- Secure Systems
- Advanced Materials
- Cryptography
- additional ATRC-configured domains where required

## Technology detail experience

Each Technology Detail page must support:

- Introduction
- Why the technology matters
- Key subjects to study
- Technology domains
- Technology goals
- Education requirements
- Professions
- Qualification levels
- Recommended programmes
- Study routes
- Universities
- Degree levels
- Job descriptions
- Responsibilities
- Required qualifications
- Related technologies
- Related pathways
- Videos
- Competitions/resources
- Career Quiz CTA

## UX requirements

- Interactive presentation
- Progressive disclosure
- Expandable sections
- Visual cards and diagrams
- Minimal long-form text shown at once
- Accessible interaction fallbacks
- EN/AR content
- Full RTL support

## iPhone presentation

- Mobile-first catalogue with functional search, filters, Saved state, and compact technology cards
- Focused detail summary: introduction, why it matters, key subjects, careers, education snapshot, related pathways, and related technologies
- All Technology Detail content remains reachable through progressive disclosure, mobile cards, accordions, and vertical comparison patterns
- Optional **View on Web** action may provide wider matrices or richer media without hiding information required for understanding or conversion
- Returning from Web detail restores the iPhone technology and scroll/navigation state

---

# 8. Epic W4 — Career Test

## User journey

1. Career Test landing page
2. Introduction and instructions
3. Start Test
4. Multi-step questions
5. Branching navigation
6. Progress display
7. Previous/Next
8. Completion
9. Result processing state
10. Result dashboard
11. Primary pathway match
12. Secondary pathway matches
13. Recommendation summary
14. Detailed recommendations
15. Career Pathway links
16. Personalized report access
17. Result saved to the client-side account state

## Current-stage implementation

The full client journey must be functional without an external Career Test service.

Question configuration, branching structure, result presentation, and report content are loaded from the application's configured client data.

The integration boundary must allow the external Career Test provider to replace the client data source later without redesigning the test UI.

## iPhone presentation

- Complete one-question-at-a-time Career Test with large answer targets, branching, progress, Previous/Next, and resume support
- Answers and completion state persist through `CareerTestService` using the shared client implementation
- Result summary prioritises the primary pathway, secondary matches, recommendations, next action, Save Result, and report access
- Report files are viewed or downloaded through browser-native behavior; report generation remains outside the iPhone route
- Full long-form result analysis may open the equivalent Web report while preserving iPhone state

---

# 9. Epic W5 — Login, Registration and Account

## 9.1 Login behavior

Login screens are part of the final product experience; however, **credential validation is intentionally not implemented in the current client-only stage**.

### Required behaviour

- Username/email field may be left empty.
- Password field may be left empty.
- Selecting **Login / Sign In / Continue** always opens the authenticated user area.
- No error is displayed for missing or incorrect credentials.
- No request is sent to a backend authentication service.
- No username/password is required to access authenticated client screens.
- UAE Pass and OTP entry points may be displayed as part of the final UI, but their Continue/Sign In actions also transition directly into the authenticated client state.
- Authentication state is maintained by the client application for navigation purposes only.

This rule applies to all login entry points used by the Web application.

The Web and iPhone modes use the same client authentication state. Entering or leaving the iPhone experience must not log the user in or out.

## 9.2 Registration

### User types

- Student
- Parent
- Educator
- Other

### Account information

- Role
- Birth year / date of birth as approved by final UX
- First name
- Last name
- Email
- Password field
- Mobile number
- Terms/privacy consent

### Student information

- Gender
- Nationality
- Emirate
- Grade/year
- Curriculum
- Communication preference

### Parent information

- Parent details
- One or more children
- Child name
- Gender
- Nationality
- Emirate
- Grade/year
- Curriculum
- Add/remove child

### Educator information

- Gender
- Nationality
- Highest education
- Grades taught
- School/university
- Subjects taught
- Emirate
- Curriculum taught
- Work email

### Other user information

- Gender
- Nationality
- Highest education
- Emirate
- Profession
- Company
- Work email

## 9.3 Minor / guardian flow

- Age verification
- Guardian consent screen for users under 18
- Consent confirmation
- Parent/guardian relationship UI
- Clear privacy explanation

## 9.4 Account management

- Login
- Logout
- Forgot Password
- Reset Password
- Change Password
- Account Settings
- Communication preferences
- Delete Account
- Data-erasure confirmation
- Session-expired screen

Backend execution of account-security operations is outside the current scope, but all client-side screens and journeys must be complete.

## 9.5 iPhone onboarding and account presentation

- Functional Welcome, login-method selection, email/password, UAE Pass, OTP, Logout, and session-expired flows under the current no-validation login rule
- Complete role-aware registration and onboarding for Student, Parent, Educator, and Other, including minor/guardian consent and parent/child flows
- All account and role fields are available in step-based mobile forms with progress, validation, autosave, and resume
- Non-sensitive client state is shared with Web through `AuthService` and `ProfileService`
- Forgot/Reset Password, Settings, communication preferences, Logout, Delete Account, and data-erasure confirmation are available in-frame

---

# 10. Epic W6 — User Profile

The User Profile must support approximately 100 ATRC-defined indicators through a structured, role-aware experience.

## Main sections

1. Interests
2. Academic Journey — School
3. Subjects & Grades
4. University / College
5. Competitions
6. Projects
7. Extracurricular Activities
8. Internships & Work Experience
9. Certifications & Online Courses
10. Skills & Tools
11. Languages
12. Social & Portfolio
13. Contacts
14. CV Builder

## 10.1 Interests

### Advanced Technologies

- Multi-select technology interests

### Sectors

- Aerospace and Space
- Food and Agriculture
- Healthcare
- Safety and Security
- Sustainability / Environment / Energy
- additional configured sectors

---

## 10.2 Academic Journey — School

- School name
- Search/autocomplete
- Emirate
- Curriculum
- Grade/year
- Stream/track where applicable
- Overall grade
- Transcript upload
- University-enrolment shortcut
- Conditional field visibility

---

## 10.3 Subjects & Grades

- Favourite subjects
- Least-favourite/challenging subjects
- Selection limits
- Curriculum-aware grades
- Predicted/estimated grade flag
- Predicted grade entry
- Validation and completion state

---

## 10.4 University / College

- Institution
- UAE / international
- Emirate/city
- Country/city
- Degree level
- Year
- Major
- Minor
- Specialisation
- Graduation year
- GPA
- Previous degrees
- Repeatable education entries

---

## 10.5 Competitions

Repeatable records supporting:

- Competition name
- Organiser
- Year
- Level
- Domain
- Result
- Certificate
- Description

---

## 10.6 Projects

Repeatable records supporting:

- Project title
- Project type
- Domain
- Role
- Tools
- Dates
- Ongoing state
- Description
- Project URL
- Media/file

---

## 10.7 Extracurricular Activities

- Activity
- Category
- Organisation
- Role
- Dates
- Ongoing state
- Hours/week
- Description

---

## 10.8 Internships & Work Experience

- Organisation
- Role
- Experience type
- Industry
- Dates
- Current role
- Country
- Emirate/city
- Description

---

## 10.9 Certifications & Courses

- Certification/course name
- Issuer
- Issue date
- Expiry
- No-expiry option
- Credential ID
- URL
- File upload

---

## 10.10 Skills & Tools

- Categorised skills
- Skill selection
- Proficiency level
- Custom skill
- Tools/platforms
- Custom tool

---

## 10.11 Languages

- Language
- Proficiency
- Add/remove language

---

## 10.12 Social & Portfolio

- LinkedIn
- GitHub/Portfolio
- Kaggle
- Google Scholar
- ResearchGate
- Personal website
- Career objective / bio

---

## 10.13 Contacts

- Emirates ID field
- Primary email
- Backup email
- Mobile
- Emergency contact
- Emergency phone

---

## 10.14 Role-aware behavior

Profile fields and wording must adapt to:

- Student
- Parent
- Educator
- Other

Example:

- student: school/university at which the user studies;
- educator: school/university at which the user works;
- parent: child profiles and child-specific academic information.

## Client-state behavior

- Profile changes are retained in client application state.
- Non-sensitive client persistence may be used where required for continuity.
- No production personal data is sent externally in this stage.
- Future persistence is handled through the `ProfileService` integration contract.

## iPhone profile interaction

- Profile summary, completion indicator, section navigation, role-aware labels, and autosave feedback
- All configured profile sections and fields remain editable through step-based, section-based, and progressive-disclosure mobile forms
- Searchable school/university controls, conditional fields, add/remove repeatable records, validation, and resume support
- Browser-native file selection for transcripts, certificates, project media, and supported attachments with size/type feedback
- Changes use the shared `ProfileService` client state and remain visible on Web
- Optional **Edit on Web** provides a wider bulk-editing view but is not required for profile completion

---

# 11. Epic W7 — AI CV Builder

## Required user experience

- Integrated directly into the User Profile
- Uses Profile data as input
- Avoids duplicate data entry
- 5–7 modern CV layouts
- Multiple colour options
- Multiple font options
- Student layout
- Professional layout
- Research/PhD layout
- Live preview
- Section ordering
- Include/exclude sections
- Manual editing
- Improvement guidance
- CV upload
- LinkedIn Profile Summary upload
- Extracted-field confirmation UI
- PDF export
- DOCX export

## Current client implementation

### Fully functional client-side features

- Profile-to-CV mapping
- Template selection
- Colour selection
- Font selection
- Live preview
- Section visibility
- Section ordering
- Manual editing
- Rule-based CV quality suggestions
- Client-side document export where technically feasible
- Upload and review flow

### Integration-ready features

The application must expose a `CVBuilderService` interface for future:

- AI improvement suggestions
- LLM-assisted rewriting
- CV parsing
- LinkedIn PDF parsing
- automated profile extraction

The user interface must not require redesign when these services are connected.

## iPhone presentation

- Build My CV entry from Dashboard and Profile
- Profile readiness review, CV type, template, colour, font, section visibility, ordering, and mobile editing
- Live paged preview rendered with lightweight HTML/CSS and print styles
- Manual section editing and rule-based improvement guidance without an AI provider
- PDF export through browser print/download behavior or an explicitly lazy-loaded lightweight exporter
- Existing CV/LinkedIn upload may be accepted for later review, but parsing remains unavailable until the configured service exists
- DOCX export, precision desktop layout editing, and future AI rewriting may use optional **Continue on Web** actions
- No AI SDK or document-parsing engine loads inside the iPhone route

---

# 12. Epic W8 — Career Pathways

## Pathway catalogue

- Future Builder — Engineers
- Future Explorer — Scientists
- Future Analyst — Data, Finance
- Future Creator — Design, AR/VR
- Future Leader — Entrepreneurs, Managers
- Future Strategist — Advisors, Policy Developers
- Future Communicator — Media, Education
- Future Healer — Medicine
- Future Sustainability Champion — Sustainability
- Future Enabler — Law, HR, Security

## Pathway detail

- Who they are
- What they do
- Careers to explore
- Technical skills
- Soft skills
- Academic roadmap
- Bachelor → Master → PhD
- High-school subject mapper
- UAE universities
- Global universities
- Future skills
- Profile-building guidance
- Professions
- Job descriptions
- Key subjects
- Videos
- Competition links
- Suggested technologies
- Career Quiz CTA

## iPhone presentation

- Complete pathway catalogue with functional Saved state and focused detail screens
- Overview, careers, skill stack, academic roadmap, key subjects, related technologies, and Career Quiz CTA
- Complete Pathway content remains reachable through progressive disclosure, including universities, professions, videos, and resources
- Optional **View on Web** provides wider roadmaps and comparison layouts without withholding core content

---

# 13. Epic W9 — Talent Enablement Programs

## Researcher Journey

- Six-stage journey visual
- Stage selection
- Stage details
- Initiatives per stage

## Program listing

- Search
- Filters
- Age/grade
- Stage
- Timeline
- Location
- Eligibility
- Saved state

## Program card

- Name
- Image
- Target age/grade
- Short description

## Program detail

- Image
- Name
- Target age/grade
- Short description
- Detailed description
- Dates
- Place
- Deadline
- Location
- Eligibility
- Requirements
- Save
- Apply

## Client behavior

- Search and filters execute locally.
- Save state is stored in the client application.
- Apply opens the final application flow/state defined by the approved UX.
- Saved programs are available from the User Account.

## iPhone presentation

- Program directory with functional search, filters, Saved state, and paged/lazy content loading
- Program cards and complete mobile details are browsable inside the iPhone experience
- The Researcher Journey uses a horizontally navigable six-stage control with an accessible list fallback
- Save operates in-frame through `SavedItemsService` and remains consistent with Web
- Apply uses a step-based in-frame application journey with validation, autosave, resume, confirmation, and success state
- Only an explicitly external/provider-owned application may leave ATRC, and the destination must be disclosed before navigation

---

# 14. Epic W10 — Career Planner

Career Planner is available to authenticated users.

Anonymous users can see the section entry point and an unlock/login CTA.

Because login has no credential validation in the current stage, the user can enter the Career Planner directly by selecting the Login/Continue action.

## Modules

### 1. Overview

- Step-by-step plan
- Task structure
- Career Quiz CTA

### 2. Profile Building

- What profile building is
- Why subjects matter
- Subjects and exams
- Mistakes to avoid
- From subjects to pathways

### 3. Grade Planner

- Grades 9–12 timeline
- Focus & Grow
- Outcomes

### 4. AI Prompts

- Prompt/resource content

### 5. Resources

- Courses & Programs
- Projects & Challenges
- Research Platforms
- Useful Materials

### 6. Showcasing Profile

- CV writing tips
- LinkedIn guidance
- Impact-based CV examples
- Portfolio guidance
- GitHub
- Behance
- Notion

### 7. University Prep

- UAE admissions
- Global pathway requirements
- Personal statement guidance
- EmSAT
- AP
- A-Levels
- Build Your CV CTA

## iPhone presentation

- Dashboard entry, section overview, and mobile navigation across all seven modules
- Planner tasks, completion state, next action, bookmarks, notes, Grade Planner, resources, profile showcasing, and University Prep work in-frame and persist through shared client state
- Long content uses chapters, accordions, checklists, and save-for-later patterns rather than requiring desktop
- Optional Web view may offer more workspace for advanced comparison or editing but is not required to complete a Planner module
- Opening Web/PDF content must preserve the originating planner module and return path

---

# 15. Epic W11 — Supporting Content

## Pages

- About Us
- Mission & Vision 2071
- Useful Materials
- For Educators
- Contact
- FAQ
- Privacy
- Terms
- Articles / Posts

## Article renderer

Support flexible block-based content:

- headings;
- rich text;
- images;
- video;
- galleries;
- quotes;
- tables;
- callouts;
- cards;
- CTA sections;
- related content.

The content model must be compatible with later headless CMS integration.

## iPhone presentation

- About, FAQ, Privacy, Terms, Useful Materials, and Articles remain fully readable inside the iPhone shell.
- Article blocks recompose into a single-column reading flow with accessible tables, galleries, video, callouts, and related content.
- Reading position may be retained locally for return visits.

---

# 16. Epic W12 — Site Search

Search across:

- Technologies
- Career Pathways
- Programs
- Articles

## Requirements

- EN and AR
- Category filters
- Search suggestions
- Result highlighting
- No-result state
- Result grouping
- Keyboard accessibility
- Mobile responsive design

The current search index is generated from structured content bundled with the Web application.

A future remote search service can replace the local `SearchService` implementation.

## iPhone presentation

- Global Search is available from Explore and searches Technologies, Pathways, Programmes, and Articles.
- Suggestions, recent searches, grouped results, highlighting, filters, keyboard handling, empty/error states, and direct result navigation work in-frame.
- Search loads the index incrementally or by scoped category and must not require downloading all content bodies.

---

# 17. Epic W13 — SEO

Implement:

- Semantic HTML
- Page title
- Meta description
- OpenGraph metadata
- Canonical URL
- hreflang
- EN/AR alternates
- XML sitemap
- robots configuration
- social preview metadata
- structured heading hierarchy
- image alt text
- accessible link labels
- canonical metadata for public Web routes
- `noindex` metadata for authenticated and iPhone application routes unless explicitly approved otherwise

---

# 18. Epic W14 — Analytics Instrumentation

Implement an analytics event layer for:

- Page View
- Quiz Start
- Quiz Complete
- Technology Open
- Pathway Open
- Program Open
- Save
- Apply
- Login
- Register
- Profile Section Complete
- CV Builder Start
- CV Template Select
- CV Export
- Career Planner Open
- Search
- Search Result Click
- Article Read
- Outbound Link
- iPhone Experience Open
- iPhone Experience Exit
- iPhone Direct Deep Link Open
- iPhone Standalone Launch
- iPhone Install Guidance View
- Experience Preference Set
- Mobile Funnel Start
- Mobile Funnel Resume
- Mobile Funnel Abandon
- Mobile Funnel Complete
- Dashboard Card Open
- Report Open
- Habit Create
- Habit Update
- Habit Complete
- Habit Skip
- Routine Complete
- Goal Complete
- Reminder Preference Change
- AI Chat Preview Open
- AI Provider Unavailable Notice View
- iPhone to Web Handoff
- Experience Deep Link Open

Mobile funnel events must include the journey name, step identifier, source route/campaign where available, completion state, and anonymous session correlation without placing profile answers or personal data in analytics payloads.

The current application records events through the internal client analytics service.

A remote analytics provider can be added later without changing feature code.

---

# 19. Epic W15 — LMS Client Surface

Implement:

- Course/program entry points
- Course cards
- Continue-learning states
- External navigation
- Loading/error UI
- SSO-ready navigation flow
- LMS integration contract

No LearnWorlds network connection is required in this stage.

---

# 20. Epic W16 — Integration Contracts

Required service interfaces:

- `AuthService`
- `ProfileService`
- `CareerTestService`
- `ProgramService`
- `SavedItemsService`
- `ReportService`
- `TechnologyContentService`
- `CareerPathwayService`
- `ArticleService`
- `SearchService`
- `CVBuilderService`
- `LMSService`
- `AnalyticsService`
- `HabitRepository`
- `NotificationService`
- `ShareService`
- `DeepLinkService`
- `AIChatService` — interface reserved for a future provider; no current implementation or network adapter

Current client implementation:

```text
UI
  ↓
Feature Logic
  ↓
Service Interface
  ↓
Client Data / Client State
```

Future connected implementation:

```text
UI
  ↓
Feature Logic
  ↓
Service Interface
  ↓
Backend / API / External Service
```

The UI layer must remain unchanged when the underlying service implementation is replaced.

---

# 21. Epic W17 — Browser-Based iPhone Experience

## 21.1 Scope and product model

The iPhone experience is the primary mobile product surface delivered by the same Web application. It supports complete customer journeys on an iPhone without reproducing desktop layouts or creating a native application.

It must:

- render inside one adaptive modern iPhone frame on desktop/tablet preview and full-bleed on iPhone-class/standalone viewports;
- use dedicated iPhone routes, navigation, layouts, and interaction patterns;
- expose the complete approved mobile content subset and functional daily journeys defined in this master specification;
- load only the data and feature code required for the active route;
- share feature services, content identifiers, localisation, route mapping, client state, analytics events, and design tokens with the Web experience;
- operate without a backend in the current stage;
- offer the matching Web route as an optional enhanced workspace where useful;
- support English and Arabic with full RTL so switching experience modes never reduces language support.

It must not:

- claim to be a native iOS application;
- use user-agent sniffing to decide which experience to render;
- introduce Android-specific screens or controls;
- require App Store installation, native permissions, signing, provisioning, or native SDKs;
- duplicate business data, assessment logic, or persistence already owned by shared feature services;
- load precision desktop CV layout tools, DOCX generation, document parsing, unbounded data grids, or admin-portal workflows;
- imply guaranteed background reminders when the browser is closed;
- call an AI provider or fabricate AI responses.

### Product scope split

| Product area | Must work inside iPhone | Optional Web enhancement |
| --- | --- | --- |
| Discovery | Complete Technology, Pathway, Program, Article, and resource discovery; search, filters, detail, Save | Wider matrices, side-by-side comparison, richer media workspace |
| Career Test | Full question flow, branching, resume, result, recommendations, Save Result, existing report access | Wider long-form report layout and future provider-specific enhancements |
| Account and onboarding | Login, registration, all roles, parent/child, guardian consent, recovery UI, settings, logout, account deletion | Faster bulk administration where appropriate |
| Profile | All configured fields, conditional logic, repeatable records, search controls, uploads, completion, autosave | Wider bulk-editing and multi-column review |
| Programs | Browse, filter, Save, eligibility, full ATRC Apply flow, resume, confirmation | Wider programme comparison; external provider destination when explicitly required |
| Planner | All modules, tasks, Grade Planner, progress, bookmarks, notes, resources, University Prep | Wider planning canvas and advanced comparison |
| Habit Tracker | Habit/Goal/Routine management, daily tracking, streaks, local analytics, badges, reminders | Future cloud sync and guaranteed background notifications |
| Reports | Open summary, view/download existing report, share/copy link | Advanced export and wide-screen analysis |
| CV Builder | Profile mapping, templates, styling, section editing/order/visibility, live preview, rule-based guidance, PDF export | DOCX export, precision layout tools, future parsing and AI rewriting |
| AI Career Buddy | Complete chat shell, purpose message, provider-unavailable state | Real conversation after an AI provider is installed |

## 21.2 Entry, exit, and route behavior

- The Web header contains a familiar phone icon button with tooltip and accessible label **Open iPhone Experience**.
- The icon is keyboard reachable and has a visible focus state.
- Activating it maps the current entity to an equivalent `/iphone/*` route where one exists; otherwise it opens `/iphone/home`.
- The originating Web URL is retained in navigation state and in a safe session fallback.
- Every top-level iPhone screen exposes **Return to Web** outside or above the simulated application chrome.
- Return to Web restores the originating Web page where possible and `/` otherwise.
- Browser Back and Forward work naturally and must not trap the user inside the frame.
- A direct `/iphone/*` URL opens the iPhone experience without requiring prior entry from a Web page.
- Invalid iPhone routes show an in-frame not-found state with Dashboard and Return to Web actions.

Recommended route map:

```text
/iphone/home
/iphone/login
/iphone/onboarding/*
/iphone/dashboard
/iphone/profile/*
/iphone/technologies
/iphone/technologies/:technologyId
/iphone/pathways
/iphone/pathways/:pathwayId
/iphone/career-test/*
/iphone/programs
/iphone/programs/:programId
/iphone/applications/:programId/*
/iphone/saved
/iphone/reports
/iphone/reports/:reportId
/iphone/search
/iphone/articles
/iphone/articles/:articleId
/iphone/career-planner/*
/iphone/cv-builder/*
/iphone/ai-chat
/iphone/habits
/iphone/habits/:habitId
/iphone/goals
/iphone/goals/:goalId
/iphone/routines
/iphone/routines/:routineId
/iphone/settings
```

## 21.3 Adaptive iPhone frame

- On desktop and tablet preview, use one contemporary iPhone silhouette with stable screen aspect ratio, bezel, rounded display corners, Dynamic Island treatment, safe-area insets, and home indicator.
- The frame scales uniformly to fit the browser viewport; application text does not scale independently with viewport width.
- The application viewport must have a stable logical size and use internal responsive constraints for shorter browser heights.
- The page behind the device uses a restrained extension of the ATRC Web visual system and must not compete with the screen content.
- No device model selector, landscape mode, Android frame, or decorative 3D device rotation is included.
- Frame decoration is excluded from the accessibility tree.
- Application content remains usable at browser zoom up to 200%; if the full frame cannot fit, the page may scroll without clipping controls.
- On narrow iPhone-class viewports and in standalone Home Screen mode, remove the decorative outer frame and render the application full-bleed with safe-area insets and complete navigation.

## 21.4 iPhone application shell

Required elements:

- launch/loading state;
- status-bar treatment;
- safe-area-aware app bar;
- bottom tab navigation;
- contextual Back action;
- Dashboard entry;
- Saved Items and Reports access;
- Profile and Settings access;
- in-app feedback/messages;
- loading, empty, error, restricted-content, and offline/client-storage states;
- bottom sheets, dialogs, selectors, chips, progress indicators, search/filters, and media cards;
- visible **Preview** labeling only for unavailable or intentionally non-functional surfaces such as AI Chat;
- optional Web enhancement or external-provider handoff confirmation.

Recommended authenticated bottom tabs:

1. Home
2. Explore
3. Planner
4. Habits
5. Profile

Tab labels, icons, ordering, and directional icons must mirror correctly in RTL. Tab changes preserve each tab's navigation position for the current session.

### 21.4.1 iPhone RTL and Arabic requirements

- Switching EN/AR inside iPhone updates language and direction without returning to Web, reloading the application, clearing state, or resetting the current journey step.
- Arabic mode uses RTL at the iPhone application root; all nested routes, modals, sheets, menus, toasts, date controls, validation messages, document previews, and AI Chat inherit the correct direction.
- App bars, Back/Forward actions, breadcrumbs, tab order, drawers, carousels, horizontal steppers, progress sequences, swipe direction, page transitions, directional chevrons, and previous/next controls mirror semantically.
- Logos, photographs, video, QR codes, charts whose axes represent fixed chronological direction, and non-directional status/media icons are not mirrored automatically.
- The outer iPhone hardware treatment, Dynamic Island, status indicators, and home indicator remain physically consistent; only application content and directional controls mirror.
- Arabic typography uses the approved Arabic family, weight mapping, line height, and glyph coverage. Components must allow Arabic copy expansion without clipping, forced single-line truncation, or reduced tap targets.
- Headings, labels, helper text, validation, required indicators, badges, chips, counters, empty states, and disabled states align to logical start/end rather than hard-coded left/right.
- Email addresses, URLs, phone numbers, OTP values, IDs, file names, Latin school/university names, and mixed EN/AR text preserve readable ordering through bidi isolation.
- Numeric formatting, dates, times, percentages, grades, and decimal separators follow the approved locale rules consistently across Dashboard, Career Test, Profile, Apply, Planner, Reports, CV Builder, and Habit Tracker.
- Data tables and wide comparison content recompose into RTL-safe cards or labelled rows; horizontal overflow must begin at the logical start and preserve column meaning.
- Assistant messages align to logical start, future user messages align to logical end, and the provider service message remains neutral/centred. Arabic purpose and provider-unavailable messages appear inside the thread exactly like their English equivalents.
- Focus order, DOM order, screen-reader reading order, and keyboard navigation remain logical in both directions; visual mirroring must not be achieved by reversing semantic DOM order incorrectly.
- Analytics records the active language/direction as non-personal metadata but never sends translated field values or Arabic profile content.
- Manifest name/short name, Home Screen guidance, standalone shell labels, offline messages, update notices, and install metadata have approved Arabic equivalents where the platform supports localisation.

## 21.5 Card-based Dashboard

Dashboard content:

- Career Test and recommended next action;
- latest Career Test result;
- report access;
- Technologies;
- Career Pathways;
- Talent Enablement Programs;
- Saved Items;
- profile completion;
- Career Planner;
- CV Builder;
- Habit Tracker;
- current streak;
- weekly progress;
- AI Career Buddy preview.

Required states:

- new user;
- profile in progress;
- Career Test not completed;
- Career Test completed;
- report available;
- saved programs available;
- Career Planner available;
- active habits;
- no habits.

The dashboard must prioritise one recommended next action and avoid presenting every card with equal visual weight. Dashboard data is requested as a compact summary payload; full feature modules load only when opened.

## 21.6 Saved Items and Reports

Saved Items supports Programs, Courses, Clubs, Competitions, and Career Pathways where applicable through `SavedItemsService`.

Reports supports Career Test, career-related, and Habit Tracker summary cards through `ReportService`. Existing report files may be viewed or downloaded using browser-native behavior; report generation remains a Web responsibility.

Available actions:

- open an in-frame detail or summary;
- remove from Saved Items with Undo feedback;
- view or download an existing report;
- share a supported link or report through Web Share with Copy Link/Download fallback;
- open the corresponding full Web page;
- return to the prior iPhone screen without losing state.

## 21.7 Habit Tracker

Habit Tracker is a core iPhone feature because it supports short, repeatable daily use. It must work without a backend while remaining lightweight.

Functional scope:

- Today view with Complete, Skip, Undo, quick add, completion percentage, and current streak;
- create, edit, pause, archive, and restore a Habit;
- name, category, description, frequency, selected days, date range, reminder time, target count/duration, and icon;
- create and update Goals with target date, linked habits, milestones, progress, Complete, and Archive;
- create and run Routines with ordered activities, schedule, step completion, and routine completion;
- current/best streak, daily/weekly completion, consistency, goal progress, routine progress, milestones, badges, and positive completion feedback;
- reminder preferences for Habits, Routines, Goals, and end-of-day review.

Implementation requirements:

- `HabitRepository` owns a small versioned browser-storage schema and pure calculation functions.
- Habit, Goal, Routine, and completion records persist between sessions and remain available after switching to Web and back.
- Calculations run on demand from local records; no charting library, background worker, polling, or large analytics engine is used.
- Reminder due states are always available in-app.
- The Notification API may be offered only after an explicit user action. Denied or unsupported permission falls back to in-app reminders without blocking the feature.
- The UI clearly states that browser notifications are not guaranteed while the site is closed.
- Gamification must encourage healthy progress and avoid punitive, shame-based, compulsive, or misleading mechanics.

## 21.8 AI Chat preview

The iPhone experience includes a complete presentation shell for **AI Career Buddy**, but no AI provider is connected in the current stage.

Required UI:

- Dashboard entry card; AI Chat does not occupy a primary bottom tab until a provider is installed;
- safe-area-aware chat app bar with Back action, title **AI Career Buddy**, and **Preview** status;
- scrollable message thread;
- assistant avatar or ATRC AI mark;
- visually distinct assistant and system/service messages;
- suggested-topic chips for Technologies, Career Pathways, Programmes, and Next Steps;
- message composer, attachment affordance if included in the approved visual design, and Send control;
- accessible live status region for provider state.

The first assistant message must explain the purpose of the chat. Approved English copy:

> AI Career Buddy is designed to help you explore advanced technologies, compare career pathways, discover relevant programmes, and turn your interests into practical next steps.

The thread must then show a separate service message. Approved English copy:

> AI provider is not installed yet. This chat is currently available as a UI preview only.

Both messages must be visible inside the message thread on first open, not moved into a marketing card, onboarding modal, tooltip, or page description. The purpose message uses the assistant visual treatment; the provider notice uses a neutral system/service treatment with an accessible status icon and must not resemble a user message.

Behavior:

- The composer remains visible to communicate the intended final interaction, but text input, attachment, voice, and Send actions are disabled.
- Disabled composer placeholder: **AI provider required**.
- Suggested-topic chips may show focus/pressed feedback but must not create messages or simulated answers.
- No request is sent, no loading response is fabricated, and no conversation is stored.
- No typing indicator, fake latency, generated placeholder answer, or success animation is shown.
- Provider unavailability is presented as an informative service state rather than a destructive error.
- The disabled state must be communicated visually and through accessible descriptions, not by color alone.
- English and Arabic versions of both required messages must be provided through the central localisation layer.
- When a provider is installed later, the UI structure should remain reusable behind an `AIChatService` interface.

## 21.9 Lightweight implementation guardrails

- The initial iPhone shell and Dashboard target a maximum incremental JavaScript budget of 200 KB gzip, excluding the existing shared application runtime. Feature-route chunks have separate budgets based on their user value and load only after navigation.
- Each feature is route-level code split; entering `/iphone/home` must not download Career Test, CV Builder, Habit Tracker, report viewer, or AI implementation code.
- Feature routes request paged or scoped data instead of complete catalogues or profile datasets.
- Do not include AI SDKs, DOCX generation engines, document parsers, desktop rich-text editors, heavy charting libraries, 3D libraries, or persistent background workers in the initial iPhone bundle. Any approved lightweight PDF/export helper must load only after the user selects Export.
- Prefer semantic HTML, CSS, existing icons, and native browser scrolling over heavy interaction libraries.
- Images use responsive sources, modern formats, fixed dimensions, and lazy loading. Video must not autoplay or preload in the iPhone experience.
- Motion uses lightweight CSS opacity/transform transitions and respects reduced motion.
- Feature screens clean up timers, listeners, and subscriptions after they are left; polling is not used for client-only data.
- Production build reporting must verify route chunks and fail acceptance if a prohibited dependency is bundled into an iPhone route.

## 21.10 Deep links and cross-experience content

Supported targets:

- Technology detail;
- Career Pathway;
- Program;
- Article;
- Career Planner module;
- CV Builder;
- LMS content;
- Privacy and Terms;
- ATRC external content.

Requirements:

- central route mapping by content identifier;
- EN/AR parameter and direction preservation;
- safe handling of external URLs;
- explicit indication before leaving the ATRC origin where appropriate;
- source-route preservation;
- analytics event;
- deterministic fallback when no equivalent iPhone screen exists.

Web routes may be offered for a wider presentation, an explicitly external provider, or genuinely desktop-specific export/administration. Core content and actions remain available in iPhone. When a handoff occurs, the iPhone experience retains its current route, selected tab, entity identifier, feature state, and scroll/navigation context for return.

## 21.11 Shared state and ownership

Web and iPhone modes share:

- selected language and direction;
- stable content identifiers;
- source and return route;
- client login and onboarding state;
- complete role-aware profile fields, records, attachments, completion, and autosave state;
- complete registration/onboarding progress and account settings state;
- Career Test answers, progress, and results;
- Saved Items, programme applications, and report references;
- Career Planner progress, tasks, bookmarks, Grade Planner state, and notes;
- CV draft, template/style settings, section content/order/visibility, and export state;
- Habit, Goal, Routine, completion, streak, and reminder state;
- analytics session identifiers.

Domain state is owned by shared services rather than copied into an iPhone-only store. The iPhone mode owns only presentation state such as active tab, open sheet, selected filter, and scroll position. AI conversation data is not created or persisted until a provider is installed.

## 21.12 Mobile acquisition, installation, and return

- Direct links, search results, and shared links may open the relevant `/iphone/*` content route without requiring a Dashboard detour.
- On iPhone-class viewports, users may choose the iPhone experience through a clear, non-blocking entry action; the application must not use an interstitial that blocks public Web content.
- The user's last selected experience may be remembered locally and must always be reversible through **Return to Web**.
- Web App Manifest metadata, icons, theme colour, standalone display, and iPhone Home Screen guidance support repeat visits without presenting the product as native.
- A minimal service worker caches only the versioned application shell, static assets, and explicitly cacheable public content. Career Test progress, forms, profile, applications, CV data, and reports remain governed by their feature storage rules.
- Previously opened public content and the Habit Tracker may remain usable offline where data is already local; offline actions queue only when the relevant service explicitly supports safe replay.
- Application updates must invalidate stale shell assets and display a non-blocking refresh notice when a new version is ready.
- Mobile analytics must cover acquisition source, install guidance view, Home Screen/standalone launch where detectable, activation completion, programme application completion, CV export, 7-day return, and Habit engagement without collecting prohibited personal data.

---

# 22. Delivery Phases

## Phase 1 — Website Foundations

- Design system
- Responsive layout
- English/Arabic
- RTL
- Home
- Advanced Technologies
- Career Test
- Login
- Registration
- About
- Contact
- FAQ
- Privacy
- Terms
- Base search
- Base analytics
- SEO foundation
- Accessibility baseline
- Performance baseline

## Phase 2 — Extended Talent Experience

- Full User Profile
- AI CV Builder UI and client functionality
- Career Pathways
- Talent Enablement Programs
- Career Planner
- Saved Items
- Articles
- LMS surface
- Extended search
- Cross-feature account/dashboard states
- Web header phone entry and Return to Web flow
- Adaptive iPhone frame and application shell
- Full-bleed iPhone/standalone Web App mode, Manifest, icons, and versioned offline shell
- Dedicated `/iphone/*` routes
- iPhone Dashboard, Saved Items, and Reports
- Mobile functional parity for discovery, Search, Technologies, Pathways, Articles, Career Test, Account, Registration, Onboarding, Profile, Programs, Apply, Saved Items, Reports, and Career Planner
- Mobile CV Builder with profile mapping, editing, styling, preview, and PDF export
- Functional Habit Tracker, Goals, Routines, streaks, badges, local analytics, and browser-safe reminders
- AI Career Buddy chat preview with provider-unavailable service state
- Cross-experience Web handoff, route mapping, and shared client-state continuity
- iPhone bundle-size verification and prohibited-dependency audit
- Mobile acquisition, activation, conversion, abandonment, resume, and retention analytics
- Complete iPhone EN/AR functional parity, bidi-safe data handling, mirrored interaction, and RTL visual-regression coverage

## Phase 3 — Outside Current Scope

- Connected AI provider and fully functional AI Buddy
- Citizen Development modules

---

# 23. Testing

## Functional

- Navigation
- EN/AR switching
- RTL
- Login without credentials
- Registration
- Role-specific registration
- User Profile
- Repeatable profile records
- Search
- Filters
- Save
- Apply
- Career Test
- Career Test results
- Career Planner access
- CV Builder
- File uploads
- PDF/DOCX export
- Responsive behavior
- Phone icon entry from every Web header state
- Direct entry to `/iphone/*` routes
- Return to originating Web route
- Browser Back/Forward across experience changes
- iPhone bottom-tab and nested navigation
- Dashboard states
- Complete iPhone Career Test, resume, result, and Save Result flow
- Technology, Pathway, and Program search/filter/save behavior
- Complete iPhone registration/onboarding for all roles, guardian consent, parent/child flow, Settings, Logout, and Delete Account
- Complete mobile Profile field coverage, conditional logic, repeatable records, institution search, attachments, autosave, and resume
- Full in-frame Program Apply, validation, autosave, resume, confirmation, success, and explicitly external-provider behavior
- Planner tasks, completion, bookmarks, notes, Grade Planner, resources, University Prep, and Web continuity
- Saved Items remove/Undo and Reports view/download/share fallbacks
- Habit create/edit/pause/archive/restore
- Daily Habit Complete/Skip/Undo and streak calculations
- Goal milestones/progress and Routine step completion
- Reminder due states, permission grant/deny, and in-app fallback
- CV Builder profile mapping, template/style, mobile section editing/order/visibility, live preview, rule guidance, PDF export, and optional Web enhancement
- AI Chat purpose message
- AI provider-unavailable service message
- Disabled AI composer, attachment, suggestion, and Send behavior
- Verification that AI Chat sends no request and stores no conversation
- Language, login, profile, Career Test, Saved, Planner, and Habit state continuity between Web and iPhone modes
- Storage schema migration and malformed/unavailable storage recovery
- Mobile funnel start/complete/abandon/resume event coverage
- Direct content/action deep links without Dashboard detour
- Manifest, Home Screen/standalone launch, service-worker update, cache invalidation, and offline-shell behavior

## Login-specific test

The following must pass:

1. Open Login.
2. Leave username/email empty.
3. Leave password empty.
4. Select Login/Continue.
5. Authenticated client area opens successfully.

The same rule applies to UAE Pass and OTP UI entry points during the current client-only stage.

## Browser and responsive testing

- Chrome
- Safari
- agreed additional browsers
- Desktop
- Tablet
- iOS mobile browser
- Android mobile browser
- Adaptive iPhone frame at agreed desktop and tablet viewport sizes
- iPhone experience in current Safari and Chrome
- Representative recent iPhone viewport sizes in Safari responsive testing
- Full-bleed rendering on iPhone-class viewports and standalone Home Screen mode
- Short-height and narrow-width browser windows
- Browser zoom at 200%

## iPhone RTL and Arabic testing

- Run the complete acquisition, Career Test, registration/onboarding, guardian consent, Profile, Save, Apply, Reports, Planner, CV Builder, Habit Tracker, account deletion, and AI Chat journeys in both English/LTR and Arabic/RTL.
- Switch EN → AR and AR → EN in the middle of every resumable multi-step journey and verify that route, step, entered data, validation, completion, and scroll context remain intact.
- Verify mirrored navigation, Back/Forward, tab order, sheets, drawers, carousels, steppers, swipe behavior, page transitions, progress direction, and directional icons.
- Verify that non-directional media, logos, the iPhone hardware treatment, QR codes, and fixed-direction data visualisations are not incorrectly mirrored.
- Test mixed Arabic/English names, emails, URLs, phone numbers, OTP, IDs, file names, institution names, grades, dates, times, percentages, and uploaded document names.
- Verify Arabic CV editing, live preview, line wrapping, pagination, and PDF export with no missing glyphs or reordered content.
- Verify Arabic AI purpose and provider-unavailable messages inside the thread, plus disabled composer semantics.
- Run visual-regression screenshots for every top-level iPhone route at representative iPhone widths in EN and AR.
- Require zero unintended horizontal overflow, clipped Arabic text, overlapping controls, reversed data, incorrect icon direction, or unreachable actions.
- Verify VoiceOver/screen-reader reading order and focus order in Arabic independently from visual order.
- Verify Arabic Manifest/Home Screen labels, offline shell, update notice, and standalone navigation where supported.

## Accessibility

- Keyboard navigation
- Focus order
- Accessible labels
- Form messaging
- Contrast
- RTL semantics
- Reduced motion
- Media alternatives
- Frame decoration hidden from assistive technology
- Touch targets at least 44 by 44 CSS pixels within the iPhone application
- Focus transfer on experience entry and exit
- Safe-area and home-indicator clearance
- Dynamic text and text reflow without clipped controls

## Performance

- Code splitting
- Lazy loading
- Image optimisation
- Media optimisation
- Route-level performance budgets
- Efficient content rendering
- 2.5-second average page-load objective used as the primary UX benchmark
- Route-level lazy loading for the iPhone feature bundle
- No eager loading of the complete iPhone experience on initial Web page load
- Smooth frame scrolling and screen transitions on representative smartphone-class hardware
- Maximum 200 KB gzip incremental JavaScript target for the initial iPhone shell and Dashboard, excluding the existing shared runtime; feature routes are measured separately
- Production bundle audit for AI, document-generation, rich-editor, heavy-charting, 3D, canvas, and worker dependencies
- Network test confirming that opening AI Chat triggers no model/provider request
- Mobile cold-load and repeat-load testing under representative UAE smartphone network and hardware conditions
- Verification that optional productivity features are lazy-loaded only after explicit navigation/action
- Arabic fonts are subset and loaded without blocking unrelated Latin-only routes while preserving complete required glyph coverage

---

# 24. Acceptance Criteria

The Web application is accepted for the current client implementation stage when:

1. Approved Web UX/UI is implemented with production-quality styling.
2. English and Arabic are supported.
3. Arabic renders in full RTL.
4. All planned routes and client-facing sections are complete.
5. Responsive behavior is correct across agreed browsers/devices.
6. Login permits entry without username/password validation.
7. All authenticated screens can be accessed through the client login state.
8. Registration and role-specific journeys are complete.
9. User Profile supports the configured ATRC field set.
10. Career Test journey and result experience work entirely in the client application.
11. Career Pathways are fully navigable.
12. Talent Enablement search, filter, Save and Apply states work.
13. Career Planner access and content navigation work.
14. CV Builder supports profile mapping, templates, styling, preview and export functionality included in the client scope.
15. Site search works across configured content.
16. EN/AR SEO metadata is generated.
17. Analytics events are emitted through the internal analytics service.
18. Automated UI tests pass.
19. Critical responsive/accessibility defects are resolved.
20. No client feature depends on a live backend/API to render or operate within the defined scope.
21. All future connected services are isolated behind integration contracts.
22. A phone icon in the Web header opens the dedicated iPhone experience.
23. The iPhone experience renders in one adaptive modern iPhone frame on desktop/tablet preview and full-bleed with safe areas on iPhone-class or standalone viewports.
24. All iPhone routes use a dedicated mobile application shell rather than the public Web header/footer.
25. A persistent Return to Web action restores the originating Web route or the home fallback.
26. Browser Back/Forward and direct `/iphone/*` URLs work without navigation traps.
27. Web and iPhone modes preserve language, login, source route, complete registration/profile state, Career Test, Saved Items, applications, reports, Planner, CV, and Habit state through shared services.
28. The iPhone Dashboard supports functional new-user, progress, result, saved, report, Habit, and AI Chat entry states from a compact summary payload.
29. Technologies, Pathways, Programs, Articles, and Search provide complete mobile content access, discovery, filtering, details, and Saved state; Career Test works end to end.
30. Saved Items support persistent remove/Undo behavior, while existing Reports can be viewed, downloaded, or shared through browser-safe behavior without generating files in-frame.
31. Habit, Goal, and Routine CRUD, daily completion, streaks, local analytics, gamification, persistence, and in-app reminder states work without a backend or heavy analytics library.
32. AI Chat renders the approved purpose message and a separate service message stating that the AI provider is not installed yet.
33. AI Chat composer and Send/attachment controls are visibly and accessibly disabled, and opening or interacting with the preview sends no model/provider request and stores no conversation.
34. The initial iPhone shell and Dashboard meet the 200 KB gzip incremental JavaScript target, excluding the existing shared runtime; feature routes are independently budgeted and prohibited heavyweight dependencies are absent from initial load.
35. Core iPhone journeys work without a native application or live backend; AI Chat works as an honest provider-unavailable preview and reminders retain an in-app fallback when notification permission is absent.
36. Automated tests cover core mobile journeys, calculations, persistence, route mapping, Web handoff, shared-state continuity, AI provider-unavailable behavior, accessibility, and production bundle composition.
37. Registration, onboarding for every role, guardian consent, account settings, Logout, and Delete Account are completable inside iPhone.
38. Every configured Profile field, repeatable record, conditional rule, supported attachment, validation, autosave, and resume state is available in iPhone.
39. ATRC-hosted Programme Apply journeys are completable in-frame through confirmation and success; external-provider exits are disclosed and measurable.
40. Career Planner modules and Grade Planner are completable in iPhone, including tasks, progress, notes, bookmarks, and resume.
41. CV Builder supports profile mapping, mobile editing, template/style selection, section order/visibility, live preview, guidance, and PDF export without requiring desktop.
42. Direct `/iphone/*` links, Home Screen/standalone launch, offline shell, update handling, and mobile funnel analytics work as specified.
43. Every core iPhone journey passes the same functional acceptance tests in English/LTR and Arabic/RTL, including mid-journey language switching without state loss.
44. RTL acceptance has zero critical defects involving clipped Arabic text, broken bidi ordering, incorrect mirroring, semantic focus/reading order, inaccessible actions, CV PDF glyphs, or unintended horizontal overflow.

---

# 25. Required Inputs

- Approved ATRC Web UX/UI
- Figma assets/design system
- Final English content
- Final Arabic content
- Final Arabic UI labels
- Approved Arabic font family/weights, numeral/date/time rules, bidi examples, and terminology glossary
- Full ATRC User Profile field specification
- Career Pathway content
- Talent Enablement content
- Career Planner content
- Career Test content/configuration required for client rendering
- Final CV templates/content rules
- Brand assets
- Videos/media
- Legal content
- Analytics event taxonomy approval
- Approved iPhone visual direction consistent with the ATRC Web design system
- Final iPhone dashboard information priority
- Approved bottom-tab labels and icons
- Habit categories, icons, validation rules, streak rules, badge rules, and reminder copy
- Report examples, file URLs, share/download rules, and Saved Item content taxonomy
- Final mapping between Web and `/iphone/*` routes
- Approved English and Arabic AI Chat purpose copy
- Approved English and Arabic AI provider-unavailable service copy
- Future AI provider configuration contract, without provider credentials in the current stage
- Approved mobile funnel taxonomy and KPI definitions for acquisition, activation, Career Test completion, registration completion, Profile completion, Save, Apply completion, CV export, Planner progress, and 7-day return
- Web App Manifest metadata, Home Screen icons, theme colours, standalone launch behavior, cache policy, and offline content policy
- Final mobile Profile field grouping and Programme Apply step structure

---

# 26. Exclusions

- Backend development
- Database
- Live authentication validation
- UAE Pass integration
- SMS/OTP provider
- Email delivery
- Headless CMS
- Admin portal backend
- CRM export/integration
- Career Test external API
- LearnWorlds API/SSO
- Remote analytics platform
- Server-side AI/LLM
- Server-side CV processing
- Server-side persistence
- Connected AI provider and fully functional AI Buddy
- Phase 3 Citizen Development
- Native iOS application development
- Android application development or Android-specific application UI
- Swift, SwiftUI, Kotlin, Jetpack Compose, or native navigation
- App Store and Google Play packages, developer accounts, signing, review, and publishing
- Native UAE Pass SDK, Keychain, Android Keystore, or native file picker
- Native local notifications, APNs, Firebase Cloud Messaging, background notification delivery, or remote push infrastructure
- Guaranteed reminder delivery while the browser is closed
- Multiple iPhone model selector, Android frame, landscape frame, or native device emulator
- AI SDK, model/provider call, RAG, embeddings, streaming completion, synthetic chat response, attachment processing, voice input, or conversation persistence
