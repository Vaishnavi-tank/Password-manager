import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from 'uuid';
const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])
  const getPasswords= async ()=>{
    let req=await fetch("http://localhost:3000/")
    let passwords = await req.json()
      setPasswordArray(JSON.parse(passwords))
  }
  useEffect(() => {
    getPasswords()

  }, [])

  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "text"
    }
    else {
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = "password"
    }
  }
  const savePassword = async () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length >3){
      setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
      // console.log([...passwordArray, form])
      let res= await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({...form,id:uuidv4() }) })
      setForm({ site: "", username: "", password: "" })
      toast('Password saved');

    }
    else{
      toast('Error:Password can not be save')
    }
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const copyText = (text) => {
    toast('Copied to Clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text)
  }
  const editText = (id) => {
    console.log(id)
   setForm({...passwordArray.filter(i=>i.id===id)[0],id:id})
   setPasswordArray(passwordArray.filter(item=>item.id!==id));
  //  localStorage.setItem()
  }
  const deleteText=async (id)=>{
    let c=confirm("Do you really want to delete this?")
    if(c){

      setPasswordArray(passwordArray.filter(item=>item.id!==id));
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      let res= await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form,id }) })
    }
    
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className=" mx-auto bg-purple-300 max-w-4xl m-16 min-h-[77.6vh] ">
        <h1 className='text-center text-2xl'><span className='text-black'>&lt;</span>
          <span className='text-purple-700 text-lg  font-bold '>PassOP</span>
          <span className='text-black'>/&gt;</span></h1>
        <p className='text-purple-600 font-bold text-center'>🫧 Your own password manager 🫧</p>
        <div className='flex flex-col text-white p-4 gap-6  '>
          <input value={form.site} onChange={handleChange} className='rounded-md border-purple-900 border-2 w-full gap- text-black p-2' type="text" name="site" id="" placeholder='Enter Website URL' />
          <div className='flex 
           w-full gap-2 justify-between'>
            <input value={form.username} onChange={handleChange} className='rounded-md w-full border-purple-900 border-2  text-black p-2' type="text" name="username" id="" placeholder='Enter Username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-md w-full border-purple-900 border-2  text-black p-2' type="password" name="password" id="" placeholder='Enter Password' />
              <span className="absolute right-1 top-1 cursor-pointer text-black  text-xl p-1" onClick={showPassword}>
                <img ref={ref}  className="w-6" src="icons/eyecross.png" alt="" />
              </span>
            </div>

          </div>
          <button className='border-purple-800 border-2 w-fit h-10 m-auto flex  rounded-md p-1 bg-purple-500 hover:bg-purple-300' onClick={savePassword}>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#000000"
              style={{ "width": "25px" }}
            >
            </lord-icon>
            <span className=' text-black font-bold '>Save</span></button>
        </div>
        <div className="passwords">
          <h2 className='text-xl font-bold text-center mb-4 text-purple-900 '>Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords</div>}
          {passwordArray.length != 0 && <table className='w-full bg-purple-300'>
            <thead className='bg-purple-500 text-white'>
              <tr>
                <th className='py-2 border-2 border-purple-800'>Site</th>
                <th className='py-2 border-2 border-purple-800'>Username</th>
                <th className='py-2 border-2 border-purple-800'>Password</th>
                <th className='py-2 border-2 border-purple-800'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-center  '>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className=''><a href={item.site} target='_blank'>{item.site}</a>
                    <span className='cursor-pointer'>
                      <lord-icon
                        style={{ "width": "25px", "height": "25px", "paddingTop": "5px" }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover" onClick={() => { copyText(item.site) }}>
                      </lord-icon>
                    </span> </td>
                  <td>{item.username}
                    <span className='cursor-pointer'>
                      <lord-icon
                        style={{ "width": "25px", "height": "25px", "paddingTop": "5px" }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        onClick={() => { copyText(item.username) }}>
                      </lord-icon>
                    </span>
                  </td>
                  <td>{"*".repeat(item.password.length)}
                    <span className='cursor-pointer'>
                      <lord-icon
                        style={{ "width": "25px", "height": "25px", "paddingTop": "5px" }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        onClick={() => { copyText(item.password) }}>
                      </lord-icon>
                    </span>
                  </td>
                  <td>
                    <span className="cursor-pointer
                    text-center "><lord-icon
                      style={{ "width": "25px", "height": "25px", "paddingTop": "5px" }}
                      src="https://cdn.lordicon.com/gwlusjdu.json"
                      trigger="hover"
                      onClick={() => editText(item.id)}>
                    </lord-icon>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        colors="primary:#242424"
                        style={{ "width": "25px", "height": "25px" }}
                        onClick={() => deleteText(item.id)}
                      >
                      </lord-icon>
                    </span></td>
                </tr>
              })}
            </tbody>

          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
