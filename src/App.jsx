import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowIcon, PhoneIcon, SearchIcon, SoundIcon, StatGlyph, TechGlyph } from './icons.jsx'
import { announcements, pathways, stats, technologies } from './data.js'

const copy = {
  en: {
    nav: [
      { label: 'Career Pathways', route: 'pathways' },
      { label: 'Advanced Technologies', route: 'technologies' },
      { label: 'Opportunities Center', route: 'opportunities' },
      { label: 'Talent Enablement', route: 'enablement' },
      { label: 'Career Planner', route: 'planner' },
    ],
    quiz: 'Take the Career Test',
    login: 'Login',
    eyebrow: 'Your future starts here',
    hero: <>Design your future.<br/><span>Build what’s next.</span></>,
    intro: 'Discover the technologies, pathways and opportunities shaping the UAE — and find where your curiosity can take you.',
    explorePath: 'Explore your path', discoverTech: 'Discover technologies', exploreFuture: 'EXPLORE YOUR FUTURE', orbitLabel: 'DISCOVER YOUR CAREER PATH',
    announcement: 'Announcement', announcePrev: 'Previous announcement', announceNext: 'Next announcement',
  },
  ar: {
    nav: [
      { label: 'المسارات المهنية', route: 'pathways' },
      { label: 'التقنيات المتقدمة', route: 'technologies' },
      { label: 'مركز الفرص', route: 'opportunities' },
      { label: 'تمكين المواهب', route: 'enablement' },
      { label: 'مخطط المسار المهني', route: 'planner' },
    ],
    quiz: 'ابدأ اختبار المسار',
    login: 'تسجيل الدخول',
    eyebrow: 'مستقبلك يبدأ من هنا',
    hero: <>صمّم مستقبلك.<br/><span>وابنِ القادم.</span></>,
    intro: 'اكتشف التقنيات والمسارات والفرص التي ترسم مستقبل دولة الإمارات، واعرف إلى أين يقودك فضولك.',
    explorePath: 'استكشف مسارك', discoverTech: 'اكتشف التقنيات', exploreFuture: 'استكشف مستقبلك', orbitLabel: 'اكتشف مسارك المهني',
    announcement: 'إعلان', announcePrev: 'الإعلان السابق', announceNext: 'الإعلان التالي',
  },
}

const uiCopy = {
  en: {
    mainNavigation: 'Main navigation', switchLanguage: 'Switch language', toggleMenu: 'Toggle menu', orbitAria: 'Explore future technologies',
    filmPlay: 'Play film', filmPause: 'Pause film', filmMute: 'Mute film', filmUnmute: 'Unmute film',
    signalsEyebrow: 'Signals of the future', signalsTitle: <>The future is already<br/><span>in motion.</span></>,
    missionEyebrow: 'Our mission', missionTitle: <>Empowering the next generation of innovators to <span>shape the future world.</span></>,
    missionText: 'Your ideas matter. Your curiosity has power. ATRC Talent connects you with the knowledge and opportunities to turn both into impact.', missionCta: 'About ATRC Talent',
    directionEyebrow: 'Find your direction', directionTitle: <>More than a career.<br/><span>A pathway to impact.</span></>, directionCta: 'View all pathways',
    quizEyebrow: 'Not sure where to start?', quizTitle: <>Your future might be<br/>one question away.</>,
    innerIntro: 'Use this page as a launch point to choose the right domain, understand the next steps and connect curiosity with real opportunities.',
    startExploring: 'Start exploring', whatYouFind: 'What you will find', chooseSignal: <>Choose a signal.<br/><span>Follow the momentum.</span></>, explore: 'Explore',
    howItWorks: 'How it works', clearPath: 'A clear path from interest to action.', findMatch: 'Find your match', pathQuestion: <>Which path fits<br/>the way you think?</>,
    techKicker: 'Explore the building blocks of tomorrow', techTitle: <>Advanced<br/><span>Technologies</span></>, techLead: 'From quantum systems to intelligent machines, explore the fields redefining what’s possible — and the people who will lead them.',
    techSearch: 'Search technologies or careers', results: 'results', filterAria: 'Filter technologies', all: 'All',
    save: 'Save', remove: 'Remove', exploreTechnology: 'Explore technology', noSignal: 'No signal found.', noSignalText: 'Try another technology, career or category.', resetSearch: 'Reset search',
    techSignalEyebrow: 'From idea to domain', techSignalTitle: <>Technology gets clearer<br/><span>when you see where it works.</span></>,
    techSignals: [
      ['Discover', 'Scan the fields that match your curiosity.', '01'],
      ['Compare', 'Understand how careers and capabilities connect.', '02'],
      ['Commit', 'Save the signals that deserve a deeper look.', '03'],
    ],
    techQuestion: <>Which future technology<br/>fits the way you think?</>,
    footerNavigation: 'Footer navigation', ecosystem: 'ATRC ecosystem', location: 'Abu Dhabi, United Arab Emirates', privacy: 'Privacy', terms: 'Terms', accessibility: 'Accessibility',
    footerTagline: <>Talent. Technology.<br/>Transformation.</>, visitAtrc: 'Visit ATRC.gov.ae', exploreGroup: 'Explore', supportGroup: 'Support', legalGroup: 'Legal', about: 'About', contact: 'Contact', faq: 'FAQ',
  },
  ar: {
    mainNavigation: 'التنقل الرئيسي', switchLanguage: 'تبديل اللغة', toggleMenu: 'فتح القائمة', orbitAria: 'استكشف تقنيات المستقبل',
    filmPlay: 'تشغيل الفيلم', filmPause: 'إيقاف الفيلم مؤقتاً', filmMute: 'كتم صوت الفيلم', filmUnmute: 'تشغيل صوت الفيلم',
    signalsEyebrow: 'إشارات المستقبل', signalsTitle: <>المستقبل بدأ بالفعل<br/><span>وهو في حركة مستمرة.</span></>,
    missionEyebrow: 'مهمتنا', missionTitle: <>تمكين الجيل القادم من المبتكرين من <span>تشكيل عالم المستقبل.</span></>,
    missionText: 'أفكارك مهمة وفضولك قوة. تصلك منصة مواهب ATRC بالمعرفة والفرص لتحويل كليهما إلى أثر حقيقي.', missionCta: 'عن مواهب ATRC',
    directionEyebrow: 'اعثر على اتجاهك', directionTitle: <>أكثر من مجرد مهنة.<br/><span>مسار نحو الأثر.</span></>, directionCta: 'عرض جميع المسارات',
    quizEyebrow: 'لست متأكداً من أين تبدأ؟', quizTitle: <>قد يكون مستقبلك<br/>على بُعد سؤال واحد.</>,
    innerIntro: 'استخدم هذه الصفحة كنقطة انطلاق لاختيار المجال المناسب، وفهم الخطوات التالية، وربط الفضول بفرص واقعية.',
    startExploring: 'ابدأ الاستكشاف', whatYouFind: 'ما الذي ستجده', chooseSignal: <>اختر إشارة.<br/><span>واتبع الزخم.</span></>, explore: 'استكشف',
    howItWorks: 'كيف يعمل', clearPath: 'مسار واضح من الاهتمام إلى الفعل.', findMatch: 'اكتشف ما يناسبك', pathQuestion: <>أي مسار يناسب<br/>طريقة تفكيرك؟</>,
    techKicker: 'استكشف ركائز عالم الغد', techTitle: <>التقنيات<br/><span>المتقدمة</span></>, techLead: 'من الأنظمة الكمية إلى الآلات الذكية، استكشف المجالات التي تعيد تعريف الممكن والأشخاص الذين سيقودونها.',
    techSearch: 'ابحث في التقنيات أو المهن', results: 'نتائج', filterAria: 'تصفية التقنيات', all: 'الكل',
    save: 'حفظ', remove: 'إزالة', exploreTechnology: 'استكشف التقنية', noSignal: 'لم نعثر على نتيجة.', noSignalText: 'جرّب تقنية أو مهنة أو فئة أخرى.', resetSearch: 'إعادة ضبط البحث',
    techSignalEyebrow: 'من الفكرة إلى المجال', techSignalTitle: <>تصبح التقنية أوضح<br/><span>عندما ترى أين تعمل.</span></>,
    techSignals: [
      ['اكتشف', 'تصفّح المجالات التي تتوافق مع فضولك.', '01'],
      ['قارن', 'افهم كيف ترتبط المهن بالقدرات المطلوبة.', '02'],
      ['قرّر', 'احفظ الإشارات التي تستحق نظرة أعمق.', '03'],
    ],
    techQuestion: <>أي تقنية مستقبلية<br/>تناسب طريقة تفكيرك؟</>,
    footerNavigation: 'التنقل في تذييل الصفحة', ecosystem: 'منظومة ATRC', location: 'أبوظبي، الإمارات العربية المتحدة', privacy: 'الخصوصية', terms: 'الشروط', accessibility: 'إمكانية الوصول',
    footerTagline: <>المواهب. التقنية.<br/>التحوّل.</>, visitAtrc: 'زيارة ATRC.gov.ae', exploreGroup: 'استكشف', supportGroup: 'الدعم', legalGroup: 'قانوني', about: 'عن المنصة', contact: 'تواصل معنا', faq: 'الأسئلة الشائعة',
  },
}

const iphoneCopy = {
  en: {
    open: 'Open iPhone experience',
    return: 'Return to Web',
    status: 'Experience shell · Build 01',
    eyebrow: 'ATRC Talent on iPhone',
    title: <>Your future.<br/><span>Always within reach.</span></>,
    lead: 'A focused mobile space for discovering paths, building momentum and staying connected to what comes next.',
    signal: 'Mobile foundation in progress',
    highlights: [
      ['Discover', 'Technologies, pathways and opportunities shaped for a smaller screen.', '01'],
      ['Build', 'Career decisions, plans and progress gathered into one clear rhythm.', '02'],
      ['Grow', 'Daily habits and next actions designed to keep ambition moving.', '03'],
    ],
    tabs: ['Home', 'Explore', 'Planner', 'Habits', 'Profile'],
  },
  ar: {
    open: 'افتح تجربة آيفون',
    return: 'العودة إلى الويب',
    status: 'واجهة التجربة · الإصدار 01',
    eyebrow: 'مواهب ATRC على آيفون',
    title: <>مستقبلك.<br/><span>دائماً في متناولك.</span></>,
    lead: 'مساحة جوّال مركّزة لاكتشاف المسارات وبناء الزخم والبقاء على اتصال بما هو قادم.',
    signal: 'الأساس المحمول قيد التطوير',
    highlights: [
      ['اكتشف', 'تقنيات ومسارات وفرص مصمّمة بوضوح للشاشة الصغيرة.', '01'],
      ['ابنِ', 'قراراتك وخططك وتقدّمك ضمن إيقاع واحد واضح.', '02'],
      ['تطوّر', 'عادات يومية وخطوات تالية تحافظ على حركة طموحك.', '03'],
    ],
    tabs: ['الرئيسية', 'استكشف', 'المخطط', 'العادات', 'الملف'],
  },
}

const pageContent = {
  pathways: {
    title: { en: <>Career<br/><span>Pathways</span></>, ar: <>المسارات<br/><span>المهنية</span></> },
    kicker: { en: 'From curiosity to contribution', ar: 'من الفضول إلى المساهمة' },
    lead: {
      en: 'Map the way you think, build and solve into pathways that connect ambition with real technology impact.',
      ar: 'حوّل طريقة تفكيرك وبنائك وحلّك للمشكلات إلى مسارات تربط الطموح بالأثر التقني الحقيقي.',
    },
    tone: '#8c48ff',
    symbol: 'B',
    eyebrow: { en: 'Pathway signals', ar: 'إشارات المسار' },
    focus: {
      en: 'Every pathway blends technical depth, creative confidence and a clear view of where your strengths can matter.',
      ar: 'يمزج كل مسار بين العمق التقني والثقة الإبداعية ورؤية واضحة لمكان تأثير نقاط قوتك.',
    },
    tiles: pathways.map((path, index) => ({
      title: { en: path.title, ar: path.arabicTitle },
      label: { en: path.role, ar: path.arabicRole },
      meta: `0${index + 1}`,
      color: path.color,
      icon: technologies[index]?.icon || 'neural',
      text: {
        en: `A route for ${path.role.toLowerCase()} who want to turn aptitude into applied work.`,
        ar: `مسار مخصص لـ${path.arabicRole} الراغبين في تحويل قدراتهم إلى عمل تطبيقي مؤثر.`,
      },
    })),
    steps: {
      en: ['Discover your strengths', 'Match with future roles', 'Build a focused learning plan', 'Track progress toward opportunities'],
      ar: ['اكتشف نقاط قوتك', 'طابق قدراتك مع وظائف المستقبل', 'ابنِ خطة تعلم مركزة', 'تابع تقدمك نحو الفرص'],
    },
  },
  opportunities: {
    title: { en: <>Opportunities<br/><span>Center</span></>, ar: <>مركز<br/><span>الفرص</span></> },
    kicker: { en: 'Programs, challenges and next steps', ar: 'برامج وتحديات وخطوات تالية' },
    lead: {
      en: 'Find the internships, accelerators, competitions and learning moments that move talent from potential to practice.',
      ar: 'اكتشف التدريبات والمسرّعات والمسابقات وفرص التعلم التي تنقل الموهبة من الإمكان إلى التطبيق.',
    },
    tone: '#4f83ff',
    symbol: 'O',
    eyebrow: { en: 'Opportunity stream', ar: 'مسار الفرص' },
    focus: {
      en: 'A living center for high-signal opportunities, designed so students can scan what is open, relevant and worth acting on.',
      ar: 'مركز متجدد للفرص المهمة، مصمم لتمكين الطلاب من معرفة ما هو متاح وملائم ويستحق المبادرة.',
    },
    tiles: [
      { title: { en: 'Summer Accelerators', ar: 'المسرّعات الصيفية' }, label: { en: 'Hands-on labs', ar: 'مختبرات تطبيقية' }, meta: { en: 'Open soon', ar: 'قريباً' }, color: '#9a55ff', icon: 'rocket', text: { en: 'Short, focused sprints across robotics, quantum and space systems.', ar: 'تجارب قصيرة ومركزة في الروبوتات والكم وأنظمة الفضاء.' } },
      { title: { en: 'Research Challenges', ar: 'التحديات البحثية' }, label: { en: 'Team competitions', ar: 'مسابقات جماعية' }, meta: { en: 'Seasonal', ar: 'موسمية' }, color: '#f572d0', icon: 'crystal', text: { en: 'Problem briefs shaped around real scientific and engineering questions.', ar: 'تحديات مستمدة من أسئلة علمية وهندسية واقعية.' } },
      { title: { en: 'Internship Tracks', ar: 'مسارات التدريب' }, label: { en: 'Career exposure', ar: 'خبرة مهنية' }, meta: { en: 'Curated', ar: 'مختارة' }, color: '#61d9ff', icon: 'robot', text: { en: 'Structured placements that connect emerging talent with active programs.', ar: 'فرص تدريب منظمة تصل المواهب الناشئة بالبرامج الفاعلة.' } },
      { title: { en: 'Mentor Sessions', ar: 'جلسات الإرشاد' }, label: { en: 'Expert access', ar: 'تواصل مع الخبراء' }, meta: { en: 'Monthly', ar: 'شهرياً' }, color: '#92ffb7', icon: 'neural', text: { en: 'Conversations with researchers, engineers and technology leaders.', ar: 'حوارات مع الباحثين والمهندسين وقادة التكنولوجيا.' } },
    ],
    steps: { en: ['Browse by domain', 'Save the right fit', 'Prepare your profile', 'Apply with confidence'], ar: ['تصفّح حسب المجال', 'احفظ الفرص المناسبة', 'جهّز ملفك', 'تقدّم بثقة'] },
  },
  enablement: {
    title: { en: <>Talent<br/><span>Enablement</span></>, ar: <>تمكين<br/><span>المواهب</span></> },
    kicker: { en: 'Skills, mentorship and momentum', ar: 'مهارات وإرشاد وزخم' },
    lead: {
      en: 'Build the skills, portfolio evidence and mentoring network needed to move with confidence through advanced technology fields.',
      ar: 'ابنِ المهارات والأدلة العملية وشبكة الإرشاد اللازمة للتحرك بثقة في مجالات التكنولوجيا المتقدمة.',
    },
    tone: '#61d9ff',
    symbol: 'E',
    eyebrow: { en: 'Enablement layers', ar: 'طبقات التمكين' },
    focus: {
      en: 'Enablement is the support system around the student: guided learning, expert feedback and visible proof of growth.',
      ar: 'التمكين هو نظام الدعم حول الطالب: تعلم موجّه، وملاحظات خبراء، ودليل واضح على النمو.',
    },
    tiles: [
      { title: { en: 'Skill Missions', ar: 'مهام المهارات' }, label: { en: 'Guided learning', ar: 'تعلم موجّه' }, meta: '01', color: '#61d9ff', icon: 'beam', text: { en: 'Compact modules that turn big technologies into achievable practice.', ar: 'وحدات مركزة تحوّل التقنيات الكبرى إلى ممارسة قابلة للإنجاز.' } },
      { title: { en: 'Portfolio Studio', ar: 'استوديو الأعمال' }, label: { en: 'Proof of work', ar: 'دليل الإنجاز' }, meta: '02', color: '#f7c75f', icon: 'crystal', text: { en: 'A place to shape projects into evidence that mentors and teams can review.', ar: 'مساحة تحوّل المشاريع إلى أدلة يمكن للمرشدين والفرق مراجعتها.' } },
      { title: { en: 'Mentor Network', ar: 'شبكة المرشدين' }, label: { en: 'Feedback loops', ar: 'ملاحظات مستمرة' }, meta: '03', color: '#cf7cff', icon: 'neural', text: { en: 'Access to researchers and practitioners who can sharpen direction.', ar: 'تواصل مع باحثين وممارسين يساعدونك على تحسين اتجاهك.' } },
      { title: { en: 'Readiness Reviews', ar: 'مراجعات الجاهزية' }, label: { en: 'Next actions', ar: 'الخطوات التالية' }, meta: '04', color: '#92ffb7', icon: 'shield', text: { en: 'Clear checkpoints for applications, interviews and program selection.', ar: 'نقاط تقييم واضحة للتقديم والمقابلات واختيار البرامج.' } },
    ],
    steps: { en: ['Learn in short missions', 'Create project evidence', 'Get expert feedback', 'Show readiness'], ar: ['تعلّم عبر مهام قصيرة', 'أنشئ أدلة من مشاريعك', 'احصل على رأي الخبراء', 'أظهر جاهزيتك'] },
  },
  planner: {
    title: { en: <>Career<br/><span>Planner</span></>, ar: <>مخطط<br/><span>المسار المهني</span></> },
    kicker: { en: 'A personal operating system for your future', ar: 'نظام شخصي لمستقبلك' },
    lead: {
      en: 'Turn interests into a visible plan with milestones, skills, saved technologies and opportunity timing in one place.',
      ar: 'حوّل الاهتمامات إلى خطة واضحة تجمع المراحل والمهارات والتقنيات المحفوظة وتوقيت الفرص في مكان واحد.',
    },
    tone: '#f572d0',
    symbol: 'P',
    eyebrow: { en: 'Planner rhythm', ar: 'إيقاع التخطيط' },
    focus: {
      en: 'The planner helps students move from inspiration to a weekly rhythm of choices, progress and next decisions.',
      ar: 'يساعد المخطط الطلاب على الانتقال من الإلهام إلى إيقاع أسبوعي من الاختيارات والتقدم والقرارات التالية.',
    },
    tiles: [
      { title: { en: 'Interest Map', ar: 'خريطة الاهتمامات' }, label: { en: 'Self discovery', ar: 'اكتشاف الذات' }, meta: { en: 'Start', ar: 'ابدأ' }, color: '#9a55ff', icon: 'orbit', text: { en: 'Capture the technologies and questions that keep pulling your attention.', ar: 'سجّل التقنيات والأسئلة التي تستمر في جذب اهتمامك.' } },
      { title: { en: 'Skill Timeline', ar: 'الجدول الزمني للمهارات' }, label: { en: 'Milestones', ar: 'مراحل رئيسية' }, meta: { en: 'Plan', ar: 'خطّط' }, color: '#4f83ff', icon: 'beam', text: { en: 'Break long-term ambition into skills, projects and deadlines.', ar: 'قسّم طموحك بعيد المدى إلى مهارات ومشاريع ومواعيد.' } },
      { title: { en: 'Saved Futures', ar: 'المستقبل المحفوظ' }, label: { en: 'Shortlist', ar: 'قائمة مختصرة' }, meta: { en: 'Focus', ar: 'ركّز' }, color: '#f572d0', icon: 'crystal', text: { en: 'Keep your preferred technologies, roles and opportunities connected.', ar: 'اجمع تقنياتك وأدوارك وفرصك المفضلة في مكان مترابط.' } },
      { title: { en: 'Action Review', ar: 'مراجعة الإجراءات' }, label: { en: 'Progress', ar: 'التقدم' }, meta: { en: 'Weekly', ar: 'أسبوعياً' }, color: '#92ffb7', icon: 'energy', text: { en: 'Know what changed, what matters now and what to do next.', ar: 'اعرف ما تغيّر وما يهم الآن وما الخطوة التالية.' } },
    ],
    steps: { en: ['Choose interests', 'Set milestones', 'Connect opportunities', 'Review progress'], ar: ['اختر اهتماماتك', 'حدّد المراحل الرئيسية', 'اربط الفرص بخطتك', 'راجع تقدمك'] },
  },
}

const routePaths = {
  home: '/',
  pathways: '/career-pathways',
  technologies: '/technologies',
  opportunities: '/opportunities',
  enablement: '/talent-enablement',
  planner: '/career-planner',
  iphoneHome: '/iphone/home',
}

const routeTitles = {
  en: {
    home: 'ATRC Talent — Design your future', pathways: 'Career Pathways — ATRC Talent', technologies: 'Advanced Technologies — ATRC Talent', opportunities: 'Opportunities Center — ATRC Talent', enablement: 'Talent Enablement — ATRC Talent', planner: 'Career Planner — ATRC Talent', iphoneHome: 'ATRC Talent on iPhone — Experience Preview',
  },
  ar: {
    home: 'مواهب ATRC — صمّم مستقبلك', pathways: 'المسارات المهنية — مواهب ATRC', technologies: 'التقنيات المتقدمة — مواهب ATRC', opportunities: 'مركز الفرص — مواهب ATRC', enablement: 'تمكين المواهب — مواهب ATRC', planner: 'مخطط المسار المهني — مواهب ATRC', iphoneHome: 'مواهب ATRC على آيفون — معاينة التجربة',
  },
}

function getRouteFromPath(pathname) {
  return Object.entries(routePaths).find(([, path]) => path === pathname)?.[0] || 'home'
}

const filmCaptions = {
  en: [
    { eyebrow: 'Inside the intelligence age', heading: <>Where ambition<br/>becomes impact.</> },
    { eyebrow: 'Innovation for the intelligence age', heading: <>Built in Abu Dhabi.<br/>Built for the world.</> },
    { eyebrow: 'A global tech R&D platform', heading: <>Research becomes<br/>real-world reach.</> },
    { eyebrow: 'Talent, unlocked', heading: <>Curiosity is where<br/>every career starts.</> },
    { eyebrow: 'Shaping the knowledge economy', heading: <>Ideas move fast<br/>when talent leads.</> },
  ],
  ar: [
    { eyebrow: 'داخل عصر الذكاء', heading: <>حيث يتحوّل الطموح<br/>إلى أثر.</> },
    { eyebrow: 'الابتكار لعصر الذكاء', heading: <>وُلد في أبوظبي.<br/>صُنع للعالم.</> },
    { eyebrow: 'منصة عالمية للبحث والتطوير', heading: <>البحث يتحوّل إلى<br/>تأثير حقيقي.</> },
    { eyebrow: 'المواهب بلا حدود', heading: <>الفضول هو حيث<br/>تبدأ كل مسيرة.</> },
    { eyebrow: 'نبني اقتصاد المعرفة', heading: <>الأفكار تتسارع<br/>حين تقود المواهب.</> },
  ],
}

const cinematicFilmCaptions = {
  en: [
    { eyebrow: 'ATRC Talent presents', heading: <>Where ambition<br/>becomes impact.</>, body: 'In an age shaped by intelligence, every breakthrough begins with someone willing to imagine more.' },
    { eyebrow: 'A new generation rises', heading: <>Not to watch the future.<br/><span>To build it.</span></>, body: 'Curiosity becomes a direction. Knowledge becomes momentum.' },
    { eyebrow: 'Innovation for the intelligence age', heading: <>Built in Abu Dhabi.<br/><span>Built for the world.</span></>, body: 'Ideas born here are designed to travel further, solve harder problems and create lasting value.' },
    { eyebrow: 'Beyond the possible', heading: <>Questions become prototypes.<br/><span>Prototypes become progress.</span></>, body: 'The distance between imagination and reality is where determined talent goes to work.' },
    { eyebrow: 'A global tech R&D platform', heading: <>Research becomes<br/><span>real-world reach.</span></>, body: 'Science leaves the lab and becomes capability, resilience and opportunity.' },
    { eyebrow: 'Across every frontier', heading: <>Quantum. Autonomy.<br/><span>Energy. Space.</span></>, body: 'Different domains. One shared mission: move human potential forward.' },
    { eyebrow: 'Talent, unlocked', heading: <>Curiosity is where<br/><span>every career starts.</span></>, body: 'The first question can become a skill. The first skill can become a calling.' },
    { eyebrow: 'One decision changes direction', heading: <>What you begin today<br/><span>can shape tomorrow.</span></>, body: 'Explore the path, meet the challenge and build evidence of what you can do.' },
    { eyebrow: 'Shaping the knowledge economy', heading: <>Ideas move fast<br/><span>when talent leads.</span></>, body: 'Progress belongs to people prepared to learn, create and contribute.' },
    { eyebrow: 'Your chapter starts now', heading: <>The future is not waiting.<br/><span>Step into it.</span></>, body: 'Discover the ATRC ecosystem and find where your ambition can make an impact.', cta: true },
  ],
  ar: [
    { eyebrow: 'تقدم مواهب ATRC', heading: <>حيث يتحوّل الطموح<br/>إلى أثر.</>, body: 'في عصر يصوغه الذكاء، يبدأ كل إنجاز بشخص يملك الشجاعة ليتخيّل أكثر.' },
    { eyebrow: 'جيل جديد ينهض', heading: <>ليس ليراقب المستقبل.<br/><span>بل ليبنيه.</span></>, body: 'يتحوّل الفضول إلى اتجاه، وتتحوّل المعرفة إلى زخم.' },
    { eyebrow: 'الابتكار لعصر الذكاء', heading: <>وُلد في أبوظبي.<br/><span>صُنع للعالم.</span></>, body: 'أفكار تولد هنا لتصل أبعد، وتحل مسائل أصعب، وتصنع قيمة مستدامة.' },
    { eyebrow: 'ما وراء الممكن', heading: <>الأسئلة تصبح نماذج.<br/><span>والنماذج تصبح تقدماً.</span></>, body: 'في المسافة بين الخيال والواقع تبدأ المواهب المصممة عملها.' },
    { eyebrow: 'منصة عالمية للبحث والتطوير', heading: <>البحث يتحوّل إلى<br/><span>تأثير حقيقي.</span></>, body: 'يغادر العلم المختبر ليصبح قدرة ومرونة وفرصة.' },
    { eyebrow: 'عبر كل الآفاق', heading: <>الكم. الأنظمة الذاتية.<br/><span>الطاقة. الفضاء.</span></>, body: 'مجالات مختلفة ومهمة واحدة: دفع الإمكانات البشرية إلى الأمام.' },
    { eyebrow: 'المواهب بلا حدود', heading: <>الفضول هو حيث<br/><span>تبدأ كل مسيرة.</span></>, body: 'قد يصبح السؤال الأول مهارة، وقد تصبح المهارة الأولى شغفاً مهنياً.' },
    { eyebrow: 'قرار واحد يغيّر الاتجاه', heading: <>ما تبدأه اليوم<br/><span>قد يشكّل الغد.</span></>, body: 'استكشف المسار، واجه التحدي، وابنِ دليلاً على ما تستطيع إنجازه.' },
    { eyebrow: 'نبني اقتصاد المعرفة', heading: <>الأفكار تتسارع<br/><span>حين تقود المواهب.</span></>, body: 'التقدم من نصيب المستعدين للتعلم والإبداع والمساهمة.' },
    { eyebrow: 'فصلك يبدأ الآن', heading: <>المستقبل لا ينتظر.<br/><span>تقدّم نحوه.</span></>, body: 'اكتشف منظومة ATRC واعثر على المجال الذي يصنع فيه طموحك أثراً.', cta: true },
  ],
}

function getVideoCaptionVariant() {
  const forced = new URLSearchParams(window.location.search).get('videoCaptions')?.toLowerCase()
  if (forced === 'a' || forced === 'b') return forced

  try {
    const stored = window.localStorage.getItem('atrc.videoCaptions.variant')
    if (stored === 'a' || stored === 'b') return stored
    const assigned = window.crypto.getRandomValues(new Uint8Array(1))[0] % 2 === 0 ? 'a' : 'b'
    window.localStorage.setItem('atrc.videoCaptions.variant', assigned)
    return assigned
  } catch {
    return 'a'
  }
}

const logoDots = [
  [82.2, 33.2, 7.1], [83.6, 54.2, 9], [76.9, 69.2, 2.8], [33.5, 65.7, 2.6], [42.9, 68.4, 3.7], [54.2, 66.2, 4.6], [63.5, 57.3, 6],
  [33, 27.6, 2.6], [25.9, 34.5, 3.7], [22.3, 45.2, 4.6], [25.3, 57.7, 6], [66.5, 46.7, 2.7], [64.4, 37.1, 3.8], [56.9, 28.4, 4.6],
  [44.2, 24.6, 5.9], [48.8, 6.8, 2.9], [60.1, 9.8, 4.2], [72.6, 18, 5.8], [8.1, 62.6, 2.8], [4.7, 51.1, 4.1], [5.7, 36.2, 5.7],
  [14.2, 20.4, 6.9], [31.8, 8.8, 8.7], [68.7, 77.7, 4], [54.9, 84.3, 5.8], [36.7, 85.1, 7.1], [17.8, 75.7, 8.9],
]

function Logo({ lang = 'en' }) {
  return (
    <a className="brand" href="/" aria-label={lang === 'ar' ? 'الصفحة الرئيسية لمواهب ATRC' : 'ATRC Talent home'}>
      <svg className="brand-orbit" viewBox="0 0 93 93" aria-hidden="true">
        {logoDots.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />)}
      </svg>
      <span className="brand-copy">{lang === 'ar' ? <><b>مجلس أبحاث<br/>التكنولوجيا المتطورة</b><small>مواهب ATRC</small></> : <><b>ADVANCED<br/>TECHNOLOGY</b><small>RESEARCH COUNCIL</small></>}</span>
    </a>
  )
}

function useReveal(threshold = 0.25) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold })
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

function Button({ children, variant = 'primary', href = '#', onClick, className = '' }) {
  return <a className={`button button--${variant} ${className}`} href={href} onClick={onClick}><span>{children}</span><i><ArrowIcon diagonal={variant === 'text'} /></i></a>
}

function AnnouncementCard({ lang, t }) {
  const [index, setIndex] = useState(0)
  const current = announcements[index]
  const step = (delta) => setIndex((index + delta + announcements.length) % announcements.length)
  return (
    <div className="announce-card">
      <div className="announce-body">
        <span className="eyebrow"><i/>{t.announcement}</span>
        <p>{lang === 'ar' ? current.arabicText : current.text}</p>
      </div>
      <div className="announce-media" style={{'--tone': current.color}} aria-hidden="true"><TechGlyph type={current.icon}/></div>
      <div className="announce-nav">
        <button onClick={() => step(-1)} aria-label={t.announcePrev}><ArrowIcon/></button>
        <button className="is-active" onClick={() => step(1)} aria-label={t.announceNext}><ArrowIcon/></button>
      </div>
    </div>
  )
}

function Header({ lang, setLang, route, setRoute, openIphone }) {
  const [open, setOpen] = useState(false)
  const t = copy[lang]
  const go = (event, next) => { event.preventDefault(); setRoute(next); setOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}) }
  return (
    <header className="site-header">
      <Logo lang={lang} />
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label={uiCopy[lang].mainNavigation}>
        {t.nav.map((item) => <a key={item.route} className={route === item.route ? 'active' : ''} href={routePaths[item.route]} onClick={(e) => go(e, item.route)}>{item.label}</a>)}
        <div className="mobile-actions">
          <button className="mobile-phone-action" onClick={openIphone}><PhoneIcon/><span>{iphoneCopy[lang].open}</span></button>
          <Button variant="outline">{t.login}</Button><Button>{t.quiz}</Button>
        </div>
      </nav>
      <div className="header-actions">
        <button className="language" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label={uiCopy[lang].switchLanguage}>{lang === 'en' ? 'AR' : 'EN'}</button>
        <button className="phone-launch" onClick={openIphone} aria-label={iphoneCopy[lang].open} title={iphoneCopy[lang].open}><PhoneIcon/></button>
        <Button variant="outline">{t.login}</Button>
        <Button>{t.quiz}</Button>
        <button className={`menu-toggle ${open ? 'active' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={uiCopy[lang].toggleMenu}><i/><i/></button>
      </div>
    </header>
  )
}

function IPhonePlaceholder({ lang, setLang, onReturn }) {
  const t = iphoneCopy[lang]
  return (
    <main className="iphone-stage">
      <button className="iphone-return iphone-return--outer" onClick={onReturn}>
        <i><ArrowIcon/></i><span>{t.return}</span>
      </button>

      <section className="iphone-device" aria-label={t.open}>
        <div className="iphone-screen">
          <div className="iphone-status" aria-hidden="true">
            <b>9:41</b><span><i/><i/><i/> 5G&nbsp; ◒</span>
          </div>

          <header className="iphone-appbar">
            <button className="iphone-back" onClick={onReturn} aria-label={t.return} title={t.return}><ArrowIcon/></button>
            <div className="iphone-appmark" aria-label={lang === 'ar' ? 'مواهب ATRC' : 'ATRC Talent'}><i/><span>ATRC<br/><small>{lang === 'ar' ? 'مواهب' : 'TALENT'}</small></span></div>
            <button className="iphone-language" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label={uiCopy[lang].switchLanguage}>{lang === 'en' ? 'AR' : 'EN'}</button>
          </header>

          <div className="iphone-scroll">
            <div className="iphone-mobile-visual" aria-hidden="true">
              <div className="iphone-orbit iphone-orbit--one"/>
              <div className="iphone-orbit iphone-orbit--two"/>
              <div className="iphone-orbit-core">A</div>
              <i className="iphone-satellite iphone-satellite--one"/>
              <i className="iphone-satellite iphone-satellite--two"/>
              <i className="iphone-satellite iphone-satellite--three"/>
            </div>

            <div className="iphone-copy">
              <span className="iphone-kicker"><i/>{t.eyebrow}</span>
              <h1>{t.title}</h1>
              <p>{t.lead}</p>
            </div>

            <div className="iphone-build-status"><span>{t.signal}</span><i><b/></i><small>24%</small></div>

            <div className="iphone-signal-list">
              {t.highlights.map(([title, text, number], index) => (
                <article key={number} style={{'--signal-index': index}}>
                  <span>{number}</span><div><h2>{title}</h2><p>{text}</p></div><i/>
                </article>
              ))}
            </div>

            <small className="iphone-build-tag">{t.status}</small>
          </div>

          <nav className="iphone-tabs" aria-label={lang === 'ar' ? 'معاينة تنقل تطبيق آيفون' : 'iPhone navigation preview'}>
            {t.tabs.map((label, index) => (
              <button key={label} className={index === 0 ? 'active' : ''} disabled={index !== 0} aria-current={index === 0 ? 'page' : undefined}>
                <i className={`iphone-tab-icon iphone-tab-icon--${index}`} aria-hidden="true">{index === 1 && <SearchIcon/>}{index === 3 && <TechGlyph type="energy"/>}</i>
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="iphone-home-indicator" aria-hidden="true"/>
        </div>
      </section>
    </main>
  )
}

function OrbitalFuture({ onOpen, t, lang }) {
  const nodes = technologies
  return (
    <div className="future-orbit" aria-label={uiCopy[lang].orbitAria}>
      <div className="orbit-ring orbit-ring--outer"/><div className="orbit-ring orbit-ring--inner"/>
      {Array.from({length: nodes.length}, (_, index) => <span className="orbit-tick" style={{'--index': index, '--count': nodes.length}} key={index}/>)}
      <svg className="orbit-curve" viewBox="0 0 200 200" aria-hidden="true">
        <path id="orbitCurvePath" d="M71.7,128.3 A40,40 0 1 1 128.3,128.3" fill="none"/>
        <text textAnchor="middle"><textPath href="#orbitCurvePath" startOffset="50%">{t.orbitLabel}</textPath></text>
      </svg>
      <button className="orbit-core" onClick={onOpen}><i><ArrowIcon /></i></button>
      {nodes.map((tech, index) => <div className="orbit-node" style={{'--index': index, '--count': nodes.length, '--tone': tech.color}} key={tech.id}><TechGlyph type={tech.icon}/></div>)}
    </div>
  )
}

function VideoFeature({ lang }) {
  const frameRef = useRef(null)
  const videoRef = useRef(null)
  const [captionVariant] = useState(getVideoCaptionVariant)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [captionIndex, setCaptionIndex] = useState(0)
  const [filmDuration, setFilmDuration] = useState(41.215)
  const captions = filmCaptions[lang]
  const cinematicCaptions = cinematicFilmCaptions[lang]
  const ui = uiCopy[lang]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect() }
    }, { rootMargin: '240px' })
    if (frameRef.current) observer.observe(frameRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad || captionVariant !== 'a') return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = setInterval(() => setCaptionIndex(index => (index + 1) % captions.length), 5500)
    return () => clearInterval(id)
  }, [captionVariant, shouldLoad, captions.length])

  const togglePlayback = async () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) { await videoRef.current.play(); setPlaying(true) }
    else { videoRef.current.pause(); setPlaying(false) }
  }

  const toggleSound = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  const startWhenReady = () => {
    videoRef.current?.play().catch(() => setPlaying(false))
  }

  const syncFilmDuration = () => {
    if (Number.isFinite(videoRef.current?.duration)) setFilmDuration(videoRef.current.duration)
  }

  const caption = captions[captionIndex % captions.length]

  return (
    <section className="video-feature section-shell" ref={frameRef} aria-label={lang === 'ar' ? 'فيلم مجلس أبحاث التكنولوجيا المتطورة' : 'ATRC film'} data-video-captions-variant={captionVariant}>
      <div className="video-frame">
        {shouldLoad && <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" onLoadedMetadata={syncFilmDuration} onCanPlay={startWhenReady} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
          <source src="https://prod-atrc-backend-webfiles-bmg3gcf9fwf2f9es.a02.azurefd.net/static/atrc.mp4" type="video/mp4" />
        </video>}
        <div className="video-vignette" />
        {captionVariant === 'a' ? (
          <div className="video-caption" key={captionIndex}>
            <span className="eyebrow"><i/>{caption.eyebrow}</span>
            <h2>{caption.heading}</h2>
            <a href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer">{lang === 'ar' ? 'اكتشف منظومة ATRC' : 'Discover the ATRC ecosystem'} <ArrowIcon diagonal /></a>
          </div>
        ) : (
          <div className={`video-cinematic ${playing ? 'is-playing' : ''}`} style={{'--film-duration': `${filmDuration}s`}}>
            <div className="video-cinematic-crawl">
              {cinematicCaptions.map((item, index) => (
                <article className={item.cta ? 'is-finale' : ''} key={item.eyebrow}>
                  <span><i/>{String(index + 1).padStart(2, '0')} · {item.eyebrow}</span>
                  <h2>{item.heading}</h2>
                  <p>{item.body}</p>
                  {item.cta && <a href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer">{lang === 'ar' ? 'اكتشف منظومة ATRC' : 'Discover the ATRC ecosystem'} <ArrowIcon diagonal /></a>}
                </article>
              ))}
            </div>
          </div>
        )}
        <div className="video-controls">
          <button onClick={togglePlayback} disabled={!shouldLoad} aria-label={playing ? ui.filmPause : ui.filmPlay}>{playing ? 'Ⅱ' : '▶'}</button>
          <button onClick={toggleSound} disabled={!shouldLoad} aria-label={muted ? ui.filmUnmute : ui.filmMute}><SoundIcon muted={muted}/></button>
        </div>
      </div>
    </section>
  )
}

function Home({ setRoute, lang }) {
  const t = copy[lang]
  const ui = uiCopy[lang]
  const [missionRef, missionVisible] = useReveal()
  return (
    <main id="home">
      <section className="hero-section section-shell">
        <div className="hero-glow"/><div className="hero-grid"/>
        <div className="hero-copy reveal">
          <span className="eyebrow"><i/>{t.eyebrow}</span>
          <h1>{t.hero}</h1>
          <p>{t.intro}</p>
          <div className="hero-ctas"><Button href="#pathways">{t.explorePath}</Button><Button variant="text" href="/technologies" onClick={(e) => {e.preventDefault(); setRoute('technologies'); window.scrollTo(0,0)}}>{t.discoverTech}</Button></div>
          <AnnouncementCard lang={lang} t={t} />
        </div>
        <OrbitalFuture t={t} lang={lang} onOpen={() => {setRoute('technologies'); window.scrollTo(0,0)}} />
      </section>

      <section className="signal-section section-shell">
        <div className="section-intro"><span className="eyebrow"><i/>{ui.signalsEyebrow}</span><h2>{ui.signalsTitle}</h2></div>
        <div className="stats-grid">
          {stats.map((stat) => <article className="stat" key={stat.value}><StatGlyph type={stat.icon}/><strong>{stat.value}</strong><p>{lang === 'ar' ? stat.arabicLabel : stat.label}</p><small>{lang === 'ar' ? stat.arabicSource : stat.source}</small></article>)}
        </div>
      </section>

      <VideoFeature lang={lang} />

      <section className={`mission-section section-shell reveal-section ${missionVisible ? 'is-visible' : ''}`} ref={missionRef}>
        <div className="mission-visual" aria-hidden="true">
          <span/><i/>
          <svg className="mission-mark" viewBox="0 0 93 93">{logoDots.map(([cx, cy, r], index) => <circle key={index} cx={cx} cy={cy} r={r}/>)}</svg>
        </div>
        <div className="mission-copy">
          <span className="eyebrow"><i/>{ui.missionEyebrow}</span>
          <h2>{ui.missionTitle}</h2>
          <p>{ui.missionText}</p>
          <Button variant="outline">{ui.missionCta}</Button>
        </div>
      </section>

      <section className="pathways-section section-shell" id="pathways">
        <div className="section-heading"><div><span className="eyebrow"><i/>{ui.directionEyebrow}</span><h2>{ui.directionTitle}</h2></div><Button variant="text">{ui.directionCta}</Button></div>
        <div className="pathway-grid">
          {pathways.map((path, index) => <a href="#" className="pathway-card" key={path.title} style={{'--card-tone': path.color}}><span>0{index + 1}</span><b>{path.mark}</b><div><h3>{lang === 'ar' ? path.arabicTitle : path.title}</h3><p>{lang === 'ar' ? path.arabicRole : path.role}</p></div><i><ArrowIcon diagonal/></i></a>)}
        </div>
      </section>

      <section className="quiz-band section-shell">
        <div><span className="eyebrow"><i/>{ui.quizEyebrow}</span><h2>{ui.quizTitle}</h2></div>
        <Button>{t.quiz}</Button>
      </section>
    </main>
  )
}

function InternalHero({ page, lang }) {
  return (
    <section className="inner-hero section-shell" style={{'--page-tone': page.tone}}>
      <div className="inner-hero-copy">
        <div className="catalogue-kicker"><span>{page.symbol} — {lang === 'ar' ? 'مواهب ATRC' : 'ATRC TALENT'}</span><span>{page.kicker[lang]}</span></div>
        <h1>{page.title[lang]}</h1>
        <p>{page.lead[lang]}</p>
      </div>
      <div className="inner-constellation" aria-hidden="true">
        <div className="constellation-core">{page.symbol}</div>
        {technologies.slice(0, 6).map((tech, index) => (
          <span key={tech.id} style={{'--index': index, '--count': 6, '--tone': tech.color}}>
            <TechGlyph type={tech.icon}/>
          </span>
        ))}
        <i/><i/><i/>
      </div>
    </section>
  )
}

function InternalPage({ type, lang }) {
  const page = pageContent[type]
  const ui = uiCopy[lang]
  const [featureRef, featureVisible] = useReveal()
  return (
    <main className={`inner-page inner-page--${type}`} style={{'--page-tone': page.tone}}>
      <InternalHero page={page} lang={lang}/>

      <section className={`inner-feature section-shell reveal-section ${featureVisible ? 'is-visible' : ''}`} ref={featureRef}>
        <div className="mission-visual inner-feature-visual" aria-hidden="true">
          <span/><i/>
          <b>{page.symbol}</b>
        </div>
        <div className="mission-copy">
          <span className="eyebrow"><i/>{page.eyebrow[lang]}</span>
          <h2>{page.focus[lang]}</h2>
          <p>{ui.innerIntro}</p>
          <Button variant="outline">{ui.startExploring}</Button>
        </div>
      </section>

      <section className="inner-card-section section-shell">
        <div className="section-heading">
          <div><span className="eyebrow"><i/>{ui.whatYouFind}</span><h2>{ui.chooseSignal}</h2></div>
        </div>
        <div className="inner-card-grid">
          {page.tiles.map((tile) => (
            <article className="inner-card" key={tile.title.en} style={{'--card-tone': tile.color}}>
              <div className="inner-card-head"><span>{tile.meta?.[lang] || tile.meta}</span><i><TechGlyph type={tile.icon}/></i></div>
              <div>
                <small>{tile.label[lang]}</small>
                <h3>{tile.title[lang]}</h3>
                <p>{tile.text[lang]}</p>
              </div>
              <a href="#"><span>{ui.explore}</span><ArrowIcon diagonal/></a>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline-band section-shell">
        <div>
          <span className="eyebrow"><i/>{ui.howItWorks}</span>
          <h2>{ui.clearPath}</h2>
        </div>
        <ol>
          {page.steps[lang].map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}
        </ol>
      </section>

      <section className="technology-cta section-shell" style={{'--page-tone': page.tone}}>
        <span className="eyebrow"><i/>{ui.findMatch}</span>
        <h2>{ui.pathQuestion}</h2>
        <Button>{copy[lang].quiz}</Button>
      </section>
    </main>
  )
}

function TechnologyCard({ technology, index, lang }) {
  const [saved, setSaved] = useState(false)
  const ui = uiCopy[lang]
  const title = lang === 'ar' ? technology.arabic : technology.title
  const careers = lang === 'ar' ? technology.arabicCareers : technology.careers
  return (
    <article className="technology-card" style={{'--tech-tone': technology.color, '--delay': `${index * 55}ms`}}>
      <div className="tech-card-top"><span>{technology.number} / 08</span><button className={saved ? 'saved' : ''} onClick={() => setSaved(!saved)} aria-label={`${saved ? ui.remove : ui.save} ${title}`}><svg viewBox="0 0 24 24"><path d="M6 4h12v17l-6-4-6 4V4Z"/></svg></button></div>
      <div className="glyph-wrap"><TechGlyph type={technology.icon}/><i/><i/><i/></div>
      <span className="tech-category">{lang === 'ar' ? technology.arabicCategory : technology.category}</span>
      <h2>{title}</h2>
      <p>{lang === 'ar' ? technology.arabicDescription : technology.description}</p>
      <div className="career-tags">{careers.map(career => <span key={career}>{career}</span>)}</div>
      <a href={`#${technology.id}`} aria-label={`${ui.exploreTechnology}: ${title}`}><span>{ui.exploreTechnology}</span><i><ArrowIcon diagonal/></i></a>
    </article>
  )
}

function Technologies({ lang }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const categories = ['All', ...new Set(technologies.map(item => item.category))]
  const ui = uiCopy[lang]
  const visible = useMemo(() => technologies.filter(item => {
    const searchText = `${item.title} ${item.description} ${item.category} ${item.careers.join(' ')} ${item.arabic} ${item.arabicDescription} ${item.arabicCategory} ${item.arabicCareers.join(' ')}`
    return (filter === 'All' || item.category === filter) && searchText.toLowerCase().includes(query.trim().toLowerCase())
  }), [filter, query])
  const categoryLabel = (category) => category === 'All' ? ui.all : (technologies.find(item => item.category === category)?.[lang === 'ar' ? 'arabicCategory' : 'category'] || category)
  return (
    <main id="technologies" className="technologies-page">
      <section className="catalogue-hero section-shell">
        <div className="catalogue-kicker"><span>01 — 08</span><span>{ui.techKicker}</span></div>
        <h1>{ui.techTitle}</h1>
        <p>{ui.techLead}</p>
        <div className="catalogue-art" aria-hidden="true"><i/><i/><i/><span>∞</span></div>
      </section>
      <section className="catalogue-controls section-shell">
        <label className="search-box"><SearchIcon/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={ui.techSearch}/><span>{visible.length.toString().padStart(2, '0')} {ui.results}</span></label>
        <div className="filter-row" role="group" aria-label={ui.filterAria}>{categories.map(category => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{categoryLabel(category)}</button>)}</div>
      </section>
      <section className="technology-grid section-shell" aria-live="polite">
        {visible.map((tech, index) => <TechnologyCard key={tech.id} technology={tech} index={index} lang={lang}/>)}
        {visible.length === 0 && <div className="no-results"><strong>{ui.noSignal}</strong><p>{ui.noSignalText}</p><button onClick={() => {setQuery('');setFilter('All')}}>{ui.resetSearch}</button></div>}
      </section>
      <section className="tech-signal-band section-shell">
        <div>
          <span className="eyebrow"><i/>{ui.techSignalEyebrow}</span>
          <h2>{ui.techSignalTitle}</h2>
        </div>
        <div className="tech-signal-grid">
          {ui.techSignals.map(([title, text, number]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
      <section className="technology-cta section-shell"><span className="eyebrow"><i/>{ui.findMatch}</span><h2>{ui.techQuestion}</h2><Button>{copy[lang].quiz}</Button></section>
    </main>
  )
}

function Footer({ setRoute, lang }) {
  const ui = uiCopy[lang]
  const footerLinks = copy[lang].nav.slice(0, 4).map(({ label, route }) => [label, route])
  const navigate = (event, next) => { event.preventDefault(); setRoute(next); window.scrollTo(0,0) }
  return (
    <footer className="site-footer section-shell">
      <div className="footer-desktop">
        <div className="footer-bar">
          <Logo lang={lang}/>
          <nav className="footer-essential-links" aria-label={ui.footerNavigation}>
            {footerLinks.map(([label, next]) => <a key={next} href={routePaths[next]} onClick={(e) => navigate(e, next)}>{label}</a>)}
          </nav>
          <a className="footer-atrc-link" href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer"><span>{ui.ecosystem}</span><i><ArrowIcon diagonal/></i></a>
        </div>
        <div className="footer-meta">
          <span>{lang === 'ar' ? '© منصة مواهب ATRC 2026' : '© ATRC Talent Platform 2026'}</span>
          <span>{ui.location}</span>
          <div><a href="#">{ui.privacy}</a><a href="#">{ui.terms}</a><a href="#">{ui.accessibility}</a></div>
        </div>
      </div>

      <div className="footer-mobile">
        <div className="footer-top"><Logo lang={lang}/><p>{ui.footerTagline}</p><a href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer">{ui.visitAtrc} <ArrowIcon diagonal/></a></div>
        <div className="footer-links"><div><small>{ui.exploreGroup}</small>{footerLinks.map(([label, next]) => <a key={next} href={routePaths[next]} onClick={(e) => navigate(e, next)}>{label}</a>)}</div><div><small>{ui.supportGroup}</small><a href="#">{ui.about}</a><a href="#">{ui.contact}</a><a href="#">{ui.faq}</a></div><div><small>{ui.legalGroup}</small><a href="#">{ui.privacy}</a><a href="#">{ui.terms}</a><a href="#">{ui.accessibility}</a></div></div>
        <div className="footer-bottom"><span>{lang === 'ar' ? '© منصة مواهب ATRC 2026' : '© ATRC Talent Platform 2026'}</span><span>{ui.location}</span></div>
      </div>
    </footer>
  )
}

export default function App() {
  const [route, setRoute] = useState(() => getRouteFromPath(window.location.pathname))
  const [lang, setLang] = useState('en')
  const [webReturnRoute, setWebReturnRoute] = useState('home')
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr' }, [lang])
  useEffect(() => {
    const experiment = new URLSearchParams(window.location.search).get('videoCaptions')?.toLowerCase()
    const experimentQuery = experiment === 'a' || experiment === 'b' ? `?videoCaptions=${experiment}` : ''
    window.history.replaceState(null, '', `${routePaths[route] || '/'}${experimentQuery}`)
    document.title = routeTitles[lang][route] || routeTitles[lang].home
  }, [route, lang])
  const openIphone = () => { setWebReturnRoute(route === 'iphoneHome' ? 'home' : route); setRoute('iphoneHome'); window.scrollTo(0, 0) }
  const returnToWeb = () => { setRoute(webReturnRoute); window.scrollTo(0, 0) }
  if (route === 'iphoneHome') return <div className="app app--iphone"><IPhonePlaceholder lang={lang} setLang={setLang} onReturn={returnToWeb}/></div>
  const page = route === 'home' ? <Home setRoute={setRoute} lang={lang}/> : route === 'technologies' ? <Technologies lang={lang}/> : <InternalPage type={route} lang={lang}/>
  return <div className="app"><Header lang={lang} setLang={setLang} route={route} setRoute={setRoute} openIphone={openIphone}/>{page}<Footer setRoute={setRoute} lang={lang}/></div>
}
