export const emirates = [
  { id: 'abu-dhabi', en: 'Abu Dhabi', ar: 'أبوظبي' },
  { id: 'dubai', en: 'Dubai', ar: 'دبي' },
  { id: 'sharjah', en: 'Sharjah', ar: 'الشارقة' },
  { id: 'ajman', en: 'Ajman', ar: 'عجمان' },
  { id: 'umm-al-quwain', en: 'Umm Al Quwain', ar: 'أم القيوين' },
  { id: 'ras-al-khaimah', en: 'Ras Al Khaimah', ar: 'رأس الخيمة' },
  { id: 'fujairah', en: 'Fujairah', ar: 'الفجيرة' },
]

export const curricula = [
  { id: 'moe', en: 'Ministry of Education (MOE)', ar: 'وزارة التربية والتعليم' },
  { id: 'british', en: 'British', ar: 'بريطاني' },
  { id: 'american', en: 'American', ar: 'أمريكي' },
  { id: 'ib', en: 'International Baccalaureate (IB)', ar: 'البكالوريا الدولية' },
  { id: 'indian', en: 'Indian (CBSE/ICSE)', ar: 'هندي' },
  { id: 'other', en: 'Other', ar: 'أخرى' },
]

export const grades = Array.from({ length: 7 }, (_, index) => {
  const grade = index + 6
  return { id: `grade-${grade}`, en: `Grade ${grade}`, ar: `الصف ${grade}` }
})

export const communicationPreferences = [
  { id: 'email', en: 'Email', ar: 'البريد الإلكتروني' },
  { id: 'sms', en: 'SMS', ar: 'رسائل نصية' },
  { id: 'whatsapp', en: 'WhatsApp', ar: 'واتساب' },
]
