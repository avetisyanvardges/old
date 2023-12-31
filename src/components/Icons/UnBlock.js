import React from 'react';
import {Svg, Path} from 'react-native-svg';

const UnBlock = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg height={IconHeight} viewBox="0 0 512 512" width={IconWidth}>
      <Path
        fill={IconColor}
        d="M409.6,204.8h-256V128c0-56.559,45.841-102.4,102.4-102.4S358.4,71.441,358.4,128H384C384,57.421,326.579,0,256,0
			S128,57.421,128,128v76.8h-25.6c-14.14,0-25.6,11.46-25.6,25.6v256c0,14.14,11.46,25.6,25.6,25.6h307.2
			c14.14,0,25.6-11.46,25.6-25.6v-256C435.2,216.26,423.74,204.8,409.6,204.8z M409.6,486.4H102.4v-256h307.2V486.4z"
      />
      <Path
        fill={IconColor}
        d="M256,307.2c-21.171,0-38.4,17.229-38.4,38.4c0,16.666,10.735,30.737,25.6,36.045V422.4h25.6v-40.755
			c14.865-5.299,25.6-19.379,25.6-36.045C294.4,324.429,277.171,307.2,256,307.2z M256,358.4c-7.066,0-12.8-5.734-12.8-12.8
			c0-7.066,5.734-12.8,12.8-12.8c7.066,0,12.8,5.734,12.8,12.8C268.8,352.666,263.066,358.4,256,358.4z"
      />
    </Svg>
  );
};
export {UnBlock};
