import {
  base,
  darkTheme,
  lightTheme,
  colorOptions,
} from '../../assets/utils/theme';
import {DARK_THEME, LIGTH_THEME} from '../../actionsTypes';

const initialState = {
  theme: {...base, ...lightTheme, color: colorOptions.default},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LIGTH_THEME:
      return {
        ...state,
        theme: {...base, ...lightTheme, color: colorOptions.default},
      };
    case DARK_THEME:
      return {
        ...state,
        theme: {...base, ...darkTheme, color: colorOptions.dark},
      };
    default:
      return state;
  }
};
