//rsc
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import About from "./screen/about";
import CatProfile from "./screen/cat.profile";
import CatRegistration from "./screen/cat.registration";
import Login from "./screen/login";
import Main from "./screen/main";
import ProductDetail from "./screen/product.detail";
import ProductList from "./screen/product.list";
import ReviewRegistration from "./screen/review.registration";
import Search from "./screen/search";
import UserProfile from "./screen/user.profile";
import UserRegistration from "./screen/user.registration";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/about' component={About}/>
                <Route exact path='/catprofile' component={CatProfile}/>
                <Route exact path='/catregistration' component={CatRegistration}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/' component={Main}/>
                <Route
                    exact
                    path='/productdetail/:productName'
                    component={ProductDetail}
                />
                <Route exact path='/productlist' component={ProductList}/>
                <Route
                    exact
                    path='/reviewregistration/:productName'
                    component={ReviewRegistration}
                />
                <Route exact path='/search' component={Search}/>
                <Route exact path='/userprofile' component={UserProfile}/>
                <Route exact path='/userregistration' component={UserRegistration}/>
            </Switch>
        </Router>
    );
};

export default App;
