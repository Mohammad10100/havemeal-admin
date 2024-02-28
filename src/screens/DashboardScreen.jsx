import { Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const global = require('../css/css')

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default function DashboardScreen({navigation}) {
    const currentDate = new Date();
    // Get various date components
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'short' }); // Month is zero-indexed, so add 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.innerContainer]}>
                <View>
                    <Text style={[global.textBlack, global.heading1, styles.heading]}>Dashboard</Text>
                    <Text>{`${month} ${day},${year}`}</Text>
                </View>
                <View>
                    <Text>Filter</Text>
                </View>

                <ScrollView>

                    <View style={[styles.cardViewOuter]}>
                        <View style={[global.textBlack, global.heading1, styles.cardViewInner]}>
                            <View style={[styles.cardViewIcon]} >
                                <Text>Icon</Text>
                            </View>
                            <Text style={[styles.amount]} >Rs 10000</Text>
                        </View>
                        <Text style={[global.textBlack, global.heading1, styles.cardViewOuterText]} >Revenue's</Text>
                    </View>

                    <View style={[styles.cardViewOuter, styles.twinCard]}>
                        <View style={[global.textBlack, global.heading1, styles.cardViewInner]}>
                            <View style={[global.textBlack, global.heading1, styles.cardViewIcon]} >
                                <Text>Icon</Text>
                            </View>
                            <Text style={[styles.amount]} >Rs 10000</Text>
                        </View>
                        <Text style={[global.textBlack, global.heading1, styles.cardViewOuterText]} >App Users</Text>
                    </View>
                    <View style={[styles.cardViewOuter, styles.twinCard]}>
                        <View style={[global.textBlack, global.heading1, styles.cardViewInner]}>
                            <View style={[global.textBlack, global.heading1, styles.cardViewIcon]} >
                                <Text>Icon</Text>
                            </View>
                            <Text style={[styles.amount]} >Rs 10000</Text>
                        </View>
                        <Text style={[global.textBlack, global.heading1, styles.cardViewOuterText]} >Orders</Text>
                    </View>
                    <View style={[styles.cardViewOuter, styles.twinCard]}>
                        <View style={[global.textBlack, global.heading1, styles.cardViewInner]}>
                            <View style={[global.textBlack, global.heading1, styles.cardViewIcon]} >
                                <Text>Icon</Text>
                            </View>
                            <Text style={[styles.amount]} >700</Text>
                        </View>
                        <Text style={[global.textBlack, global.heading1, styles.cardViewOuterText]} >Subscribtions</Text>
                    </View>
                    <Pressable onPress={()=>{
                        navigation.push('Category')
                    }}>
                    <View style={[styles.cardViewOuter, styles.twinCard]}>
                        <View style={[global.textBlack, global.heading1, styles.cardViewInner]}>
                            <View style={[global.textBlack, global.heading1, styles.cardViewIcon]} >
                                <Text>Icon</Text>
                            </View>
                            <Text style={[styles.amount]} >30</Text>
                        </View>
                        <Text style={[global.textBlack, global.heading1, styles.cardViewOuterText]} >Categories</Text>
                    </View>
                    </Pressable>
                    <View style={[styles.cardViewOuter, styles.twinCard]}>
                        <View style={[global.textBlack, global.heading1, styles.cardViewInner]}>
                            <View style={[global.textBlack, global.heading1, styles.cardViewIcon]} >
                                <Text>Icon</Text>
                            </View>
                            <Text style={[styles.amount]} >500</Text>
                        </View>
                        <Text style={[global.textBlack, global.heading1, styles.cardViewOuterText]} >Products</Text>
                    </View>
                    <View style={[styles.cardViewOuter, styles.twinCard]}>
                        <View style={[global.textBlack, global.heading1, styles.cardViewInner]}>
                            <View style={[global.textBlack, global.heading1, styles.cardViewIcon]} >
                                <Text>Icon</Text>
                            </View>
                            <Text style={[styles.amount]} >23</Text>
                        </View>
                        <Text style={[global.textBlack, global.heading1, styles.cardViewOuterText]} >Cities</Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100 * vh,
        backgroundColor: '#D8BFD8',
        backgroundColor: '#f2dcf2',
    },
    innerContainer: {
        padding: 5 * vw,
    },
    cardViewOuter: {
        marginVertical: 10,
        backgroundColor: global.baseColor,
        borderRadius: 2 * vw
    },
    cardViewOuterText: {
        color: 'white',
    },
    cardViewInner: {
        backgroundColor: 'white',
        borderBottomRightRadius: 5 * vw,
        marginRight: 5 * vw,
        justifyContent: 'center',
        // alignItems:'center',
        textAlign: 'center'
    },
    cardViewInnerText: {
        color: 'white',
    },
    cardViewIcon: {
        backgroundColor: global.baseColor,
        // backgroundColor: '#f5bfd5',
        width: 10 * vw,
        height: 10 * vw,
        borderRadius: 1 * vw,
        position: 'absolute',
        top: 0,
        // borderBottomRightRadius:5*vw, 
        // marginRight:5*vw
    },
    twinCardContainer: {
        width: '100%',
        flexDirection: 'row',

    },
    twinCard: {
        // flex:1,
        // width:'50%',
        // backgroundColor:'green'
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 14
    }
})