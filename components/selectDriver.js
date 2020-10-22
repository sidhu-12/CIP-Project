import React, { Component } from 'react'
import { Picker,ScrollView,Platform,ActivityIndicator,Alert,StyleSheet, Button,Text,TextInput, View ,TouchableOpacity,Switch,Image,Dimensions} from 'react-native';
const url=require('../urlConstant.json');
import call from "react-native-phone-call";
export default class SelectDriver extends Component{
   constructor(props)
   {
       super(props);
       this.state={
           mobileNumber:'',
           tripTime:{
              morning:'7.30',
              evening:'4.00',
           },
           renderList:[]
          
       }
       
   }
   componentDidMount() {
    this.getDriverList();
  }
  setDriverName(object)
  {
    this.setState({
      mobileNumber:object.mobileNumber
    })
    Alert.alert("You have selected the Driver "+object.driverName);
  }
   getDriverList=()=>{
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
        url.backendUrl+"DriverList",
        true
      );
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify({schoolName:this.props.route.params.schoolName}));
      
      const setDriverList = (message) => {
          //console.log(message);
          this.setState({
            renderList:message
          }); 
   }
  }
   callDriver = (mobileNumber) => {
    const args = {
      number: mobileNumber.toString(),
      prompt: true,
    };

    call(args).catch(console.error);
  };
    submitForm=()=>{
    
      if (this.state.driverName=="") {
        Alert.alert("Please Select the Driver");
       
      }
      else if (this.state.tripTime.morning==""||this.state.tripTime.evening=="") {
        Alert.alert("Please Select the Trip Time");
      }
        else{   
          var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        
        if (this.readyState == 4 && this.status == 200) {
          var message=JSON.parse(this.responseText);
          if (message.responseMessage == "Successfully Registered") {
            nextUpdation();
          }
        }
        if (this.readyState == 4 && this.status != 200) {
          Alert.alert("Network Error","Please check your network connection");
        }
      };
      xhr.open(
        "POST",
        url.backendUrl+"registerDriver",
        true
      );
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify({
        mobileNumber:this.state.mobileNumber,
        tripTime:this.state.tripTime,
        parentMobileNumber:this.props.route.params.mobileNumber

      }));
      const nextUpdation = () => {
        
        //this.props.navigation.popToTop();
        var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
          
          var message=JSON.parse(this.responseText);
          if (message.responseMessage == "Successfully Registered") {
            completeFunction();
          }
        }
        if (this.readyState == 4 && this.status != 200) {
          Alert.alert("Network Error","Please check your network connection");
        }
      };
      xhr.open(
        "POST",
        url.backendUrl+"matchDriver",
        true
      );
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify({
        driverMobileNumber:this.state.mobileNumber,
        mobileNumber:this.props.route.params.mobileNumber

      }));
      const completeFunction=()=>{
        
      console.log(this.state.driverName+" "+JSON.stringify(this.state.tripTime));
      Alert.alert("Registered Successfully")
      this.props.navigation.popToTop();
      }
    }
  }
  };
        
   
    render(){
      var output=[];
      
      for(let i=0;i<this.state.renderList.length;i++)
      {
        
       output.push(
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
        key={i}
      >
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={{ fontSize: 16 }}>
            {"Driver Name :"} {this.state.renderList[i].driverName}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {"Mobile Number :"} {this.state.renderList[i].mobileNumber}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {"Van Name:"} {this.state.renderList[i].vanName}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {"Van Reg No  :"} {this.state.renderList[i].vanNumber}
          </Text>
        </View>
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
            style={styles.btn1}
            onPress={() => this.callDriver(this.state.renderList[i].mobileNumber)}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              Call
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn2}
            onPress={() => {
              this.setDriverName(this.state.renderList[i])
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
              Select
            </Text>
          </TouchableOpacity>
        </View>
      </View>
       )
      }     
      if (this.state.renderList.length == 0) {
        output.push(
          <View key={-1}>
            <Text>No Drivers Available</Text>
          </View>
        );
        }
    return (
      <View style={styles.container}>
      <ScrollView>
      {
        output
      }
                <Text style={{fontSize:20, alignSelf:'flex-start'}}> Trip Time</Text>
                <Picker
                mode="dialog"
            selectedValue={this.state.tripTime.morning+","+this.state.tripTime.evening}
        style={{margin:10,borderWidth:3,borderColor:"#00c0e2"}}
        onValueChange={(itemValue, itemIndex) => {this.setState({tripTime:{
          morning:itemValue.substring(0,4),
          evening:itemValue.substring(5,9)
        }
        });console.log((itemValue))}}
      >
        <Picker.Item label="Morning:7.30 AM Evening:4.00 PM" value="7.30,4.00" />
        <Picker.Item label="Morning:8.00 AM Evening:4.00 PM"value="8.00,4.00" />
        <Picker.Item label="Morning:7.30 AM Evening:4.30 PM" value="7.30,4.30" />
        <Picker.Item label="Morning:8.00 AM Evening:4.30 PM" value="8.00,4.30" />
        </Picker>
      
                
                
          <TouchableOpacity onPress={()=>{
                this.submitForm();
              }} style={styles.btnLogin}>
              <Text
                style={{ color: "white", fontSize: 20, textAlign: "center" }}
              >
                Submit
              </Text>
            </TouchableOpacity>
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
    width: WIDTH - 100,
    height: 25,
    borderRadius: 25,
    fontSize: 20,
    backgroundColor: "#00c0e2",
    justifyContent:'flex-end',
    paddingLeft: 25,
    marginTop: 10,
    marginLeft: 10,
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
});
