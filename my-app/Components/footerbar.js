import {
    View,
    Text,
    Button,
    StatusBar,
    TextInput,
    Platform,
  }                          from "react-native";

export default function FooterBar(props) {
    return (
        <View
                style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: (Platform.OS === 'android' ? StatusBar.currentHeight * 2 : 0) + 20,
                }}
        >
                <Button title="<--" onPress={() => props.handlePress(-1)} />

                <TextInput
                style={{ color: "white" }}
                placeholder={props.currPage.toString()}
                placeholderTextColor="white"
                keyboardType={Platform.OS === 'android' ? "number-pad" : 'numbers-and-punctuation'}
                onSubmitEditing={(e) => props.handlePress(e.nativeEvent.text - props.currPage)} 
                />
                <Text style={{ color: "white" }}>/</Text>
                <Text style={{ color: "white" }}>{props.sentences.length}</Text>
                <Button title="-->" onPress={() => props.handlePress(1)} />
        </View>
)
        }