import { useState, useEffect } from "react";
import {
  TiStarHalfOutline,
  TiStarFullOutline,
  TiStarOutline,
} from "react-icons/ti";

function useRating(rating, size) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    let tempStars = [];
    let integerPart = Math.floor(rating);
    let fractionalPart = rating % 1;

    // Add full stars
    for (let i = 0; i < integerPart; i++) {
      tempStars.push(<TiStarFullOutline key={i} color="red" size={size} />);
    }

    // Add half star if fractional part is >= 0.5
    if (fractionalPart >= 0.5) {
      tempStars.push(
        <TiStarHalfOutline key={integerPart} color="red" size={size} />
      );
    }

    // Add empty stars to fill up to 5 stars
    while (tempStars.length < 5) {
      tempStars.push(
        <TiStarOutline key={tempStars.length} color="red" size={size} />
      );
    }

    setStars(tempStars);
  }, [rating, size]);

  return stars;
}

export default useRating;
