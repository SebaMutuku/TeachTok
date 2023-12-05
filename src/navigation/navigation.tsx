import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../views/home";
import Discover from "../views/discover";
import Activity from "../views/activity";
import Bookmarks from "../views/bookmarks";
import Profile from "../views/profile";
import {FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";


type HomeStackParamList = {
    Home: undefined;
    Discover: undefined
    Activity: undefined;
    BookMarks: undefined;
    Profile: undefined;
};
const HomeBottomTabs = createBottomTabNavigator<HomeStackParamList>();

const iconSize = 20;
export default function HomeTabs() {
    return (<HomeBottomTabs.Navigator
            initialRouteName="Home" screenOptions={{
            headerShown: false,
            headerShadowVisible: false,
            tabBarStyle: {
                backgroundColor: "black",
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "rgba(255, 255, 255, 0.20)"
        }}>
            <HomeBottomTabs.Screen name="Home" component={Home} options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <FontAwesome name="home" size={iconSize} color={color}/>
                ),
            }}/>
            <HomeBottomTabs.Screen name="Discover" component={Discover} options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Ionicons name="compass" size={iconSize} color={color}/>
                ),
            }}/>
            <HomeBottomTabs.Screen name="Activity" component={Activity} options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="clock-time-twelve-outline" size={iconSize} color={color}/>
                ),
            }}/>

            <HomeBottomTabs.Screen name="BookMarks" component={Bookmarks} options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <MaterialIcons name="bookmark" size={iconSize} color={color}/>
                ),
            }}/>
            <HomeBottomTabs.Screen name="Profile" component={Profile} options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="account-circle" size={iconSize} color={color}/>
                ),
            }}/>

        </HomeBottomTabs.Navigator>
    )
}