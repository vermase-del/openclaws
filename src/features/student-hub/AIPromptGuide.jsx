import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BarChart3, BookOpen, Bookmark, BriefcaseBusiness,
  CalendarDays, Check, Code2, Copy, FileText, Layers, MessageCircle, Search,
  Sparkles, X
} from 'lucide-react';
import { promptAreas, promptGuides } from './promptGuideData';

const areaIcons = {
  learning: BookOpen,
  coding: Code2,
  projects: Layers,
  career: BriefcaseBusiness,
  interviews: MessageCircle,
  writing: FileText,
  research: BarChart3,
  productivity: CalendarDays
};

const readSaved = () => {
  try { return JSON.parse(localStorage.getItem('studenthub_ai_saved_prompts') || '[]'); }
  catch { return []; }
};

function AreaIcon({ area, size = 20 }) {
  const Icon = areaIcons[area] || Sparkles;
  return <Icon size={size} />;
}

function PromptCard({ prompt, area, saved, onOpen, onToggleSaved }) {
  return <article className="hub-card ai-prompt-card">
    <div className="ai-prompt-card-top"><span className={'ai-area-icon ai-' + area.accent}><AreaIcon area={area.id}/></span><button className={'icon-button save-button ' + (saved ? 'is-saved' : '')} onClick={() => onToggleSaved(prompt.id)} aria-label={saved ? 'Remove saved prompt' : 'Save prompt'} title={saved ? 'Remove saved prompt' : 'Save prompt'}><Bookmark size={16} fill={saved ? 'currentColor' : 'none'}/></button></div>
    <div className="ai-prompt-meta">{area.label}<span>·</span>{prompt.level}</div>
    <h3>{prompt.title}</h3><p>{prompt.summary}</p>
    <button className="text-action" onClick={() => onOpen(prompt.id)}>Customize prompt <ArrowRight size={15}/></button>
  </article>;
}

export default function AIPromptGuide() {
  const [query, setQuery] = useState('');
  const [activeArea, setActiveArea] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [savedIds, setSavedIds] = useState(readSaved);
  const [savedOnly, setSavedOnly] = useState(false);
  const [fieldValues, setFieldValues] = useState({});
  const [customPrompt, setCustomPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const selectedGuide = promptGuides.find(item => item.id === selectedId);
  const selectedArea = promptAreas.find(item => item.id === selectedGuide?.area);
  const filteredPrompts = useMemo(() => promptGuides.filter(item => {
    const areaMatch = activeArea === 'all' || item.area === activeArea;
    const savedMatch = !savedOnly || savedIds.includes(item.id);
    const area = promptAreas.find(candidate => candidate.id === item.area);
    const searchMatch = !query.trim() || [item.title, item.summary, item.level, area?.label, item.template].join(' ').toLowerCase().includes(query.trim().toLowerCase());
    return areaMatch && savedMatch && searchMatch;
  }), [activeArea, query, savedOnly, savedIds]);
  const generatedPrompt = selectedGuide ? selectedGuide.template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const field = selectedGuide.fields.find(item => item.key === key);
    return (fieldValues[key] || '').trim() || '[' + (field?.label || key) + ']';
  }) : '';
  const displayedPrompt = customPrompt || generatedPrompt;

  useEffect(() => {
    try { localStorage.setItem('studenthub_ai_saved_prompts', JSON.stringify(savedIds)); } catch {}
  }, [savedIds]);
  useEffect(() => {
    if (!selectedGuide) return;
    const defaults = Object.fromEntries(selectedGuide.fields.map(field => [field.key, '']));
    setFieldValues(defaults);
    setCustomPrompt('');
    setCopied(false);
  }, [selectedId]);

  const toggleSaved = id => setSavedIds(previous => previous.includes(id) ? previous.filter(value => value !== id) : [...previous, id]);
  const openPrompt = id => { setSelectedId(id); setCustomPrompt(''); setCopied(false); };
  const copyPrompt = async () => {
    const text = displayedPrompt.trim();
    if (!text) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const helper = document.createElement('textarea');
        helper.value = text;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        const ok = document.execCommand('copy');
        helper.remove();
        if (!ok) throw new Error('Copy command unavailable');
      }
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (selectedGuide && selectedArea) return <section className="ai-guide-page">
    <button className="ai-back-link" onClick={() => { setSelectedId(null); setCustomPrompt(''); setCopied(false); }}><ArrowLeft size={15}/> Back to prompt library</button>
    <div className="ai-detail-heading"><span className={'ai-area-icon ai-' + selectedArea.accent}><AreaIcon area={selectedArea.id} size={23}/></span><div><div className="ai-eyebrow">{selectedArea.label} <span>·</span> {selectedGuide.level}</div><h1>{selectedGuide.title}</h1><p>{selectedGuide.summary}</p></div></div>
    <div className="ai-builder-layout">
      <section className="ai-builder-panel"><div className="ai-panel-heading"><span className="ai-step">1</span><div><h2>Personalize the prompt</h2><p>Provide context so the AI response is more useful to you.</p></div></div>
        <div className="ai-prompt-fields">{selectedGuide.fields.map(field => <label key={field.key}>{field.label}<textarea rows={field.key === 'code' || field.key === 'notes' || field.key === 'experience' || field.key === 'data' ? 4 : 2} value={fieldValues[field.key] || ''} onChange={event => { setFieldValues(previous => ({ ...previous, [field.key]: event.target.value })); setCustomPrompt(''); setCopied(false); }} placeholder={field.placeholder}/></label>)}</div>
        <div className="ai-prompt-tip"><Sparkles size={16}/><p><b>Tip:</b> Add your actual constraints, examples, or attempts. Remove personal or confidential information before sending prompts to an external AI tool.</p></div>
      </section>
      <section className="ai-builder-panel ai-output-panel"><div className="ai-panel-heading"><span className="ai-step">2</span><div><h2>Your ready-to-use prompt</h2><p>Review it, make any final edits, then copy it into your preferred AI tool.</p></div></div>
        <textarea className="ai-generated-prompt" aria-label="Generated prompt" value={displayedPrompt} onChange={event => { setCustomPrompt(event.target.value); setCopied(false); }} rows={17}/>
        <div className="ai-output-actions"><button className="button-primary" onClick={copyPrompt}><Copy size={15}/>{copied ? 'Copied to clipboard' : 'Copy prompt'}</button><button className={'button-secondary ' + (savedIds.includes(selectedGuide.id) ? 'ai-saved-action' : '')} onClick={() => toggleSaved(selectedGuide.id)}><Bookmark size={15} fill={savedIds.includes(selectedGuide.id) ? 'currentColor' : 'none'}/>{savedIds.includes(selectedGuide.id) ? 'Saved' : 'Save prompt'}</button></div>
        <p className="ai-guide-disclaimer">{copied ? 'Prompt copied. Paste it into ChatGPT or another AI assistant.' : 'This guide prepares a prompt; it does not submit it to an AI model or generate an AI response.'}</p>
      </section>
    </div>
  </section>;

  return <section className="ai-guide-page">
    <div className="ai-guide-hero"><div className="ai-hero-orb"><Sparkles size={27}/></div><div className="ai-eyebrow">STUDENT HUB · AI TOOLKIT</div><h1>AI Prompt Guide</h1><p>Start with a proven prompt, add your context, and get more focused help from the AI tools you already use.</p><div className="ai-hero-stats"><span><b>{promptGuides.length}</b> ready-to-customize prompts</span><span><b>{promptAreas.length}</b> fixed learning areas</span><span><b>{savedIds.length}</b> saved by you</span></div></div>
    <div className="ai-guide-controls"><label className="ai-library-search"><Search size={17}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search prompts, skills, or use cases..."/>{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={15}/></button>}</label><button className={'button-secondary ai-saved-filter ' + (savedOnly ? 'selected' : '')} onClick={() => setSavedOnly(value => !value)}><Bookmark size={15} fill={savedOnly ? 'currentColor' : 'none'}/>{savedOnly ? 'Showing saved' : 'Saved prompts'}</button></div>
    <div className="ai-area-section"><div className="ai-section-title"><div><h2>Choose an area</h2><p>The guide uses a fixed category set to keep prompts organized and easy to discover.</p></div></div><div className="ai-area-grid"><button className={'ai-area-tile ' + (activeArea === 'all' ? 'active' : '')} onClick={() => setActiveArea('all')}><span className="ai-area-icon ai-neutral"><Sparkles size={19}/></span><b>All areas</b><small>{promptGuides.length} prompts</small></button>{promptAreas.map(area => { const count = promptGuides.filter(item => item.area === area.id).length; return <button key={area.id} className={'ai-area-tile ' + (activeArea === area.id ? 'active' : '')} onClick={() => setActiveArea(area.id)}><span className={'ai-area-icon ai-' + area.accent}><AreaIcon area={area.id}/></span><b>{area.label}</b><small>{count} prompts</small></button>; })}</div></div>
    <div className="ai-library-section"><div className="ai-section-title"><div><h2>{activeArea === 'all' ? 'Prompt library' : promptAreas.find(area => area.id === activeArea)?.label}</h2><p>{filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'prompts'} ready to customize</p></div></div>{filteredPrompts.length ? <div className="ai-prompt-grid">{filteredPrompts.map(prompt => <PromptCard key={prompt.id} prompt={prompt} area={promptAreas.find(area => area.id === prompt.area)} saved={savedIds.includes(prompt.id)} onOpen={openPrompt} onToggleSaved={toggleSaved}/>)}</div> : <div className="empty-state"><div className="empty-icon"><Search size={19}/></div><h3>No prompts found</h3><p>Try another search or switch to a different area.</p><button className="button-secondary" onClick={() => { setQuery(''); setActiveArea('all'); setSavedOnly(false); }}>Clear filters</button></div>}</div>
    <div className="ai-prompt-principle"><Sparkles size={19}/><div><b>A simple prompt formula</b><p>Tell the AI its role, give context, define the task, state constraints, and specify the output you want. Review important claims instead of assuming every answer is correct.</p></div></div>
  </section>;
}
