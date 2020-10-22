import 'react-native-gesture-handler';
import React,{Component} from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Image, Keyboard,Platform,Alert,StyleSheet,Text,TextInput, View ,TouchableOpacity,Dimensions,KeyboardAvoidingView} from 'react-native';
const url=require("../urlConstant.json")
var props1;
 class LoginParent extends Component {  
  constructor(props) { 
    super(props);  
    this.state = { 
        username:'', 
        password: '',  
        isPasswordVisible: true,
        loginInProcess:false,  
        toggleText: 'Show', 
        keyboardOffset:0, 
    }; 
  }
    handleToggle = () => {  
      const { isPasswordVisible } = this.state;  
      if (isPasswordVisible) {  
          this.setState({ isPasswordVisible: false });  
          this.setState({ toggleText: 'Hide' });  
      } else {  
          this.setState({ isPasswordVisible: true });  
          this.setState({ toggleText: 'Show' });  
      }  
  };  
  componentWillUnmount=()=>{
    if(Platform.OS=='ios')
    {
        Keyboard.dismiss();
    }
  }
  submitForm =()=>{ 
    const {username,password}=this.state;
    var num_pattern = /^[0-9]{10}$/;
    if(this.state.username==''||this.state.password=='')
    {
      Alert.alert("Please enter the Mobile Number or password");
    }else if (!num_pattern.test(this.state.username)) {
      Alert.alert("Please Fill the Correct Mobile Number");}
     else
    {
    var auth = {
      username: username,
      password: password
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      console.log(this.readyState);
      if (this.readyState == 4 && this.status == 200) {
        var message=JSON.parse(this.responseText);
        if (message.responseMessage == "Login Successfully") {
          navigate(message);
        }
        else
        {
          Alert.alert(message.responseMessage);
        }
      }
      if (this.readyState == 4 && this.status != 200) {
        Alert.alert("Network Error","Please check your network connection");
      }
    };
    xhr.open(
      "POST",
      url.backendUrl+"login",
      true
    );
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(auth));
    const navigate = (message) => {
      Alert.alert("Login Successfully");
      props1.navigation.navigate("DashboardParent",{
        mobileNumber:auth.username,
        parentName:message.parentName,
        driverMobileNumber:message.driverMobileNumber,
        schoolName:message.schoolName,
      });
    };
  }
    this.setState({loginInProcess:false})

  }


  render() {
    
    return(
 
      <View style={styles.container}>
         <View style={styles.imageContainer}>
            <Image
              style={{ resizeMode: "stretch" }}
              source={require("../assets/icon.png")}
            />
            <View>
              <Text style={{ fontSize: 15 }}>
                 <Text style={{ color: "#00c0e2",fontSize:20}}>Creative and Innovative Project</Text> 
              </Text>
            </View>
          </View>
      <KeyboardAvoidingView behavior={"height"} style={styles.container1}>
      <View style={{flexDirection:'row'}}>
      <View style={{alignItems:'flex-end'}}>
      <TextInput  
                   style={styles.input}
                    placeholder="Enter Mobile Number"  
                    keyboardType="numeric"
                    onChangeText={username => this.setState({username})}
                   
                />
                </View>
                </View>
            

      <TextInput  secureTextEntry={this.state.isPasswordVisible}
                   style={styles.input}  
                    placeholder="Enter Password" 
                    ref={ref => (this.passwordInput = ref)} 
                    onChangeText={password => this.setState({password})}
                    onSubmitEditing={this.submitForm} 
                />
                
                <View>
                 <TouchableOpacity onPress={()=>{this.handleToggle()}}>  
                 <Text  style={{fontSize: 20}}>{this.state.toggleText}</Text>  
                 </TouchableOpacity>
                 </View>
                 <TouchableOpacity onPress={()=>{
              if(this.state.loginInProcess==false)
              {
                this.setState({loginInProcess:true});
                this.submitForm();
              }

              
            }} style={styles.btnLogin}>
              <Text
                style={{ color: "white", fontSize: 20, textAlign: "center" }}
              >
                Login
              </Text>
            </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          props1.navigation.navigate("Register")
        }}>  
                 <Text  style={{fontSize: 14,color:'blue',fontWeight:"100",textDecorationLine:'underline'}}>Don't have an account? Register as a Parent</Text>  
                 </TouchableOpacity>
     </KeyboardAvoidingView>
     </View>

  );

    }
    }
class LoginDriver extends Component {  
  constructor(props) { 
    super(props);  
    this.state = { 
        username:'', 
        password: '',  
        isPasswordVisible: true,
        loginInProcess:false,  
        toggleText: 'Show', 
        keyboardOffset:0, 
    }; 
  }
    handleToggle = () => {  
      const { isPasswordVisible } = this.state;  
      if (isPasswordVisible) {  
          this.setState({ isPasswordVisible: false });  
          this.setState({ toggleText: 'Hide' });  
      } else {  
          this.setState({ isPasswordVisible: true });  
          this.setState({ toggleText: 'Show' });  
      }  
  };  
  componentWillUnmount=()=>{
    if(Platform.OS=='ios')
    {
        Keyboard.dismiss();
    }
  }
  submitForm =()=>{ 
    const {username,password}=this.state;
    var num_pattern = /^[0-9]{10}$/;
    if(this.state.username==''||this.state.password=='')
    {
      Alert.alert("Please enter the Mobile Number or password");
    }else if (!num_pattern.test(this.state.username)) {
      Alert.alert("Please Fill the Correct Mobile Number");}
     else
    {
    var auth = {
      username: username,
      password: password
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      console.log(this.readyState);
      if (this.readyState == 4 && this.status == 200) {
        var message=JSON.parse(this.responseText);
        if (message.responseMessage == "Login Successfully") {
          navigate();
        }
        else
        {
          Alert.alert(message.responseMessage);
        }
      }
      if (this.readyState == 4 && this.status != 200) {
        Alert.alert("Network Error","Please check your network connection");
      }
    };
    xhr.open(
      "POST",
      url.backendUrl+"loginDriver",
      true
    );
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(auth));
    const navigate = () => {
      Alert.alert("Login Successfully");
      props1.navigation.navigate("DashBoard",{
        mobileNumber:auth.username
      });
    };
  }
    this.setState({loginInProcess:false})

  }


  render() {
    
    return(
 
      <View style={styles.container}>
         <View style={styles.imageContainer}>
            <Image
              style={{ resizeMode: "stretch" }}
              source={require("../assets/icon.png")}
            />
            <View>
              <Text style={{ fontSize: 15 }}>
                 <Text style={{ color: "#00c0e2",fontSize:20}}>Creative and Innovative Project</Text> 
              </Text>
            </View>
          </View>
      <KeyboardAvoidingView behavior={ "height"} style={styles.container1}>
      <View style={{flexDirection:'row'}}>
      <View style={{alignItems:'flex-end'}}>
      <TextInput  
                   style={styles.input}
                    placeholder="Enter Mobile Number"  
                    keyboardType="numeric"
                    onChangeText={username => this.setState({username})}
                   
                />
                </View>
                </View>
            

      <TextInput  secureTextEntry={this.state.isPasswordVisible}
                   style={styles.input}  
                    placeholder="Enter Password" 
                    ref={ref => (this.passwordInput = ref)} 
                    onChangeText={password => this.setState({password})}
                    onSubmitEditing={this.submitForm} 
                />
                
                <View>
                 <TouchableOpacity onPress={()=>{this.handleToggle()}}>  
                 <Text  style={{fontSize: 20}}>{this.state.toggleText}</Text>  
                 </TouchableOpacity>
                 </View>
                 <TouchableOpacity onPress={()=>{
              if(this.state.loginInProcess==false)
              {
                this.setState({loginInProcess:true});
                this.submitForm();
              }

              
            }} style={styles.btnLogin}>
              <Text
                style={{ color: "white", fontSize: 20, textAlign: "center" }}
              >
                Login
              </Text>
            </TouchableOpacity>
     </KeyboardAvoidingView>
     </View>

  );

    }
    }
    const Tab = createBottomTabNavigator();
export default function Login(props) {
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
      <Tab.Screen name="Login as Parent" component={LoginParent} />
      <Tab.Screen name="Login as Driver" component={LoginDriver} />
    </Tab.Navigator>
  );
}


    const { width: WIDTH } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 40,
  },
});
