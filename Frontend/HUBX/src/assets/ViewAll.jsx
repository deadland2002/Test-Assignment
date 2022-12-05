import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const ViewAll = () => {
    const [Data,Setdata] = useState([]);
    
    useEffect(()=>{
        async function vals(){

            var obj;
        
            const p = await axios.post('http://localhost:4000/user/all-img')
                  .then((res) => { obj = res.data }).catch((error) => { console.log(error) });
            
            if(obj.status=="OK"){
              Setdata(obj.data); 
            }
          }
          vals();
    },[]);

    const handleview = (e)=>{
        viewinc(e.target.value);
    }
    async function viewinc(url){
        var obj;
        console.log(url);
        const p = await axios.post('http://localhost:4000/user/image-counter',{url})
                  .then((res) => { obj = res.data }).catch((error) => { console.log(error) });
        document.getElementById(url).style.display="block";
        document.getElementById(url+"-btn").style.pointerEvents="none";
    }

  return (
    <div className="cardholder-all">
      {Data.map((user) => (
        <div className="card-all" key={user._id}>
            {user.title}
            <br />
            {user.description}
            <br />
            views : {user.views}
            <br />
            <img src={user.url} alt="" id={user.url} className='allimg'/>
            <br />
            <button onClick={handleview} value={user.url} id={user.url+"-btn"}> View Image </button>
        </div>
      ))}
    </div>
  )
}

export default ViewAll