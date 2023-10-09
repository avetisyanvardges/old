import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import {Sizes} from '../../assets/styles';
import {styles} from './styles';
import * as Animatable from 'react-native-animatable';
import Translation from '../../Translation';
import {CustomRadioButton, SliderSelect} from '..';
import i18n from '../../assets/i18next';

const EventTypes = ({
  types,
  type,
  sliderInfo,
  handleSliderInfo,
  handleActiveType,
  handleOtherText,
  otherText,
}) => {
  const theme = useSelector((state) => state.themes.theme);
  const [activeType, setActiveType] = useState(type || '');
  const [sliderData, setSliderData] = useState(sliderInfo || {});
  const [other, setOther] = useState(otherText || '');

  const changeSliderData = (data) => {
    setSliderData(data);
    handleSliderInfo(sliderData);
  };

  const maxValueSlider = ({member}) => {
    if (sliderData.members - member > 0) {
      return sliderData.members - member;
    } else {
      return 0;
    }
  };

  const changeActiveType = (elem) => {
    setActiveType(elem.value);
    handleActiveType(elem.value);
    otherType('');
  };

  const otherType = (text) => {
    setOther(text);
    handleOtherText(text);
  };

  const {PRIMARY_TEXT_BACKGROUND_COLOR} = theme;
  const {
    dateTimeText,
    sliderSelectContainer,
    membersLimitContainer,
    filterModalContainer,
    filterModalContainerItem,
    otherInput,
    typesLabelContainer,
    typesContainer,
    linearContainer,
    textInputsContainer,
  } = styles(theme);
  const {SECONDARY_COLOR_LIGHT, PRIMARY_COLOR_LIGHT} = theme.color;
  return (
    <Animatable.View
      useNativeDriver={true}
      animation="fadeIn"
      easing="ease-out-cubic"
      style={filterModalContainer}>
      <View style={filterModalContainerItem}>
        <Text style={dateTimeText}>
          <Translation label={'texts.filtersCategory'} />
        </Text>

        {types.map((elem, index) => {
          return (
            <View key={index} style={typesContainer}>
              <View style={membersLimitContainer}>
                <CustomRadioButton
                  width={Sizes.size25}
                  height={Sizes.size25}
                  tintColors={SECONDARY_COLOR_LIGHT}
                  value={activeType === elem.value}
                  change={() => changeActiveType(elem)}
                />

                <Text
                  onPress={() => changeActiveType(elem)}
                  style={typesLabelContainer}>
                  {elem.label}
                </Text>
              </View>

              {activeType === 'other' && elem.value === 'other' ? (
                <View style={textInputsContainer}>
                  <TextInput
                    maxLength={40}
                    placeholderTextColor={PRIMARY_COLOR_LIGHT}
                    style={otherInput}
                    placeholder={i18n.t('inputs.placeholder.addCategoryName')}
                    value={other}
                    onChangeText={(text) => otherType(text)}
                  />
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
      <View style={linearContainer} />

      <View style={filterModalContainerItem}>
        <Text style={dateTimeText}>
          <Translation label={'texts.participants'} />
        </Text>

        <View style={sliderSelectContainer}>
          <SliderSelect
            step={1}
            maximumValue={100}
            sliderText={'membersLimit'}
            thumbTintColor={SECONDARY_COLOR_LIGHT}
            minimumTrackTintColor={SECONDARY_COLOR_LIGHT}
            maximumTrackTintColor={PRIMARY_TEXT_BACKGROUND_COLOR}
            sliderValue={sliderData.members || 0}
            onValueChange={(value) =>
              changeSliderData({
                members: value,
                age: sliderData?.age,
                male: 0,
                female: 0,
              })
            }
          />
        </View>

        <View style={sliderSelectContainer}>
          <SliderSelect
            inclement={'+'}
            step={1}
            maximumValue={99}
            sliderText={'age'}
            thumbTintColor={SECONDARY_COLOR_LIGHT}
            minimumTrackTintColor={SECONDARY_COLOR_LIGHT}
            maximumTrackTintColor={PRIMARY_TEXT_BACKGROUND_COLOR}
            sliderValue={sliderData.age || 0}
            onValueChange={(value) =>
              changeSliderData({...sliderData, age: value})
            }
          />
        </View>

        <View style={sliderSelectContainer}>
          <SliderSelect
            step={1}
            maximumValue={maxValueSlider({member: sliderData?.female || 0})}
            sliderText={'maleLimit'}
            thumbTintColor={SECONDARY_COLOR_LIGHT}
            minimumTrackTintColor={SECONDARY_COLOR_LIGHT}
            maximumTrackTintColor={PRIMARY_TEXT_BACKGROUND_COLOR}
            sliderValue={sliderData.male || 0}
            onValueChange={(value) =>
              changeSliderData({...sliderData, male: value})
            }
          />
        </View>

        <View style={sliderSelectContainer}>
          <SliderSelect
            step={1}
            maximumValue={maxValueSlider({member: sliderData?.male || 0})}
            sliderText={'femaleLimit'}
            thumbTintColor={SECONDARY_COLOR_LIGHT}
            minimumTrackTintColor={SECONDARY_COLOR_LIGHT}
            maximumTrackTintColor={PRIMARY_TEXT_BACKGROUND_COLOR}
            sliderValue={sliderData.female || 0}
            onValueChange={(value) =>
              changeSliderData({...sliderData, female: value})
            }
          />
        </View>
      </View>
    </Animatable.View>
  );
};

export {EventTypes};
