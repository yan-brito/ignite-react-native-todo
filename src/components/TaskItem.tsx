import React, { useEffect, useState, useRef } from 'react'
import { Image, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native'
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

export function TaskItem({ id, title, done, index, toggleTaskDone, editTask, removeTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [taskNewTitle, setTaskNewTitle] = useState(title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setIsEditing(false)
    setTaskNewTitle(title)
  }

  function handleSubmitEditing() {
    editTask(id, taskNewTitle)
    setIsEditing(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return(
        <>
          <View>
            <TouchableOpacity
              testID={`button-${index}`}
              activeOpacity={0.7}
              style={styles.taskButton}
              onPress={() => toggleTaskDone(id)}
            >
              <View 
                testID={`marker-${index}`}
                style={(done ? styles.taskMarkerDone : styles.taskMarker)}
              >
                { done && (
                  <Icon 
                    name="check"
                    size={12}
                    color="#FFF"
                  />
                )}
              </View>

              <TextInput
                testID={`input-${index}`}
                style={(done ? styles.taskTextDone : styles.taskText)} 
                value={taskNewTitle}
                onChangeText={setTaskNewTitle}
                editable={isEditing}
                onSubmitEditing={handleSubmitEditing}
                ref={textInputRef}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconsContainer}>    
            <TouchableOpacity
              testID={`edit-${index}`}
              style={{ paddingLeft: 24 }}
              onPress={() => (isEditing ? handleCancelEditing() : handleStartEditing())}
            >
              <Icon 
                name={(isEditing ? 'x' : 'edit-3')}
                size={24}
                color="#B2B2B2"
              />
            </TouchableOpacity>

            <View style={styles.iconWrapper}/>

            <TouchableOpacity
              testID={`trash-${index}`}
              style={{ opacity: isEditing ? 0.2 : 1, paddingRight: 24 }}
              onPress={() => removeTask(id)}
              disabled={(isEditing ? true : false)}
            >
              <Icon 
                name="trash-2"
                size={24}
                color="#B2B2B2"
              />
            </TouchableOpacity>
          </View>
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
  },
  iconsContainer: {
    flexDirection: 'row'
  },
  iconWrapper: {
    width: 1,
    height: 24,
    marginHorizontal: 12,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  }
})