import nl from "./translations/nl.json";
import de from "./translations/de.json";
import da from "./translations/da.json";
import sv from "./translations/sv.json";
import fi from "./translations/fi.json";
import pl from "./translations/pl.json";
const dictionaries: Record<string, Record<string, string>> = { nl, de, da, sv, fi, pl };
const translatedValues = Object.fromEntries(Object.entries(dictionaries).map(([lang, dict]) => [lang, new Set(Object.values(dict))]));
export function translateDisplay(text: string, language: string): string {
  const dictionary = dictionaries[language];
  if (!dictionary || !text.trim()) return text;
  const normalized = text.replace(/\s+/g, " ").trim();
  if (translatedValues[language]?.has(normalized)) return text;
  const translated = dictionary[normalized];
  if (translated) return text.replace(text.trim(), translated);
  // Amounts and stock quantities remain unchanged; translate their surrounding labels.
  return text.replace(/(Kjøp hos AviSafe|AviSafe abonnement|\s\/ bruker \/ mnd|\s\/ mnd|stk på lager|på lager|brukere|inkl\. mva|Fra |fra )/g, (part) => dictionary[part.trim()] ? `${part.startsWith(" ") ? " " : ""}${dictionary[part.trim()]}` : part);
}