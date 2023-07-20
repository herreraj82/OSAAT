import {
    View,
    Text,
    Button,
    StatusBar,
    TouchableWithoutFeedback,
    TextInput,
    Dimensions,
  }                          from "react-native";
  import { useState }        from "react";
  import * as FileSystem     from "expo-file-system";
  import { useEffect } from "react";
  import * as DocumentPicker from 'expo-document-picker';

  
  export default function StartButtons(props) {
    
    const [fileTable, setFileTable] = useState();

    useEffect(()=>{
        async function initializeFileTable() {
            const fileTable_uri = FileSystem.documentDirectory + 'filetable.txt';
            if (!(await FileSystem.getInfoAsync(fileTable_uri)).exists) {
                FileSystem.writeAsStringAsync(fileTable_uri, '[]');
            }
            const file_contents = await FileSystem.readAsStringAsync(fileTable_uri);
            const tempFileTable = JSON.parse(file_contents);
            setFileTable(tempFileTable);
        }
        initializeFileTable();
        return ()=>{};
    },[])

    return (
        <View style={{width:"100%", minHeight:Dimensions.get('window').height/2,flexDirection:'column',justifyContent:'space-around'}}>
            <Button style={{width:"100%"}} title="Convert Ebook" onPress={props.osaat} />
            {fileTable && fileTable.map((elt) => {
                return (<Button style={{width:"100%"}} title={elt.title} key={elt.title} onPress={() => props.openConvertedBook(elt.sentences_uri, elt.save_uri, elt.toc)} />)
            })}
        </View>
    )
  }