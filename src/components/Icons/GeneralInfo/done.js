import React from 'react';
import {
  Svg,
  Path,
  G,
  Rect,
  ClipPath,
  Defs,
  Pattern,
  Use,
  Image,
} from 'react-native-svg';

const Done = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth}
      height={IconHeight}
      viewBox="0 0 242 229"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M121.925 161.924L123.6 177.124L127.215 179.24L130.142 196.591L139.259 198.742L153.683 218.209L150.738 222.106L147.106 225.474C152.836 224.522 158.426 223.129 163.857 221.313V221.295L174.155 212.99L186.234 189.996L197.519 183.013L214.518 158.768L210.427 139.265L212.261 139.53L219.402 133.905L232.733 115.813L239.892 101.107L238.234 94.794L231.516 76.2614L233.05 76.7375C231.516 72.6466 229.753 68.6791 227.76 64.8174C222.664 54.8899 216.069 45.7911 208.276 37.8208C207.024 36.5512 205.754 35.2993 204.431 34.0826C203.991 33.677 203.55 33.2714 203.109 32.8659C202.227 32.0724 201.328 31.2789 200.411 30.503C195.403 25.9007 188.914 21.5277 180.644 17.1899L171.792 25.2483L167.684 42.3526L164.545 50.1641L162.006 59.2453L173.009 62.049L182.954 66.6689L208.822 99.2552L212.067 101.318L214.588 94.988L213.883 91.7434L216.598 89.3982L220.213 92.8896L223.317 95.8873L228.642 101.036L225.38 108.213L223.652 104.016L218.767 102.5L217.745 109.43L218.097 115.002L214.623 117.241L214.482 130.008L208.752 134.257L207.905 131.789L201.663 126.128L191.065 131.242L184.118 130.202L171.228 140.094L161.97 141.469L154.917 151.838L121.925 161.924Z"
        fill="#71EEFB"
      />
      <Path
        d="M153.947 24.0669L154.511 30.8381L148.392 42.9169L142.009 40.7832L141.445 34.012L127.021 25.1778L130.935 16.9783C132.416 13.5222 135.978 11.4591 139.716 11.8823L144.654 12.4465L157.632 15.1621L161.917 18.1597L162.269 23.7318L153.947 24.0669Z"
        fill="#71EEFB"
      />
      <Path
        d="M18.7527 99.3258C14.027 131.101 23.2315 161.712 41.7641 185.006L43.4569 184.301L42.5224 179.628L37.0913 156.969L37.7614 134.839L40.8648 121.914L53.4021 117.082L75.0382 127.786L89.1448 117.682L95.2283 95.3583L93.8882 88.4637L86.4469 69.6489L74.8266 60.4267L67.5616 58.9632L48.1297 57.2527L48.9056 49.5999L61.196 46.2143L57.158 49.5293L56.7524 52.2272L58.6216 52.8973L61.3371 50.5521L65.3046 50.3581L73.6804 49.6351L78.3708 47.1841L80.1165 51.3808L86.3587 56.2124L90.5731 62.3488L103.11 65.3993L107.66 50.7284L110.181 42.5818L98.6491 40.7656L96.057 31.7197L104.45 28.246L114.854 11.2827L105.173 10.2424L107.237 6.99784C106.884 6.90967 106.549 6.8215 106.196 6.73334C81.7035 11.8294 59.1858 25.7244 43.263 44.5568L43.2806 44.5744C30.6023 59.7037 21.8561 78.395 18.7527 99.3258Z"
        fill="#71EEFB"
      />
      <Path
        d="M112.155 227.661C83.6949 223.429 58.1619 208.705 40.2465 186.205C39.0298 184.671 37.8836 183.154 36.8256 181.673C36.279 180.897 35.7324 180.122 35.2034 179.363L34.4099 178.182C33.8809 177.388 33.3695 176.595 32.8758 175.784L32.1352 174.585C30.4424 171.816 28.8377 168.889 27.3213 165.856C22.4016 155.929 18.9807 145.402 17.1645 134.557C17.0763 134.063 17.0058 133.587 16.9353 133.111C16.7942 132.159 16.6531 131.207 16.5297 130.237C15.1896 119.921 15.2954 109.412 16.8471 99.026C19.0689 84.0554 24.1473 69.9664 31.9059 57.1293C32.5584 56.0537 33.2284 54.9957 33.8985 53.9377C35.415 51.6101 37.0196 49.353 38.6595 47.2018C39.2766 46.3906 39.9114 45.5795 40.5462 44.7684L40.652 44.6449C41.0223 44.2041 41.375 43.7633 41.7453 43.3224C41.7806 43.2872 41.7982 43.2519 41.8335 43.2167C41.9393 43.0932 42.0274 42.9874 42.1332 42.864L42.2919 42.67C42.768 42.1058 43.2265 41.5591 43.7202 41.0125C44.0729 40.6069 44.4608 40.1661 44.8664 39.7253C60.4895 22.4623 80.7502 10.5598 103.409 5.34033C104.185 5.164 104.961 4.98768 105.737 4.82898C118.785 2.11345 132.134 1.74315 145.447 3.71808C158.055 5.58721 170.133 9.51943 181.33 15.3913C181.366 15.4089 181.401 15.4266 181.419 15.4442C181.454 15.4619 181.472 15.4795 181.507 15.4971C188.666 19.2706 195.437 23.82 201.626 29.0395C202.49 29.7624 203.39 30.5559 204.377 31.42C204.836 31.8255 205.276 32.2311 205.735 32.6543C207.022 33.8534 208.309 35.0877 209.632 36.4631C217.602 44.6097 224.268 53.8495 229.452 63.9358C231.462 67.8327 233.278 71.906 234.83 76.0675C237.228 82.4331 239.044 89.0808 240.261 95.8344C242.395 107.878 242.571 120.151 240.755 132.353C234.442 174.796 205.224 209.587 164.473 223.147C158.954 224.998 153.223 226.427 147.439 227.379C147.404 227.379 147.369 227.396 147.351 227.396C135.731 229.318 123.881 229.407 112.155 227.661ZM44.6548 45.844C44.3198 46.2496 43.9671 46.6728 43.6321 47.096L43.5439 47.2018C42.9444 47.96 42.3272 48.7535 41.7277 49.547C40.123 51.6454 38.589 53.8143 37.1254 56.0537C36.473 57.0588 35.8205 58.0992 35.1857 59.1395C27.6916 71.5357 22.7895 85.1486 20.6383 99.6079C19.1394 109.659 19.0336 119.798 20.3385 129.761C20.4619 130.678 20.5854 131.612 20.7264 132.547C20.797 133.023 20.8675 133.481 20.9557 133.94C22.719 144.414 26.0164 154.571 30.7598 164.163C32.2233 167.091 33.7751 169.912 35.3973 172.574L36.1203 173.738C36.5964 174.496 37.0901 175.272 37.6015 176.048L38.3773 177.194C38.8887 177.935 39.4177 178.693 39.9467 179.434C40.9694 180.862 42.0803 182.326 43.2441 183.807C60.5424 205.549 85.2114 219.761 112.702 223.852C124.058 225.545 135.537 225.457 146.804 223.57C146.84 223.57 146.875 223.552 146.893 223.552C152.447 222.618 157.966 221.242 163.256 219.479C202.614 206.378 230.845 172.768 236.946 131.771C238.692 119.992 238.533 108.125 236.47 96.5044C235.306 89.9801 233.543 83.5616 231.233 77.4076C229.734 73.4049 227.971 69.455 226.031 65.6991C221.023 55.9479 214.569 47.0254 206.881 39.161C205.594 37.8385 204.36 36.6394 203.108 35.4933C202.667 35.0877 202.244 34.6998 201.803 34.2942C200.851 33.4478 199.986 32.6896 199.158 31.9842C193.198 26.9588 186.673 22.5681 179.796 18.9356C179.761 18.918 179.708 18.9003 179.673 18.8651L179.567 18.8122C168.723 13.1343 157.067 9.3431 144.882 7.52687C132.028 5.62247 119.12 5.97513 106.53 8.60249C105.772 8.76119 105.031 8.9199 104.273 9.09623C82.39 14.1394 62.8347 25.6363 47.7054 42.3526C47.3174 42.7758 46.9648 43.1637 46.6297 43.5517C46.136 44.0983 45.6952 44.6273 45.2543 45.1387L45.0956 45.315C44.9722 45.4737 44.8311 45.6324 44.7077 45.7735C44.6724 45.8087 44.6724 45.8264 44.6548 45.844Z"
        fill="#71EEFB"
      />
      <Path
        d="M104.821 227.097C102.863 226.956 100.906 226.744 98.9662 226.497C84.2072 224.61 69.695 219.885 56.9814 212.814C56.4876 212.549 56.3113 211.932 56.5934 211.438C56.8579 210.945 57.4751 210.768 57.9688 211.05C83.6076 225.316 114.413 229.213 142.52 221.736C185.052 210.433 217.973 173.65 224.427 130.219C228.518 102.729 221.5 73.3872 205.172 49.7057C204.854 49.2472 204.978 48.6124 205.436 48.295C205.895 47.9776 206.529 48.1011 206.847 48.5595C215.046 60.462 220.936 73.5635 224.357 87.5468C227.848 101.865 228.553 116.324 226.437 130.519C223.193 152.384 213.547 172.768 198.577 189.485C183.624 206.184 164.421 218.015 143.032 223.711C130.865 226.92 117.763 228.084 104.821 227.097ZM46.2251 205.796C46.0487 205.778 45.8724 205.725 45.7137 205.602C42.2752 203.098 38.9778 200.365 35.892 197.49C31.0957 192.994 26.6874 188.092 22.8081 182.908C11.2759 167.478 3.83462 148.893 1.31306 129.126C-1.1556 109.712 1.172 89.9449 8.08425 71.9589C8.27821 71.4299 8.87774 71.183 9.3891 71.377C9.9181 71.571 10.165 72.1705 9.97101 72.6819C-4.06509 109.253 1.47176 151.027 24.4303 181.691C28.2391 186.787 32.5769 191.601 37.285 196.009C40.3003 198.83 43.5448 201.493 46.9128 203.962C47.3712 204.297 47.4594 204.932 47.142 205.372C46.8951 205.69 46.5601 205.831 46.2251 205.796ZM14.1854 61.6963C14.0443 61.6787 13.9209 61.6434 13.7974 61.5905C13.3037 61.326 13.1097 60.7265 13.3742 60.2328C16.9362 53.4087 21.2034 46.9902 26.0526 41.1535C33.7936 31.8255 42.8395 23.82 52.9257 17.3662C63.2941 10.7185 74.5089 5.86933 86.2703 2.9422C110.516 -3.07075 137.477 0.138509 166.431 12.5171C166.431 12.5171 166.484 12.5347 166.537 12.57L166.572 12.5876C166.59 12.6053 166.608 12.6053 166.643 12.6229C166.66 12.6405 166.678 12.6405 166.696 12.6581C166.713 12.6581 166.731 12.6758 166.749 12.6758C177.593 18.389 187.432 25.936 196.002 35.1053C196.39 35.5109 196.355 36.1457 195.949 36.5336C195.544 36.9216 194.909 36.8863 194.521 36.4807C186.11 27.4877 176.465 20.0818 165.814 14.4744C165.761 14.4567 165.708 14.4215 165.673 14.4038C165.655 14.4038 165.655 14.3862 165.638 14.3862L165.62 14.3686C137.107 2.18397 110.569 -0.990018 86.764 4.91714C64.0347 10.5245 43.0334 23.8553 27.6043 42.4231C22.8433 48.154 18.6466 54.4667 15.1552 61.1497C14.9612 61.52 14.5733 61.7316 14.1854 61.6963Z"
        fill="white"
      />
      <Path
        d="M146.876 222.512C146.594 222.494 146.329 222.353 146.153 222.106C145.818 221.666 145.906 221.031 146.347 220.696L156.221 213.237L168.618 189.626C168.706 189.467 168.829 189.326 168.988 189.238L180.485 182.114L197.695 157.551L193.551 137.784C193.481 137.467 193.586 137.132 193.798 136.885C194.027 136.638 194.362 136.532 194.68 136.585L196.143 136.797L203.073 131.33L216.739 112.78L224.11 97.633C224.356 97.1393 224.956 96.9277 225.467 97.1746C225.961 97.4214 226.173 98.0209 225.926 98.5323L218.52 113.767C218.485 113.82 218.467 113.873 218.432 113.926L204.642 132.653C204.589 132.723 204.519 132.794 204.448 132.847L197.06 138.666C196.848 138.842 196.566 138.913 196.284 138.877L195.826 138.807L199.776 157.586C199.829 157.868 199.776 158.15 199.617 158.38L182.036 183.472C181.966 183.578 181.86 183.683 181.737 183.754L170.293 190.843L157.914 214.418C157.844 214.542 157.755 214.665 157.632 214.753L147.581 222.353C147.352 222.477 147.105 222.53 146.876 222.512Z"
        fill="#240448"
      />
      <Path
        d="M131.253 226.109C131.059 226.092 130.848 226.021 130.689 225.88C130.266 225.527 130.195 224.892 130.548 224.452L131.976 222.724L134.551 219.32L120.285 200.082L111.204 197.949C110.816 197.861 110.499 197.526 110.446 197.138L107.483 179.645L104.151 177.688C103.869 177.529 103.692 177.247 103.657 176.93L101.911 161.183C101.858 160.707 102.158 160.249 102.617 160.108L128.679 152.173C129.208 152.014 129.772 152.314 129.948 152.843C130.107 153.372 129.807 153.936 129.278 154.112L104.027 161.801L105.614 176.207L108.912 178.147C109.176 178.305 109.353 178.552 109.405 178.852L112.333 196.15L121.132 198.231C121.361 198.284 121.572 198.425 121.713 198.619L136.649 218.774C136.913 219.126 136.913 219.62 136.649 219.99L133.598 224.011C133.598 224.028 133.581 224.028 133.563 224.046L132.117 225.792C131.888 226.003 131.57 226.127 131.253 226.109Z"
        fill="#240448"
      />
      <Path
        d="M138.535 149.404C138.359 149.387 138.2 149.334 138.041 149.228C137.583 148.911 137.459 148.293 137.777 147.817L143.543 139.336C143.702 139.107 143.948 138.948 144.231 138.895L153.559 137.52L166.695 127.433C166.907 127.275 167.189 127.186 167.454 127.239L174.331 128.262L185.034 123.095C185.404 122.919 185.845 122.972 186.145 123.254L192.599 129.108C192.722 129.232 192.828 129.373 192.881 129.532L193.304 130.766L197.712 127.486L197.836 114.773C197.836 114.438 198.012 114.12 198.294 113.926L201.398 111.934L201.08 106.767C201.08 106.697 201.08 106.626 201.098 106.555L202.174 99.3787C202.209 99.0789 202.385 98.8321 202.632 98.6734C202.879 98.5147 203.196 98.4794 203.478 98.5676L208.539 100.137C208.821 100.225 209.068 100.437 209.174 100.719L210.073 102.888L212.172 98.2325L200.886 87.3352L199.229 88.7811L199.828 91.5672C199.864 91.7611 199.846 91.9727 199.775 92.1491L197.166 98.691C197.06 98.9731 196.831 99.1847 196.531 99.2729C196.249 99.3611 195.931 99.3258 195.685 99.1671L192.334 97.0335C192.246 96.9806 192.158 96.8924 192.087 96.8043L167.894 66.3339C167.542 65.8931 167.612 65.2583 168.053 64.9056C168.494 64.553 169.129 64.6235 169.481 65.0643L193.551 95.4112L195.72 96.7866L197.765 91.6553L197.113 88.5871C197.042 88.2345 197.166 87.8465 197.448 87.6173L200.269 85.1839C200.657 84.8489 201.257 84.8489 201.627 85.2192L214.094 97.2627C214.393 97.5625 214.482 98.0209 214.305 98.4089L210.955 105.85C210.796 106.22 210.426 106.45 210.02 106.45C209.615 106.45 209.262 106.203 209.103 105.832L207.481 101.918L204.007 100.842L203.126 106.749L203.478 112.41C203.496 112.78 203.32 113.133 203.02 113.327L199.881 115.354L199.758 128.033C199.758 128.35 199.599 128.65 199.352 128.826L193.427 133.217C193.163 133.411 192.828 133.464 192.528 133.376C192.228 133.288 191.982 133.041 191.876 132.741L191.082 130.431L185.334 125.211L174.965 130.219C174.789 130.308 174.577 130.343 174.384 130.308L167.63 129.302L154.634 139.283C154.493 139.389 154.334 139.459 154.158 139.477L145.006 140.835L139.487 148.964C139.24 149.263 138.888 149.422 138.535 149.404Z"
        fill="#240448"
      />
      <Path
        d="M155.728 58.6634C155.675 58.6634 155.604 58.6458 155.551 58.6282L144.16 55.7187C143.896 55.6481 143.666 55.4718 143.543 55.2426C143.402 55.0133 143.367 54.7312 143.437 54.4667L146.064 45.0682C146.082 45.0329 146.082 44.9976 146.1 44.9624L149.309 36.9569L153.559 19.3236C153.612 19.1296 153.717 18.9533 153.858 18.8122L162.305 11.1417C162.71 10.7714 163.363 10.7891 163.733 11.2123C164.103 11.6178 164.086 12.2702 163.663 12.6405L155.445 20.1171L151.249 37.5211C151.231 37.574 151.231 37.6093 151.196 37.6622L147.969 45.6853L145.641 54.0259L156.027 56.6885C156.574 56.8296 156.891 57.3762 156.75 57.9228C156.662 58.3813 156.204 58.6987 155.728 58.6634Z"
        fill="#240448"
      />
      <Path
        d="M130.248 38.8789C130.16 38.8789 130.089 38.8612 130.001 38.826L123.406 36.6218C123.018 36.4984 122.754 36.1457 122.718 35.7402L122.172 29.2335L107.677 20.3463C107.236 20.0818 107.078 19.5175 107.289 19.0414L111.345 10.5598C111.592 10.0484 112.191 9.83684 112.703 10.0837C113.214 10.3306 113.426 10.9301 113.179 11.4415L109.511 19.0943L123.67 27.7699C123.953 27.9462 124.129 28.2284 124.147 28.5458L124.676 34.8938L129.807 36.6042L135.626 25.1425L135.062 18.4066C135.044 18.1245 135.132 17.86 135.308 17.6484C135.485 17.4368 135.749 17.3134 136.031 17.3134L143.614 17.0136L143.314 12.2879C143.279 11.7236 143.702 11.2475 144.266 11.2122C144.83 11.177 145.307 11.6002 145.342 12.1644L145.712 17.9305C145.73 18.195 145.642 18.4772 145.448 18.6711C145.271 18.8651 145.007 18.9885 144.742 19.0061L137.195 19.3059L137.689 25.266C137.707 25.4599 137.671 25.6363 137.583 25.8126L131.235 38.3146C131.041 38.6849 130.653 38.8965 130.248 38.8789Z"
        fill="#240448"
      />
      <Path
        d="M83.3433 62.1196C83.2903 62.1196 83.2374 62.1019 83.1845 62.1019L70.2064 58.9456C69.9596 58.8927 69.748 58.734 69.6069 58.54L65.3397 52.3155L59.0093 47.4134C58.8682 47.3076 58.7624 47.1665 58.6919 47.0078L57.3341 43.6751L53.4548 45.703C53.3314 45.7735 53.2079 45.8088 53.0669 45.8088L44.3913 46.5494C44.3737 46.5494 44.3737 46.5494 44.356 46.5494L40.2475 46.7433C39.6832 46.7786 39.2071 46.3378 39.1895 45.7911C39.1542 45.2269 39.595 44.7508 40.1417 44.7331L44.2326 44.5392L52.6789 43.8162L57.3518 41.3652C57.5986 41.2417 57.8984 41.2065 58.1629 41.3123C58.4274 41.4004 58.639 41.612 58.7448 41.8765L60.4376 45.9675L66.6798 50.799C66.768 50.8695 66.8385 50.9401 66.8914 51.0282L71.0176 57.0588L82.6908 59.8978L87.1168 45.6148L89.3915 38.297L78.5999 36.5866C78.212 36.5337 77.8946 36.2515 77.7888 35.8636L75.1438 26.5179C75.0027 26.0242 75.2496 25.4952 75.7257 25.3012L84.1015 21.8275L93.888 5.86936L86.1998 4.7761C85.6532 4.70557 85.2653 4.17657 85.3358 3.62994C85.4064 3.08331 85.9354 2.69537 86.482 2.7659L95.7042 4.0884C96.0392 4.1413 96.339 4.3529 96.4801 4.65267C96.6211 4.95243 96.6035 5.32272 96.4271 5.60486L85.6708 23.15C85.565 23.3263 85.3887 23.4674 85.1947 23.5556L77.3479 26.8001L79.605 34.6822L90.9079 36.4631C91.1901 36.516 91.4546 36.6747 91.6133 36.9216C91.772 37.1685 91.8072 37.4682 91.7191 37.7504L89.1093 46.1791L84.4012 61.379C84.2425 61.8727 83.8193 62.1548 83.3433 62.1196Z"
        fill="#240448"
      />
      <Path
        d="M67.2788 117.418C66.9967 117.4 66.7145 117.259 66.5382 116.994C66.2208 116.536 66.309 115.901 66.7674 115.584L68.1076 114.632L74.244 92.0962L72.9215 85.2897L65.3568 66.14L53.7364 56.9177L46.5068 55.4542L36.4382 54.5725C35.8739 54.5196 35.4683 54.0259 35.5212 53.4793C35.5741 52.9326 36.0502 52.5094 36.6145 52.5623C36.6145 52.5623 36.6145 52.5623 36.6321 52.5623L46.7536 53.4616C46.7889 53.4616 46.8242 53.4616 46.8594 53.4793L54.3712 54.9957C54.5299 55.031 54.671 55.1015 54.7944 55.1897L66.8203 64.7293C66.9614 64.8351 67.0672 64.9938 67.1377 65.1525L74.8435 84.6373C74.8611 84.6902 74.8787 84.7607 74.8964 84.8136L76.2718 91.9551C76.3071 92.1138 76.2894 92.2725 76.2541 92.4136L69.9591 115.513C69.9062 115.742 69.7651 115.936 69.5711 116.077L67.9489 117.241C67.7549 117.382 67.508 117.435 67.2788 117.418Z"
        fill="#240448"
      />
      <Path
        d="M21.1858 180.051C20.7626 180.016 20.3923 179.734 20.2865 179.293L14.1324 156.176C14.1148 156.087 14.0972 155.982 14.0972 155.893L14.8025 132.988C14.8025 132.917 14.8201 132.847 14.8378 132.776L18.047 119.392C18.1176 119.075 18.3644 118.811 18.6642 118.687L31.6423 113.697C31.9068 113.591 32.2066 113.609 32.4534 113.732L54.3011 124.541L61.0194 119.728C61.4778 119.41 62.1126 119.498 62.43 119.957C62.7474 120.415 62.6593 121.05 62.2008 121.367L54.9888 126.534C54.689 126.746 54.2834 126.781 53.9484 126.622L31.9421 115.742L19.8809 120.398L16.8127 133.164L16.125 155.823L22.2261 178.799C22.3672 179.346 22.0498 179.892 21.5032 180.033C21.3974 180.051 21.2916 180.051 21.1858 180.051Z"
        fill="#240448"
      />
    </Svg>
  );
};

export {Done};