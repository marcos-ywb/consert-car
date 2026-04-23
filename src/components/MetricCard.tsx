import React, { useState, useRef, useEffect } from "react";
import {
    View, Text, TouchableOpacity, StyleSheet,
    Animated, Dimensions, Platform
} from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PARENT_PADDING = 0;

const data = [
    {
        id: "1",
        title: "Serviços de Hoje",
        value: "12",
        desc: "4 finalizados",
        icon: "🔧"
    },
    {
        id: "2",
        title: "Faturamento Mensal",
        value: "R$ 8.5k",
        desc: "+12% vs mês pass.",
        icon: "💰"
    },
    {
        id: "3",
        title: "Peças em Falta",
        value: "03",
        desc: "Ver estoque",
        icon: "📦"
    },
    {
        id: "4",
        title: "Clientes Ativos",
        value: "47",
        desc: "3 novos esta semana",
        icon: "👥"
    },
];

export default function MetricCard() {
    const [index, setIndex] = useState(0);
    const opacity = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startAutoplay = () => {
        timerRef.current = setInterval(() => {
            next(true);
        }, 2500);
    };

    const resetAutoplay = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        startAutoplay();
    };

    useEffect(() => {
        startAutoplay();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [index]);

    function goTo(nextIndex: number, direction: "left" | "right") {
        const outX = direction === "right" ? -30 : 30;
        const inX = direction === "right" ? 30 : -30;

        Animated.parallel([
            Animated.timing(opacity, { toValue: 0, duration: 120, useNativeDriver: true }),
            Animated.timing(translateX, { toValue: outX, duration: 120, useNativeDriver: true }),
        ]).start(() => {
            setIndex(nextIndex);
            translateX.setValue(inX);
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
                Animated.timing(translateX, { toValue: 0, duration: 180, useNativeDriver: true }),
            ]).start();
        });
    }

    function prev() {
        resetAutoplay();
        const nextIndex = index === 0 ? data.length - 1 : index - 1;
        goTo(nextIndex, "left");
    }

    function next(isAutomatic: boolean = false) {
        if (!isAutomatic) resetAutoplay();
        const nextIndex = index === data.length - 1 ? 0 : index + 1;
        goTo(nextIndex, "right");
    }

    const item = data[index];

    return (
        <View>
            <View style={styles.card}>
                <Animated.View style={[styles.content, { opacity, transform: [{ translateX }] }]}>
                    <Text style={styles.icon}>{item.icon}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.value}>{item.value}</Text>
                    <Text style={styles.desc}>{item.desc}</Text>
                </Animated.View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={prev}
                        style={styles.arrowBtn}
                        activeOpacity={0.7}
                    >
                        <ChevronLeft
                            size={18}
                            color="#FFCC00"
                            strokeWidth={2.5}
                        />
                    </TouchableOpacity>

                    <View style={styles.dots}>
                        {data.map((_, i) => (
                            <View
                                key={i}
                                style={[styles.dot, i === index && styles.dotActive]}
                            />
                        ))}
                    </View>

                    <TouchableOpacity
                        onPress={() => next(false)}
                        style={styles.arrowBtn}
                        activeOpacity={0.7}
                    >
                        <ChevronRight
                            size={18}
                            color="#FFCC00"
                            strokeWidth={2.5}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    /*
    wrapper: {
        paddingHorizontal: PARENT_PADDING,
    },
    */
    card: {
        backgroundColor: "#1E293B",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#334155",
        overflow: "hidden",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.35,
                shadowRadius: 16,
            },
            android: { elevation: 10 },
        }),
    },
    content: {
        padding: 28,
        paddingBottom: 20,
        minHeight: 180,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        fontSize: 28,
        marginBottom: 12,
    },
    title: {
        color: "#FFCC00",
        fontSize: 11,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 1.4,
        marginBottom: 6,
    },
    value: {
        color: "#F8F9FA",
        fontSize: 42,
        fontWeight: "900",
        marginBottom: 4,
    },
    desc: {
        color: "#94A3B8",
        fontSize: 13,
        fontWeight: "500",
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: "#334155",
    },
    arrowBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#334155",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#334155",
    },
    arrowDisabled: {
        opacity: 0.8,
    },
    dots: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: "#334155",
    },
    dotActive: {
        backgroundColor: "#FFCC00",
    },
});
