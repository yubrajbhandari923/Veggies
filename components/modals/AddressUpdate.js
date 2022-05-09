import {View, Text, Image} from 'react-native';
import React, {useState, useContext} from 'react';
import ModalLayout from './ModalLayout';
import {AddressUpdateStyles as styles} from '../../styles/ModalStyles';
import TextInput from '../TextInput';
import Button from '../Button';
import {AuthContext} from '../../routes/AuthProvider';
import {
  districtValidator,
  municipalityValidator,
  wardValidator,
  tolValidator,
  streetValidator,
} from '../../helpers/validators';

export default function AddressUpdate({navigation}) {
  const {whichProcessIsHappenningNow, updateAddress} = useContext(AuthContext);

  const [district, setDistrict] = useState({value: 'Rupandehi', error: ''});
  const [municipality, setMunicipality] = useState({
    value: 'Tilottama',
    error: '',
  });
  const [ward, setWard] = useState({value: '3', error: ''});
  const [tol, setTol] = useState({value: 'Rambhdevi', error: ''});
  const [street, setStreet] = useState({value: 'Samyukta Path-I', error: ''});

  const update = () => {
    const districtError = districtValidator(district.value);
    const municipalityError = municipalityValidator(municipality.value);
    const wardError = wardValidator(ward.value);
    const tolError = tolValidator(tol.value);
    const streetError = streetValidator(street.value);

    if (
      districtError ||
      municipalityError ||
      wardError ||
      tolError ||
      streetError
    ) {
      if (districtError) setDistrict({...district, error: districtError});
      if (municipalityError)
        setMunicipality({...municipality, error: municipalityError});
      if (wardError) setWard({...ward, error: wardError});
      if (tolError) setTol({...tol, error: tolError});

      if (streetError) setStreet({...district, error: streetError});

      return;
    }

    updateAddress({
      district: district.value,
      municipality: municipality.value,
      ward: ward.value,
      tol: tol.value,
      street: street.value,
    });
  };
  return (
    <ModalLayout>
      <View style={styles.container}>
        <Text style={styles.title}> Update Address </Text>

        <View style={styles.inputContainer}>
          <TextInput
            label="District"
            returnKeyType="next"
            value={district.value}
            onChangeText={text => setDistrict({value: text, error: ''})}
            error={district.error}
            errorText={district.error}
            autoCapitalize="none"
            keyboardType="default"
            maxLength={20}
            icon={<NepalIcon />}
          />
          <TextInput
            label="Municipality"
            returnKeyType="next"
            value={municipality.value}
            onChangeText={text => setMunicipality({value: text, error: ''})}
            error={municipality.error}
            errorText={municipality.error}
            autoCapitalize="none"
            keyboardType="default"
            maxLength={20}
            icon={<NepalIcon />}
          />
          <View
            style={{
              flexDirection: 'row',
              flex: 5,
            }}>
            <View style={{flex: 2}}>
              <TextInput
                label="Ward No"
                returnKeyType="next"
                value={ward.value}
                onChangeText={text => setWard({value: text, error: ''})}
                error={ward.error}
                errorText={ward.error}
                autoCapitalize="none"
                keyboardType="number-pad"
                style={{width: '95%'}}
                maxLength={2}
                icon={<NepalIcon />}
              />
            </View>
            <View style={{flex: 3}}>
              <TextInput
                style={{width: '95%'}}
                label="Tol"
                returnKeyType="next"
                value={tol.value}
                onChangeText={text => setTol({value: text, error: ''})}
                error={tol.error}
                errorText={tol.error}
                autoCapitalize="none"
                keyboardType="default"
                maxLength={20}
                icon={<NepalIcon />}
              />
            </View>
          </View>
          <TextInput
            label="Street Address"
            returnKeyType="next"
            value={street.value}
            onChangeText={text => setStreet({value: text, error: ''})}
            error={street.error}
            errorText={street.error}
            autoCapitalize="none"
            keyboardType="default"
            maxLength={20}
            icon={<NepalIcon />}
          />
        </View>
        <Button
          mode="contained"
          onPress={update}
          style={{marginTop: 24}}
          disabled={whichProcessIsHappenningNow == 'UPDATE-ADDRESS'}
          loading={whichProcessIsHappenningNow == 'UPDATE-ADDRESS'}>
          Update
        </Button>
      </View>
    </ModalLayout>
  );
}

const NepalIcon = () => (
  <Image source={require('../../assets/icons/nepal.png')} style={styles.icon} />
);
