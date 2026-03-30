import { toRoman, fromRoman, getGameStatus, GameState } from './gameUtils';

// ===========================================================================
// toRoman
// ===========================================================================

describe('toRoman', () => {
  it('converteix 1 a I', () => {
    expect(toRoman(1)).toBe('I');
  });

  it('converteix 4 a IV', () => {
    expect(toRoman(4)).toBe('IV');
  });

  it('converteix 9 a IX', () => {
    expect(toRoman(9)).toBe('IX');
  });

  it('converteix 14 a XIV', () => {
    expect(toRoman(14)).toBe('XIV');
  });

  it('converteix 42 a XLII', () => {
    expect(toRoman(42)).toBe('XLII');
  });

  it('converteix 99 a XCIX', () => {
    expect(toRoman(99)).toBe('XCIX');
  });

  it('converteix 2024 a MMXXIV', () => {
    expect(toRoman(2024)).toBe('MMXXIV');
  });
});

// ===========================================================================
// fromRoman
// ===========================================================================

describe('fromRoman', () => {
  it('converteix I a 1', () => {
    expect(fromRoman('I')).toBe(1);
  });

  it('converteix IV a 4', () => {
    expect(fromRoman('IV')).toBe(4);
  });

  it('converteix XIV a 14', () => {
    expect(fromRoman('XIV')).toBe(14);
  });

  it('converteix XCIX a 99', () => {
    expect(fromRoman('XCIX')).toBe(99);
  });

  it('roundtrip: toRoman(n) -> fromRoman hauria de tornar n', () => {
    for (let n = 1; n <= 50; n++) {
      expect(fromRoman(toRoman(n))).toBe(n);
    }
  });
});

// ===========================================================================
// getGameStatus
// ===========================================================================

describe('getGameStatus', () => {
  const baseState: GameState = {
    intents: [],
    formesCanoniquesProvades: [],
    pistesDonades: 0,
    gameWon: false,
    rebuscada: 'estrella',
    gameId: 1,
    surrendered: false,
  };

  it('retorna EN JOC quan state és null', () => {
    expect(getGameStatus(null)).toBe('EN JOC');
  });

  it('retorna EN JOC per estat inicial', () => {
    expect(getGameStatus(baseState)).toBe('EN JOC');
  });

  it('retorna TROBADA quan gameWon és true', () => {
    expect(getGameStatus({ ...baseState, gameWon: true })).toBe('TROBADA');
  });

  it('retorna ABANDONAT quan surrendered és true', () => {
    expect(getGameStatus({ ...baseState, surrendered: true })).toBe('ABANDONAT');
  });

  it('ABANDONAT té prioritat sobre TROBADA', () => {
    expect(getGameStatus({ ...baseState, surrendered: true, gameWon: true })).toBe('ABANDONAT');
  });
});
