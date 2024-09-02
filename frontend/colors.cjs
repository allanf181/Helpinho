let invertColors = (colorMap) => {
  return Object.fromEntries(
    Object.keys(colorMap).reverse().map(
      (key, index) => [key, Object.values(colorMap)[index]]
    )
  )
}

let colors = {
  base: {
    white: '#ffffff',
    black: '#000000',
  },
  neutral: {
    50: '#f6f6f6',
    100: '#e7e7e7',
    200: '#d1d1d1',
    300: '#b0b0b0',
    400: '#888888',
    500: '#6d6d6d',
    600: '#5d5d5d',
    700: '#4f4f4f',
    800: '#454545',
    900: '#3d3d3d',
    950: '#0a0a0a',
  },
  primary: {
    50: '#fff0f3',
    100: '#ffe2e7',
    200: '#ffc8d6',
    300: '#ff9cb4',
    400: '#ff648e',
    500: '#ff2e6b',
    600: '#f40b59',
    700: '#ce024c',
    800: '#ac0546',
    900: '#930843',
    950: '#530020',
  },
  secondary: {
    50: '#fefbe8',
    100: '#fdf5c4',
    200: '#fde88b',
    300: '#fbd549',
    400: '#f8be17',
    500: '#f4ae0b',
    600: '#c87e06',
    700: '#9f5909',
    800: '#84460f',
    900: '#703a13',
    950: '#411d07',
  },
  success: {
    50: '#F0FDF3',
    100: '#DDFBE4',
    200: '#BDF5CB',
    300: '#89ECA4',
    400: '#4EDA74',
    500: '#2DD55B',
    600: '#1A9F3E',
    700: '#187D34',
    800: '#18632E',
    900: '#165127',
    950: '#062D12',
  },
  warning: {
    50: '#FFFFEA',
    100: '#FFFCC5',
    200: '#FFF985',
    300: '#FFEF46',
    400: '#FFE11B',
    500: '#FFC409',
    600: '#E29600',
    700: '#BB6A02',
    800: '#985208',
    900: '#7C430B',
    950: '#482300',
  },
  error: {
    50: '#FFF0F1',
    100: '#FFDDE0',
    200: '#FFC1C6',
    300: '#FF959D',
    400: '#FF5966',
    500: '#FF2637',
    600: '#FC0619',
    700: '#C5000F',
    800: '#AF0512',
    900: '#900C16',
    950: '#500006',
  },
  dark: {},
}

colors.dark.base = {
  white: colors.base.black,
  black: colors.base.white,
}

colors.dark.neutral = invertColors(colors.neutral)
colors.dark.primary = invertColors(colors.primary)
colors.dark.secondary = invertColors(colors.secondary)
colors.dark.success = invertColors(colors.success)
colors.dark.warning = invertColors(colors.warning)
colors.dark.error = invertColors(colors.error)

module.exports = colors
