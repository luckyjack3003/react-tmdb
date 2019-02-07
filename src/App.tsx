import React, {SFC } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import  UnauthorizedComponent from './routes/UnauthorizedComponent'

const App:SFC<object> = props => (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" component={UnauthorizedComponent} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </BrowserRouter>
)

export default App;
