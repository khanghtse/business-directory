import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import {  doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/Intro';

export default function BusinessDetail() {

    const {businessid} = useLocalSearchParams();
    const [business, setBusiness] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getBusinessDetailById();
    }, []);
    const getBusinessDetailById = async () => {
        setLoading(true);
        const docRef = doc(db, "BusinessList", businessid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setBusiness(docSnap.data());
            setLoading(false);
        } else {
            console.log("No such document!");
            setLoading(false);
        }
    }

    return (
        <View>
          {loading ? (
            <ActivityIndicator size={"large"} color={Colors.PRIMARY} style={{ marginTop: '70%' }} />
          ) : (
            <View>
              <Intro business={business} />
            </View>
          )}
          <Text>{businessid}</Text>
        </View>
      );
}