import React, { Component } from 'react';
import { View, Text,TouchableOpacity,ScrollView,Image } from 'react-native';
import  List  from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';  
import SearchCard from '../searchcard/searchcard'
import styles from './homeStyles';
import { connect } from'react-redux';
import AnimatedLoader from "react-native-animated-loader";
import TestDataset from './test.json'
//<Icon name="home" style={{margin : 0, padding : 0,}} size={20} color={this.props.activeTintColor} />

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingstatus: false,
            dataset: {}
        }
        
    }
    handleCancel = () =>{
        this.setState({ratingstatus: false})
    }
    
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.value !== prevState.dataset){
            return {dataset: nextProps.value, ratingstatus: true}
        }
        return null
    }

   renderItem = {}
    render() {
        console.log('Render Home!!!')
        return (
            <> 
            <View style={styles.container}>
            <AnimatedLoader
            visible= {this.props.isLoading}
            source={require('./loading.json')}
            overlayColor="rgba(50,50,50,0.9)"
            animationStyle={styles.loadingAnimation}
            speed={1}
          />
                { this.state.ratingstatus ? 
                <View style={styles.ratingcontainer}>
                            <View style={styles.ratingtext}>
                                <Text style={{color: '#fdfcfc'}}>당신의 검색 점수가 궁금 하신가요?</Text>
                            </View>
                            <TouchableOpacity style={styles.ratingspec} onPressOut={() => {this.props.navigation.navigate('Rate')}}>
                                <Text style={{color: '#fdfcfc'}}>자세히 보기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut={this.handleCancel} style={styles.ratingcancel}>
                                <Text style={styles.ratingcancelText}>x</Text>
                            </TouchableOpacity>
                        </View>
                        : null
                }
                <ScrollView>
                {(Object.keys(this.state.dataset).length !== 0 && this.state.dataset.return_code !== -1) ? this.state.dataset.return_data.searchResults.map((item,index) => {
                    return <SearchCard key={index}
                    title={item.title}
                    description={item.passage}
                    url={item.url}
                    confidence={item.confidence}
                    site={item.site}/>
                }) : <View style={styles.emptyContainer}>
                <Text style={styles.empty}>검색을 해주세요!!!!</Text>
                <Image style={styles.HomeLogo} source={require('../img/logo.png')}/>    
            </View>  
                    }     
                    </ScrollView>
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
        value : state.processdata.data,
        isLoading: state.processdata.isLoading
    }
}

export default connect(mapStateToProps)(HomeScreen)