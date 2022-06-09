import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Modal, Pressable } from "react-native";
import { Text, View } from "../components/Themed";
import { ColorSetter } from "./MakeupPreview";
import ColorPicker from "react-native-wheel-color-picker";

export type ColorHEX = string;

export const ColorPickerModal = (props: {
    color: ColorHEX;
    setColor: ColorSetter;
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    title?: string;
}) => {
    const [color, setColor] = useState(props.color);

    useEffect(() => {
        if (props.modalVisible) {
            setColor(props.color);
        }
    }, [props.modalVisible]);

    return (
        <Modal
            animationType="fade"
            transparent={false}
            onRequestClose={() => {
                props.setModalVisible(!props.modalVisible);
            }}
            visible={props.modalVisible}
        >
            <View style={styles.centeredView}>
                {props.title && <Text style={styles.title}>{props.title}</Text>}
                <View style={{ flex: 1, maxWidth: "80%" }}>
                    {/* @ts-ignore */}
                    <ColorPicker color={color} onColorChangeComplete={setColor} />
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.button, styles.buttonAccept]}
                        onPress={() => {
                            props.setColor(color);
                            props.setModalVisible(!props.modalVisible);
                        }}
                    >
                        <Text style={styles.textStyle}>Accept</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonCancel]}
                        onPress={() => props.setModalVisible(!props.modalVisible)}
                    >
                        <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
        maxHeight: "15%",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 15,
        elevation: 2,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    buttonAccept: {
        backgroundColor: "#02c923",
    },
    buttonCancel: {
        backgroundColor: "#e80505",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
    },
});
