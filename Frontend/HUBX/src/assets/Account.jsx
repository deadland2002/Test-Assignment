import React from 'react'
import { useState } from 'react'
import CloudinaryUploadWidget from './CloudinaryUploadWidget'
import '../App.css'
import axios from 'axios';
import { Link } from 'react-router-dom';






export const Account = (props) => {


  const temp = {
    title: "",
    desc: ""
  }

  const [Content, SetContent] = useState(temp);
  const [spanerror, Setspanerror] = useState("");
  const [spansuccess, Setspansuccess] = useState("");




  const handlechange = (e) => {
    const { name, value } = e.target;
    SetContent({ ...Content, [name]: value });
  }





  async function submit(url , title , desc){

    var obj;

    const p = await axios.post('http://localhost:4000/user/upload-img', {url,title,desc})
          .then((res) => { obj = res.data }).catch((error) => { console.log(error) });
    
    if(obj.status=="OK"){
      Setspansuccess("Submitted");
    }
  }
  
  
  
  
  
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(e.target.url.value);
    console.log(e.target.title.value);
    console.log(e.target.desc.value);

    if((e.target.url.value).length <=1){
        Setspanerror("Image not selected")
    }else if((e.target.title.value).length <=1){
      Setspanerror("Title empty")
    }else if((e.target.desc.value).length <=1){
      Setspanerror("Desc empty")
    }else{
      Setspanerror("")
      submit(e.target.url.value,e.target.title.value,e.target.desc.value);
    }
  }

  return (<>
    <div className='top'><h1>Hi {props.name}</h1><Link to="/ViewAll">View All Images</Link></div>
    <div>
      <form onSubmit={handlesubmit} className="upload-card">
        <div>
          <span>Title</span>
          <input type="text" name="title" onChange={handlechange} />
        </div>
        <div>
          <span>Description</span>
          <input type="text" name="desc" onChange={handlechange} />
        </div>
        <div>
          <img id="uploadedimage" src="" className='img-upload'></img>
        </div>
        <div>
          <input type="text" name="url" id="urlimg" className='disable' />
        </div>
        <div>
          <CloudinaryUploadWidget />
        </div>
        <span className='invalid'>{spanerror}</span>
        <span className='success'>{spansuccess}</span>
        <button>Submit</button>
      </form>
    </div>
  </>
  )
}
