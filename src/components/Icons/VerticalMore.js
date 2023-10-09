import React from 'react';
import {Svg, Path, Circle} from 'react-native-svg';

const VerticalMore = ({IconHeight, IconWidth, IconColor}) => {
  return (
    <>
      <Svg width={IconWidth} height={IconHeight} viewBox="0 0 4 16" fill="none">
        <Path fill={IconColor} />
        <Path fill={IconColor} />
        <Path fill={IconColor} />
      </Svg>
    </>
  );
};
export {VerticalMore};
