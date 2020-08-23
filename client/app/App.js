//rsc
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import CatProfile from './screen/cat.profile';
import CatRegistration from './screen/cat.registration';
import Main from './screen/main';
import ProductDetail from './screen/product.detail';
import ProductList from './screen/product.list';
import ReviewRegistration from './screen/review.registration';
import Signin from './screen/signin';
import UserProfile from './screen/user.profile';
import UserRegistration from './screen/user.registration';

const App = () => {
   return (
      <Router>
         <Switch>
            <Route exact path="/catprofile" component={CatProfile} />
            <Route exact path="/catregistration" component={CatRegistration} />
            <Route exact path="/" component={Main} />
            <Route exact path="/productdetail" component={ProductDetail} />
            <Route exact path="/productlist" component={ProductList} />
            <Route exact path="/reviewregistration" component={ReviewRegistration} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/userprofile" component={UserProfile} />
            <Route exact path="/userregistration" component={UserRegistration} />
         </Switch>
      </Router>
   )
};

export default App;