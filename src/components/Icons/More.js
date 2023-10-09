import React from 'react';
import {Svg, Path, Circle} from 'react-native-svg';

const More = ({IconHeight, IconWidth, IconColor}) => {
  return (
    <Svg height={IconHeight} viewBox="0 0 426.667 426.667" width={IconWidth}>
      <Circle cx="42.667" cy="213.333" r="42.667" fill={IconColor} />

      <Circle cx="213.333" cy="213.333" r="42.667" fill={IconColor} />

      <Circle cx="384" cy="213.333" r="42.667" fill={IconColor} />
    </Svg>
  );
};
export {More};
