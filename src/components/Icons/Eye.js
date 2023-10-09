import React from 'react';
import {Svg, Path, G} from 'react-native-svg';

const Eye = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth}
      height={IconHeight}
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0029 0.00050354C14.1389 0.00350354 17.8529 2.9025 19.9389 7.7565C20.0209 7.9455 20.0209 8.1595 19.9389 8.3485C17.8539 13.2035 14.1389 16.1025 10.0029 16.1055H9.99687C5.86087 16.1025 2.14687 13.2035 0.0608721 8.3485C-0.0201279 8.1595 -0.0201279 7.9455 0.0608721 7.7565C2.14687 2.9025 5.86187 0.00350354 9.99687 0.00050354H10.0029ZM9.99987 1.5005C6.56387 1.5015 3.42987 3.9445 1.56987 8.0525C3.42987 12.1615 6.56287 14.6045 9.99987 14.6055C13.4369 14.6045 16.5699 12.1615 18.4299 8.0525C16.5699 3.9445 13.4369 1.5015 9.99987 1.5005ZM9.99957 4.1413C12.1566 4.1413 13.9116 5.8963 13.9116 8.0533C13.9116 10.2093 12.1566 11.9633 9.99957 11.9633C7.84257 11.9633 6.08857 10.2093 6.08857 8.0533C6.08857 5.8963 7.84257 4.1413 9.99957 4.1413ZM9.99957 5.6413C8.66957 5.6413 7.58857 6.7233 7.58857 8.0533C7.58857 9.3823 8.66957 10.4633 9.99957 10.4633C11.3296 10.4633 12.4116 9.3823 12.4116 8.0533C12.4116 6.7233 11.3296 5.6413 9.99957 5.6413Z"
        fill={IconColor}
      />
    </Svg>
  );
};
export {Eye};
