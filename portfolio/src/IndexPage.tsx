import { Link } from 'react-router-dom';
import './App.css';

function IndexPage() {
    return (
        <>
            <div className='flex flex-row flex-nowrap items-center ml-7 transition duration-150 ease-out hover:translate-x-1 no-underline'>
                <p className='mt-3'>←</p>
                <Link to="/" className='edwarian text-5xl flex mt-5 ml-2 no-underline hover:underline decoration-[0.25px] underline-offset-5'>Back</Link>
            </div>
            <div className="flex flex-row flex-nowrap justify-center items-center h-[80vh]">
                {/* Flèche gauche */}
                <p className="mr-5 font-bold leading-none select-none inline-flex justify-center items-center w-12 h-12 text-3xl text-stone-900 transition-transform duration-300 ease-out [will-change:transform] origin-center hover:scale-150 active:scale-95">&lt;</p>
                <section className="p-2 h-[60vh] w-[40vh]">
                    <div className="h-[40%] w-auto border border-stone-600"></div>
                    <div className="h-[60%] border border-stone-600">
                        <p>Placeholder</p>
                    </div>
                </section>
                {/* Flèche droite */}
                <p className="ml-5 font-bold leading-none select-none inline-flex justify-center items-center w-12 h-12 text-3xl text-stone-900 transition-transform duration-300 ease-out [will-change:transform] origin-center hover:scale-150 active:scale-95">&gt;</p>
            </div>
        </>
    );
}

export default IndexPage;
