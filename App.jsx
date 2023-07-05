import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/Providers/AuthProviders';
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  return (
    <RootSiblingParent>
    <AuthProvider />
  </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
