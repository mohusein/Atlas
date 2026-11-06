import { useState } from 'react'
import { BookOpen, ChevronDown, CircleHelp, FileText, LayoutDashboard, MessageSquare, Plus, Search, Send, Settings2, ShieldCheck, Sparkles, ThumbsDown, ThumbsUp, UploadCloud } from 'lucide-react'

type Source = { title: string; detail: string }
type Message = { role: 'assistant' | 'user'; text: string; sources?: Source[] }

const initial: Message[] = [{ role: 'assistant', text: "Hello, Ahmed. I'm Atlas, your company knowledge assistant. Ask a question and I'll find an answer grounded in your team's documentation.", sources: [] }]

export default function App() {
  const [section, setSection] = useState('Ask Atlas')
  const [messages, setMessages] = useState(initial)
  const [question, setQuestion] = useState('')
  const [tab, setTab] = useState('All files')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!question.trim()) return
    setMessages([...messages, { role: 'user', text: question.trim() }, { role: 'assistant', text: "Atlas isn't connected to a knowledge base yet. Once your administrator adds company documents, I'll answer from those sources and show you the supporting citations." }])
    setQuestion('')
  }

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-icon"><Sparkles size={18} /></div><div><b>atlas</b><small>KNOWLEDGE INTELLIGENCE</small></div><button className="icon-btn collapse" aria-label="Collapse sidebar"><ChevronDown size={16} /></button></div>
      <button className="new-chat" onClick={() => { setSection('Ask Atlas'); setMessages(initial) }}><Plus size={16} /> New conversation <span>⌘ K</span></button>
      <div className="nav-group"><label>WORKSPACE</label>
        <button className={section === 'Ask Atlas' ? 'nav-item active' : 'nav-item'} onClick={() => setSection('Ask Atlas')}><MessageSquare size={17} /> Ask Atlas</button>
        <button className={section === 'Knowledge base' ? 'nav-item active' : 'nav-item'} onClick={() => setSection('Knowledge base')}><BookOpen size={17} /> Knowledge base <span className="count">0</span></button>
        <button className={section === 'Evaluations' ? 'nav-item active' : 'nav-item'} onClick={() => setSection('Evaluations')}><LayoutDashboard size={17} /> Evaluations</button>
      </div>
      <div className="history"><label>RECENT</label><button className="history-item"><MessageSquare size={15} /> AWS production access</button><button className="history-item"><MessageSquare size={15} /> Parental leave policy</button><button className="history-item"><MessageSquare size={15} /> Q3 onboarding checklist</button></div>
      <div className="side-bottom"><button className="nav-item"><CircleHelp size={17} /> Help center</button><button className="nav-item"><Settings2 size={17} /> Settings</button><div className="profile"><div className="avatar">AS</div><div><b>Ahmed S.</b><small>Knowledge admin</small></div><ChevronDown size={15} /></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="breadcrumbs">Workspace <span>/</span> <b>{section}</b></div><div className="top-actions"><div className="secure"><ShieldCheck size={14} /> Your workspace is secure</div><button className="avatar small">AS</button></div></header>
      {section === 'Ask Atlas' ? <section className="chat-area">
        <div className="chat-scroll">
          {messages.length === 1 && <div className="welcome"><div className="welcome-mark"><Sparkles size={23} /></div><div className="eyebrow">YOUR KNOWLEDGE, CONNECTED</div><h1>What would you like<br/>to know?</h1><p>Ask a question about your organization's knowledge.<br/>Every answer is grounded in trusted sources.</p>
            <div className="suggestions"><button onClick={() => setQuestion('How do I request access to production systems?')}><span>01</span><div><b>How do I request access to production systems?</b><small>Policies &amp; procedures</small></div><span>↗</span></button><button onClick={() => setQuestion('What is our parental leave policy?')}><span>02</span><div><b>What is our parental leave policy?</b><small>People &amp; culture</small></div><span>↗</span></button><button onClick={() => setQuestion('Where can I find the latest onboarding guide?')}><span>03</span><div><b>Where can I find the latest onboarding guide?</b><small>Getting started</small></div><span>↗</span></button></div>
          </div>}
          {messages.length > 1 && <div className="conversation">{messages.map((m, i) => <div className={`message ${m.role}`} key={i}>{m.role === 'assistant' && <div className="assistant-icon"><Sparkles size={15}/></div>}<div className="message-body"><div className="message-label">{m.role === 'assistant' ? 'ATLAS' : 'YOU'}</div><p>{m.text}</p>{m.sources?.length ? <div className="citations"><div className="citation-head">SOURCES <span>0</span></div></div> : null}{m.role === 'assistant' && i > 0 && <div className="feedback"><button aria-label="Helpful"><ThumbsUp size={14}/></button><button aria-label="Not helpful"><ThumbsDown size={14}/></button></div>}</div></div>)}</div>}
        </div>
        <div className="composer-wrap"><form className="composer" onSubmit={submit}><textarea value={question} onChange={e => setQuestion(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(e) } }} placeholder="Ask anything about your company knowledge..." rows={2}/><div className="composer-bottom"><span><ShieldCheck size={13}/> Answers are grounded in your documents</span><button type="submit" aria-label="Send question" disabled={!question.trim()}><Send size={16}/></button></div></form><div className="disclaimer">Atlas can make mistakes. Verify important information with the cited source.</div></div>
      </section> : section === 'Knowledge base' ? <section className="page-area"><div className="page-heading"><div><div className="eyebrow">YOUR ORGANIZATION'S KNOWLEDGE</div><h1>Knowledge base</h1><p>Manage documents and control what Atlas can answer from.</p></div><button className="primary"><UploadCloud size={16}/> Upload documents</button></div><div className="stats"><div><small>DOCUMENTS</small><b>0</b><span>Across all collections</span></div><div><small>READY TO SEARCH</small><b>0</b><span>Processed and indexed</span></div><div><small>PROCESSING</small><b>0</b><span>Documents being indexed</span></div></div><div className="library"><div className="library-head"><div className="tabs">{['All files','Collections','Processing'].map(t=><button className={tab===t?'selected':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div><div className="search"><Search size={15}/><input placeholder="Search documents" /></div></div><div className="empty"><div className="empty-icon"><FileText size={22}/></div><b>Your knowledge base is empty</b><p>Upload policies, guides, handbooks, and other documents<br/>to make them searchable by your team.</p><button className="primary"><UploadCloud size={15}/> Upload your first document</button><small>PDF, DOCX, TXT, or Markdown · Up to 25 MB each</small></div></div></section> : <section className="page-area"><div className="page-heading"><div><div className="eyebrow">QUALITY &amp; RELIABILITY</div><h1>Evaluations</h1><p>Measure retrieval and answer quality across your knowledge base.</p></div><button className="primary" disabled>Run evaluation</button></div><div className="empty evaluation-empty"><div className="empty-icon"><LayoutDashboard size={22}/></div><b>No evaluations yet</b><p>Evaluation results will appear here once the RAG pipeline<br/>and reviewed question set are configured.</p></div></section>}
    </main>
  </div>
}
