// gameMode.ts - Helper functions for managing game mode (SIMPLE vs EXPERT)

const GAME_MODE_KEY = 'rebuscada-game-mode';
const CLOSEST_WORDS_KEY = 'rebuscada-closest-words';
const SIMPLE_MODE_USED_KEY = 'rebuscada-simple-mode-used';

export type GameMode = 'simple' | 'expert';

/**
 * Get game mode from URL parameter (?mode=simple)
 */
export function getModeFromUrl(): GameMode | null {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');
  return mode === 'simple' ? 'simple' : null;
}

/**
 * Save game mode to localStorage
 */
export function saveGameMode(gameMode: GameMode, gameId: number): void {
  try {
    const key = `${GAME_MODE_KEY}-${gameId}`;
    localStorage.setItem(key, gameMode);
  } catch (error) {
    console.warn('Error saving game mode:', error);
  }
}

/**
 * Load game mode from localStorage
 */
export function loadGameMode(gameId: number): GameMode {
  try {
    const key = `${GAME_MODE_KEY}-${gameId}`;
    const saved = localStorage.getItem(key);
    return (saved === 'simple' ? 'simple' : 'expert') as GameMode;
  } catch (error) {
    console.warn('Error loading game mode:', error);
    return 'expert';
  }
}

/**
 * Mark that this game has been played in SIMPLE mode at least once.
 */
export function markSimpleModeUsed(gameId: number): void {
  try {
    const key = `${SIMPLE_MODE_USED_KEY}-${gameId}`;
    localStorage.setItem(key, '1');
  } catch (error) {
    console.warn('Error saving simple mode usage flag:', error);
  }
}

/**
 * Returns true if this game has used SIMPLE mode at least once.
 */
export function hasUsedSimpleMode(gameId: number): boolean {
  try {
    const key = `${SIMPLE_MODE_USED_KEY}-${gameId}`;
    return localStorage.getItem(key) === '1';
  } catch (error) {
    console.warn('Error loading simple mode usage flag:', error);
    return false;
  }
}

/**
 * Save count of closest words discovered (pos < 100) to localStorage  
 */
export function saveClosestWordsCount(count: number, gameId: number): void {
  try {
    const key = `${CLOSEST_WORDS_KEY}-${gameId}`;
    localStorage.setItem(key, String(count));
  } catch (error) {
    console.warn('Error saving closest words count:', error);
  }
}

/**
 * Load count of closest words discovered from localStorage
 */
export function loadClosestWordsCount(gameId: number): number {
  try {
    const key = `${CLOSEST_WORDS_KEY}-${gameId}`;
    const saved = localStorage.getItem(key);
    return saved ? parseInt(saved, 10) : 0;
  } catch (error) {
    console.warn('Error loading closest words count:', error);
    return 0;
  }
}

/**
 * Fetch proposed words from backend
 */
export async function fetchProposedWords(
  serverUrl: string,
  rebuscada: string,
  excludeWords: string[]
): Promise<string[]> {
  try {
    const excludeParam = excludeWords.length > 0 ? `&exclude=${excludeWords.join(',')}` : '';
    const response = await fetch(
      `${serverUrl}/proposed-words?rebuscada=${encodeURIComponent(rebuscada)}${excludeParam}`
    );
    
    if (!response.ok) {
      console.warn('Failed to fetch proposed words:', response.statusText);
      return [];
    }
    
    const data = await response.json();
    return data.paraules || [];
  } catch (error) {
    console.warn('Error fetching proposed words:', error);
    return [];
  }
}

/**
 * Check if user should automatically transition to EXPERT mode
 * (when 5 words with position < 100 have been discovered)
 */
export function shouldTransitionToExpert(intents: Array<{ posicio: number }>): boolean {
  const closestCount = intents.filter(i => i.posicio < 100).length;
  return closestCount >= 5;
}

/**
 * Count words with position < 100 in the intents list
 */
export function countClosestWords(intents: Array<{ posicio: number }>): number {
  return intents.filter(i => i.posicio < 100).length;
}
