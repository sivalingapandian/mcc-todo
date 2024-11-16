import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AddItem from './components/AddItem';
import ListItems from './components/ListItems';
import Help from './components/Help';
import Empty from "./components/Empty";
import TodoList from './components/TodoList';
import Header from './components/Header';
import PlanTasks from './components/PlanTasks';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components/native";

export default function App() {
  const [list, setList] = useState([]);
  const addItem = (text, dueDateText) => {
    const newItem = {
      id: uuidv4(),
      task: text,
      dueDate: dueDateText,
    };
    setList([newItem, ...list]);
  };
  const DeleteItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  return (
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content"
          backgroundColor="midnightblue" />
      </View>
      <View>
        <FlatList
              data={list}
              ListHeaderComponent={() => <Header />}
              ListEmptyComponent={() => <Empty />}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TodoList item={item} deleteItem={DeleteItem}  />
              )}
            />
           <AddItem addItem={addItem}></AddItem>
           <PlanTasks tasks={list}></PlanTasks>
      </View>
    </ComponentContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  },
});

const ComponentContainer = styled.View`
  background-color: midnightblue;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
