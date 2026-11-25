// Regex estrita para emojis reais (exclui dígitos ASCII 0-9, #, *, etc.)
const STRICT_EMOJI_REGEX = /([\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}])/gu;

/**
 * Envolve somente emojis reais em span para 100% de opacidade,
 * sem jamais tocar em dígitos numéricos normais (0-9).
 */
export function formatEmojisFullOpacity(str) {
  if (!str || typeof str !== 'string') return str;

  return str.replace(STRICT_EMOJI_REGEX, (match) => {
    return `<span class="emoji-full inline-block align-baseline" style="opacity: 1 !important; filter: none !important;">${match}</span>`;
  });
}
