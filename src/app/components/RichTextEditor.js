'use client';

/**
 * Rich Text Editor Component
 *
 * A simplified rich text editor that allows users to embed images and videos
 * with a clean, block-based approach.
 */

import { useState, useRef, useEffect } from 'react';
import styles from '@/app/styles/RichTextEditor.module.css';

const RichTextEditor = ({
  content,
  onChange,
  placeholder = "Start writing your note...",
  disabled = false,
  maxLength = 50000
}) => {
  const [textContent, setTextContent] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const fileInputRef = useRef(null);

  // Parse content on mount and when content prop changes
  useEffect(() => {
    if (content !== undefined) {
      parseContent(content);
    }
  }, [content]);

  // Parse content to separate text and media
  const parseContent = (rawContent) => {
    if (!rawContent) {
      setTextContent('');
      setMediaItems([]);
      return;
    }

    const parts = rawContent.split(/(\[(?:IMAGE|VIDEO):[^\]]+\])/g);
    let text = '';
    const media = [];

    parts.forEach((part, index) => {
      const mediaMatch = part.match(/\[(IMAGE|VIDEO):([^:]+):([^:]+):([^\]]+)\]/);
      if (mediaMatch) {
        const [, type, mediaId, fileName, dataUrl] = mediaMatch;
        media.push({
          id: mediaId,
          type: type.toLowerCase(),
          fileName,
          dataUrl,
          position: text.length
        });
        text += `[${type}:${fileName}]`;
      } else {
        text += part;
      }
    });

    setTextContent(text);
    setMediaItems(media);
  };

  // Combine text and media back into rich content
  const combineContent = (text, media) => {
    let result = text;

    // Sort media by position (reverse order to maintain positions)
    const sortedMedia = [...media].sort((a, b) => b.position - a.position);

    sortedMedia.forEach(item => {
      const placeholder = `[${item.type.toUpperCase()}:${item.fileName}]`;
      const fullPlaceholder = `[${item.type.toUpperCase()}:${item.id}:${item.fileName}:${item.dataUrl}]`;
      result = result.replace(placeholder, fullPlaceholder);
    });

    return result;
  };

  // Handle text content change
  const handleTextChange = (newText) => {
    setTextContent(newText);
    const combinedContent = combineContent(newText, mediaItems);
    onChange(combinedContent);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        addMediaItem(file, reader.result);
      };

      reader.onerror = () => {
        alert(`Failed to read file "${file.name}". Please try again.`);
      };

      reader.readAsDataURL(file);
    });

    // Clear the input
    e.target.value = '';
  };

  // Add media item
  const addMediaItem = (file, dataUrl) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      alert('Only images and videos can be embedded in the content.');
      return;
    }

    const mediaId = `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newMediaItem = {
      id: mediaId,
      type: isImage ? 'image' : 'video',
      fileName: file.name,
      dataUrl: dataUrl,
      position: textContent.length
    };

    const updatedMedia = [...mediaItems, newMediaItem];
    setMediaItems(updatedMedia);

    // Add placeholder to text
    const placeholder = `\n[${newMediaItem.type.toUpperCase()}:${newMediaItem.fileName}]\n`;
    const newText = textContent + placeholder;
    setTextContent(newText);

    // Update combined content
    const combinedContent = combineContent(newText, updatedMedia);
    onChange(combinedContent);
  };

  // Remove media item
  const removeMediaItem = (mediaId) => {
    const mediaToRemove = mediaItems.find(item => item.id === mediaId);
    if (!mediaToRemove) return;

    const placeholder = `[${mediaToRemove.type.toUpperCase()}:${mediaToRemove.fileName}]`;
    const newText = textContent.replace(placeholder, '');
    const updatedMedia = mediaItems.filter(item => item.id !== mediaId);

    setTextContent(newText);
    setMediaItems(updatedMedia);

    const combinedContent = combineContent(newText, updatedMedia);
    onChange(combinedContent);
  };

  // Render the editor content with media
  const renderEditorContent = () => {
    const parts = textContent.split(/(\[(?:IMAGE|VIDEO):[^\]]+\])/g);

    return parts.map((part, index) => {
      // Check if this part is a media placeholder
      const mediaMatch = part.match(/\[(IMAGE|VIDEO):([^\]]+)\]/);

      if (mediaMatch) {
        const [, type, fileName] = mediaMatch;
        const mediaItem = mediaItems.find(item =>
          item.fileName === fileName && item.type.toUpperCase() === type
        );

        if (mediaItem) {
          return (
            <div key={index} className={styles.embeddedMedia}>
              <div className={styles.mediaContainer}>
                {mediaItem.type === 'image' ? (
                  <img
                    src={mediaItem.dataUrl}
                    alt={mediaItem.fileName}
                    className={styles.embeddedImage}
                  />
                ) : (
                  <video
                    src={mediaItem.dataUrl}
                    controls
                    className={styles.embeddedVideo}
                  />
                )}
                <div className={styles.mediaCaption}>
                  <span className={styles.fileName}>{mediaItem.fileName}</span>
                  <button
                    className={styles.removeMediaButton}
                    onClick={() => removeMediaItem(mediaItem.id)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          );
        }
      }

      // Regular text content
      return (
        <div key={index} className={styles.textContent}>
          {part.split('\n').map((line, lineIndex) => (
            <div key={lineIndex} className={styles.textLine}>
              {line || '\u00A0'}
            </div>
          ))}
        </div>
      );
    });
  };

  return (
    <div className={styles.richTextEditor}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        disabled={disabled}
        accept="image/*,video/*"
      />

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            fileInputRef.current.accept = 'image/*';
            fileInputRef.current.click();
          }}
          disabled={disabled}
          title="Insert Image"
        >
          🖼️ Image
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            fileInputRef.current.accept = 'video/*';
            fileInputRef.current.click();
          }}
          disabled={disabled}
          title="Insert Video"
        >
          🎥 Video
        </button>
        <div className={styles.toolbarDivider}></div>
        <span className={styles.toolbarHint}>
          Click buttons above to add media
        </span>
      </div>

      {/* Editor Area */}
      <div className={styles.editorContainer}>
        {/* Text Input */}
        <textarea
          value={textContent}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={placeholder}
          className={styles.textInput}
          maxLength={maxLength}
          disabled={disabled}
        />

        {/* Media Display */}
        <div className={styles.mediaDisplay}>
          {mediaItems.map((item) => (
            <div key={item.id} className={styles.embeddedMedia}>
              <div className={styles.mediaContainer}>
                {item.type === 'image' ? (
                  <img
                    src={item.dataUrl}
                    alt={item.fileName}
                    className={styles.embeddedImage}
                  />
                ) : (
                  <video
                    src={item.dataUrl}
                    controls
                    className={styles.embeddedVideo}
                  />
                )}
                <div className={styles.mediaCaption}>
                  <span className={styles.fileName}>{item.fileName}</span>
                  <button
                    className={styles.removeMediaButton}
                    onClick={() => removeMediaItem(item.id)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Character Count */}
      <div className={styles.characterCount}>
        {textContent.length}/{maxLength} characters
      </div>
    </div>
  );
};

export default RichTextEditor;
