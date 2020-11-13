import React from "react";
import blank_profile from "./icons/blank-profile-picture-female.png";
import Skill from "./Skill";
import { Card, List, ShowButton } from "./styles/elements";
import { ReactComponent as MinusCircle } from "./icons/minus-circle.svg";
import AddSkill from "./AddSkill";


function Wilder({ _id, city, justAdded, name, skills }) {

  return (
    <Card newCard={justAdded}>
      <img src={blank_profile} alt={`${name} Profile`} />
      <h3>{name}</h3>
      <h4>City</h4>
      <p>{city}</p>
      <h4>Wild Skills <ShowButton><MinusCircle/></ShowButton></h4>
      <AddSkill 
        id={_id}
        skills= {skills}
        onSuccess={(newSkill) => {
          // closeForm();
          // setSuccessMessage(`The skill ${newSkill.title} has been successfully added`);
          skills = ([{ ...newSkill}, ...skills]);
        }}/>
      <List>
        {skills.map((skill) => (
          <Skill key={skill._id} {...skill} />
        ))}
      </List>
    </Card>
  );
}

export default Wilder;