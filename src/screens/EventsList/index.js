import React, {Component} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Keyboard,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Sizes} from '../../assets/styles';
import {makeAction} from '../../makeAction';
import ScreenFooter from '../../components/ScreenFooter';
import {GET_EVENTS_LIST_DATA} from '../../actionsTypes';
import EventsListItem from '../../components/EventsListItem';
import SearchEvent from '../../components/SearchEvent';
import {styles} from './styles';
import * as Animatable from 'react-native-animatable';
import {ArrowLeft} from '../../components/Icons';
import {withNavigationFocus} from 'react-navigation';

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveInappropriateContent: false,
      page: 1,
      scrollEnabled: true,
      loadingMore: false,
      searchQuery: '',
      offset: 20,
      filtersData: {},
      refreshing: false,
      showTopButton: false,
      closeMembersModal: new Date(),
    };
  }

  componentDidMount() {
    this.getEvents();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.setState({closeMembersModal: new Date()});
    }
  }

  renderItem = ({item, index}) => {
    const {eventList} = this.props;
    const {closeMembersModal} = this.state;
    return (
      <View
        key={item._id}
        style={[
          index === eventList?.length - 1 ? {marginBottom: Sizes.size57} : null,
        ]}>
        <EventsListItem
          getEvents={this.getEvents}
          refreshEvents={this.refreshEvents}
          item={item}
          navigation={this.props.navigation}
          closeModal={closeMembersModal}
          routeName="EventsList"
        />
      </View>
    );
  };

  searchEventComponent = () => {
    return (
      <SearchEvent
        styleContainer={{
          position: 'relative',
          marginHorizontal: 0,
          width: '100%',
          marginBottom: Sizes.size10,
        }}
        drawingInMap={(ref) => (this.searchInputRef = ref)}
        filterData={(data) => {
          this.setState(
            {
              filtersData: data,
              page: 1,
              scrollEnabled: true,
            },
            () => {
              this.getEvents();
            },
          );
        }}
      />
    );
  };

  loadMore = (e) => {
    const {page, loadingMore, scrollEnabled, offset, filtersData} = this.state;
    const {makeAction, userInfo} = this.props;
    if (
      e.nativeEvent.layoutMeasurement.height + e.nativeEvent.contentOffset.y >=
      e.nativeEvent.contentSize.height - 0.1
    ) {
      if (!loadingMore && scrollEnabled) {
        this.setState(
          {
            loadingMore: true,
            page: page + 1,
          },
          () => {
            setTimeout(() => {
              makeAction(GET_EVENTS_LIST_DATA, {
                page: this.state.page,
                loadMore: true,
                offset: offset,
                filtersData,
                callback: () => {
                  this.setState({
                    loadingMore: false,
                  });
                },
                disableLoadMore: () => {
                  this.setState({
                    scrollEnabled: false,
                  });
                },
                error: () => {
                  this.setState({
                    loadingMore: false,
                    scrollEnabled: false,
                  });
                },
              });
            }, 500);
          },
        );
      }
    }
  };

  getEvents = () => {
    const {makeAction} = this.props;
    const {page, offset, filtersData} = this.state;
    makeAction(GET_EVENTS_LIST_DATA, {
      callback: (data) => {
        try {
          if (data?.eventList?.length < offset) {
            this.setState({
              scrollEnabled: false,
            });
          }
        } catch (e) {
          console.log(e);
        }
      },
      error: () => {},
      page: page,
      loadMore: false,
      offset: offset,
      filtersData,
    });
  };

  refreshEvents = () => {
    const {makeAction} = this.props;
    const {page, offset, filtersData} = this.state;
    makeAction(GET_EVENTS_LIST_DATA, {
      callback: () => {},
      error: () => {},
      page: 1,
      loadMore: false,
      offset: page * offset,
      filtersData,
    });
  };

  refreshing = () => {
    const {makeAction} = this.props;
    const {page, offset, filtersData, refreshing} = this.state;
    if (!refreshing) {
      this.setState({refreshing: true});
    }
    makeAction(GET_EVENTS_LIST_DATA, {
      callback: () => {
        this.setState({refreshing: false});
      },
      error: () => {
        this.setState({refreshing: false});
      },
      page: 1,
      loadMore: false,
      offset: page * offset,
      filtersData,
    });
  };

  showTopButton = (e) => {
    let show;
    if (this.handleTimeOut) {
      clearTimeout(this.handleTimeOut);
    }
    if (e?.contentOffset?.y > 90) {
      show = true;
    } else {
      show = false;
    }
    this.handleTimeOut = setTimeout(() => {
      this.setState({showTopButton: show});
    }, 100);
  };
  scrollToTop = () => {
    this.eventsListRef.scrollToOffset({animated: true, offset: 0});
  };

  render() {
    const {theme, eventList, count} = this.props;
    const {LoaderVisible} = this.props.Loader;
    const {
      animatableContainerScrollTop,
      animatableContainerItem,
      listFooterComponentContainer,
    } = styles(theme);
    const {refreshing, showTopButton} = this.state;
    return (
      <>
        <View
          style={{
            backgroundColor: '#EAEAEA',
            flex: 1,
          }}>
          <FlatList
            ListHeaderComponent={this.searchEventComponent}
            ref={(ref) => (this.eventsListRef = ref)}
            data={eventList}
            style={{paddingHorizontal: Sizes.size10}}
            renderItem={(item) => this.renderItem(item)}
            onScroll={({nativeEvent}) => {
              Keyboard.dismiss();
              this.loadMore({nativeEvent});
              this.showTopButton(nativeEvent);
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.refreshing}
                tintColor={'#A347FF'}
              />
            }
            ListFooterComponent={
              LoaderVisible && (
                <View style={listFooterComponentContainer}>
                  <ActivityIndicator size={'small'} color={'#A347FF'} />
                </View>
              )
            }
          />
          {showTopButton ? (
            <Animatable.View
              useNativeDriver={true}
              animation={'zoomIn'}
              easing="ease-out-cubic"
              style={animatableContainerScrollTop}>
              <TouchableOpacity
                onPress={this.scrollToTop}
                activeOpacity={0.7}
                style={animatableContainerItem}>
                <ArrowLeft
                  IconWidth={Sizes.size15}
                  IconHeight={Sizes.size15}
                  IconColor={'white'}
                />
              </TouchableOpacity>
            </Animatable.View>
          ) : null}

          <ScreenFooter
            active={'EventsList'}
            navigation={this.props.navigation}
          />
        </View>
      </>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
    eventList: store.eventList.eventList,
    event: store.eventList.event,
    count: store.profileData.count,
    Loader: store.loader,
  };
};
export default connect(mapStateToProps, {makeAction})(
  withNavigationFocus(EventsList),
);
