/** @format */

import React, { Component, createRef } from 'react';
import {
    Animated,
    View,
    ScrollView,
    Text,
    Dimensions,
    PanResponder,
} from 'react-native';
import { TabView } from 'react-native-tab-view';

const columns = {
    GRID: {
        key: 'grid',
        title: '1',
    },
    LIST: {
        key: 'list',
        title: '2',
    },
};

const componentsByColumn = {
    [columns.GRID.key]: props => (
        <TestList backgroundColor={'yellow'} {...props} />
    ),
    [columns.LIST.key]: props => (
        <TestList backgroundColor={'green'} {...props} />
    ),
};

function TestList({
    backgroundColor,
    onScroll,
    nestedScrollEnabled,
    scrollEventThrottle,
}) {
    return (
        <ScrollView
            style={{ backgroundColor: backgroundColor, flex: 1 }}
            scrollEventThrottle={scrollEventThrottle}
            onScroll={onScroll}
            nestedScrollEnabled={nestedScrollEnabled}>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
                pulvinar sapien et ligula ullamcorper malesuada. Elit
                scelerisque mauris pellentesque pulvinar. Faucibus in ornare
                quam viverra orci sagittis eu volutpat. Arcu cursus vitae congue
                mauris rhoncus aenean vel. Non arcu risus quis varius quam
                quisque id diam. Quis imperdiet massa tincidunt nunc. Enim
                lobortis scelerisque fermentum dui faucibus in ornare quam
                viverra. A cras semper auctor neque vitae. Nec ultrices dui
                sapien eget. Ultrices mi tempus imperdiet nulla malesuada
                pellentesque elit eget gravida. Nunc sed id semper risus in
                hendrerit gravida rutrum. Enim ut tellus elementum sagittis
                vitae.
            </Text>
            <Text>
                Adipiscing commodo elit at imperdiet. Eu lobortis elementum nibh
                tellus. Ipsum a arcu cursus vitae congue. Lectus urna duis
                convallis convallis tellus id interdum velit. Nec feugiat nisl
                pretium fusce. Gravida cum sociis natoque penatibus et magnis
                dis parturient. Id cursus metus aliquam eleifend mi in. Arcu
                cursus vitae congue mauris rhoncus aenean. Id cursus metus
                aliquam eleifend mi in nulla. Amet tellus cras adipiscing enim
                eu turpis egestas pretium.
            </Text>
            <Text>
                Venenatis tellus in metus vulputate eu scelerisque. Amet mattis
                vulputate enim nulla aliquet porttitor. Sit amet est placerat in
                egestas erat imperdiet sed. Lectus vestibulum mattis ullamcorper
                velit sed ullamcorper morbi tincidunt ornare. Cursus in hac
                habitasse platea dictumst quisque sagittis purus. Fusce id velit
                ut tortor pretium viverra suspendisse potenti nullam. Justo nec
                ultrices dui sapien eget. Nisi porta lorem mollis aliquam.
                Phasellus vestibulum lorem sed risus ultricies tristique nulla.
                Odio pellentesque diam volutpat commodo sed egestas egestas
                fringilla. Sit amet consectetur adipiscing elit ut aliquam purus
                sit. Nascetur ridiculus mus mauris vitae ultricies leo integer
                malesuada. Consectetur lorem donec massa sapien faucibus et.
                Amet tellus cras adipiscing enim eu turpis egestas. Quis enim
                lobortis scelerisque fermentum. Quis imperdiet massa tincidunt
                nunc pulvinar sapien et ligula. Turpis egestas sed tempus urna
                et pharetra pharetra massa. Proin sagittis nisl rhoncus mattis
                rhoncus.
            </Text>
            <Text>
                Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit.
                Urna molestie at elementum eu. Pellentesque habitant morbi
                tristique senectus. Montes nascetur ridiculus mus mauris vitae
                ultricies. Duis ultricies lacus sed turpis tincidunt id. Eget
                mauris pharetra et ultrices neque ornare. Imperdiet nulla
                malesuada pellentesque elit eget gravida. Proin sagittis nisl
                rhoncus mattis rhoncus urna neque. Id aliquet risus feugiat in
                ante metus dictum. Egestas erat imperdiet sed euismod nisi
                porta. Purus in mollis nunc sed id semper risus in hendrerit.
                Ultrices neque ornare aenean euismod elementum nisi quis
                eleifend. Posuere ac ut consequat semper viverra nam libero
                justo. Aliquam malesuada bibendum arcu vitae elementum
                curabitur. Sapien nec sagittis aliquam malesuada.
            </Text>
            <Text>
                Lectus quam id leo in. Arcu cursus euismod quis viverra nibh
                cras pulvinar. Lorem dolor sed viverra ipsum. Eu tincidunt
                tortor aliquam nulla facilisi. Porttitor lacus luctus accumsan
                tortor posuere ac ut consequat. Vel risus commodo viverra
                maecenas accumsan. Vel pretium lectus quam id leo. At quis risus
                sed vulputate odio ut enim blandit volutpat. Commodo sed egestas
                egestas fringilla phasellus faucibus scelerisque eleifend donec.
                Gravida dictum fusce ut placerat orci nulla pellentesque
                dignissim. Amet cursus sit amet dictum sit amet justo donec.
            </Text>
            <Text>
                Pellentesque sit amet porttitor eget dolor morbi non arcu. Risus
                feugiat in ante metus. Aliquet eget sit amet tellus cras
                adipiscing enim eu turpis. Suspendisse potenti nullam ac tortor
                vitae purus faucibus. Phasellus vestibulum lorem sed risus. Et
                sollicitudin ac orci phasellus egestas tellus rutrum tellus
                pellentesque. Sed egestas egestas fringilla phasellus. Lacus sed
                turpis tincidunt id. Sem nulla pharetra diam sit amet. Eget duis
                at tellus at urna condimentum mattis. Neque volutpat ac
                tincidunt vitae semper. Mauris commodo quis imperdiet massa
                tincidunt nunc. Tempus urna et pharetra pharetra massa massa
                ultricies mi quis. Viverra vitae congue eu consequat ac felis
                donec. Lacus viverra vitae congue eu consequat. Tortor posuere
                ac ut consequat semper. Integer malesuada nunc vel risus commodo
                viverra maecenas accumsan. Dolor sit amet consectetur adipiscing
                elit duis tristique. Mi ipsum faucibus vitae aliquet nec.
            </Text>
            <Text>
                Tempus egestas sed sed risus pretium quam vulputate. Cursus
                metus aliquam eleifend mi in. Magna eget est lorem ipsum dolor
                sit amet consectetur. Tortor condimentum lacinia quis vel eros.
                Curabitur gravida arcu ac tortor. Aliquet sagittis id
                consectetur purus ut faucibus pulvinar. Consequat id porta nibh
                venenatis cras. Felis donec et odio pellentesque diam volutpat
                commodo. Dui ut ornare lectus sit amet est. Dolor purus non enim
                praesent elementum facilisis leo vel fringilla. In nulla posuere
                sollicitudin aliquam ultrices sagittis orci a. Dolor purus non
                enim praesent elementum facilisis. Enim eu turpis egestas
                pretium. Dolor sit amet consectetur adipiscing elit. Est
                pellentesque elit ullamcorper dignissim cras tincidunt. Aenean
                pharetra magna ac placerat vestibulum lectus mauris ultrices
                eros. Egestas egestas fringilla phasellus faucibus scelerisque.
                Tortor id aliquet lectus proin nibh nisl condimentum id.
            </Text>
            <Text>
                Augue mauris augue neque gravida in fermentum et. Vulputate enim
                nulla aliquet porttitor lacus luctus accumsan tortor.
                Pellentesque dignissim enim sit amet venenatis urna cursus eget
                nunc. Duis at consectetur lorem donec. Purus viverra accumsan in
                nisl nisi scelerisque eu ultrices. Morbi tincidunt ornare massa
                eget egestas purus viverra. Magna sit amet purus gravida quis
                blandit turpis. Mauris nunc congue nisi vitae suscipit tellus
                mauris. Quam adipiscing vitae proin sagittis nisl rhoncus mattis
                rhoncus urna. Vitae aliquet nec ullamcorper sit amet risus
                nullam eget felis. Suspendisse faucibus interdum posuere lorem
                ipsum dolor sit. Pellentesque habitant morbi tristique senectus
                et netus et malesuada fames. Tortor id aliquet lectus proin
                nibh. Mauris pharetra et ultrices neque.
            </Text>
            <Text>
                Vel fringilla est ullamcorper eget nulla facilisi. Ut sem
                viverra aliquet eget. Convallis tellus id interdum velit laoreet
                id donec ultrices tincidunt. Aenean euismod elementum nisi quis.
                Volutpat sed cras ornare arcu dui vivamus arcu felis. Orci porta
                non pulvinar neque laoreet. Est ultricies integer quis auctor
                elit sed. Laoreet non curabitur gravida arcu ac tortor. Habitant
                morbi tristique senectus et netus et malesuada. Mi bibendum
                neque egestas congue quisque. Tristique senectus et netus et
                malesuada. At elementum eu facilisis sed odio morbi quis commodo
                odio. Integer vitae justo eget magna fermentum iaculis eu non
                diam. Amet tellus cras adipiscing enim eu turpis egestas. Mi
                bibendum neque egestas congue quisque egestas diam in.
            </Text>
            <Text>
                Dolor sit amet consectetur adipiscing elit duis tristique
                sollicitudin nibh. Mi proin sed libero enim sed faucibus turpis
                in. At urna condimentum mattis pellentesque. Proin libero nunc
                consequat interdum. Sed cras ornare arcu dui vivamus arcu felis
                bibendum. Augue interdum velit euismod in. Ac turpis egestas
                maecenas pharetra convallis posuere. Nulla pellentesque
                dignissim enim sit amet venenatis urna. Enim facilisis gravida
                neque convallis. Consequat nisl vel pretium lectus quam.
            </Text>
        </ScrollView>
    );
}

export default class TabViewWithFoldableHeader extends Component {
    constructor(props) {
        super(props);

        this.scrollViewRef = createRef();
        this.state = {
            // headerHeight: 0,
            // headerPosition: new Animated.Value(0),
            scrollY: new Animated.Value(0),
            // oldOffset: 0,
            tabs: {
                index: 0,
                routes: [columns.GRID, columns.LIST],
            },
        };
    }

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 300],
            outputRange: [0, -300],
            extrapolate: 'clamp',
        });
        return (
            <View
                style={{
                    width: '100%',
                    height: '100%',
                }}>
                <Animated.View
                    onLayout={({ nativeEvent }) => {
                        this.headerHeight = Math.floor(
                            nativeEvent.layout.height
                        );
                    }}
                    style={{
                        transform: [
                            {
                                translateY: headerHeight,
                            },
                        ],
                        width: '100%',
                    }}>
                    {this.renderHeader()}
                </Animated.View>

                <Animated.View
                    style={{
                        width: '100%',
                        height: '100%',

                        transform: [
                            {
                                translateY: headerHeight,
                            },
                        ],
                    }}>
                    {this.renderTabs()}
                </Animated.View>
            </View>
        );
    }

    renderHeader() {
        return (
            <View style={{ height: 300, borderWidth: 1, borderColor: 'blue' }}>
                <Text>{JSON.stringify(this.state, null, 4)}</Text>
            </View>
        );
    }

    renderTabs() {
        return (
            <TabView
                timingConfig={{ duration: 10 }}
                swipeEnabled={false}
                navigationState={this.state.tabs}
                renderScene={props => this.renderScene(props)}
                onIndexChange={index => this.changeColumn(index)}
                initialLayout={{ width: Dimensions.get('window').width }}
                style={{ height: Dimensions.get('window').height - 180 }}
            />
        );
    }

    changeColumn(index) {
        const tabs = { ...this.state.tabs, index };
        this.state.scrollY.setValue(this.headerHeight);
        this.setState({ tabs });
    }

    renderScene({ route }) {
        let Component = componentsByColumn[route.key];
        return !Component ? null : (
            <Component
                onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                y: this.state.scrollY,
                            },
                        },
                    },
                ])}
                scrollEventThrottle={16}
            />
        );
    }
}
