import React, { useEffect } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Colors from "../../constants/Colors";
import { TextInput, Chip, Button, Dialog, Portal, Provider } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as firebase from "firebase";
import AddQuiz from './AddQuiz';

const AddCourseScreen = ({navigation}) => {
    const [title, setTitle] = React.useState('');
    const [summary, setSummary] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [chipData, setChipData] = React.useState([]);
    const [files, setFiles] = React.useState([]);
    // const [quiz, setQuiz] = React.useState(false);//used to check if quiz addded or not
    // const [visible, setVisible] = React.useState(false);// quiz portal
    // const hideDialog = () => setVisible(false);
    const [questions,setQuestions] = React.useState([]);

    useEffect(()=>console.log("aa",questions),[questions]);

    function handleDeleteTag (chipToDelete) {
        console.log(chipToDelete)
        setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    };

    function handleDeleteFile (fileToDelete) {
        console.log(fileToDelete)
        setFiles((files) => files.filter((file) => file !== fileToDelete));
    };

      
    async function pickFiles()
    {
        let result = await DocumentPicker.getDocumentAsync({type: "application/pdf"});
        // alert(result.uri);
        if(result.type=="success")
        setFiles([...files, result]);
        console.log(result);
    }

    function uploadFiles()
    {
        if(files.length==0)
        {
            Alert.alert("No files chosen!");
            return;
        }
        var user = firebase.auth().currentUser;
        var urls=[];
        if (user) {
        // User is signed in.
        } else {
            return;
        }

        files.forEach(async (file)=>{
            console.log(file);
            const response = await fetch(file.uri);
            const blob = await response.blob();
            var ref = firebase.storage().ref().child("storage/"+user.uid+"/"+file.name);
            // return ref.put(blob);
            ref.put(blob).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
                ref.getDownloadURL().then(function(url){
                    console.log(url);
                    urls.push(url);
                })
              });
        })
        console.log(urls);
        //you will be getting file urls
        //then create a quiz by using {questions} array
        // POST /createQuiz
        //then using the other state variables, you can create the JSON for the course
        // POST /createCourse
    }

    return(
            <View style={styles.screen}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "space-between",
                    flexDirection: "column",
                }}
            >
                <View style={styles.dataContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Title</Text>
                    </View>
                    <TextInput
                    label="Please enter title of the course!"
                    value={title}
                    onChangeText={text => setTitle(text)}
                    />

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Summary</Text>
                    </View>
                    <TextInput
                    label="Please enter summary of the course!"
                    value={summary}
                    onChangeText={text => setSummary(text)}
                    />

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Tags</Text>
                    </View>
            
                    <TextInput
                    label="Any tags you want to add!"
                    value={tag}
                    onChangeText={text => setTag(text)}
                    />
                    <Button style={styles.add_tag} icon="tag" mode="contained" onPress={() => setChipData([...chipData, tag])}>
                        Add Tag!
                    </Button>
                   
                    <View >
                        {
                            chipData.length ? chipData.map((data)=>(
                                <Chip  onClose={()=>handleDeleteTag(data)}>{data}</Chip>
                            )) : <Text>No tags added!</Text>
                        }
                    </View>

                    <Button style={styles.add_tag} icon="file-search" mode="contained" onPress={() => pickFiles()}>
                        Add Files!
                    </Button>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Selected Files</Text>
                    </View>
                    <View >
                        {
                            files.length ? files.map((data)=>(
                                <Chip  onClose={()=>handleDeleteFile(data)}>{data.name}</Chip>
                            )) : <Text>No files selected!</Text>
                        }
                    </View>

                    <Button style={styles.add_tag} icon="file-search" mode="contained" onPress={() => {navigation.navigate("AddQuiz",
                        {
                            questionParams: questions, 
                            onReturn: (item)=>setQuestions(item)
                        })}}>
                        Add Quiz!
                    </Button>

                    <Button style={styles.submitBtn} icon="file-search" mode="contained" onPress={() => {!questions.length?Alert.alert("Please add quizzes for course!"):uploadFiles()}}>
                        Add Course!
                    </Button>
                </View>
                
            </ScrollView>

            {/* <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.ScrollArea>
                <ScrollView contentContainerStyle={{paddingHorizontal: 0}}>
                    <AddQuiz />
                </ScrollView>
                </Dialog.ScrollArea>
            </Dialog> */}

  

            </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    dataContainer: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        fontSize: 20,
        fontFamily: "montserrat-bold",
    },
    titleContainer: {
        marginBottom: 15,
    },

    // chips: {
    //     // width: "50%",
    // },
    add_tag:{
        // width: "30%"
        marginTop: "5%",
        marginLeft: "30%",
        marginRight: "30%",
    },
    // // tags: {
    // //     // flexDirection: "row",
    // //     flex: .1,
    // //     width: "100%",
    // //     marginVertical: 40
    // // }
    submitBtn: {
        marginTop: 20
    }
});


export default AddCourseScreen;