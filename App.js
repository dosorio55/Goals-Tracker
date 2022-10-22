import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modal, setModal] = useState(false)

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);

    endAddGoal()
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  function endAddGoal() {
    setModal(false)
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <View style={styles.button}>
          <Button title='Add New Goal' color="#5e0acc" onPress={() => setModal(true)} />
        </View>
        <GoalInput modalVisible={modal} onAddGoal={addGoalHandler} endAddGoal={endAddGoal} />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  goalsContainer: {
    flex: 5,
  },
  button: {
    margin: 15,
    width: 150
  }
});
