import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import AppContext from "../components/AppContext";

export const LoginInPage = () => {
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');
    const [incorrect, setInc] = useState('');
    const navigate = useNavigate();

    // creates a log in for the user
    const handleLogin = async () => {
        if (username === '' || password === '') {
            return
        }

        // store username and password in json
        let jsonData = {
            "username": username,
            "password": password
        }

        // get all user logins
        let all_user_infos = [];
        await axios.get('/api/userinfos/')
            .then(res => {
                console.log(res.data);
                all_user_infos = res.data;
            }).catch(err => console.log(err));

        // find username in database
        let exists = false
        let nav = false
        for (let index = 0; index < all_user_infos.length; ++index) {
            let line = all_user_infos[index]
            if (line.username == username) {
                exists = true;

                // check password
                if (line.password == password) {
                    nav = true;
                }
                break;
            }
        }

        // if username does not exist make one
        if (!exists) {
            await axios.post('api/userinfos/', jsonData).catch(err => console.log(err));
            nav = true;
        }

        // navigate to search
        if (nav) {
            navigate('/search', {
            state: {
                user_input: {
                    'id': 0,
                    'username': username,
                    'interests': '',
                    'avg_gpa': 0.00,
                    'fav_professor': '',
                    'course_req': ''
                }
            }
        })
        } else {
            setInc('The password you entered was incorrect');
        }


    }

    return (
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
                <label style={{ marginRight: '5px'}}>Username: </label>
                <input placeholder="Username" onChange={(e) => setUser(e.currentTarget.value)} />
            </div>
            <div style={{ display: 'flex', margin: 'auto', marginBottom: "10px"}}>
                <label style={{ marginRight: '5px'}}>Password: </label>
                <input placeholder="Password" onChange={(e) => setPass(e.currentTarget.value)} />
            </div>

            <button style={{width: '100px', margin: 'auto'}} onClick={handleLogin}>Login</button>

            <p style={{fontSize : "medium"}}>{incorrect}</p>

        </div>
    )
}
