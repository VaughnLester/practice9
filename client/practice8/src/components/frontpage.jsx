import {useState, useEffect} from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';



function Frontpage(){
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    //now corredtly display params and search params (from example url) here:
    


    useEffect(()=>{
        async function getProjects() {
            const res = await fetch("/projects");
            const data = await res.json();
            setProjects(data[0]);
        }
        getProjects();
    },[])

    //form handlers
    const projectForm = async function(e){
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            id: form.get("id")
        }
        const res = await fetch("/projectsByID",({
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        }))
        const results = await res.json();
        alert(results);
    }

    //controlled form, useNavigate when finished, wrapped in error handling
    const [loading, setloading] = useState(false);
    const [cdata, setcdata] = useState(null);
    const [project, setProject] = useState(null);

    const getProjects2 = async (e)=>{
        e.preventDefault();
        try{
            setloading(true);
            const body = {
                id: cdata
            }
            const res = await fetch("/projectsByID",({
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            }))
            
            const data = await res.json();
            setProject((data[0]));
        }
        catch(err){
            console.log(err);
        }
        finally{
            setloading(false);
            navigate("/frontpage");
        }
    }
    return(
    <>
        <h1>Project 1(from useEffect): {projects[0]?.title}</h1>
        <form onSubmit={projectForm}>
            <input name='id' type='text' placeholder='id'/>
        </form>

        <h1>Controlled Form, no form data</h1>
        <form onSubmit={getProjects2} >
            <input name='id' disabled={loading} value={cdata} onChange={(e)=>{setcdata(e.target.value)}} />
        </form>
        <h1>This is the controlled form serach: {cdata}</h1>
        <h1>Controlled Form Results: {project?.title}</h1>
    </>
    )
}

export {Frontpage}