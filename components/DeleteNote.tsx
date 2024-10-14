import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { Details } from './NoteCard';
import { useSQLiteContext } from 'expo-sqlite';

interface DeleteNoteProps {
    show: boolean
    setShow: () => void
    details?: Details
    fetchAll: () => void
}


const DeleteNote = ({ show, setShow, details, fetchAll }: DeleteNoteProps) => {
    const db = useSQLiteContext()

    const deleteNote = async () => {
        if (details?.id) {
            try {
                await db.runAsync('DELETE FROM notes WHERE id = ?', details.id);
                setShow()
                fetchAll()
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {

    }, [details])

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={show}
                onRequestClose={() => {
                    setShow();
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Do you really want to delete the note</Text>
                        <Text style={styles.modalText}>{details?.title} ?</Text>
                        <View style={{ flexDirection: "row", gap: 40, marginTop: 15 }}>
                            <Pressable
                                style={[styles.button, { backgroundColor: "red", justifyContent: "center", padding: 20 }]}
                                onPress={() => deleteNote()}>
                                <Text style={styles.textStyle}>Sure</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, { backgroundColor: "#2196F3", justifyContent: "center", padding: 20 }]}
                                onPress={() => setShow()}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
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
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
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
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default DeleteNote;