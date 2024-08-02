import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category() {

    const [categoryList, setCategoryList] = useState([]);
    const router = useRouter();
    useEffect(() => {
        getCategoryList();
    }, []);
    const getCategoryList = async () => {
        setCategoryList([]);
        const q = query(collection(db, "Category"));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setCategoryList(prev => [...prev, doc.data()]);
        });
    }

  return (
    <View>
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          marginTop: 10,
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
          Category
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
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{marginLeft: 20}}
        renderItem={({item, index}) => (
            <CategoryItem category = {item}
            key={index}
            onCategoryPress={(category) => router.push(`/businesslist/${item.name}`)}/>
        )}/>
    </View>
  );
}
