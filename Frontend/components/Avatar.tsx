// Avatar.tsx

import React from "react"
import { View, Image, Text, StyleSheet } from "react-native"

interface AvatarProps {
  imageUrl: string
  name: string
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, name }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default Avatar
