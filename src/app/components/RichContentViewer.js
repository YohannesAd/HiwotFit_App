'use client';

import { parseNoteContent } from '@/utils/noteContent';
import styles from '@/app/styles/RichContentViewer.module.css';

export default function RichContentViewer({ content }) {
  if (!content) return null;
  return (
    <div className={styles.richContentViewer}>
      {parseNoteContent(content).map((part, index) => {
        if (part.type === 'text') return part.text ? (
          <div key={index} className={styles.textContent}>
            {part.text.split('\n').map((line, lineIndex) => <div key={lineIndex} className={styles.textLine}>{line || '\u00A0'}</div>)}
          </div>
        ) : null;
        return (
          <div key={index} className={styles.embeddedMedia}>
            <div className={styles.mediaContainer}>
              {part.type === 'image' ? <img src={part.dataUrl} alt={part.fileName} className={styles.embeddedImage} loading="lazy" /> : <video src={part.dataUrl} controls className={styles.embeddedVideo} preload="metadata" />}
              <div className={styles.mediaCaption}><span className={styles.fileName}>{part.fileName}</span></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
