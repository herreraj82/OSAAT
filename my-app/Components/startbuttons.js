import {
    View,
    Button,
    Dimensions,
    Pressable,
    Text
  }                          from "react-native";
  import { useState }        from "react";
  import * as FileSystem     from "expo-file-system";
  import { useEffect } from "react";

  
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

    async function deleteBook(idToDelete, sentencesUriToDelete, saveUriToDelete) {
        const fileTable_uri = FileSystem.documentDirectory + 'filetable.txt';

        const file_contents = await FileSystem.readAsStringAsync(fileTable_uri);

        let tempFileTable = JSON.parse(file_contents);
        tempFileTable = tempFileTable.filter(elt => elt.identifier !== idToDelete);
        setFileTable(tempFileTable);

        FileSystem.writeAsStringAsync(FileSystem.documentDirectory+'filetable.txt',JSON.stringify(tempFileTable));
        FileSystem.deleteAsync(sentencesUriToDelete);
        FileSystem.deleteAsync(saveUriToDelete);
        return;
    }

    return (
        <View style={{width:"100%", minHeight:Dimensions.get('window').height/2,flexDirection:'column',justifyContent:'space-around'}}>
            <Button style={{width:"100%"}} title="Convert Ebook" onPress={props.osaat} />
            {fileTable && fileTable.map((elt) => {
                return (<Pressable 
                            style={{
                                
                                width:"100%",
                                backgroundColor:"blue",
                                fontSize:15,
                                height:50,
                                justifyContent:"center",
                                alignItems: "center"
                            }} 
                            title={elt.title} 
                            key={elt.title} 
                            onPress={() => props.openConvertedBook(elt.sentences_uri, elt.save_uri, elt.toc)} 
                            onLongPress={()=>{deleteBook(elt.identifier, elt.sentences_uri, elt.save_uri)}} 
                        >
                            <Text style={{
                                color:"cornsilk"
                            }}>{elt.title}</Text>
                        </Pressable>)
            })}
        </View>
    )
  }