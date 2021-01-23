import React from 'react';
import { TextInput as TextInputOrigin } from 'react-native';
import styled from 'styled-components/native';

const TextInput = styled(TextInputOrigin)`
  min-height: 40px;
  display: flex;
  flex: 1;
`;

export default TextInput;
