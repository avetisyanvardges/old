import React from 'react';
import {Svg, Path, Rect} from 'react-native-svg';

const FacebookIcon = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth}
      height={IconHeight}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M13.5 9v9M18 13.5H9M13.5 1v0C6.596 1 1 6.596 1 13.5v0C1 20.404 6.596 26 13.5 26v0C20.404 26 26 20.404 26 13.5v0"
        stroke="#818195"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M26 13.5v0C26 6.596 20.404 1 13.5 1v0"
        stroke="#818195"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3 3"
      />
    </Svg>
  );
};

export {FacebookIcon};
