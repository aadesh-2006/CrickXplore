import type { FullStory } from '../../types/stories';
import { KAPIL_DEV_175_FULL_STORY } from './fullStories/kapilDev175';
import { SACHIN_DESERT_STORM_FULL_STORY } from './fullStories/sachinDesertStorm';
import { GIBBS_438_FULL_STORY } from './fullStories/herschelleGibbs438';
import { MAXWELL_201_FULL_STORY } from './fullStories/glennMaxwell201';

export const FULL_STORIES: FullStory[] = [
  KAPIL_DEV_175_FULL_STORY,
  SACHIN_DESERT_STORM_FULL_STORY,
  GIBBS_438_FULL_STORY,
  MAXWELL_201_FULL_STORY,
];

export function getFullStoryBySlug(slug: string): FullStory | undefined {
  return FULL_STORIES.find((story) => story.slug === slug || (slug === 'the-impossible-201' && story.slug === 'glenn-maxwell-201-wankhede-2023'));
}

export function hasFullStory(slug: string): boolean {
  return FULL_STORIES.some((story) => story.slug === slug || (slug === 'the-impossible-201' && story.slug === 'glenn-maxwell-201-wankhede-2023'));
}
