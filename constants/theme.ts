import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';

const fontConfig = {

};

// --- 2. CORES ---

const customColors = {

    primary: '#007AFF',
    onPrimary: '#FFFFFF',
    primaryContainer: '#D0E3FF',
    onPrimaryContainer: '#001D35',

    background: '#E6F4FE',
    onBackground: '#000000',
    surface: '#FFFFFF',
    onSurface: '#000000',
    secondary: '#535F70',
    error: '#BA1A1A',
    onError: '#FFFFFF',
};


const AlagymTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...customColors,
    },

    fonts: configureFonts({ config: fontConfig }),
    roundness: 6,
};

export default AlagymTheme;