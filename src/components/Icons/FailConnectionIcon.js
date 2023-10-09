import React from 'react';
import {Svg, Path} from 'react-native-svg';

const FailConnectionIcon = ({
  IconWidth,
  IconHeight,
  IconBgColor,
  IconColor,
}) => {
  return (
    <Svg
      width={IconWidth}
      height={IconHeight}
      viewBox="0 0 91 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M88.126 50.475l-7.368-7.37a2.347 2.347 0 01-.686-1.66v-6.633c0-46.416-70.143-46.416-70.143 0v6.633c0 .622-.247 1.22-.686 1.66l-7.368 7.37c-4.598 4.6.07 11.468 5.344 10.561 1.426-.245 2.711.92 2.711 2.366v14.796c0 5.932 6.875 7.316 10.08 4.15.884-.873 2.333-.88 3.215-.007 1.056 1.047 2.513 1.595 3.99 1.65a6.602 6.602 0 001.803-.18l.04-.012c.179-.045.355-.098.53-.159l.103-.038c.152-.056.301-.117.447-.185l.124-.062a5.35 5.35 0 001.015-.643c.143-.115.283-.235.415-.365.883-.872 2.332-.88 3.214-.006 1.073 1.064 2.559 1.61 4.06 1.65.108.004.215 0 .323 0 .112-.003.223-.006.334-.014 1.4-.099 2.764-.637 3.767-1.629.884-.872 2.333-.88 3.215-.006 1.072 1.063 2.558 1.61 4.06 1.65.108.004.216 0 .324 0 .107-.003.214-.006.32-.014 1.402-.097 2.768-.637 3.772-1.63.884-.872 2.333-.88 3.215-.006.253.25.533.464.826.658.105.07.211.138.32.2l.144.075c.22.117.448.22.682.309.056.02.11.045.167.064.106.038.215.068.324.099.084.023.167.046.252.067a6.626 6.626 0 00.605.113c.093.013.187.028.281.037.142.013.283.02.425.026.063.002.127.006.19.007.186 0 .372-.007.557-.022 1.38-.111 2.72-.653 3.71-1.634.882-.873 2.331-.866 3.214.007 3.206 3.166 10.08 1.782 10.08-4.15V63.402c0-1.447 1.285-2.611 2.711-2.366 5.274.907 9.941-5.962 5.344-10.561h-.002z"
        fill={IconBgColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60.116 62.053c-1.996 4.024-8.443 3.87-10.34-.163-1.378-2.933-1.062-6.784-1.015-10.287a.632.632 0 01.625-.628c1.156-.017 2.316-.04 3.485-.07.353-.008.65.271.655.625.048 2.823.205 4.553.469 7.624.028.33.304.584.635.584h.72a.639.639 0 00.636-.584c.265-3.081.422-4.814.469-7.65a.637.637 0 01.638-.625h3.482c.35 0 .633.281.637.632.044 3.567.397 7.531-1.097 10.543h.001zm3.494-12.556v-.311c0-.34-.268-.62-.608-.638-12.712-.671-23.552-.671-36.264-.001a.643.643 0 00-.608.639v.68c0 .34.27.62.608.639 6.628.35 12.746.516 18.886.502a.64.64 0 01.639.672c-.175 3.346-.362 6.425.442 9.258 2.261 7.968 13.466 8.631 16.285.844 1.361-3.758.778-8.071.62-12.283v-.001zM59.428 34.784a1.201 1.201 0 00-1.636.01 79.05 79.05 0 01-4.24 3.64 1.196 1.196 0 01-1.679-1.68 79.317 79.317 0 013.646-4.25 1.196 1.196 0 000-1.628 79.66 79.66 0 01-3.646-4.25 1.196 1.196 0 011.679-1.679 79.043 79.043 0 014.248 3.648 1.196 1.196 0 001.629 0 78.598 78.598 0 014.248-3.647 1.194 1.194 0 011.678 1.679 79.442 79.442 0 01-3.646 4.25 1.197 1.197 0 000 1.628 79 79 0 013.646 4.25c.38.473.339 1.16-.09 1.59a1.173 1.173 0 01-1.576.077c-1.136-.935-3.165-2.624-4.262-3.637h.001zM24.644 36.754a79.679 79.679 0 013.646-4.25 1.196 1.196 0 000-1.63 79.325 79.325 0 01-3.646-4.248 1.196 1.196 0 011.679-1.68 79.322 79.322 0 014.247 3.648 1.196 1.196 0 001.63 0 79.036 79.036 0 014.247-3.648 1.194 1.194 0 011.68 1.68 79.645 79.645 0 01-3.647 4.248 1.197 1.197 0 000 1.63 79.032 79.032 0 013.646 4.25 1.196 1.196 0 01-1.678 1.679 79.036 79.036 0 01-4.248-3.648 1.196 1.196 0 00-1.63 0 78.959 78.959 0 01-4.247 3.648 1.194 1.194 0 01-1.68-1.68v.001z"
        fill={IconColor}
      />
    </Svg>
  );
};
export {FailConnectionIcon};
