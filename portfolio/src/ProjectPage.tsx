import { Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

function ProjectsPage() {

    // const baseUrl = window.location.origin;

    // const projects = [
    //     {
    //         id:"1",
    //         title:"BlockApp",
    //         pathImg:"public/linkedin-logo.svg",
    //         description:"My first react project. Its a simple moving blocks project",
    //         url:`${baseUrl}/blockFristApp`
    //     },
    //     {
    //         id:"2",
    //         title:"DeepSearch",
    //         pathImg:"public/linkedin-logo.svg",
    //         description:"A Deepseek-R1 based deepsearch function made for an 4hours Hackathon.",
    //         url:"https://github.com/JanNguy/DeepSearch"
    //     },
    //     {
    //         id:"3",
    //         title:"FastStart",
    //         pathImg:"public/linkedin-logo.svg",
    //         description:"A C project luncher for with custom header and start patterns.",
    //         url:"https://github.com/JanNguy/FastStart"
    //     },
    //     {
    //         id:"4",
    //         title:"cross-easy-trial",
    //         pathImg:"public/linkedin-logo.svg",
    //         description:"A script to bypass the end of the free trial indefinitely",
    //         url:"https://github.com/JanNguy/cross-easy-trial"
    //     }
    // ];

    // function ProjectCard({ projects }) {
    //     return (
    //         <article className="card">
    //             <img src={projects.pathImg} alt={projects.title} />
    //             <div className="card-body">
    //                 <h3>{projects.title}</h3>
    //                 <p>{projects.description}</p>
    //                 <a href={projects.url} target="_blank" rel="noreferrer">Voir</a>
    //             </div>
    //         </article>
    // );

    return (
        <>
            <div className='flex flex-row flex-nowrap items-center ml-7 transition duration-150 ease-out hover:translate-x-1 no-underline '>
                <p className='mt-5 ml-2'>←</p>
                <Link to="/" className='edwarian text-5xl flex mt-7 ml-2 no-underline hover:underline decoration-[0.25px] underline-offset-5'>Back</Link>
            </div>
            <div className="flex flex-row flex-nowrap justify-center items-center h-[80vh]">
                <p className="mr-5 font-bold leading-none select-none inline-flex justify-center items-center w-12 h-12 text-3xl text-stone-900 transition-transform duration-300 ease-out [will-change:transform] origin-center hover:scale-150 active:scale-95">&lt;</p>
                <div className="p-2 h-[60vh] w-[40vh] border border-stone-600 rounded">
                    <div className="h-[40%] w-auto border m-2"></div>
                    <div className="h-[60%]">
                        <p>Placeholder</p>
                    </div>
                </div>
                <p className="ml-5 font-bold leading-none select-none inline-flex justify-center items-center w-12 h-12 text-3xl text-stone-900 transition-transform duration-300 ease-out [will-change:transform] origin-center hover:scale-150 active:scale-95">&gt;</p>
            </div>
        </>
    );
}

export default ProjectsPage;
