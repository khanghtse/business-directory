import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../configs/FirebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';

export default function Slider() {
    const [sliderList, setSliderList] = useState([]);

    useEffect(() => {
        getSliderList();
    }, []);

    const getSliderList = async () => {
        setSliderList([]);
        const q = query(collection(db, "Slider"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        setSliderList(data);
    }

    return (
        <View>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 20, paddingLeft: 20, paddingTop: 20, marginBottom: 5 }}>
                #Special for you
            </Text>

            <FlatList
                data={sliderList}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}  
                style={{ paddingLeft: 20 }}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={{ width: 300, height: 150, borderRadius: 15, marginRight: 15 }}
                    />
                )}
                ListEmptyComponent={<Text>No images available</Text>}
            />
        </View>
    )
}
