import {
  View,
  Text,
  Button,
  StatusBar,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
}                          from "react-native";
import TextPane from "./textpane";

export default function ContentPane(props) {
  return (
      <>
      
      <TouchableWithoutFeedback 
          style={{width:"100%"}}
          onPress={(e) =>
              props.handlePress(
                e.nativeEvent.locationX / Dimensions.get("window").width < 1 / 2
                  ? -1
                  : 1
              )
            }
          touchSoundDisabled={true}
      >
          <View style={{width:"100%",flex:1}}>
              <TextPane sentences={props.sentences} currPage={props.currPage}/>
          </View>
      </TouchableWithoutFeedback>
      </>
  );
}