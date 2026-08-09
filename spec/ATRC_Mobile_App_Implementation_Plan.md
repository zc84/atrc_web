# ATRC Talent Platform — Mobile Application Implementation Plan

## 1. Objective

Deliver **production-grade iOS and Android client applications** for the ATRC Talent Platform.

The Mobile application must provide a complete user experience for core Talent Platform functions while operating independently from backend services during the current implementation stage.

The architecture must allow future identity, Career Test, profile, CRM, LMS, analytics, notification, and AI services to be connected through service contracts without redesigning the mobile UI.

---

## 2. Current Implementation Scope

### Included

- Production-grade iOS application
- Production-grade Android application
- English UI at launch
- Architecture ready for Arabic/full RTL
- Mobile design system
- Login and account UI
- Login without credential validation
- Role-aware onboarding
- User Profile
- Card-based dashboard
- Advanced Technologies
- Career Pathways
- Career Test
- Programs
- Save/Apply
- Saved Items
- Reports
- Career Planner surface
- CV Builder surface
- Deep links to Web
- Habit Tracker
- Goals
- Routines
- Local habit analytics
- Local notifications
- Account deletion UI
- Accessibility
- Automated testing
- Build/signing readiness
- Future integration contracts

### Not included in the current stage

- Backend services
- Database
- Live UAE Pass SDK integration
- SMS/OTP provider
- Email delivery
- Server-side authentication/session validation
- Career Test vendor API
- CRM integration
- LearnWorlds API/SSO
- Remote push-notification backend
- Cloud profile synchronisation
- Remote analytics provider
- Server-side AI/LLM
- AI Buddy
- Production server-side data persistence

---

# 3. Mobile Technology Baseline

Because the requirement is Native iOS + Android, the default implementation baseline is:

## iOS

- Swift
- SwiftUI
- native navigation
- Keychain abstraction for future secure credentials/tokens
- UserNotifications for local notifications

## Android

- Kotlin
- Jetpack Compose
- native navigation
- Android Keystore abstraction for future secure credentials/tokens
- Android local notification scheduling

A cross-platform framework should only be used if explicitly approved.

---

# 4. Mobile Architecture

Recommended structure for each platform:

```text
App
  Navigation
  Configuration
  Localisation

Features
  Login
  Onboarding
  Dashboard
  Profile
  Technologies
  Pathways
  CareerTest
  Programs
  SavedItems
  Reports
  CareerPlanner
  CVBuilder
  HabitTracker

Core
  UI
  Analytics
  Notifications
  Storage
  DeepLinks
  Accessibility

Services
  AuthService
  ProfileService
  CareerTestService
  ProgramService
  SavedItemsService
  ReportService
  HabitRepository
  NotificationService
  AnalyticsService
```

## Architecture rules

1. Screens must not call external endpoints directly.
2. All data access must use service interfaces.
3. Current data is delivered through client application data/configuration and client-side storage.
4. Future network implementations must replace service implementations without screen rewrites.
5. No production secrets may be embedded in the application.
6. RTL readiness must be designed into layouts from the first release.
7. Native permissions must be requested only when needed.

---

# 5. Epic M1 — Mobile Design System

## Components

- [ ] Splash
- [ ] Navigation shell
- [ ] Bottom tabs
- [ ] App bars
- [ ] Cards
- [ ] Buttons
- [ ] Inputs
- [ ] Selectors
- [ ] Chips
- [ ] Progress indicators
- [ ] Bottom sheets
- [ ] Dialogs
- [ ] Notifications/messages
- [ ] Empty states
- [ ] Error states
- [ ] Restricted-content states
- [ ] Loading states
- [ ] File picker UI
- [ ] PDF/document viewer
- [ ] Media cards
- [ ] Search
- [ ] Filters
- [ ] RTL-safe spacing and icons
- [ ] Accessibility semantics
- [ ] Dynamic text support

---

# 6. Epic M2 — Login and Account

## 6.1 Login behavior

Login is included as part of the production application UI, but **credential validation is intentionally disabled in the current client-only stage**.

### Required behavior

- Email/username field may be empty.
- Password field may be empty.
- Selecting **Login / Sign In / Continue** always opens the authenticated application area.
- No invalid-credential message is shown.
- No backend authentication request is made.
- UAE Pass UI may be shown, but selecting Continue/Sign In completes login immediately.
- OTP UI may be shown, but the OTP field is not validated and may be empty.
- Any login route must allow access without user credentials.

This behavior must be consistent on both iOS and Android.

## 6.2 Login screens

- [ ] Welcome
- [ ] Login method selection
- [ ] Email/password
- [ ] UAE Pass entry
- [ ] OTP entry
- [ ] Forgot Password
- [ ] Reset Password
- [ ] Session-expired screen
- [ ] Logout
- [ ] Account Settings
- [ ] Delete Account
- [ ] Data-erasure confirmation

---

# 7. Epic M3 — Role-Aware Onboarding

## Roles

- Student
- Parent
- Educator
- Other

## Base onboarding

- Role
- Birth year/date of birth
- First name
- Last name
- Email
- Password field
- Mobile
- Terms/privacy consent

## Student

- Gender
- Nationality
- Emirate
- Grade/year
- Curriculum
- Communication preference

## Parent

- Parent details
- Child profile
- Add multiple children
- Child first/last name
- Gender
- Nationality
- Emirate
- Grade/year
- Curriculum

## Educator

- Gender
- Nationality
- Highest education
- Grades taught
- School/university
- Subjects taught
- Emirate
- Curriculum taught
- Work email

## Other

- Gender
- Nationality
- Highest education
- Emirate
- Profession
- Company
- Work email

## Minor flow

- Age identification
- Guardian consent for users under 18
- Guardian relationship
- Consent confirmation
- Privacy notice

---

# 8. Epic M4 — Card-Based Dashboard

## Dashboard content

- Career Test
- Latest Career Test result
- Report
- Technologies
- Career Pathways
- Programs
- Saved Items
- Profile completion
- Career Planner
- CV Builder
- Habit Tracker
- Current streak
- Weekly progress
- Recommended next action

## States

- New user
- Profile in progress
- Career Test not completed
- Career Test completed
- Saved programs available
- Active habits
- No habits
- Report available
- Career Planner available

---

# 9. Epic M5 — User Profile

The Mobile Profile uses the same ATRC field model as the Web application.

## Main groups

1. Interests
2. School
3. Subjects & Grades
4. University / College
5. Competitions
6. Projects
7. Extracurricular Activities
8. Internships & Work Experience
9. Certifications & Courses
10. Skills & Tools
11. Languages
12. Social & Portfolio
13. Contacts

## Mobile interaction principles

- Step-based/section-based navigation
- Profile completion indicator
- Quick tap selection for short option lists
- Searchable school/university controls
- Add/remove repeatable records
- File picker support
- Conditional field visibility
- Clear validation messaging
- Client-state autosave
- Role-aware field labels

---

## 9.1 Interests

- Advanced Technologies
- Sectors of interest

---

## 9.2 School

- School
- Emirate
- Curriculum
- Grade/year
- Stream/track
- Overall grade
- Transcript
- University-enrolment shortcut

---

## 9.3 Subjects & Grades

- Favourite subjects
- Challenging/least-favourite subjects
- Selection limits
- Curriculum-aware grade entry
- Predicted-grade flag
- Predicted-grade text

---

## 9.4 University / College

- Institution
- UAE/international
- City
- Country
- Degree
- Year
- Major
- Minor
- Specialisation
- Graduation
- GPA
- Previous degree records

---

## 9.5 Competitions

- Name
- Organiser
- Year
- Level
- Domain
- Result
- Certificate
- Description

---

## 9.6 Projects

- Title
- Type
- Domain
- Role
- Tools
- Dates
- Ongoing
- Description
- URL
- Media/file

---

## 9.7 Extracurricular Activities

- Activity
- Category
- Organisation
- Role
- Dates
- Ongoing
- Hours/week
- Description

---

## 9.8 Internships & Work Experience

- Organisation
- Role
- Type
- Industry
- Dates
- Current role
- Country
- City/emirate
- Description

---

## 9.9 Certifications & Courses

- Name
- Issuer
- Issue date
- Expiry
- Credential ID
- URL
- Attachment

---

## 9.10 Skills & Tools

- Skill categories
- Skill selection
- Proficiency
- Custom skills
- Tools/platforms
- Custom tools

---

## 9.11 Languages

- Language
- Proficiency
- Add/remove

---

## 9.12 Social & Portfolio

- LinkedIn
- GitHub
- Portfolio
- Kaggle
- Google Scholar
- ResearchGate
- Personal website
- Career objective/bio

---

## 9.13 Contacts

- Emirates ID field
- Primary email
- Backup email
- Mobile
- Emergency contact
- Emergency phone

---

# 10. Epic M6 — Technologies

## Native Mobile content

- Technology catalogue
- Technology card
- Short description
- Why it matters
- Key subjects
- Careers/professions
- Education snapshot
- Related pathways
- Related technologies
- Career Quiz CTA

## Web deep links for long-form content

- Extended technology narrative
- Full profession lists
- University matrices
- Programme matrices
- Detailed job descriptions
- Long resource sections

The Mobile App must preserve the current application state when returning from Web content.

---

# 11. Epic M7 — Career Pathways

## Catalogue

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

## Native detail

- Overview
- Careers
- Skill stack
- Basic academic roadmap
- Key subjects
- Related technology
- Career Quiz CTA

## Web deep links

- Extended roadmap
- University content
- Detailed professions
- Full career guidance
- Videos/resources

---

# 12. Epic M8 — Career Test

## Flow

1. Career Test introduction
2. Start
3. Questions
4. Branching navigation
5. Progress
6. Previous/Next
7. Completion
8. Result processing
9. Primary pathway
10. Secondary pathways
11. Recommendations
12. Report
13. Save result
14. Open related pathway

## Current-stage implementation

The entire test UI works from configured client-side question/result data.

The `CareerTestService` must support replacement by the external Career Test service later.

---

# 13. Epic M9 — Talent Enablement Programs

## Directory

- Search
- Filter
- Stage
- Age/grade
- Timeline
- Location
- Saved state

## Program card

- Image
- Name
- Target age/grade
- Short description

## Program detail

- Image
- Name
- Target age/grade
- Short description
- Full description
- Dates
- Location
- Deadline
- Eligibility
- Requirements
- Save
- Apply

## Researcher Journey

- Six-stage visual
- Stage selection
- Initiative list

## Client behavior

- Search/filter operates locally.
- Save state is retained in the app.
- Apply opens the final client application flow/state.
- Saved programs are available from Dashboard/Saved Items.

---

# 14. Epic M10 — Saved Items and Reports

## Saved Items

Support:

- Programs
- Courses
- Clubs
- Competitions
- Career Pathways where applicable

## Reports

- Career Test report
- Career-related reports
- Habit progress summary

## Actions

- Open
- Remove
- Share where appropriate
- Open related Web content
- Open PDF/document

---

# 15. Epic M11 — Habit Tracker

The Habit Tracker must be a complete native client feature and operate without backend connectivity.

## 15.1 Habit

Fields:

- Name
- Category
- Description
- Schedule
- Frequency
- Days
- Start date
- End date
- Reminder time
- Target count/duration
- Icon
- Status

## 15.2 Daily tracking

- Today view
- Complete
- Skip
- Undo
- Completion percentage
- Quick add
- Streak

## 15.3 Goal

- Goal title
- Description
- Target date
- Progress
- Linked habits
- Milestones
- Complete
- Archive

## 15.4 Routine

- Routine title
- Ordered activities
- Schedule
- Start
- Step completion
- Routine completion

## 15.5 Gamification

- Current streak
- Best streak
- Completion percentage
- Weekly consistency
- Milestones
- Badges
- Positive completion feedback

Gamification must support healthy engagement and avoid punitive or compulsive mechanics.

## 15.6 Analytics

Calculate on-device:

- Daily completion
- Weekly completion
- Current streak
- Longest streak
- Consistency
- Habit trend
- Goal progress
- Routine completion

## 15.7 Local notifications

- Habit reminder
- Routine reminder
- Goal reminder
- End-of-day reminder

Controls:

- enable/disable;
- reminder time;
- per-habit reminder;
- pause;
- notification preferences.

## 15.8 Persistence

Habit/goal/routine data is stored locally on the device.

The storage layer must be abstracted so cloud synchronisation can be added later without changing feature code.

---

# 16. Epic M12 — Career Planner

## Mobile surface

- Dashboard card
- Section overview
- Registered-user content
- Module navigation
- Deep links to Web/PDF where long-form material is used

## Modules

1. Overview
2. Profile Building
3. Grade Planner
4. AI Prompts
5. Resources
6. Showcasing Profile
7. University Prep

Because authentication validation is disabled during the current stage, selecting Login/Continue gives immediate access to the Career Planner.

---

# 17. Epic M13 — CV Builder

## Mobile user experience

- Build My CV CTA
- Profile completion review
- CV type
- Template selection
- Colour
- Font
- Live preview
- Key section editing
- Section visibility
- Improvement guidance
- PDF export/share where implemented
- Open full Web CV Builder where advanced editing is required

## Integration contract

Future AI features are exposed through `CVBuilderService` without changing the mobile screens.

---

# 18. Epic M14 — Deep Linking

## Targets

- Technology detail
- Career Pathway
- Program
- Article
- Career Planner content
- CV Builder
- LMS
- Privacy
- Terms
- ATRC external content

## Requirements

- Central route mapping
- Fallback URL
- Safe external browser handling
- Return-to-app behavior
- Analytics event
- Future EN/AR parameter support

---

# 19. Epic M15 — Analytics Instrumentation

Events:

- App Launch
- Login
- Register
- Onboarding Step
- Profile Section Open
- Profile Section Complete
- Dashboard Card Open
- Technology Open
- Pathway Open
- Program Open
- Save
- Apply
- Career Test Start
- Career Test Complete
- Report Open
- Habit Create
- Habit Complete
- Routine Complete
- Goal Complete
- Notification Preference Change
- Deep Link Open

The current client application records these events through its internal analytics layer.

A remote analytics provider can be attached later.

---

# 20. Epic M16 — Service Contracts

Required services:

- `AuthService`
- `ProfileService`
- `TechnologyService`
- `CareerPathwayService`
- `CareerTestService`
- `ProgramService`
- `SavedItemsService`
- `ReportService`
- `CVBuilderService`
- `HabitRepository`
- `NotificationService`
- `AnalyticsService`
- `DeepLinkService`

Current architecture:

```text
Screen
  ↓
View Model / Feature Logic
  ↓
Service Interface
  ↓
Client Data / Device Storage
```

Future architecture:

```text
Screen
  ↓
View Model / Feature Logic
  ↓
Service Interface
  ↓
API / SDK / Backend Service
```

---

# 21. Delivery Scope

## Phase 2 — Mobile Application

Workstreams:

1. Native iOS foundation
2. Native Android foundation
3. Mobile design system
4. Login/account
5. Onboarding
6. Profile
7. Dashboard
8. Technologies
9. Career Pathways
10. Career Test
11. Programs
12. Saved Items
13. Reports
14. Habit Tracker
15. Local Notifications
16. Career Planner
17. CV Builder
18. Deep Linking
19. Analytics
20. QA
21. Build/signing readiness

## Phase 3 — Outside Current Scope

- AI Buddy

---

# 22. Testing

## Functional

- Launch
- Navigation
- Login without credentials
- UAE Pass UI access
- OTP UI access
- Role-specific onboarding
- Parent/child flow
- Profile editing
- Repeatable profile records
- Dashboard
- Technologies
- Pathways
- Career Test
- Career Test results
- Programs
- Search/filter
- Save
- Apply
- Reports
- Habit CRUD
- Daily habit completion
- Goal progress
- Routine completion
- Local notifications
- Deep links
- Account deletion UI

## Login-specific acceptance test

The following must pass on iOS and Android:

1. Open Login.
2. Leave username/email empty.
3. Leave password empty.
4. Select Login/Continue.
5. The authenticated application area opens successfully.

For OTP:

1. Open OTP screen.
2. Leave OTP empty.
3. Select Continue.
4. Authenticated area opens successfully.

For UAE Pass:

1. Select UAE Pass.
2. Continue without external authentication.
3. Authenticated area opens successfully.

## Device testing

- Representative recent iPhones
- Representative recent Android devices
- Small screen
- Large screen
- Dynamic text
- Accessibility settings

## RTL readiness

Even though launch language is English:

- layout directions;
- mirrored navigation;
- icon direction;
- spacing;
- alignment;
- bidirectional text

must be validated during implementation.

---

# 23. Acceptance Criteria

The Mobile application is accepted for the current client implementation stage when:

1. iOS and Android applications build and launch successfully.
2. Approved production-quality Mobile UX/UI is implemented.
3. English launch UI is complete.
4. Architecture supports future Arabic/full RTL without redesign.
5. Login works without username/password validation.
6. OTP and UAE Pass entry screens do not block access.
7. Authenticated screens can be reached through the client login state.
8. Role-aware onboarding is complete.
9. User Profile supports the configured ATRC field model.
10. Dashboard includes all required core cards.
11. Technologies and Pathways are navigable.
12. Career Test works from configured client-side data.
13. Programs support local search/filter/Save/Apply behavior.
14. Saved Items and Reports are available.
15. Career Planner is accessible after client login.
16. Habit Tracker is fully functional on-device.
17. Habit analytics are calculated on-device.
18. Local notifications work.
19. Deep links open the correct Web/content targets.
20. Automated tests pass on the agreed device matrix.
21. No client feature depends on a live backend/API to operate within the defined scope.
22. Future connected services are isolated behind service interfaces.

---

# 24. Required Inputs

- Final iOS UX/UI
- Final Android UX/UI
- ATRC brand assets
- Final Mobile screen inventory
- Full User Profile field specification
- Career Test client content/configuration
- Career Pathway content
- Technology content
- Talent Enablement content
- Career Planner content
- Report files/layouts
- Habit Tracker final design
- Minimum iOS version
- Minimum Android version
- Required supported devices
- Final Web deep-link routes
- App Store/Google Play organisation details for later release

---

# 25. Exclusions

- Backend development
- Database
- Live authentication validation
- Real UAE Pass SDK connection
- SMS/OTP provider
- Email delivery
- JWT/refresh-token services
- CRM integration
- Career Test vendor API
- LearnWorlds API/SSO
- Remote push infrastructure
- Cloud profile synchronisation
- Remote analytics platform
- Server-side AI/LLM
- AI Buddy
- Server-side data persistence
