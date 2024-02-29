import { ActivityIndicator, Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
const global = require('../../css/css')

import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'


const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default function CategoryScreen({ navigation }) {
    const [loading, setLoading] = useState(1)
    const [catArray, setCatArray] = useState([])

    const fetchSubLinks = async () => {
        try {
            console.log(categories.SHOW_CATEGORIES);
            const result = await apiConnector('GET', categories.SHOW_CATEGORIES)
            console.log(result.data.data);
            setCatArray(result.data.data)
            setLoading(false)
        } catch (error) {
            console.log('could not fetch categories');
        }
    }

    useEffect(() => {
        fetchSubLinks();
    }, [])

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.innerContainer]}>
                <Text style={[global.textBlack, global.heading1, styles.heading]}>Manage Categories</Text>
                {/* Categories */}
                <ScrollView style={styles.scroll}>
                    {
                        loading? (
                            <View style={styles.activity}>
                                <ActivityIndicator size="large" color="#C73866" />
                            </View>
                        ):
                        catArray.map((category, key) => {
                            return (
                                <Pressable key={key} onPress={() => { navigation.push('CategoryDetails', { id: category._id }) }}>
                                    <View style={[styles.cardViewOuter]}>
                                        <View style={[styles.cardImage]} >
                                            {/* <Image style={[styles.img]} source={require('../images/basketVeg.png')} /> */}
                                        </View>
                                        <View style={[global.textBlack, global.heading1, styles.cardViewInner]}>
                                            <Text style={[styles.name]} >{category?.name}</Text>
                                            <View style={styles.status}>
                                                <Text style={[styles.txt]} >Status:</Text>
                                                <Text style={[styles.statusTxt]} >{category?.status || 'ACTIVE'}</Text>
                                            </View>
                                            <Text style={[styles.txt]} >{category?.place || 'Nashik'}</Text>
                                        </View>
                                        <View style={[styles.arrow]} >
                                            <Text>{">"}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        })
                    }
                </ScrollView>
                <Pressable style={styles.addIcon} onPress={()=>{navigation.push('AddNewCategory')}}>
                    <Text style={styles.addText}>Add New +</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100 * vh,
        backgroundColor: '#D8BFD8',
        // backgroundColor: '#F1F1F1',
        backgroundColor: '#f2dcf2',
    },
    innerContainer: {
        padding: 5 * vw,
    },
    scroll: {
        height: 100 * vh,
        // borderColor:'black',
        // borderWidth:1,
    },
    cardViewOuter: {
        marginVertical: 10,
        padding: '2%',
        backgroundColor: 'white',
        borderRadius: 2 * vw,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 10 * vh,
    },
    cardViewOuterText: {
        color: 'white',
    },
    cardViewInner: {
        backgroundColor: 'white',
        width: '50%',
        flex: 1,
        padding: 5,
        paddingLeft: 15,
        justifyContent: 'center',

    },
    cardViewInnerText: {
        color: 'white',
    },
    cardImage: {
        // maxWidth:'25%',
        height: '90%',
    },
    img: {
        backgroundColor: '#e8e3e3',
        borderRadius: 2 * vw,
        aspectRatio: 1.3,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    statusTxt: {
        fontSize: 15,
        color: '#1DAC10',
        fontWeight: 'bold',

    },
    status: {
        flexDirection: 'row',
    },
    arrow: {
        justifyContent: 'center',
    },
    addIcon: {
        backgroundColor: '#C73866',
        backgroundColor: global.baseColor,
        position: 'absolute',
        bottom: '25%',
        right: '15%',
        padding: 2.5 * vh,
        borderRadius: 10 * vw,
    },
    addText: {
        color: 'white',
        fontWeight: 'bold'
    },
    activity: {
        paddingTop:35*vh
    },
})