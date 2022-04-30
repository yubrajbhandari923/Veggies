import AsyncStorage from '@react-native-community/async-storage';

AsyncStorage.clear();
// This function returns a Promise-- either true or false
// usage ::-> const checkifFirstAppUse().then(value => JSON.parse(value))
export const checkIfFirstAppUse = async () => {
  try {
    const value = await AsyncStorage.getItem('isFirstTimeAppUse');
    // If value is null or true , it means its a first App Use
    // In first login, then set it to false so after this we dont show OnBoardScreen

    if (value === null || !value) {
      await AsyncStorage.setItem('isFirstTimeAppUse', JSON.stringify(false));
      return true;
    }
    // If value isnt null, then its not a first App Use
    return false;
  } catch (e) {
    // In case there is error with AsyncStorage, we just assume that its not a first Use of App
    return false;
  }
};
