import type { FullStory } from '../../types/stories';
import { KAPIL_DEV_175_FULL_STORY } from './fullStories/kapilDev175';

export const FULL_STORIES: FullStory[] = [
  KAPIL_DEV_175_FULL_STORY,
];

export function getFullStoryBySlug(slug: string): FullStory | undefined {
  return FULL_STORIES.find((story) => story.slug === slug);
}

export function hasFullStory(slug: string): boolean {
  return FULL_STORIES.some((story) => story.slug === slug);
}
