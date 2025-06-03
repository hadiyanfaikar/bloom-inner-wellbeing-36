
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e70e94f00ad64c068e242b445eb034b9',
  appName: 'bloom-inner-wellbeing',
  webDir: 'dist',
  server: {
    url: 'https://e70e94f0-0ad6-4c06-8e24-2b445eb034b9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#667eea",
      showSpinner: false
    }
  }
};

export default config;
