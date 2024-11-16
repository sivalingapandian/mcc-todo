// PlanTasks.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Linking } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

const API_KEY = 'dummykey'; // Replace with your OpenAI API key

async function getChatGPTPlan(tasks) {
    const mycalendarlist = [
        { task: "soccer practice", schedule: "5pm everyday" },
        { task: "maths study", schedule: "everyday 1 hour in the evening" }
    ];
    
    const scheduleOutputEventsFormat = [
        {
            summary: "English Homework",
            start: { dateTime: "2024-09-14T16:00:00", timeZone: "America/New_York" },
            end: { dateTime: "2024-09-14T17:00:00", timeZone: "America/New_York" },
            recurrence: ["RRULE:FREQ=DAILY;UNTIL=20241001T235959Z;BYDAY=MO,TU,WE,TH,FR"],
            description: "Complete English homework before October 1 deadline."
        }
    ];
    
    const formattedTasks = formatTasksForChatGPT(tasks, mycalendarlist);
    const taskList = JSON.stringify(formattedTasks, null, 2);
    const responseJsonFormat = JSON.stringify(scheduleOutputEventsFormat, null, 2);

    const prompt = `Use the following JSON as input and suggest a schedule for each task in JSON format for Google Calendar import:\n\n${taskList}\n\nFormat output as:\n\n${responseJsonFormat}`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );
        return JSON.parse(response.data.choices[0].message.content);
    } catch (error) {
        console.error("Error fetching plan from ChatGPT:", error);
        throw new Error('Failed to get task plan from ChatGPT.');
    }
}

function formatTasksForChatGPT(items, mycalendarlist) {
    return {
        todo: items.map(item => ({
            nameoftask: item.task,
            enddate: item.dueDate
        })),
        mycalendarlist        
    };
}

function formatGoogleCalendarLink(event) {
    const { summary, start, end, description } = event;
    const startUTC = new Date(start.dateTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endUTC = new Date(end.dateTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(summary)}&dates=${startUTC}/${endUTC}&details=${encodeURIComponent(description)}`;
}

export default function PlanTasks({ tasks }) {
    const [links, setLinks] = useState([]);

    const handlePlanTasks = async () => {
        try {
            const response = await getChatGPTPlan(tasks);
            const generatedLinks = response.map(event => ({
                ...event,
                link: formatGoogleCalendarLink(event)
            }));
            setLinks(generatedLinks);
            Alert.alert('Links Generated', 'Click on a link to add the task to Google Calendar.');
        } catch (error) {
            Alert.alert('Error', 'Failed to get task plan.');
        }
    };

    return (
        <Container>
            <PlanButton onPress={handlePlanTasks}>
                <ButtonText>Plan My Tasks</ButtonText>
            </PlanButton>

            {links.length > 0 ? (
                <LinkList>
                    {links.map((task, index) => (
                        <LinkText key={index} onPress={() => Linking.openURL(task.link)}>
                            {task.summary} - Add to Google Calendar
                        </LinkText>
                    ))}
                </LinkList>
            ) : (
                <Text>No plan yet. Click the button to get started!</Text>
            )}
        </Container>
    );
}

// Styles
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const PlanButton = styled.TouchableOpacity`
  background-color: #4682b4;
  padding: 15px;
  border-radius: 50px;
  margin-top: 100px;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;

const LinkList = styled.View`
  margin-top: 20px;
  padding: 10px;
`;

const LinkText = styled.Text`
  font-size: 16px;
  color: white;
  text-decoration: underline;
  text-decoration-color: white;
  margin-bottom: 10px;
`;

