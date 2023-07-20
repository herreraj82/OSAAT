import {
    View,
    Text,
    Button,
    StatusBar,
    TextInput,
    Platform,
  }                          from "react-native";
  import {Picker} from '@react-native-picker/picker';

export default function FooterBar(props) {
    return (
        <View
                style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: (Platform.OS === 'android' ? StatusBar.currentHeight : 0) + 20,
                }}
        >
                <Button style={{flex:1}} title="<--" onPress={() => props.handlePress(-1)} />
                
                <TextInput
                style={{ color: "white", flex:1,textAlign: "center"  }}
                placeholder={props.currPage.toString()}
                placeholderTextColor="white"
                keyboardType={Platform.OS === 'android' ? "number-pad" : 'numbers-and-punctuation'}
                onSubmitEditing={(e) => props.handlePress(e.nativeEvent.text - props.currPage)} 
                />
                <Text style={{ color: "white", flex:1,textAlign: "center" }}>/</Text>
                <Text style={{ color: "white", flex:1 }}>{props.sentences.length}</Text>
                <Picker style={{color: "white", flex:2, fontSize: 4}}
                        selectedValue={0}
                        onValueChange={(itemValue, itemIndex) =>
                        props.setCurrPage(itemValue)
                }>
                        <Picker.Item label="ToC" value="0" key="0"/>
                        {props.tocObj.map((elt) => {
                                return (<Picker.Item label={elt[0]} value={elt[1]} key={elt[0]}/>)
                        })}
                </Picker> 
                <Button style={{flex:1}} title="-->" onPress={() => props.handlePress(1)} />
        </View>
)
        }