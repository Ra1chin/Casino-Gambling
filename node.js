// generate-sitemap.js
const fs = require('fs');

// Your actual Netlify domain
const host = 'https://ra1chin.github.io/Casino-Gambling/';

// List all blog slugs here (without the domain)
const blogSlugs = [
  'the-future-of-casino-gamesthe-future-of-casino-games',
  'the-rise-of-live-dealer-games',
  'how-do-casino-pro-gamers-manage-their-money-to-play-crash-game',
  'teen-patti-rummy-trends-2025',
];

// Generate URL list
const paths = [
  '/', // homepage
  ...blogSlugs.map(slug => `/blogs/${slug}`)
];

const urls = paths
  .map(p => `<url><loc>${host}${p}</loc></url>`)
  .join('\n  ');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

// Write sitemap.xml file
fs.writeFileSync('sitemap.xml', xml);
console.log(`sitemap.xml created successfully with ${paths.length} URLs!`);
