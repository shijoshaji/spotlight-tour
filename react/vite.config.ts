import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.tsx'),
            name: 'ReactSpotlightTour',
            fileName: 'index',
            formats: ['es', 'cjs', 'umd']
        },
        rollupOptions: {
            external: ['react', 'react-dom']
        }
    },
    plugins: [dts({ insertTypesEntry: true })]
});
