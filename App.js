import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const SCREEN_WIDTH = Dimensions.get("window").width; //해당 기기의 위드를 가져옴

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Pressable>
          <Entypo name="menu" size={24} color="black" />
        </Pressable>
        <Text style={{ fontSize: 25 }}>SEOUL</Text>
        <Pressable>
          <Feather name="search" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.city}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Monday</Text>
        <Text style={{ fontSize: 18, marginTop: 5 }}>04 September</Text>
      </View>

      <ScrollView
        horizontal //수평
        pagingEnabled //스크롤을 완전히 넘겨야 넘겨지는 props
        showsHorizontalScrollIndicator={false} // pagingEnabled을 사용했을때 아래에 스크롤바의 유무
        contentContainerStyle={styles.temperature} //일반 스타일은 안먹힘
      >
        <View style={styles.day}>
          <Text style={{ fontSize: 120, fontWeight: "bold" }}>27</Text>
          <Text style={{ fontSize: 20 }}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={{ fontSize: 120, fontWeight: "bold" }}>26</Text>
          <Text style={{ fontSize: 20 }}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={{ fontSize: 120, fontWeight: "bold" }}>29</Text>
          <Text style={{ fontSize: 20 }}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={{ fontSize: 120, fontWeight: "bold" }}>26</Text>
          <Text style={{ fontSize: 20 }}>Sunny</Text>
        </View>
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
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "teal",
    flex: 1,
    // padding: 15,
  },
  top: {
    flex: 0.5,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    // backgroundColor: "white",
    // paddingRight: 20,
    // paddingLeft: 20,
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
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "center",
    alignContent: "center",
  },
});
