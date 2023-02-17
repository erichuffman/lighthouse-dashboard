

// URLs to test.
// id: Machine-readable unique ID. No spaces, hyphens, or underscores.
// title: Human-readable page title.
// URL: The full URL of the page.
const urls = [
  {
    id: 'homepage',
    title: 'Medicare.gov Homepage',
    path: 'https://www.medicare.gov'
  },
  { 
    id: 'getStarted',
    title: 'Get Started With Medicare Landing Page',
    path: 'https://www.medicare.gov/basics/get-started-with-medicare'
  }
]

const reportInfo = {
  title: 'Medicare.gov',
  title_url: 'https://www.medicare.gov'
}

// Chrome options.
const lhOpts = {
  output: ['html', 'json'],
  onlyCategories: ['performance']
};

export {
  urls,
  reportInfo,
  lhOpts,
}
