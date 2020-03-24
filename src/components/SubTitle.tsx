import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const SubTitle = ({ title, style = {} }) => <Text style={[styles.subTitle, style]}>{title}</Text>;

export default SubTitle;

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
    marginVertical: 4,
  },
});

SubTitle.defaultProps = {
  title: '',
  style: {},
};
SubTitle.propTypes = {
  title: PropTypes.string,
  style: PropTypes.any,
};
