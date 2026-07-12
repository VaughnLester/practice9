import { useState } from "react"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function TestPage(){
    const [y, setID] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();
    alert(id);


    //loading 
    const [loading, setloading] = useState(false);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();
    alert(searchParams.get("example"));
    
    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState([]);

    
    const getProjectsByID = async function getProjects(e){
        try{
            setloading(true)
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
            if(!res){
                throw new Error("something went wrong");
            }
            const resData = await res.json();
            setProject((resData[0]))
            navigate("/testpage")
        }
        catch(err){
            setError(err.message);
        }
        finally {setloading(false)}
    }

    useEffect(()=>{
        async function getProjects() {
            const res = await fetch("/projects")
            const data = await res.json();
            setProjects(data[0]);
        }
        getProjects();
       
    },[])

    return(
        <>
        <h1>APP IS RUNNING</h1>
        {projects[0]?.title}
        <form onSubmit={getProjectsByID}>
            <input name="id" placeholder="ID" value={id} onChange={(e)=>setID(e.target.value)}></input>
        <button type="submit" disabled={loading}>Submit</button>
        </form>
        <h1>{project?.title}</h1>
        <h1>Controlled form, what the user input is: {id}</h1>

        </>
    )
}

export {TestPage}