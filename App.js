import { useRef } from 'react';
import { Animated, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#005f23',
	},

    cardWrapper: {
        width: 300,
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        padding: 24,
        backgroundColor: '#fff',
        backfaceVisibility: 'hidden',
    },
    
    cardFront: {
    },

    cardBack: {
        position: 'absolute',
        top: 0,
    },

    cardLogo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },

    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    cardIcon: {
        color: '#005f23',
        marginEnd: 8
    },

    cardText: {
        color: '#005f23',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default function App() {
    let flipValue = 0;
    const flipAnimation = useRef(new Animated.Value(0)).current;

    flipAnimation.addListener(({value}) => { flipValue = value });

    const flipToFrontStyle = {
        transform: [{ 
            rotateY: flipAnimation.interpolate({
                inputRange: [0, 180],
                outputRange: ['0deg', '180deg'],
            }) 
        }]
    };

    const flipToBackStyle = {
        transform: [{ 
            rotateY: flipAnimation.interpolate({
                inputRange: [0, 180],
                outputRange: ['180deg', '360deg'],
            }) 
        }]
    };

    const flipToFront = () => {
        Animated.timing(flipAnimation, {
            toValue: 180,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const flipToBack = () => {
        Animated.timing(flipAnimation, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

	return (
		<SafeAreaView style={styles.container}>
            <Pressable onPress={() => flipValue > 90 ? flipToBack() : flipToFront()}>
                {/* Front View */}
                <Animated.View style={[styles.cardWrapper, styles.cardFront, flipToBackStyle]}>
                    <Image style={styles.cardLogo} source={require('./assets/carlsberg-logo.png')}></Image>
                </Animated.View>
                {/* Back View */}
                <Animated.View style={[styles.cardWrapper, styles.cardBack, flipToFrontStyle]}>
                    <View style={styles.cardInfo}>
                        <FontAwesomeIcon style={styles.cardIcon} icon={ faPhone } />
                        <Text style={styles.cardText}>(+45) 3327 3300</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <FontAwesomeIcon style={styles.cardIcon} icon={ faEnvelope } />
                        <Text style={styles.cardText}>contact@carlsberg.com</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <FontAwesomeIcon style={styles.cardIcon} icon={ faGlobe } />
                        <Text style={styles.cardText}>carlsberggroup.com</Text>
                    </View>
                </Animated.View>
            </Pressable>
		</SafeAreaView>
	);
};