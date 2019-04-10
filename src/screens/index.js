import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import Home from "./Home";
import User from "./User";
import Users from "./Users";
import Feed from "./Feed";
import Login from "./Login";
import Splash from "./Splash";

const appNavigator = createSwitchNavigator(
  {
    App: createStackNavigator(
      {
        Main: createBottomTabNavigator(
          {
            Home,
            Users,
            Feed,
            Profile: User
          },
          {
            initialRouteName: "Feed"
          }
        ),
        User
      },
      {
        initialRouteName: "Main"
      }
    ),
    Splash,
    Login
  },
  {
    initialRouteName: "Splash"
  }
);

export default createAppContainer(appNavigator);
