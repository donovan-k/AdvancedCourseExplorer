import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {useState} from "react";


export const CoolQueriesPage = () => {
    const navigate = useNavigate();

    const handleQuery1 = async () => {
        let query_results;

        await axios.get('/api/coolq1/')
            .then(res => {
                query_results = res.data;
                console.log(query_results);
            }).catch(err => console.log(err));

        console.log(typeof query_results);

        navigate('/results', {
            state: {
                results: query_results
            }
        })
    }

    const handleQuery2 = async () => {
        let query_results;

        await axios.get('/api/coolq2/')
            .then(res => {
                console.log(res.data);
                query_results = res.data;
            }).catch(err => console.log(err));

        navigate('/results', {
            state: {
                results: query_results
            }
        })
    }

    return (
        <div>
            <button style={{width: '100px', margin: 'auto'}} onClick={handleQuery1}>Perform Query 1</button>

            <button style={{width: '100px', margin: 'auto'}} onClick={handleQuery2}>Perform Query 2</button>
        </div>
    )
}