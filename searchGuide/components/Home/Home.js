import React from 'react';
import { View, ScrollView,Text } from 'react-native';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../SearchBar/SearchBar';
import SearchCard from '../SearchCard/SearchCard';
import PromptSearch from '../PromptSearch/PromptSearch'


const Home = ({searchResults}) => {
    return(
        <View style={{flex: 1, backgroundColor:'#eee', margin:0,padding:0}}>
            <SearchBar />
            <ScrollView style={{marginBottom:10}}>
            {searchResults.length ? ( searchResults.map((searchResult, index) => (
                <SearchCard 
                key={index} 
                title={searchResult.title} 
                content={searchResult.passage} 
                url={searchResult.url} 
                metric={Math.round(searchResult.confidence * 100)} 
                site={searchResult.site}
                />))) : <PromptSearch />}
            </ScrollView>
        </View>   
    )
}

const HomeContainer = ({searchResults}) => {
    return(<Home searchResults={searchResults} />)
}

HomeContainer.navigationOptions={
    title:'검색',
    tabBarIcon: ({tintColor}) => (<Icon name="search"  color={tintColor} style={{marginLeft:2}} size={20} />),
}

export default connect(
    ({search})=>({
        searchResults:search.result.return_data.searchResults
    })
)(HomeContainer);