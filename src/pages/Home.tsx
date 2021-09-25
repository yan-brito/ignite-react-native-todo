import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { Task } from '../components/TaskItem';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const isDuplicated: Boolean = (tasks.find(task => task.title.toLowerCase() === newTaskTitle.toLowerCase()) ? true : false)

    if(isDuplicated) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {

    const oldTasks: Task[] = tasks.filter(task => task.id !== id)
    const toggledTask: Task = tasks.find(task => task.id === id) || {} as Task
    const updatedTask = {
      id: toggledTask.id,
      title: toggledTask.title,
      done: !toggledTask.done
    }

    setTasks([...oldTasks, updatedTask]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const oldTasks: Task[] = tasks.filter(task => task.id !== taskId)
    const toggledTask: Task = tasks.find(task => task.id === taskId) || {} as Task
    const updatedTask = {
      id: toggledTask.id,
      title: taskNewTitle,
      done: toggledTask.done
    }

    setTasks([...oldTasks, updatedTask]);
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      'Remover item', 
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => setTasks(oldTasks => oldTasks.filter(oldTask => oldTask.id !== id)),
          style: 'default'
        }
      ]
    )

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})