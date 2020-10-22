import React, { Component } from 'react'
import { ScrollView,MapView,ActivityIndicator,Alert,StyleSheet, Button,Text,TextInput, View ,TouchableOpacity,Switch,Image,Dimensions, TextComponent} from 'react-native';

import * as TaskManager from 'expo-task-manager';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const url=require("../urlConstant.json");
const LOCATION_UPDATER = 'background-location-task';
var props1;
  
class FromHome extends Component
{
  constructor(props){
      super(props);
      this.state = {
        output:'',
        destination:'',
        
      }
     this.finalList=[];
    }
    componentDidMount=()=>{
        this.getDriverDetails();
    }
    getDriverDetails=async()=>{
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        
        if (this.readyState == 4 && this.status == 200) {
          var message=JSON.parse(this.responseText);
            setDetails(message);
          
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
      xhr.send(JSON.stringify({mobileNumber:props1.route.params.mobileNumber}));
      
      const setDetails = (message) => {
          console.log(message);  
          this.setState({
            output:message,
            destination:message.schoolName,
            
          })      
        
      };
      setTimeout(()=>{var mobileNumberList=[];
      for(var i=0;i<this.state.output.listOfStudents.length;i++)
      {
          if(this.state.output.listOfStudents[i].attendance==true)
          {
            mobileNumberList.push(this.state.output.listOfStudents[i].mobileNumber);
          }
      }
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        
        if (this.readyState == 4 && this.status == 200) {
          var message=JSON.parse(this.responseText);
            setStudentDetails(message);
          
        }
        if (this.readyState == 4 && this.status != 200) {
          Alert.alert("Network Error","Please check your network connection");
        }
      };
      xhr.open(
        "POST",
        url.backendUrl+"getStudentList",
        true
      );
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify({mobileNumberList:mobileNumberList}));
      
      const setStudentDetails = (message) => {
          console.log(message);  
          this.studentList=message;  
        
      };
    },500)
    }
    getStudentsList=(time)=>{
      var list=this.state.output.listOfStudents;
      

      for(let i=0;i<list.length;i++)
      {
        if(list[i].tripTime.morning==time)
        {
            for(let j=0;j<this.studentList.length;j++)
            {

              if(list[i].mobileNumber==this.studentList[j].mobileNumber)
              {
                this.finalList.push(this.studentList[j])
              }
            }
        }
      }
      if(this.finalList.length>0)
      {
      this.props.navigation.navigate("Student List",{
        studentList:this.finalList,
        time:time,
        destination:this.state.destination,
        mobileNumber:props1.route.params.mobileNumber
      });
    }
    else{
      Alert.alert("No students are available");
    }
      this.finalList=[];
    }
      
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={{textAlign:'center',fontSize:16,fontWeight:"bold"}}>
          {"Welcome "+this.state.output.driverName}
        </Text>
        <Text style={{textAlign:'center',fontSize:16,fontWeight:"bold"}}>
          {"School Name: "+this.state.destination}
        </Text>
        <ScrollView
      style={{ marginTop: 10 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.container1}>
        <View
      style={styles.blueBox}
    >
      <View style={{ justifyContent: "flex-start" }}>
        <Text style={{ fontSize: 18 }}>
          {"From: Home Location"}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {"To: "}{this.state.destination}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {"Trip Time: "}{"7.30 AM"}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
          marginLeft: "auto",
          backgroundColor: "white",
          borderRadius: 10,
          alignItems: "center",
          margin: 5,
          marginLeft: 10,
        }}
      >
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => this.getStudentsList('7.30')}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            View Student List
          </Text>
          </TouchableOpacity>
       
      </View>
     
    </View>
    </View>
    <View style={styles.container1}>
    <View style={styles.blueBox}
    >
      <View style={{ justifyContent: "flex-start" }}>
        <Text style={{ fontSize: 18 }}>
          {"From: "}{this.state.destination}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {"To: "}{this.state.destination}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {"Trip Time: "}{"8.00 AM"}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
          marginLeft: "auto",
          backgroundColor: "white",
          borderRadius: 10,
          alignItems: "center",
          margin: 5,
          marginLeft: 10,
        }}
      >
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => this.getStudentsList('8.00')}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            View Student List
          </Text>
          </TouchableOpacity>
       
      </View>
      
    </View>
    </View>
    </ScrollView>
          </View>
      
    );
  }
}
class ToHome extends Component{
  constructor(props){
    super(props);
    this.state = {
        output:'',
        destination:'',
        
    }
    this.finalList=[];
    this.studentList=[];
    }
    componentDidMount=()=>{
        this.getDriverDetails();
        
    }
    getDriverDetails=async()=>{
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        
        if (this.readyState == 4 && this.status == 200) {
          var message=JSON.parse(this.responseText);
          setDetails(message);
          
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
      xhr.send(JSON.stringify({mobileNumber:props1.route.params.mobileNumber}));
      
      const setDetails = (message) => {
          console.log(message);  
          this.setState({
            output:message,
            destination:message.schoolName,
            
          })      
        
      };
      setTimeout(()=>{var mobileNumberList=[];
      for(var i=0;i<this.state.output.listOfStudents.length;i++)
      {
          if(this.state.output.listOfStudents[i].attendance==true)
          {
            mobileNumberList.push(this.state.output.listOfStudents[i].mobileNumber);
          }
      }
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        
        if (this.readyState == 4 && this.status == 200) {
          var message=JSON.parse(this.responseText);
          setStudentDetails(message);
          
        }
        if (this.readyState == 4 && this.status != 200) {
          Alert.alert("Network Error","Please check your network connection");
        }
      };
      xhr.open(
        "POST",
        url.backendUrl+"getStudentList",
        true
      );
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify({mobileNumberList:mobileNumberList}));
      
      const setStudentDetails = (message) => {
          console.log(message);  
          this.studentList=message;  
        
      };
    },500)
    }
   

    takeAttendance=(time)=>{
    
      var list=this.state.output.listOfStudents;
      

      for(let i=0;i<list.length;i++)
      {
        if(list[i].tripTime.evening==time)
        {
            for(let j=0;j<this.studentList.length;j++)
            {

              if(list[i].mobileNumber==this.studentList[j].mobileNumber)
              {
                this.finalList.push(this.studentList[j])
              }
            }
        }
      }
      if(this.finalList.length>0)
      {
      this.props.navigation.navigate("Attendance",{
        studentList:this.finalList,
        time:time,
        destination:this.state.destination,
        mobileNumber:props1.route.params.mobileNumber
      });
    }
    else
    {
      Alert.alert("No students are Present or available");
    }
      this.finalList=[];
    }
    
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={{textAlign:'center',fontSize:16,fontWeight:"bold"}}>
          {"Welcome "+this.state.output.driverName}
        </Text>
        <Text style={{textAlign:'center',fontSize:16,fontWeight:"bold"}}>
          {"School Name: "+this.state.destination}
        </Text>
        <ScrollView
      style={{ marginTop: 10 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.container1}>
      <View
      style={styles.blueBox}
    >
      <View style={{ justifyContent: "flex-start" }}>
        <Text style={{ fontSize: 18 }}>
          {"From: "} {this.state.destination}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {"To: "} {this.state.destination}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {"Trip Time: "}{"4.00 PM"}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
          marginLeft: "auto",
          backgroundColor: "white",
          borderRadius: 10,
          alignItems: "center",
          margin: 5,
          marginLeft: 10,
        }}
      >
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => this.takeAttendance('4.00')}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: "700",
            }}
          >
          Take Attendance
          </Text>
          
          </TouchableOpacity>

      </View>
    </View>
    </View>
    <View style={styles.container1}>
    <View style={styles.blueBox}
    >
      <View style={{ justifyContent: "flex-start" }}>
        <Text style={{ fontSize: 18 }}>
          {"From: "} {this.state.destination}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {"To: "} {"Location of Last Student"}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {"Trip Time: "}{"4.30 PM"}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
          marginLeft: "auto",
          backgroundColor: "white",
          borderRadius: 10,
          alignItems: "center",
          margin: 5,
          marginLeft: 10,
        }}
      >
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => this.takeAttendance('4.30')}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: "700",
            }}
          >
          Take Attendance
          </Text>
          </TouchableOpacity>
      </View>
    </View>
    </View>
    </ScrollView>
          </View>
    
    );
  }
}
  const Tab = createBottomTabNavigator();
export default function DashBoardDriver(props) {
  props1 = props;
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "black",
        activeBackgroundColor: "#00c0e2",
        inactiveBackgroundColor: "white",
        tabStyle: {
          borderLeftWidth: 3,
          borderLeftColor: "white",
          borderRightWidth: 3,
          borderRightColor: "white",
          borderTopWidth: 3,
          borderTopColor: "white",
          borderBottomWidth: 3,
          borderBottomColor: "white",
          borderRadius: 10,
        },
        labelStyle: {
          fontSize: 20,
          fontWeight: "100",
          marginBottom: 8,
        },
      }}
    >
      <Tab.Screen name="From Home" component={FromHome} />
      <Tab.Screen name="To Home" component={ToHome} />
    </Tab.Navigator>
  );
}
const { width: WIDTH } = Dimensions.get("window");
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "white",
alignItems: 'center',
justifyContent: 'center'
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
width: 130,
height: 40,
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
