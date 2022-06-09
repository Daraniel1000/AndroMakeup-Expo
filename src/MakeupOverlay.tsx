import React, { useEffect, useState } from "react";
import Svg, { Circle, Polygon } from "react-native-svg";
import { Platform, StyleSheet } from "react-native";
import * as FaceDetector from "expo-face-detector";

const getUpperLipShape = (face?: FaceDetector.FaceFeature) =>
    face ? (face.contours.upperLipTop ? face.contours.upperLipTop + face.contours.upperLipBottom : "") : "";

const getLowerLipShape = (face?: FaceDetector.FaceFeature) =>
    face ? (face.contours.lowerLipTop ? face.contours.lowerLipTop + face.contours.lowerLipBottom : "") : "";

export const MakeupOverlay = ({ face }: { face?: FaceDetector.FaceFeature }) => {
  const [lipstickColor, setLipstickColor] = useState("pink");
  const [opacity, setOpacity] = useState(0.5);
  
  if(!face){
    console.log("no face")
  }
    return (
        <Svg style={styles.canvas}>
            <Polygon points={getUpperLipShape(face)} fill={lipstickColor} opacity={opacity} />
            <Polygon points={getLowerLipShape(face)} fill={lipstickColor} opacity={opacity} />
            {/* <Circle cx={face?.contours.upperLipTop["1"].x} cy={face?.contours.upperLipTop["1"].y} r="50" fill="pink" opacity={0.5}/> */}
        </Svg>
    );
};

const styles = StyleSheet.create({
    canvas: {
        width: 720,
        height: 1280,
        zIndex: 1001,
        position: "absolute",
        backgroundColor: "transparent",
    },
});
