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
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { useEffect, useState, useLayoutEffect } from "react";
import * as Location from "expo-location";
import moment from "moment";

const SCREEN_WIDTH = Dimensions.get("window").width; //해당 기기의 위드를 가져옴
const API_KEY = "9085b59875dd89f0d4bbe5779c2a300b";

export default function App() {
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("Loading...");
  const [date, setDate] = useState(false);
  const [index, setIndex] = useState(0);

  const weatherIcon = {
    Clouds: "cloudy",
    Clear: "day-sunny",
    Atmosphere: "cloudy-gusts",
    Snow: "snow",
    Rain: "rains",
    Drizzle: "rain",
    Thunderstorm: "lightning",
  };

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync(); //위치 허용 요청

    if (!granted) {
      //유저가 위치 허용 요청을 거절하면
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 6 }); //유저의 위치(위도와 경도)를 가져옴

    const location = await Location.reverseGeocodeAsync(
      //위의 받아온 좌표로 나라를 나타냄
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    // console.log("location", location[0].city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };

  const changeDate = (i) => {
    // console.log("days", days.length - 1);
    // console.log("i", i);
    days.length - 1 === i && setDate(true);
    i === 0 && setDate(false);

    if (index < 8 || index >= 0) {
      if (date) {
        setIndex((i) => i - 1);
        return;
      }
      setIndex((i) => i + 1);
      return;
    }
  };

  useLayoutEffect(() => {
    getWeather();
  }, []);

  // useEffect(() => {
  //   console.log("index", index);
  //   console.log(date);
  //   console.log("------");
  // }, [index, date]);

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

      {ok ? (
        <>
          <ScrollView
            horizontal //수평
            pagingEnabled //스크롤을 완전히 넘겨야 넘겨지는 props
            showsHorizontalScrollIndicator={false} // pagingEnabled을 사용했을때 아래에 스크롤바의 유무
            disableScrollViewPanResponder={true}
          >
            {days.length > 0 ? (
              days.map((item, i) => (
                <>
                  <TouchableOpacity key={i} style={styles.day}>
                    <View style={styles.city}>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {moment().add(i, "d").format("dddd")}
                      </Text>
                      <Text style={{ fontSize: 18, marginTop: 5 }}>
                        {moment().add(i, "d").format("DD MMMM")}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 100,
                        fontWeight: "bold",
                        marginTop: 40,
                        flex: 0.2,
                      }}
                    >
                      {`${parseFloat(item.temp.day).toFixed(1)}º`}
                    </Text>
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        paddingRight: 20,
                        marginTop: 20,
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>
                        {item.weather[0].main}
                      </Text>
                      <Fontisto
                        name={weatherIcon[item.weather[0].main]}
                        size={30}
                        color="black"
                      />
                    </View>
                    <Text style={{ flex: 0.5 }}>
                      {item.weather[0].description}
                    </Text>
                  </TouchableOpacity>
                </>
              ))
            ) : (
              <View style={styles.day}>
                <ActivityIndicator size="large" color="white" />
              </View>
            )}
          </ScrollView>
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
    flex: 0.2,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  city: {
    flex: 0.4,
    // backgroundColor: "green",
    justifyContent: "center",
    borderBottomColor: "black",
    borderStyle: "solid",
    borderBottomWidth: 3,
  },

  day: {
    // flex: 1,
    width: SCREEN_WIDTH - 30,
    justifyContent: "center",
    borderBottomColor: "black",
    borderStyle: "solid",
    borderBottomWidth: 3,
    // marginTop: -30,
  },
});
