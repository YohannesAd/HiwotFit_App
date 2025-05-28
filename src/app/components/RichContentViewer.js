'use client';

/**
 * Rich Content Viewer Component
 * 
 * Displays rich text content with embedded images and videos
 * in a read-only format for viewing notes.
 */

import styles from '@/app/styles/RichContentViewer.module.css';

const RichContentViewer = ({ content }) => {
  if (!content) return null;

  // Parse and render content with embedded media
  const renderContent = (text) => {
    // Split content by media placeholders
    const parts = text.split(/(\[(?:IMAGE|VIDEO):[^\]]+\])/g);
    
    return parts.map((part, index) => {
      // Check if this part is a media placeholder
      const mediaMatch = part.match(/\[(IMAGE|VIDEO):([^:]+):([^:]+):([^\]]+)\]/);
      
      if (mediaMatch) {
        const [, type, mediaId, fileName, dataUrl] = mediaMatch;
        
        if (type === 'IMAGE') {
          return (
            <div key={index} className={styles.embeddedMedia}>
              <div className={styles.mediaContainer}>
                <img 
                  src={dataUrl} 
                  alt={fileName}
                  className={styles.embeddedImage}
                  loading="lazy"
                />
                <div className={styles.mediaCaption}>
                  <span className={styles.fileName}>{fileName}</span>
                </div>
              </div>
            </div>
          );
        } else if (type === 'VIDEO') {
          return (
            <div key={index} className={styles.embeddedMedia}>
              <div className={styles.mediaContainer}>
                <video 
                  src={dataUrl} 
                  controls
                  className={styles.embeddedVideo}
                  preload="metadata"
                />
                <div className={styles.mediaCaption}>
                  <span className={styles.fileName}>{fileName}</span>
                </div>
              </div>
            </div>
          );
        }
      }
      
      // Regular text content - preserve line breaks
      if (part.trim()) {
        return (
          <div key={index} className={styles.textContent}>
            {part.split('\n').map((line, lineIndex) => (
              <div key={lineIndex} className={styles.textLine}>
                {line || '\u00A0'} {/* Non-breaking space for empty lines */}
              </div>
            ))}
          </div>
        );
      }
      
      return null;
    }).filter(Boolean);
  };

  return (
    <div className={styles.richContentViewer}>
      {renderContent(content)}
    </div>
  );
};

export default RichContentViewer;
