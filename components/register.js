import React, { Component } from 'react'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Picker,ScrollView,Platform,ActivityIndicator,Alert,StyleSheet, Button,Text,TextInput, View ,TouchableOpacity,Switch,Image,Dimensions} from 'react-native';
import MapView, {Marker,PROVIDER_GOOGLE} from 'react-native-maps';
const url=require("../urlConstant.json");
const LATITUDE_DELTA=0.000012;
const LONGITUDE_DELTA=0.00035;
import * as Location from 'expo-location';
export default class Register extends Component{
   constructor(props)
   {
       super(props);
       this.state={
           parentName:'',
           studentName:'',
           mobileNumber:'',
           locationLatitude:0,
           locationLongitude:0,
           password:'',
           schoolName:"St.John's Matriculation Higher Secondary School,Porur",
           expoToken:'',
           showMap:false,

       }
       this.locationAddress=[{
         street:'',
         region:'',
         district:'',
         city:'',
       }];
       
   }
   componentDidMount()
   {
    this.setState({expoToken:this.registerForPushNotificationsAsync()});
   }
   registerForPushNotificationsAsync=async()=>{
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        enableLights:true,
        showBadge:true,
      });
    }
  
    return token;
  }
    submitForm=()=>{
      var name_pattern = /[a-zA-Z .]+/;
      var num_pattern = /^[0-9]{10}$/;
      if (!name_pattern.test(this.state.parentName)||this.state.parentName=="") {
        Alert.alert("Please Fill the appropriate Parent Name");
       
      }
      if (!name_pattern.test(this.state.studentName)||this.state.studentName=="") {
        Alert.alert("Please Fill the appropriate Student Name");
       
      } else if (
        this.state.mobileNumber == "" ||
        !num_pattern.test(this.state.mobileNumber)
      ) {
        Alert.alert("Please Fill the Correct Mobile Number");
        
      }
        else{   
          
          var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        
        if (this.readyState == 4 && this.status == 200) {
          var message=JSON.parse(this.responseText);
          if (message.responseMessage == "Successfully Registered") {
            navigate();
          }
        }
        if (this.readyState == 4 && this.status != 200) {
          Alert.alert("Network Error","Please check your network connection");
        }
      };
      xhr.open(
        "POST",
        url.backendUrl+"register",
        true
      );
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(this.state));
      const navigate = () => {
        Alert.alert("Successfully done");
        this.props.navigation.navigate("SelectDriver",{schoolName:this.state.schoolName,mobileNumber:this.state.mobileNumber});
        //this.props.navigation.pop();
      };
    }
  };
  getLocation=async()=>
  {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Please give the access to the location to continue");
    }
    else
    {
    let location = await Location.getCurrentPositionAsync({});
    let address=await Location.reverseGeocodeAsync({latitude:location.coords.latitude,longitude:location.coords.longitude});
    this.locationAddress=address;
      this.setState({
        locationLatitude:location.coords.latitude,
        locationLongitude:location.coords.longitude,
      })
      this.setState({
        showMap:true,
      });
    }
  
    
  } 
  setLocationByUser=async(location)=>{
    let address=await Location.reverseGeocodeAsync({latitude:location.coordinate.latitude,longitude:location.coordinate.longitude});
                      this.locationAddress=address;
                  this.setState({
                    locationLatitude:location.coordinate.latitude,
                  locationLongitude:location.coordinate.longitude,
                })
            this.setState({
               showMap:true,
            });
  }  
   
    render(){
    return (
      <View style={styles.container}>
      <ScrollView>
          <Text style={{fontSize:20}}>Parent's Name</Text>
           <TextInput  
                     style={styles.input}
                    placeholder="Eg:Raj"  
                    onChangeText={parentName => this.setState({parentName})}
                />
                <Text style={{fontSize:20}}>Student's Name</Text>

                
                <TextInput  
                    style={styles.input}
                    placeholder="Eg:Ravi"  
                    onChangeText={studentName => this.setState({studentName})}
                />  
                 <Text style={{fontSize:20}}>Mobile Number</Text>
                <TextInput  
                     style={styles.input}
                    placeholder="Eg:9876543210"  
                    keyboardType="numeric"
                    onChangeText={mobileNumber => this.setState({mobileNumber})}
                />
                <Text style={{fontSize:20, alignSelf:'flex-start'}}>School Name</Text>
                <Picker
                mode="dialog"
        selectedValue={this.state.schoolName}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => this.setState({schoolName:itemValue})}
      >
        <Picker.Item label="St.John's Matriculation Higher Secondary School,Porur" value="St.John's Matriculation Higher Secondary School,Porur" />
        <Picker.Item label="Devi Academy Senior Secondary School,Valasaravakkam" value="Devi Academy Senior Secondary School,Valasaravakkam" />
        <Picker.Item label="Swamy's School,Porur" value="Swamy's School,Porur" />
      </Picker>
                 <Text style={{fontSize:20}}>Set Password</Text>
                <TextInput  
                secureTextEntry={true}
                style={styles.input}
                    placeholder="Enter Password"  
                    onChangeText={password => this.setState({password})}
                />
                
                <Text style={{fontSize:20}}>Home Location</Text>
                < TouchableOpacity
                onPress={()=>{
                  this.getLocation();
                }}
                style={styles.locationButton}
                    
                >
                   <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>Get Current Location</Text>
                </TouchableOpacity>
                <Text style={{fontSize:20}}>
                  {this.locationAddress[0].street} {this.locationAddress[0].region} {this.locationAddress[0].district} {this.locationAddress[0].city}
                  </Text>
                  <TouchableOpacity onPress={()=>{
                this.submitForm();
              }} style={styles.btnLogin}>
              <Text
                style={{ color: "white", fontSize: 20, textAlign: "center" }}
              >
                Submit
              </Text>
            </TouchableOpacity>
                  {this.state.showMap&&(
                    <View
                    style={{ ...StyleSheet.absoluteFillObject }}>
                       
                    <MapView
                    provider={PROVIDER_GOOGLE}
                    region={
                      {
                        latitude:this.state.locationLatitude,
                        longitude:this.state.locationLongitude,
                        latitudeDelta:LATITUDE_DELTA,
                        longitudeDelta:LONGITUDE_DELTA,
                      }
                      
                    }
                    style={{ ...StyleSheet.absoluteFillObject }}
                    onPress={(point)=>{
                      var location=point.nativeEvent;
                      setTimeout(()=>{
                      this.setLocationByUser(location)
                      },1000);
                      console.log(point.nativeEvent);
                      
    
                    }
                      

                    }
                    >
                      <Marker  pinColor="#00c0e2" coordinate={{latitude:this.state.locationLatitude,longitude:this.state.locationLongitude}}/>
                   
                    </MapView>
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                          showMap:false
                        });
                        
                      }}
                      style={styles.locationButton} >
                      <Text
                        style={{ color: "white", fontSize: 20, textAlign: "center"  }}
                      >
                        Set Location
                      </Text>
                    </TouchableOpacity>
                    </View>

                  )}
         
     </ScrollView>
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
    width: WIDTH - 60,
    height: 45,
    borderRadius: 20,
    fontSize: 20,
    backgroundColor: "#00c0e2",
    justifyContent:'center',
    paddingLeft: 20,
    marginTop: 10,
    marginLeft: 30,
  },
  btnLogin: {
    width: WIDTH - 60,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#00c0e2",
    justifyContent: "center",
    padding: 20,
    marginTop: 10,
    marginLeft: 10,
    marginTop: 40,
  },
});
