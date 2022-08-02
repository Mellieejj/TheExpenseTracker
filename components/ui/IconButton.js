import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

const IconButton = ({iconName, iconSize, iconColor, onPress}) => {
  return (
   <Pressable style={({pressed}) => pressed && styles.pressed} onPress={onPress}>
    <View style={styles.buttonContainer}>
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </View>
   </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.75
    }
})