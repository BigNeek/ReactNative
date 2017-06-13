import React from 'react';
import { Modal, View, Text } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const InfoModal = ({ children, visible, onClose }) => {
  const { cardSectionStyle, containerStyle, textStyle } = styles;
  return (
    <Modal
      visible={visible}
      transparent
      animationType='slide'
      onRequestClose={() => {}}
    >
    <View style={containerStyle}>
     <CardSection style={cardSectionStyle}>
       <Text style={textStyle}>
         {children}
       </Text>
     </CardSection>
     <CardSection>
      <Button
        onPress={onClose}
        children='Close'
      />
     </CardSection>
   </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export { InfoModal };
