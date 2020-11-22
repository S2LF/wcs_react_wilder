import React, { useContext, useState } from "react";
import blank_profile from "./icons/blank-profile-picture-female.png";
import Skill from "./Skill";
import { Card, List, ShowButton } from "./styles/elements";
import { ReactComponent as MinusCircle } from "./icons/minus-circle.svg";
import { ReactComponent as PlusCircle } from "./icons/add-circle.svg";
import AddSkill from "./AddSkill";
import { Success } from "./styles/form-elements";
import AppContext from "./context/AppContext";


function Wilder({ _id, city, justAdded, name, skills }) {

  const dispatch = useContext(AppContext);

  const [successMessage, setSuccessMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <Card newCard={justAdded}>
      <img src={blank_profile} alt={`${name} Profile`} />
      <h3>{name}</h3>
      <h4>City</h4>
      <p>{city}</p>
      <h4>Wild Skills</h4>
      <List>
        {skills.map((skill) => (
          <Skill key={skill._id} wilder_id={_id} {...skill}
          onSuccess={(result) => {
            dispatch({
              type: 'UPDATE_WILDER',
              updateWilder: result,
            })
          }} />
        ))}
      </List>
        <ShowButton onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? <MinusCircle/> : <PlusCircle/>}</ShowButton>
      { showAddForm ? (
        <AddSkill 
        id={_id}
        skills= {skills}
        onSuccess={(result) => {
          setShowAddForm(false);
          setSuccessMessage(`The skill has been successfully added`);
          dispatch({
            type: 'UPDATE_WILDER',
            updateWilder: result,
          })
          // skills = ([{ ...newSkill}, ...skills]);
        }}
        />
      ) : (
        successMessage !== "" && <Success>{successMessage}</Success>
      )}
    </Card>
  );
}

export default Wilder;