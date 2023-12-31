import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Password = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg height={IconHeight} width={IconWidth} viewBox="0 0 380 380">
      <Path
        id="XMLID_31_"
        d="M290,170H125V95c0-35.841,29.159-65,65-65c35.841,0,65,29.159,65,65v30c0,8.284,6.716,15,15,15
      s15-6.716,15-15V95c0-52.383-42.617-95-95-95c-52.383,0-95,42.617-95,95v75h-5c-13.807,0-25,11.193-25,25v160
      c0,13.807,11.193,25,25,25h200c13.807,0,25-11.193,25-25V195C315,181.193,303.807,170,290,170z M160,255c0-16.569,13.431-30,30-30
      c16.568,0,30,13.431,30,30c0,11.103-6.035,20.789-15,25.977V325h-30v-44.023C166.035,275.789,160,266.103,160,255z"
        fill={IconColor}
      />
    </Svg>
  );
};

export {Password};
