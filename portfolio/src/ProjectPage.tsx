import { Link } from 'react-router-dom';
import ProjectsGrid from './ProjectGrid';
import { useState } from 'react';
import './App.css';

function ProjectsPage() {
    const [nb, setNb] = useState<number>(1);
    const MAX_ID = 4;
    const MIN_ID = 1;

    function cardSwitchP() {
        setNb(prev => (prev >= MAX_ID ? MIN_ID : prev + 1));
    }

    function cardSwitchM() {
        setNb(prev => (prev <= MIN_ID ? MAX_ID : prev - 1));
    }

    return (
        <>
            <div>
                <div className='mt-5 ml-5'>
                    <Link to="/" className='flex flex-row flex-nowrap items-center transition duration-150 ease-out hover:-translate-x-1 no-underline text-stone-800'>
                        <span className='text-xl mr-2'>←</span>
                        <span className='edwarian text-5xl'>Back</span>
                    </Link>
                </div>
                <div className='h-[60vh] w-[55vh] mx-auto mt-20 flex flex-row'>
                    <p onClick={cardSwitchM} className='my-auto text-2xl font-bold mr-10'>&lt;</p>
                    <ProjectsGrid selectedId={nb}/>
                    <p onClick={cardSwitchP} className='my-auto text-2xl font-bold ml-10'>&gt;</p>
                </div>
            </div>
        </>
    );
}

export default ProjectsPage;
