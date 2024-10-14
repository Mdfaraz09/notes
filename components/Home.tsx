import { FlatList, StyleSheet, Text, View } from "react-native";
import Header from "./Header";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import NoteCard, { Details } from "./NoteCard";
import CreateNote from "./CreateNote";
import DeleteNote from "./DeleteNote";

export default function Home() {
    const [showModal, setShowModal] = useState<{ show: boolean; clickedNote?: Details }>({ show: false, })
    const [notes, setNotes] = useState<Details[]>([])
    const [showDelete, setShowDelete] = useState<{ show: boolean; details?: Details }>({ show: false })
    const db = useSQLiteContext()

    async function getAll() {
        const allRows: Details[] = await db.getAllAsync('SELECT * FROM notes');
        setNotes(allRows)
    }

    useEffect(() => {
        getAll()
    }, [])
    return (
        <>
            <Header setShowModal={setShowModal} />

            {notes.length > 0 ?
                < FlatList
                    style={styles.notesContainer}
                    data={notes}
                    renderItem={({ item }) => <NoteCard showDelete={setShowDelete} setShowModal={setShowModal} details={item} key={item.id} />}
                    numColumns={2}
                    ListFooterComponent={<View style={{ height: 40 }}></View>}
                /> :
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        paddingHorizontal: 20
                    }}
                >
                    Create a note by clicking the + icon</Text>
            }

            <DeleteNote show={showDelete.show} setShow={() => setShowDelete({ show: false })} details={showDelete.details} fetchAll={getAll} />

            <CreateNote modalVisible={showModal.show} setModalVisible={() => setShowModal({ show: false })} details={showModal.clickedNote} fetchAll={getAll} />
        </>
    )
}


const styles = StyleSheet.create({
    notesContainer: {
        flexGrow: 1,
        marginBottom: 50
    }
})