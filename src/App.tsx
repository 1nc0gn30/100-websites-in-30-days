/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, 
  List, 
  Calendar, 
  TrendingUp, 
  ExternalLink, 
  Twitter, 
  Linkedin, 
  Instagram,
  Cloud, 
  ArrowRight,
  Globe,
  Terminal,
  Code2,
  Clock,
  Info,
  BookOpen,
  Lock,
  Server,
  Cpu,
  Sparkles,
  BrainCircuit,
  Search,
  Filter,
  Loader2,
  ImageOff,
  Mail,
  MessageSquare,
  ClipboardCheck,
  LifeBuoy,
  Send,
  Menu,
  X
} from 'lucide-react';
import configData from './challenge-config.json';
import AboutPage from './components/AboutPage';
import ArticlePage from './components/ArticlePage';
import ChallengeCTA from './components/ChallengeCTA';
import { buttonVariants } from './components/ui/button';
import { Card } from './components/ui/card';
import { Logo } from './components/Logo';

interface Project {
  id: number;
  title: string;
  date: string;
  url: string;
  description: string;
  tags: string[];
  thumbnail: string;
}

interface SocialPost {
  platform: string;
  url: string;
  content: string;
  date: string;
}

interface ResourceItem {
  category: 'The Engine & Environment' | 'The High-Velocity Stack' | 'AI & Data';
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  link: string;
  summary: string;
  start: string;
}

function PreviewImage({
  src,
  alt,
  link,
  wrapperClassName,
  imageClassName
}: {
  src: string;
  alt: string;
  link: string;
  wrapperClassName: string;
  imageClassName: string;
}) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    setState('loading');
  }, [src]);

  return (
    <div className={`relative ${wrapperClassName}`}>
      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          className={`${imageClassName} transition-opacity duration-300 ${state === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      )}

      {state === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#F8F9FA] text-google-gray">
          <Loader2 size={18} className="animate-spin text-google-blue" />
          <span className="text-xs font-medium">Loading preview...</span>
        </div>
      )}

      {state === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#F1F3F4] text-google-gray p-3 text-center">
          <ImageOff size={18} className="text-[#9AA0A6]" />
          <span className="text-xs font-medium">Preview unavailable</span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-google-blue hover:underline"
          >
            Open website
          </a>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'journey' | 'gallery' | 'social' | 'about' | 'article' | 'resources' | 'contact'>('journey');
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [galleryQuery, setGalleryQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    botField: '',
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const tabToPath: Record<typeof activeTab, string> = {
    journey: '/',
    gallery: '/gallery',
    social: '/feed',
    about: '/about',
    article: '/about/article',
    resources: '/resources',
    contact: '/contact',
  };

  const pathToTab = (pathname: string): typeof activeTab => {
    const normalized = pathname.replace(/\/+$/, '') || '/';
    const lookup: Record<string, typeof activeTab> = {
      '/': 'journey',
      '/gallery': 'gallery',
      '/feed': 'social',
      '/about': 'about',
      '/about/article': 'article',
      '/resources': 'resources',
      '/contact': 'contact',
    };
    return lookup[normalized] ?? 'journey';
  };

  const navigateToTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    const nextPath = tabToPath[tab];
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  useEffect(() => {
    setActiveTab(pathToTab(window.location.pathname));
    const onPopState = () => {
      setActiveTab(pathToTab(window.location.pathname));
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    (window as any).setActiveTab = navigateToTab;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const { challenge, projects, socialPosts } = configData;
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);
  
  const isChallengeEnded = currentTime >= endDate;
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const currentDay = Math.max(0, Math.min(totalDays, Math.ceil((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))));
  
  const progressPercent = (projects.length / challenge.targetCount) * 100;
  const timePercent = (currentDay / totalDays) * 100;
  const velocityPerDay = (projects.length / (currentDay || 1)).toFixed(1);
  const daysRemaining = Math.max(totalDays - currentDay, 0);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [projects]);

  const availableTags = useMemo(() => {
    const unique = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => unique.add(t)));
    return Array.from(unique).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return sortedProjects.filter(p => 
      (activeTag === 'all' || p.tags.includes(activeTag)) &&
      (p.title.toLowerCase().includes(galleryQuery.toLowerCase()) || 
       p.description.toLowerCase().includes(galleryQuery.toLowerCase()))
    );
  }, [sortedProjects, activeTag, galleryQuery]);

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(value));

  useEffect(() => {
    const seoByTab: Record<typeof activeTab, { title: string; description: string; path: string }> = {
      journey: {
        title: '100 Websites in 30 Days | Neal Frazier Challenge Tracker',
        description:
          'Live sprint dashboard showing progress, shipped websites, and daily velocity for Neal Frazier’s 100 websites challenge.',
        path: '/',
      },
      gallery: {
        title: 'Project Gallery | 100 Websites in 30 Days',
        description:
          'Browse every shipped site from the 100 Websites in 30 Days sprint, with links, stack tags, and launch dates.',
        path: '/gallery',
      },
      social: {
        title: 'Build Feed | 100 Websites in 30 Days',
        description:
          'Raw social updates and shipping notes from the challenge, including wins, friction, and momentum logs.',
        path: '/feed',
      },
      about: {
        title: 'About the Challenge | Neal Frazier',
        description:
          'Background, mission, and systems behind the 100 Websites in 30 Days challenge by Neal Frazier.',
        path: '/about',
      },
      article: {
        title: '30-Day Journal | 100 Websites in 30 Days',
        description:
          'Long-form day-by-day journal covering execution, decisions, and lessons learned during the 30-day sprint.',
        path: '/about/article',
      },
      resources: {
        title: "Builder's Toolkit | 100 Websites in 30 Days",
        description:
          'The deployment, frontend, and AI tools used to sustain high-velocity website shipping.',
        path: '/resources',
      },
      contact: {
        title: 'Contact | 100 Websites in 30 Days',
        description: 'Connect with Neal Frazier about challenge work, systems, and collaborations.',
        path: '/contact',
      },
    };

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let tag = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const active = seoByTab[activeTab];
    const canonicalUrl = `https://100WebsitesIn30Days.nealfrazier.tech${active.path === '/' ? '/' : active.path}`;

    document.title = active.title;
    setMeta('description', active.description);
    setMeta('og:title', active.title, 'property');
    setMeta('og:description', active.description, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('twitter:title', active.title);
    setMeta('twitter:description', active.description);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [activeTab]);

  const primaryTabs = ['journey', 'gallery', 'social', 'about', 'article', 'resources', 'contact'] as const;
  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/nealfrazier', icon: Linkedin },
    { label: 'Instagram', href: 'https://instagram.com/nealfraziertech', icon: Instagram },
    { label: 'X', href: 'https://x.com/nealfraziertech', icon: Twitter },
    { label: 'AI Shippers', href: 'https://aishippers.netlify.app/members/neal-frazier', icon: Cloud },
    { label: 'Bluesky', href: 'https://bsky.app/profile/nealfraziertech.bsky.social', icon: Globe },
  ] as const;

  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus('sending');

    try {
      const payload = new URLSearchParams({
        'form-name': 'contact',
        name: contactForm.name,
        email: contactForm.email,
        company: contactForm.company,
        message: contactForm.message,
        'bot-field': contactForm.botField,
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setContactStatus('success');
      setContactForm({
        name: '',
        email: '',
        company: '',
        message: '',
        botField: '',
      });
    } catch (error) {
      setContactStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#3C4043] font-sans selection:bg-google-blue/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/92 backdrop-blur-md border-b border-[#DADCE0] px-4 md:px-8 min-h-16 py-2 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group shrink-0" 
          onClick={() => navigateToTab('journey')}
        >
          <Logo showTitle />
        </div>

        <div className="hidden lg:flex items-center gap-1">
          {primaryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => navigateToTab(tab)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all border ${
                activeTab === tab 
                ? 'text-google-blue border-google-blue/25 bg-google-blue/8' 
                : 'text-google-gray border-transparent hover:border-[#DADCE0] hover:bg-[#F8F9FA] hover:text-google-black'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <button 
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-4 pb-8 lg:hidden"
          >
            <div className="flex flex-col gap-2 max-w-md mx-auto">
              {primaryTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    navigateToTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-all ${
                    activeTab === tab 
                    ? 'text-google-blue bg-google-blue/10 border border-google-blue/20' 
                    : 'text-google-gray hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'journey' && (
            <motion.section
              key="journey"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-[#DADCE0] bg-white p-8 md:p-12 mb-10 shadow-[0_16px_48px_rgba(60,64,67,0.14)]">
                <div className="absolute -top-12 -left-10 w-56 h-56 bg-google-blue/15 blur-3xl rounded-full" />
                <div className="absolute top-12 right-16 w-44 h-44 bg-google-red/15 blur-3xl rounded-full" />
                <div className="absolute -bottom-16 right-4 w-56 h-56 bg-google-green/15 blur-3xl rounded-full" />
                <div className="absolute bottom-2 left-20 w-36 h-36 bg-google-yellow/20 blur-3xl rounded-full" />
                <div className="relative space-y-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#DADCE0] bg-[#F8F9FA] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-google-gray">
                    <Globe size={14} />
                    Build In Public Challenge
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#202124] leading-tight">
                    <span className="text-google-blue">100</span>{' '}
                    <span className="text-google-red">Websites</span>{' '}
                    <span className="text-google-yellow">in</span>{' '}
                    <span className="text-google-green">30 Days</span>
                  </h1>
                  <p className="text-base md:text-lg text-google-gray max-w-3xl leading-relaxed">
                    A live shipping sprint and public proof-of-work log. Every build is launched, documented, and indexed as this challenge moves toward 100 shipped websites.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-google-blue/20 bg-google-blue/5 px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-google-blue">Challenge Window</p>
                      <p className="text-sm text-[#202124] font-medium">{formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}</p>
                    </div>
                    <div className="rounded-2xl border border-google-red/20 bg-google-red/5 px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-google-red">Velocity Signal</p>
                      <p className="text-sm text-[#202124] font-medium">{velocityPerDay} launches/day</p>
                    </div>
                    <div className="rounded-2xl border border-google-green/20 bg-google-green/5 px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-google-green">Runway Remaining</p>
                      <p className="text-sm text-[#202124] font-medium">{daysRemaining} day{daysRemaining === 1 ? '' : 's'} left</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="google-card p-6 flex flex-col items-center text-center space-y-2">
                  <div className="p-3 rounded-full bg-google-blue/10 text-google-blue mb-2">
                    <LayoutGrid size={24} />
                  </div>
                  <span className="text-sm font-medium text-google-gray uppercase tracking-wider">Shipped</span>
                  <div className="text-4xl font-bold">{projects.length}<span className="text-google-gray text-xl ml-1">/100</span></div>
                </Card>

                <Card className="google-card p-6 flex flex-col items-center text-center space-y-2">
                  <div className="p-3 rounded-full bg-google-green/10 text-google-green mb-2">
                    <Calendar size={24} />
                  </div>
                  <span className="text-sm font-medium text-google-gray uppercase tracking-wider">Current Day</span>
                  <div className="text-4xl font-bold">{currentDay}<span className="text-google-gray text-xl ml-1">/ {totalDays}</span></div>
                </Card>

                <Card className="google-card p-6 flex flex-col items-center text-center space-y-2">
                  <div className="p-3 rounded-full bg-google-yellow/10 text-google-yellow mb-2">
                    <TrendingUp size={24} />
                  </div>
                  <span className="text-sm font-medium text-google-gray uppercase tracking-wider">Velocity</span>
                  <div className="text-4xl font-bold">{velocityPerDay}<span className="text-google-gray text-xl ml-1">/day</span></div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-google-gray">Overall Progress</h3>
                      <span className="text-2xl font-bold text-google-blue">{progressPercent.toFixed(0)}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-[#DADCE0]">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${progressPercent}%` }} 
                        className="h-full bg-google-blue" 
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-google-gray">Time Elapsed</h3>
                      <span className="text-2xl font-bold text-google-green">{timePercent.toFixed(0)}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-[#DADCE0]">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${timePercent}%` }} 
                        className="h-full bg-google-green" 
                      />
                    </div>
                  </div>

                  <div className="google-card p-6 rounded-2xl border border-[#DADCE0] bg-white space-y-4">
                    <div className="flex items-center gap-2 text-google-blue">
                      <Sparkles size={20} />
                      <span className="font-bold uppercase tracking-wider text-xs">Current Focus</span>
                    </div>
                    <p className="text-google-gray leading-relaxed">
                      Focusing on <span className="text-google-black font-medium">performance, accessibility, and clean composition</span>. Using a streamlined stack of React, Tailwind, and Vite to keep the feedback loop tight.
                    </p>
                    <button 
                      onClick={() => navigateToTab('gallery')}
                      className={`w-full py-3 rounded-lg font-medium transition-all ${buttonVariants({ variant: 'default' })}`}
                    >
                      Browse Shipped Work <ArrowRight size={16} className="inline ml-2" />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Recent Shipments</h3>
                    <button 
                      onClick={() => navigateToTab('gallery')} 
                      className="text-sm text-google-blue hover:underline font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {sortedProjects.slice(0, 5).map((project) => (
                      <Card key={project.id} className="google-card p-4 flex gap-4 hover:border-google-blue transition-colors cursor-pointer group" onClick={() => navigateToTab('gallery')}>
                        <PreviewImage 
                          src={project.thumbnail} 
                          alt={project.title} 
                          link={project.url} 
                          wrapperClassName="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0" 
                          imageClassName="w-full h-full object-cover" 
                        />
                        <div className="flex-grow space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium group-hover:text-google-blue transition-colors">{project.title}</h4>
                            <span className="text-xs text-google-gray font-mono">{formatDate(project.date)}</span>
                          </div>
                          <p className="text-sm text-google-gray line-clamp-2">{project.description}</p>
                          <div className="flex gap-2 pt-1">
                            {project.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-google-gray font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}
          {activeTab === 'gallery' && (
            <motion.section
              key="gallery"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-google-black">Project Gallery</h1>
                <p className="text-google-gray max-w-2xl mx-auto">
                  Every website shipped during the 100-website sprint. From tiny utilities to full-scale landing pages.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-google-gray" />
                  <input 
                    type="text" 
                    placeholder="Search projects..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#DADCE0] focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all"
                    value={galleryQuery}
                    onChange={(e) => setGalleryQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                  <button 
                    onClick={() => setActiveTag('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                      activeTag === 'all' ? 'bg-google-blue text-white' : 'bg-gray-100 text-google-gray hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {availableTags.map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                        activeTag === tag ? 'bg-google-blue text-white' : 'bg-gray-100 text-google-gray hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="google-card group overflow-hidden flex flex-col h-full">
                    <div className="aspect-video relative overflow-hidden">
                      <PreviewImage 
                        src={project.thumbnail} 
                        alt={project.title} 
                        link={project.url} 
                        wrapperClassName="w-full h-full" 
                        imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                    </div>
                    <div className="p-5 flex-grow space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-google-black group-hover:text-google-blue transition-colors">{project.title}</h3>
                        <span className="text-[10px] font-mono text-google-gray">{formatDate(project.date)}</span>
                      </div>
                      <p className="text-sm text-google-gray line-clamp-3 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-google-gray font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5 pt-0">
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`w-full py-2 rounded-lg font-medium text-center block transition-all ${buttonVariants({ variant: 'outline', size: 'sm' })}`}
                      >
                        Visit Site <ExternalLink size={14} className="inline ml-1" />
                      </a>
                    </div>
                  </Card>
                ))}
                {filteredProjects.length === 0 && (
                  <div className="col-span-full py-20 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-google-gray">
                      <Search size={32} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">No projects found</h3>
                      <p className="text-google-gray">Try adjusting your search or filter criteria.</p>
                    </div>
                    <button 
                      onClick={() => { setGalleryQuery(''); setActiveTag('all'); }}
                      className="text-google-blue font-medium hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </motion.section>
          )}
          {activeTab === 'social' && (
            <motion.section
              key="social"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-google-black">Build Feed</h1>
                <p className="text-google-gray max-w-2xl mx-auto">
                  The raw stream of updates, struggles, and wins from the 100 Websites challenge.
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                {socialPosts.map((post, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="google-card p-6 rounded-2xl border border-[#DADCE0] bg-white space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          post.platform === 'twitter' ? 'bg-sky-100 text-sky-500' : 
                          post.platform === 'linkedin' ? 'bg-blue-100 text-blue-600' : 
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {post.platform === 'twitter' ? <Twitter size={18} /> : <Linkedin size={18} />}
                        </div>
                        <span className="text-sm font-bold text-google-black capitalize">{post.platform}</span>
                      </div>
                      <span className="text-xs text-google-gray font-mono">{post.date}</span>
                    </div>
                    <p className="text-google-gray leading-relaxed">{post.content}</p>
                    <a 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-google-blue hover:underline font-medium inline-flex items-center gap-1"
                    >
                      View original post <ExternalLink size={14} />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
          {activeTab === 'resources' && (
            <motion.section
              key="resources"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <div className="text-center space-y-2 mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-google-black">Builder's Toolkit</h1>
                <p className="text-google-gray max-w-3xl mx-auto">
                  The exact stack and resources used to maintain a high-velocity shipping cadence. No gatekeeping, just tools that work.
                </p>
              </div>

              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="google-card p-6 rounded-2xl border border-[#DADCE0] bg-white space-y-4">
                    <div className="p-3 rounded-xl bg-google-blue/10 text-google-blue w-fit">
                      <Server size={24} />
                    </div>
                    <h3 className="font-bold text-lg">Deployment</h3>
                    <p className="text-sm text-google-gray leading-relaxed">
                      Using Netlify for lightning-fast deployments and automatic preview environments for every commit.
                    </p>
                  </div>
                  <div className="google-card p-6 rounded-2xl border border-[#DADCE0] bg-white space-y-4">
                    <div className="p-3 rounded-xl bg-google-green/10 text-google-green w-fit">
                      <Cpu size={24} />
                    </div>
                    <h3 className="font-bold text-lg">Runtime</h3>
                    <p className="text-sm text-google-gray leading-relaxed">
                      React + Vite for the fastest possible dev experience and optimized production builds.
                    </p>
                  </div>
                  <div className="google-card p-6 rounded-2xl border border-[#DADCE0] bg-white space-y-4">
                    <div className="p-3 rounded-xl bg-google-yellow/10 text-google-yellow w-fit">
                      <BrainCircuit size={24} />
                    </div>
                    <h3 className="font-bold text-lg">AI Orchestration</h3>
                    <p className="text-sm text-google-gray leading-relaxed">
                      Leveraging LLMs for scaffolding, rapid prototyping, and solving the "blank page" problem.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-medium">Builder Resources</h3>
                    <p className="text-google-gray max-w-3xl mx-auto">
                      Everything listed here is open and accessible. Use these docs to start small, then scale with confidence. No gatekeeping.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {(Object.entries(groupedResources) as Array<[ResourceItem['category'], ResourceItem[]]>).map(([category, items]) => (
                      <section key={category} className="space-y-4">
                        <h4 className="text-sm font-mono uppercase tracking-wider text-google-gray">{category}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {items.map((resource) => (
                            <article key={resource.name} className="google-card p-5 space-y-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-gray-50">
                                    <resource.icon size={18} className={resource.color} />
                                  </div>
                                  <h5 className="font-medium">{resource.name}</h5>
                                </div>
                                <a
                                  href={resource.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`${buttonVariants({ variant: 'outline', size: 'sm' })}`}
                                >
                                  Docs <ExternalLink size={14} />
                                </a>
                              </div>
                              <p className="text-sm text-google-gray">{resource.summary}</p>
                              <div className="rounded-lg border border-[#E8EAED] bg-[#F8F9FA] px-3 py-2">
                                <p className="text-xs text-google-gray">
                                  <span className="font-semibold text-[#3C4043]">Getting started:</span> {resource.start}
                                </p>
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>

                  <div className="google-card p-6 bg-google-blue/5 border-google-blue/20">
                    <div className="flex items-center gap-2 mb-2 text-google-blue">
                      <Lock size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider">Practical Guidance</span>
                    </div>
                    <p className="text-sm text-google-gray leading-relaxed">
                      If a tool feels advanced, start with its quickstart and copy one small pattern. Ship one tiny improvement, then repeat. The fastest way to learn is building in public with clear notes.
                    </p>
                  </div>

                  <ChallengeCTA
                    title="Take These Tools And Run The Challenge"
                    description="You now have the stack. Turn it into proof by committing to a shipping cadence and documenting your results in public."
                    primaryLabel="Commit To The Challenge"
                    secondaryLabel="See The Journey"
                    onPrimary={() => navigateToTab('contact')}
                    onSecondary={() => navigateToTab('journey')}
                  />
                </div>
              </div>
            </motion.section>
          )}
          {activeTab === 'about' && (
            <motion.section
              key="about"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <AboutPage onBack={() => navigateToTab('journey')} />
            </motion.section>
          )}
          {activeTab === 'article' && (
            <motion.section
              key="article"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ArticlePage onBack={() => navigateToTab('about')} />
            </motion.section>
          )}
          {activeTab === 'contact' && (
            <motion.section
              key="contact"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center space-y-3 mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-google-black">Contact</h1>
                <p className="text-google-gray max-w-2xl mx-auto">
                  Send a message about the challenge, collabs, or shipping systems.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6">
                <Card className="google-card p-6 md:p-8">
                  <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={submitContact}
                    className="space-y-5"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <label>
                        Don’t fill this out if you're human:
                        <input
                          name="bot-field"
                          value={contactForm.botField}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, botField: e.target.value }))}
                        />
                      </label>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="text-sm font-medium text-google-gray">
                        Name
                        <input
                          required
                          type="text"
                          name="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                          className="mt-1.5 w-full rounded-lg border border-[#DADCE0] bg-white px-3 py-2.5 text-[#202124] focus:outline-none focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue"
                        />
                      </label>
                      <label className="text-sm font-medium text-google-gray">
                        Email
                        <input
                          required
                          type="email"
                          name="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                          className="mt-1.5 w-full rounded-lg border border-[#DADCE0] bg-white px-3 py-2.5 text-[#202124] focus:outline-none focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue"
                        />
                      </label>
                    </div>

                    <label className="text-sm font-medium text-google-gray block">
                      Company or Project (optional)
                      <input
                        type="text"
                        name="company"
                        value={contactForm.company}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, company: e.target.value }))}
                        className="mt-1.5 w-full rounded-lg border border-[#DADCE0] bg-white px-3 py-2.5 text-[#202124] focus:outline-none focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue"
                      />
                    </label>

                    <label className="text-sm font-medium text-google-gray block">
                      Message
                      <textarea
                        required
                        name="message"
                        rows={7}
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell me what you're building, timeline, and where you need help."
                        className="mt-1.5 w-full rounded-lg border border-[#DADCE0] bg-white px-3 py-2.5 text-[#202124] focus:outline-none focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue"
                      />
                    </label>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <p className="text-xs text-google-gray">
                        Response target: usually within 24-48 hours.
                      </p>
                      <button
                        type="submit"
                        disabled={contactStatus === 'sending'}
                        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${buttonVariants({ variant: 'default' })}`}
                      >
                        {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                        <Send size={16} />
                      </button>
                    </div>

                    {contactStatus === 'success' && (
                      <div className="rounded-lg border border-google-green/30 bg-google-green/10 px-3 py-2 text-sm text-[#1E8E3E]">
                        Message sent successfully.
                      </div>
                    )}

                    {contactStatus === 'error' && (
                      <div className="rounded-lg border border-google-red/30 bg-google-red/10 px-3 py-2 text-sm text-google-red">
                        Submission failed. Try again in a minute.
                      </div>
                    )}
                  </form>
                </Card>

                <div className="space-y-4">
                  <Card className="google-card p-5">
                    <div className="flex items-center gap-2 mb-2 text-google-blue">
                      <MessageSquare size={16} />
                      <h3 className="text-sm font-bold uppercase tracking-wider">Best For</h3>
                    </div>
                    <p className="text-sm text-google-gray">Build strategy, shipping systems, site rebuilds, AI workflows, and deployment cleanup.</p>
                  </Card>
                  <Card className="google-card p-5">
                    <div className="flex items-center gap-2 mb-2 text-google-green">
                      <ClipboardCheck size={16} />
                      <h3 className="text-sm font-bold uppercase tracking-wider">Include In Message</h3>
                    </div>
                    <p className="text-sm text-google-gray">Current stack, blocker, deadline, and what “done” looks like for your project.</p>
                  </Card>
                  <Card className="google-card p-5">
                    <div className="flex items-center gap-2 mb-2 text-google-red">
                      <LifeBuoy size={16} />
                      <h3 className="text-sm font-bold uppercase tracking-wider">Support Channels</h3>
                    </div>
                    <p className="text-sm text-google-gray">Use this form first. You can also reference links in the Build Feed and About sections for context.</p>
                  </Card>
                  <Card className="google-card p-5 bg-[#F8F9FA]">
                    <div className="flex items-center gap-2 mb-2 text-google-yellow">
                      <Mail size={16} />
                      <h3 className="text-sm font-bold uppercase tracking-wider">Response Time</h3>
                    </div>
                    <p className="text-sm text-google-gray">Typical reply within 24-48 hours. Complex requests may take longer if deep review is needed.</p>
                  </Card>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#DADCE0] bg-[#F8F9FA] px-4 py-10 md:px-8">
        <div className="max-w-7xl mx-auto rounded-3xl border border-[#E8EAED] bg-white p-5 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr_1fr] gap-6 md:gap-8">
            <section className="space-y-4">
              <div className="hidden sm:block">
                <Logo showTitle />
              </div>
              <div className="sm:hidden">
                <Logo showTitle={false} />
                <h3 className="mt-3 text-lg font-semibold text-google-black">100 Websites in 30 Days</h3>
              </div>
              <p className="text-sm leading-relaxed text-google-gray max-w-xl">
                Public build sprint documenting real launches, systems, and execution from idea to deployment.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DADCE0] bg-[#F8F9FA] px-3 py-1 text-xs font-medium text-google-gray">
                <span className="inline-block h-2 w-2 rounded-full bg-google-green" />
                Live challenge tracker
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-google-gray">Site Links</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                <button
                  onClick={() => navigateToTab('about')}
                  className="w-full text-left rounded-xl border border-[#E8EAED] px-3 py-2.5 text-sm font-medium text-google-gray transition-colors hover:border-google-blue/30 hover:text-google-blue hover:bg-google-blue/5"
                >
                  About Challenge
                </button>
                <button
                  onClick={() => navigateToTab('resources')}
                  className="w-full text-left rounded-xl border border-[#E8EAED] px-3 py-2.5 text-sm font-medium text-google-gray transition-colors hover:border-google-blue/30 hover:text-google-blue hover:bg-google-blue/5"
                >
                  Resources
                </button>
                <button
                  onClick={() => navigateToTab('article')}
                  className="w-full text-left rounded-xl border border-[#E8EAED] px-3 py-2.5 text-sm font-medium text-google-gray transition-colors hover:border-google-blue/30 hover:text-google-blue hover:bg-google-blue/5"
                >
                  Article
                </button>
                <button
                  onClick={() => navigateToTab('contact')}
                  className="w-full text-left rounded-xl border border-[#E8EAED] px-3 py-2.5 text-sm font-medium text-google-gray transition-colors hover:border-google-blue/30 hover:text-google-blue hover:bg-google-blue/5"
                >
                  Contact
                </button>
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-google-gray">Social</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#E8EAED] px-3 py-2.5 text-sm font-medium text-google-gray transition-colors hover:border-google-blue/30 hover:text-google-blue hover:bg-google-blue/5"
                  >
                    <link.icon size={15} />
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-6 border-t border-[#E8EAED] pt-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <p className="text-xs text-google-gray">© 2026 Neal Frazier. All rights reserved.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              className="text-xs font-medium text-google-gray hover:text-google-blue transition-colors text-left sm:text-right"
            >
              Back to top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

const groupedResources = {
  'The Engine & Environment': [
    {
      name: 'Vite',
      icon: Code2,
      color: 'text-google-blue',
      link: 'https://vitejs.dev/guide/',
      summary: 'Next-generation frontend tooling. Fast dev server, optimized builds.',
      start: 'npm create vite@latest'
    },
    {
      name: 'Netlify',
      icon: Cloud,
      color: 'text-google-green',
      link: 'https://docs.netlify.com/',
      summary: 'Modern web hosting and automation platform for rapid deployment.',
      start: 'netlify init'
    },
    {
      name: 'Hostinger',
      icon: Globe,
      color: 'text-google-red',
      link: 'https://www.hostinger.com/help',
      summary: 'Hosting platform and domain tooling for launches and production ops.',
      start: 'Set DNS + hosting plan, then map your domain'
    },
    {
      name: 'Parrot OS',
      icon: Terminal,
      color: 'text-google-yellow',
      link: 'https://parrotsec.org/docs/',
      summary: 'Security-focused Linux distribution for offensive/defensive workflows.',
      start: 'Read install docs and choose edition'
    },
    {
      name: 'Docker',
      icon: Server,
      color: 'text-google-blue',
      link: 'https://docs.docker.com/',
      summary: 'Container runtime and image tooling for consistent local/prod workflows.',
      start: 'Install Docker Engine/Desktop and run hello-world'
    },
    {
      name: 'Podman',
      icon: Cpu,
      color: 'text-google-green',
      link: 'https://docs.podman.io/',
      summary: 'Daemonless container tooling with Docker-compatible workflows.',
      start: 'Install Podman and run podman ps'
    },
  ],
  'The High-Velocity Stack': [
    {
      name: 'React',
      icon: Sparkles,
      color: 'text-google-blue',
      link: 'https://react.dev/',
      summary: 'The library for web interfaces. Component-driven architecture.',
      start: 'Read the Quick Start guide'
    },
    {
      name: 'Tailwind CSS',
      icon: LayoutGrid,
      color: 'text-google-yellow',
      link: 'https://tailwindcss.com/docs',
      summary: 'Utility-first CSS framework for rapid UI development.',
      start: 'npm install -D tailwindcss'
    },
    {
      name: 'Astro',
      icon: Globe,
      color: 'text-google-red',
      link: 'https://docs.astro.build/',
      summary: 'Content-heavy and hybrid websites with strong performance defaults.',
      start: 'npm create astro@latest'
    },
    {
      name: 'MUI',
      icon: LayoutGrid,
      color: 'text-google-green',
      link: 'https://mui.com/material-ui/getting-started/',
      summary: 'Production-ready React component system with strong accessibility support.',
      start: 'npm install @mui/material @emotion/react @emotion/styled'
    },
  ],
  'AI & Data': [
    {
      name: 'OpenAI API',
      icon: BrainCircuit,
      color: 'text-google-green',
      link: 'https://platform.openai.com/docs',
      summary: 'State-of-the-art LLMs for content generation and logic.',
      start: 'Create an API key in the dashboard'
    },
    {
      name: 'OpenCode',
      icon: Code2,
      color: 'text-google-blue',
      link: 'https://github.com/search?q=opencode&type=repositories',
      summary: 'Open-source coding workflows and tooling references.',
      start: 'Review active repos and clone the one that matches your workflow'
    },
    {
      name: 'OpenClaw',
      icon: Lock,
      color: 'text-google-red',
      link: 'https://github.com/search?q=openclaw&type=repositories',
      summary: 'Open-source security/automation ecosystem references.',
      start: 'Inspect maintained repositories and evaluate fit'
    },
    {
      name: 'Hermes',
      icon: BrainCircuit,
      color: 'text-google-yellow',
      link: 'https://ollama.com/library/hermes3',
      summary: 'Assistant model family often used in local and hybrid AI stacks.',
      start: 'Pull model in Ollama and run a baseline prompt'
    },
    {
      name: 'Ollama',
      icon: Cpu,
      color: 'text-google-green',
      link: 'https://ollama.com/',
      summary: 'Run local LLMs with a simple API and command-line interface.',
      start: 'Install Ollama and run: ollama run llama3'
    },
  ],
};
