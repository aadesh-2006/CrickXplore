import { CRICKET_STORIES, getStoryBySlug, getFeaturedStories, getRelatedStories } from '../src/data/stories/storyCatalog';

console.log('=====================================================');
console.log('--- CRICKXPLORE STORIES DATASET & ENGINE TEST SUITE ---');
console.log('=====================================================');

// 1. Story Catalog Count Check
const REQUIRED_STORIES_COUNT = 9;
if (CRICKET_STORIES.length !== REQUIRED_STORIES_COUNT) {
  console.error(`❌ FAIL: Expected ${REQUIRED_STORIES_COUNT} stories, found ${CRICKET_STORIES.length}`);
  process.exit(1);
}
console.log(`✅ PASS: Catalog contains exactly ${CRICKET_STORIES.length} stories`);

// 2. Required Story Slugs Validation
const requiredSlugs = [
  'kapil-dev-175-tunbridge-wells-1983',
  'sachin-tendulkar-desert-storm-sharjah-1998',
  'herschelle-gibbs-175-438-game-2006',
  'glenn-maxwell-201-wankhede-2023',
  'rohit-sharma-264-eden-gardens-2014',
  'sachin-tendulkar-200-gwalior-2010',
  'yuvraj-singh-six-sixes-durban-2007',
  'virat-kohli-mohali-chase-2016',
  'virat-kohli-82-melbourne-2022',
];

for (const slug of requiredSlugs) {
  const story = getStoryBySlug(slug);
  if (!story) {
    console.error(`❌ FAIL: Missing required story slug "${slug}"`);
    process.exit(1);
  }
  console.log(`✅ PASS: Story slug "${slug}" resolved -> ${story.player}: ${story.headlineScore}`);
}

// 3. Unique Slugs Audit
const slugSet = new Set<string>();
for (const story of CRICKET_STORIES) {
  if (slugSet.has(story.slug)) {
    console.error(`❌ FAIL: Duplicate story slug "${story.slug}"`);
    process.exit(1);
  }
  slugSet.add(story.slug);
}
console.log('✅ PASS: All story slugs are strictly unique');

// 4. Content Structure & Section Integrity
for (const story of CRICKET_STORIES) {
  if (!story.title || !story.subtitle || !story.player || !story.headlineScore) {
    console.error(`❌ FAIL: Incomplete metadata for story "${story.slug}"`);
    process.exit(1);
  }
  if (!story.sections || story.sections.length === 0) {
    console.error(`❌ FAIL: Story "${story.slug}" has no narrative sections`);
    process.exit(1);
  }
  for (const section of story.sections) {
    if (!section.heading || !section.body || section.body.length === 0) {
      console.error(`❌ FAIL: Invalid section in "${story.slug}": ${section.heading || 'untitled'}`);
      process.exit(1);
    }
  }
}
console.log('✅ PASS: All stories have rich narrative sections, headers, and paragraphs');

// 5. Featured & Related Lookup Helpers
const featured = getFeaturedStories();
if (featured.length === 0) {
  console.error('❌ FAIL: No featured stories found');
  process.exit(1);
}
console.log(`✅ PASS: ${featured.length} featured stories configured`);

const related = getRelatedStories(requiredSlugs[0], 3);
if (related.length !== 3 || related.some((s) => s.slug === requiredSlugs[0])) {
  console.error('❌ FAIL: getRelatedStories failed');
  process.exit(1);
}
// 6. Full Story Architecture Validation
import { FULL_STORIES, getFullStoryBySlug, hasFullStory } from '../src/data/stories/fullStoriesCatalog';

console.log('--- FULL STORY SECOND LAYER TEST SUITE ---');
if (FULL_STORIES.length < 1) {
  console.error('❌ FAIL: Expected at least 1 full story');
  process.exit(1);
}
console.log(`✅ PASS: Full story catalog contains ${FULL_STORIES.length} full-length historical essay(s)`);

const kapilSlug = 'kapil-dev-175-tunbridge-wells-1983';
if (!hasFullStory(kapilSlug)) {
  console.error(`❌ FAIL: hasFullStory("${kapilSlug}") should be true`);
  process.exit(1);
}
console.log(`✅ PASS: hasFullStory("${kapilSlug}") returned true`);

const nonExistentSlug = 'sachin-tendulkar-desert-storm-sharjah-1998';
if (hasFullStory(nonExistentSlug)) {
  console.error(`❌ FAIL: hasFullStory("${nonExistentSlug}") should be false for unmigrated stories`);
  process.exit(1);
}
console.log(`✅ PASS: hasFullStory correctly returns false for stories without full essays`);

const kapilFullStory = getFullStoryBySlug(kapilSlug);
if (!kapilFullStory) {
  console.error(`❌ FAIL: Could not resolve full story for ${kapilSlug}`);
  process.exit(1);
}
if (!kapilFullStory.title || !kapilFullStory.subtitle || kapilFullStory.sections.length < 5) {
  console.error('❌ FAIL: Incomplete Kapil Dev full story content');
  process.exit(1);
}
console.log(`✅ PASS: Kapil Dev full story contains ${kapilFullStory.sections.length} comprehensive chapters`);

console.log('=====================================================');
console.log('✅ ALL STORIES & FULL STORY TESTS PASSED!');
console.log('=====================================================');
