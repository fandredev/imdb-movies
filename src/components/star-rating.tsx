import { useState } from 'react';
import Star from './star-item';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starContainerStyle = {
  display: 'flex',
};

type MessageStarRating = 'Terrible' | 'Bad' | 'Okay' | 'Good' | 'Amazing';
type Rating = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface StarRatingProps {
  maxRating?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: MessageStarRating[];
  defaultRating?: Rating;
  onSetRating?: React.Dispatch<React.SetStateAction<number>>;
}

export default function StarRating({
  maxRating = 5,
  color = '#fcc419',
  size = 48,
  className = '',
  messages,
  defaultRating = 0,
  onSetRating,
}: StarRatingProps) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rateIndex: number) {
    const index = rateIndex as Rating;
    setRating(index);
    onSetRating?.(index);
  }

  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {[...Array(maxRating)].map((_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages?.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ''}
      </p>
    </div>
  );
}
