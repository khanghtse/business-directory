import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig';
import PopularBusinessCard from './PopularBusinessCard';

export default function PopularBusiness() {

    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        getBusinessList();
    }, []);
    const getBusinessList = async () => {
        setBusinessList([]);
        const q = query(collection(db, "BusinessList"), limit(10));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setBusinessList(prev => [...prev, doc.data()]);
        });
    }

  return (
    <View>
      <View
        style={{
          paddingLeft: 20,
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            paddingLeft: 20,
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Popular Business
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: "outfit-medium",
          }}
        >
          View All
        </Text>
      </View>

      <FlatList
        data={businessList}
        horizontal={true}
        showsVerticalScrollIndicator={false} // Remove vertical scroll indicator
        renderItem={({item, index}) => (
            <PopularBusinessCard business = {item} key={index}/>
        )}/>
    </View>
  )
}