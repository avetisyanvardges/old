import React from 'react';
import {Svg, Path} from 'react-native-svg';

const ZoomOut = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg width={IconWidth} height={IconHeight} viewBox="0 0 511.944 511.944">
      <Path
        fill={IconColor}
        d="M255-1C113.618-1-1,113.618-1,255s114.618,256,256,256s256-114.618,256-256S396.382-1,255-1z M255,468.333
				c-117.818,0-213.333-95.515-213.333-213.333S137.182,41.667,255,41.667S468.333,137.182,468.333,255S372.818,468.333,255,468.333
				z"
      />
      <Path
        fill={IconColor}
        d="M382.996,233.667H127.038c-11.782,0-21.333,9.551-21.333,21.333s9.551,21.333,21.333,21.333h255.957
				c11.782,0,21.333-9.551,21.333-21.333S394.778,233.667,382.996,233.667z"
      />
    </Svg>
  );
};

export {ZoomOut};
