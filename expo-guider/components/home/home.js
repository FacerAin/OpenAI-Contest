import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,TouchableOpacity,SectionList } from 'react-native';
import  List  from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';  
import SearchCard from '../searchcard/searchcard'
import styles from './homeStyles';
import { connect } from'react-redux';
//<Icon name="home" style={{margin : 0, padding : 0,}} size={20} color={this.props.activeTintColor} />



class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingstatus: true,
            dataset: this.props.screenProps.return_data,
        }
        
    }
    handleCancel = () =>{
        console.log('handlecancel')
        console.log(this.state)
        this.setState({ratingstatus: false})
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.value !== prevState.dataset){
            console.log('getDerivedStateFromProps')
            return {dataset: nextProps.value}
            
        }
        return null
    }
    
    render() {
        console.log('Render Home')
        console.log(this.state)

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
            {Object.keys(this.state.dataset).length !== 0 ?
             <FlatList
                    data={this.state.dataset.return_data.searchResults}
                    extraData={this.state}
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
                    
                    />: null
                    }
                    
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
let mapStateToProps = (state) => {
    return {
        value : state.processdata.data
    }
}

export default connect(mapStateToProps)(HomeScreen)