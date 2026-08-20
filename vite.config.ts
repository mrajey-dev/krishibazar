import { defineConfig, PluginOption, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function expoVectorIconsPlugin(): PluginOption {
  return {
    name: 'expo-vector-icons-jsx-transform',
    async transform(code, id) {
      if (id.includes('@expo/vector-icons') && (id.endsWith('.js') || id.endsWith('.mjs'))) {
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      }
      return null;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    expoVectorIconsPlugin(),
    react(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  resolve: {
    alias: {
      'react-native': path.resolve(__dirname, 'src/shims/react-native.ts'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
