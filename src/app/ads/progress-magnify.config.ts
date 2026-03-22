/**
 * Progress Magnify units (same network as in your Adsterra-style snippets).
 * Hidden link URL is duplicated in `index.html` (must stay static there).
 */
export const PROGRESS_MAGNIFY_HIDDEN_LINK_HREF =
  'https://progressmagnify.com/j6y7fka3?key=e20ae96b74ecd3c5d1740ec503284f59';

/** Container id + async `invoke.js` (key bb509…). */
export const PROGRESS_MAGNIFY_CONTAINER_UNIT = {
  key: 'bb509ebafe12162d122e9f0fa8812183',
  scriptHost: 'progressmagnify.com',
} as const;

/**
 * Popunder / popup script — tag is in `index.html` after `</app-root>` (before social bar).
 * Browsers often block new windows until the user clicks; many popunders open on first interaction.
 * Production domain approval may be required (often no fill on localhost).
 */
export const PROGRESS_MAGNIFY_GLOBAL_SCRIPT_SRC =
  'https://progressmagnify.com/eb/a2/e3/eba2e37607fd572d15a305fc4cbc0a9a.js';

/**
 * Social bar — tag is in `index.html` at the end of `<body>` (after `</app-root>`).
 * Many networks only show ads on approved production domains, not on localhost.
 */
export const PROGRESS_MAGNIFY_SOCIAL_BAR_SCRIPT_SRC =
  'https://progressmagnify.com/19/56/95/195695b345750e10228ddfb2d504fb4d.js';
