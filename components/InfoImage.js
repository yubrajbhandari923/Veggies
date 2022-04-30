import {Image} from 'react-native';
import React, {Component} from 'react';

export default class InfoImage extends Component {
  render() {
    return (
      <Image
        source={this.props.source}
        style={{
          height: 160,
          width: 170,
          resizeMode: 'contain',
          ...this.props.style,
        }}
      />
    );
  }
}
