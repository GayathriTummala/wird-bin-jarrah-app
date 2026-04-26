const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Allow Metro to bundle audio files
config.resolver.assetExts.push('mp3', 'wav', 'm4a', 'aac');

module.exports = withNativeWind(config, { input: "./global.css" });

