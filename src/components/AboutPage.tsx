import React from "react";
import { motion } from "motion/react";
import { 
  Terminal, 
  Shield, 
  Music, 
  Zap, 
  Globe, 
  Waves, 
  Apple,
  Briefcase,
  Rocket,
  BrainCircuit,
  ArrowLeft,
  ChevronRight
} from "lucide-react";

interface AboutPageProps {
  onBack: () => void;
}

const BentoCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`google-card p-6 hover:shadow-lg transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

export default function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-google-gray"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl font-bold tracking-tight">About the <span className="text-google-blue">Challenge</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Intro Card */}
        <BentoCard className="md:col-span-2 lg:col-span-2 flex flex-col justify-between" delay={0.1}>
          <div>
            <div className="flex items-center gap-2 text-google-blue mb-4">
              <Globe className="w-5 h-5" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold">The Visionary</span>
            </div>
            <h3 className="text-3xl font-bold mb-4">Neal Frazier</h3>
            <p className="text-google-gray leading-relaxed text-lg">
              A T-shaped self-taught developer and Virginia Beach native. I'm a builder, a musician, and a skateboarder who believes that in the age of AI, there's no excuse not to create.
            </p>
          </div>
          <div className="flex gap-6 mt-8">
            <div className="flex flex-col items-center gap-1 group">
              <Waves className="text-google-gray group-hover:text-google-blue transition-colors w-6 h-6" />
              <span className="text-[10px] text-google-gray uppercase">Beach</span>
            </div>
            <div className="flex flex-col items-center gap-1 group">
              <Music className="text-google-gray group-hover:text-google-red transition-colors w-6 h-6" />
              <span className="text-[10px] text-google-gray uppercase">Music</span>
            </div>
            <div className="flex flex-col items-center gap-1 group">
              <Apple className="text-google-gray group-hover:text-google-green transition-colors w-6 h-6" />
              <span className="text-[10px] text-google-gray uppercase">Fruit</span>
            </div>
          </div>
        </BentoCard>

        {/* Professional Hat */}
        <BentoCard className="md:col-span-1 lg:col-span-2" delay={0.2}>
          <div className="flex items-center gap-2 text-google-red mb-4">
            <Shield className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-wider font-bold">Professional Hat</span>
          </div>
          <h3 className="text-xl font-bold mb-3">Security Analysis & Automation</h3>
          <p className="text-sm text-google-gray mb-4">
            Maxx Potential apprentice for 7 months, contracted as a Security Analyst. I build Power Apps and PowerShell tools to automate SOX compliance.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs text-google-gray bg-gray-50 p-2 rounded-lg border border-gray-100">
              <Terminal className="w-4 h-4 text-google-blue" />
              SOX Compliance Automation (Daily - Annual)
            </div>
            <div className="flex items-center gap-3 text-xs text-google-gray bg-gray-50 p-2 rounded-lg border border-gray-100">
              <Briefcase className="w-4 h-4 text-google-red" />
              ServiceNow & SharePoint Specialist
            </div>
          </div>
        </BentoCard>

        {/* AI Stack */}
        <BentoCard className="lg:col-span-2" delay={0.3}>
          <div className="flex items-center gap-2 text-google-green mb-4">
            <BrainCircuit className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-wider font-bold">AI Stack</span>
          </div>
          <h3 className="text-xl font-bold mb-4">Everyday AI Integration</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Gemini', 'Codex', 'Ollama', 'LocalAI', 'Netlify Agents'].map((tech) => (
              <div key={tech} className="flex items-center gap-2 text-xs text-google-gray border border-gray-100 p-2 rounded-xl bg-gray-50/50">
                <Zap className="w-3 h-3 text-google-yellow fill-google-yellow" />
                {tech}
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Ventures */}
        <BentoCard className="md:col-span-2 lg:col-span-1" delay={0.4}>
          <div className="flex items-center gap-2 text-google-yellow mb-4">
            <Zap className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-wider font-bold">Ventures</span>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-google-blue">Valet Ninjas</h4>
              <p className="text-[10px] text-google-gray uppercase tracking-tighter">Premium Valet Company</p>
            </div>
            <div>
              <h4 className="font-bold text-google-red">Neal Frazier Tech</h4>
              <p className="text-[10px] text-google-gray uppercase tracking-tighter">Custom Digital Services</p>
            </div>
            <div>
              <h4 className="font-bold text-google-green">Tech Pro</h4>
              <p className="text-[10px] text-google-gray uppercase tracking-tighter">Upcoming Innovation</p>
            </div>
          </div>
        </BentoCard>

        {/* The Challenge */}
        <BentoCard className="md:col-span-3 lg:col-span-1 bg-google-blue/5 border-google-blue/20" delay={0.5}>
          <div className="flex items-center gap-2 text-google-blue mb-4">
            <Rocket className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-wider font-bold">The Challenge</span>
          </div>
          <p className="text-sm text-google-gray leading-relaxed italic">
            "Ultimately it's up to you what you want to accomplish. There is no reason not to build an app or website today."
          </p>
          <div className="mt-4 pt-4 border-t border-google-blue/10 flex items-center justify-between">
            <p className="text-[10px] font-bold text-google-blue uppercase">Netlify AI Shippers Program</p>
            <button 
              onClick={() => (window as any).setActiveTab('article')}
              className="text-xs font-bold text-google-blue hover:underline flex items-center gap-1 group"
            >
              Read My Journey
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </BentoCard>
      </div>

      {/* Main CTA for Article */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="google-card p-8 md:p-12 bg-gradient-to-r from-google-blue to-indigo-600 text-white rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-xl text-center md:text-left">
          <h3 className="text-3xl font-bold mb-4">Want to know the full story?</h3>
          <p className="text-indigo-100 text-lg opacity-90">
            I've written a detailed article about my journey from a self-taught enthusiast to a security analyst and AI builder. It's a deep dive into the "T-Shaped" philosophy.
          </p>
        </div>
        <button 
          onClick={() => (window as any).setActiveTab('article')}
          className="px-8 py-4 bg-white text-google-blue rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-xl flex items-center gap-2 group whitespace-nowrap"
        >
          Read the Full Article
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
