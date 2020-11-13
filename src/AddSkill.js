import Axios from "axios";
import { useState } from "react";

const { Label, Input, Form, Button, Error } = require("./styles/form-elements");



function AddSkill({id}, onSuccess) {

    const [skill, setSkill] = useState("");
    const [error, setError] = useState("");


    const formSubmission = async (e) => {
        e.preventDefault();

        try {
            const result = await Axios.patch(
                "http://localhost:5000/api/wilders",
                {
                    _id: id,
                    // skills: [skill],
                    skills:[{ title: skill, votes: 0}]
                }
            );
            if(result.data.success){
                setError('');
                setSkill('');
                onSuccess({skills:[{title:skill, votes: 0}]});
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
        <Form onSubmit={formSubmission}>
            <Label>Nom du Skill</Label>
            <Input 
                id="skill-input"
                type="text"
                placeholder="Skill"
                value= {skill}
                onChange= {(e) => setSkill(e.target.value)}
            />
            <Button>OK</Button>
            {error && <Error>{error}</Error>}
        </Form>
    )
}

export default AddSkill;