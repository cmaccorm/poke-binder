import { describe, it, expect } from 'vitest';
import { parseSearchQuery, buildCatalogQuery } from '@/lib/catalog';

describe('parseSearchQuery — suffix recognition', () => {
  describe('single-token suffixes', () => {
    it('parses EX suffix', () => {
      expect(parseSearchQuery('Gardevoir EX')).toEqual({
        name: 'Gardevoir EX',
        hasSuffix: true,
        baseName: 'Gardevoir',
        originalSuffix: 'EX',
      });
    });

    it('parses ex suffix (lowercase)', () => {
      expect(parseSearchQuery('Gardevoir ex')).toEqual({
        name: 'Gardevoir ex',
        hasSuffix: true,
        baseName: 'Gardevoir',
        originalSuffix: 'ex',
      });
    });

    it('parses V suffix', () => {
      expect(parseSearchQuery('Arceus V')).toEqual({
        name: 'Arceus V',
        hasSuffix: true,
        baseName: 'Arceus',
        originalSuffix: 'V',
      });
    });

    it('parses VMAX suffix', () => {
      expect(parseSearchQuery('Charizard VMAX')).toEqual({
        name: 'Charizard VMAX',
        hasSuffix: true,
        baseName: 'Charizard',
        originalSuffix: 'VMAX',
      });
    });

    it('parses VSTAR suffix', () => {
      expect(parseSearchQuery('Arceus VSTAR')).toEqual({
        name: 'Arceus VSTAR',
        hasSuffix: true,
        baseName: 'Arceus',
        originalSuffix: 'VSTAR',
      });
    });

    it('parses VUNION suffix', () => {
      expect(parseSearchQuery('Mewtwo VUNION')).toEqual({
        name: 'Mewtwo VUNION',
        hasSuffix: true,
        baseName: 'Mewtwo',
        originalSuffix: 'VUNION',
      });
    });

    it('parses GX suffix', () => {
      expect(parseSearchQuery('Pikachu GX')).toEqual({
        name: 'Pikachu GX',
        hasSuffix: true,
        baseName: 'Pikachu',
        originalSuffix: 'GX',
      });
    });

    it('parses BREAK suffix', () => {
      expect(parseSearchQuery('Greninja BREAK')).toEqual({
        name: 'Greninja BREAK',
        hasSuffix: true,
        baseName: 'Greninja',
        originalSuffix: 'BREAK',
      });
    });

    it('parses Prime suffix', () => {
      expect(parseSearchQuery('Blissey Prime')).toEqual({
        name: 'Blissey Prime',
        hasSuffix: true,
        baseName: 'Blissey',
        originalSuffix: 'Prime',
      });
    });

    it('parses Legend suffix', () => {
      expect(parseSearchQuery('Ho-Oh Legend')).toEqual({
        name: 'Ho-Oh Legend',
        hasSuffix: true,
        baseName: 'Ho-Oh',
        originalSuffix: 'Legend',
      });
    });

    it('parses Radiant suffix', () => {
      expect(parseSearchQuery('Greninja Radiant')).toEqual({
        name: 'Greninja Radiant',
        hasSuffix: true,
        baseName: 'Greninja',
        originalSuffix: 'Radiant',
      });
    });
  });

  describe('multi-token suffixes', () => {
    it('parses Lv X suffix (two tokens)', () => {
      expect(parseSearchQuery('Shaymin Lv X')).toEqual({
        name: 'Shaymin Lv X',
        hasSuffix: true,
        baseName: 'Shaymin',
        originalSuffix: 'Lv X',
      });
    });

    it('parses Lv.X suffix (dot variant)', () => {
      expect(parseSearchQuery('Shaymin Lv.X')).toEqual({
        name: 'Shaymin Lv.X',
        hasSuffix: true,
        baseName: 'Shaymin',
        originalSuffix: 'Lv.X',
      });
    });

    it('parses TAG TEAM suffix', () => {
      expect(parseSearchQuery('Pikachu TAG TEAM')).toEqual({
        name: 'Pikachu TAG TEAM',
        hasSuffix: true,
        baseName: 'Pikachu',
        originalSuffix: 'TAG TEAM',
      });
    });

    it('parses Amazing Rare suffix', () => {
      expect(parseSearchQuery('Rayquaza Amazing Rare')).toEqual({
        name: 'Rayquaza Amazing Rare',
        hasSuffix: true,
        baseName: 'Rayquaza',
        originalSuffix: 'Amazing Rare',
      });
    });
  });

  describe('suffix + number', () => {
    it('parses name + suffix + number', () => {
      expect(parseSearchQuery('Gardevoir EX 63')).toEqual({
        name: 'Gardevoir EX',
        number: '63',
        hasSuffix: true,
        baseName: 'Gardevoir',
        originalSuffix: 'EX',
      });
    });

    it('parses name + multi-token suffix + number', () => {
      expect(parseSearchQuery('Shaymin Lv X 126')).toEqual({
        name: 'Shaymin Lv X',
        number: '126',
        hasSuffix: true,
        baseName: 'Shaymin',
        originalSuffix: 'Lv X',
      });
    });
  });

  describe('suffix + set', () => {
    it('parses name + suffix + set', () => {
      expect(parseSearchQuery('Gardevoir EX Steam Siege')).toEqual({
        name: 'Gardevoir EX',
        set: 'Steam Siege',
        hasSuffix: true,
        baseName: 'Gardevoir',
        originalSuffix: 'EX',
      });
    });

    it('parses name + suffix + set + number', () => {
      expect(parseSearchQuery('Gardevoir EX Steam Siege 35')).toEqual({
        name: 'Gardevoir EX',
        set: 'Steam Siege',
        number: '35',
        hasSuffix: true,
        baseName: 'Gardevoir',
        originalSuffix: 'EX',
      });
    });
  });

  describe('case insensitivity', () => {
    it('matches suffix regardless of case', () => {
      expect(parseSearchQuery('gardevoir ex')).toEqual({
        name: 'gardevoir ex',
        hasSuffix: true,
        baseName: 'gardevoir',
        originalSuffix: 'ex',
      });
    });

    it('matches multi-token suffix regardless of case', () => {
      expect(parseSearchQuery('shaymin lv x')).toEqual({
        name: 'shaymin lv x',
        hasSuffix: true,
        baseName: 'shaymin',
        originalSuffix: 'lv x',
      });
    });
  });
});

describe('parseSearchQuery — backward compatibility', () => {
  it('parses single word name', () => {
    expect(parseSearchQuery('Charizard')).toEqual({ name: 'Charizard' });
  });

  it('parses numeric query as number only', () => {
    expect(parseSearchQuery('25')).toEqual({ number: '25' });
  });

  it('parses name + set', () => {
    expect(parseSearchQuery('Charizard Base Set')).toEqual({
      name: 'Charizard',
      set: 'Base Set',
    });
  });

  it('parses name + number', () => {
    expect(parseSearchQuery('Ditto 63')).toEqual({
      name: 'Ditto',
      number: '63',
    });
  });

  it('parses name + set + number', () => {
    expect(parseSearchQuery('Charizard Base Set 4')).toEqual({
      name: 'Charizard',
      set: 'Base Set',
      number: '4',
    });
  });

  it('returns empty object for empty string', () => {
    expect(parseSearchQuery('')).toEqual({});
  });

  it('returns empty object for whitespace only', () => {
    expect(parseSearchQuery('   ')).toEqual({});
  });
});

describe('buildCatalogQuery — wildcard strategies', () => {
  it('uses contains wildcard for plain name (no suffix)', () => {
    expect(buildCatalogQuery({ name: 'Charizard' })).toBe('name:"*Charizard*"');
  });

  it('uses base*suffix* pattern when suffix detected', () => {
    expect(
      buildCatalogQuery({
        name: 'Gardevoir EX',
        hasSuffix: true,
        baseName: 'Gardevoir',
        originalSuffix: 'EX',
      })
    ).toBe('name:"Gardevoir*EX*"');
  });

  it('uses base*suffix* pattern with multi-word suffix', () => {
    expect(
      buildCatalogQuery({
        name: 'Shaymin Lv X',
        hasSuffix: true,
        baseName: 'Shaymin',
        originalSuffix: 'Lv X',
      })
    ).toBe('name:"Shaymin*Lv X*"');
  });

  it('uses base*suffix* with dot-variant suffix', () => {
    expect(
      buildCatalogQuery({
        name: 'Shaymin Lv.X',
        hasSuffix: true,
        baseName: 'Shaymin',
        originalSuffix: 'Lv.X',
      })
    ).toBe('name:"Shaymin*Lv.X*"');
  });

  it('combines suffix pattern with set and number filters', () => {
    expect(
      buildCatalogQuery({
        name: 'Gardevoir EX',
        set: 'Steam Siege',
        number: '35',
        hasSuffix: true,
        baseName: 'Gardevoir',
        originalSuffix: 'EX',
      })
    ).toBe('name:"Gardevoir*EX*" set.name:"*Steam Siege*" number:35');
  });

  it('builds set-only query', () => {
    expect(buildCatalogQuery({ set: 'Base Set' })).toBe('set.name:"*Base Set*"');
  });

  it('builds number-only query', () => {
    expect(buildCatalogQuery({ number: '63' })).toBe('number:63');
  });

  it('builds name + set query without suffix', () => {
    expect(buildCatalogQuery({ name: 'Gardevoir', set: 'Steam Siege' })).toBe(
      'name:"*Gardevoir*" set.name:"*Steam Siege*"'
    );
  });

  it('builds name + number query without suffix', () => {
    expect(buildCatalogQuery({ name: 'Ditto', number: '63' })).toBe(
      'name:"*Ditto*" number:63'
    );
  });
});
