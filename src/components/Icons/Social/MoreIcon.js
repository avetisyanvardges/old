import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const MoreIcon = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth}
      height={IconHeight}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        clipRule="evenodd"
        d="M16.335 2.75h-8.67c-3.02 0-4.914 2.14-4.914 5.166v8.168c0 3.027 1.884 5.166 4.915 5.166h8.668c3.03 0 4.917-2.139 4.917-5.166V7.916c0-3.027-1.886-5.166-4.916-5.166z"
        stroke="#130F26"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity={0.4}
        d="M7.52 13.197a1.199 1.199 0 010-2.394 1.199 1.199 0 010 2.395zM12 13.197a1.199 1.199 0 010-2.394 1.199 1.199 0 010 2.395zM16.48 13.197a1.199 1.199 0 010-2.394 1.199 1.199 0 010 2.395z"
        fill="#130F26"
      />
    </Svg>
  );
};

export {MoreIcon};
