import {
  View,
  Text,
  Button,
  StatusBar,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
}                          from "react-native";

export default function TextPane(props) {
  return (
  <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <Text
        style={{
          color: "cornsilk",
          fontSize: 28,
          textAlign: "center",
        }}
      >
        {props.sentences[props.currPage].replace("¶", "")}
      </Text>
      {props.sentences[props.currPage].includes("¶") && (
        <Text
          style={{
            color: "cornsilk",
            fontSize: 33,
            top: 50,
          }}
        >
          ¶
        </Text>
      )}
    </View>
    )
}