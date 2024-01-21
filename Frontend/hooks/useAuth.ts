import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { API } from "../utils/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from "../interface/User";

export default function useAuth() {
    const isFocused = useIsFocused()
    const [ users, setUser ] = useState<UserInfo | null>(null)

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user')
            setUser(null)
        } catch (err) {
            console.error("error logging out: ", err)
        }
    }

    const getUser = async () => {
        try {
            const response = await API.get('api/v1/get-user', {
                headers: {
                    Authorization: "Bearer " + (await AsyncStorage.getItem('user')),
                },
            })
            setUser(response.data.data)
        } catch (err) {
            console.error("error getting user: ", err)
        }
    }

    useEffect(() => {
        getUser()
    }, [isFocused])

    return {
        users,
        handleLogout,
        getUser
    }
}