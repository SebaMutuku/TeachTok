import {Dimensions, ScrollView, StyleSheet} from "react-native";
import {ContainerComponent} from "../constants/widgets";
import React from "react";
import ImageFlatList from "../flatlist/imageFlatList";


const dimensions = Dimensions.get("screen")
export default function Home() {

    const [mqcData, setMqcdata] = React.useState<MQCdata[]>([]);

    React.useEffect(() => {
        fetch("https://cross-platform.rp.devfactory.com/for_you", {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(data => data.json()).then(resp => {
            const data: MQCdata[] = []
            if (resp) {
                data.push(resp)
                setMqcdata(data)
            }
        });
    }, [])
    return <ContainerComponent>
        <ScrollView>
            <ImageFlatList data={mqcData}/>
        </ScrollView>

    </ContainerComponent>
}

const styles = StyleSheet.create({
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        marginVertical: 16
    },
    topText: {
        fontSize: 22,
        fontStyle: "normal",
        fontWeight: "500",
        color: "white"
    }, backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: dimensions.width,
        height: dimensions.height,
        resizeMode: 'cover',
    },
    avatar: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        height: 40, width: 40,
        resizeMode: 'cover',
    },
})