export const careerTestQuestions = [
  {
    id: 'q1',
    prompt: {
      en: 'When you face a hard problem, what do you reach for first?',
      ar: 'عندما تواجه مشكلة صعبة، ما أول ما تفعله؟',
    },
    options: [
      { id: 'a', label: { en: 'I sketch or prototype something to test the idea', ar: 'أرسم أو أبني نموذجاً أولياً لاختبار الفكرة' }, scores: { builder: 3, creator: 1 } },
      { id: 'b', label: { en: 'I run an experiment or gather evidence first', ar: 'أجري تجربة أو أجمع الأدلة أولاً' }, scores: { explorer: 3, analyst: 1 } },
      { id: 'c', label: { en: 'I break it into numbers and look for patterns', ar: 'أقسّمها إلى أرقام وأبحث عن الأنماط' }, scores: { analyst: 3, explorer: 1 } },
      { id: 'd', label: { en: 'I imagine how it could look or feel differently', ar: 'أتخيّل كيف يمكن أن تبدو أو تُشعر بشكل مختلف' }, scores: { creator: 3, builder: 1 } },
    ],
  },
  {
    id: 'q2',
    prompt: {
      en: 'Which school subject do you enjoy most?',
      ar: 'ما المادة الدراسية التي تستمتع بها أكثر؟',
    },
    options: [
      { id: 'a', label: { en: 'Physics or engineering design', ar: 'الفيزياء أو التصميم الهندسي' }, scores: { builder: 3 } },
      { id: 'b', label: { en: 'Biology, chemistry or environmental science', ar: 'الأحياء أو الكيمياء أو علوم البيئة' }, scores: { explorer: 3 } },
      { id: 'c', label: { en: 'Mathematics, statistics or economics', ar: 'الرياضيات أو الإحصاء أو الاقتصاد' }, scores: { analyst: 3 } },
      { id: 'd', label: { en: 'Art, media or computer graphics', ar: 'الفنون أو الإعلام أو الرسوميات الحاسوبية' }, scores: { creator: 3 } },
    ],
  },
  {
    id: 'q3',
    prompt: {
      en: 'Pick the project that sounds most exciting to you.',
      ar: 'اختر المشروع الذي تجده أكثر إثارة لاهتمامك.',
    },
    options: [
      { id: 'a', label: { en: 'Building a working robot or drone', ar: 'بناء روبوت أو طائرة مسيّرة تعمل فعلياً' }, scores: { builder: 3, explorer: 1 } },
      { id: 'b', label: { en: 'Studying how a coral reef or ecosystem changes', ar: 'دراسة كيف يتغيّر شعاب مرجانية أو نظام بيئي' }, scores: { explorer: 3 } },
      { id: 'c', label: { en: 'Predicting outcomes from a large dataset', ar: 'التنبؤ بالنتائج من مجموعة بيانات ضخمة' }, scores: { analyst: 3, builder: 1 } },
      { id: 'd', label: { en: 'Designing an app or immersive experience', ar: 'تصميم تطبيق أو تجربة غامرة' }, scores: { creator: 3, analyst: 1 } },
    ],
  },
  {
    id: 'q4',
    prompt: {
      en: 'In a group project, which role do you naturally take?',
      ar: 'في مشروع جماعي، ما الدور الذي تتولاه بشكل طبيعي؟',
    },
    options: [
      { id: 'a', label: { en: 'The one who builds and assembles the final thing', ar: 'من يبني النتيجة النهائية ويجمّعها' }, scores: { builder: 3 } },
      { id: 'b', label: { en: 'The one who asks "why" and digs into research', ar: 'من يسأل "لماذا" ويتعمّق في البحث' }, scores: { explorer: 3 } },
      { id: 'c', label: { en: 'The one who checks the numbers and the budget', ar: 'من يراجع الأرقام والموازنة' }, scores: { analyst: 3 } },
      { id: 'd', label: { en: 'The one who makes it look and feel great', ar: 'من يجعل النتيجة تبدو وتُشعر بشكل رائع' }, scores: { creator: 3 } },
    ],
  },
  {
    id: 'q5',
    prompt: {
      en: 'Which future headline would make you the happiest?',
      ar: 'أي عنوان مستقبلي سيسعدك أكثر؟',
    },
    options: [
      { id: 'a', label: { en: '"New propulsion system cuts flight time in half"', ar: '"نظام دفع جديد يقلّص زمن الرحلات إلى النصف"' }, scores: { builder: 3, explorer: 1 } },
      { id: 'b', label: { en: '"Researchers discover a new state of matter"', ar: '"باحثون يكتشفون حالة جديدة من المادة"' }, scores: { explorer: 3 } },
      { id: 'c', label: { en: '"AI model predicts disease outbreaks weeks early"', ar: '"نموذج ذكاء اصطناعي يتوقع الأوبئة قبل أسابيع"' }, scores: { analyst: 3, builder: 1 } },
      { id: 'd', label: { en: '"Immersive exhibit lets you walk through history"', ar: '"معرض غامر يتيح لك السير خلال التاريخ"' }, scores: { creator: 3 } },
    ],
  },
  {
    id: 'q6',
    prompt: {
      en: 'How do you prefer to spend a free afternoon?',
      ar: 'كيف تفضّل أن تقضي فترة عصر خالية؟',
    },
    options: [
      { id: 'a', label: { en: 'Taking something apart to see how it works', ar: 'تفكيك شيء لمعرفة كيف يعمل' }, scores: { builder: 3 } },
      { id: 'b', label: { en: 'Reading about space, nature or new discoveries', ar: 'القراءة عن الفضاء أو الطبيعة أو الاكتشافات الجديدة' }, scores: { explorer: 3 } },
      { id: 'c', label: { en: 'Playing strategy games or analysing sports stats', ar: 'ممارسة ألعاب استراتيجية أو تحليل إحصاءات رياضية' }, scores: { analyst: 3 } },
      { id: 'd', label: { en: 'Drawing, filming or editing something creative', ar: 'الرسم أو التصوير أو تحرير عمل إبداعي' }, scores: { creator: 3 } },
    ],
  },
  {
    id: 'q7',
    prompt: {
      en: 'Which advanced technology pulls your attention the most?',
      ar: 'أي تقنية متقدمة تجذب اهتمامك أكثر؟',
    },
    options: [
      { id: 'a', label: { en: 'Autonomous robotics and propulsion systems', ar: 'الروبوتات المستقلة وأنظمة الدفع' }, scores: { builder: 3 } },
      { id: 'b', label: { en: 'Quantum science and sustainable energy', ar: 'علوم الكم والطاقة المستدامة' }, scores: { explorer: 3 } },
      { id: 'c', label: { en: 'AI, data science and secure systems', ar: 'الذكاء الاصطناعي وعلوم البيانات والأنظمة الآمنة' }, scores: { analyst: 3 } },
      { id: 'd', label: { en: 'Advanced materials and immersive design', ar: 'المواد المتقدمة والتصميم الغامر' }, scores: { creator: 3 } },
    ],
  },
  {
    id: 'q8',
    prompt: {
      en: 'What does success look like to you in ten years?',
      ar: 'كيف يبدو النجاح بالنسبة لك بعد عشر سنوات؟',
    },
    options: [
      { id: 'a', label: { en: 'I engineered something people actually use every day', ar: 'صمّمت شيئاً يستخدمه الناس فعلياً كل يوم' }, scores: { builder: 3 } },
      { id: 'b', label: { en: 'I discovered something no one knew before', ar: 'اكتشفت شيئاً لم يكن يعرفه أحد من قبل' }, scores: { explorer: 3 } },
      { id: 'c', label: { en: 'I helped organisations make smarter decisions', ar: 'ساعدت المؤسسات على اتخاذ قرارات أذكى' }, scores: { analyst: 3 } },
      { id: 'd', label: { en: 'I created experiences that move people', ar: 'صنعت تجارب تلامس مشاعر الناس' }, scores: { creator: 3 } },
    ],
  },
]
