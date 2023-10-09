import {deviceInfo} from '../../../assets/deviceInfo';
import {ActionSheetIOS} from 'react-native';

const ChatListActionSheet = (tryAgain, deleteMessage, cancle) => {
  if (deviceInfo.ios) {
    return ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Try Again', 'Delete Message', 'Cancel'],
        tintColor: 'red',
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            tryAgain();
            return;
          case 1:
            deleteMessage();
            return;
          case 2:
            cancle();
            return;
        }
      },
    );
  }
};
export {ChatListActionSheet};
