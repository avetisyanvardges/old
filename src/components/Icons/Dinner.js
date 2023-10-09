import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Dinner = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg width={IconWidth} height={IconHeight} viewBox="0 0 512 512">
      <Path
        fill={IconColor}
        d="M256,120c-74.99,0-136,61.009-136,136s61.01,136,136,136,136-61.009,136-136S330.99,120,256,120Zm0,256A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z"
      />
      <Path
        fill={IconColor}
        d="M48,99.647a8,8,0,0,0,8-8v-48a8,8,0,1,0-16,0v48A8,8,0,0,0,48,99.647Z"
      />
      <Path
        fill={IconColor}
        d="M80,99.647a8,8,0,0,0,8-8v-48a8,8,0,1,0-16,0v48A8,8,0,0,0,80,99.647Z"
      />
      <Path
        fill={IconColor}
        d="M448,32a48.055,48.055,0,0,0-48,48v27.647a48.016,48.016,0,0,0,24,41.57v31.767C395.234,116.814,330.754,72,256,72S116.766,116.814,88,180.984v-31.8a48.014,48.014,0,0,0,24-41.542v-64a8,8,0,1,0-16,0v64a32,32,0,0,1-64,0v-64a8,8,0,1,0-16,0v64a48.014,48.014,0,0,0,24,41.542V395.65a24,24,0,0,0,48,0V331.016C116.766,395.186,181.245,440,256,440s139.234-44.814,168-108.984v64.631a24,24,0,0,0,48,0V149.217a48.016,48.016,0,0,0,24-41.57V80A48.055,48.055,0,0,0,448,32ZM72,395.65a8,8,0,0,1-16,0V154.968a47.468,47.468,0,0,0,16,0ZM256,424c-92.636,0-168-75.364-168-168S163.364,88,256,88s168,75.364,168,168S348.636,424,256,424ZM480,107.647a32.016,32.016,0,0,1-19.2,29.332,8,8,0,0,0-4.8,7.33V395.647a8,8,0,0,1-16,0V144.309a8,8,0,0,0-4.8-7.33A32.016,32.016,0,0,1,416,107.647V80a32,32,0,0,1,64,0Z"
      />
      <Path
        fill={IconColor}
        d="M448,59.647a8,8,0,1,0,0,16,8.009,8.009,0,0,1,8,8v16a8.009,8.009,0,0,1-8,8,8,8,0,0,0,0,16,24.027,24.027,0,0,0,24-24v-16A24.027,24.027,0,0,0,448,59.647Z"
      />
    </Svg>
  );
};

export {Dinner};
