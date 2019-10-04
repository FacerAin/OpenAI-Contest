import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SearchBar  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        search: '',
      }
  }
  updateSearch = search => {
    this.setState({ search });
  }

  render() {
    const { search } = this.state;
      return (
          <>
                <SearchBar
                placeholder="검색"
                onChangeText={this.updateSearch}
                value={search}
                
              />
              <View style={styles.container}>
              <View style={styles.ratingcontainer}>
                  <View style={styles.ratingtext}>
                      <Text>당신의 검색점수는 %d점 입니다.</Text>
                  </View>
                  <View style={styles.ratingspec}>
                      <Text>자세히 보기</Text>
                  </View>
                  <View style={styles.ratingcancel}>
                      <Text>X</Text>
                  </View>
              </View>
              
           <View style={styles.cardcontainer}>
               <View style={styles.cardheader}>
                   <View style={styles.cardlogo}></View>
                   <View style={styles.cardtitle}>
                   <Text>위키백과</Text>
                   </View>
               </View>
               <View style={styles.cardbody}>
                   <Text style={styles.cardbodytext}>
                   동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
                   </Text>
               </View>
               <View style={styles.cardfooter}>
                   <Text style={styles.cardfooterbt}>바로가기</Text>
               </View>
           </View>


           <View style={styles.cardcontainer}>
               <View style={styles.cardheader}>
                   <View style={styles.cardlogo}></View>
                   <View style={styles.cardtitle}>
                   <Text>위키백과</Text>
                   </View>
               </View>
               <View style={styles.cardbody}>
                   <Text style={styles.cardbodytext}>
                       동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
                   </Text>
               </View>
               <View style={styles.cardfooter}>
                   <Text style={styles.cardfooterbt}>바로가기</Text>
               </View>
           </View>


           
           </View>
           </>
      )
  }
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    cardcontainer:{
        backgroundColor: 'gray',
        height: 200,
        marginTop: 10,
        flexDirection: 'column'
    },
    cardheader:{
        backgroundColor: 'blue',
        flex : 1.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardbody:{
        backgroundColor: 'red',
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardbodytext:{
        padding: 15
    },
    cardfooter:{
        alignItems: 'flex-end',
        backgroundColor: 'green',
        flex: 1,
        justifyContent: 'center'
    },
    cardfooterbt:{
        padding: 10
    },
    cardlogo:{
        backgroundColor: 'yellow',
        padding: 10,
        width: 50,
        height: 50,
        borderRadius:50/2
    },
    cardtitle:{
        backgroundColor: 'purple',
        flex: 4,
        padding: 10,
        justifyContent: 'center'
    },
    cardtext:{

    },

    ratingcontainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ratingtext:{
        padding: 10,
        height: 50,
        flex: 5,
        justifyContent: 'center',
        backgroundColor:'red'
    },
    ratingspec:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        flex: 1.8,
        backgroundColor:'yellow'
    },
    ratingcancel: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        flex: 1,
        backgroundColor:'green'
    },
})

export default App;
