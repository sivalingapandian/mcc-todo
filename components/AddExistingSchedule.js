import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import styled from "styled-components/native";

export default function AddExistingScheduleItem(props) {
    const [task, setTask] = useState('');
    const [schedule, setSchedule] = useState('');

    const handleSubmit = () => {
        if (task.trim() && schedule.trim()) {
            props.addExistingScheduleItem( task,  schedule );
            setTask(''); // Reset the task input
            setSchedule(''); // Reset the setSchedule input
        } else {
            alert("Please enter both task and setSchedule");
        }
    };

    return (
        <ComponentContainer>
            <InputContainer>
                <Input
                    placeholder="Add Existing Task..."
                    onChangeText={(textVal) => setTask(textVal)}
                    value={task}
                />
            </InputContainer>

            <InputContainer>
                <Input
                    placeholder="Enter Schedule"
                    onChangeText={(scheduleVal) => setSchedule(scheduleVal)}
                    value={schedule}
                />
            </InputContainer>

            <SubmitButton onPress={handleSubmit}>
                <Text>Submit</Text>
            </SubmitButton>
        </ComponentContainer>
    );
}

const styles = StyleSheet.create({
    addView: {
        flex: 0.2,
        justifyContent: 'center',
    }
});

// Styles
const ComponentContainer = styled.View`
flex-direction: column;
padding: 20px;
`;

const InputContainer = styled.View`
border-radius: 10px;
margin-bottom: 10px;
`;

const Input = styled.TextInput`
font-size: 20px;
background-color: white;
width: 300px;
padding: 10px;
border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
width: 100px;
justify-content: center;
align-items: center;
background-color: whitesmoke;
padding: 10px;
border-radius: 50px;
`;
