const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable package exports in Metro to fix Windows resolution of legacy packages
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
