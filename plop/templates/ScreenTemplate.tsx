import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Container from '../../src/components/Container';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';



const {{pascalCase name}}Screen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Container style={styles.container} isLoading={false} error={undefined}>

        <Text style={styles.text}>{{pascalCase name}} Screen</Text>

    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default {{pascalCase name}}Screen;
