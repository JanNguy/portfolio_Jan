import React from "react";
import { Link } from "react-router-dom";
import Iframe from 'react-iframe'
import "./App.css";

function ProjectsPage() {
  let [overD1, setOverD1] = React.useState<string>("invisible");
  let [overD2, setOverD2] = React.useState<string>("invisible");
  let [overD3, setOverD3] = React.useState<string>("invisible");
  let [overD4, setOverD4] = React.useState<string>("invisible");
  let [overD5, setOverD5] = React.useState<string>("invisible");
  let [overD6, setOverD6] = React.useState<string>("invisible");
  const [selected, setSelected] = React.useState<number | null>(null);

  const hideAll = () => { setOverD1("invisible"); setOverD2("invisible"); setOverD3("invisible"); setOverD4("invisible"); setOverD5("invisible"); setOverD6("invisible"); };

  const onOver = (n: number) => {
    if (selected !== null) return;
    hideAll();
    switch (n) {
      case 1: setOverD1("visible"); break;
      case 2: setOverD2("visible"); break;
      case 3: setOverD3("visible"); break;
      case 4: setOverD4("visible"); break;
      case 5: setOverD5("visible"); break;
      case 6: setOverD6("visible"); break;
    }
  };

  const onOut = (n: number) => {
    if (selected !== null) return;
    switch (n) {
      case 1: setOverD1("invisible"); break;
      case 2: setOverD2("invisible"); break;
      case 3: setOverD3("invisible"); break;
      case 4: setOverD4("invisible"); break;
      case 5: setOverD5("invisible"); break;
      case 6: setOverD6("invisible"); break;
    }
  };

  // Clic: toggle la sélection
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
        <p className="edwarian text-9xl">Projects</p>
        <div className="flex flex-row flex-nowrap w-screen h-auto">
          <div className="flex flex-col flex-nowrap">
            <div className="flex flex-nowrap flex-row w-[30vh] h-auto">
              <section className="mt-4 border-1 border-solid border-stone-600 mx-7 p-2 h-[12vh]">
                <div className="flex flex-row gap-4 mb-4">
                    <img onMouseOver={() => onOver(1)} onMouseOut={() => onOut(1)} onClick={() => onClickIcon(1)} src="/linkedin-logo.svg" alt="linkedin-logo" className="w-8 h-8 transition duration-150 ease-out hover:translate-1 cursor-pointer" />
                    <img onMouseOver={() => onOver(2)} onMouseOut={() => onOut(2)} onClick={() => onClickIcon(2)} src="/linkedin-logo.svg" alt="linkedin-logo" className="w-8 h-8 transition duration-150 ease-out hover:translate-1 cursor-pointer" />
                    <img onMouseOver={() => onOver(3)} onMouseOut={() => onOut(3)} onClick={() => onClickIcon(3)} src="/linkedin-logo.svg" alt="linkedin-logo" className="w-8 h-8 transition duration-150 ease-out hover:translate-1 cursor-pointer" />
                </div>
                <div className="flex flex-row gap-4">
                    <img onMouseOver={() => onOver(4)} onMouseOut={() => onOut(4)} onClick={() => onClickIcon(4)} src="/linkedin-logo.svg" alt="linkedin-logo" className="w-8 h-8 transition duration-150 ease-out hover:translate-1 cursor-pointer" />
                    <img onMouseOver={() => onOver(5)} onMouseOut={() => onOut(5)} onClick={() => onClickIcon(5)} src="/linkedin-logo.svg" alt="linkedin-logo" className="w-8 h-8 transition duration-150 ease-out hover:translate-1 cursor-pointer" />
                    <img onMouseOver={() => onOver(6)} onMouseOut={() => onOut(6)} onClick={() => onClickIcon(6)} src="/linkedin-logo.svg" alt="linkedin-logo" className="w-8 h-8 transition duration-150 ease-out hover:translate-1 cursor-pointer" />
                </div>
              </section>
            </div>
            <div className="flex flex-nowrap items-center ml-5 mt-2 transition duration-150 ease-out hover:translate-x-1 no-underline flex-row">
                <p className="mt-3">←</p>
                <Link to="/" className="edwarian mt-3 ml-2 text-5xl hover:underline decoration-[0.25px] underline-offset-5">Back</Link>
                {selected !== null}
            </div>
          </div>
            <div className="flex-1 ml-[10px]">
                <div className="relative h-[30vh] w-fuloverflow-hidden"> {/* use ifrma for preview */}
                    <div className={`absolute inset-0 ${vis(1, overD1)} flex items-center justify-center border-solid border-1 border-black h-[80vh] w-[97%]`}>
                        <Iframe url="/blockFristApp" height="100%" width="100%" title="LinkedIn Profile"/>
                    </div>
                    <div className={`absolute inset-0 ${vis(2, overD2)} flex items-center justify-center border-solid border-1 border-black`}>
                        <p>placeholder</p>
                    </div>
                    <div className={`absolute inset-0 ${vis(3, overD3)} flex items-center justify-center border-solid border-1 border-black`}>
                        <p className="p-3">placeholder D3</p>
                    </div>
                    <div className={`absolute inset-0 ${vis(4, overD4)} flex items-center justify-center border-solid border-1 border-black`}>
                        <p className="p-3">placeholder D4</p>
                    </div>
                    <div className={`absolute inset-0 ${vis(5, overD5)} flex items-center justify-center border-solid border-1 border-black`}>
                        <p className="p-3">placeholder D5</p>
                    </div>
                    <div className={`absolute inset-0 ${vis(6, overD6)} flex items-center justify-center border-solid border-1 border-black`}>
                        <p className="p-3">placeholder D6</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
