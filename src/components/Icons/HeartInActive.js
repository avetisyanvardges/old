import React from 'react';
import {Svg, Path, Defs, LinearGradient, Stop} from 'react-native-svg';

const HeartInActive = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth}
      height={IconHeight}
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.156.693a4.594 4.594 0 013.768-.476c2.706.872 3.546 3.822 2.795 6.17-1.16 3.686-6.11 6.436-6.32 6.552a.496.496 0 01-.48.001c-.209-.114-5.124-2.823-6.322-6.553-.753-2.348.085-5.299 2.788-6.17a4.486 4.486 0 013.771.476zm-3.464.476C1.504 1.874.955 4.227 1.549 6.082c.935 2.908 4.627 5.26 5.609 5.841.984-.588 4.704-2.965 5.608-5.838.594-1.858.043-4.21-2.148-4.916-1.06-.341-2.299-.134-3.154.528a.5.5 0 01-.606.004 3.49 3.49 0 00-3.166-.532zm6.286 1.324a2.35 2.35 0 011.624 2.05.5.5 0 01-.998.08 1.35 1.35 0 00-.932-1.178.5.5 0 01.306-.952z"
        fill="#818195"
      />
    </Svg>
  );
};
export {HeartInActive};
