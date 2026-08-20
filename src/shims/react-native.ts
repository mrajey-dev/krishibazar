// @ts-ignore
import * as RNW from 'react-native-web';

export const TurboModuleRegistry = {
  get: (_name: string) => null,
  getEnforcing: (_name: string) => null,
};

export const NativeModules = (RNW as any).NativeModules || {};

// @ts-ignore
export * from 'react-native-web';
export default (RNW as any).default || RNW;
