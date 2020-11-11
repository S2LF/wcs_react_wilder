import { useState } from "react";
import axios from "axios";
import useDelay from "./useDelays";

function useCreateWilder(onSuccess) {

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [delayed, setDelayed] = useDelay(500);

    const formSubmission = async (e) => {
        e.preventDefault();
        try {
            setDelayed(true);
            setLoading(true);
            const result = await axios.post(
                "http://localhost:5000/api/wilders",
                {
                    name,
                    city,
                }
            );
            setLoading(false);
            if (result.data.success) {
            setError("");
            setCity("");
            setName("");
            onSuccess(result.data.result);
            }
        } catch (error) {
            setLoading(false);
            if (error.response) {
            setError(error.response.data.message);
            } else {
            setError(error.message);
            }
        }
    }

    return {
        inputCity: {
            value: city,
            onChange: (e) => setCity(e.target.value),
        },
        inputName: {
            value: name,
            onChange: (e) => setName(e.target.value),
        },
        formSubmission,
        loading,
        delayed,
        error,
    };
}
export default useCreateWilder;