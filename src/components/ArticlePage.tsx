import React from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Calendar,
  Clock, 
  Share2, 
  Quote as QuoteIcon,
  Terminal,
  Zap,
  Camera
} from "lucide-react";
import avatarImage from "../../neal-avatar.jpg";
import configData from "../challenge-config.json";

interface ArticlePageProps {
  onBack: () => void;
}

const DAY_IMAGE_MODULES = import.meta.glob("../../day*.{png,jpg,jpeg,webp,avif,gif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const EXT_PRIORITY = ["png", "jpg", "jpeg", "webp", "avif", "gif"] as const;

const DAY_IMAGES: Partial<Record<number, string>> = Object.values(DAY_IMAGE_MODULES).reduce(
  (acc, imagePath) => {
    const match = imagePath.match(/day(\d+)(?:-[^/.]+)?\.(png|jpg|jpeg|webp|avif|gif)$/i);
    if (!match) return acc;
    const day = Number(match[1]);
    const ext = match[2].toLowerCase();
    const current = acc[day];

    if (!current) {
      acc[day] = imagePath;
      return acc;
    }

    const currentExt = current.match(/\.(png|jpg|jpeg|webp|avif|gif)$/i)?.[1]?.toLowerCase() ?? "gif";
    if (EXT_PRIORITY.indexOf(ext as (typeof EXT_PRIORITY)[number]) < EXT_PRIORITY.indexOf(currentExt as (typeof EXT_PRIORITY)[number])) {
      acc[day] = imagePath;
    }
    return acc;
  },
  {} as Partial<Record<number, string>>
);

const buildImageIdea = (day: number, title: string, retrospect: string) => {
  const styles = [
    "editorial documentary photo",
    "cinematic natural light shot",
    "moody workstation capture",
    "clean product-style composition",
    "street-level lifestyle frame",
  ];
  const lenses = ["35mm look", "50mm look", "wide environmental framing", "tight portrait crop"];
  const accents = [
    "subtle grain",
    "high-detail texture",
    "warm dusk tones",
    "cool neon highlights",
    "balanced daylight color",
  ];

  const style = styles[(day - 1) % styles.length];
  const lens = lenses[(day + 1) % lenses.length];
  const accent = accents[(day + 2) % accents.length];

  return `Day ${day} visual prompt: ${title}. Scene inspired by: ${retrospect} Composition: ${style}, ${lens}, ${accent}.`;
};

const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
];

const DAYS_CONTENT = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const dayStart = new Date(configData.challenge.startDate);
  dayStart.setUTCDate(dayStart.getUTCDate() + i);
  const dayEnd = new Date(dayStart);
  dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);

  const dayLabel = dayStart.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const weekday = dayStart.getUTCDay();
  const isWeekend = weekday === 0 || weekday === 6;
  const thinkTankDay = day % 2 === 0;
  const workBlock = isWeekend
    ? "Weekend structure today: no 9-5 contractor block, focus shifted to challenge builds and business systems."
    : "Worked 9am-5pm at MaxxPotential as a private-contractor Security Analyst, then moved into evening build mode.";
  const catSittingBlock = "Cat-sitting stayed part of the daily rhythm and kept the schedule grounded between work and shipping blocks.";
  const thinkTankBlock = thinkTankDay
    ? "Met at a cafe/workspace for think-tank time on real businesses launching this year, then translated those notes into product scope."
    : "Ran a focused solo execution block after work, tightening scope and moving directly into build + publish reps.";
  const skateBlock = isWeekend
    ? "Weekend note: if weather held, I got skateboard sessions in; that includes this weekend cadence and the prior weekend rhythm."
    : "Skate sessions were held for weekend weather windows so weekday momentum stayed clean.";

  const shippedSites = configData.projects
    .filter((project) => {
      const posted = new Date(project.date);
      return posted >= dayStart && posted < dayEnd;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const shippedTitles = shippedSites.map((site) => site.title);
  const shipBlock =
    shippedTitles.length > 0
      ? `Shipped site${shippedTitles.length > 1 ? "s" : ""} today: ${shippedTitles.join(", ")}. Logged the public progress on X as part of the build-in-public record.`
      : "No new site was posted this day; the focus was system work, planning, and preparing the next release wave.";

  const dayTitle = `Day ${day}: ${isWeekend ? "Weekend Shipping + Systems" : "Workday Execution + Night Build"} (${dayLabel})`;
  const content = `${workBlock} ${catSittingBlock} ${thinkTankBlock} ${shipBlock}`;
  const retrospect = `${isWeekend ? "Weekend cadence emphasized long creative blocks and deeper experimentation." : "Workday cadence stayed strict: professional delivery first, challenge output second, then public documentation."} ${skateBlock}`;

  return {
    day,
    title: dayTitle,
    content,
    retrospect,
    quote: QUOTES[i % QUOTES.length],
    imageIdea: buildImageIdea(day, dayTitle, retrospect),
    shippedTitles,
  };
});

export default function ArticlePage({ onBack }: ArticlePageProps) {
  const { challenge } = configData;
  const now = new Date();
  const challengeStart = new Date(challenge.startDate);
  const challengeEnd = new Date(challenge.endDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalChallengeDays = DAYS_CONTENT.length;
  const visibleDayCount = Math.max(
    0,
    Math.min(
      totalChallengeDays,
      Math.ceil((Math.min(now.getTime(), challengeEnd.getTime()) - challengeStart.getTime()) / msPerDay)
    )
  );
  const visibleDays = DAYS_CONTENT.slice(0, visibleDayCount);

  const handleHoloMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const mx = ((event.clientX - rect.left) / rect.width) * 100;
    const my = ((event.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${Math.max(0, Math.min(100, mx)).toFixed(2)}%`);
    el.style.setProperty("--my", `${Math.max(0, Math.min(100, my)).toFixed(2)}%`);
  };

  const handleHoloLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  };

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
        {visibleDays.length === 0 && (
          <div className="google-card rounded-3xl border border-[#DADCE0] bg-white p-8 text-center">
            <h2 className="text-2xl font-bold text-google-black mb-2">Journal unlocks at challenge start</h2>
            <p className="text-google-gray">
              Entries appear automatically as each challenge day passes.
            </p>
          </div>
        )}
        {visibleDays.map((day, idx) => (
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

              <div className="flex flex-wrap gap-2">
                {day.shippedTitles.length > 0 ? (
                  day.shippedTitles.map((title) => (
                    <span
                      key={`${day.day}-${title}`}
                      className="inline-flex items-center rounded-full border border-google-blue/25 bg-google-blue/10 px-3 py-1 text-xs font-medium text-google-blue"
                    >
                      {title}
                    </span>
                  ))
                ) : (
                  <span className="inline-flex items-center rounded-full border border-[#DADCE0] bg-[#F8F9FA] px-3 py-1 text-xs font-medium text-google-gray">
                    System and planning day
                  </span>
                )}
              </div>

              {/* Day Image */}
              <div className="group relative">
                {DAY_IMAGES[day.day] ? (
                  <motion.div
                    initial={{ opacity: 0.88, y: 22, scale: 0.985, rotateX: 6 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="journal-image-shell journal-holo-shell aspect-video"
                    onMouseMove={handleHoloMove}
                    onMouseLeave={handleHoloLeave}
                  >
                    <img
                      src={DAY_IMAGES[day.day]}
                      alt={`Day ${day.day} journal visual`}
                      className="journal-image-base"
                      loading={idx < 2 ? "eager" : "lazy"}
                    />
                    <img
                      src={DAY_IMAGES[day.day]}
                      alt=""
                      aria-hidden="true"
                      className="journal-image-glitch journal-image-glitch-red"
                      loading="lazy"
                    />
                    <img
                      src={DAY_IMAGES[day.day]}
                      alt=""
                      aria-hidden="true"
                      className="journal-image-glitch journal-image-glitch-cyan"
                      loading="lazy"
                    />
                    <img
                      src={avatarImage}
                      alt=""
                      aria-hidden="true"
                      className="journal-avatar-datamosh"
                      loading="lazy"
                    />
                    <div className="journal-image-vignette" />
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/55 backdrop-blur-sm rounded-full text-[10px] font-bold text-white/90 border border-white/20">
                      DAY {day.day} CAPTURE
                    </div>
                  </motion.div>
                ) : (
                  <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 flex flex-col items-center justify-center text-center p-8 transition-all group-hover:bg-gray-50">
                    <Camera className="w-12 h-12 text-gray-300 mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-sm text-gray-400 font-medium max-w-sm italic">
                      "{day.imageIdea}"
                    </p>
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-bold text-google-gray border border-gray-100">
                      PLACEHOLDER IMAGE
                    </div>
                  </div>
                )}
                <p className="mt-3 text-xs text-google-gray text-center italic">
                  {DAY_IMAGES[day.day]
                    ? `Caption: Day ${day.day} field note visual`
                    : `Caption: Idea for Day ${day.day} visual — ${day.imageIdea.split("—")[0]}`}
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
