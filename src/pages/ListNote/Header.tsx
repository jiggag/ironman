import React from 'react';
import { View } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import { LineGraph } from '../../components';

const Header = ({ data }) => {
  return (
    <View marginV-10>
      <LineGraph data={data} />
    </View>
  );
};

export default Header;

Header.defaultProps = {
  data: [],
};
Header.propTypes = {
  data: PropTypes.array,
};
