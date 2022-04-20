import { useLocation, useNavigate } from "react-router-dom"

import './CoursePage.css';

export const ResultsPage = () => {
    const {state} = useLocation();

    const results = state.results;

    return(
        <div>
            <table style={{ margin: 'auto'}} className="course-page">
                 <tr>
                    <th>{Object.keys(results[0])[0]}</th>
                    <th>{Object.keys(results[0])[1]}</th>
                    <th>{Object.keys(results[0])[2]}</th>
                    <th>{Object.keys(results[0])[3]}</th>
                 </tr>
                    {results.map(res => (
                        // make sure naming of these keys is the same as backend
                        // will say undefined otherwise
                        <tr>
                            <td>{res[Object.keys(res)[0]]}</td>
                            <td>{res[Object.keys(res)[1]]}</td>
                            <td>{res[Object.keys(res)[2]]}</td>
                            <td>{res[Object.keys(res)[3]]}</td>
                        </tr>
                    ))}
            </table>
        </div>
    )

}