import React, { useState } from 'react';

const TruncateText = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

  return ( 
    <div>
      <span>{isTruncated ? truncatedText : text}</span>
      {text.length > maxLength && (
        <button onClick={toggleTruncate} style={{
            background: 'none',
            border: 'none',
            color: 'blue',
            cursor: 'pointer',
            padding: 2,
            margin: 0,
            textDecoration: 'underline',
        }}>
          {isTruncated ? 'Read More' : 'Read Less'}
        </button>
      )}
    </div>
  );
};

export default TruncateText;