import React from 'react';
import { TextInput as TextInputOrigin } from 'react-native';
import styled from 'styled-components/native';
import { Color } from '@utils/constants';

export const TextInput = styled(TextInputOrigin)`
  min-height: 40px;
  display: flex;
  flex: 1;
  color: ${Color.black};
`;
