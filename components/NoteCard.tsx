import { Dimensions, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

const characters = "012345679ABCDEF"

const getRandomColor = () => {
    let color = "#"
    for (let index = 0; index < 6; index++) {
        const charIndex = Math.round(Math.random() * 16)
        color += characters[charIndex]
    }
    return color
}

export interface Details {
    title: string
    id: number
    body: string
    date: string
}

interface NoteCardProps {
    details: Details,
    setShowModal: (value: any) => void,
    showDelete: (value: any) => void
}

export default function NoteCard({ details, setShowModal, showDelete }: NoteCardProps) {
    const color = getRandomColor()

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: color }]}
            onPress={() => setShowModal({ show: true, clickedNote: details })}
            onLongPress={() => showDelete({ show: true, details: details })}
        >
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{details.title}</Text>
                </View>

                <View style={styles.bodyContainer}>
                    <Text numberOfLines={4} style={styles.body}>{details.body}</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.date}>{new Date(details.date).toLocaleDateString()}</Text>
                </View>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    card: {
        height: Dimensions.get("window").height / 3.5,
        width: "45%",
        borderRadius: 8,
        marginHorizontal: 10,
        marginVertical: 20,
        opacity: 0.8,
        elevation: 8,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        opacity: 1,
        zIndex: 1,
        paddingHorizontal: 10
    },
    titleContainer: {
        paddingTop: 20,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10
    },
    title: {
        fontSize: 25,
        fontWeight: "500",
        color: "white"
    },
    bodyContainer: {
        flexGrow: 1
    },
    body: {
        fontSize: 20,
        fontWeight: "200",
        color: "white",
        width: "100%"
    },
    date: {
        fontSize: 12,
        fontStyle: "italic",
        fontWeight: "200",
        color: "white",
        flexGrow: 1
    },
})