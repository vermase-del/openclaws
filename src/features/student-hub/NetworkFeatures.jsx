import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Clock3, MapPin, MessageSquare, Plus, Search, Send, SlidersHorizontal, Users } from 'lucide-react';

const skillProfiles = [
  { id: 'student-asha', name: 'Asha Reddy', initials: 'AR', headline: 'Frontend developer in training', city: 'Bengaluru', area: 'Whitefield', mode: 'Hybrid / remote', skills: ['React', 'JavaScript', 'CSS', 'Figma'], level: 'Intermediate', availability: 'Open to internships', bio: 'Building accessible interfaces and contributing to small open-source projects.' },
  { id: 'student-rohan', name: 'Rohan Shah', initials: 'RS', headline: 'Java & backend developer', city: 'Bengaluru', area: 'Indiranagar', mode: 'On-site / hybrid', skills: ['Java', 'Spring Boot', 'PostgreSQL', 'REST APIs'], level: 'Intermediate', availability: 'Open to junior roles', bio: 'Enjoys API design, testing, and learning production engineering practices.' },
  { id: 'student-meera', name: 'Meera Nair', initials: 'MN', headline: 'Data analytics learner', city: 'Hyderabad', area: 'Madhapur', mode: 'Remote', skills: ['SQL', 'Python', 'Excel', 'Power BI'], level: 'Beginner', availability: 'Available for projects', bio: 'Turns messy datasets into clear dashboards and practical insights.' },
  { id: 'student-arjun', name: 'Arjun Kumar', initials: 'AK', headline: 'UI/UX designer and prototyper', city: 'Chennai', area: 'Adyar', mode: 'Hybrid / remote', skills: ['Figma', 'Wireframing', 'User research', 'CSS'], level: 'Advanced', availability: 'Open to freelance', bio: 'Interested in research-led design and accessible digital products.' },
  { id: 'mentor-ananya', name: 'Ananya Rao', initials: 'AR', headline: 'Frontend engineer · Mentor', city: 'Bengaluru', area: 'Koramangala', mode: 'Remote mentoring', skills: ['React', 'TypeScript', 'Accessibility', 'System design'], level: 'Advanced', availability: 'Mentoring available', bio: 'Helps learners build portfolio projects and prepare for frontend interviews.' },
  { id: 'student-kabir', name: 'Kabir Singh', initials: 'KS', headline: 'Cloud & DevOps learner', city: 'Pune', area: 'Hinjawadi', mode: 'Remote', skills: ['Docker', 'AWS', 'Linux', 'CI/CD'], level: 'Intermediate', availability: 'Open to internships', bio: 'Practicing deployment automation and cloud fundamentals.' }
];

const opportunityPosts = [
  { id: 'opp-frontend-intern', title: 'Frontend Developer Intern', company: 'Northstar Labs', city: 'Bengaluru', area: 'Whitefield', mode: 'Hybrid', type: 'Internship', compensation: '₹20k–₹30k / month', skills: ['React', 'JavaScript', 'CSS'], posted: '2 days ago', description: 'Help ship responsive product interfaces with support from senior engineers.', posterId: 'mentor-ananya' },
  { id: 'opp-java-junior', title: 'Junior Java Developer', company: 'BlueOrbit Systems', city: 'Hyderabad', area: 'Madhapur', mode: 'On-site', type: 'Full-time', compensation: '₹5–7 LPA', skills: ['Java', 'Spring Boot', 'PostgreSQL'], posted: '3 days ago', description: 'Build and test REST APIs, improve service reliability, and learn from a backend team.', posterId: 'student-rohan' },
  { id: 'opp-data-project', title: 'Community Data Dashboard', company: 'Student Hub Community', city: 'Remote', area: 'Remote', mode: 'Remote', type: 'Project', compensation: 'Portfolio project', skills: ['SQL', 'Python', 'Power BI'], posted: 'Today', description: 'Collaborate with learners to create an open portfolio dashboard using public datasets.', posterId: 'student-meera' },
  { id: 'opp-ui-freelance', title: 'Landing Page UI Collaboration', company: 'LaunchPad Collective', city: 'Chennai', area: 'Adyar', mode: 'Hybrid', type: 'Freelance', compensation: 'Paid · scope-based', skills: ['Figma', 'CSS', 'Accessibility'], posted: '1 day ago', description: 'Work with a small team to prototype and implement a clear, accessible landing page.', posterId: 'student-arjun' },
  { id: 'opp-devops-intern', title: 'Cloud Operations Intern', company: 'CloudSpring', city: 'Pune', area: 'Hinjawadi', mode: 'Remote', type: 'Internship', compensation: '₹18k–₹25k / month', skills: ['Docker', 'AWS', 'Linux'], posted: '5 days ago', description: 'Support deployment pipelines, container workflows, and internal cloud documentation.', posterId: 'student-kabir' }
];

const initialConversations = [
  { id: 'mentor-ananya', name: 'Ananya Rao', initials: 'AR', headline: 'Frontend engineer · Mentor', lastMessage: 'Share your portfolio when you get a chance.', unread: 1, messages: [{ id: 'm1', from: 'them', text: 'Hi! Happy to help with your frontend portfolio.', time: '10:12 AM' }, { id: 'm2', from: 'me', text: 'Thank you. I am polishing two React projects this week.', time: '10:15 AM' }, { id: 'm3', from: 'them', text: 'Share your portfolio when you get a chance.', time: '10:18 AM' }] },
  { id: 'student-rohan', name: 'Rohan Shah', initials: 'RS', headline: 'Java & backend developer', lastMessage: 'Are you joining the API study group?', unread: 0, messages: [{ id: 'm4', from: 'them', text: 'Are you joining the API study group?', time: 'Yesterday' }] },
  { id: 'student-meera', name: 'Meera Nair', initials: 'MN', headline: 'Data analytics learner', lastMessage: 'I added the dataset notes to our project.', unread: 0, messages: [{ id: 'm5', from: 'them', text: 'I added the dataset notes to our project.', time: 'Mon' }] }
];

function PageHeading({ eyebrow, title, description, count }) {
  return <div className="page-heading network-heading"><div><span className="page-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{count !== undefined && <span className="network-count">{count} listed</span>}</div>;
}
function FilterSelect({ label, value, onChange, options }) {
  return <label className="network-filter"><span>{label}</span><select value={value} onChange={e => onChange(e.target.value)}>{options.map(option => <option key={option} value={option}>{option}</option>)}</select></label>;
}
export default function NetworkFeatures({ active, path, onNavigate }) {
  const [skillSearch, setSkillSearch] = useState('');
  const [skillCity, setSkillCity] = useState('All locations');
  const [skillLevel, setSkillLevel] = useState('All levels');
  const [opportunitySearch, setOpportunitySearch] = useState('');
  const [communityOpportunities, setCommunityOpportunities] = useState(() => { try { const stored = localStorage.getItem('studenthub_opportunities'); return stored ? JSON.parse(stored) : opportunityPosts; } catch { return opportunityPosts; } });
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', company: '', city: 'Bengaluru', mode: 'Hybrid', type: 'Internship', compensation: '', skills: '', description: '' });
  const [opportunityCity, setOpportunityCity] = useState('All locations');
  const [opportunityType, setOpportunityType] = useState('All types');
  const [conversations, setConversations] = useState(() => {
    try { const stored = localStorage.getItem('studenthub_messages'); return stored ? JSON.parse(stored) : initialConversations; }
    catch { return initialConversations; }
  });
  const [selectedConversation, setSelectedConversation] = useState('mentor-ananya');
  const [draft, setDraft] = useState('');
  const [notice, setNotice] = useState('');
  const [requested, setRequested] = useState(() => {
    try { return JSON.parse(localStorage.getItem('studenthub_interest') || '[]'); } catch { return []; }
  });
  const cities = ['All locations', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Remote'];
  const skillQuery = skillSearch.trim().toLowerCase();
  const opportunityQuery = opportunitySearch.trim().toLowerCase();
  const filteredProfiles = useMemo(() => skillProfiles.filter(profile =>
    (skillCity === 'All locations' || profile.city === skillCity || (skillCity === 'Remote' && /remote/i.test(profile.mode))) &&
    (skillLevel === 'All levels' || profile.level === skillLevel) &&
    (!skillQuery || [profile.name, profile.headline, profile.city, profile.area, ...profile.skills].join(' ').toLowerCase().includes(skillQuery))
  ), [skillCity, skillLevel, skillQuery]);
  const filteredOpportunities = useMemo(() => communityOpportunities.filter(post =>
    (opportunityCity === 'All locations' || post.city === opportunityCity || (opportunityCity === 'Remote' && post.mode === 'Remote')) &&
    (opportunityType === 'All types' || post.type === opportunityType) &&
    (!opportunityQuery || [post.title, post.company, post.city, post.area, ...post.skills].join(' ').toLowerCase().includes(opportunityQuery))
  ), [opportunityCity, opportunityType, opportunityQuery]);
  const currentConversation = conversations.find(item => item.id === selectedConversation) || conversations[0];
  const openConversation = id => {
    const profile = skillProfiles.find(item => item.id === id);
    if (profile && !conversations.some(item => item.id === id)) {
      setConversations(previous => [...previous, { id, name: profile.name, initials: profile.initials, headline: profile.headline, lastMessage: 'Start a conversation', unread: 0, messages: [] }]);
    }
    setSelectedConversation(id);
    setNotice('');
    onNavigate('/messages/' + id);
  };

  useEffect(() => { try { localStorage.setItem('studenthub_messages', JSON.stringify(conversations)); } catch {} }, [conversations]);
  useEffect(() => { try { localStorage.setItem('studenthub_interest', JSON.stringify(requested)); } catch {} }, [requested]);
  useEffect(() => { try { localStorage.setItem('studenthub_opportunities', JSON.stringify(communityOpportunities)); } catch {} }, [communityOpportunities]);
  useEffect(() => {
    const parts = path.split('?')[0].split('/').filter(Boolean);
    if (parts[0] === 'messages' && parts[1] && conversations.some(item => item.id === parts[1])) setSelectedConversation(parts[1]);
  }, [path, conversations]);

  const sendMessage = event => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !currentConversation) return;
    setConversations(previous => previous.map(item => item.id !== currentConversation.id ? item : {
      ...item,
      lastMessage: text,
      messages: [...item.messages, { id: 'local-' + Date.now(), from: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
    }));
    setDraft('');
    setNotice('Demo message saved in this browser only. Secure delivery requires the messaging API.');
  };
  const createOpportunity = event => {
    event.preventDefault();
    if (!newPost.title.trim() || !newPost.company.trim()) return;
    const post = {
      id: 'community-' + Date.now(),
      title: newPost.title.trim(),
      company: newPost.company.trim(),
      city: newPost.city,
      area: newPost.city === 'Remote' ? 'Remote' : 'Community listing',
      mode: newPost.mode,
      type: newPost.type,
      compensation: newPost.compensation.trim() || 'Details on request',
      skills: newPost.skills.split(',').map(skill => skill.trim()).filter(Boolean).slice(0, 8),
      posted: 'Just now',
      description: newPost.description.trim() || 'Contact the publisher to learn more about this opportunity.',
      posterId: 'student-rohan'
    };
    setCommunityOpportunities(previous => [post, ...previous]);
    setShowPostForm(false);
    setNewPost({ title: '', company: '', city: 'Bengaluru', mode: 'Hybrid', type: 'Internship', compensation: '', skills: '', description: '' });
    setNotice('Your demo listing has been added to this browser. Publishing publicly requires the backend.');
  };
  const registerInterest = id => {
    setRequested(previous => previous.includes(id) ? previous : [...previous, id]);
    setNotice('Interest saved in this demo. No application or message was sent to the publisher.');
  };

  if (active === 'skill-registry') return <section className="network-page">
    <PageHeading eyebrow="FIND YOUR PEOPLE" title="Location-wise skill registry" description="Discover learners, mentors, and collaborators by skills and the places they can work or connect." count={filteredProfiles.length}/>
    <div className="network-toolbar"><label className="network-search"><Search size={17}/><input value={skillSearch} onChange={e => setSkillSearch(e.target.value)} placeholder="Search skills, people, or areas..." /></label><FilterSelect label="Location" value={skillCity} onChange={setSkillCity} options={cities}/><FilterSelect label="Proficiency" value={skillLevel} onChange={setSkillLevel} options={['All levels','Beginner','Intermediate','Advanced']}/></div>
    <div className="network-summary"><Users size={17}/><span>Browse demo profiles across <b>Bengaluru, Hyderabad, Chennai, Pune</b> and remote.</span><span className="privacy-note">Profile visibility is opt-in in the planned production version.</span></div>
    <div className="skill-profile-grid">{filteredProfiles.map(profile => <article className="hub-card skill-profile-card" key={profile.id}><div className="skill-profile-top"><div className="avatar skill-avatar">{profile.initials}</div><span className="level-pill">{profile.level}</span></div><h3>{profile.name} <BadgeCheck size={14} className="demo-badge" aria-label="Demo profile"/></h3><p className="skill-headline">{profile.headline}</p><div className="skill-location"><MapPin size={14}/>{profile.area}, {profile.city}</div><p className="skill-bio">{profile.bio}</p><div className="tag-row">{profile.skills.map(skill => <span className="hub-tag" key={skill}>{skill}</span>)}</div><div className="skill-availability"><span className="availability-dot"/>{profile.availability}</div><button className="button-secondary full-button" onClick={() => openConversation(profile.id)}><MessageSquare size={15}/> Message profile</button></article>)}</div>
    {!filteredProfiles.length && <div className="empty-state"><h3>No matching profiles</h3><p>Try a different skill, location, or proficiency filter.</p></div>}
  </section>;

  if (active === 'opportunities') return <section className="network-page">
    <div className="network-board-heading"><PageHeading eyebrow="MAKE YOUR NEXT MOVE" title="Opportunity board" description="Find jobs, internships, paid projects, and collaborations near you or across remote teams." count={filteredOpportunities.length}/><button className="button-primary post-opportunity-button" onClick={() => setShowPostForm(value => !value)}><Plus size={15}/>{showPostForm ? 'Close form' : 'Post an opportunity'}</button></div>
    {showPostForm && <form className="opportunity-create-form" onSubmit={createOpportunity}><div className="opportunity-form-heading"><b>Create a community listing</b><span>Demo only · saved to this browser</span></div><div className="opportunity-form-grid"><label>Opportunity title<input required maxLength={100} value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} placeholder="e.g. Junior UI Developer"/></label><label>Organization / team<input required maxLength={100} value={newPost.company} onChange={e => setNewPost({ ...newPost, company: e.target.value })} placeholder="e.g. Community project team"/></label><label>Location<select value={newPost.city} onChange={e => setNewPost({ ...newPost, city: e.target.value })}>{['Bengaluru','Hyderabad','Chennai','Pune','Remote'].map(city => <option key={city}>{city}</option>)}</select></label><label>Work mode<select value={newPost.mode} onChange={e => setNewPost({ ...newPost, mode: e.target.value })}>{['On-site','Hybrid','Remote'].map(mode => <option key={mode}>{mode}</option>)}</select></label><label>Type<select value={newPost.type} onChange={e => setNewPost({ ...newPost, type: e.target.value })}>{['Internship','Full-time','Freelance','Project'].map(type => <option key={type}>{type}</option>)}</select></label><label>Compensation<input maxLength={80} value={newPost.compensation} onChange={e => setNewPost({ ...newPost, compensation: e.target.value })} placeholder="e.g. ₹25,000/month or unpaid"/></label><label className="opportunity-form-wide">Required skills<input maxLength={200} value={newPost.skills} onChange={e => setNewPost({ ...newPost, skills: e.target.value })} placeholder="React, JavaScript, CSS"/></label><label className="opportunity-form-wide">Description<textarea maxLength={600} rows={3} value={newPost.description} onChange={e => setNewPost({ ...newPost, description: e.target.value })} placeholder="What will the person work on?"/></label></div><button className="button-primary" type="submit"><Plus size={15}/> Add demo listing</button></form>}
    {notice && <div className="demo-notice"><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Dismiss"><span>×</span></button></div>}
    <div className="network-toolbar"><label className="network-search"><Search size={17}/><input value={opportunitySearch} onChange={e => setOpportunitySearch(e.target.value)} placeholder="Search role, organization, or skill..." /></label><FilterSelect label="Location" value={opportunityCity} onChange={setOpportunityCity} options={cities}/><FilterSelect label="Opportunity" value={opportunityType} onChange={setOpportunityType} options={['All types','Internship','Full-time','Freelance','Project']}/></div>
    <div className="opportunity-list">{filteredOpportunities.map(post => <article className="opportunity-card" key={post.id}><div className="opportunity-mark"><BriefcaseBusiness size={21}/></div><div className="opportunity-main"><div className="opportunity-meta"><span className="opportunity-type">{post.type}</span><span>Posted {post.posted}</span></div><h3>{post.title}</h3><div className="opportunity-company">{post.company}</div><p>{post.description}</p><div className="opportunity-details"><span><MapPin size={14}/>{post.area}, {post.city}</span><span><Clock3 size={14}/>{post.mode}</span><b>{post.compensation}</b></div><div className="tag-row">{post.skills.map(skill => <span className="hub-tag" key={skill}>{skill}</span>)}</div></div><div className="opportunity-actions"><button className={requested.includes(post.id) ? 'button-primary' : 'button-secondary'} onClick={() => registerInterest(post.id)}>{requested.includes(post.id) ? 'Interest saved' : 'I’m interested'} <ArrowRight size={14}/></button><button className="text-action" onClick={() => openConversation(post.posterId)}><MessageSquare size={14}/> Message publisher</button></div></article>)}</div>
    {!filteredOpportunities.length && <div className="empty-state"><h3>No opportunities match</h3><p>Try another location, opportunity type, or keyword.</p></div>}
    <div className="network-disclaimer">Demo listings only. Employer verification, moderation, applications, and closing dates will be enforced through backend services.</div>
  </section>;

  if (active === 'messages') return <section className="network-page">
    <PageHeading eyebrow="KEEP THE CONVERSATION GOING" title="Messages" description="Connect with learners, mentors, and opportunity publishers."/>
    <div className="messaging-notice"><MessageSquare size={16}/><span>Demo inbox · messages are stored in this browser and are not delivered to other users.</span></div>
    <div className="messaging-layout"><aside className="conversation-list"><div className="conversation-list-heading"><b>Inbox</b><span>{conversations.length}</span></div>{conversations.map(item => <button key={item.id} className={'conversation-item ' + (item.id === currentConversation?.id ? 'selected' : '')} onClick={() => {setSelectedConversation(item.id); setNotice('');}}><span className="avatar conversation-avatar">{item.initials}</span><span className="conversation-preview"><b>{item.name}</b><small>{item.lastMessage}</small></span>{item.unread > 0 && <span className="unread-dot"/>}</button>)}</aside>
      <section className="conversation-panel">{currentConversation ? <><header className="conversation-header"><span className="avatar conversation-avatar">{currentConversation.initials}</span><div><b>{currentConversation.name}</b><small>{currentConversation.headline}</small></div><span className="demo-status">Demo</span></header><div className="message-thread">{currentConversation.messages.map(message => <div className={'message-bubble-row ' + (message.from === 'me' ? 'mine' : '')} key={message.id}><div className="message-bubble"><p>{message.text}</p><small>{message.time}</small></div></div>)}</div><form className="message-composer" onSubmit={sendMessage}><input aria-label="Write a message" value={draft} onChange={e => setDraft(e.target.value)} placeholder="Write a message..." maxLength={2000}/><button className="button-primary" type="submit" disabled={!draft.trim()} aria-label="Send message"><Send size={16}/> Send</button></form>{notice && <p className="message-inline-notice">{notice}</p>}</> : <div className="empty-state"><h3>Your conversations will appear here</h3></div>}</section></div>
    <div className="network-disclaimer">Production messaging should add authentication, server-side authorization, abuse reporting, rate limits, retention controls, and secure transport.</div>
  </section>;

  return null;
}
