import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function ContactPage() {
    let [overD4, setOverD4] = React.useState<string>("invisible");
    let [overD5, setOverD5] = React.useState<string>("invisible");
    let [overD6, setOverD6] = React.useState<string>("invisible");
    const [selected, setSelected] = React.useState<number | null>(null);

    const hideAll = () => { setOverD4("invisible"); setOverD5("invisible"); setOverD6("invisible"); };

    const onOver = (n: number) => {
        if (selected !== null) return;
        hideAll();
        switch (n) {
        case 4: setOverD4("visible"); break;
        case 5: setOverD5("visible"); break;
        case 6: setOverD6("visible"); break;
        }
    };

    const onOut = (n: number) => {
        if (selected !== null) return;
        switch (n) {
        case 4: setOverD4("invisible"); break;
        case 5: setOverD5("invisible"); break;
        case 6: setOverD6("invisible"); break;
        }
    };

    const onClickIcon = (n: number) => {
        if (selected === n) {
        setSelected(null);
        hideAll();
        } else {
        setSelected(n);
        hideAll();
        onOver(n);
        }
    };

  const vis = (n: number, over: string) => (selected === n ? "visible" : over);

  return (
    <>
      <div className="flex flex-nowrap flex-col justify-start items-start m-7">
        <p className="edwarian text-9xl">Contact</p>
        <div className="flex flex-row flex-nowrap w-screen h-auto">
          <div className="flex flex-col flex-nowrap">
            <div className="flex flex-nowrap flex-row w-[30vh] h-auto ">
              <section className="mt-4 border-1 border-solid border-stone-600 mx-7 p-2 h-[6vh]">
                <div className="flex flex-row gap-4">
                    <img onMouseOver={() => onOver(4)} onMouseOut={() => onOut(4)} onClick={() => onClickIcon(4)} src="/X_logo_2023.svg" alt="X" className="w-8 h-8 transition duration-150 ease-out hover:translate-1 cursor-pointer" />
                    <img onMouseOver={() => onOver(5)} onMouseOut={() => onOut(5)} onClick={() => onClickIcon(5)} src="/linkedin.svg" alt="linkedin-logo" className="w-8 h-8 transition duration-150 ease-out hover:translate-1 cursor-pointer" />
                    <img onMouseOver={() => onOver(6)} onMouseOut={() => onOut(6)} onClick={() => onClickIcon(6)} src="/github-mark.svg" alt="github" className="w-8 h-8 transition duration-150 ease-out hover:translate-1 cursor-pointer" />
                </div>
              </section>
            </div>
            <div className="flex flex-nowrap items-center ml-5 mt-2 transition duration-150 ease-out hover:translate-x-1 no-underline flex-row">
                <p className="mt-3">←</p>
                <Link to="/" className="edwarian mt-3 ml-2 text-5xl hover:underline decoration-[0.25px] underline-offset-5">Back</Link>
            </div>
          </div>
            <div className="flex-1 ml-[10px] mr-10">
                <div className="relative h-[30vh] w-full overflow-hidden">
                    <div className={`absolute inset-0 ${vis(4, overD4)} flex items-center justify-start border-solid border-1 border-black cursor-pointer`} onClick={() => window.open('https://x.com/JanNguy74478827', '_blank')}>
                        <img className="h-[20vh] w-[20vh] rounded ml-10" src="https://pbs.twimg.com/profile_images/1966466595913396224/k2cHSvN1_400x400.jpg" alt="XPic" />
                        <div className="flex flex-col ml-4">
                            <p className="text-6xl">Jan</p>
                            <p>@JanNguy74478827</p>
                            <img className="h-[2vh] w-[2vh]" src="https://abs-0.twimg.com/emoji/v2/svg/1f937-200d-2642-fe0f.svg" alt="bioX" />
                        </div>
                    </div>
                    <div className={`absolute inset-0 ${vis(5, overD5)} flex items-center justify-start cursor-pointer border-1 border-black border-solid`} onClick={() => window.open('https://www.linkedin.com/in/jan-nguyen-0aa40b315/', '_blank')}>
                        <div className="relative w-[100%] h-[98%] overflow-hidden shadow-lg bg-white mt-5 mb-5 mr-1 ml-1">
                            <div>
                                <img className="w-full h-24 object-cover" src="https://media.licdn.com/dms/image/v2/D4E16AQGkHRpqXc8IsQ/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1733853178161?e=1760572800&v=beta&t=5vuskmSKmJmXK38iSLM9MAZwjb9BZgPCqAkZIZ3Ps9o" alt="Image de fond LinkedIn" />
                            </div>
                            <div className="absolute top-12 left-4">
                                <img className="rounded-full h-24 w-24 border-4 border-white" src="https://media.licdn.com/dms/image/v2/D4E03AQG0cRXvsaJcLA/profile-displayphoto-shrink_400_400/B4EZOxsZs0HAAg-/0/1733853028575?e=1760572800&v=beta&t=k6G_CEN1_92OT0d4nvKOOIgv8HdKNw_fL_OPP8WbFyY" alt="Photo de profil LinkedIn" />
                            </div>
                            <div className="p-4">
                                <div className="h-10"></div>
                                <p className="text-2xl font-bold">Jan Nguyen</p>
                                <p className="text-gray-500">Développeur Front-End</p>
                            </div>
                        </div>
                    </div>
                    <div className={`absolute inset-0 ${vis(4, overD6)} flex items-center justify-start border-solid border-1 border-black cursor-pointer`} onClick={() => window.open('https://github.com/JanNguy', '_blank')}>
                        <img className="h-[20vh] w-[20vh] rounded ml-10" src="https://avatars.githubusercontent.com/u/75522312?v=4" alt="githubPic" />
                        <div className="flex flex-col ml-4">
                            <p className="text-6xl">Jan</p>
                            <p>JanNguy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage;
