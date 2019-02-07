import React, {SFC }  from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import  Home from '../components/home/Home'
import  MovieDetail from '../components/home/MovieDetail'

const UnauthorizedComponent:SFC<object> = () => (
    <div className="tmdb-container">
        {/*
    this could be a general layout for all unauthorised components
    */}
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/movie/:id" exact={true} component={MovieDetail} />
            <Redirect to="/" />
        </Switch>
    </div>
)

export default UnauthorizedComponent