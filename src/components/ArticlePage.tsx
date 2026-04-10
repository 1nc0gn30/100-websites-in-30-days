import React from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Quote as QuoteIcon,
  Terminal,
  Shield,
  Music,
  Zap,
  Globe,
  Rocket,
  Waves,
  Activity,
  Apple,
  Briefcase,
  BrainCircuit,
  ChevronRight,
  Camera
} from "lucide-react";

interface ArticlePageProps {
  onBack: () => void;
}

const DAYS_CONTENT = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
  ];

  const retrospects = [
    "Hit the Virginia Beach boardwalk today. The ocean air clears the mind like nothing else. Skateboarding is the ultimate reset.",
    "Deep in SOX compliance land at work. PowerApps is saving us hours of manual labor. It's rewarding to see the code actually work in production.",
    "Spent the evening at the studio. Music production and coding share the same DNA—it's all about layers and rhythm.",
    "Valet Ninjas is scaling. Managing a team while building 100 sites is a lesson in extreme time management.",
    "Fresh fruit for breakfast. Ripe mangoes and berries. Fuel for the brain. Pushing through the Day 10 slump.",
    "Tech Pro is starting to take shape. The vision is becoming clearer every day. AI is the force multiplier.",
    "Skating at the local park. Landed a kickflip I've been struggling with. Persistence in skating translates directly to persistence in debugging.",
    "Meeting with the Netlify AI Shippers. The energy is infectious. We're all building the future together.",
    "Late night session with Ollama. Running local AI models is a game changer for privacy and speed.",
    "Reflecting on the 'T-Shaped' path. The breadth of experience is what makes the depth meaningful."
  ];

  const imageIdeas = [
    "A shot of my desk with multiple monitors, a skateboard leaning against the wall, and a bowl of fresh fruit.",
    "A close-up of a terminal screen running a complex PowerShell script for SOX compliance.",
    "A sunset photo from the Virginia Beach oceanfront, reflecting on the day's progress.",
    "A photo of my music production setup—MIDI controllers and a DAW open next to VS Code.",
    "A candid shot of me skating at a local park, capturing the 'flow state'.",
    "A screenshot of a successful deployment on Netlify, the 'Site is live' message.",
    "A photo of a whiteboard covered in architectural diagrams for Tech Pro.",
    "A macro shot of a perfectly ripe piece of fruit, symbolizing the 'fruits of labor'.",
    "A group photo (or zoom screenshot) with other AI Shippers, showing the community.",
    "A minimalist shot of my 'T-Shaped' philosophy sketched out in a notebook."
  ];

  return {
    day,
    title: `Day ${day}: ${[
      "The Spark", "AI Integration", "The Flow State", "Scaling Systems", "Compliance & Code",
      "The Studio Session", "Boardwalk Reflections", "Community Power", "Local Intelligence", "The Halfway Mark",
      "Pushing Boundaries", "The Pivot", "Automation Mastery", "Security First", "Entrepreneurial Grit",
      "The Creative Spark", "Technical Debt", "The Breakthrough", "System Architecture", "The Final Sprint",
      "Refining the Vision", "User Experience", "Data Integrity", "The AI Exoskeleton", "Community Feedback",
      "The Home Stretch", "Polishing the Gems", "The Legacy", "The Launchpad", "The New Beginning"
    ][i] || `Progress Log ${day}`}`,
    content: `This was a day of intense focus. I spent the morning refining the core logic of the project, ensuring that every function was optimized for performance. In the age of AI, we often forget that the underlying architecture still needs to be sound. I used Gemini to help me refactor a particularly messy piece of state management, and the result was a 30% reduction in code complexity.`,
    retrospect: retrospects[i % retrospects.length],
    quote: quotes[i % quotes.length],
    imageIdea: imageIdeas[i % imageIdeas.length]
  };
});

export default function ArticlePage({ onBack }: ArticlePageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto pb-24"
    >
      {/* Navigation & Meta */}
      <div className="flex items-center justify-between mb-12 sticky top-20 bg-[#F8F9FA]/80 backdrop-blur-md py-4 z-20 border-b border-gray-100">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-google-blue font-medium hover:bg-google-blue/5 px-4 py-2 rounded-full transition-colors"
        >
          <ArrowLeft size={18} />
          Back to About
        </button>
        <div className="flex items-center gap-4 text-google-gray">
          <div className="flex items-center gap-1 text-sm">
            <Clock size={16} />
            20 min read
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <header className="mb-16 text-center md:text-left">
        <div className="inline-block px-3 py-1 bg-google-blue/10 text-google-blue rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          The 30-Day Journal
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
          30 Days of <span className="gradient-text">Creation</span>: The Neal Frazier Log
        </h1>
        <p className="text-xl text-google-gray leading-relaxed mb-8">
          A day-by-day breakdown of the "100 Websites in 30 Days" challenge. This is more than just a build log; it's a reflection on life, work, and the relentless pursuit of doing what you love.
        </p>
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="w-12 h-12 rounded-full bg-google-blue flex items-center justify-center text-white font-bold text-xl">
            NF
          </div>
          <div className="text-left">
            <div className="font-bold text-lg">Neal Frazier</div>
            <div className="text-google-gray text-sm">March 25 - April 24, 2026</div>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="space-y-24">
        {DAYS_CONTENT.map((day, idx) => (
          <motion.section 
            key={day.day}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Day Marker */}
            <div className="absolute -left-12 top-0 hidden lg:flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-google-blue flex items-center justify-center text-white text-xs font-bold">
                {day.day}
              </div>
              <div className="w-px h-full bg-gray-100" />
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-3 text-google-blue">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-mono font-bold uppercase tracking-widest">Day {day.day}</span>
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight">{day.title}</h2>
              
              <div className="prose prose-lg prose-zinc max-w-none">
                <p>{day.content}</p>
              </div>

              {/* Placeholder Image */}
              <div className="group relative">
                <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 flex flex-col items-center justify-center text-center p-8 transition-all group-hover:bg-gray-50">
                  <Camera className="w-12 h-12 text-gray-300 mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-gray-400 font-medium max-w-sm italic">
                    "{day.imageIdea}"
                  </p>
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-bold text-google-gray border border-gray-100">
                    PLACEHOLDER IMAGE
                  </div>
                </div>
                <p className="mt-3 text-xs text-google-gray text-center italic">
                  Caption: Idea for Day {day.day} visual — {day.imageIdea.split('—')[0]}
                </p>
              </div>

              {/* Retrospect Section */}
              <div className="bg-google-blue/5 border-l-4 border-google-blue p-8 rounded-r-3xl">
                <div className="flex items-center gap-2 text-google-blue mb-4">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">The Retrospect</span>
                </div>
                <p className="text-google-gray leading-relaxed italic">
                  "{day.retrospect}"
                </p>
              </div>

              {/* Quote Section */}
              <div className="flex flex-col items-center text-center py-8 px-4 border-y border-gray-50">
                <QuoteIcon className="w-8 h-8 text-google-blue/20 mb-4" />
                <p className="text-xl font-light text-zinc-700 italic max-w-2xl">
                  "{day.quote.text}"
                </p>
                <span className="mt-4 text-sm font-bold text-google-gray">— {day.quote.author}</span>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Footer CTA */}
      <footer className="mt-32 pt-16 border-t border-gray-100 text-center">
        <h3 className="text-3xl font-bold mb-6">The Journey Continues</h3>
        <p className="text-google-gray max-w-2xl mx-auto mb-12">
          This log is a living document. As the challenge progresses, so does the story. Thank you for being part of this journey.
        </p>
        <button 
          onClick={onBack}
          className="google-button google-button-primary px-12 py-4 text-lg"
        >
          Back to Dashboard
        </button>
      </footer>
    </motion.div>
  );
}

// Missing import fix
import { Calendar } from "lucide-react";
