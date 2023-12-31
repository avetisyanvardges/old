import React from 'react';
import {Svg, Path, G} from 'react-native-svg';

const AppleIcon = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <>
      <Svg
        width={IconWidth}
        height={IconHeight}
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <G clip-path="url(#clip0)">
          <Path
            d="M15.769 0C15.822 0 15.875 0 15.931 0C16.061 1.606 15.448 2.806 14.703 3.675C13.972 4.538 12.971 5.375 11.352 5.248C11.244 3.665 11.858 2.554 12.602 1.687C13.292 0.879 14.557 0.16 15.769 0Z"
            fill={IconColor}
          />
          <Path
            d="M20.67 16.716C20.67 16.732 20.67 16.746 20.67 16.761C20.215 18.139 19.566 19.32 18.774 20.416C18.051 21.411 17.165 22.75 15.583 22.75C14.216 22.75 13.308 21.871 11.907 21.847C10.425 21.823 9.61 22.582 8.255 22.773C8.1 22.773 7.945 22.773 7.793 22.773C6.798 22.629 5.995 21.841 5.41 21.131C3.685 19.033 2.352 16.323 2.104 12.855C2.104 12.515 2.104 12.176 2.104 11.836C2.209 9.354 3.415 7.336 5.018 6.358C5.864 5.838 7.027 5.395 8.322 5.593C8.877 5.679 9.444 5.869 9.941 6.057C10.412 6.238 11.001 6.559 11.559 6.542C11.937 6.531 12.313 6.334 12.694 6.195C13.81 5.792 14.904 5.33 16.346 5.547C18.079 5.809 19.309 6.579 20.069 7.767C18.603 8.7 17.444 10.106 17.642 12.507C17.818 14.688 19.086 15.964 20.67 16.716Z"
            fill={IconColor}
          />
        </G>
      </Svg>
    </>
  );
};
export {AppleIcon};
