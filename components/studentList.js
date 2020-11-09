import React, { Component } from 'react'
import { ScrollView,MapView,ActivityIndicator,Alert,StyleSheet, Button,Text,TextInput, View ,TouchableOpacity,Switch,Image,Dimensions, TextComponent,RefreshControl} from 'react-native';
import getDirections from 'react-native-google-maps-directions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import call from "react-native-phone-call";
const url=require("../urlConstant.json");
const LOCATION_UPDATER = 'background-location-task';
var props1;
TaskManager.defineTask(LOCATION_UPDATER,({data,error})=>{
  if(error)
  {
    console.log(error);
  }
  else
  {
    
    const { locations }=data;
    console.log("Received new location "+ JSON.stringify(locations)+" " +new Date());
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      console.log(this.readyState);
      console.log(this.responseText);
      if (this.readyState == 4 && this.status == 200) {
        
        
          responseFunction();
        
      }
      if (this.readyState == 4 && this.status != 200) {
        Alert.alert("Network Error","Please check your network connection");
      }
    };
    xhr.open(
      "POST",
      url.backendUrl+"locationUpdater",
      true
    );
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(
      {
        latitude:locations[0].coords.latitude,
        longitude:locations[0].coords.longitude,
        mobileNumber:props1.route.params.mobileNumber
      }
    ));
    const responseFunction = () => {
      console.log("Location Updated Successfully to Backend");
      
    };
  }
    
  }
);
  
export class StudentList extends Component{
    constructor(props){
      super(props);
      this.state = {
         output:'',
         destination:'',
         textName:"Start Trip",
        time:'',
        refreshing:false,
      }
     this.expoTokens=[];
     this.waypoints=[];
     this.output=[];
     this.list=[];
     props1=this.props;
     //this.onStateChange=this.onStateChange.bind(this);

     }
     componentDidMount=()=>{
      this.list=this.props.route.params.studentList;
      this.setState({
          time:this.props.route.params.time,
          destination:this.props.route.params.destination,
      })
      
      console.log(this.list);
      /*if(this.list.length==0)
      {
      Alert.alert("No students are registered/present under this trip ");
       this.props.navigation.pop();
      }*/
     }
     onRefresh=()=>{
       this.setState({
         refreshing:true,
       })
      this.list=this.props.route.params.studentList;
      this.setState({
          time:this.props.route.params.time,
          destination:this.props.route.params.destination,
          refreshing:false,
      })
      
      console.log(this.list);
     }
    
   
     callDriver = (mobileNumber) => {
      const args = {
        number: mobileNumber.toString(),
        prompt: true,
      };
  
      call(args).catch(console.error);
    };

 
    handleGetDirections = async(time) => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Please give the Location access to continue");
        }
        else
        {
        let sourceLocation = await Location.getCurrentPositionAsync({});
      
            
        let destinationLocation= await Location.geocodeAsync(this.state.destination);
     
        var locationData;
        if(time=='7.30')
        {
          console.log(this.waypoints1);
          locationData = {
            source: {
            latitude: sourceLocation.latitude,
            longitude: sourceLocation.longitude,
          },
          destination: {
            latitude: destinationLocation[0].latitude,
            longitude: destinationLocation[0].longitude,
          },
          params: [
            {
              key: "travelmode",
              value: "driving"        
            },
            {
              key: "dir_action",
              value: "navigate"      
            }
          ],
          waypoints: this.waypoints
        }
        this.setState({textName:"End Trip"})
      }
      else
      {
        {
            locationData = {
              source: {
              latitude: destinationLocation[0].latitude,
              longitude: destinationLocation[0].longitude,
            },
            destination: {
              latitude: destinationLocation[0].latitude,
              longitude: destinationLocation[0].longitude,
            },
            params: [
              {
                key: "travelmode",
                value: "driving"        
              },
              {
                key: "dir_action",
                value: "navigate"      
              }
            ],
            waypoints: this.waypoints
          }
        }
        this.setState({textName:"End Trip"})
      }
    
        getDirections(locationData);
        await Location.startLocationUpdatesAsync(LOCATION_UPDATER, {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval:10,
          foregroundService:{
            notificationTitle:"Sharing Location to Parents",
            notificationBody:"Driver , Your location is being shared",
          }
        });
        this.waypoints=[];
      
      }
    }
    endTrip=async()=>
    {
      Location.stopLocationUpdatesAsync(LOCATION_UPDATER);
        Alert.alert("Stopped Sharing","Your location sharing has been stopped.");
      var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
    console.log(this.readyState);
    console.log(this.responseText);
    if (this.readyState == 4 && this.status == 200) {
      
      
        responseFunction();
      
    }
    if (this.readyState == 4 && this.status != 200) {
      Alert.alert("Network Error","Please check your network connection");
    }
  };
  xhr.open(
    "POST",
    url.backendUrl+"locationUpdater",
    true
  );
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(
    {
      latitude:0,
      longitude:0,
      mobileNumber:props1.route.params.mobileNumber
    }
  ));
  const responseFunction = () => {
    console.log("Location Updated Successfully to Backend");
    
  };
    console.log(this.expoTokens);
      
        for(var i =0;i<this.expoTokens.length;i++)
        {
        const message = {
          to: this.expoTokens[i],
          sound: 'default',
          title: 'Reached !!!!',
          body: 'Your ward has reached safely',
          data: { data: 'Thala' },
        };
      
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
        
      }
      this.expoTokens=[];
        this.setState({textName:"Start Trip"})
      }
      
  
    
   render() 
   {
   
    this.output=[];
    this.expoTokens=[];
    this.waypoints=[];
   
    for(let i=0;i<this.list.length;i++)
   {
       this.expoTokens.push(this.list[i].expoToken["_W"]);
        this.waypoints.push({
            latitude:this.list[i].locationLatitude,
            longitude:this.list[i].locationLongitude,
        })
              console.log(this.list[i].studentName);
              this.output.push(
                <View key={i} style={styles.blueBox} >
                <View style={{justifyContent:"flex-start"}}>
                <Text style={{fontSize:18,marginBottom:10}}> 
                 Student Name: {this.list[i].studentName}
                </Text>
                <Text style={{fontSize:18,marginBottom:10}}> 
                 Mobile Number: {this.list[i].mobileNumber}
                </Text>
                </View>
                <View style={{justifyContent:'space-between',alignSelf:'flex-end',marginLeft:'auto'}}>
                <TouchableOpacity onPress={()=>{
                  this.callDriver(this.list[i].mobileNumber)
                }}
                style={{
                  alignItems:"flex-end"
                }}
                >
                   <Image
      source={require("../assets/call-icon.png")}
    style={{
    width: 50,
    height: 50,
    borderRadius: 40 / 2,
    }}
/>
                  
                </TouchableOpacity>
                </View>
                </View>
              
              ) 
          }
 
     
     return (
       <View style={styles.container}>
         <Text style={{textAlign:'center',fontSize:16,fontWeight:"bold"}}>
           {"LIST OF STUDENTS"}
         </Text>
         <Text style={{textAlign:'center',fontSize:16,fontWeight:"bold"}}>
           {"Time: "} {this.state.time} { "PM"}
         </Text>
         <ScrollView
      style={{ marginTop: 10 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={true}
      refreshControl={
        <RefreshControl refreshing={this.state.refreshing} 
        onRefresh={this.onRefresh} 
        enabled={true}
/>}>

       <View style={styles.container1}>
         {this.output}
        </View>
     </ScrollView>
     <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => {
              this.state.textName=="Start Trip"?this.handleGetDirections(this.state.time):this.endTrip(this.state.time);
          }
        }
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              {this.state.textName}
            </Text>
          </TouchableOpacity>
           </View>
      
     );
   }
  }
     
    
const { width: WIDTH } = Dimensions.get("window");
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
  input: {
    width: WIDTH - 60,
    height: 45,
    borderRadius: 25,
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingLeft: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  locationButton: {
    width: WIDTH - 100,
    height: 25,
    borderRadius: 20,
    fontSize: 20,
    backgroundColor: "#00c0e2",
    justifyContent:'center',
    paddingLeft: 25,
    marginTop: 0,
    marginLeft: 20,
  },
  btnLogin: {
    width: WIDTH - 30,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#00c0e2",
    justifyContent: "center",
    padding: 20,
    marginTop: 0,
    marginLeft: 15,

  },
  btn1: {
    backgroundColor: "#00c0e2",
    borderRadius: 25,
    width: 90,
    height: 38,
    justifyContent: "center",
  },
  btn2: {
    backgroundColor: "#00c0e2",
    borderRadius: 25,
    width: 90,
    height: 38,
    justifyContent: "center",
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
    flexDirection:"row",
    },
});
