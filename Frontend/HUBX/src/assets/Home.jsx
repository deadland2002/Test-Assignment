import React from 'react'
import { useEffect, useState } from 'react'
import '../App.css'
import { Login } from './Login'
import { SignUp } from './SignUp'
import { Account } from './Account'
import axios from 'axios';

var f = true;


const Home = () => {
    const [status, Setstatus] = useState(false);
    const [user, Setuser] = useState("");

    useEffect(() => {
        if (f) {
            async function fetchdata() {
                const userObject = {
                    session: "OK"
                };

                var obj;

                const result = await axios.post('http://localhost:4000/user/sign-in', userObject)
                    .then((res) => { obj = res.data }).catch((error) => { console.log(error) });

                if (obj.status == "OK") {
                    Setstatus(true);
                    Setuser(obj.data);
                }


            }
            f = false;
            fetchdata();
        }

    }, []);


    return (
        <div className='home'>
            <div>
                {status ? <Account name={user} /> : <Login />}
            </div>
        </div>
    )
}

export default Home