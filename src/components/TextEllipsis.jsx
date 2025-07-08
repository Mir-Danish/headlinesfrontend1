import React, { useRef, useEffect, useState } from 'react';

const TextEllipsis = ({ 
  children, 
  numberOfLines = 1, 
  ellipsizeMode = 'tail',
  style = {},
  className = ''
}) => {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [displayText, setDisplayText] = useState(children);

  useEffect(() => {
    const truncateText = () => {
      if (!textRef.current) return;

      const element = textRef.current;
      const originalText = children;
      
      // Reset to original text
      element.textContent = originalText;
      
      // Check if text needs truncation
      const lineHeight = parseInt(getComputedStyle(element).lineHeight) || 20;
      const maxHeight = lineHeight * numberOfLines;
      
      if (element.scrollHeight <= maxHeight) {
        setIsTruncated(false);
        setDisplayText(originalText);
        return;
      }

      setIsTruncated(true);
      
      // Binary search to find the right truncation point
      let start = 0;
      let end = originalText.length;
      let mid;
      let truncatedText = originalText;

      while (start <= end) {
        mid = Math.floor((start + end) / 2);
        
        if (ellipsizeMode === 'tail') {
          truncatedText = originalText.substring(0, mid) + '...';
        } else if (ellipsizeMode === 'head') {
          truncatedText = '...' + originalText.substring(originalText.length - mid);
        } else if (ellipsizeMode === 'middle') {
          const half = Math.floor(mid / 2);
          truncatedText = originalText.substring(0, half) + '...' + originalText.substring(originalText.length - half);
        }

        element.textContent = truncatedText;
        
        if (element.scrollHeight <= maxHeight) {
          start = mid + 1;
        } else {
          end = mid - 1;
        }
      }

      // Final adjustment
      if (ellipsizeMode === 'tail') {
        truncatedText = originalText.substring(0, end) + '...';
      } else if (ellipsizeMode === 'head') {
        truncatedText = '...' + originalText.substring(originalText.length - end);
      } else if (ellipsizeMode === 'middle') {
        const half = Math.floor(end / 2);
        truncatedText = originalText.substring(0, half) + '...' + originalText.substring(originalText.length - half);
      }

      setDisplayText(truncatedText);
    };

    truncateText();
    
    // Re-run on window resize
    const handleResize = () => {
      setTimeout(truncateText, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [children, numberOfLines, ellipsizeMode]);

  return (
    <div
      ref={textRef}
      style={{
        ...style,
        lineHeight: '1.3',
        overflow: 'hidden',
        wordWrap: 'break-word'
      }}
      className={className}
    >
      {displayText}
    </div>
  );
};

export default TextEllipsis; 