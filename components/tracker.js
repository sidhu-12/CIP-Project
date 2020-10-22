import React, { Component } from 'react'
import { PermissionsAndroid,ScrollView,ActivityIndicator,Alert,StyleSheet, Button,Text,TextInput, View ,TouchableOpacity,Switch,Image,Dimensions, BackHandler} from 'react-native';
import MapView, {Marker,PROVIDER_GOOGLE,AnimatedRegion,Polyline} from 'react-native-maps';
const url=require("../urlConstant.json");
const LATITUDE_DELTA=0.0005;
const LONGITUDE_DELTA=0.00035;
export default class Tracker extends Component{
    constructor(props){
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
           showMap:false,
           routeCoordinates:[],
        }
        this.routeCoordinates=[];
        
       }
       componentDidMount=()=>{
         this.startTrack();
       }
       startTrack=()=>
       {
            this.setTime=setInterval(() => {
            var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          console.log(this.readyState);
          console.log(this.responseText);
          if (this.readyState == 4 && this.status == 200) {
            var message=JSON.parse(this.responseText);
            
              responseFunction(message);
            
          }
          if (this.readyState == 4 && this.status != 200) {
            Alert.alert("Network Error","Please check your network connection");
          }
        };
        xhr.open(
          "POST",
          url.backendUrl+"locationFetcher",
          true
        );
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({
          mobileNumber:this.props.route.params.mobileNumber,
        }));
        const responseFunction = (location) => {
            if(location.latitude==0&&location.longitude==0)
            {
                console.log("Location 0");
                Alert.alert("Sorry for the inconvenience","The Driver has stopped has sharing the location");
                clearInterval(this.setTime);
                this.props.navigation.pop();
            }
            else
            {
            this.setState({
                latitude:location.latitude,
                longitude:location.longitude,
                showMap:true,
            });
            this.setState(
              {
                routeCoordinates:this.routeCoordinates.concat({
              latitude:location.latitude,
              longitude:location.longitude,
                
            })});
          console.log("Location Received");
        }
        
        };
               
           }, 5000);
       }
       componentWillUnmount(){
        clearInterval(this.setTime);
       }

       render()
       {
           return(
            <View style={styles.container}>
           {this.state.showMap&&(<MapView
               
               provider={PROVIDER_GOOGLE}
               region={{
                 latitude:this.state.latitude,
                 longitude:this.state.longitude,
                 latitudeDelta:LATITUDE_DELTA,
                 longitudeDelta:LONGITUDE_DELTA,
               }
               }
               style={{ ...StyleSheet.absoluteFillObject }}
             >
              
              <Polyline coordinates={this.state.routeCoordinates}
              strokeColor="red"
              strokeWidth={12}
              
              />
    <Marker
      coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}
      title={"Driver Location"}
    />
  </MapView>)}
         </View>
           )
       }
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
  btnLogin: {
    width: WIDTH - 60,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#00c0e2",
    justifyContent: "center",
    paddingLeft: 20,
    marginTop: 10,
    marginLeft: 10,
    marginTop: 40,
  },
});
