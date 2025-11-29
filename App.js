import React from 'react';
import { LogBox } from 'react-native';
import { ReminderProvider } from './app/context/ReminderContext';
import SimpleNavigator from './app/navigation/SimpleNavigator';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function App() {
  return (
    <ReminderProvider>
      <SimpleNavigator />
    </ReminderProvider>
  );
}

// import { LogBox } from 'react-native';
// import { ReminderProvider } from './app/context/ReminderContext';
// import AppNavigator from './app/navigation/AppNavigator';

// LogBox.ignoreLogs([
//   'Non-serializable values were found in the navigation state',
// ]);

// export default function App() {
//   return (
//     <ReminderProvider>
//       <AppNavigator />
//     </ReminderProvider>
//   );
// }
