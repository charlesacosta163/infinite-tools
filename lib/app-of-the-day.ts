import { toolsData } from './tools-data';

export interface AppOfTheDay {
  id: number;
  name: string;
  creator: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link: string;
  isBeta?: boolean;
  isLegacy?: boolean;
}

/**
 * Get the app of the day based on current date
 */
export function getAppOfTheDay(): AppOfTheDay {
  // Filter out legacy apps and beta apps for the featured selection
  const eligibleApps = toolsData.filter(app => !app.isLegacy);
  
  // Get current date (UTC to ensure consistency across timezones)
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();
  
  // Create a seed based on the date
  // This ensures the same app is selected for the entire day globally
  const seed = year * 10000 + month * 100 + day;
  
  // Use a simple deterministic algorithm to select an app
  const index = seed % eligibleApps.length;
  
  return eligibleApps[index];
}

/**
 * Get the number of days until the next app rotation
 */
export function getDaysUntilNextApp(): number {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  tomorrow.setUTCHours(0, 0, 0, 0);
  
  const msUntilTomorrow = tomorrow.getTime() - now.getTime();
  return Math.ceil(msUntilTomorrow / (1000 * 60 * 60 * 24));
}

/**
 * Get time remaining until next app in human-readable format
 */
export function getTimeUntilNextApp(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  tomorrow.setUTCHours(0, 0, 0, 0);
  
  const msRemaining = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(msRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((msRemaining % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
}

