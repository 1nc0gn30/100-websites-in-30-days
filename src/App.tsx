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
  Cloud, 
  ChevronRight,
  ArrowRight,
  Globe,
  Code2,
  CheckCircle2,
  Clock,
  Info
} from 'lucide-react';
import configData from './challenge-config.json';
import AboutPage from './components/AboutPage';
import ArticlePage from './components/ArticlePage';

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

export default function App() {
  const [activeTab, setActiveTab] = useState<'journey' | 'gallery' | 'social' | 'about' | 'article'>('journey');
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Expose navigation to window for sub-components
  useEffect(() => {
    (window as any).setActiveTab = setActiveTab;

    // Load Twitter widgets script
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Update time every minute to keep calculations fresh
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

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [projects]);

  const stats = [
    { label: 'Projects Built', value: projects.length, target: challenge.targetCount, icon: Globe, color: 'text-google-blue' },
    { label: 'Days Elapsed', value: currentDay, target: totalDays, icon: Calendar, color: 'text-google-red' },
    { label: 'Daily Average', value: (projects.length / Math.max(1, currentDay)).toFixed(1), target: (challenge.targetCount / totalDays).toFixed(1), icon: TrendingUp, color: 'text-google-green' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Google-style Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#DADCE0] px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            <div className="w-2 h-2 rounded-full bg-google-blue" />
            <div className="w-2 h-2 rounded-full bg-google-red" />
            <div className="w-2 h-2 rounded-full bg-google-yellow" />
            <div className="w-2 h-2 rounded-full bg-google-green" />
          </div>
          <h1 className="text-xl font-medium text-[#5F6368] hidden sm:block">
            {challenge.title}
          </h1>
        </div>

        <nav className="flex items-center gap-1 md:gap-4">
          <button 
            onClick={() => setActiveTab('journey')}
            className={`google-button ${activeTab === 'journey' ? 'bg-[#E8F0FE] text-google-blue' : 'text-google-gray hover:bg-[#F1F3F4]'}`}
          >
            <List size={18} />
            <span className="hidden md:inline">Journey</span>
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`google-button ${activeTab === 'gallery' ? 'bg-[#E8F0FE] text-google-blue' : 'text-google-gray hover:bg-[#F1F3F4]'}`}
          >
            <LayoutGrid size={18} />
            <span className="hidden md:inline">Gallery</span>
          </button>
          <button 
            onClick={() => setActiveTab('social')}
            className={`google-button ${activeTab === 'social' ? 'bg-[#E8F0FE] text-google-blue' : 'text-google-gray hover:bg-[#F1F3F4]'}`}
          >
            <Twitter size={18} />
            <span className="hidden md:inline">Feed</span>
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`google-button ${activeTab === 'about' ? 'bg-[#E8F0FE] text-google-blue' : 'text-google-gray hover:bg-[#F1F3F4]'}`}
          >
            <Info size={18} />
            <span className="hidden md:inline">About</span>
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-google-blue flex items-center justify-center text-white font-bold text-sm">
            {projects.length}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            The Road to <span className="text-google-blue">100</span>
          </motion.h2>
          <p className="text-xl text-google-gray max-w-2xl mx-auto">
            Building the future, one website at a time. A 30-day sprint of creativity and code.
          </p>
        </section>

        {/* Stats Section */}
        <section className="space-y-4">
          {/* Stat Selector (Mobile Only) */}
          <div className="flex md:hidden bg-[#F1F3F4] p-1 rounded-full border border-[#DADCE0]">
            {stats.map((stat, idx) => (
              <button
                key={stat.label}
                onClick={() => setActiveStatIndex(idx)}
                className={`flex-1 py-2 text-[10px] font-bold rounded-full transition-all duration-200 uppercase tracking-tighter ${
                  activeStatIndex === idx 
                    ? 'bg-white text-google-blue shadow-sm' 
                    : 'text-google-gray hover:bg-gray-200/50'
                }`}
              >
                {stat.label.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={false}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                }}
                className={`google-card p-4 md:p-6 flex flex-col space-y-3 md:space-y-2 ${
                  activeStatIndex === idx ? 'flex' : 'hidden md:flex'
                }`}
              >
                <div className="flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-2">
                  <div className="p-2 rounded-lg bg-gray-50 md:bg-transparent flex-shrink-0">
                    <stat.icon size={24} className={stat.color} />
                  </div>
                  <div className="flex flex-col md:items-center min-w-0">
                    <div className="text-2xl md:text-3xl font-bold leading-none">{stat.value}</div>
                    <div className="text-[10px] md:text-sm text-google-gray uppercase tracking-wider font-medium truncate">
                      {stat.label}
                    </div>
                  </div>
                </div>
                
                <div className="w-full pt-1 md:pt-4">
                  <div className="flex justify-between text-[10px] md:text-xs text-google-gray mb-1">
                    <span className="hidden sm:inline">Progress</span>
                    <span className="sm:hidden">Goal</span>
                    <span>Target: {stat.target}</span>
                  </div>
                  <div className="progress-bar-container h-1.5 md:h-2">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${Math.min(100, (Number(stat.value) / Number(stat.target)) * 100)}%`,
                        backgroundColor: stat.color.includes('blue') ? '#4285F4' : stat.color.includes('red') ? '#EA4335' : '#34A853'
                      }} 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'journey' && (
            <motion.section
              key="journey"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium">Daily Journey</h3>
                <div className="text-sm text-google-gray flex items-center gap-2">
                  <Clock size={16} />
                  Day {currentDay} of {totalDays}
                </div>
              </div>

              <div className="space-y-4">
                {sortedProjects.slice(0, 5).map((project, idx) => (
                  <div key={project.id} className="google-card p-6 flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-medium">{project.title}</h4>
                        <span className="text-xs font-medium px-2 py-1 bg-[#F1F3F4] rounded text-google-gray">
                          Day {Math.ceil((new Date(project.date).getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}
                        </span>
                      </div>
                      <p className="text-google-gray">{project.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 border border-[#DADCE0] rounded-full text-google-gray">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="google-button google-button-outline self-end md:self-center"
                    >
                      View Project <ExternalLink size={16} />
                    </a>
                  </div>
                ))}
                {projects.length > 5 && (
                  <button 
                    onClick={() => setActiveTab('gallery')}
                    className="w-full py-4 text-google-blue font-medium hover:bg-[#F8F9FA] rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    View all {projects.length} projects in Gallery <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </motion.section>
          )}

          {activeTab === 'gallery' && (
            <motion.section
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-medium">Project Gallery</h3>
                  <p className="text-google-gray">
                    {isChallengeEnded 
                      ? "The challenge is complete! Explore all 100 projects." 
                      : `Currently building... ${projects.length} projects completed so far.`}
                  </p>
                </div>
                {!isChallengeEnded && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-google-yellow/10 text-google-yellow rounded-lg border border-google-yellow/20">
                    <Clock size={18} />
                    <span className="text-sm font-medium">Unlocking full gallery on April 24th</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    className="google-card overflow-hidden flex flex-col"
                  >
                    <div className="aspect-video bg-gray-100 relative group">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-3 bg-white rounded-full text-google-blue shadow-xl hover:scale-110 transition-transform"
                        >
                          <ExternalLink size={24} />
                        </a>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium truncate pr-2">{project.title}</h4>
                          <span className="text-[10px] font-bold text-google-blue">#{project.id}</span>
                        </div>
                        <p className="text-sm text-google-gray line-clamp-2 mb-3">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-50 text-google-gray border border-gray-200 rounded">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="text-[10px] px-1.5 py-0.5 text-google-gray">+{project.tags.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Placeholders for remaining projects */}
                {!isChallengeEnded && Array.from({ length: Math.max(0, 8 - projects.length) }).map((_, i) => (
                  <div key={`placeholder-${i}`} className="google-card border-dashed bg-gray-50/50 p-6 flex flex-col items-center justify-center text-center space-y-2 opacity-50">
                    <Code2 size={32} className="text-gray-300" />
                    <div className="text-sm font-medium text-gray-400">Project #{projects.length + i + 1}</div>
                    <div className="text-xs text-gray-300 italic">Coming soon...</div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === 'social' && (
            <motion.section
              key="social"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-medium">Social Feed</h3>
                <p className="text-google-gray">Real-time updates and thoughts from the challenge.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Live X Feed */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Twitter size={20} className="text-[#1DA1F2]" />
                    <h4 className="font-medium">Live X Timeline</h4>
                  </div>
                  <div className="google-card overflow-hidden bg-white min-h-[600px]">
                    <a 
                      className="twitter-timeline" 
                      data-height="800" 
                      data-theme="light" 
                      data-chrome="noheader nofooter noborders transparent"
                      href="https://twitter.com/nealfraziertech?ref_src=twsrc%5Etfw"
                    >
                      Tweets by @nealfraziertech
                    </a>
                  </div>
                </div>

                {/* Manual Updates / Highlights */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={20} className="text-google-green" />
                    <h4 className="font-medium">Challenge Highlights</h4>
                  </div>
                  <div className="space-y-4">
                    {socialPosts.map((post, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="google-card p-5 space-y-3 border-l-4 border-l-google-blue"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                              post.platform === 'X' ? 'bg-black text-white' : 
                              post.platform === 'LinkedIn' ? 'bg-[#0077B5] text-white' : 
                              'bg-google-blue text-white'
                            }`}>
                              {post.platform === 'X' ? <Twitter size={12} /> : 
                               post.platform === 'LinkedIn' ? <Linkedin size={12} /> : 
                               <Cloud size={12} />}
                            </div>
                            <span className="text-xs font-medium text-google-gray">
                              {new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'short' })}
                            </span>
                          </div>
                          <a 
                            href={post.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-google-blue hover:underline text-[10px] font-medium"
                          >
                            Link
                          </a>
                        </div>
                        <p className="text-[#3C4043] text-sm leading-relaxed">
                          {post.content}
                        </p>
                      </motion.div>
                    ))}
                  </div>
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
              <AboutPage onBack={() => setActiveTab('journey')} />
            </motion.section>
          )}
          {activeTab === 'article' && (
            <motion.section
              key="article"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ArticlePage onBack={() => setActiveTab('about')} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#DADCE0] py-12 px-4 md:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold tracking-tighter">
              <span className="text-google-blue">1</span>
              <span className="text-google-red">0</span>
              <span className="text-google-yellow">0</span>
              <span className="text-google-green">W</span>
            </div>
            <div className="text-sm text-google-gray">
              © 2026 100 Websites Challenge. All rights reserved.
            </div>
          </div>
          
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab('about')}
              className="text-sm text-google-gray hover:text-google-blue transition-colors"
            >
              About Challenge
            </button>
            <a href="#" className="text-sm text-google-gray hover:text-google-blue transition-colors">Resources</a>
            <a href="#" className="text-sm text-google-gray hover:text-google-blue transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
