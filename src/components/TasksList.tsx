import React from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';

import { ItemWrapper } from './ItemWrapper';
import { TaskItem, Task } from './TaskItem';

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  removeTask: (id: number) => void;
}

export function TasksList({ tasks, toggleTaskDone, editTask, removeTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem 
              id={item.id}
              title={item.title}
              done={item.done}
              toggleTaskDone={toggleTaskDone}
              editTask={editTask}
              removeTask={removeTask}
              index={index}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}