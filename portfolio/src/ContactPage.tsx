import { Link } from "react-router-dom";
import './App.css'

function ContactPage() {
    return (
        <>
            <div className='flex flex-nowrap flex-col justify-start items-start m-7'>
                <p className='edwarian text-9xl -ml-5'>Contacts</p>

                <section className='mt-4 border-1 border-solid border-stone-600 mx-7 p-2'> {/*si une des sections est hover alors la preview du lien se joue*/}
                    <div className='flex flex-row gap-4 mb-4'>
                        <img src="../public/linkedin-logo.svg" alt="linkedin-logo" className='w-8 h-8 transition duration-150 ease-out hover:translate-1'/>
                        <img src="../public/linkedin-logo.svg" alt="linkedin-logo" className='w-8 h-8 transition duration-150 ease-out hover:translate-1'/>
                        <img src="../public/linkedin-logo.svg" alt="linkedin-logo" className='w-8 h-8 transition duration-150 ease-out hover:translate-1'/>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <img src="../public/linkedin-logo.svg" alt="linkedin-logo" className='w-8 h-8 transition duration-150 ease-out hover:translate-1'/>
                        <img src="../public/linkedin-logo.svg" alt="linkedin-logo" className='w-8 h-8 transition duration-150 ease-out hover:translate-1'/>
                        <img src="../public/linkedin-logo.svg" alt="linkedin-logo" className='w-8 h-8 transition duration-150 ease-out hover:translate-1'/>
                    </div>
                </section>
                <div className="flex flex-row flex-nowrap items-center ml-5 transition duration-150 ease-out hover:translate-x-1 no-underline">
                    <p className="mt-3">←</p>
                    <Link to="/" className='edwarian mt-6 ml-2 text-5xl hover:underline decoration-[0.25px] underline-offset-5'>Back</Link>
                </div>

            </div>
        </>
    )
}

export default ContactPage;