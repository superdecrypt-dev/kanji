import type { Kanji } from './data';
import { kanjiReadingMetadata } from './kanjiReadingMetadata';

export type ReadingKind = 'kunyomi' | 'onyomi';

const normalizeReadingText = (str: string | undefined | null): string => {
  if (!str) return '';
  return str.toLowerCase().trim().replace(/\s+/g, ' ');
};

const splitReadingOptions = (str: string | undefined | null): string[] => {
  if (!str) return [];
  return str
    .split(/[\/,、]/)
    .map(option => normalizeReadingText(option))
    .filter(Boolean);
};

const toHiragana = (text: string): string =>
  text.replace(/[\u30a1-\u30f6]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 0x60)
  );

const kanaToRomaji = (input: string): string => {
  const kana = toHiragana(input);
  const digraphMap: Record<string, string> = {
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  };

  const kanaMap: Record<string, string> = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'ゐ': 'wi', 'ゑ': 'we', 'を': 'o', 'ん': 'n',
    'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o',
    'ゔ': 'vu',
  };

  let result = '';

  for (let i = 0; i < kana.length; i++) {
    const current = kana[i];
    const next = kana[i + 1] || '';
    const pair = current + next;

    if (current === 'っ') {
      const nextPair = kana.slice(i + 1, i + 3);
      const nextRomaji = digraphMap[nextPair] || kanaMap[next] || '';
      if (nextRomaji) result += nextRomaji[0];
      continue;
    }

    if (current === 'ー') {
      const lastVowel = result.match(/[aeiou](?=[^aeiou]*$)/)?.[0];
      if (lastVowel) result += lastVowel;
      continue;
    }

    if (digraphMap[pair]) {
      result += digraphMap[pair];
      i++;
      continue;
    }

    result += kanaMap[current] || current;
  }

  return result;
};

const expandReadingOption = (option: string): string[] => {
  const normalized = normalizeReadingText(option.replace(/[\[\]]/g, ''));
  if (!normalized) return [];

  const inlineParentheses = /^[^()\s]+\([^()]+\)$/.test(normalized);
  if (inlineParentheses) {
    return [normalizeReadingText(normalized.replace(/[()]/g, ''))];
  }

  const parts = Array.from(
    normalized.matchAll(/[^()\s]+|\([^()]+\)/g),
    (match) => normalizeReadingText(match[0].replace(/[()-]/g, ''))
  ).filter(Boolean);

  return parts.length > 0
    ? Array.from(new Set(parts))
    : [normalizeReadingText(normalized.replace(/[()-]/g, ''))].filter(Boolean);
};

const getReadingDisplayOptions = (str: string | undefined | null): string[] => {
  return Array.from(
    new Set(
      splitReadingOptions(str).flatMap((option) => {
        const normalized = option.replace(/[\[\]]/g, '').trim();
        if (!normalized) return [];

        const inlineParentheses = /^[^()\s]+\([^()]+\)$/.test(normalized);
        if (inlineParentheses) return [normalized];

        const parts = Array.from(
          normalized.matchAll(/[^()\s]+|\([^()]+\)/g),
          (match) => match[0].replace(/[()-]/g, '').trim()
        ).filter(Boolean);

        return parts.length > 0 ? parts : [normalized.replace(/[()-]/g, '').trim()];
      })
    )
  );
};

const getMetadataValues = (kanji: Kanji, type: ReadingKind, bucket: 'official' | 'variant'): string[] => {
  const metadata = kanjiReadingMetadata[kanji.kanji];
  if (!metadata) return [];

  if (type === 'kunyomi') {
    return bucket === 'official' ? (metadata.officialKunyomi || []) : (metadata.variantKunyomi || []);
  }

  return bucket === 'official' ? (metadata.officialOnyomi || []) : (metadata.variantOnyomi || []);
};

const getRawReadingField = (kanji: Kanji, type: ReadingKind): string => (
  type === 'kunyomi' ? (kanji.kunyomi || '') : (kanji.onyomi || '')
);

const getRawRomajiField = (kanji: Kanji, type: ReadingKind): string => (
  type === 'kunyomi' ? (kanji.kunyomi_romaji || '') : (kanji.onyomi_romaji || '')
);

export const getAcceptedReadingAnswers = (kanji: Kanji, type: ReadingKind): string[] => {
  const primaryKana = splitReadingOptions(getRawReadingField(kanji, type)).flatMap(expandReadingOption);
  const primaryRomaji = splitReadingOptions(getRawRomajiField(kanji, type)).flatMap(expandReadingOption);
  const officialKana = getMetadataValues(kanji, type, 'official');
  const variantKana = getMetadataValues(kanji, type, 'variant');

  const metadataRomaji = [...officialKana, ...variantKana].map(kanaToRomaji);

  return Array.from(
    new Set(
      [...primaryKana, ...primaryRomaji, ...officialKana, ...variantKana, ...metadataRomaji]
        .map(normalizeReadingText)
        .filter(Boolean)
    )
  );
};

export const getPrimaryReadingChoices = (kanji: Kanji, type: ReadingKind): string[] => {
  const primary = getReadingDisplayOptions(getRawReadingField(kanji, type));
  if (primary.length > 0) return primary;

  return getMetadataValues(kanji, type, 'official');
};

export const getReadingHintBase = (kanji: Kanji, type: ReadingKind): string => {
  const primaryRomaji = getReadingDisplayOptions(getRawRomajiField(kanji, type));
  if (primaryRomaji.length > 0) return primaryRomaji[0];

  const primaryKana = getPrimaryReadingChoices(kanji, type);
  return primaryKana[0] || '';
};

export const formatReadingDisplay = (kanji: Kanji, type: ReadingKind): string => {
  const kanaDisplay = getPrimaryReadingChoices(kanji, type).join(' / ');
  const romajiDisplay = getReadingDisplayOptions(getRawRomajiField(kanji, type)).join(' / ');
  return [kanaDisplay, romajiDisplay ? `(${romajiDisplay})` : ''].filter(Boolean).join(' ');
};
