import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [work, setwork] = useState("")
  const [worklist, setworklist] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  useEffect(() => {
    let todostring = localStorage.getItem("worklist")
    if (todostring) {
      let w = JSON.parse(localStorage.getItem("worklist"))
      setworklist(w)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("worklist", JSON.stringify(worklist))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }




  const handleEdit = (e, id) => {
    let t = worklist.filter(i => i.id === id)
    setwork(t[0].work)
    let newworklist = worklist.filter(item => {
      return item.id !== id
    });
    setworklist(newworklist)
    saveToLS()


  }
  const handleDelete = (e, id) => {
    let newworklist = worklist.filter(item => {
      return item.id !== id
    });
    setworklist(newworklist)
    saveToLS()


  }
  const handleAdd = () => {
    setworklist([...worklist, { id: uuidv4(), work, iscompleted: false }])
    setwork("")
    saveToLS()

  }

  const handleChange = (e) => {
    setwork(e.target.value)
  }
  

  const handlecheckbox = (e) => {
    let id = e.target.name
    let index = worklist.findIndex(item => {
      return item.id === id;
    })
    let newworklist = [...worklist];
    newworklist[index].iscompleted = !newworklist[index].iscompleted;
    setworklist(newworklist);
    saveToLS()
  }



  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-[#9CDBA6] min-h-[80vh] md:w-[55%]">
        <div className="addtodo text-center py-3 "  >
          <div className="text-xl text-[#468585] font-bold addTodo my-5 flex flex-col gap-4 m-1">Add A To-do</div>
          <input type='text' value={work} onChange={handleChange} className=' w-3/5 m-2 ' ></input>
          <button onClick={handleAdd} className="button bg-[#468585]  hover:bg-[#50B498] mx-5 px-3 py-1 rounded-md" >Add</button>
        </div> 
       

        <div className='text-xl text-[#468585] font-bold '>Your To-do List</div>
        <div className="todos">
          {worklist.length === 0 && <div className='m-5'>No Todos to display</div>}
          { 
            worklist.map(item => {

              return <div key={item.id} className="todos flex my-2 justify-between w-full">
                <div className="flex gap-5 max-w-[600px] overflow-clip">
                  <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.iscompleted} />
                  <div className={item.iscompleted ? "line-through  max-w-[70%]" : "max-w-[70%]"}>{item.work}</div>
                </div>
                <div className="button flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-[#468585] mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-2 py-1 text-sm font-bold text-white ">edit</button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-[#468585] mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-2 py-1 text-sm font-bold text-white">delete</button>
                </div>
              </div>

            })
          }

        </div>
      </div>

    </>
  )
}

export default App
