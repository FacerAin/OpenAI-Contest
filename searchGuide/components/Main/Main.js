import React from 'react';
import AppTabContainer from '../AppTabContainer/AppTabContainer';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';

const Main = ({ isLoading}) => {
    return (
        <>
        { isLoading && (<Loading />) } 
        <AppTabContainer />
        </>
    )
}

const MainContainer = ({isLoading}) => {
    return(<Main isLoading={isLoading} />)
}
  
export default connect(
    ({search})=>({isLoading:search.isLoading})
)(MainContainer);