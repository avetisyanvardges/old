import React from 'react';
import {Svg, Path} from 'react-native-svg';

const MoreSqare = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth}
      height={IconHeight}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M28.668 0C35.4756 0 40 4.85901 40 11.832V28.168C40 35.1413 35.4752 40 28.666 40H11.33C4.52139 40 0 35.1421 0 28.168V11.832C0 4.86519 4.53485 0 11.33 0H28.668ZM28.668 3H11.33C6.24068 3 3 6.47674 3 11.832V28.168C3 33.5315 6.22828 37 11.33 37H28.666C33.7688 37 37 33.5303 37 28.168V11.832C37 6.46993 33.769 3 28.668 3ZM11.0402 17.6044C12.3622 17.6044 13.4362 18.6804 13.4362 20.0004C13.4362 21.3204 12.3622 22.3944 11.0402 22.3944C9.7182 22.3944 8.6442 21.3204 8.6442 20.0004C8.6442 18.6804 9.7182 17.6044 11.0402 17.6044ZM19.999 17.6044C21.321 17.6044 22.395 18.6804 22.395 20.0004C22.395 21.3204 21.321 22.3944 19.999 22.3944C18.677 22.3944 17.603 21.3204 17.603 20.0004C17.603 18.6804 18.677 17.6044 19.999 17.6044ZM28.957 17.6044C30.279 17.6044 31.353 18.6804 31.353 20.0004C31.353 21.3204 30.279 22.3944 28.957 22.3944C27.635 22.3944 26.561 21.3204 26.561 20.0004C26.561 18.6804 27.635 17.6044 28.957 17.6044Z"
        fill={IconColor}
      />
    </Svg>
  );
};
export {MoreSqare};
