import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
const SCREEN_WIDTH = Dimensions.get("window").width; //해당 기기의 위드를 가져옴
const API_KEY = "9085b59875dd89f0d4bbe5779c2a300b";

export default function App() {
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("Loading...");

  const getWeather = async () => {
    const permission = await Location.requestForegroundPermissionsAsync(); //위치 허용 요청
    const { granted } = await Location.requestForegroundPermissionsAsync(); //위치 허용 요청
    // console.log("permission", permission);

    if (!granted) {
      //유저가 위치 허용 요청을 거절하면
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 6 }); //유저의 위치(위도와 경도)를 가져옴
    // console.log();
    const location = await Location.reverseGeocodeAsync(
      //위의 받아온 좌표로 나라를 나타냄
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    // // console.log("location", location[0].city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    console.log(json);
    setDays(json.daily);
  };

  // console.log(days);
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Pressable>
          <Entypo name="menu" size={24} color="black" />
        </Pressable>
        <Text style={{ fontSize: 25 }}>{city}</Text>
        <Pressable>
          <Feather name="search" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.city}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Monday</Text>
        <Text style={{ fontSize: 18, marginTop: 5 }}>04 September</Text>
      </View>
      {ok ? (
        <>
          <ScrollView
            horizontal //수평
            pagingEnabled //스크롤을 완전히 넘겨야 넘겨지는 props
            showsHorizontalScrollIndicator={false} // pagingEnabled을 사용했을때 아래에 스크롤바의 유무
            contentContainerStyle={styles.temperature} //일반 스타일은 안먹힘
          >
            {days.length > 0 ? (
              days.map((item, i) => (
                <View key={i} style={styles.day}>
                  <Text style={{ fontSize: 120, fontWeight: "bold" }}>
                    {`${parseFloat(item.temp.day).toFixed(1)}º`}
                  </Text>
                  <Text style={{ fontSize: 20 }}>{item.weather[0].main}</Text>
                  <Text>{item.weather[0].description}</Text>
                </View>
              ))
            ) : (
              <View style={styles.day}>
                <ActivityIndicator size="large" color="white" />
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <View style={{ justifyContent: "space-between" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>21</Text>
              <Text style={{ fontSize: 18 }}>0% Precipitation</Text>
            </View>
            <View style={{ justifyContent: "space-between" }}>
              <Text style={{ fontSize: 18 }}>8</Text>
              <Text style={{ fontSize: 18, marginTop: 3 }}>3 km/h Wind</Text>
            </View>
          </View>
        </>
      ) : (
        <Text> 위치를 허용해 주세요. </Text>
      )}
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "teal",
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
  },
  top: {
    flex: 0.5,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  city: {
    flex: 0.6,
    // backgroundColor: "green",
    justifyContent: "center",
    borderBottomColor: "black",
    borderStyle: "solid",
    borderBottomWidth: 3,
  },
  temperature: {
    // backgroundColor: "orange",
    borderBottomColor: "black",
    borderStyle: "solid",
    borderBottomWidth: 3,
  },
  day: {
    width: SCREEN_WIDTH - 30,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    // backgroundColor: "blue",
    justifyContent: "center",
    alignContent: "center",
  },
});
