import { useLocation, useNavigate } from "react-router-dom"

import './CoursePage.css';

export const ResultsPage = () => {
    const {state} = useLocation();

    const results = state.results;

    return(
        <div>
            <table style={{ margin: 'auto'}} className="course-page">
                <tr>
                {Object.keys(results[0]).map(res => (
                    <th>{res}</th>
                ))}
                </tr>
                    {results.map(res => (
                        <tr>
                            {Object.keys(res).map(res2 => (
                                <td>{res[res2]}</td>
                            ))}
                        </tr>
                    ))}
            </table>
        </div>
    )

}