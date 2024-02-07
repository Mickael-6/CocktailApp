import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View,Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect} from 'react';
import axios from 'axios'
export default function App() {

  const randomLetter = _ => String.fromCharCode(0|Math.random()*26+97)
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(97);
  const getdata = async () => {
          axios
          .get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?f=${randomLetter(currentPage)}` )
          .then(res =>{
              // setDatas(res.data.drinks)
           setDatas([...datas, ...res.data.drinks])
           
          })
  }

  const renderItem = ({item}) => {
    return(
    <View>
       <Text  style={styles.titleBlock}> {item.strDrink}</Text> 
       <Image
          source={{ uri:item.strDrinkThumb }}
          style={styles.image}
        />
    </View>
    
    )
  }

  const renderLoader = () => {

    return (
      <View>
     <ActivityIndicator size="large" color ="#aaa"/>
   </View>
   
    )
    
  }
  const loadMoreItem = () => {
  setCurrentPage(currentPage + 1)
  }

  useEffect(() => {
    getdata();
    
  }, [currentPage]);

 
  return (
  <FlatList data={datas} 
  renderItem={renderItem} 
  ListFooterComponent={renderLoader}
  onEndReached={loadMoreItem}
  />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleBlock : {
    fontSize: 15,
    fontWeight: "bold" ,
   color: "black",
   marginTop: 50,
    },
    image : {
      width : 150,
      height : 150,
    },
});
