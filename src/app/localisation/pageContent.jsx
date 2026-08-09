import { listPathways } from '../../services/CareerPathwayService.js'
import { listTechnologies } from '../../services/TechnologyContentService.js'

const pathways = listPathways()
const technologies = listTechnologies()

export const pageContent = {
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
