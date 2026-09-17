export const MAX_NOTE_TEXT_LENGTH = 50000;
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
// Keep JSON requests below hosting limits and documents below MongoDB's limit.
export const MAX_NOTE_CONTENT_BYTES = 4 * 1024 * 1024;

const mediaPattern = () => /\[(IMAGE|VIDEO):([^:\]]+):([^:\]]+):(data:(?:image|video)\/[^;\]]+;base64,[A-Za-z0-9+/=]+)\]/g;

export function parseNoteContent(content = '') {
  const parts = [];
  let offset = 0;
  for (const match of content.matchAll(mediaPattern())) {
    parts.push({ type: 'text', text: content.slice(offset, match.index) });
    let fileName = match[3];
    // New uploads encode filenames so brackets and colons cannot break the format.
    if (match[2].startsWith('image_')) {
      try { fileName = decodeURIComponent(fileName); } catch { /* Keep legacy names. */ }
    }
    parts.push({ type: match[1].toLowerCase(), id: match[2], fileName, dataUrl: match[4], raw: match[0] });
    offset = match.index + match[0].length;
  }
  parts.push({ type: 'text', text: content.slice(offset) });
  return parts;
}

export function serializeNoteContent(parts) {
  return parts.map(part => part.type === 'text' ? part.text :
    (part.raw || `[${part.type.toUpperCase()}:${part.id}:${encodeURIComponent(part.fileName)}:${part.dataUrl}]`)
  ).join('');
}

export function getNoteTextLength(content) {
  return typeof content === 'string' ? content.replace(mediaPattern(), '').length : 0;
}

export function getNoteContentError(content) {
  if (typeof content !== 'string' || !content.trim()) return 'Please write a note or add a picture.';
  if (getNoteTextLength(content) > MAX_NOTE_TEXT_LENGTH) return 'Note text cannot exceed 50,000 characters.';
  // JSON escaping and UTF-8 both affect the actual request size.
  if (new TextEncoder().encode(JSON.stringify(content)).length > MAX_NOTE_CONTENT_BYTES) {
    return 'This note is too large. Remove a picture or choose smaller pictures (4 MB total).';
  }
  return '';
}
