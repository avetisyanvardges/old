import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {makeAction} from '../../makeAction';
import {Divider, ChatListMessageContent} from '../../components';
import {connect} from 'react-redux';
import moment from 'moment';
import 'moment/locale/en-au';
import 'moment/locale/ru';
import i18n from '../../assets/i18next';
class ChatList extends Component {
  componentDidMount() {
    let loc = this.props.settings.language === 'en' ? 'en-au' : 'ru';
    moment.locale(loc);
  }

  isUser = (userId) => {
    const myId = this.props.screenData.profile?._id;
    return userId === myId;
  };
  showDivider = (index) => {
    const {listData} = this.props;
    let start = listData[index].createdAt;
    let end = listData[index + 1].createdAt;
    return (
      moment(start).format('YYYY-MM-DD') !== moment(end).format('YYYY-MM-DD')
    );
  };
  convertDate = (date) => {
    return moment(date).format('HH:mm   ').toUpperCase();
  };

  convertDateDivider = (date) => {
    const formatDate = 'YYYY-MM-DD';
    const getDay = (getDate) => {
      if (getDate) {
        return moment(getDate).format(formatDate);
      } else {
        return moment().format(formatDate);
      }
    };
    const today = moment(getDay(), formatDate).startOf('day');
    const oldDate = moment(getDay(date), formatDate);
    if (today.diff(oldDate, 'day') < 1) {
      return i18n.t('texts.today');
    } else if (today.diff(oldDate, 'day') < 2) {
      return i18n.t('texts.yesterday');
    } else if (today.diff(oldDate, 'day') < 3) {
      return oldDate.format('dddd');
    } else if (today.diff(oldDate, 'day') < 4) {
      return oldDate.format('dddd');
    } else if (today.diff(oldDate, 'day') < 5) {
      return oldDate.format('dddd');
    } else if (today.diff(oldDate, 'day') < 6) {
      return oldDate.format('dddd');
    } else if (today.diff(oldDate, 'day') < 7) {
      return oldDate.format('dddd');
    } else {
      return oldDate.format('MM.DD.YY');
    }
  };

  renderItemChatList = ({item, index}) => {
    const {listData} = this.props;
    const handleMessageType = (type) => {
      return (
        <ChatListMessageContent
          convertDate={this.convertDate}
          isUser={this.isUser}
          item={item}
        />
      );
    };
    if (!listData[index + 1]) {
      return (
        <>
          {handleMessageType(item)}
          {<Divider text={this.convertDateDivider(new Date(item.createdAt))} />}
        </>
      );
    }

    return (
      <>
        {handleMessageType(item)}
        {listData[index + 1] && this.showDivider(index) ? (
          <Divider text={this.convertDateDivider(new Date(item.createdAt))} />
        ) : null}
      </>
    );
  };

  render() {
    const {listData} = this.props;
    return (
      <>
        <FlatList
          inverted={true}
          ref={(ref) => {
            this.scrollView = ref;
          }}
          data={listData}
          renderItem={this.renderItemChatList}
          keyExtractor={(_, index) => index?.toString()}
        />
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    theme: store.themes.theme,
    listData: store.Chat.chatContent,
    settings: store.profileData.settings,
  };
};

export default connect(mapStateToProps, {makeAction})(ChatList);
