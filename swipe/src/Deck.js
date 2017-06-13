import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { InfoModal } from './common';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 500;

class Deck extends Component {
  // if an expected function is not passed to this reusable component then
  // defaultProps will automatically assign an empty function so we do
  // not receive an error when calling expected function within the component
  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {}
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      // onStartShouldSetPanResponder handles event in which user presses down
      // on the screen
      onStartShouldSetPanResponder: () => true,
      // onPanResponderMove called when user drags their finger across the screen
      onPanResponderMove: (event, gesture) => {
      // here we set position (which is our Animated.ValueXY) to follow the
      // drag finger movement of the user
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      // onPanResponderRelease called when user stops pressing on the screen
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { modalVisible: false, panResponder, position, index: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  getCardStyle() {
    const { position } = this.state;
    // this function enables the degrees of rotation of the card to be set/follow
    // the movement of the card along the x-axis. We multiplied the SCREEN_WIDTH
    // by 1.5 to decrease the amount of rotation.
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    // Animated.timing is like spring except without the bounce
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    // specifying which card had just been swiped and passing it into callback
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    // after user swipes we need to reset the position const and increment the
    // index value by 1 to prepare the next card to handle swipes
    // bc position is an Animate based object we do not use setState but rather
    // mutate it using setValue which is usually considered a no-no when updating
    // state objects
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  onClose() {
    // i am getting an error when pressing this saying that 'this.setState' is
    // not a function. i recommend checking how it was done on the
    // 'manager employee edit form' and comparing it to how you are doing it.
    // after you get that working you should also change the method to onModalClose
    this.setState({ modalVisible: false });
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    return this.props.data.map((item, i) => {
      // this first conditional is basically checking if we have already swiped
      // the current item we are mapping over. If so, then we do not create a
      // card for that particular item.
      if (i < this.state.index) { return null; }
      // this conditional is checking if the current item we are mapping over
      // is the card that we should be showing. If so we wrap the Animated.View
      // with the getCardStyle helper method on it.
      if (i === this.state.index) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle]}
            {...this.state.panResponder.panHandlers}
          >
            <Card
              key={item.id}
              title={item.text}
              image={{ uri: item.uri }}
            >
              <Button
                icon={{ name: 'code' }}
                backgroundColor='#03a9f4'
                title="View More!"
                onPress={() => this.setState({ modalVisible: true })}
              />
            </Card>
            <InfoModal
              visible={this.state.modalVisible}
              onClose={this.onClose.bind(this)}
            >
              {item.desc}
            </InfoModal>
          </Animated.View>
        );
      }
      return (
        <Animated.View
          style={[styles.cardStyle, { top: 10 * (i - this.state.index) }]}
          key={item.id}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
      // We are reversing bc the cards stack on top of each other with the last
      // one rendered ending up on top. But the first one rendered is the only
      // one with the swipe functionality
    }).reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  // position absolute makes all the cards stack on top of each other.
  // SCREEN_WIDTH adjusts for the fact that absolute makes the card width smaller
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    marginTop: 30
  }
};

export default Deck;
