import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

/*const fakeCourses = [
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
    { courseNum: '411', dept: 'CS', description: 'Database Systems', credits: '4' },
]
*/

export const UserInputPage = () => {
    const [inputs, setInputs] = useState([]);

    // fetch the user inputs
    useEffect( () => {
        const fetchData = async () => {
            await axios.get('/api/userinputs/')
            .then(res => {
                setInputs(res.data);
            }).catch(err => console.log(err));
        }
        fetchData();
    }, []);

    // get current state
    const { state } = useLocation();

    let userInput = {
                'id': 0,
                'username': 'test',
                'interests': '',
                'avg_gpa': 0.00,
                'fav_professor': '',
                'course_req': ''
            };

    // check for undefined state
    if (typeof state === undefined || state === null) {
        if (inputs.length !== 0) {
            userInput = inputs[1]
        }} else {
        userInput = state.user_input
    }

    // set states
    const [id, setId] = useState(userInput.id);
    const [username, setUsername] = useState(userInput.username);
    const [interests, setInterests] = useState(userInput.interests);
    const [avgGpa, setAvgGpa] = useState(userInput.avg_gpa);
    const [favoriteProfessor, setFavoriteProfessor] = useState(userInput.fav_professor);
    const [courseReq, setCourseReq] = useState(userInput.course_req);
    const navigate = useNavigate();

    let data_global = {
            id,
            username,
            interests,
            avgGpa,
            favoriteProfessor,
            courseReq
        };
    let json_global = {
            'id' : id,
            'username' : username,
            'avg_gpa' : avgGpa,
            'course_req' : courseReq,
            'fav_professor' : favoriteProfessor,
            'interests' : interests
        };

    // handles the ability to search for a course
    const handleSearch = async () => {
        const data = data_global;
        const jsonData = json_global;

        let got_course;
        let all_user_inputs;

        // sends a get to the backend, parameters are in sent into params
        // check django views to see how they are used
        // gets courses that have a description containing any interests
        await axios.get('/api/courses/', { params : {containsTerm : interests}})
            .then(res => {
                console.log(res.data);
                got_course = res.data;
            }).catch(err => console.log(err));

        // logs each input into userinput database
        // get all userinputs
        await axios.get('/api/userinputs/')
            .then(res => {
                console.log(res.data);
                all_user_inputs = res.data;
            }).catch(err => console.log(err));

        // check if input already exists with an id
        let hasMatch = false
        for (let index = 0; index < all_user_inputs.length; ++index) {
            let line = all_user_inputs[index]
            if (line.id == id) {
                hasMatch = true;
                break;
            }
        }

        // update userinput with id = 'id' or insert new otherwise
        if (hasMatch) {
            await axios.put(`api/userinputs/${id}/`, jsonData).catch(err => console.log(err));
        } else {
            await axios.post('api/userinputs/', jsonData).catch(err => console.log(err));
        }

        // move to course's page
        navigate('/courses', {
            state: {
                courses: got_course
            }
        })
    }

    // deletes specified id from
    const handleDelete = async () => {
        const data = data_global;
        if (typeof data.id == "number") {
            await axios.delete(`/api/userinputs/${data.id}`).catch(err => console.log(err));
            setId(0);
            setUsername('test');
            setInterests('');
            setAvgGpa(0.00);
            setCourseReq('');
            setFavoriteProfessor('');
        }
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
                <input placeholder={id} onChange={(e) => setId(parseInt(e.currentTarget.value))} />
            </div>
            <div style={{ display: 'flex', margin: 'auto', marginBottom: "10px"}}>
                <label style={{ marginRight: '5px'}}>Username: </label>
                <input placeholder={username} onChange={(e) => setUsername(e.currentTarget.value)} />
            </div>
            <div style={{ display: 'flex', margin: 'auto', marginBottom: "10px"}}>
                <label style={{ marginRight: '5px'}}>Interests: </label>
                <input placeholder={interests} onChange={(e) => setInterests(e.currentTarget.value)} />
            </div>
            <div style={{ display: 'flex', margin: 'auto', marginBottom: "10px"}}>
                <label style={{ marginRight: '5px'}}>Favorite Professor: </label>
                <input placeholder={favoriteProfessor} onChange={(e) => setFavoriteProfessor(e.currentTarget.value)} />
            </div>
            <div style={{ display: 'flex', margin: 'auto', marginBottom: "10px"}}>
                <label style={{ marginRight: '5px'}}>Avg GPA: </label>
                <input placeholder={avgGpa} onChange={(e) => setAvgGpa(e.currentTarget.value)} />
            </div>
            <div style={{ display: 'flex', margin: 'auto', marginBottom: "10px"}}>
                <label style={{ marginRight: '5px'}}>Course Requirements: </label>
                <input placeholder={courseReq} onChange={(e) => setCourseReq(e.currentTarget.value)} />
            </div>

            <button style={{width: '100px', margin: 'auto'}} onClick={handleSearch}>Search</button>

            <button style={{width: '100px', margin: 'auto'}} onClick={handleDelete}>Delete</button>

            <p style={{fontSize : "small"}}>*For multiple interests, separate each by ';'</p>

        </div>
    )
}