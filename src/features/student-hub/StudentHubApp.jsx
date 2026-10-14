import './studentHub.css';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, Bell, Bookmark, BookOpen, BriefcaseBusiness,
  CalendarDays, Check, ChevronDown, Clock3, Code2, Command, Coffee, Database,
  GraduationCap, LayoutDashboard, MapPin, Menu, MessageCircle, Network, Search, ShieldCheck, MessageSquare,
  Sparkles, Target, Users, X, Zap
} from 'lucide-react';
import { learningResources, liveClasses, mentors, jobs, announcements } from './studentHubData';
import NetworkFeatures from './NetworkFeatures';

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'learning', label: 'Learning Hub', icon: BookOpen, path: '/learning' },
  { id: 'mentorship', label: 'Coaching & Mentorship', icon: Target, path: '/mentorship' },
  { id: 'classes', label: 'Classes & Timetable', icon: CalendarDays, path: '/classes' },
  { id: 'jobs', label: 'Jobs & Internships', icon: BriefcaseBusiness, path: '/jobs' },
  { id: 'skill-registry', label: 'Skill Registry', icon: MapPin, path: '/skill-registry' },
  { id: 'opportunities', label: 'Opportunity Board', icon: BriefcaseBusiness, path: '/opportunities' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/messages' },
  { id: 'community', label: 'Community & Announcements', icon: MessageCircle, path: '/community' }
];
const iconMap = { 'code-2': Code2, coffee: Coffee, network: Network, database: Database };
const getRoute = (path) => {
  const clean = path.replace(/\/$/, '') || '/dashboard';
  if (clean.startsWith('/learning')) return 'learning';
  if (clean.startsWith('/mentorship') || clean.startsWith('/coaching')) return 'mentorship';
  if (clean.startsWith('/classes') || clean.startsWith('/timetable')) return 'classes';
  if (clean.startsWith('/jobs') || clean.startsWith('/applications')) return 'jobs';
  if (clean.startsWith('/skill-registry') || clean.startsWith('/skills')) return 'skill-registry';
  if (clean.startsWith('/opportunities')) return 'opportunities';
  if (clean.startsWith('/messages')) return 'messages';
  if (clean.startsWith('/community') || clean.startsWith('/events')) return 'community';
  if (clean.startsWith('/saved')) return 'saved';
  if (clean.startsWith('/profile')) return 'profile';
  return 'dashboard';
};

function ResourceCard({ item, saved, onSave, onOpen }) {
  const Icon = iconMap[item.icon] || BookOpen;
  return <article className="hub-card resource-card">
    <div className={`resource-icon ${item.accent}`}><Icon size={21}/></div>
    <div className="card-kicker">{item.category}<span>·</span>{item.level}</div>
    <h3>{item.title}</h3><p>{item.description}</p>
    <div className="tag-row">{item.tags.map(tag => <span className="hub-tag" key={tag}>{tag}</span>)}</div>
    <div className="resource-footer"><span><Clock3 size={14}/>{item.duration}</span><button className={`icon-button save-button ${saved ? 'is-saved' : ''}`} onClick={() => onSave(item.id)} aria-label={saved ? 'Remove saved item' : 'Save item'}><Bookmark size={17} fill={saved ? 'currentColor' : 'none'}/></button></div>
    {item.progress > 0 && <div className="progress-wrap"><div><span>Your progress</span><b>{item.progress}%</b></div><span className="progress-track"><i style={{ width: item.progress + '%' }}/></span></div>}
    <button className="text-action" onClick={() => onOpen(item.id)}>Explore resource <ArrowRight size={15}/></button>
  </article>;
}

function JobCard({ job, saved, onSave, onOpen }) {
  return <article className="hub-card job-card"><div className="job-top"><div className="company-mark">{job.company.slice(0,1)}</div><button className={`icon-button save-button ${saved ? 'is-saved' : ''}`} onClick={() => onSave(job.id)} aria-label="Save job"><Bookmark size={17} fill={saved ? 'currentColor' : 'none'}/></button></div>
    <span className="card-kicker">{job.type} <span>·</span> {job.posted}</span><h3>{job.title}</h3><div className="company-name">{job.company}</div><p>{job.location}</p><strong className="job-salary">{job.salary}</strong><div className="tag-row">{job.skills.map(skill => <span className="hub-tag" key={skill}>{skill}</span>)}</div><button className="button-secondary full-button" onClick={() => onOpen(job.id)}>View opportunity <ArrowRight size={15}/></button>
  </article>;
}

export default function StudentHubApp({ path, onNavigate }) {
  const [search, setSearch] = useState('');
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [role, setRole] = useState('Student');
  const [roleOpen, setRoleOpen] = useState(false);
  const [saved, setSaved] = useState(() => { try { return JSON.parse(localStorage.getItem('studenthub_saved') || '[]'); } catch { return []; } });
  const [notice, setNotice] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(null);
  const active = getRoute(path);
  const allSearchItems = [...learningResources.map(x => ({...x, kind:'Resource', route:'/learning'})), ...liveClasses.map(x => ({...x, kind:'Class', route:'/classes'})), ...jobs.map(x => ({...x, kind:'Job', route:'/jobs'}))];
  const query = search.trim().toLowerCase();
  const searchResults = allSearchItems.filter(x => !query || (x.title + ' ' + (x.description || '') + ' ' + (x.company || '')).toLowerCase().includes(query)).slice(0, 6);
  const selectedJob = jobs.find(x => x.id === selectedId);
  const selectedResource = learningResources.find(x => x.id === selectedId);
  const selectedClass = liveClasses.find(x => x.id === selectedId);
  const savedItems = useMemo(() => [...learningResources, ...jobs].filter(x => saved.includes(x.id)), [saved]);

  useEffect(() => { localStorage.setItem('studenthub_saved', JSON.stringify(saved)); }, [saved]);
  useEffect(() => {
    const onKey = e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCommandOpen(v => !v); } if (e.key === 'Escape') { setCommandOpen(false); setMobileNavOpen(false); setSelectedId(null); } };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => { const parts = path.split('/').filter(Boolean); const hasDetail = ['learning', 'classes', 'jobs'].includes(parts[0]) && Boolean(parts[1]); setSelectedId(hasDetail ? parts[1] : path === '/coaching/book' ? '__booking__' : null); setSearch(''); }, [path]);
  const go = to => { setMobileNavOpen(false); setCommandOpen(false); onNavigate(to); };
  const toggleSaved = id => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const pageTitle = nav.find(n => n.id === active)?.label || (active === 'saved' ? 'Saved items' : active === 'profile' ? 'Your profile' : 'Your dashboard');
  const matchingResources = learningResources.filter(x => (filter === 'All' || x.category === filter) && (!query || (x.title + x.description + x.tags.join(' ')).toLowerCase().includes(query)));
  const matchingJobs = jobs.filter(x => (!query || (x.title + x.company + x.skills.join(' ')).toLowerCase().includes(query)) && (filter === 'All' || x.type === filter));

  return <div className="student-hub">
    <aside className={`hub-sidebar ${mobileNavOpen ? 'mobile-open' : ''}`}>
      <div className="hub-brand"><div className="brand-mark"><GraduationCap size={22}/></div><div><b>student<span>hub</span></b><small>YOUR NEXT CHAPTER</small></div><button className="icon-button sidebar-close" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation"><X size={19}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="hub-nav" aria-label="Primary navigation">{nav.map(item => { const Icon = item.icon; return <button key={item.id} className={`hub-nav-item ${active === item.id ? 'active' : ''}`} onClick={() => go(item.path)}><Icon size={18}/><span>{item.label}</span>{item.id === 'classes' && <i className="nav-dot"/>}</button>; })}</nav>
      <div className="sidebar-spacer"/>
      <div className="mentor-promo"><div className="promo-icon"><Sparkles size={17}/></div><b>Need a little direction?</b><p>Get unstuck with a mentor who has been there.</p><button onClick={() => go('/coaching/book')}>Find your mentor <ArrowRight size={14}/></button></div>
      <button className="hub-nav-item" onClick={() => go('/saved')}><Bookmark size={18}/><span>Saved items</span><span className="saved-count">{saved.length}</span></button>
      <button className="hub-nav-item" onClick={() => go('/profile')}><Users size={18}/><span>My profile</span></button>
      <div className="sidebar-bottom"><div className="avatar avatar-small">VS</div><div className="user-label"><b>Varma Student</b><span>Learning account</span></div><button className="icon-button" aria-label="Profile menu" onClick={() => go('/profile')}><ArrowDownRight size={16}/></button></div>
    </aside>
    {mobileNavOpen && <button className="hub-scrim" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation overlay"/>}
    <div className="hub-main">
      <header className="hub-topbar">
        <button className="icon-button mobile-menu" onClick={() => setMobileNavOpen(true)} aria-label="Open navigation"><Menu size={21}/></button>
        <div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><b>{pageTitle}</b></div>
        <button className="global-search" onClick={() => setCommandOpen(true)}><Search size={17}/><span>Search anything...</span><kbd>Ctrl K</kbd></button>
        <div className="top-actions"><button className="icon-button notification-button" onClick={() => go('/community')} aria-label="Notifications"><Bell size={19}/><i/></button>
          <div className="role-wrap"><button className="role-switch" onClick={() => setRoleOpen(v => !v)}><span className="avatar avatar-small">VS</span><span className="role-text"><b>{role}</b><small>Workspace</small></span><ChevronDown size={15}/></button>{roleOpen && <div className="role-menu">{['Student','Mentor','Admin'].map(r => <button key={r} onClick={() => {setRole(r);setRoleOpen(false);setNotice(r === 'Student' ? '' : 'Preview role selected. Permissions are not enabled in this demo.');}}>{r}{role===r && <Check size={14}/>}</button>)}</div>}</div>
        </div>
      </header>
      <main className="hub-content">
        {notice && <div className="demo-notice"><ShieldCheck size={16}/>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={14}/></button></div>}
        {active === 'dashboard' && <Dashboard go={go} saved={saved} toggleSaved={toggleSaved} openItem={setSelectedId}/>}
        {active === 'learning' && <><PageHeading eyebrow="LEARN SOMETHING NEW" title="Learning Hub" description="Curated paths and practical resources to help you build skills, one step at a time."/><FilterBar value={filter} onChange={setFilter} options={['All','Roadmap','Cheat sheet','Study module']}/><div className="resource-grid">{matchingResources.map(item => <ResourceCard key={item.id} item={item} saved={saved.includes(item.id)} onSave={toggleSaved} onOpen={setSelectedId}/>)}</div>{!matchingResources.length && <EmptyState title="No resources found" text="Try another search or filter."/>}</>}
        {active === 'classes' && <><PageHeading eyebrow="LEARN TOGETHER" title="Classes & timetable" description="Join live sessions, practice with a cohort, and revisit recordings when it suits you."/><div className="section-heading"><div><h2>Coming up</h2><p>Your next opportunities to learn live.</p></div><button className="button-secondary" onClick={() => setNotice('Calendar integration will be connected during backend integration.')}> <CalendarDays size={15}/> Calendar view</button></div><div className="class-list">{liveClasses.map((item,i)=><article className="class-row" key={item.id}><div className={`class-date class-date-${i}`}><span>{i===0?'TODAY':i===1?'TMRW':'FRI'}</span><b>{i===0?'15':i===1?'16':'17'}</b></div><div className="class-info"><div className="card-kicker">{item.type} <span>·</span> {item.category}</div><h3>{item.title}</h3><p>with {item.instructor} · {item.duration}</p></div><div className="class-time"><Clock3 size={15}/>{item.startsAt}</div><button className="button-secondary" onClick={() => setSelectedId(item.id)}>Details <ArrowRight size={15}/></button></article>)}</div><div className="recording-banner"><div className="recording-icon"><Zap size={22}/></div><div><b>Missed a session?</b><p>Recordings and notes will be organized here after each class.</p></div><button className="text-action" onClick={() => setNotice('Recorded archive is planned for the content integration phase.')}>Explore archive <ArrowRight size={15}/></button></div></>}
        {active === 'mentorship' && <><PageHeading eyebrow="GROW WITH GUIDANCE" title="Coaching & mentorship" description="Get practical feedback from people who've solved the problems you're working on."/><div className="mentor-grid">{mentors.map(m=><article className="hub-card mentor-card" key={m.id}><div className="mentor-top"><div className="avatar mentor-avatar">{m.initials}</div><span className="rating">★ {m.rating}</span></div><h3>{m.name}</h3><p>{m.role}</p><div className="mentor-specialty">{m.specialty}</div><div className="mentor-availability"><Clock3 size={14}/>{m.availability}</div><button className="button-primary full-button" onClick={() => go('/coaching/book')}>Book a session <ArrowRight size={15}/></button></article>)}</div><div className="question-banner"><MessageCircle size={20}/><div><b>Have a question for the community?</b><p>Share a blocker and learn from other students and mentors.</p></div><button className="button-secondary" onClick={() => go('/community')}>Open Q&A <ArrowRight size={15}/></button></div></>}
        {(active === 'skill-registry' || active === 'opportunities' || active === 'messages') && <NetworkFeatures active={active} path={path} onNavigate={go} />}
        {active === 'jobs' && <><PageHeading eyebrow="YOUR NEXT OPPORTUNITY" title="Jobs & internships" description="Discover opportunities that match your skills and keep your application journey organized."/><FilterBar value={filter} onChange={setFilter} options={['All','Internship','Full-time']}/><div className="job-grid">{matchingJobs.map(job=><JobCard key={job.id} job={job} saved={saved.includes(job.id)} onSave={toggleSaved} onOpen={setSelectedId}/>)}</div><div className="application-note"><BriefcaseBusiness size={19}/><div><b>Keep your applications moving</b><p>Your application tracker will bring saved roles, deadlines, and progress into one place.</p></div><button className="text-action" onClick={() => setNotice('Application tracking will be enabled when the API is connected.')}>Application tracker <ArrowRight size={15}/></button></div></>}
        {active === 'community' && <><PageHeading eyebrow="YOU'RE NOT LEARNING ALONE" title="Community & announcements" description="Stay in the loop, meet other learners, and find your next community event."/><div className="community-layout"><section><div className="section-heading"><div><h2>Latest announcements</h2><p>Updates from across the Student Hub.</p></div></div><div className="announcement-list">{announcements.map(a=><article className="announcement-card" key={a.id}><div className="announcement-mark"><Bell size={18}/></div><div className="announcement-body"><div className="card-kicker">{a.label}<span>·</span>{a.date}</div><h3>{a.title}</h3><p>{a.detail}</p></div><button className="icon-button" onClick={() => setNotice('Event registration will be available after backend integration.')} aria-label="View announcement"><ArrowRight size={17}/></button></article>)}</div></section><aside className="community-side"><div className="community-highlight"><div className="promo-icon"><Users size={19}/></div><h3>Better together</h3><p>Share what you're building, ask questions, and help another learner move forward.</p><button className="button-primary full-button" onClick={() => setNotice('Discussion rooms are planned for the community integration phase.')}>Explore discussions</button></div><div className="community-stat"><span>Upcoming community event</span><b>Build Night</b><small>Tomorrow · 6:30 PM</small></div></aside></div></>}
        {active === 'saved' && <><PageHeading eyebrow="YOUR PERSONAL LIBRARY" title="Saved items" description="Pick up where you left off with resources and opportunities you bookmarked."/><div className="resource-grid">{savedItems.map(item => item.company ? <JobCard key={item.id} job={item} saved onSave={toggleSaved} onOpen={setSelectedId}/> : <ResourceCard key={item.id} item={item} saved onSave={toggleSaved} onOpen={setSelectedId}/>)}</div>{!savedItems.length && <EmptyState title="Your library starts here" text="Save courses, notes, and jobs to find them quickly later."/>}</>}
        {active === 'profile' && <><PageHeading eyebrow="YOUR LEARNING IDENTITY" title="Your profile" description="A home for your learning goals, skills, and interests."/><div className="profile-panel"><div className="avatar profile-avatar">VS</div><div><h2>Varma Student</h2><p>Student profile · Demo workspace</p><div className="tag-row"><span className="hub-tag">Frontend development</span><span className="hub-tag">Career growth</span><span className="hub-tag">System design</span></div></div><button className="button-secondary" onClick={() => setNotice('Profile editing will be enabled after authentication is connected.')}>Edit profile</button></div><div className="profile-note"><ShieldCheck size={19}/><div><b>Demo account</b><p>Role switching is for UI preview only. Real identity and permissions will be enforced by the backend.</p></div></div></>}
      </main>
      <footer className="hub-footer"><span>© 2026 Student Hub</span><span>Built for your next chapter <Sparkles size={13}/></span><a href="/talentlens" onClick={e => {e.preventDefault();go('/talentlens');}}>Open TalentLens workspace <ArrowRight size={13}/></a></footer>
    </div>
    {commandOpen && <div className="command-overlay" onMouseDown={e => {if(e.target===e.currentTarget)setCommandOpen(false);}}><section className="command-panel" role="dialog" aria-modal="true" aria-label="Global search"><div className="command-input"><Search size={19}/><input autoFocus placeholder="Search courses, classes, jobs..." value={search} onChange={e=>setSearch(e.target.value)}/><button className="icon-button" onClick={()=>setCommandOpen(false)} aria-label="Close search"><X size={17}/></button></div><div className="command-label">{query?'SEARCH RESULTS':'QUICK NAVIGATION'}</div>{query ? searchResults.map(item=><button className="command-result" key={item.id} onClick={()=>go(item.route + '/' + item.id)}><div className="command-result-icon"><Search size={16}/></div><span><b>{item.title}</b><small>{item.kind}</small></span><ArrowRight size={15}/></button>) : nav.map(item=>{const Icon=item.icon;return <button className="command-result" key={item.id} onClick={()=>go(item.path)}><div className="command-result-icon"><Icon size={16}/></div><span><b>{item.label}</b><small>Go to section</small></span><kbd>↵</kbd></button>})}<div className="command-foot"><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>esc</kbd> Close</span></div></section></div>}
    {selectedId && <div className="detail-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setSelectedId(null);}}><section className="detail-panel" role="dialog" aria-modal="true" aria-label="Item details"><button className="icon-button detail-close" onClick={()=>setSelectedId(null)} aria-label="Close details"><X size={19}/></button>{selectedJob ? <><span className="detail-eyebrow">CAREER OPPORTUNITY</span><div className="company-mark detail-company">{selectedJob.company.slice(0,1)}</div><h2>{selectedJob.title}</h2><p className="detail-subtitle">{selectedJob.company} · {selectedJob.location}</p><strong className="job-salary">{selectedJob.salary}</strong><p>{selectedJob.description}</p><div className="tag-row">{selectedJob.skills.map(s=><span className="hub-tag" key={s}>{s}</span>)}</div><button className="button-primary full-button" onClick={()=>{setNotice('Application form is a planned next step; no application was submitted.');setSelectedId(null);}}>Start application <ArrowRight size={16}/></button><button className="button-secondary full-button" onClick={()=>toggleSaved(selectedJob.id)}>{saved.includes(selectedJob.id)?'Remove from saved':'Save opportunity'} <Bookmark size={15}/></button></> : selectedResource ? <><span className="detail-eyebrow">LEARNING RESOURCE</span><h2>{selectedResource.title}</h2><p className="detail-subtitle">{selectedResource.category} · {selectedResource.level} · {selectedResource.duration}</p><p>{selectedResource.description}</p><div className="tag-row">{selectedResource.tags.map(s=><span className="hub-tag" key={s}>{s}</span>)}</div><button className="button-primary full-button" onClick={()=>{setNotice('Learning content will be connected in the next content phase.');setSelectedId(null);}}>Start learning <ArrowRight size={16}/></button><button className="button-secondary full-button" onClick={()=>toggleSaved(selectedResource.id)}>{saved.includes(selectedResource.id)?'Remove saved item':'Save resource'} <Bookmark size={15}/></button></> : selectedClass ? <><span className="detail-eyebrow">CLASS DETAILS</span><h2>{selectedClass.title}</h2><p className="detail-subtitle">{selectedClass.type} · {selectedClass.category}</p><p>With {selectedClass.instructor}. {selectedClass.startsAt}, {selectedClass.duration}.</p><button className="button-primary full-button" onClick={()=>{setNotice('Meeting links will be enabled once classes are backed by the API.');setSelectedId(null);}}>View joining details <ArrowRight size={16}/></button></> : <><h2>Mentorship booking</h2><p>Choose a mentor and preferred time to request a session.</p><label className="form-label">Mentor<select><option>Ananya Rao — Frontend</option><option>Rahul Mehta — System design</option><option>Kavya Nair — Data</option></select></label><label className="form-label">Preferred time<select><option>Today, 6:30 PM</option><option>Tomorrow, 7:00 PM</option><option>Friday, 5:00 PM</option></select></label><button className="button-primary full-button" onClick={()=>{setNotice('Booking preview only. No session has been reserved.');setSelectedId(null);}}>Request booking <ArrowRight size={16}/></button></>}</section></div>}
  </div>;
}

function PageHeading({eyebrow,title,description}) { return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>; }
function FilterBar({value,onChange,options}) { return <div className="filter-bar"><div className="filter-label"><span>Browse by</span>{options.map(x=><button key={x} className={value===x?'selected':''} onClick={()=>onChange(x)}>{x}</button>)}</div><span className="filter-count"><span className="filter-pulse"/> Updated for you</span></div>; }
function SectionTitle({title,subtitle,action,onAction}) { return <div className="section-heading"><div><h2>{title}</h2><p>{subtitle}</p></div>{action&&<button className="text-action" onClick={onAction}>{action}<ArrowRight size={15}/></button>}</div>; }
function EmptyState({title,text}) { return <div className="empty-state"><div className="empty-icon"><Search size={22}/></div><h3>{title}</h3><p>{text}</p></div>; }

function Dashboard({go,saved,toggleSaved,openItem}) {
  return <><section className="welcome-banner"><div className="welcome-copy"><div className="welcome-pill"><Sparkles size={13}/> YOUR LEARNING SPACE</div><h1>Make today count<span>.</span></h1><p>A little progress every day adds up. Here's your next step.</p><div className="welcome-actions"><button className="button-primary" onClick={()=>go('/learning')}>Continue learning <ArrowRight size={16}/></button><button className="button-ghost" onClick={()=>go('/classes')}>Explore classes</button></div></div><div className="welcome-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-glow"/><div className="art-card art-card-main"><div className="art-card-icon"><GraduationCap size={22}/></div><span>YOUR NEXT CHAPTER</span><b>Starts with one step</b><small>Keep your momentum going</small></div><div className="art-float art-float-one"><Zap size={16}/><span>Learn by doing</span></div><div className="art-float art-float-two"><Check size={16}/><span>Progress unlocked</span></div></div></section>
    <div className="stats-grid"><div className="stat-card"><div className="stat-icon stat-blue"><BookOpen size={18}/></div><span>Learning paths</span><b>04</b><small>Curated for your goals</small></div><div className="stat-card"><div className="stat-icon stat-violet"><CalendarDays size={18}/></div><span>Upcoming sessions</span><b>03</b><small>Keep your calendar close</small></div><div className="stat-card"><div className="stat-icon stat-green"><Bookmark size={18}/></div><span>Saved items</span><b>{String(saved.length).padStart(2,'0')}</b><small>Ready when you are</small></div><div className="stat-card"><div className="stat-icon stat-orange"><Target size={18}/></div><span>Career momentum</span><b>01</b><small>Opportunity to explore</small></div></div>
    <section className="content-section"><SectionTitle title="Pick up where you left off" subtitle="Your learning journey, at a glance." action="View all resources" onAction={()=>go('/learning')}/><div className="resource-grid">{learningResources.slice(0,3).map(item=><ResourceCard key={item.id} item={item} saved={saved.includes(item.id)} onSave={toggleSaved} onOpen={openItem}/>)}</div></section>
    <section className="content-section"><SectionTitle title="Coming up next" subtitle="A little time with a great teacher can change your week." action="See timetable" onAction={()=>go('/classes')}/><div className="class-list compact">{liveClasses.slice(0,2).map((item,i)=><article className="class-row" key={item.id}><div className={`class-date class-date-${i}`}><span>{i===0?'TODAY':'TMRW'}</span><b>{i===0?'15':'16'}</b></div><div className="class-info"><h3>{item.title}</h3><p>with {item.instructor} · {item.duration}</p></div><div className="class-time"><Clock3 size={15}/>{item.startsAt}</div><button className="icon-button" onClick={()=>go('/classes')} aria-label="Open class"><ArrowRight size={17}/></button></article>)}</div></section>
    <section className="content-section"><SectionTitle title="Your next opportunity" subtitle="Explore roles that help turn your skills into experience." action="Browse jobs" onAction={()=>go('/jobs')}/><div className="job-grid">{jobs.slice(0,2).map(job=><JobCard key={job.id} job={job} saved={saved.includes(job.id)} onSave={toggleSaved} onOpen={openItem}/>)}</div></section>
    <section className="content-section"><SectionTitle title="Around the community" subtitle="What students and mentors are talking about." action="All announcements" onAction={()=>go('/community')}/><div className="announcement-list">{announcements.slice(0,2).map(a=><article className="announcement-card" key={a.id}><div className="announcement-mark"><Bell size={18}/></div><div className="announcement-body"><div className="card-kicker">{a.label}<span>·</span>{a.date}</div><h3>{a.title}</h3><p>{a.detail}</p></div><ArrowRight size={17}/></article>)}</div></section>
  </>;
}
