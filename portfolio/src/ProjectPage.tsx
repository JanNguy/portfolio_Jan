import { Link } from 'react-router-dom';
import ProjectsGrid from './ProjectGrid';
import './App.css';

function ProjectsPage() {

    return (
        <>
            <div>
                <div className='mt-8 ml-12'>
                    <Link to="/" className='flex flex-row flex-nowrap items-center transition duration-150 ease-out hover:-translate-x-1 no-underline text-stone-800'>
                        <span className='text-2xl mr-3'>←</span>
                    </Link>
                </div>
                <div className='mx-auto mt-16 mb-16 flex flex-row justify-center items-center'>
                    <div className="flex justify-center">
                        <ProjectsGrid/>
                    </div>
                </div>
                <footer className="bg-white border-t border-gray-200 mt-16">
                    <div className="mx-auto max-w-screen-xl px-6 py-16 sm:px-8 lg:px-12">
                        <div className="flex flex-col items-center gap-12 sm:flex-row sm:justify-between">
                            <div className="flex justify-center text-gray-900 sm:justify-start">
                                <p className="text-2xl font-bold">Jan Nguyen</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-10">
                                <Link to="/" className={"text-base text-gray-500 transition hover:text-gray-900"}>
                                    Home
                                </Link>
                                <Link to="/ProjectsPage" className={"text-base text-gray-500 transition hover:text-gray-900"}>
                                    Projects
                                </Link>
                                <a href="https://github.com/JanNguy" target="_blank" rel="noopener noreferrer" className={"text-base text-gray-500 transition hover:text-gray-900"}>
                                    Github
                                </a>
                                <Link to="/ContactPage" className={"text-base text-gray-500 transition hover:text-gray-900"}>
                                    Contact
                                </Link>
                            </div>
                        </div>
                        <div className="mt-12 border-t border-gray-100 pt-8">
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default ProjectsPage;
