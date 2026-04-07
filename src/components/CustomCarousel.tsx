import React, { useState, useRef } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    FlatList,
    Animated,
    NativeSyntheticEvent,
    NativeScrollEvent
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PARENT_PADDING = 20;
const CAROUSEL_WIDTH = SCREEN_WIDTH - (PARENT_PADDING * 2);

const data = [
    { id: "1", title: "Serviços de Hoje", value: "12", desc: "4 finalizados" },
    { id: "2", title: "Faturamento Mensal", value: "R$ 8.5k", desc: "+12% vs mês pass." },
    { id: "3", title: "Peças em Falta", value: "03", desc: "Ver estoque" },
];

export default function CustomCarousel() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / CAROUSEL_WIDTH);
        setActiveIndex(index);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                snapToInterval={CAROUSEL_WIDTH}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                onMomentumScrollEnd={onMomentumScrollEnd}
                renderItem={({ item }) => (
                    <View style={[styles.card, { width: CAROUSEL_WIDTH }]}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardValue}>{item.value}</Text>
                        <Text style={styles.cardDesc}>{item.desc}</Text>
                    </View>
                )}
            />

            <View style={styles.pagination}>
                {data.map((_, index) => {

                    const inputRange = [
                        (index - 1) * CAROUSEL_WIDTH,
                        index * CAROUSEL_WIDTH,
                        (index + 1) * CAROUSEL_WIDTH,
                    ];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 20, 8],
                        extrapolate: "clamp",
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: "clamp",
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[styles.dot, { width: dotWidth, opacity }]}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "100%",
    },
    card: {
        backgroundColor: "#1A1C1E",
        borderRadius: 20,
        padding: 20,
        justifyContent: "center",
        height: 150,
    },
    cardTitle: {
        color: "#FFCC00",
        fontSize: 14,
        fontWeight: "600",
        textTransform: "uppercase",
    },
    cardValue: {
        color: "#FFF",
        fontSize: 32,
        fontWeight: "900",
        marginVertical: 4,
    },
    cardDesc: {
        color: "#94A3B8",
        fontSize: 12,
    },
    pagination: {
        flexDirection: "row",
        marginTop: 15,
    },
    dot: {
        height: 6,
        borderRadius: 3,
        backgroundColor: "#1A1C1E",
        marginHorizontal: 3,
    },
});