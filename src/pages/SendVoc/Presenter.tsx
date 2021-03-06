import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useDynamicValue } from 'react-native-dynamic';
import { BUTTON_TYPE, Header } from '@components/header/Header';
import { SubTitle } from '@components/SubTitle';
import { TextInput } from '@components/TextInput';
import Constant from '@utils/constants';
import { VocData } from '../../types';
import { dynamicStyles } from './styles';

interface VocType {
  state: {
    title: string;
    content: string;
  };
  onChangeText: (value: Partial<VocData>) => void;
  onPressBack: () => void;
  onPress: () => void;
}

const Presenter = memo(({
  state: { title, content }, onChangeText, onPressBack, onPress,
}: VocType) => {
  const styles = useDynamicValue(dynamicStyles);
  return (
    <>
      <Header onPress={onPressBack} onPressRightButton={onPress} type={BUTTON_TYPE.SEND} />
      <ScrollView style={styles.container}>
        <View paddingH-30>
          <View marginB-10>
            <SubTitle title="제목" />
            <View style={styles.inputLine}>
              <TextInput
                style={styles.inputTitle}
                placeholder="제목을 입력하세요"
                underlineColorAndroid="transparent"
                onChangeText={(title) => onChangeText({ title })}
                value={title}
                placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              />
            </View>
          </View>
          <View marginB-10>
            <SubTitle title="내용" />
            <View style={styles.inputLine}>
              <TextInput
                style={styles.inputContent}
                placeholder="내용을 입력하세요"
                underlineColorAndroid="transparent"
                onChangeText={(content) => onChangeText({ content })}
                value={content}
                placeholderTextColor={Constant.PLACEHOLDER_COLOR}
                multiline
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
});

export default Presenter;
