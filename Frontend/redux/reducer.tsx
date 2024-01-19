// // userReducer.ts
// import { SET_USER, UPDATE_USER, CLEAR_USER } from "../redux/actionsType"

// interface UserData {
//   id: string
//   name: string
//   avatar: string
// }

// interface UserState {
//   user: UserData | null
// }

// const initialState: UserState = {
//   user: null,
// }

// type UserAction =
//   | ReturnType<typeof setUser>
//   | ReturnType<typeof updateUser>
//   | ReturnType<typeof clearUser>

// const userReducer = (state = initialState, action: UserAction): UserState => {
//   switch (action.type) {
//     case SET_USER:
//       return { ...state, user: action.payload }
//     case UPDATE_USER:
//       return {
//         ...state,
//         user: state.user ? { ...state.user, ...action.payload } : null,
//       }
//     case CLEAR_USER:
//       return { ...state, user: null }
//     default:
//       return state
//   }
// }

// export default userReducer
