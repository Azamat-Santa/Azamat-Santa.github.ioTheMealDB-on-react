import React, { useState } from 'react'
import { Route, Switch,  Redirect } from "react-router-dom";
import Datail from './componets/Datail/Datail';
import AbouteMeal from './componets/AbouteMeal/AbouteMeal';
import Header from './componets/Header/header';
import { getMealByNameApi } from './config/index'
import SearchOutput from './componets/SearchOutput/SearchOutput'
import Contact from './pages/Contact/Contact';
import Favorite from './pages/Favorite/Favorite';
import Home from './pages/Home/Home';

export default function App() {

  const [name, setName] = useState('')
  const [dataSearch, setDataSearch] = useState('')
  
  const getMealByName = async (event) => {
    event.preventDefault()
    let req = await fetch(getMealByNameApi + name)
    let resp = await req.json()
    setDataSearch(resp.meals)
    setName('')
  }
  const SearchOutputFunc= function(props) {
    return (<SearchOutput {...props} data={dataSearch}  />);
};
  return (
   <>

      <Header
        name={name}
        changeName={setName}
        send={getMealByName}
      />

<Switch>
        <Route  path="/" exact component={Home} />
        <Route path="/categorieInfo/:categorieName"  component={Datail} />
        <Route  path="/abouteMeal/:abouteMeal"  component={AbouteMeal} />
        <Route  path="/favorite/"  component={Favorite} />
        <Route path="/searchOutput/" render={SearchOutputFunc} />
        <Route  path="/contact/"  render={Contact} />
        <Redirect to="/" exact component={Home}/>
      </Switch>
      
  </>

  )
}