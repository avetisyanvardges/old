import React, {Component} from 'react';
import {TextInput, View, Text} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {Sizes} from '../../assets/styles';
import i18n from '../../assets/i18next';

const Input = ({
  elemRef,
  onBlurHandler,
  inputFocusHandle,
  keyboardType,
  onChangeText,
  multiline,
  value,
  returnKeyType,
  placeholder,
  isFocused,
  secureTextEntry,
  floatingTitleInputStyles,
  theme,
  maxLength,
  required,
}) => {
  const {inputStyles} = styles(theme);
  const {PRIMARY_COLOR_LIGHT} = theme.color;
  return (
    <TextInput
      maxLength={maxLength}
      placeholder={placeholder + `${required ? ' * ' : ''}`}
      ref={(ref) => elemRef(ref)}
      keyboardType={keyboardType}
      multiline={multiline}
      onChangeText={onChangeText}
      value={value}
      returnKeyType={returnKeyType}
      secureTextEntry={secureTextEntry}
      style={[
        inputStyles,
        floatingTitleInputStyles,
        {paddingHorizontal: Sizes.size11},
      ]}
      onFocus={inputFocusHandle}
      onBlur={onBlurHandler}
      placeholderTextColor={PRIMARY_COLOR_LIGHT}
    />
  );
};
class FloatingTitleInput extends Component {
  state = {
    isFocused: false,
  };
  inputFocusHandle = () => {
    this.setState({
      isFocused: true,
    });
  };
  onBlurHandler = () => {
    this.setState({
      isFocused: false,
    });
  };
  render() {
    const {
      placeholder,
      keyboardType,
      onChangeText,
      value,
      multiline,
      returnKeyType,
      secureTextEntry,
      floatingTitleInputStyles,
      theme,
      maxLength,
      required,
    } = this.props;
    const {container, errorTextStyle} = styles(theme);
    const {isFocused} = this.state;
    const {} = theme.color;
    return (
      <View style={container}>
        <View>
          <Input
            maxLength={maxLength}
            keyboardType={keyboardType ? keyboardType : 'default'}
            multiline={multiline}
            onChangeText={onChangeText}
            value={value}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            floatingTitleInputStyles={floatingTitleInputStyles}
            inputFocusHandle={this.inputFocusHandle}
            isFocused={isFocused}
            theme={theme}
            onBlurHandler={this.onBlurHandler}
            elemRef={(ref) => {
              this.refElemFocus = ref;
            }}
            placeholder={
              placeholder ? i18n.t(`inputs.placeholder.${placeholder}`) : ''
            }
            required={required}
          />
        </View>
        {this.props.errorText ? (
          <Text numberOfLines={1} ellipsizeMode="tail" style={errorTextStyle}>
            {this.props.errorText}
          </Text>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
  };
};
export default connect(mapStateToProps, {makeAction})(FloatingTitleInput);
