import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { Platform } from 'react-native';
import { FindPool } from '../screens/FindPool';

import { NewPool } from '../screens/NewPool';
import { Pools } from '../screens/Pools';

const Tab = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          position: 'absolute',
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'android' ? -10 : 0,
        },
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
      }}
    >
      <Tab.Screen
        name="new"
        component={NewPool}
        options={{
          tabBarIcon: ({ color, size }) => (
            <PlusCircle color={color} size={size} />
          ),
          tabBarLabel: 'Novo bolão',
        }}
      />
      <Tab.Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SoccerBall color={color} size={size} />
          ),
          tabBarLabel: 'Meus bolões',
        }}
      />
      <Tab.Screen
        name="find"
        component={FindPool}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
}
