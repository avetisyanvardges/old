import React, {Component} from 'react';
import {
  TextInput,
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {IconsStyles, Sizes} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';
import {
  ActiveEventList,
  Calendar,
  Cancel,
  ChooseLocation,
  Favorites,
  FilterIcon,
  MyEventsFilter,
  SearchIconEn,
  SearchIconRu,
  ThisMonth,
  ThisWeek,
} from '../Icons';
import * as Animatable from 'react-native-animatable';
import RBSheet from 'react-native-raw-bottom-sheet';
import {withNavigationFocus} from 'react-navigation';
import i18n from '../../assets/i18next';

class SearchEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchType: '',
      onFocused: false,
      titlePosition: new Animated.Value(
        deviceInfo.ios ? Sizes.size21 : Sizes.size22,
      ),
      filtredData: {},
      filters: [
        {
          _id: 'active',
          key: 'active',
          title: 'Live',
          icon: (IconColor) => (
            <ActiveEventList
              IconWidth={Sizes.size24}
              IconHeight={Sizes.size24}
              IconColor={IconColor}
            />
          ),
        },

        {
          _id: 'my_events',
          key: 'my_events',
          title: 'texts.myEvents',
          icon: (IconColor) => (
            <MyEventsFilter
              IconWidth={Sizes.size24}
              IconHeight={Sizes.size24}
              IconColor={IconColor}
            />
          ),
        },

        {
          _id: 'today',
          key: 'today',
          title: 'texts.today',
          icon: (IconColor) => (
            <Calendar
              IconWidth={Sizes.size24}
              IconHeight={Sizes.size24}
              IconColor={IconColor}
            />
          ),
        },
        {
          _id: 'this_week',
          key: 'this_week',
          title: 'texts.this_week',
          icon: (IconColor) => (
            <ThisWeek
              IconWidth={Sizes.size24}
              IconHeight={Sizes.size24}
              IconColor={IconColor}
            />
          ),
        },
        {
          _id: 'this_month',
          key: 'this_month',
          title: 'texts.this_month',
          icon: (IconColor) => (
            <ThisMonth
              IconWidth={Sizes.size24}
              IconHeight={Sizes.size24}
              IconColor={IconColor}
            />
          ),
        },
        {
          _id: 'near_me',
          key: 'near_me',
          title: 'texts.near_me',
          icon: (IconColor) => (
            <ChooseLocation
              IconWidth={Sizes.size24}
              IconHeight={Sizes.size24}
              IconColor={IconColor}
            />
          ),
        },
        {
          _id: 'saved',
          key: 'saved',
          title: 'texts.favorites',
          icon: (IconColor) => (
            <Favorites
              IconWidth={Sizes.size24}
              IconHeight={Sizes.size24}
              IconColor={IconColor}
            />
          ),
        },
        // {
        //   _id: 'more',
        //   key: 'more',
        //   title: 'texts.more',
        //   icon: (IconColor) => (
        //     <MoreSqare
        //       IconWidth={Sizes.size24}
        //       IconHeight={Sizes.size24}
        //       IconColor={IconColor}
        //     />
        //   ),
        // },
      ],
      activeFilter: (
        <FilterIcon
          IconWidth={Sizes.size24}
          IconHeight={Sizes.size24}
          IconColor={'#818195'}
        />
      ),
    };
  }
  componentDidMount() {
    this.requestFilter();
    if (this.props.drawingInMap) {
      this.props.drawingInMap(this.searchInputRef);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.resetFilter();
    }
  }

  resetFilter = () => {
    this.setState(
      {
        searchText: '',
        searchType: '',
        filtredData: {},
        activeFilter: (
          <FilterIcon
            IconWidth={Sizes.size24}
            IconHeight={Sizes.size24}
            IconColor={'#818195'}
          />
        ),
      },
      () => this.requestFilter(),
    );
  };

  onChangeText = (text, keyName) => {
    this.setState({[keyName]: text}, () => {
      if (this.search) {
        clearTimeout(this.search);
      }
      this.search = setTimeout(() => {
        this.requestFilter();
      }, 200);
    });
  };

  resetText = () => {
    this.onChangeText('', 'searchText');
    setTimeout(() => {
      if (!this.state.onFocused) {
        this.handleAnimationPosition();
      }
    }, 0);
  };

  requestFilter = () => {
    const {searchText, searchType, filtredData} = this.state;
    const data = {
      location: filtredData.location ? filtredData.location : '',
      type: filtredData.type ? filtredData.type : '',
      limit: filtredData.limit ? filtredData.limit : '',
      startDate: filtredData.startDate ? filtredData.startDate : '',
      endDate: filtredData.endDate ? filtredData.endDate : '',
      searchQuery: searchText,
      searchType: searchType,
      my_events: '',
    };
    this.props?.filterData(data);
  };

  handleAnimationPosition = () => {
    const {searchText} = this.state;
    if (!searchText) {
      Animated.timing(this.state.titlePosition, {
        toValue: deviceInfo.ios ? Sizes.size21 : Sizes.size22,
        duration: 300,
      }).start();
    } else {
      Animated.timing(this.state.titlePosition, {
        toValue: 0,
        duration: 300,
      }).start();
    }
  };

  openModal = () => {
    this.searchInputRef?.blur();
    this.RBSheet.open();
  };
  closeModal = () => {
    this.RBSheet.close();
  };

  changeActiveType(elem) {
    const {theme} = this.props;
    const {PRIMARY_COLOR_BOLD} = theme.color;
    let icon = elem._id ? elem.icon('#818195') : elem.icon(PRIMARY_COLOR_BOLD);
    const defaultIcon = (
      <FilterIcon
        IconWidth={Sizes.size24}
        IconHeight={Sizes.size24}
        IconColor={PRIMARY_COLOR_BOLD}
      />
    );
    if (elem._id === this.state.searchType) {
      this.setState(
        {
          activeFilter: defaultIcon,
          searchType: '',
          filtredData: {},
        },
        () => {
          this.requestFilter();
          this.closeModal();
        },
      );
      return;
    }

    // if (elem._id === 'more') {
    //   const { filtredData } = this.state;
    //   const query = {
    //     filtredData,
    //     sendInformation: (event) => {
    //       this.setState({ filtredData: event.filterParams }, () =>
    //         this.requestFilter(),
    //       );
    //     },
    //   };
    //   NavigationService.navigate('ModifyEvent', query);
    //   this.setState({ activeFilter: defaultIcon, searchType: '' }, () => {
    //     this.requestFilter();
    //     this.closeModal();
    //   });
    //   return;
    // }

    this.setState({activeFilter: icon, searchType: elem._id}, () => {
      this.requestFilter();
      this.closeModal();
    });
  }
  render() {
    const {theme, conatinerPosition, styleContainer, settings} = this.props;
    const {GRADIENT_COLOR, PRIMARY_BACKGROUND_COLOR} = theme;
    const {PRIMARY_COLOR_BOLD} = theme.color;
    const {
      searchText,
      onFocused,
      titlePosition,
      activeFilter,
      filters,
    } = this.state;
    const {container, searchInput, resetInput, filterMenu} = styles(theme);
    return (
      <>
        <View style={[container, styleContainer ? styleContainer : null]}>
          {!searchText && !onFocused ? (
            <Animatable.View
              animation="fadeInDown"
              duration={300}
              easing="ease-in-out"
              style={{
                position: 'absolute',
                zIndex: 0,
                left: Sizes.size26,
                top: titlePosition,
              }}>
              {settings.language === 'ru' ? <SearchIconRu /> : <SearchIconEn />}
            </Animatable.View>
          ) : null}

          <TextInput
            maxLength={40}
            ref={(ref) => (this.searchInputRef = ref)}
            onChangeText={(text) => this.onChangeText(text, 'searchText')}
            value={searchText}
            style={searchInput}
            onFocus={() => {
              this.setState({onFocused: true});
              Animated.timing(this.state.titlePosition, {
                toValue: 0,
                duration: 300,
              }).start();
            }}
            onBlur={() => {
              this.setState({onFocused: false});
              this.handleAnimationPosition();
            }}
          />
          {searchText ? (
            <Animatable.View animation={'fadeIn'}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.resetText}
                style={resetInput}>
                <Cancel
                  iconWidth={IconsStyles.small}
                  iconHeight={IconsStyles.small}
                  iconColor={PRIMARY_COLOR_BOLD}
                />
              </TouchableOpacity>
            </Animatable.View>
          ) : null}

          <TouchableOpacity
            onPress={this.openModal}
            style={filterMenu}
            activeOpacity={0.7}>
            {activeFilter}
          </TouchableOpacity>
        </View>

        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={Sizes.size400}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            container: {
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
              borderTopLeftRadius: Sizes.size20,
              borderTopRightRadius: Sizes.size20,
            },
          }}>
          <View style={{paddingHorizontal: Sizes.size6}}>
            {filters.map((elem, index) => {
              return (
                <View
                  key={index.toString()}
                  style={{
                    paddingVertical: Sizes.size11,
                    marginHorizontal: Sizes.size6,
                    marginBottom: Sizes.size4,
                    justifyContent: 'center',
                    borderBottomColor: '#e3e3e3',
                    borderBottomWidth: index !== filters.length - 1 ? 0.5 : 0,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.changeActiveType(elem)}
                    style={{
                      paddingHorizontal: Sizes.size14,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {elem.icon(
                      elem._id === this.state.searchType
                        ? '#A347FF'
                        : '#818195',
                    )}
                    <Text
                      style={{
                        marginLeft: Sizes.size17,
                        fontWeight: deviceInfo.ios ? '500' : 'bold',
                        fontSize: Sizes.size14,
                        color:
                          elem._id === this.state.searchType
                            ? '#A347FF'
                            : '#2C2C2C',
                      }}>
                      {i18n.t(elem.title)}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </RBSheet>
      </>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
    settings: store.profileData.settings,
  };
};
export default connect(mapStateToProps, {makeAction})(
  withNavigationFocus(SearchEvent),
);
