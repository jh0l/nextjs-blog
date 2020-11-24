import {grommet, ThemeType} from 'grommet/themes';
import {deepMerge} from 'grommet/utils';
export const theme: ThemeType = deepMerge(grommet, {
    global: {
        colors: {
            'light-2': '#f5f5f5',
            text: {
                light: 'rgba(0, 0, 0, 0.87)',
            },
        },
        edgeSize: {
            small: '2px',
        },
        elevation: {
            light: {
                medium:
                    '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
            },
        },
        font: {
            family: 'Roboto, Ubuntu',
            size: '14px',
            height: '20px',
        },
    },
    list: {
        item: {
            pad: {horizontal: 'large'},
            border: false,
        },
    },
});
