import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      host: true,
    },
    build: {
      sourcemap: true,
      outDir: 'dist',
    },
    define: {
      'process.env.VITE_DATABASE_URL': JSON.stringify(env.VITE_DATABASE_URL),
      'process.env.VITE_DATABASE_AUTH_TOKEN': JSON.stringify(env.VITE_DATABASE_AUTH_TOKEN),
      'process.env.VITE_OPENAI_API_KEY': JSON.stringify(env.VITE_OPENAI_API_KEY),
    },
  };
});