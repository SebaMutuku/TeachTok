interface MQCdata {
    type: string | undefined,
    id: number,
    playlist: string | undefined,
    description: string | undefined,
    image: string | undefined,
    question: string | undefined,
    options: [
        id: string,
        answer: string,
    ] | undefined,
    user: {
        name: string | undefined,
        avatar: string | undefined,
    } | undefined
}