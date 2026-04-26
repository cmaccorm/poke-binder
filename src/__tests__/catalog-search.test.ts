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
      expect(buildCatalogQuery({ name: 'Charizard' })).toBe('name:\"Charizard*\"');
    });
    it('builds number query', () => {
      expect(buildCatalogQuery({ number: '25' })).toBe('number:25');
    });
    it('builds set query', () => {
      expect(buildCatalogQuery({ set: 'Base Set' })).toBe('set.name:\"*Base Set*\"');
    });
  });

  describe('compound queries', () => {
    it('builds name + set query', () => {
      expect(buildCatalogQuery({ name: 'Charizard', set: 'Base Set' })).toBe('name:\"Charizard*\" set.name:\"*Base Set*\"');
    });
    it('builds name + number query', () => {
      expect(buildCatalogQuery({ name: 'Pikachu', number: '25' })).toBe('name:\"Pikachu*\" number:25');
    });
    it('builds name + set + number query', () => {
      expect(buildCatalogQuery({ name: 'Charizard', set: 'Base Set', number: '4' })).toBe('name:\"Charizard*\" set.name:\"*Base Set*\" number:4');
    });
  });

  describe('all fields present', () => {
    it('builds query with all fields', () => {
      expect(buildCatalogQuery({ name: 'Pikachu', set: 'Jungle', number: '60' })).toBe('name:\"Pikachu*\" set.name:\"*Jungle*\" number:60');
    });
  });

  describe('variant fetch follow-up query', () => {
    it('builds name-only query for variant follow-up', () => {
      const parsed = parseSearchQuery('Ninetales 57');
      const followUpQuery = buildCatalogQuery({ name: parsed.name });
      expect(followUpQuery).toBe('name:\"Ninetales*\"');
    });
    it('initial query includes number for filtering', () => {
      const parsed = parseSearchQuery('Ninetales 57');
      const initialQuery = buildCatalogQuery(parsed);
      expect(initialQuery).toBe('name:\"Ninetales*\" number:57');
    });
  });
});