import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {useState} from "react";


export const CoolQueriesPage = () => {
    const [results, setResults] = useState([]);

    const handleQuery1 = async () => {

        await axios.get('/api/coolq1/')
            .then(res => {
                console.log(res.data);
                setResults(res.data);
            }).catch(err => console.log(err));
    }

    const handleQuery2 = async () => {
        await axios.get('/api/coolq2/')
            .then(res => {
                console.log(res.data);
                setResults(res.data);
            }).catch(err => console.log(err));
    }

    return (
        <div>
            <button style={{width: '100px', margin: 'auto'}} onClick={handleQuery1}>Perform Query 1</button>

            <button style={{width: '100px', margin: 'auto'}} onClick={handleQuery2}>Perform Query 2</button>
        </div>
    )
}