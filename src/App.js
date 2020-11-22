import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import "./App.css";
import { CardRow, Container, Footer, Header, ShowButton } from "./styles/elements";
import { Input, Success } from "./styles/form-elements";
import Wilder from "./Wilder";
import AddWilder from "./AddWilder";
import { ReactComponent as PlusCircle } from "./icons/add-circle.svg";
import { ReactComponent as MinusCircle } from "./icons/minus-circle.svg";
import AppContext from "./context/AppContext";

const initialState = {
  showAddForm: false,
  successMessage: "",
  wilders: [],
};

const appReducer = (state, action) => {
  switch (action.type){
    case "TOGGLE_SHOW_ADD_FORM":
      return { ...state, showAddForm: !state.showAddForm};
    case "WILDER_ADDED":
      return { 
        ...state,
        showAddForm: false,
        successMessage: `The wilder ${action.newWilder.name} has been successfully added`,
        wilders: [{ ...action.newWilder, justAdded: true }, ...state.wilders],
      };
    case "WILDERS_FETCH_SUCCESS":
      return { ...state, wilders: action.wilders };
    case "UPDATE_WILDER":
      const index = state.wilders.findIndex(
        (wilder) => wilder._id === action.updateWilder._id,
      );
      console.log(action.updateWilder);
      return {
        ...state,
        wilders: [
          ...state.wilders.slice(0, index),
          { ...state.wilders[index], ...action.updateWilder },
          ...state.wilders.slice(index+1),
        ],
      }
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(appReducer, initialState);

  const [filter, setFilter] = useState('');

  const fetchWilders = async () => {
    try {
      const result = await axios("http://localhost:5000/api/wilders");
      dispatch({
        type: "WILDERS_FETCH_SUCCESS",
        wilders: result.data.result
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWilders();
  }, []);

  function filterName(name){
    const found = (name.toLowerCase()).includes(filter.toLowerCase());
    if(found) {
      return found;
    }
  }
  

  return (
    <div className="App">
        <Header>
          <Container>
              <h1>Wilders Book</h1>
          </Container>
        </Header>
        <Container>
          <ShowButton
            onClick={() => dispatch({ type: "TOGGLE_SHOW_ADD_FORM"})}
          >
            {state.showAddForm ? <MinusCircle/> : <PlusCircle/>}
          </ShowButton>
          {state.showAddForm ? (
            <AddWilder
              onSuccess={(newWilder) => { dispatch({ type: "WILDER_ADDED", newWilder })}}
            />
            ) : (
              state.successMessage !== "" && <Success>{state.successMessage}</Success>
            )}
        </Container>
        <Container>
          <h2>Wilder</h2>
          <Input
            placeholder="Filtrer par nom"
            value={filter}
            onChange={(e) => {setFilter(e.target.value)}}
          />
        </Container>
        <CardRow>
          <AppContext.Provider value={dispatch}>
            {state.wilders.filter(wilder => filter === '' || filterName(wilder.name) ).map((wilder) => (
              <Wilder 
                key={wilder._id} 
                {...wilder}
              />
            ))}
          </AppContext.Provider> 
        </CardRow>
        <Container>
          <Footer>
            <p>&copy; 2020 Wild Code School</p>
          </Footer>
        </Container>
    </div>
  );
}

export default App;
