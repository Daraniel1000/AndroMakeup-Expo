import dotenv from "dotenv";

const variant = process.env.APP_VARIANT || "development";

const defaultEnvFilePerVariant = {
  development: ".env/dev.env",
  preview: ".env/preview.env",
  production: ".env/prod.env",
};

const envFile = process.env.ENV_FILE || defaultEnvFilePerVariant[variant];

dotenv.config({ path: envFile });

export default {
  name: process.env.APP_NAME || "AndroMakeup-Expo",
  slug: "AndroMakeup-Expo",
  version: "0.1.0",
  orientation: "portrait",
  platforms: ["android"],
  icon: "./assets/images/icon.png",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: process.env.PACKAGE_NAME || "com.andromakeup",
  },
  androidNavigationBar: {
    visible: "immersive",
  },
};