import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styles from './styles';

const SenderAvatar = ({isUser, item, onPerss}) => {
  return (
    <>
      {!isUser(item?.from?._id) ? (
        <TouchableOpacity
          onPress={onPerss}
          underlayColor="white"
          style={styles.userImageContainer}>
          <Image
            source={
              item?.from?.picture?.length
                ? {uri: item?.from?.picture[0].url}
                : require('../../../assets/images/profilePic.png')
            }
            defaultImage={require('../../../assets/images/profilePic.png')}
            errorImage={require('../../../assets/images/profilePic.png')}
            resizeMode={'cover'}
            style={styles.userImage}
          />
        </TouchableOpacity>
      ) : null}
    </>
  );
};
export {SenderAvatar};
