import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import  List  from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';  
import SearchCard from '../searchcard/searchcard'
import styles from './homeStyles';
//<Icon name="home" style={{margin : 0, padding : 0,}} size={20} color={this.props.activeTintColor} />



export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingstatus: true,
            searchdataset: this.props.screenProps.return_data.searchResults,
        }
        console.log('render App')
    }
    handleCancel = () =>{
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
                        <TouchableOpacity style={styles.ratingspec} onPressOut={() => this.props.navigation.navigate('Rate')}>
                            <Text style={{color: '#fdfcfc'}}>자세히 보기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={this.handleCancel} style={styles.ratingcancel}>
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

HomeScreen.navigationOptions={
    title:'초기화면',
    tabBarIcon:
    <Icon name="home" style={{margin : 0, padding : 0,color:"#112d4e" }} size={20} />,
}

