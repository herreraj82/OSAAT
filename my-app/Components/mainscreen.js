import {
    View,
    Text,
    Button,
    StatusBar,
    TouchableWithoutFeedback,
    TextInput,
    Dimensions,
  }                          from "react-native";
  import FooterBar from "./footerbar";
  import ContentPane from "./contentpane";
  import StartButtons from "./startbuttons";

  export default function MainScreen(props) {
    return(
        <View style={{ width: "100%" ,flex:1,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        }}>
            {!props.sentences &&  <StartButtons osaat={props.osaat} fileTable={props.fileTable} openConvertedBook={props.openConvertedBook}/>}

            {props.sentences.length > 0 && (<ContentPane handlePress={props.handlePress} sentences={props.sentences} currPage={props.currPage}/>)}

            {props.sentences.length > 0 && ( <FooterBar handlePress={props.handlePress} sentences={props.sentences} currPage={props.currPage} setCurrPage={props.setCurrPage} tocObj={props.tocObj} setTocObj={props.setTocObj}/>)}
      </View>
    );
  }

