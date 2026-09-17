'use client';

import { useMemo, useRef, useState } from 'react';
import { parseNoteContent, serializeNoteContent, getNoteTextLength, getNoteContentError, MAX_IMAGE_BYTES } from '@/utils/noteContent';
import styles from '@/app/styles/RichTextEditor.module.css';

const readImage = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(new Error('Could not read ' + file.name + '. Please try again.'));
  reader.readAsDataURL(file);
});

export default function RichTextEditor({ content = '', onChange, onBusyChange, placeholder = 'Start writing your note...', disabled = false, maxLength = 50000 }) {
  const parts = useMemo(() => parseNoteContent(content), [content]);
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const contentRef = useRef(content);
  contentRef.current = content;
  const textLength = getNoteTextLength(content);
  const locked = disabled || isReading;

  const updateText = (index, text) => {
    const updated = parts.map((part, i) => i === index ? { type: 'text', text } : part);
    onChange(serializeNoteContent(updated));
  };

  const removeImage = index => {
    setError('');
    onChange(serializeNoteContent(parts.filter((_, i) => i !== index)));
  };

  const handleFileUpload = async event => {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length || locked) return;
    setError('');
    if (files.some(file => !/^image\/(jpeg|png|gif|webp|avif)$/i.test(file.type))) {
      setError('Choose a JPG, PNG, GIF, WebP, or AVIF picture.');
      return;
    }
    if (files.some(file => file.size > MAX_IMAGE_BYTES)) {
      setError('Each picture must be 2 MB or smaller. Choose a smaller copy.');
      return;
    }
    setIsReading(true);
    onBusyChange?.(true);
    try {
      // Read the whole selection together so callbacks cannot overwrite other images.
      const images = await Promise.all(files.map(async file => ({
        type: 'image',
        id: 'image_' + crypto.randomUUID(),
        fileName: file.name,
        dataUrl: await readImage(file),
      })));
      const updated = parseNoteContent(contentRef.current);
      images.forEach(image => updated.push(image, { type: 'text', text: '' }));
      const nextContent = serializeNoteContent(updated);
      const validationError = getNoteContentError(nextContent);
      if (validationError) throw new Error(validationError);
      onChange(nextContent);
    } catch (uploadError) {
      setError(uploadError.message || 'Could not add the pictures. Please try again.');
    } finally {
      setIsReading(false);
      onBusyChange?.(false);
    }
  };

  return (
    <div className={styles.richTextEditor}>
      <input ref={fileInputRef} type="file" multiple accept="image/jpeg,image/png,image/gif,image/webp,image/avif" onChange={handleFileUpload} hidden disabled={locked} aria-label="Choose pictures" />
      <div className={styles.toolbar}>
        <button type="button" className={styles.toolbarButton} onClick={() => fileInputRef.current.click()} disabled={locked} title="Insert Image">
          {isReading ? 'Adding pictures...' : '??? Image'}
        </button>
        <span className={styles.toolbarHint}>Add pictures to your note ? Up to 2 MB each</span>
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.editorContainer}>
        {parts.map((part, index) => part.type === 'text' ? (
          <textarea key={'text-' + index} aria-label={index === 0 ? 'Note text' : 'Note text after picture'} value={part.text} onChange={event => updateText(index, event.target.value)} placeholder={index === 0 ? placeholder : 'Continue writing...'} className={styles.textInput} maxLength={Math.max(0, maxLength - textLength + part.text.length)} disabled={locked} />
        ) : (
          <div key={part.id} className={styles.embeddedMedia}>
            <div className={styles.mediaContainer}>
              {part.type === 'image' ? <img src={part.dataUrl} alt={part.fileName} className={styles.embeddedImage} /> : <video src={part.dataUrl} controls className={styles.embeddedVideo} />}
              <div className={styles.mediaCaption}>
                <span className={styles.fileName}>{part.fileName}</span>
                <button type="button" aria-label={'Remove ' + part.fileName} className={styles.removeMediaButton} onClick={() => removeImage(index)} disabled={locked}>?</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.characterCount}>{textLength}/{maxLength} characters</div>
    </div>
  );
}
