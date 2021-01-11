// prettier-ignore
const colors = {
//                  LIGHT        DARK
//colors
    blue:        ['#007aff',   '#0a84ff'],
    green:       ['#34c759',   '#30d158'],
    indigo:      ['#5856d6',   '#5e5ce6'],
    orange:      ['#ff9500',   '#ff9f0a'],
    pink:        ['#ff2d55',   '#ff375f'],
    purple:      ['#af52de',   '#bf5af2'],
    red:         ['#ff3b30',   '#ff453a'],
    teal:        ['#5ac8fa',   '#64d2ff'],
    yellow:      ['#ffcc00',   '#ffd60a'],
//grays
    gray:        ['#8e8e93',   '#8e8e93'],
    gray2:       ['#aeaeb2',   '#636366'],
    gray3:       ['#c7c7cc',   '#48484a'],
    gray4:       ['#d1d1d6',   '#3a3a3c'],
    gray5:       ['#e5e5ea',   '#2c2c2e'],
    gray6:       ['#f2f2f7',   '#1c1c1e'],
//labels
    label:       ['#000000',   '#ffffff'],
    label2:      ['#3c3c4399', '#ebebf599'],
    label3:      ['#3c3c434c', '#ebebf54c'],
    label4:      ['#3c3c432d', '#ebebf52d'],
//fills
    fill:        ['#78788033', '#7878805b'],
    fill2:       ['#78788028', '#78788051'],
    fill3:       ['#7676801e', '#7676803d'],
    fill4:       ['#74748014', '#7676802d'],
//backgrounds
    background:  ['#ffffff',   '#000000'],
    background2: ['#f2f2f7',   '#1c1c1e'],
    background3: ['#ffffff',   '#2c2c2e'],
//separator
    separator:   ['#3c3c4349', '#54545899'],
//placeholder text
    placeholder: ['#3c3c434c', '#ebebf54c'],
//links
    link:        ['#007aff',   '#0984ff'],
//testing
    test1:   ['#34c75988', '#30d15888'],
    test2:  ['#5856d688', '#5e5ce688'],
    test3:    ['#ff2d5588', '#ff375f88'],
};

const lightTheme = {
  mode: 'light',
  statusbar: 'dark-content',
  //   PRIMARY_BACKGROUND: '#fff',
  //   SECONDARY_BACKGROUND: '#fafafa',
  //   GREYED_COLOR: '#ddd',
  //   PRIMARY_TEXT: '#000',
  //   SECONDARY_TEXT: '#333333',
};

const darkTheme = {
  mode: 'dark',
  statusbar: 'light-content',
  //   PRIMARY_BACKGROUND: '#000',
  //   SECONDARY_BACKGROUND: '#161616',
  //   GREYED_COLOR: '#444',
  //   PRIMARY_TEXT: '#fff',
  //   SECONDARY_TEXT: '#cbcbcb',
};

for (const [key, value] of Object.entries(colors)) {
  lightTheme[key] = value[0];
  darkTheme[key] = value[1];
}

export {lightTheme, darkTheme};
