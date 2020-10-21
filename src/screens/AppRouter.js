import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PersonalDetailsComponent from './personal/PersonalDetailsComponent'
import { SCREEN } from '../common/Constant'
import OfficeDetailsComponent from './office/OfficeDetailsComponent'
import NavBarComponent from './navbar/NavBarComponent'
import VerificationComponent from './verification/VerificationComponent'
import Footer from './footer/Footer'
import Success from './success /Success'

function AppRouter() {
    return (
        <Router>
            <NavBarComponent />
            <Switch>
                <Route exact path={SCREEN.PERSONAL} component={PersonalDetailsComponent}></Route>
                <Route exact path={SCREEN.OFFICE} component={OfficeDetailsComponent}></Route>
                <Route exact path={SCREEN.VERIFICATION} component={VerificationComponent}></Route>
                <Route exact path={SCREEN.SUCCESS} component={Success}></Route>
            </Switch>
            <Footer />
        </Router>
    )
}

export default AppRouter
