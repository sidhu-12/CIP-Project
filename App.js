import 'react-native-gesture-handler';
import React,{Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/login';
import Register from './components/register'
import DashBoardDriver from './components/dashBoardDriver';
import  NotificationTest from './components/notification'
import {createStackNavigator} from '@react-navigation/stack';
import Tracker from './components/tracker';
import SelectDriver from './components/selectDriver';
import { DashBoardParent } from './components/dashBoardParent';
import {LogBox} from 'react-native';
import { Attendance } from './components/attendance';
import { StudentList } from './components/studentList';

const Stack = createStackNavigator();
export default class  App extends Component {
  componentDidMount(){
    LogBox.ignoreLogs(['Animated: `useNativeDriver`','Remote debugger'])
  }
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: '#00c0e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Register" component={Register} options={{
          title: 'Register',
          headerStyle: {
            backgroundColor: '#00c0e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
        <Stack.Screen name="DashBoard" component={DashBoardDriver} options={{
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: '#00c0e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
              <Stack.Screen name="Notification" component={NotificationTest}
        options={{
          title: 'Notification',
          headerStyle: {
            backgroundColor: '#00c0e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
          <Stack.Screen name="Tracker" component={Tracker}
        options={{
          title: 'Tracker',
          headerStyle: {
            backgroundColor: '#00c0e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
            <Stack.Screen name="SelectDriver" component={SelectDriver}
        options={{
          title: 'SelectDriver',
          headerStyle: {
            backgroundColor: '#00c0e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
            <Stack.Screen name="DashboardParent" component={DashBoardParent}
        options={{
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: '#00c0e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
            <Stack.Screen name="Attendance" component={Attendance}
        options={{
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: '#00c0e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
           <Stack.Screen name="Student List" component={StudentList}
        options={{
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: '#00c0e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
  }

