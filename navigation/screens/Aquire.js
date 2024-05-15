import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useGlobalState } from './GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const ProgressCard = ({ bookTitle, pagesRead, totalPages, points, onRedeem }) => {
    const [redeemed, setRedeemed] = useState(false);
    const { totalPoints, setTotalPoints } = useGlobalState();
    const progress = pagesRead / totalPages;
    const isCompleted = pagesRead === totalPages;

    const handleRedeem = () => {
        setRedeemed(true);
        onRedeem(points, bookTitle);
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.bookTitle}>{bookTitle}</Text>
                <Text style={styles.pages}>{pagesRead}/{totalPages}</Text>
            </View>
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
            </View>
            {isCompleted && !redeemed && (
                <TouchableOpacity style={styles.redeemButton} onPress={handleRedeem}>
                    <Text style={styles.redeemButtonText}>Redeem Points</Text>
                </TouchableOpacity>
            )}
            {redeemed && (
                <Text style={styles.redeemedText}>Points Redeemed</Text>
            )}
            <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>{points}</Text>
                <MaterialCommunityIcons name="leaf" size={20} color="green" />
            </View>
        </View>
    );
};

const Aquire = () => {
    const { totalPoints, setTotalPoints } = useGlobalState();
    const [redeemModalVisible, setRedeemModalVisible] = useState(false);
    const [redeemedPoints, setRedeemedPoints] = useState(0);
    const [redeemedBook, setRedeemedBook] = useState('');

    const handleRedeemPoints = (points, bookTitle) => {
        setTotalPoints(totalPoints + points);
        setRedeemedPoints(points);
        setRedeemedBook(bookTitle);
        setRedeemModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.totalPointsContainer}>
                <View style={styles.totalPointsView}>
                    <Text style={styles.totalPointsText}>{totalPoints}</Text>
                    <MaterialCommunityIcons name="leaf" size={20} color="green" />
                </View>
            </View>
            <Text style={styles.title}>Challenges</Text>
            <ProgressCard
                bookTitle="Donate 10 Books"
                pagesRead={3}
                totalPages={10}
                points={500}
                onRedeem={handleRedeemPoints}
            />
            <ProgressCard
                bookTitle="Create 3 Wishlists"
                pagesRead={0}
                totalPages={3}
                points={100}
                onRedeem={handleRedeemPoints}
            />
            <ProgressCard
                bookTitle="Use Code: CODESHSH5"
                pagesRead={1}
                totalPages={1}
                points={50}
                onRedeem={handleRedeemPoints}
            />
            <ProgressCard
                bookTitle="Get 5 Books"
                pagesRead={1}
                totalPages={5}
                points={750}
                onRedeem={handleRedeemPoints}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={redeemModalVisible}
                onRequestClose={() => setRedeemModalVisible(!redeemModalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTextPoints}>
                            The Challenge "{redeemedBook}" has been completed! You have earned
                            <Text style={styles.points}> {redeemedPoints} </Text> Points
                            <MaterialCommunityIcons name="leaf" size={20} color="green" />
                        </Text>
                        <LottieView
                            source={require('../../assets/points.json')}
                            autoPlay
                            loop
                            style={styles.lottieStyle}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setRedeemModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F4F8',
    },
    totalPointsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    totalPointsView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalPointsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'darkgreen',
        paddingRight: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'darkgreen',
        marginBottom: 30,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        width: 300,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    pages: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#388E3C',
    },
    progressBarContainer: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#C8E6C9',
        marginVertical: 10,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 5,
        backgroundColor: '#388E3C',
    },
    redeemButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    redeemButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    redeemedText: {
        fontSize: 14,
        color: '#388E3C',
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    pointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    pointsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'darkgreen',
        paddingRight: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTextPoints: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    closeButton: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    closeButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    lottieStyle: {
        width: 100,
        height: 100,
    },
    points: {

        color: 'darkgreen',
        fontWeight: 'bold',
        // you can add other styling specific to the underlined text if needed
      },
});

export default Aquire;
