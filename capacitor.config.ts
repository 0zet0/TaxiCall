import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.app',
  appName: 'Gram',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
