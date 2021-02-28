import React, { useEffect } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { TextInput, RadioButton, Button, Dialog, Portal, Provider } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';


const AddCourseScreen = ({navigation}) => {
    const [questions, setQuestions] = React.useState(navigation.state.params.questionParams);
    // console.log(navigation.state.params);
    function addQuestion()
    {
        setQuestions([...questions, {
            
            "answer": 1,
            "options": ["Rahul Gandhi", "Narendra Modi", "Sonia Gandhi", "Amit Shah"],
            "question": "PM of India"       
        }]);
        // console.log(questions);
    }

    // useEffect(()=>console.log(questions),[questions]);

    function submitQuestions()
    {
        // console.log(questions);
        navigation.state.params.onReturn(questions);
        navigation.goBack();
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
            { 
                questions.map((data,idx)=>{
                    return(
                    <View style={styles.question}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Question {idx+1}</Text>
                    </View>
                    <TextInput
                    label="Please enter the question!"
                    value={data.question}
                    onChangeText={text => {
                        let questionArray = [...questions];
                        questions[idx].question=text;
                        setQuestions(questionArray);
                    }}
                    />

                    <View style={styles.titleContainer}>
                        <Text style={styles.options}>Option 1</Text>
                    </View>
                    <TextInput
                    label="Option 1"
                    value={data.options[0]}
                    onChangeText={text => {
                        let questionArray = [...questions];
                        questions[idx].options[0]=text;
                        setQuestions(questionArray);
                    }}
                    />

                    <View style={styles.titleContainer}>
                        <Text style={styles.options}>Option 2</Text>
                    </View>
                    <TextInput
                    label="Option 2"
                    value={data.options[1]}
                    onChangeText={text => {
                        let questionArray = [...questions];
                        questions[idx].options[1]=text;
                        setQuestions(questionArray);
                    }}
                    />

                    <View style={styles.titleContainer}>
                        <Text style={styles.options}>Option 3</Text>
                    </View>
                    <TextInput
                    label="Option 3"
                    value={data.options[2]}
                    onChangeText={text => {
                        let questionArray = [...questions];
                        questions[idx].options[2]=text;
                        setQuestions(questionArray);
                    }}
                    />

                    <View style={styles.titleContainer}>
                        <Text style={styles.options}>Option 4</Text>
                    </View>
                    <TextInput
                    label="Option 4"
                    value={data.options[3]}
                    onChangeText={text => {
                        let questionArray = [...questions];
                        questions[idx].options[3]=text;
                        setQuestions(questionArray);
                    }}
                    />
                    {/* <RadioButton.Group onValueChange={value => setValue(value)} value={"first"}>
                    <TextInput
                    label="Please enter the question!"
                    value={data.question}
                    onChangeText={text => setTitle(text)}
                    />
                    <RadioButton.Item label="" value="first" />
                    <RadioButton.Item label="Second item" value="second" />
                    </RadioButton.Group> */}
                    
                    <View style={styles.titleContainer}>
                        <Text style={styles.options}>Correct Option</Text>
                    </View>
                    <Picker
                    selectedValue={JSON.stringify(questions[idx].answer)}
                    // style={{height: 50, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                        {
                            let questionArray = [...questions];
                            questions[idx].answer=itemIndex;
                            setQuestions(questionArray);
                        }
                    }>
                    <Picker.Item label="Choose correct option!" value="0" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    </Picker>


                    </View>
                    
                    )
                })
            }

            {/* <View style={styles.addButtonBar}>
                <View style={styles.addButton}>
                    <TouchableNativeFeedback
                        onPress={() => {
                            addQuestion()
                        }}
                    >
                        <View style={styles.addButtonData}>
                            <MaterialIcons name="add" size={40} color="white" />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View> */}

                    <Button style={styles.add_tag} icon="tag" mode="contained" onPress={() => addQuestion()}>
                        Add Question!
                    </Button>

                    <Button style={styles.add_tag} icon="tag" mode="contained" onPress={() => submitQuestions()}>
                        Submit Questions!
                    </Button>
            </View>
            </ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
    question: {
        borderColor:'red',
        borderWidth:1,
        borderRadius: 4,
        margin: 4
        // margin: 4,
        // padding: 2
    },
    screen: {
        flex: 1,
    },
    dataContainer: {
        width: "100%",
        // paddingHorizontal: 20,
        // paddingVertical: 30,
    },
    title: {
        fontSize: 20,
        padding: 10,
        fontFamily: "montserrat-bold",
    },
    options: {
        fontSize: 15,
        padding: 10,
        textAlign: "center",
        fontFamily: "montserrat-bold",
    },
    titleContainer: {
        // marginBottom: 15,
    },

    add_tag:{
        // width: "30%"
        marginTop: "5%",
        // marginLeft: "10%",
        // marginRight: "30%",
    },
    
    submitBtn: {
        marginTop: 20
    }
});


export default AddCourseScreen;