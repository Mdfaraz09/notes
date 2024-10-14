import { useSQLiteContext } from "expo-sqlite";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Header({ setShowModal }: { setShowModal: (value: any) => void }) {

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search Notes..."
            />
            <TouchableOpacity onPress={() => {
                setShowModal({ show: true })
            }} style={styles.addButton} >
                <Text style={styles.addButtonTxt}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        paddingVertical: 20,
        paddingHorizontal: 15,
        gap: 5
    },
    searchInput: {
        flex: 1,
        backgroundColor: "#c3b6cb",
        borderRadius: 8,
        padding: 10
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "15%",
        borderRadius: 8,
        backgroundColor: "#34084f"

    },
    addButtonTxt: {
        color: "white",
        fontSize: 20
    }
})