import {View, Image} from 'react-native';
import React, {Component} from 'react';
import {TouchableRipple, Chip, Text} from 'react-native-paper';
import {
  NewsFeedContainerStyles as styles,
  SkeletonStyles as skStyles,
} from '../styles/HomeStyles';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AntIcons from 'react-native-vector-icons/AntDesign';

export default class HomeFeedContainer extends Component {
  // When Cart Button is Pressed
  state = {
    isImageLoading: true,
  };
  render() {
    const {image, title, description, time, author, date, ...props} =
      this.props;

    return (
      <View style={styles.buttonContainer}>
        <BigButton {...props}>
          <>
            {/* Contains Image and Add to Cart Button */}
            <View>
              <Image
                source={image}
                style={this.state.isImageLoading ? null : styles.image}
                onLoadEnd={() => this.setState({isImageLoading: false})}
              />
              {this.state.isImageLoading ? (
                <SkeletonPlaceholder>
                  <View style={skStyles.image} />
                </SkeletonPlaceholder>
              ) : null}
            </View>

            <View style={{paddingHorizontal: 10}}>
              {/* Title of the NEws */}
              <Title title={title} />

              <View>
                <Features author={author} date={date} />
              </View>
              {/* A little description */}
            </View>
          </>
        </BigButton>
      </View>
    );
  }
}

export const NewsSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={skStyles.buttonContainer}>
        <View style={{...skStyles.image, height: 300}} />
      </View>
    </SkeletonPlaceholder>
  );
};

const BigButton = ({children, ...props}) => {
  return (
    <TouchableRipple
      {...props}
      style={styles.button}
      rippleColor="#eee"
      touchSoundDisabled={true}>
      {children}
    </TouchableRipple>
  );
};

const Title = ({title, ...props}) => {
  return (
    <View style={styles.dishTitleContainer} {...props}>
      <Text style={styles.dishTitleText}>{title}</Text>
    </View>
  );
};

const Features = ({author, date}) => {
  return (
    <View style={styles.dishFeatureContainer}>
      <Chip
        icon={() => <AntIcons name="user" size={20} />}
        // onPress={() => console.log('Pressed')}
        style={styles.dishFeatureBox}
        textStyle={styles.dishFeatureText}>
        {author ? author : 'Anonymous'}
      </Chip>

      {/* Time */}

      <Chip
        icon="timer-outline"
        // onPress={() => console.log('Pressed')}
        style={styles.dishFeatureBox}
        textStyle={styles.dishFeatureText}>
        {date ? date.toDateString() : 'Unknown'}
      </Chip>
    </View>
  );
};
