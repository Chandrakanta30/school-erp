// ** Type Imports
import { Palette } from '@mui/material'
import { Skin } from 'src/@core/layouts/types'

const DefaultPalette = (mode: Palette['mode'], skin: Skin): Palette => {
  // ** Vars
  const whiteColor = '#FFF'
  const lightColor = '17, 24, 39'
  const darkColor = '241, 245, 249'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return '#30334E'
    } else if (mode === 'light') {
      return '#F6F8FB'
    } else return '#111827'
  }

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      darkBg: '#111827',
      lightBg: '#F6F8FB',
      bodyBg: mode === 'light' ? '#F6F8FB' : '#111827', // Same as palette.background.default but doesn't consider bordered skin
      trackBg: mode === 'light' ? '#E8EDF5' : '#1F2937',
      avatarBg: mode === 'light' ? '#EEF2F7' : '#273244',
      tooltipBg: mode === 'light' ? '#111827' : '#F8FAFC',
      tableHeaderBg: mode === 'light' ? '#F8FAFC' : '#1F2937'
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      light: '#4F83FF',
      main: '#2563EB',
      dark: '#1D4ED8',
      contrastText: whiteColor
    },
    secondary: {
      light: '#7F889B',
      main: '#6D788D',
      dark: '#606A7C',
      contrastText: whiteColor
    },
    error: {
      light: '#F87171',
      main: '#DC2626',
      dark: '#B91C1C',
      contrastText: whiteColor
    },
    warning: {
      light: '#FBBF24',
      main: '#D97706',
      dark: '#B45309',
      contrastText: whiteColor
    },
    info: {
      light: '#38BDF8',
      main: '#0284C7',
      dark: '#0369A1',
      contrastText: whiteColor
    },
    success: {
      light: '#34D399',
      main: '#059669',
      dark: '#047857',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? whiteColor : '#30334E',
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.05)`,
      hoverOpacity: 0.05,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  } as Palette
}

export default DefaultPalette
