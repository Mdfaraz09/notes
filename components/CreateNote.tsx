import { Modal, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Details } from './NoteCard';
import { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

interface CreateNoteProps {
    modalVisible: boolean
    setModalVisible: () => void
    details?: Details
    fetchAll: () => void
}

const CreateNote = ({ modalVisible, setModalVisible, details, fetchAll }: CreateNoteProps) => {
    const [title, setTitle] = useState(details?.title || "")
    const [body, setBody] = useState(details?.body || "")
    const db = useSQLiteContext()

    useEffect(() => {
        setTitle(details?.title || "")
        setBody(details?.body || "")
    }, [details])

    const saveNote = async () => {
        if (details?.id) {
            try {
                await db.runAsync('UPDATE notes SET title = ?, body = ?, date = ? WHERE id = ?', title, body, new Date().toISOString(), details.id)
                setTitle("")
                setBody("")
                setModalVisible()
                fetchAll()
            } catch (error) {
                console.log(error);
            }

        } else {
            try {
                await db.runAsync('INSERT INTO notes (title,body, date) VALUES (?, ?, ?)', title, body, new Date().toISOString());
                setTitle("")
                setBody("")
                setModalVisible()
                fetchAll()
            } catch (error) {
                console.log(error);
            }

        }
    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible()
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Note</Text>

                        <View style={{
                            flexGrow: 1
                        }}>
                            <TextInput
                                style={styles.titleText}
                                placeholder='Title here'
                                value={title}
                                onChangeText={setTitle}
                            />

                            <View
                                style={{
                                    flexGrow: 1
                                }}
                            >
                                <TextInput
                                    value={body}
                                    onChangeText={setBody}
                                    multiline
                                    style={styles.bodyText}
                                    placeholder='Body here'
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                alignItems: "flex-end",
                            }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "purple",
                                    padding: 15,
                                    borderRadius: 8,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white"
                                    }}

                                    onPress={saveNote}
                                >
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.9,
        minHeight: Dimensions.get('window').height * 0.7,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    modalText: {
        marginBottom: 15,
        fontSize: 25,
        textAlign: "center"
    },
    titleText: {
        fontSize: 20,
        paddingVertical: 10
    },
    bodyText: {

    },
});

export default CreateNote;