import { describe, expect, it } from "vitest";
import { initialLocale, localeForCountry, localeForPath, pathForLocale, hasLocalePath } from "./locales";
describe('language selection', () => {
  it.each([['NL','nl'],['DE','de'],['DK','da'],['SE','sv'],['FI','fi'],['NO','no'],['FR','en']])('maps country %s to %s', (country, lang) => expect(localeForCountry(country)).toBe(lang));
  it('keeps an explicit language address over region', () => expect(initialLocale('/fi/security','DE')).toBe('fi'));
  it('keeps a manual Norwegian choice over region', () => expect(initialLocale('/','DE','no')).toBe('no'));
  it('uses region on first visit', () => expect(initialLocale('/','NL')).toBe('nl'));
  it('keeps unknown region on Norwegian default', () => expect(initialLocale('/',undefined)).toBe('no'));
  it('switches to the same security page', () => expect(pathForLocale('/sikkerhet','sv')).toBe('/sv/security'));
  it('switches product paths without losing product', () => expect(pathForLocale('/de/butikk/avisafe-patch','fi')).toBe('/fi/butikk/avisafe-patch'));
  it('recognizes Danish URLs', () => expect(localeForPath('/da/aviops')).toBe('da'));
  it('recognizes translated product detail pages', () => expect(hasLocalePath('/fi/butikk/avisafe-patch')).toBe(true));
  it('does not advertise missing Norwegian counterparts', () => expect(hasLocalePath('/drone-fleet-management')).toBe(false));
});