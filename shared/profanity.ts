const BLOCKLIST = [
  // English
  'asshole', 'bastard', 'bitch', 'bollocks', 'bullshit', 'cock', 'cunt', 'damn', 'dick',
  'dumbass', 'fag', 'faggot', 'fuck', 'fucker', 'fucking', 'motherfucker', 'nigger', 'nigga',
  'piss', 'prick', 'pussy', 'retard', 'shit', 'slut', 'twat', 'whore', 'rat', 'virus',
  // French
  'abruti', 'batard', 'bordel', 'connard', 'connasse', 'encule', 'fdp', 'merde', 'nique',
  'pd', 'pute', 'putain', 'salope', 'salaud', 'trouduc',
  // Spanish
  'cabron', 'cabrona', 'cojones', 'concha', 'gilipollas', 'hijo de puta', 'joder', 'mierda',
  'pendejo', 'perra', 'puta', 'puto', 'verga',
  // Portuguese
  'babaca', 'buceta', 'caralho', 'corno', 'fdp', 'filho da puta', 'merda', 'otario', 'puta',
  'viado',
  // Italian
  'cazzo', 'figa', 'merda', 'puttana', 'stronzo', 'troia', 'vaffanculo',
  // Vietnamese (latin)
  'dit me', 'ditmemay', 'dm', 'dmm', 'vl', 'vcl', 'clgt', 'ngu', 'cho chet', 'thang ngu',
  // Chinese characters
  '傻逼', '操你', '草泥马', '妈的', '他妈', '去死', '贱人', '婊子', '狗屎', '滚蛋',
  // Common leetspeak / variants
  'f u c k', 's h i t', 'sh1t', 'fck', 'fuk', 'btch', 'b1tch', 'a$$', 'a$$hole'
]

const LINK_PATTERNS = [
  /https?:\/\//i,
  /\bwww\./i,
  /\bdiscord\.gg\b/i,
  /\bdiscord(?:app)?\.com\/invite\b/i,
  /\bt\.me\b/i,
  /\btelegram\.(?:me|dog)\b/i,
  /\b[a-z0-9][-a-z0-9]{0,62}\.(com|gg|io|net|org|me|co|xyz|dev|app|link|tv|fr|de|es|pt|it|ru|tk|ml|ga|cf|gq|ly|be|cc|to|sh|ws|info|biz|uk|us|ca|nl|pl|cz|br|au|in|jp|kr|cn)\b/i
]

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[@4àáâãäå]/g, 'a')
    .replace(/[3èéêë€]/g, 'e')
    .replace(/[1!ìíîï|]/g, 'i')
    .replace(/[0òóôõö]/g, 'o')
    .replace(/[$5ß]/g, 's')
    .replace(/[7+]/g, 't')
    .replace(/[^a-z0-9\u4e00-\u9fff\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function matchesTerm(normalized: string, term: string) {
  const normalizedTerm = normalize(term)
  if (!normalizedTerm) return false

  if (normalizedTerm.length <= 3) {
    return normalized.split(' ').includes(normalizedTerm)
  }

  return normalized.includes(normalizedTerm)
}

export function containsProfanity(text: string) {
  const normalized = normalize(text)
  if (!normalized) return false
  return BLOCKLIST.some(term => matchesTerm(normalized, term))
}

export function containsLink(text: string) {
  if (LINK_PATTERNS.some(pattern => pattern.test(text))) return true
  if (/discord[\s.(_-]*gg/i.test(text)) return true
  return false
}

export function validateContent(text: string, fieldName: string) {
  const trimmed = text.trim()
  if (!trimmed) return `${fieldName} is required.`
  if (containsProfanity(trimmed)) return 'Insults and offensive language are not allowed.'
  if (containsLink(trimmed)) return 'Links and advertising are not allowed.'
  return null
}
