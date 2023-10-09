import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Navigation = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg width={IconWidth} height={IconHeight} viewBox="0 0 512 512">
      <Path
        fill={IconColor}
        d="M91.428,195.9l121.991,68.316,30.166,136.633a6,6,0,0,0,11.036,1.739L422.748,115.6a6.008,6.008,0,0,0,.874-2.679v0a5.985,5.985,0,0,0-1.082-3.932l-.084-.116c-.03-.04-.06-.079-.091-.118a5.967,5.967,0,0,0-3.469-2.17,6.054,6.054,0,0,0-1.11-.132h0a5.752,5.752,0,0,0-1.685.2L92.948,184.834a6,6,0,0,0-1.52,11.066ZM252,383.316,225.4,262.794,397.569,134.837ZM390.41,125.207,218.239,253.161,110.632,192.9Z"
      />
    </Svg>
  );
};
export {Navigation};
