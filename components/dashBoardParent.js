import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import call from "react-native-phone-call";
const url=require('../urlConstant.json');
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
export class DashBoardParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        driverDetails:{
          driverName:'',
          mobileNumber:'',
          vanName:'',
          vanNumber:'',


        },
       textName:"Mark Absent", 
    }
  }
  componentDidMount=()=>{
   
    this.notificationListener = Notifications.addNotificationReceivedListener(notification=>{
     console.log(notification);
   }
   );
   this.responseListener = Notifications.addNotificationResponseReceivedListener(response => {
   
     console.log("Vanakam bha "+JSON.stringify(response));
     });
     console.log(this.props.route.params)
     this.getDriverDetails();
    
  
    
 }
 getDriverDetails=()=>{
  var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        
        if (this.readyState == 4 && this.status == 200) {
          var message=JSON.parse(this.responseText);
          
           setDriverList(message);
          
        }
        if (this.readyState == 4 && this.status != 200) {
          Alert.alert("Network Error","Please check your network connection");
        }
      };
      xhr.open(
        "POST",
        url.backendUrl+"getDriverDetails",
        true
      );
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify({mobileNumber:this.props.route.params.driverMobileNumber}));
      
      const setDriverList = (message) => {
          //console.log(message);
          this.setState({
            driverDetails:message
          }); 
          console.log(this.state.driverDetails);
          
          
   }
  }
 componentWillUnmount=()=>{
    Notifications.removeNotificationSubscription(this.notificationListener);
    Notifications.removeNotificationSubscription(this.responseListener);
  
  }
  callDriver = (mobileNumber) => {
    const args = {
      number: mobileNumber.toString(),
      prompt: true,
    };

    call(args).catch(console.error);
  };
    
  updateAttendance=()=>{
    if(this.state.textName=="Mark Absent")
    {
    Alert.alert(
      'Mark Absent !!!',
      'Do you want to continue?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () =>{
          markAbsent();
        }},
      ],
      { cancelable: false });
      const markAbsent=()=>
      {
        var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        
        if (this.readyState == 4 && this.status == 200) {
          var message=JSON.parse(this.responseText);
          if(message.responseMessage=="Updated Successfully")
           AlertMessage(message);
          
        }
        if (this.readyState == 4 && this.status != 200) {
          Alert.alert("Network Error","Please check your network connection");
        }
      };
      xhr.open(
        "POST",
        url.backendUrl+"updateAttendance",
        true
      );
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify({mobileNumber:this.props.route.params.mobileNumber,driverMobileNumber:this.state.driverDetails.mobileNumber,attendance:false}));
      
      const AlertMessage = (message) => {
          console.log(message);
          Alert.alert("Marked Absent","Your driver won't reach the location")
   }
      }
      this.setState({
        textName:"Mark Present",
      })
    }else
    {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        
        if (this.readyState == 4 && this.status == 200) {
          var message=JSON.parse(this.responseText);
          if(message.responseMessage=="Updated Successfully")
           AlertMessage(message);
          
        }
        if (this.readyState == 4 && this.status != 200) {
          Alert.alert("Network Error","Please check your network connection");
        }
      };
      xhr.open(
        "POST",
        url.backendUrl+"updateAttendance",
        true
      );
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify({mobileNumber:this.props.route.params.mobileNumber,driverMobileNumber:this.state.driverDetails.mobileNumber,attendance:true}));
      
      const AlertMessage = (message) => {
          console.log(message);
          Alert.alert("Marked Present","Your driver will reach the location")
   }
   this.setState({
     textName:"Mark Absent",
   })
    }
  }
  render() {
    var output=[];
     output.push(<View style={{ justifyContent: "flex-start" }} key={1}>
    <Text style={{ fontSize: 18,marginBottom:10 }}>
      {"Driver Name :"} {this.state.driverDetails.driverName}
    </Text>
    <Text style={{ fontSize: 18 ,marginBottom:10 }}>
      {"Mobile Number :"} {this.state.driverDetails.mobileNumber}
    </Text>
    <Text style={{ fontSize: 18,marginBottom:10  }}>
      {"Van Name:"} {this.state.driverDetails.vanName}
    </Text>
    <Text style={{ fontSize: 18 ,marginBottom:10 }}>
      {"Van Reg No  :"} {this.state.driverDetails.vanNumber}
    </Text>
  </View>);

      return (
        <View style={styles.container}>
        
          <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Welcome : {this.props.route.params.parentName}
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              School Name : {this.props.route.params.schoolName}
            </Text>
          <View style={styles.container1}>
          <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          borderColor: "#00c0e2",
          borderWidth: 3,
          borderRadius: 10,
          padding: 10,
          margin: 5,
        }}
      >
          {output} 
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginLeft: "auto",
            backgroundColor: "white",
            borderRadius: 10,
            alignItems: "center",
            margin: 5,
            marginLeft: 10,
          }}
        >
          <TouchableOpacity
           
            onPress={() => this.callDriver(this.state.driverDetails.mobileNumber)}
          >
                   <Image
                source={require("../assets/call-icon.png")}
              style={{
              width: 60,
              height: 60,
              borderRadius: 40 / 2,
              
              }}
        />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn2}
            onPress={() => {
              this.updateAttendance()
          }
        }
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 15,
                fontWeight: "700",
              }}
            >
             {this.state.textName} 
            </Text>
          </TouchableOpacity>
        </View>
       
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate("Tracker",{mobileNumber:this.state.driverDetails.mobileNumber})
          }
        }
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              Track Location
            </Text>
          </TouchableOpacity>
        </View>
        
        </View>
      
      );
    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  container1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 25,
    marginTop: 5,
    padding: 10,
    marginBottom: 50,
    margin: 5,
  },
  btn: {
    width: 200,
    borderRadius: 40,
    backgroundColor: "#00c0e2",
    height: 45,
    justifyContent: "center",
    marginLeft:75
  },
  blueBox: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#00c0e2", 
  },
  blueBox1: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: "skyblue",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  btn1: {
    backgroundColor: "#00c0e2",
    borderRadius: 25,
    width: 85,
    height: 38,
    justifyContent: "center",
    marginBottom:10
  },
  btn2: {
    backgroundColor: "#00c0e2",
    borderRadius: 25,
    width: 100,
    height: 38,
    justifyContent: "center",
  },
});

