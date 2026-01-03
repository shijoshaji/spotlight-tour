import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'AngularSpotlightTour',
            fileName: 'index',
            formats: ['es', 'cjs', 'umd']
        },
        rollupOptions: {
            external: ['@angular/core', '@angular/common', 'rxjs'],
            output: {
                globals: {
                    '@angular/core': 'ng.core',
                    '@angular/common': 'ng.common',
                    'rxjs': 'rxjs'
                }
            }
        }
    },
    plugins: [dts({ insertTypesEntry: true })]
});
