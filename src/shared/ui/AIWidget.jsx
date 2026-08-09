import { useState } from 'react'
import { ChatIcon, CloseIcon, SendIcon, SparkIcon } from './icons.jsx'

const widgetCopy = {
  en: {
    label: 'AI Career Buddy',
    status: 'Preview mode',
    title: 'AI Career Buddy',
    intro: 'Ask about technologies, pathways and next steps once the AI provider is connected.',
    notice: 'AI provider is not connected in this client build. No messages are sent.',
    prompts: ['Which technology fits me?', 'How do I prepare?', 'What should I study?'],
    placeholder: 'AI chat unavailable',
  },
  ar: {
    label: 'مساعد المسار بالذكاء الاصطناعي',
    status: 'وضع المعاينة',
    title: 'مساعد المسار بالذكاء الاصطناعي',
    intro: 'اسأل عن التقنيات والمسارات والخطوات التالية عند ربط مزود الذكاء الاصطناعي.',
    notice: 'مزود الذكاء الاصطناعي غير متصل في هذا الإصدار. لا يتم إرسال أي رسائل.',
    prompts: ['أي تقنية تناسبني؟', 'كيف أستعد؟', 'ماذا أدرس؟'],
    placeholder: 'الدردشة غير متاحة',
  },
}

export function AIWidget({ lang }) {
  const [open, setOpen] = useState(false)
  const t = widgetCopy[lang]

  return (
    <aside className={`ai-widget ${open ? 'is-open' : ''}`} aria-label={t.label}>
      {open && (
        <section className="ai-widget-panel">
          <header>
            <span><SparkIcon />{t.status}</span>
            <button onClick={() => setOpen(false)} aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}><CloseIcon /></button>
          </header>
          <div className="ai-widget-body">
            <h2>{t.title}</h2>
            <p>{t.intro}</p>
            <strong>{t.notice}</strong>
            <div className="ai-widget-prompts">
              {t.prompts.map((prompt) => <button disabled key={prompt}>{prompt}</button>)}
            </div>
          </div>
          <label className="ai-widget-composer">
            <input disabled placeholder={t.placeholder} />
            <button disabled aria-label={lang === 'ar' ? 'إرسال' : 'Send'}><SendIcon /></button>
          </label>
        </section>
      )}
      <button className="ai-widget-launch" onClick={() => setOpen(!open)} aria-expanded={open}>
        <ChatIcon />
        <span>{t.label}</span>
      </button>
    </aside>
  )
}
