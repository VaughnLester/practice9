import { useState } from "react"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";



function TestPage(){
    const [y, setID] = useState(null);

    const {id} = useParams();
    alert(id);

    const [searchParams] = useSearchParams();
    alert(searchParams.get("example"));
    
    const [project, setProject] = useState(null);
    const getProjectsByID = async function getProjects(e){
        e.preventDefault();
        const form = new FormData(e.target)
        const data = {
            id: form.get("id")
        }
        const res = await fetch("/projectsByID", ({
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        }))
        const resData = await res.json();
        setProject((resData[0]))
    }


    return(
        <>
        <h1>APP IS RUNNING</h1>
        <form onSubmit={getProjectsByID}>
            <input name="id" placeholder="ID" value={id} onChange={(e)=>setID(e.target.value)}></input>
        <button type="submit">Submit</button>
        </form>
        <h1>{project?.title}</h1>
        <h1>Controlled form, what the user input is: {id}</h1>

        </>
    )
}

export {TestPage}