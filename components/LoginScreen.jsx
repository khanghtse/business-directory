import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { Colors } from "../constants/Colors";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = useCallback(async () => {
    try {
      const {createSessionId, signIn, signUp, setActive} = await startOAuthFlow();

      if (createSessionId) {
        setActive({ session: createSessionId });
      } else {

      }
    } catch (error) {
      console.error("OAuth error", error);
    }
  }, []);

  return (
    <View>

      <View style={{
        display: "flex",
        alignItems: "center",
        marginTop: 100
      }}>
        <Image
          source={require("./../assets/images/partial-react-logo.png")}
          style={{
            width: 250,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000"
          }}
        />
      </View>

      <View style={styles.subContainer}>
          <Text style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}>Your Ultimate
            <Text style={{
            color: Colors.PRIMARY,
          }}> Community Business Directory</Text> App</Text>

          <Text style={{
            fontSize:15,
            fontFamily: 'outfit',
            textAlign: "center",
            marginVertical:15,
            color: Colors.GRAY
          }}>Find your favorite business near your and post your own business to your community </Text>
      
          <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={{
              textAlign: "center",
              color: "#fff",
              fontFamily: "outfit",
            }}>Let's Get Started</Text>
          </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding:20,
    marginTop:-20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius:99,
    marginTop:20
  }
})
