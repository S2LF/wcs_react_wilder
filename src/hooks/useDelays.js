const { useEffect, useState } = require("react");

const useDelay = (ms) => {

    const [delayed, setDelayed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {setDelayed(false)}, 500)
        
        return function cleanup(){
            clearTimeout(timer);
        }
    }, [delayed, ms]);
    
    return [delayed, setDelayed];
}

export default useDelay;