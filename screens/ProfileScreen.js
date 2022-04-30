import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../routes/AuthProvider';
import {theme} from '../core/theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/AntDesign';
export default function ProfileScreen() {
  const [isImageLoading, setImageLoading] = useState(true);
  const {logout, user} = useContext(AuthContext);

  return (
    <View style={{...styles.container, backgroundColor: '#42af7f66'}}>
      {/*  */}
      <ImageBackground
        source={require('../assets/images/logo.png')}
        imageStyle={{resizeMode: 'cover'}}
        style={styles.imageBackground}
        blurRadius={4}></ImageBackground>

      <View style={styles.profileContainer}>
        <SkeletonPlaceholder />
        <Image
          source={
            user.photoURL
              ? {uri: user.photoURL}
              : require('../assets/images/screens/user.png')
          }
          onLoadEnd={() => setImageLoading(false)}
          style={styles.userImage}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}>
        <View>
          <Text style={styles.username}>
            {user.displayName ? user.displayName : '@no_username'}
          </Text>

          <View style={styles.phone}>
            <Icon name="phone" size={22} color="#ccc" />
            <Text style={styles.detailText}>
              {user.phoneNumber ? user.phoneNumber : 'NA'}
            </Text>
          </View>

          <View style={styles.phone}>
            <Icon name="mail" size={22} color="#ccc" />
            <Text style={styles.detailText}>
              {user.email ? user.email : 'NA'}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              paddingVertical: 15,
              paddingHorizontal: 10,
            }}>
            <View>
              <Text style={styles.smallDetail}>Today's Sales</Text>
              <Text style={styles.someStats}>रु 40</Text>
            </View>
            <View>
              <Text style={styles.smallDetail}>Products Sold</Text>
              <Text style={styles.someStats}>45</Text>
            </View>
          </View>

          <FunctionButtons title="ORDERS" icon="mail" />
          <FunctionButtons title="SALES" icon="mail" />
          <FunctionButtons title="DISEASE DIAGNOSIS" icon="mail" />
          <FunctionButtons title="SOIL PH CHECK" icon="mail" />
          <FunctionButtons title="FARM OVERVIEW" icon="mail" />
          <FunctionButtons
            title="LOGOUT"
            icon="logout"
            onPress={() => logout()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const FunctionButtons = ({title, icon, ...props}) => {
  return (
    <Pressable style={styles.functions} {...props}>
      <Icon name={icon} size={22} color="#aaa" />
      <Text style={styles.functionText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '20%',
    height: 150,
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 60,
    elevation: 1,
    zIndex: 5,
    overflow: 'hidden',
  },
  scrollContainer: {
    marginTop: '60%',
  },
  scrollContent: {
    // flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 80,
    paddingHorizontal: 15,
    // alignItems: 'center',
  },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageBackground: {
    height: 350,
    width: '100%',
    position: 'absolute',
  },
  username: {
    color: '#111',
    fontFamily: theme.fonts.light.fontFamily,
    fontSize: 25,
    color: '#aaa',
    alignSelf: 'center',
    marginTop: 10,
  },
  phone: {
    color: '#aaa',
    width: '100%',
    paddingVertical: 5,
    flexDirection: 'row',
  },
  detailText: {
    color: '#ccc',
    marginLeft: 10,
  },
  someStats: {
    fontFamily: theme.fonts.light.fontFamily,
    fontSize: 25,
    color: '#aaa',
    textAlign: 'center',
  },
  functions: {paddingVertical: 15, flexDirection: 'row'},
  functionText: {
    fontFamily: theme.fonts.light.fontFamily,
    fontSize: 16,
    color: '#aaa',
    marginLeft: 10,
  },
  smallDetail: {
    fontSize: 10,
    color: '#aaa',
    marginBottom: 10,
    fontFamily: theme.fonts.thin.fontFamily,
  },
});
