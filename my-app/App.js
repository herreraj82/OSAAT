import {
  View,
  Dimensions,
}                          from "react-native";
import { useState }        from "react";
import * as FileSystem     from "expo-file-system";
import * as DocumentPicker from 'expo-document-picker';
import MainScreen from "./Components/mainscreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [sentences, setSentences] = useState(0);
  const [currPage,  setCurrPage]  = useState(0);
  const [currSaveUri, setCurrSaveUri] = useState('');
  const [tocObj, setTocObj] = useState(0);

  async function convertEbook() {
    const file     = await DocumentPicker.getDocumentAsync();
    const response = await FileSystem.uploadAsync(
      'http://loskotar.pythonanywhere.com?filename='+file.assets[0].name.split('.')[0],
      file.assets[0].uri,
      {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName:  'uploadedFile',
      }
    );
    let response_obj = JSON.parse(response.body);
    let sentences_uri = FileSystem.documentDirectory + response_obj.title + ".txt";
    FileSystem.writeAsStringAsync(sentences_uri, JSON.stringify(response_obj));
    setTocObj(response_obj.toc);
    setSentences(response_obj.sentences);
    let save_uri = FileSystem.documentDirectory + response_obj.title +"_save.txt";
    FileSystem.writeAsStringAsync(save_uri, "0");
    setCurrSaveUri(save_uri);
    

    let fileTableContents = await FileSystem.readAsStringAsync(
      FileSystem.documentDirectory+'filetable.txt'
    );

    let fileTable = JSON.parse(
        fileTableContents
    );

    fileTable.push({
      identifier:response_obj.identifier,
      title:response_obj.title,
      sentences_uri:sentences_uri,
      save_uri:save_uri,
      toc:response_obj.toc
    });

    FileSystem.writeAsStringAsync(FileSystem.documentDirectory+'filetable.txt',JSON.stringify(fileTable));

    setCurrPage(await FileSystem.readAsStringAsync(save_uri));
  };

  async function handlePress(summand) {
    const newPage = Math.min(
      Math.max(Number(currPage) + summand, 0),
      sentences.length
    );
    setCurrPage(newPage);
    await FileSystem.writeAsStringAsync(
      currSaveUri,
      newPage.toString()
    );
  };

  function backToHome() {
    setSentences(0);
    setCurrPage(0);
    setCurrSaveUri('');
    setTocObj(0);
  }

  async function openConvertedBook(sentences_uri, save_uri, toc) {
    const converted_contents = JSON.parse(await FileSystem.readAsStringAsync(sentences_uri));
    setTocObj(toc);
    setSentences(converted_contents.sentences);
    setCurrSaveUri(save_uri);
    const converted_save = await FileSystem.readAsStringAsync(save_uri);
    setCurrPage(converted_save);
  }

  return (
    <>
    <StatusBar style="light" backgroundColor="black"/>
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        maxHeight: Dimensions.get("screen").height,
        minHeight: Dimensions.get("screen").height
      }}
    >
      <MainScreen sentences={sentences} osaat={convertEbook} handlePress={handlePress} currPage={currPage} setCurrPage={setCurrPage} openConvertedBook={openConvertedBook} tocObj={tocObj}  setTocObj={setTocObj} backToHome={backToHome}/>
    </View>
    </>
  );
}
