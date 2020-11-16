import React, { useState } from "react";
import Proptypes from "prop-types";
import { Badge } from "./styles/elements";
import Axios from "axios";

function Skill({_id, title, votes, wilder_id, onSuccess }) {

  const [ everVoted, setEverVoted] = useState(false);
  const [ newVotes, setNewVotes ] = useState(votes);
  const [ error, setError ] = useState("");

  const addVotes = () => {
    
    if(!everVoted || newVotes === 0){
      let add = newVotes+1
      setNewVotes(add);
      setEverVoted(true);
      updateVote( _id, wilder_id, add);
    } else {
      let sub = newVotes-1
      setNewVotes(sub);
      setEverVoted(false);
      updateVote( _id, wilder_id, sub);
    }
  };

  const updateVote = async(id, wilder_id, nbVotes ) => {
    try {
      const result = await Axios.patch(
          "http://localhost:5000/api/wilders/skills/votes",
          {
            wilder_id: wilder_id,
            _id: id,
            votes: nbVotes
          }
      );
      if(result.data.success){
        setError('');
        onSuccess(result.data.result)
        console.log(result.data.result)
      }
    } catch (error){
      if(error.response){
        setError(error.response.data.message)
      } else {
        setError(error.message);
      }
    }
  }


  return (
    <li onClick={() => addVotes()}>
      {title}&nbsp;
      <Badge votes={votes}>{votes}</Badge>
    </li>
  );
}

Skill.propTypes = {
  title: Proptypes.string.isRequired,
  votes: Proptypes.number.isRequired,
};

export default Skill;