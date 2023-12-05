import {Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {AntDesign, FontAwesome, Fontisto, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";


interface ImageFlatListProps {
    data: MQCdata[];
}

interface AnswerData {
    id: number,
    correct_options: [
        {
            id: string,
            answer: string
        }
    ]
}

const dimensions = Dimensions.get("screen")

const TopSection = () => (
    <View style={styles.top}>
        <View style={{
            justifyContent: "flex-start",
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
        }}>
            <MaterialCommunityIcons name="clock-time-twelve-outline" size={24} color="white"/>
            <Text style={{
                color: "white"
            }}>10m</Text>
        </View>

        <View style={{
            justifyContent: "center"
        }}>
            <Text style={{
                fontWeight: "normal", fontSize: 16,
                fontStyle: "normal",
                color: "white"
            }}>For You</Text>

            <View style={{
                borderBottomColor: 'white',
                borderBottomWidth: 2,
                margin: 10,
                width: 40
            }}/>
        </View>
        <FontAwesome name="search" size={24} color="white"/>
    </View>
)


const AuthorInfo = ({author, desc}: any) => (
    <View style={{
        marginLeft: 20,
    }}>
        <Text style={[styles.authorInfo, {marginVertical: 5}]}>{author}</Text>
        <Text style={styles.desc}>{desc}</Text>
    </View>);

const PlayList = ({playList}: any) => (
    <View style={{
        flex: 1,
        marginTop: 20,
        backgroundColor: "#161616"
    }}>
        <View style={{
            marginLeft: 20,
            flexDirection: "row",
            padding: 5,
            justifyContent: 'space-between'
        }}>
            <View style={{
                marginHorizontal: 5,
                flexDirection: "row",
            }}>
                <MaterialCommunityIcons name="play-box-multiple-outline" size={24} color="white"/>
                <Text style={[styles.authorInfo, {marginHorizontal: 5}]}>{playList}</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="white"/>
        </View>
    </View>);
export default function ImageFlatList({data}: ImageFlatListProps) {

    const [iconName, setIconName] = React.useState("")
    const [iconColor, setIconColor] = React.useState("white")
    const [selectedId, setSelectedId] = React.useState<string>("");

    const validateAnswer = async ({id, choice}: any) => {
        const questionAnswer = await fetch(`https://cross-platform.rp.devfactory.com/reveal?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => resp.json()).then((answer: AnswerData) => {
            if (answer.correct_options[0].id === choice) {
                setIconName("like")
                setIconColor("green")
            } else {
                setIconName("dislike")
                setIconColor("red")
            }

        })
    }


    const QuestionAnswers = ({options, iconColor, iconName, choice, item}: any) => {
        const backgroundColor = selectedId == choice ? "rgba(40, 177, 143, 0.00)" : "rgba(255, 255, 255, 0.50)"

        const icon = () => {
            return (
                <View>
                    {iconName && selectedId == choice && <Fontisto name={iconName} size={24} color={iconColor}/>}
                </View>);
        }
        return (
            <View style={{
                flexDirection: "column",
                justifyContent: "space-between",
                marginTop: 250,
                padding: 20
            }}>
                {options.map((answerOption: any) => (
                    <TouchableOpacity key={answerOption.id} style={{
                        backgroundColor,
                        padding: 15,
                        marginRight: 20,
                        borderRadius: 8,
                        margin: 5,
                        justifyContent: 'space-between',
                        flexDirection: "row"
                    }} onPress={async () => {
                        setSelectedId(answerOption.id)
                        console.log(selectedId)
                        await fetch(`https://cross-platform.rp.devfactory.com/reveal?id=${item.id}`, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(resp => resp.json()).then((answer: AnswerData) => {
                            if (selectedId === answerOption.id) {
                                if (answer.correct_options[0].id === answerOption.id) {
                                    setIconName("like")
                                } else {
                                    setIconName("dislike")
                                }
                            }
                        })
                    }}>
                        <Text style={{
                            color: "#FFF",
                            shadowColor: "rgba(0, 0, 0, 0.45)",
                            fontSize: 17,
                            fontStyle: "normal",
                            alignSelf: "flex-start",
                            fontWeight: "500"
                        }}>{answerOption.answer}</Text>
                        {icon()}
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
    const renderItem = ({item}: { item: MQCdata }) => {
        return (
            <ImageBackground key={item.id} source={{uri: item.image}} style={styles.backgroundImage}>
                <TopSection/>
                <View style={{
                    marginHorizontal: 16,
                    padding: 20
                }}>
                    <Text style={styles.topText}>
                        {item.question}
                    </Text>
                </View>
                <View style={{
                    flexDirection: "row"
                }}>
                    <View style={{
                        flex: 2
                    }}>
                        <QuestionAnswers options={item.options} item={item} iconName={iconName} iconColor={iconColor}/>
                    </View>
                    <View style={{
                        margin: 5,
                        flexDirection: "column",
                        justifyContent: 'flex-end',
                        alignItems: "center",
                        alignContent: 'center'
                    }}>
                        <View style={styles.rightIcons}>
                            <Image source={{uri: item.user?.avatar}} style={{
                                resizeMode: "cover",
                                height: 45,
                                width: 45
                            }}/>
                            <AntDesign name="pluscircle" size={25} color="#40B143" style={styles.iconContainer}/>
                        </View>

                        <View style={styles.rightIcons}>
                            <Fontisto name="heart" size={30} color="white"/>
                            <Text style={styles.rightIconText}>87</Text>
                        </View>
                        <View style={styles.rightIcons}>
                            <AntDesign name="message1" size={30} color="white"/>
                            <Text style={styles.rightIconText}>2</Text>
                        </View>
                        <View style={styles.rightIcons}>
                            <FontAwesome name="bookmark" size={30} color="white"/>
                            <Text style={styles.rightIconText}>203</Text>
                        </View>
                        <View style={styles.rightIcons}>
                            <Fontisto name="share-a" size={30} color="white"/>
                            <Text style={styles.rightIconText}>17</Text>
                        </View>
                    </View>
                </View>
                <AuthorInfo author={item.user?.name} desc={item.description}/>
                <PlayList playList={item.playlist}/>
            </ImageBackground>
        );
    };
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
        />
    )

}

const styles = StyleSheet.create({
    topText: {
        fontSize: 22,
        fontStyle: "normal",
        fontWeight: "500",
        color: "white",
        backgroundColor: "black"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: dimensions.height,
        width: dimensions.width
    },
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        marginVertical: 16
    },
    authorInfo: {
        color: "#FFF",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "600",
    },
    desc: {
        color: "#FFF",
        fontSize: 13,
        fontStyle: "normal",
        fontWeight: "700",
    },
    rightIcons: {
        margin: 2,
        justifyContent: "space-between",
        alignItems: 'center',
        marginVertical: 10
    },
    rightIconText: {
        color: "#FFF",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "600",
    },
    iconContainer: {
        position: 'absolute',
        top: 30,
        left: '87%',
        transform: [{translateX: -25}],
        zIndex: 1,
    },
})