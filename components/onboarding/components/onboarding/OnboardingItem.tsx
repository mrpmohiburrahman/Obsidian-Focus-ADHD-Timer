import { StyleSheet, Text, View } from "react-native";
import { SCREEN_WIDTH } from "../../constants/screen";
import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { moderateScale } from "react-native-size-matters";
import { Image } from "expo-image";
type Props = {
  screen: any;
};

const OnboardingItem = ({ screen }: Props) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        width: SCREEN_WIDTH,
        paddingTop: moderateScale(100),
        gap: moderateScale(60),
        alignItems: "center",
        borderColor: "red",
      }}
    >
      <Image
        source={screen.image}
        style={{
          width: "80%",
          height: 350,
          // borderWidth: 1,
          borderColor: "red",
          borderRadius: 200,
        }}
        contentFit="cover"
      />
      <BlurView
        intensity={80}
        tint="systemUltraThinMaterialDark"
        style={{
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: 20,
          height: moderateScale(200),
          marginHorizontal: moderateScale(20),
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: Colors.text,
              fontSize: 41,
              fontWeight: "bold",
            }}
          >
            {screen.title}
          </Text>
          <Text
            style={{
              color: "#ebebf5",
              textAlign: "left",
              marginVertical: 20,
            }}
          >
            {screen.description}
          </Text>
        </View>
      </BlurView>
    </View>
  );
};

export default OnboardingItem;
