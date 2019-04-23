/** @format */

import { StyleSheet } from 'react-native';

function toPercent(value) {
    return `${Math.floor(value)}%`;
}

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    col1: {
        width: toPercent(100 / 12),
    },
    col2: {
        width: toPercent(100 / 6),
    },
    col3: {
        width: toPercent(100 / 4),
    },
    col4: {
        width: toPercent(100 / 3),
    },
    col5: {
        width: toPercent((100 * 5) / 12),
    },
    col6: {
        width: toPercent(100 / 2),
    },
    col7: {
        width: toPercent((100 * 7) / 12),
    },
    col8: {
        width: toPercent(200 / 3),
    },
    col9: {
        width: toPercent((100 * 9) / 12),
    },
    col10: {
        width: toPercent((100 * 5) / 6),
    },
    col11: {
        width: toPercent((100 * 11) / 12),
    },
    col12: {
        width: toPercent(100),
    },
});
