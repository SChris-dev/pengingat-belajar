import React, { useState } from 'react';
import HomeScreen from '../screens/HomeScreen';
import AddReminderScreen from '../screens/AddReminderScreen';
import EditReminderScreen from '../screens/EditReminderScreen';

const SimpleNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [params, setParams] = useState(null);

  const navigation = {
    navigate: (screen, screenParams) => {
      setCurrentScreen(screen);
      setParams(screenParams || null);
    },
    goBack: () => {
      setCurrentScreen('Home');
      setParams(null);
    },
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen navigation={navigation} />;
      case 'AddReminder':
        return <AddReminderScreen navigation={navigation} />;
      case 'EditReminder':
        return <EditReminderScreen navigation={navigation} route={{ params }} />;
      default:
        return <HomeScreen navigation={navigation} />;
    }
  };

  return renderScreen();
};

export default SimpleNavigator;
