// actions.ts
import { SET_USER, UPDATE_USER, CLEAR_USER } from "../redux/actionsType"

interface UserData {
  id: string
  name: string
  avatar: string
}

export const setUser = (userData: UserData) => ({
  type: SET_USER as typeof SET_USER,
  payload: userData,
})

export const updateUser = (updatedUserData: Partial<UserData>) => ({
  type: UPDATE_USER as typeof UPDATE_USER,
  payload: updatedUserData,
})

export const clearUser = () => ({
  type: CLEAR_USER as typeof CLEAR_USER,
})
