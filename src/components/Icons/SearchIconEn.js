import React from 'react';
import {Svg, Path, Defs, LinearGradient, Stop} from 'react-native-svg';

const SearchIconEn = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width="64"
      height="13"
      viewBox="0 0 64 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4.912 12.096C4.08 12.096 3.28 11.9627 2.512 11.696C1.75467 11.4293 1.168 11.0773 0.752 10.64L1.216 9.728C1.62133 10.1333 2.16 10.464 2.832 10.72C3.504 10.9653 4.19733 11.088 4.912 11.088C5.91467 11.088 6.66667 10.9067 7.168 10.544C7.66933 10.1707 7.92 9.69067 7.92 9.104C7.92 8.656 7.78133 8.29867 7.504 8.032C7.23733 7.76533 6.90667 7.56267 6.512 7.424C6.11733 7.27467 5.568 7.11467 4.864 6.944C4.02133 6.73067 3.34933 6.528 2.848 6.336C2.34667 6.13333 1.91467 5.82933 1.552 5.424C1.2 5.01867 1.024 4.46933 1.024 3.776C1.024 3.21067 1.17333 2.69867 1.472 2.24C1.77067 1.77067 2.22933 1.39733 2.848 1.12C3.46667 0.842666 4.23467 0.704 5.152 0.704C5.792 0.704 6.416 0.794666 7.024 0.976C7.64267 1.14667 8.176 1.38667 8.624 1.696L8.224 2.64C7.75467 2.33067 7.25333 2.10133 6.72 1.952C6.18667 1.792 5.664 1.712 5.152 1.712C4.17067 1.712 3.42933 1.904 2.928 2.288C2.43733 2.66133 2.192 3.14667 2.192 3.744C2.192 4.192 2.32533 4.55467 2.592 4.832C2.86933 5.09867 3.21067 5.30667 3.616 5.456C4.032 5.59467 4.58667 5.74933 5.28 5.92C6.10133 6.12267 6.76267 6.32533 7.264 6.528C7.776 6.72 8.208 7.01867 8.56 7.424C8.912 7.81867 9.088 8.35733 9.088 9.04C9.088 9.60533 8.93333 10.1227 8.624 10.592C8.32533 11.0507 7.86133 11.4187 7.232 11.696C6.60267 11.9627 5.82933 12.096 4.912 12.096ZM18.7558 8.144H11.7158C11.7798 9.01867 12.1158 9.728 12.7238 10.272C13.3318 10.8053 14.0998 11.072 15.0278 11.072C15.5504 11.072 16.0304 10.9813 16.4678 10.8C16.9051 10.608 17.2838 10.3307 17.6038 9.968L18.2438 10.704C17.8704 11.152 17.4011 11.4933 16.8358 11.728C16.2811 11.9627 15.6678 12.08 14.9958 12.08C14.1318 12.08 13.3638 11.8987 12.6918 11.536C12.0304 11.1627 11.5131 10.6507 11.1398 10C10.7664 9.34933 10.5798 8.61333 10.5798 7.792C10.5798 6.97067 10.7558 6.23467 11.1078 5.584C11.4704 4.93333 11.9611 4.42667 12.5798 4.064C13.2091 3.70133 13.9131 3.52 14.6918 3.52C15.4704 3.52 16.1691 3.70133 16.7878 4.064C17.4064 4.42667 17.8918 4.93333 18.2438 5.584C18.5958 6.224 18.7718 6.96 18.7718 7.792L18.7558 8.144ZM14.6918 4.496C13.8811 4.496 13.1984 4.75733 12.6438 5.28C12.0998 5.792 11.7904 6.464 11.7158 7.296H17.6838C17.6091 6.464 17.2944 5.792 16.7398 5.28C16.1958 4.75733 15.5131 4.496 14.6918 4.496ZM23.7936 3.52C24.8923 3.52 25.735 3.79733 26.3216 4.352C26.9083 4.896 27.2016 5.70667 27.2016 6.784V12H26.1136V10.688C25.8576 11.1253 25.479 11.4667 24.9776 11.712C24.487 11.9573 23.9003 12.08 23.2176 12.08C22.279 12.08 21.5323 11.856 20.9776 11.408C20.423 10.96 20.1456 10.368 20.1456 9.632C20.1456 8.91733 20.4016 8.34133 20.9136 7.904C21.4363 7.46667 22.263 7.248 23.3936 7.248H26.0656V6.736C26.0656 6.01067 25.863 5.46133 25.4576 5.088C25.0523 4.704 24.4603 4.512 23.6816 4.512C23.1483 4.512 22.6363 4.60267 22.1456 4.784C21.655 4.95467 21.2336 5.19467 20.8816 5.504L20.3696 4.656C20.7963 4.29333 21.3083 4.016 21.9056 3.824C22.503 3.62133 23.1323 3.52 23.7936 3.52ZM23.3936 11.184C24.0336 11.184 24.583 11.04 25.0416 10.752C25.5003 10.4533 25.8416 10.0267 26.0656 9.472V8.096H23.4256C21.9856 8.096 21.2656 8.59733 21.2656 9.6C21.2656 10.0907 21.4523 10.48 21.8256 10.768C22.199 11.0453 22.7216 11.184 23.3936 11.184ZM31.3751 5.232C31.6418 4.66667 32.0365 4.24 32.5591 3.952C33.0925 3.664 33.7485 3.52 34.5271 3.52V4.624L34.2551 4.608C33.3698 4.608 32.6765 4.88 32.1751 5.424C31.6738 5.968 31.4231 6.73067 31.4231 7.712V12H30.2871V3.584H31.3751V5.232ZM39.9939 12.08C39.1619 12.08 38.4152 11.8987 37.7539 11.536C37.1032 11.1733 36.5912 10.6667 36.2179 10.016C35.8445 9.35467 35.6579 8.61333 35.6579 7.792C35.6579 6.97067 35.8445 6.23467 36.2179 5.584C36.5912 4.93333 37.1032 4.42667 37.7539 4.064C38.4152 3.70133 39.1619 3.52 39.9939 3.52C40.7192 3.52 41.3645 3.664 41.9299 3.952C42.5059 4.22933 42.9592 4.64 43.2899 5.184L42.4419 5.76C42.1645 5.344 41.8125 5.03467 41.3859 4.832C40.9592 4.61867 40.4952 4.512 39.9939 4.512C39.3859 4.512 38.8365 4.65067 38.3459 4.928C37.8659 5.19467 37.4872 5.57867 37.2099 6.08C36.9432 6.58133 36.8099 7.152 36.8099 7.792C36.8099 8.44267 36.9432 9.01867 37.2099 9.52C37.4872 10.0107 37.8659 10.3947 38.3459 10.672C38.8365 10.9387 39.3859 11.072 39.9939 11.072C40.4952 11.072 40.9592 10.9707 41.3859 10.768C41.8125 10.5653 42.1645 10.256 42.4419 9.84L43.2899 10.416C42.9592 10.96 42.5059 11.376 41.9299 11.664C41.3539 11.9413 40.7085 12.08 39.9939 12.08ZM49.6845 3.52C50.7405 3.52 51.5778 3.82933 52.1965 4.448C52.8258 5.056 53.1405 5.94667 53.1405 7.12V12H52.0045V7.232C52.0045 6.35733 51.7858 5.69067 51.3485 5.232C50.9112 4.77333 50.2872 4.544 49.4765 4.544C48.5698 4.544 47.8498 4.816 47.3165 5.36C46.7938 5.89333 46.5325 6.63467 46.5325 7.584V12H45.3965V0.127999H46.5325V5.056C46.8418 4.56533 47.2685 4.18667 47.8125 3.92C48.3565 3.65333 48.9805 3.52 49.6845 3.52ZM56.3366 12.08C56.102 12.08 55.8993 11.9947 55.7286 11.824C55.5686 11.6533 55.4886 11.4453 55.4886 11.2C55.4886 10.9547 55.5686 10.752 55.7286 10.592C55.8993 10.4213 56.102 10.336 56.3366 10.336C56.5713 10.336 56.774 10.4213 56.9446 10.592C57.1153 10.752 57.2006 10.9547 57.2006 11.2C57.2006 11.4453 57.1153 11.6533 56.9446 11.824C56.774 11.9947 56.5713 12.08 56.3366 12.08ZM59.7273 12.08C59.4926 12.08 59.2899 11.9947 59.1193 11.824C58.9593 11.6533 58.8793 11.4453 58.8793 11.2C58.8793 10.9547 58.9593 10.752 59.1193 10.592C59.2899 10.4213 59.4926 10.336 59.7273 10.336C59.9619 10.336 60.1646 10.4213 60.3353 10.592C60.5059 10.752 60.5913 10.9547 60.5913 11.2C60.5913 11.4453 60.5059 11.6533 60.3353 11.824C60.1646 11.9947 59.9619 12.08 59.7273 12.08ZM63.1179 12.08C62.8832 12.08 62.6805 11.9947 62.5099 11.824C62.3499 11.6533 62.2699 11.4453 62.2699 11.2C62.2699 10.9547 62.3499 10.752 62.5099 10.592C62.6805 10.4213 62.8832 10.336 63.1179 10.336C63.3525 10.336 63.5552 10.4213 63.7259 10.592C63.8965 10.752 63.9819 10.9547 63.9819 11.2C63.9819 11.4453 63.8965 11.6533 63.7259 11.824C63.5552 11.9947 63.3525 12.08 63.1179 12.08Z"
        fill="url(#paint0_linear)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1="21.8897"
          y1="-27.0556"
          x2="67.4883"
          y2="11.7963"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#71EEFB" />
          <Stop offset="0.473958" stopColor="#A679FF" />
          <Stop offset="1" stopColor="#8E0090" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export {SearchIconEn};