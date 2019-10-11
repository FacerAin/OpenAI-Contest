import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import  List  from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchCard from '../searchcard/searchcard'
//<Icon name="home" style={{margin : 0, padding : 0,}} size={20} color={this.props.activeTintColor} />

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title:'초기화면',
        tabBarIcon: 
        <Icon name="home" style={{margin : 0, padding : 0,}} size={20} />,
    }
    constructor(props) {
        super(props);
        this.state = {
            ratingstatus: true,
            searchdataset: this.props.screenProps.return_data.searchResults,
        }
        console.log(this.state.searchdataset)
    }
    handleCancel = e =>{
        console.log('handlecancel')
        this.setState({ratingstatus: false})
    }
    render() {
        return (
            <> 
<View style={styles.container}>
            {this.state.ratingstatus ? 
            <View style={styles.ratingcontainer}>
                        <View style={styles.ratingtext}>
                            <Text style={{color: '#fdfcfc'}}>당신의 검색점수는 %d점 입니다.</Text>
                        </View>
                        <TouchableOpacity style={styles.ratingspec}>
                            <Text style={{color: '#fdfcfc'}}>자세히 보기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={this.handleCancel} style={styles.ratingcancel} onPressOut={() => this.props.navigation}>
                            <Text style={styles.ratingcancelText}>x</Text>
                        </TouchableOpacity>
                    </View>
                    
                    : null
            }
                    <FlatList
                    data={this.state.searchdataset}
                    initialNumToRender={5}
                    onEndReachedThreshold={1}
                    renderItem={({ item }) => {
                        return (
                            <>
                          <SearchCard
                          title={item.title}
                          description={item.passage}
                          url={item.url}/>
                          </>
                        );
                      }}
                    
                    />
                    </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

    ratingcontainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#5f86c4',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },

    ratingtext:{
        padding: 10,
        height: 50,
        flex: 5,
        justifyContent: 'center',
    },

    ratingspec:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        flex: 1.8,
    },

    ratingcancel: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        flex: 1,
    },
    ratingcancelText:{
        fontSize: 20,
        color: 'white',
    },

    ratingpageheader: {
        backgroundColor: 'black'
    },
})