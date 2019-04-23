/** @format */

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styles from '../styles/styles';

class Grid extends Component {
    render() {
        const {
            data,
            itemsPerRow = 2,
            refreshing,
            onRefresh,
            onEndReached,
            onEndReachedThreshold,
            horizontal,
        } = this.props;
        const rows = this.chunkArray(data, itemsPerRow);

        return (
            <FlatList
                horizontal={horizontal}
                data={rows}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
                keyExtractor={(_, index) => `row_${index}`}
                renderItem={({ item }) => this.renderRow(item)}
            />
        );
    }

    renderRow(row = []) {
        const { renderItem, horizontal } = this.props;
        const rowStyles = horizontal ? styles.column : styles.row;
        return (
            <View style={[rowStyles, { flex: 1 }]}>
                {row.map((item, index) => (
                    <View key={`item_${index}`} style={{ flex: 1 }}>
                        {renderItem({ item })}
                    </View>
                ))}
            </View>
        );
    }

    chunkArray(array, size) {
        let buffer = [];
        return array.reduce((result, item) => {
            buffer.push(item);
            if (buffer.length === size) {
                result.push(buffer);
                buffer = [];
            }

            return result;
        }, []);
    }
}

export default Grid;
