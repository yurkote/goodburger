import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Підключаємо плагін для підтримки React (JSX, Fast Refresh)
  base: '/goodburger',
  plugins: [react()],
  server: {
    port: 3000, // Порт як у CRA
    open: true, // Автоматично відкривати браузер
  },
  build: {
    outDir: 'build', // Щоб папка після збірки називалася як у CRA
  },
});