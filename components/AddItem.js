import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import styled from "styled-components/native";

export default function AddItem(props) {
    const [item, setItem] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = () => {
        if (item.trim() && dueDate.trim()) {
            props.addItem( item,  dueDate );
            setItem(''); // Reset the task input
            setDueDate(''); // Reset the due date input
        } else {
            alert("Please enter both task and due date");
        }
    };

    return (
        <ComponentContainer>
            <InputContainer>
                <Input
                    placeholder="Add Task..."
                    onChangeText={(textVal) => setItem(textVal)}
                    value={item}
                />
            </InputContainer>

            <InputContainer>
                <Input
                    placeholder="Enter Due Date (MM/DD/YYYY)"
                    onChangeText={(dateVal) => setDueDate(dateVal)}
                    value={dueDate}
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
