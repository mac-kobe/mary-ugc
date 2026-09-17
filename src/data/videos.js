// Single source of truth for every video on the site.
// Files live in public/videos/<id>.mp4 with a poster at public/images/posters/<id>.jpg

export const CATEGORIES = {
  FOOD: 'Food & Recipes',
  DRINKS: 'Drinks',
  BEAUTY: 'Beauty & Skincare',
  HOME: 'Home & Family',
}

const { FOOD, DRINKS, BEAUTY, HOME } = CATEGORIES

export const srcFor = (id) => `/videos/${id}.mp4`
export const posterFor = (src) => {
  const filename = src.split('/').pop().replace('.mp4', '.jpg')
  return `/images/posters/${filename}`
}

// `added` is the date the clip was added to the site (YYYY-MM-DD). Lists are sorted newest-first,
// so new clips only need a fresh date to land at the top of the gallery and the front of a carousel.
const define = (id, title, category, added) => ({ id, title, category, added, src: srcFor(id) })

const byRecency = (a, b) => (a.added < b.added ? 1 : a.added > b.added ? -1 : 0)

export const allVideos = [
  // Added Sep 17, 2026
  define('unbrush-hairbrush', 'Unbrush Hairbrush', BEAUTY, '2026-09-17'),
  define('flavors-dog-toppers', 'Flavors Dog Toppers', HOME, '2026-09-17'),
  define('camerons-coffee', "Cameron's Coffee", DRINKS, '2026-09-17'),
  define('alani-javvy-drink', 'Alani × Javvy', DRINKS, '2026-09-17'),
  define('breakfast-inspo', 'Breakfast Inspo', FOOD, '2026-09-17'),
  define('hardshell-case', 'Hardshell Travel Case', HOME, '2026-09-17'),

  // Added Jun 25, 2026
  define('summer-food', 'Summer Food', FOOD, '2026-06-25'),
  define('salud-pepino-drink', 'Salud Pepino Drink', DRINKS, '2026-06-25'),
  define('neutrogena', 'Neutrogena', BEAUTY, '2026-06-25'),
  define('5-min-dinner', '5-Min Dinner', FOOD, '2026-06-25'),

  // Added Apr 2, 2026
  define('medicube-skincare', 'Medicube Skincare', BEAUTY, '2026-04-02'),
  define('korean-skincare', 'Korean Skincare', BEAUTY, '2026-04-02'),
  define('korean-skincare-2', 'Korean Skincare #2', BEAUTY, '2026-04-02'),
  define('bloom-drink', 'Bloom Drink', DRINKS, '2026-04-02'),
  define('alani-drink-2', 'Alani Drink #2', DRINKS, '2026-04-02'),
  define('alani-drink-3', 'Alani Drink #3', DRINKS, '2026-04-02'),
  define('coffeemate-drink', 'Coffee Mate Drink', DRINKS, '2026-04-02'),
  define('maryruth-drink', 'MaryRuth Drink', DRINKS, '2026-04-02'),
  define('loccitane-shower', "L'Occitane Shower", BEAUTY, '2026-04-02'),
  define('nightly-skincare', 'Nightly Skincare', BEAUTY, '2026-04-02'),
  define('parive-skincare', 'Parive Skincare', BEAUTY, '2026-04-02'),

  // Added Apr 1, 2026
  define('drain-catcher', 'Drain Catcher Hack', HOME, '2026-04-01'),
  define('arroz-recipe', 'Arroz con Pollo', FOOD, '2026-04-01'),
  define('alani-drink', 'Alani Drink', DRINKS, '2026-04-01'),
  define('breakfast-recipe', 'Breakfast Recipe', FOOD, '2026-04-01'),
  define('meatball-recipe', 'Meatball Recipe', FOOD, '2026-04-01'),
  define('xmas-slippers', 'Xmas Slippers', HOME, '2026-04-01'),
].sort(byRecency)

const byId = Object.fromEntries(allVideos.map((v) => [v.id, v]))
// Returns the requested clips in newest-first order regardless of the order ids are listed
export const getVideos = (ids) =>
  ids
    .map((id) => byId[id])
    .filter(Boolean)
    .sort(byRecency)

// Home page "Browse by Category" bands — 8 tiles each (2 rows of 4 on desktop).
// Only two showcase categories for now; the gallery keeps the finer per-video categories.
export const homeCategories = [
  {
    name: 'Food & Drink',
    tagline: 'Budget-friendly meals, coffee & everyday sips my family actually loves',
    videos: getVideos([
      'breakfast-inspo',
      'camerons-coffee',
      'summer-food',
      'alani-javvy-drink',
      '5-min-dinner',
      'salud-pepino-drink',
      'arroz-recipe',
      'bloom-drink',
    ]),
  },
  {
    name: 'Lifestyle & Beauty',
    tagline: 'Honest reviews, home hacks & products that make a busy mom’s life easier',
    videos: getVideos([
      'unbrush-hairbrush',
      'drain-catcher',
      'neutrogena',
      'flavors-dog-toppers',
      'medicube-skincare',
      'hardshell-case',
      'korean-skincare',
      'korean-skincare-2',
    ]),
  },
]
