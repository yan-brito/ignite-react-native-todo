import React from 'react'
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import trashIcon from '../assets/icons/trash/trash.png'
import Icon from 'react-native-vector-icons/Feather';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps extends Task {
  index: number;
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({ id, title, done, index, toggleTaskDone, removeTask }: TaskItemProps) {
  return(
        <>
          <View>
            <TouchableOpacity
              testID={`button-${index}`}
              activeOpacity={0.7}
              style={styles.taskButton}
              onPress={() => toggleTaskDone(id)}
              //TODO - use onPress (toggle task) prop
            >
              <View 
                testID={`marker-${index}`}
                style={(done ? styles.taskMarkerDone : styles.taskMarker)}
                //TODO - use style prop 
              >
                { done && (
                  <Icon 
                    name="check"
                    size={12}
                    color="#FFF"
                  />
                )}
              </View>

              <Text
                style={(done ? styles.taskTextDone : styles.taskText)} 
                //TODO - use style prop
              >
                {title}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={() => removeTask(id)}
            //TODO - use onPress (remove task) prop
          >
            <Image source={trashIcon} />
          </TouchableOpacity>
      </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})