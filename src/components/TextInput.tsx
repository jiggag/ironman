import { TextInput as TextInputOrigin } from 'react-native';
import styled from 'styled-components/native';

export const TextInput = styled(TextInputOrigin)<{ color: string }>`
  min-height: 40px;
  display: flex;
  flex: 1;
`;
