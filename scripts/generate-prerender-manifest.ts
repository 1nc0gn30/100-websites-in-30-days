import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type RouteMeta = {
  route: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
};

type ChallengeConfig = {
  challenge: {
    title: string;
  };
  projects: Array<{
    title: string;
    description: string;
  }>;
  socialPosts: Array<unknown>;
};

type Manifest = {
  generated_at: string;
  base_url: string;
  routes: RouteMeta[];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

function withTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

function canonical(baseUrl: string, route: string): string {
  const normalizedBase = baseUrl.replace(/\/+$/, '');
  if (route === '/') return `${normalizedBase}/`;
  return `${normalizedBase}${route}`;
}

async function main() {
  const cfgPath = path.join(repoRoot, 'src', 'challenge-config.json');
  const outDir = path.join(repoRoot, '.generated');
  const outPath = path.join(outDir, 'prerender-manifest.json');

  const cfgRaw = await readFile(cfgPath, 'utf8');
  const cfg = JSON.parse(cfgRaw) as ChallengeConfig;

  const baseUrl = 'https://100WebsitesIn30Days.nealfrazier.tech';
  const ogImage = `${withTrailingSlash(baseUrl)}og-image.png`;

  const projectCount = cfg.projects.length;
  const routes: RouteMeta[] = [
    {
      route: '/',
      title: `${cfg.challenge.title} by Neal Frazier`,
      description: `Live tracker for ${cfg.challenge.title}. ${projectCount} projects are currently listed with links, stats, and shipping notes.`,
      canonical: canonical(baseUrl, '/'),
      ogImage,
    },
    {
      route: '/gallery',
      title: `Project Gallery | ${cfg.challenge.title}`,
      description: `Browse all ${projectCount} shipped websites from the ${cfg.challenge.title} build sprint.`,
      canonical: canonical(baseUrl, '/gallery'),
      ogImage,
    },
    {
      route: '/feed',
      title: `Build Feed | ${cfg.challenge.title}`,
      description: `Read every challenge post from X in a single chronological feed.`,
      canonical: canonical(baseUrl, '/feed'),
      ogImage,
    },
    {
      route: '/about',
      title: `About the Challenge | ${cfg.challenge.title}`,
      description: 'Background, mission, and operating principles behind the 100-websites sprint.',
      canonical: canonical(baseUrl, '/about'),
      ogImage,
    },
    {
      route: '/about/article',
      title: `Founder Story | ${cfg.challenge.title}`,
      description: 'Deep-dive article on the journey, systems, and outcomes behind the challenge.',
      canonical: canonical(baseUrl, '/about/article'),
      ogImage,
    },
    {
      route: '/resources',
      title: `Builder Resources | ${cfg.challenge.title}`,
      description: 'Curated docs and tooling references used to build and ship challenge projects.',
      canonical: canonical(baseUrl, '/resources'),
      ogImage,
    },
    {
      route: '/contact',
      title: `Contact | ${cfg.challenge.title}`,
      description: 'Contact Neal Frazier about project work, partnerships, and production build support.',
      canonical: canonical(baseUrl, '/contact'),
      ogImage,
    },
  ];

  const manifest: Manifest = {
    generated_at: new Date().toISOString(),
    base_url: baseUrl,
    routes,
  };

  await mkdir(outDir, { recursive: true });
  await writeFile(outPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log(`Generated prerender manifest: ${path.relative(repoRoot, outPath)}`);
  console.log(`Routes: ${manifest.routes.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
