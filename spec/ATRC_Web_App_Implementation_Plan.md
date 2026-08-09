# ATRC Talent Platform — Web Application Implementation Plan

## Implementation Status — 9 August 2026

The first implementation milestone is complete:

- [x] Screen 01 — Home / Landing page
- [x] Screen 02 — Advanced Technologies catalogue
- [x] Shared responsive application header and footer
- [x] English/Arabic language switch and RTL layout foundation
- [x] Technology search, category filters, save interaction, and empty state
- [x] Lazy-loaded cinematic ATRC film feature with playback controls and reduced-motion fallback
- [x] Responsive desktop, tablet, and mobile layouts for completed screens
- [x] Reduced-motion and keyboard-focus foundations
- [x] Production build verified with Vite

Next planned screen: Advanced Technology detail experience, followed by the Career Test entry and question journey.

## 1. Objective

Deliver a **production-grade client-facing Web application** for the ATRC Talent Platform.

The application must provide a complete, polished user experience across desktop, tablet, and mobile browsers while remaining independent from backend services during the current implementation stage.

The Web application will be built so that future backend, CMS, identity, Career Test, CRM, LMS, analytics, and AI integrations can be connected through defined service contracts without redesigning the user interface.

---

## 2. Current Implementation Scope

### Included

- Production-grade Web application
- Responsive desktop, tablet, and mobile layouts
- English and Arabic
- Full RTL support
- ATRC design system and reusable UI components
- Public website pages
- Advanced Technologies
- Career Pathways
- Talent Enablement Programs
- Career Planner
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
- use semantic markup and accessible interaction patterns;
- target fast page rendering and an average page-load objective of approximately 2.5 seconds under normal UAE conditions, subject to final media and hosting.

---

# 4. Web Architecture

## 4.1 Application structure

Recommended modular structure:

```text
src/
  app/
    routing/
    layout/
    configuration/
    localisation/
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
  shared/
    ui/
    forms/
    media/
    accessibility/
    analytics/
    utilities/
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
- `TechnologyContentService`
- `CareerPathwayService`
- `ArticleService`
- `SearchService`
- `CVBuilderService`
- `LMSService`
- `AnalyticsService`

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

# 21. Delivery Phases

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

## Phase 3 — Outside Current Scope

- AI Buddy
- Citizen Development modules

---

# 22. Testing

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

## Accessibility

- Keyboard navigation
- Focus order
- Accessible labels
- Form messaging
- Contrast
- RTL semantics
- Reduced motion
- Media alternatives

## Performance

- Code splitting
- Lazy loading
- Image optimisation
- Media optimisation
- Route-level performance budgets
- Efficient content rendering
- 2.5-second average page-load objective used as the primary UX benchmark

---

# 23. Acceptance Criteria

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

---

# 24. Required Inputs

- Approved ATRC Web UX/UI
- Figma assets/design system
- Final English content
- Final Arabic content
- Final Arabic UI labels
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

---

# 25. Exclusions

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
- Phase 3 AI Buddy
- Phase 3 Citizen Development
