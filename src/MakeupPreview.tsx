import { Camera, CameraType, FaceDetectionResult } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { View as DefaultView } from "react-native";
import * as FaceDetector from "expo-face-detector";
import { ColorHEX, ColorPickerModal } from "./ColorPickerModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ExpandableFloatingAction from "react-native-expandable-fab";

export type ColorSetter = (x: any) => void;

const starterColor: ColorHEX = "#c2536b";

export default function MakeupPreview() {
    //State
    const cameraRef = useRef<Camera | null>(null);
    const [lipsColor, setLipsColor] = useState(starterColor);
    const [eyeshadowColor1, setEyeshadowColor1] = useState(starterColor);
    const [eyeshadowColor2, setEyeshadowColor2] = useState(starterColor);
    const [eyeshadowColor3, setEyeshadowColor3] = useState(starterColor);

    //Modal state
    const [modalVisible, setModalVisible] = useState(false);
    const [modalColorSetter, setModalColorSetter] = useState<ColorSetter>(() => () => {});
    const [modalColor, setModalColor] = useState<ColorHEX>(starterColor);
    const [modalTitle, setModalTitle] = useState<string | undefined>("");

    //Functions
    const handleFacesDetected = (result: FaceDetectionResult) => {
        const faces = result.faces;
        //@ts-ignore
        if (faces) console.log(faces[0]["face"]);
    };

    const requestShowModal = (color: ColorHEX, colorSetter: ColorSetter, title?: string) => {
        setModalColor(color);
        setModalColorSetter(() => colorSetter);
        setModalTitle(title);
        setModalVisible(true);
    };

    //Effects
    useEffect(() => {
        if (modalVisible) {
            cameraRef.current?.pausePreview();
        } else {
            cameraRef.current?.resumePreview();
        }
    }, [modalVisible]);

    return (
        <View style={styles.container}>
            <ColorPickerModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setColor={modalColorSetter}
                color={modalColor}
                title={modalTitle}
            />
            <Camera
                style={styles.camera}
                type={CameraType.front}
                onFacesDetected={handleFacesDetected}
                faceDetectorSettings={{
                    mode: FaceDetector.FaceDetectorMode.fast,
                    runClassifications: FaceDetector.FaceDetectorClassifications.none,
                    detectContours: 2,
                    minDetectionInterval: 10,
                    tracking: true,
                }}
                ref={(ref) => {
                    cameraRef.current = ref;
                }}
                //vscode is not catching patched interfaces, ignore following errors
                //@ts-ignore
                lipstickColor={lipsColor}
                eyeshadowColor1={eyeshadowColor1}
                eyeshadowColor2={eyeshadowColor2}
                eyeshadowColor3={eyeshadowColor3}
            >
                <DefaultView style={styles.buttonContainer}>
                    <ExpandableFloatingAction
                        mainColor={eyeshadowColor1}
                        secondaryColor={eyeshadowColor1}
                        //@ts-ignore
                        closeIcon={<MaterialCommunityIcons name="eye" color="white" style={styles.icon} />}
                        //@ts-ignore
                        openIcon={<MaterialCommunityIcons name="eye" color="white" style={styles.icon} />}
                        menuIcons={[
                            {
                                name: "1",
                                icon: <Text style={styles.text}>1</Text>,
                                callback: () => requestShowModal(eyeshadowColor1, setEyeshadowColor1, "1-szy kolor cienia do powiek"),
                                color: eyeshadowColor1,
                            },
                            {
                                name: "2",
                                icon: <Text style={styles.text}>2</Text>,
                                callback: () => requestShowModal(eyeshadowColor2, setEyeshadowColor2, "2-gi kolor cienia do powiek"),
                                color: eyeshadowColor2,
                            },
                            {
                                name: "3",
                                icon: <Text style={styles.text}>3</Text>,
                                callback: () => requestShowModal(eyeshadowColor3, setEyeshadowColor3, "3-ci kolor cienia do powiek"),
                                color: eyeshadowColor3,
                            },
                        ]}
                    />
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: lipsColor }]}
                        onPress={() => requestShowModal(lipsColor, setLipsColor, "Kolor szminki")}
                    >
                        {/* @ts-ignore */}
                        <MaterialCommunityIcons name="lipstick" color="white" style={styles.icon} />
                    </TouchableOpacity>
                </DefaultView>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        paddingTop: 2,
        fontSize: 30,
    },
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        zIndex: 1000,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 5,
        marginRight: 5,
    },
    button: {
        backgroundColor: "#2196F3",
        maxHeight: 64,
        alignSelf: "flex-end",
        opacity: 0.8,
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 0.5,
        zIndex: 999,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    text: {
        fontSize: 18,
        color: "white",
    },
});
