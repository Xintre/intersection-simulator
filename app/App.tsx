import {ScrollView, StatusBar, Text, View, useColorScheme} from 'react-native';

import {MD2Colors} from 'react-native-paper';
import React from 'react';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? MD2Colors.grey300 : MD2Colors.white,
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView style={backgroundStyle}>
        <Text>Xintre's Crossroads App</Text>
      </ScrollView>
    </View>
  );
}

export default App;
