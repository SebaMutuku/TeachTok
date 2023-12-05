import {ContainerComponent} from "../constants/widgets";
import React from "react";
import ImageFlatList from "../flatlist/imageFlatList";

export default function Home() {

    const [mqcData, setMqcdata] = React.useState<MQCdata[]>([]);
    const [filteredAnswer, setFilteredAnswer] = React.useState<AnswerData[]>([]);

    React.useEffect(() => {
        fetch("https://cross-platform.rp.devfactory.com/for_you", {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(data => data.json()).then(async (resp: MQCdata) => {
            const data: MQCdata[] = []
            if (resp) {

                await fetch(`https://cross-platform.rp.devfactory.com/reveal?id=${resp.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(resp => resp.json()).then((answer: AnswerData) => {
                    const answersArray = []
                    if (answer) {
                        answersArray.push(answer)
                        setFilteredAnswer(answersArray)
                    }
                })
                data.push(resp)
                setMqcdata(data)
            }
        });
    }, [])
    return <ContainerComponent>
        <ImageFlatList data={mqcData} answers={filteredAnswer}/>
    </ContainerComponent>
}
