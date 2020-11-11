import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { CardRow, Container, Footer, Header, ShowButton } from "./styles/elements";
import { Success } from "./styles/form-elements";
import Wilder from "./Wilder";
import AddWilder from "./AddWilder";
import { ReactComponent as PlusCircle } from "./icons/add-circle.svg";
import { ReactComponent as MinusCircle } from "./icons/minus-circle.svg";


function App() {

  const [wilders, setWilders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchWilders = async () => {
    try {
      const result = await axios("http://localhost:5000/api/wilders");
      setWilders(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchWilders();
  }, []);
  const closeForm = () => setShowAddForm(false);

  return (
    <div className="App">
        <Header>
          <Container>
              <h1>Wilders Book</h1>
          </Container>
        </Header>
        <Container>
          <ShowButton
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? <MinusCircle/> : <PlusCircle/>}
          </ShowButton>
          {showAddForm ? (

            <AddWilder
            onSuccess={(newWilder) => {
              closeForm();
              setSuccessMessage(`The wilder ${newWilder.name} has been successfully added`);
              setWilders([{ ...newWilder, justAdded: true}, ...wilders]);
            }}
            />
            ) : (
              successMessage !== "" && <Success>{successMessage}</Success>
            )}
        </Container>
        <Container>
          <h2>Wilder</h2>
        </Container>
        <CardRow>
          {wilders.map((wilder) => (
            <Wilder 
              key={wilder._id} 
              {...wilder}
            />
          ))}
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
