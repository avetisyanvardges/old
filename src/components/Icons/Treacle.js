import React from 'react';
import {Svg, Path, Polygon} from 'react-native-svg';

const Treacle = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <>
      <Svg
        width={IconWidth}
        height={IconHeight}
        viewBox="0 0 8 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M3.12071 5.42268C3.51574 5.84374 4.18426 5.84374 4.57928 5.42268L7.33613 2.48422C7.93524 1.84565 7.48246 0.800013 6.60685 0.800013H1.09315C0.217534 0.800013 -0.235238 1.84565 0.363868 2.48422L3.12071 5.42268Z"
          fill={IconColor}
        />
      </Svg>
    </>
  );
};
export {Treacle};
