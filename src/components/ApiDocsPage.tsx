import React, { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, Globe, FileJson, FileText, Sparkles, Cpu, BookOpen, Code2 } from 'lucide-react';

export default function ApiDocsPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'markdown'>('json');
  const [activeEndpoint, setActiveEndpoint] = useState<string>('projects');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const baseUrl = 'https://100websitesin30days.nealfrazier.tech';

  const endpoints = {
    seasons: {
      path: '/api/seasons',
      desc: 'Retrieve timeline metadata, project totals, and goals for all active challenge seasons.',
      params: [],
      curl: `curl "${baseUrl}/api/seasons${selectedFormat === 'markdown' ? '?format=markdown' : ''}"`,
      responseJson: `[
  {
    "id": 1,
    "name": "Season 1 (Spring 2026)",
    "title": "100 Websites in 30 Days",
    "startDate": "2026-03-24T00:00:00Z",
    "endDate": "2026-04-23T23:59:59Z",
    "targetCount": 100,
    "projectCount": 100,
    "postCount": 100
  },
  {
    "id": 2,
    "name": "Season 2 (Summer 2026)",
    "title": "100 Websites in 30 Days",
    "startDate": "2026-07-01T00:00:00Z",
    "endDate": "2026-07-30T23:59:59Z",
    "targetCount": 100,
    "projectCount": 9,
    "postCount": 9
  }
]`,
      responseMd: `# Seasons of 100 Websites in 30 Days

## Season 1: Season 1 (Spring 2026)
- **Challenge**: 100 Websites in 30 Days
- **Timeline**: 2026-03-24 to 2026-04-23
- **Progress**: 100 / 100 projects shipped
- **Social Updates**: 100 posts logged

## Season 2: Season 2 (Summer 2026)
- **Challenge**: 100 Websites in 30 Days
- **Timeline**: 2026-07-01 to 2026-07-30
- **Progress**: 9 / 100 projects shipped
- **Social Updates**: 9 posts logged`
    },
    projects: {
      path: '/api/projects',
      desc: 'Fetch all shipped websites across seasons, with optional text search and pagination filters.',
      params: [
        { name: 'season', type: 'number', desc: 'Filter by season ID (e.g. 1 or 2).' },
        { name: 'search', type: 'string', desc: 'Perform text search on titles, descriptions, and tags.' },
        { name: 'limit', type: 'number', desc: 'Limit the number of returned projects.' },
        { name: 'format', type: 'string', desc: 'Set output format: "json" or "markdown".' }
      ],
      curl: `curl "${baseUrl}/api/projects?season=2&limit=2${selectedFormat === 'markdown' ? '&format=markdown' : ''}"`,
      responseJson: `[
  {
    "id": 9,
    "title": "Dimension Lab",
    "date": "2026-07-04T12:00:00.000Z",
    "url": "https://spark-a-dimension.netlify.app/",
    "description": "Visualize and compare the differences between 2D and 3D design elements, parameters, and browser rendering capabilities.",
    "tags": ["three-js", "webgl", "design", "3d"],
    "thumbnail": "https://spark-a-dimension.netlify.app/og-image.png",
    "seasonId": 2,
    "seasonName": "Season 2 (Summer 2026)"
  },
  {
    "id": 8,
    "title": "Data Moshy",
    "date": "2026-07-03T15:00:00.000Z",
    "url": "https://spark-a-mosh.netlify.app/",
    "description": "Interactive media utility applying datamoshing distortions, keyframe color smears, and glitched compression to videos and images.",
    "tags": ["canvas", "datamosh", "media", "glitch"],
    "thumbnail": "https://spark-a-mosh.netlify.app/og-image.png",
    "seasonId": 2,
    "seasonName": "Season 2 (Summer 2026)"
  }
]`,
      responseMd: `# Shipped Projects (2 found)

### Dimension Lab
- **Season**: Season 2 (Summer 2026) (Season 2)
- **Date Shipped**: 2026-07-04
- **URL**: [https://spark-a-dimension.netlify.app/](https://spark-a-dimension.netlify.app/)
- **Description**: Visualize and compare the differences between 2D and 3D design elements, parameters, and browser rendering capabilities.
- **Tags**: \`three-js\`, \`webgl\`, \`design\`, \`3d\`

### Data Moshy
- **Season**: Season 2 (Summer 2026) (Season 2)
- **Date Shipped**: 2026-07-03
- **URL**: [https://spark-a-mosh.netlify.app/](https://spark-a-mosh.netlify.app/)
- **Description**: Interactive media utility applying datamoshing distortions, keyframe color smears, and glitched compression to videos and images.
- **Tags**: \`canvas\`, \`datamosh\`, \`media\`, \`glitch\``
    },
    feed: {
      path: '/api/feed',
      desc: 'Retrieve chronological timeline logs of social media announcements and deployment posts.',
      params: [
        { name: 'season', type: 'number', desc: 'Filter by season ID (e.g. 1 or 2).' },
        { name: 'limit', type: 'number', desc: 'Limit the number of social posts.' },
        { name: 'format', type: 'string', desc: 'Set output format: "json" or "markdown".' }
      ],
      curl: `curl "${baseUrl}/api/feed?season=2&limit=2${selectedFormat === 'markdown' ? '&format=markdown' : ''}"`,
      responseJson: `[
  {
    "platform": "X",
    "url": "https://x.com/NealFrazierTech/status/2048564021239842818",
    "content": "Season 2 Day 4: Released Dimension Lab. Interactive 2D vs 3D layout capability and rendering visualizer.",
    "date": "2026-07-04T12:00:00.000Z",
    "seasonId": 2,
    "seasonName": "Season 2 (Summer 2026)"
  },
  {
    "platform": "X",
    "url": "https://x.com/NealFrazierTech/status/2048564021239842817",
    "content": "Season 2 Day 3: Deployed Data Moshy! glitch, compress, and datamosh uploaded videos and images client-side.",
    "date": "2026-07-03T15:00:00.000Z",
    "seasonId": 2,
    "seasonName": "Season 2 (Summer 2026)"
  }
]`,
      responseMd: `# Build Feed Updates (2 posts)

### Post on 2026-07-04 (X)
> Season 2 Day 4: Released Dimension Lab. Interactive 2D vs 3D layout capability and rendering visualizer.

[View original post](https://x.com/NealFrazierTech/status/2048564021239842818)

---

### Post on 2026-07-03 (X)
> Season 2 Day 3: Deployed Data Moshy! glitch, compress, and datamosh uploaded videos and images client-side.

[View original post](https://x.com/NealFrazierTech/status/2048564021239842817)

---`
    }
  };

  const currentEndpoint = endpoints[activeEndpoint as keyof typeof endpoints];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-[#DADCE0] bg-white p-8 md:p-12 shadow-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-google-blue/10 blur-3xl rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-google-green/8 blur-3xl rounded-full -ml-20 -mb-20" />
        
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 border border-google-blue/20 text-google-blue text-xs font-semibold mb-6">
            <Sparkles size={14} className="animate-pulse" />
            <span>Developer & AI Agent Gateway</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-google-black tracking-tight mb-4">
            Neal's Challenge <span className="text-google-blue">API</span>
          </h1>
          
          <p className="text-base sm:text-lg text-google-gray leading-relaxed mb-6">
            Query 100 Websites challenge data directly from your terminal, local scripts, or agent environments. 
            Every endpoint returns standard structured JSON or **AI-optimized clean Markdown** formatted for LLM context processing.
          </p>

          <div className="flex flex-wrap gap-3">
            <a 
              href="/api" 
              target="_blank" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-google-black text-white hover:bg-black/90 transition-all border border-black"
            >
              <Globe size={16} />
              <span>Test API Root</span>
              <ExternalLink size={14} />
            </a>
            <button 
              onClick={() => {
                const docSection = document.getElementById('endpoints-section');
                if (docSection) docSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#F8F9FA] text-[#3C4043] border border-[#DADCE0] hover:bg-[#F1F3F4] transition-all"
            >
              <Terminal size={16} />
              <span>Explore Endpoints</span>
            </button>
          </div>
        </div>
      </div>

      {/* Showcase / Playground Section */}
      <div id="endpoints-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Selector */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-google-gray font-bold">
            Select API Endpoint
          </h3>
          <div className="flex flex-col gap-2">
            {Object.entries(endpoints).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveEndpoint(key)}
                className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex flex-col gap-1 ${
                  activeEndpoint === key 
                  ? 'border-google-blue/30 bg-google-blue/6 shadow-xs' 
                  : 'border-[#DADCE0] hover:border-google-gray hover:bg-[#F8F9FA]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono font-bold text-google-black text-xs md:text-sm">{item.path}</span>
                  <span className="text-[10px] font-semibold bg-google-green/10 text-google-green border border-google-green/20 px-2 py-0.5 rounded-full uppercase">GET</span>
                </div>
                <p className="text-[11px] text-google-gray line-clamp-2 mt-1 leading-snug">{item.desc}</p>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-[#DADCE0] bg-[#F8F9FA] p-5 space-y-4">
            <div className="flex items-center gap-2 text-google-black font-semibold text-sm">
              <Cpu size={18} className="text-google-blue" />
              <h4>AI Agent Formatting</h4>
            </div>
            <p className="text-xs text-google-gray leading-relaxed">
              Are you querying this from an LLM prompt, LangChain loader, or serverless agent? Append <strong>?format=markdown</strong>. 
              The response shifts from JSON to a highly condensed, token-efficient Markdown structure, saving context space and parsing overhead.
            </p>
          </div>
        </div>

        {/* Right Column: Console */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-google-gray font-bold">
              Console & Preview
            </h3>
            
            {/* Format Toggle */}
            <div className="flex rounded-full bg-[#F1F3F4] p-1 border border-[#DADCE0]">
              <button
                onClick={() => setSelectedFormat('json')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedFormat === 'json'
                  ? 'bg-white text-google-black shadow-xs'
                  : 'text-google-gray hover:text-google-black'
                }`}
              >
                <FileJson size={14} />
                <span>JSON</span>
              </button>
              <button
                onClick={() => setSelectedFormat('markdown')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedFormat === 'markdown'
                  ? 'bg-white text-google-black shadow-xs'
                  : 'text-google-gray hover:text-google-black'
                }`}
              >
                <FileText size={14} />
                <span>Markdown</span>
              </button>
            </div>
          </div>

          {/* Console Output Card */}
          <div className="rounded-2xl border border-[#DADCE0] bg-google-black overflow-hidden shadow-lg flex flex-col min-h-[480px]">
            {/* Console Header */}
            <div className="bg-black/40 px-5 py-3 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-google-red/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-google-yellow/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-google-green/40" />
                <span className="text-[10px] font-mono text-white/50 ml-2">agent_shell.sh</span>
              </div>
              <button 
                onClick={() => handleCopy(currentEndpoint.curl, 'curl')}
                className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono text-white/60 hover:text-white transition-colors"
              >
                {copiedText === 'curl' ? (
                  <>
                    <Check size={12} className="text-google-green" />
                    <span className="text-google-green">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy command</span>
                  </>
                )}
              </button>
            </div>

            {/* Console CLI Input */}
            <div className="p-5 font-mono text-xs text-white/90 bg-[#121314] select-all border-b border-white/5">
              <span className="text-google-green mr-2">$</span>
              {currentEndpoint.curl}
            </div>

            {/* Console Output Body */}
            <div className="p-5 font-mono text-xs text-white/80 overflow-auto flex-1 bg-[#1e2022] max-h-[350px] scrollbar-thin">
              <pre className="whitespace-pre">
                {selectedFormat === 'json' ? currentEndpoint.responseJson : currentEndpoint.responseMd}
              </pre>
            </div>

            {/* Console Footer */}
            <div className="bg-black/20 px-5 py-3 border-t border-white/5 text-[10px] font-mono text-white/40 flex items-center justify-between shrink-0">
              <span>Status: 200 OK</span>
              <span>Content-Type: {selectedFormat === 'json' ? 'application/json' : 'text/markdown'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Parameters documentation */}
      {currentEndpoint.params.length > 0 && (
        <div className="rounded-2xl border border-[#DADCE0] bg-white p-6 space-y-4">
          <div className="flex items-center gap-2 font-bold text-google-black text-sm">
            <Code2 size={18} className="text-google-yellow" />
            <h4>Supported Query Parameters</h4>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#DADCE0] text-google-gray">
                  <th className="py-2.5 font-semibold">Param</th>
                  <th className="py-2.5 font-semibold">Type</th>
                  <th className="py-2.5 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F3F4]">
                {currentEndpoint.params.map((p) => (
                  <tr key={p.name}>
                    <td className="py-3 font-mono font-bold text-google-black">{p.name}</td>
                    <td className="py-3 font-mono text-google-blue">{p.type}</td>
                    <td className="py-3 text-google-gray">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Integration walkthrough */}
      <div className="rounded-2xl border border-[#DADCE0] bg-white p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2.5 text-google-black font-extrabold text-lg md:text-xl">
          <BookOpen size={22} className="text-google-green" />
          <h2>AI Agent System Prompts Example</h2>
        </div>

        <p className="text-sm text-google-gray leading-relaxed">
          If you are building an AI Agent that needs up-to-date details of Neal's challenge to share on social feeds or generate reports, 
          you can instruct the agent to fetch the markdown format of our endpoints. Here is a sample instructions prompt template:
        </p>

        <div className="rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-5 space-y-3 font-mono text-xs text-[#3C4043]">
          <p className="font-bold text-google-black">Agent System Instruction Prompt:</p>
          <p className="leading-relaxed">
            "To answer questions regarding Neal Frazier's latest challenge projects and progress updates, run a curl request fetching 
            `curl https://100websitesin30days.nealfrazier.tech/api/projects?season=2&format=markdown`. This returns his completed websites list. 
            Do not fetch JSON; parse the markdown directly to save tokens."
          </p>
        </div>
      </div>
    </div>
  );
}
