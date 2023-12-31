import {Alert} from 'react-native';
import SplashScreen from "./screens/SplashScreen";
import {AuthContext} from "./contexts/AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Onboarding from "./screens/Onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useMemo, useReducer, useState} from "react";
import * as ExpoSplashScreen from 'expo-splash-screen';
import {useFonts} from "expo-font";
import Header from "./components/header";
import SignUp from "./screens/sign-up";
import LogIn from "./screens/log-in";
import HeaderBeckBtn from "./components/headerBeckBtn";
import HeaderRightBox from "./components/header-right-box";

const Stack = createNativeStackNavigator();
ExpoSplashScreen.preventAutoHideAsync().then();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [state, dispatch] = useReducer((prevState, action) => {
        switch (action.type) {
            case "onboard":
                return {
                    ...prevState,
                    isLoadingData: false,
                    isOnboardingCompleted: action.isOnboardingCompleted,
                    profile: action.profile
                };
        }
    }, {
        isLoadingData: true, isOnboardingCompleted: false,
    });
    const [fontsLoaded] = useFonts({
        "Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
        "Karla-Medium": require("./assets/fonts/Karla-Medium.ttf"),
        "Karla-Bold": require("./assets/fonts/Karla-Bold.ttf"),
        "Karla-ExtraBold": require("./assets/fonts/Karla-ExtraBold.ttf"),
        "MarkaziText-Regular": require("./assets/fonts/MarkaziText-Regular.ttf"),
        "MarkaziText-Medium": require("./assets/fonts/MarkaziText-Medium.ttf"),
    });

    useEffect(() => {
        (async () => {
            let profileData = [];
            try {
                const getProfile = await AsyncStorage.getItem("profile");
                if (getProfile !== null) {
                    profileData = getProfile;
                }
            } catch (e) {
                console.error(e);
            } finally {
                if (Object.keys(profileData).length !== 0) {
                    dispatch({
                        type: "onboard", isOnboardingCompleted: true, profile: JSON.parse(profileData)
                    });
                } else {
                    dispatch({
                        type: "onboard", isOnboardingCompleted: false, profile: profileData
                    });
                }
            }
        })();
    }, []);

    useEffect(() => {

        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.error(e);
            } finally {
                setAppIsReady(true);
                await ExpoSplashScreen.hideAsync();
            }
        }

        prepare().then();
    }, []);

    const authContext = useMemo(() => ({
        onboard: async (data) => {
            try {
                const jsonValue = JSON.stringify(data);
                await AsyncStorage.setItem("profile", jsonValue);
            } catch (e) {
                console.error(e);
            }
            dispatch({
                type: "onboard", isOnboardingCompleted: true, profile: data
            });
        }, update: async (data) => {
            try {
                const jsonValue = JSON.stringify(data);
                await AsyncStorage.setItem("profile", jsonValue);
            } catch (e) {
                console.error(e);
            }
            dispatch({
                type: "onboard", isOnboardingCompleted: true, profile: data
            });
            Alert.alert("Success", "Successfully saved changes!");
        }, logout: async () => {
            try {
                await AsyncStorage.clear();
            } catch (e) {
                console.error(e);
            }
            dispatch({
                type: "onboard", isOnboardingCompleted: false
            });
        },
    }), [dispatch]);

    if (state.isLoadingData || !appIsReady) {
        return (<SplashScreen/>);
    }

    return (<AuthContext.Provider value={authContext}>
        <NavigationContainer>
            <Stack.Navigator>
                {state.isOnboardingCompleted ? (<>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={({navigation, route}) => ({
                            headerTitle: () => <Header/>,
                            headerRight: (props) => <HeaderRightBox profile={state.profile}
                                                                    navigation={navigation} {...props} />
                        })}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={({navigation, route}) => ({
                            headerTitle: () => <Header/>,
                            headerLeft: (props) => <HeaderBeckBtn navigation={navigation} {...props} />,
                            headerRight: (props) => <HeaderRightBox profile={state.profile}
                                                                    navigation={navigation} {...props} />
                        })}
                    />
                </>) : (<>
                    <Stack.Screen
                        name="Onboarding"
                        component={Onboarding}
                        options={{headerTitle: () => <Header/>}}
                    />
                    <Stack.Screen
                        name="LogIn"
                        component={LogIn}
                        options={({navigation, route}) => ({
                            headerTitle: () => <Header/>,
                            headerLeft: (props) => <HeaderBeckBtn navigation={navigation} {...props} />
                        })}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                        options={({navigation, route}) => ({
                            headerTitle: () => <Header/>,
                            headerLeft: (props) => <HeaderBeckBtn navigation={navigation} {...props} />
                        })}
                    />
                </>)}
            </Stack.Navigator>
        </NavigationContainer>
    </AuthContext.Provider>)
}
