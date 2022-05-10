import {View, ScrollView, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';
import {NewsModalStyles as styles} from '../../styles/HomeStyles';
import {AuthContext} from '../../routes/AuthProvider';
import {WebView} from 'react-native-webview';

export default class NewsModal extends Component {
  static contextType = AuthContext;
  state = {isLoading: true};

  render() {
    const {route} = this.props;

    // const {updateCart, updateFavourite} = this.context;

    // Desctructure the modal data
    const {url} = route.params;

    return (
      <View style={{height: '100%'}}>
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          style={{...styles.modalContainer, height: '90%'}}
          contentContainerStyle={{paddingVertical: 20, flex: 1}}>
          <View style={styles.smallBar}></View>

          {/* {this.state.isLoading ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : null} */}

          <WebView
            source={{
              uri: url,
            }}
            onLoadEnd={() => this.setState({isLoading: false})}
            javaScriptEnabled={true}
            allowsLinkPreview={true}
            pullToRefreshEnabled={true}
            startInLoadingState={true}
            renderLoading={() => <Loading />}
            style={styles.webView}
          />
        </ScrollView>
      </View>
    );
  }
}

const Loading = () => {
  return (
    <View style={{position: 'absolute', left: 0, right: 0, top: '45%'}}>
      <ActivityIndicator size="large" color="#ccc" />
    </View>
  );
};
