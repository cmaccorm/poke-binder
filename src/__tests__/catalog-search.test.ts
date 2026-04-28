import { describe, it, expect } from 'vitest';
import { parseSearchQuery, buildCatalogQuery } from '@/lib/catalog';

describe('parseSearchQuery', () => {
  describe('single card name search', () => {
    it('parses single word name', () => {
      expect(parseSearchQuery('Charizard')).toEqual({ name: 'Charizard' });
    });
  });

  describe('bare number search', () => {
    it('parses numeric query as number only', () => {
      expect(parseSearchQuery('25')).toEqual({ number: '25' });
    });
    it('parses multi-digit number', () => {
      expect(parseSearchQuery('100')).toEqual({ number: '100' });
    });
  });

  describe('card name with set name', () => {
    it('parses name + set', () => {
      expect(parseSearchQuery('Charizard Base Set')).toEqual({ name: 'Charizard', set: 'Base Set' });
    });
    it('parses multi-word set name', () => {
      expect(parseSearchQuery('Pikachu Jungle')).toEqual({ name: 'Pikachu', set: 'Jungle' });
    });
  });

  describe('card name with card number', () => {
    it('parses name + number', () => {
      expect(parseSearchQuery('Pikachu 25')).toEqual({ name: 'Pikachu', number: '25' });
    });
  });

  describe('card name with set name and card number', () => {
    it('parses name + set + number', () => {
      expect(parseSearchQuery('Charizard Base Set 4')).toEqual({ name: 'Charizard', set: 'Base Set', number: '4' });
    });
    it('parses multi-word name + set + number', () => {
      expect(parseSearchQuery('Mewtwo Genetic Apex 1')).toEqual({ name: 'Mewtwo', set: 'Genetic Apex', number: '1' });
    });
  });

  describe('card name with suffix', () => {
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
    it('parses suffix + number', () => {
      expect(parseSearchQuery('Gardevoir EX 63')).toEqual({
        name: 'Gardevoir EX',
        number: '63',
        hasSuffix: true,
        baseName: 'Gardevoir',
        originalSuffix: 'EX',
      });
    });
    it('parses suffix + set', () => {
      expect(parseSearchQuery('Gardevoir EX Steam Siege')).toEqual({
        name: 'Gardevoir EX',
        set: 'Steam Siege',
        hasSuffix: true,
        baseName: 'Gardevoir',
        originalSuffix: 'EX',
      });
    });
    it('is case-insensitive for suffix matching', () => {
      expect(parseSearchQuery('gardevoir ex')).toEqual({
        name: 'gardevoir ex',
        hasSuffix: true,
        baseName: 'gardevoir',
        originalSuffix: 'ex',
      });
    });
  });

  describe('empty input', () => {
    it('returns empty object for empty string', () => {
      expect(parseSearchQuery('')).toEqual({});
    });
    it('returns empty object for whitespace only', () => {
      expect(parseSearchQuery('   ')).toEqual({});
    });
  });

  describe('variant fetch triggering', () => {
    it('triggers variant fetch when name+number without set', () => {
      const parsed = parseSearchQuery('Ninetales 57');
      expect(Boolean(parsed.name && parsed.number && !parsed.set)).toBe(true);
    });
    it('triggers variant fetch when name+set without number', () => {
      const parsed = parseSearchQuery('Beedrill Delta Species');
      expect(Boolean(parsed.name && parsed.set && !parsed.number)).toBe(true);
    });
    it('does not trigger variant fetch when set is present', () => {
      const parsed = parseSearchQuery('Ninetales Base Set 57');
      expect(Boolean(parsed.name && parsed.number && !parsed.set)).toBe(false);
    });
    it('does not trigger variant fetch for bare number', () => {
      const parsed = parseSearchQuery('57');
      expect(Boolean(parsed.name && parsed.number && !parsed.set)).toBe(false);
    });
    it('does not trigger variant fetch for single name', () => {
      const parsed = parseSearchQuery('Ninetales');
      expect(Boolean(parsed.name && parsed.number && !parsed.set)).toBe(false);
    });
  });
});

describe('buildCatalogQuery', () => {
  describe('single field', () => {
    it('builds name query', () => {
      expect(buildCatalogQuery({ name: 'Charizard' })).toBe('name:"*Charizard*"');
    });
    it('builds number query', () => {
      expect(buildCatalogQuery({ number: '25' })).toBe('number:25');
    });
    it('builds set query', () => {
      expect(buildCatalogQuery({ set: 'Base Set' })).toBe('set.name:"*Base Set*"');
    });
  });

  describe('compound queries', () => {
    it('builds name + set query', () => {
      expect(buildCatalogQuery({ name: 'Charizard', set: 'Base Set' })).toBe('name:"*Charizard*" set.name:"*Base Set*"');
    });
    it('builds name + number query', () => {
      expect(buildCatalogQuery({ name: 'Pikachu', number: '25' })).toBe('name:"*Pikachu*" number:25');
    });
    it('builds name + set + number query', () => {
      expect(buildCatalogQuery({ name: 'Charizard', set: 'Base Set', number: '4' })).toBe('name:"*Charizard*" set.name:"*Base Set*" number:4');
    });
  });

  describe('all fields present', () => {
    it('builds query with all fields', () => {
      expect(buildCatalogQuery({ name: 'Pikachu', set: 'Jungle', number: '60' })).toBe('name:"*Pikachu*" set.name:"*Jungle*" number:60');
    });
  });

  describe('suffix-aware wildcard strategy', () => {
    it('uses contains wildcard when no suffix', () => {
      expect(buildCatalogQuery({ name: 'Charizard' })).toBe('name:"*Charizard*"');
    });
    it('uses base*suffix* pattern when suffix is detected', () => {
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
    it('includes set and number with suffix pattern', () => {
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
  });

  describe('variant fetch follow-up query', () => {
    it('builds name-only query for variant follow-up', () => {
      const parsed = parseSearchQuery('Ninetales 57');
      const followUpQuery = buildCatalogQuery({ name: parsed.name });
      expect(followUpQuery).toBe('name:"*Ninetales*"');
    });
    it('initial query includes number for filtering', () => {
      const parsed = parseSearchQuery('Ninetales 57');
      const initialQuery = buildCatalogQuery(parsed);
      expect(initialQuery).toBe('name:"*Ninetales*" number:57');
    });
  });
});
