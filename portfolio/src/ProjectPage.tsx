import { Link } from 'react-router-dom';
import ProjectsGrid from './ProjectGrid';
import './App.css';

function ProjectsPage() {

    return (
        <>
            <div>
                <div className='mt-5 ml-10'>
                    <Link to="/" className='flex flex-row flex-nowrap items-center transition duration-150 ease-out hover:-translate-x-1 no-underline text-stone-800'>
                        <span className='text-xl mr-2'>←</span>
                        <span className='edwarian text-5xl'>Back</span>
                    </Link>
                </div>
                <div className='mx-auto mt-8 mb-7 flex flex-row justify-center items-center'>
                    <div className="flex justify-center">
                        <ProjectsGrid/>
                    </div>
                </div>
                <footer className="bg-white border-t border-gray-200 mt-3">
                    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
                            <div className="flex justify-center text-gray-900 sm:justify-start">
                                <p className="text-2xl font-bold">Jan Nguyen</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-8">
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
                        <div className="mt-8 border-t border-gray-100 pt-6">
                            <p className="text-center text-sm text-gray-500">
                                © {new Date().getFullYear()} Jan Nguyen. Tous droits réservés.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default ProjectsPage;
