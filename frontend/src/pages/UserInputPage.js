import {useState} from "react"
import { useNavigate } from "react-router-dom";

const fakeCourses = [
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
]

export const UserInputPage = () => {

    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [interests, setInterests] = useState('');
    const [avgGpa, setAvgGpa] = useState('');
    const [favoriteProfessor, setFavoriteProfessor] = useState('');
    const [courseReq, setCourseReq] = useState('');

    const navigate = useNavigate();

    const handleSearch = () => {
        const data = {
            id,
            username,
            interests,
            avgGpa,
            favoriteProfessor,
            courseReq
        };

        console.log(data);

        // Make api call

        navigate('/courses', { state: {
            courses: fakeCourses
        } })
    }

    return (
        //box
        <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                width: '40%', 
                margin: 'auto', 
                marginTop: '10vh',
                padding: '20px',
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
            }}> 
            <div style={{ display: 'flex', margin: 'auto', marginBottom: "10px"}}>
                <label style={{ marginRight: '5px'}}>Id: </label>
                <input onChange={(e) => setId(e.currentTarget.value)} />
            </div>
            <div style={{ display: 'flex', margin: 'auto', marginBottom: "10px"}}>
                <label style={{ marginRight: '5px'}}>Username: </label>
                <input onChange={(e) => setUsername(e.currentTarget.value)} />
            </div>
            <div style={{ display: 'flex', margin: 'auto', marginBottom: "10px"}}>
                <label style={{ marginRight: '5px'}}>Interests: </label>
                <input onChange={(e) => setInterests(e.currentTarget.value)} />
            </div>
            <div style={{ display: 'flex', margin: 'auto', marginBottom: "10px"}}>
                <label style={{ marginRight: '5px'}}>Favorite Professor: </label>
                <input onChange={(e) => setFavoriteProfessor(e.currentTarget.value)} />
            </div>
            <div style={{ display: 'flex', margin: 'auto', marginBottom: "10px"}}>
                <label style={{ marginRight: '5px'}}>Avg GPA: </label>
                <input onChange={(e) => setAvgGpa(e.currentTarget.value)} />
            </div>
            <div style={{ display: 'flex', margin: 'auto', marginBottom: "10px"}}>
                <label style={{ marginRight: '5px'}}>Course Requirements: </label>
                <input onChange={(e) => setCourseReq(e.currentTarget.value)} />
            </div>

            <button style={{width: '100px', margin: 'auto'}} onClick={handleSearch}>Search</button>

        </div>
    )
}