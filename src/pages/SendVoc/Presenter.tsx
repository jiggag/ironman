import React, { memo } from 'react';
import { TextInput, ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import styles from './styles';
import { SubTitle, Header } from '../../components';
import Constant from '../../utils/constants';

interface VocType {
  state: {
    title: string,
    content: string,
  },
  onChangeText: (value: {
    title?: string,
    content?: string,
  }) => void,
  onPressBack: () => void,
  onPress: () => void,
}

const Presenter = memo(({ state: { title, content }, onChangeText, onPressBack, onPress }: VocType) => (
  <>
    <Header onPress={onPressBack} onPressRightButton={onPress} type="SEND" />
    <ScrollView style={styles.container}>
      <View marginB-10>
        <SubTitle title="제목" />
        <View style={styles.inputLine}>
          <TextInput
            style={styles.inputTitle}
            placeholder="제목을 입력하세요"
            underlineColorAndroid="transparent"
            onChangeText={title => onChangeText({ title })}
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
            onChangeText={content => onChangeText({ content })}
            value={content}
            placeholderTextColor={Constant.PLACEHOLDER_COLOR}
          />
        </View>
      </View>
    </ScrollView>
  </>
));

export default Presenter;
