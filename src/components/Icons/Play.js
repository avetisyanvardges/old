import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Play = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg width={IconWidth} height={IconHeight} viewBox="0 0 512 512" s>
      <Path
        fill={IconColor}
        d="M256,0C114.833,0,0,114.844,0,256s114.833,256,256,256s256-114.844,256-256S397.167,0,256,0z M357.771,264.969
			l-149.333,96c-1.75,1.135-3.771,1.698-5.771,1.698c-1.75,0-3.521-0.438-5.104-1.302C194.125,359.49,192,355.906,192,352V160
			c0-3.906,2.125-7.49,5.563-9.365c3.375-1.854,7.604-1.74,10.875,0.396l149.333,96c3.042,1.958,4.896,5.344,4.896,8.969
			S360.813,263.01,357.771,264.969z"
      />
    </Svg>
  );
};
export {Play};
