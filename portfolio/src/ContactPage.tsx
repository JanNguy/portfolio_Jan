import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function ContactPage() {
    const [hoveredId, setHoveredId] = React.useState<number | null>(null);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);

    const handleMouseOver = (id: number) => {
        if (selectedId === null) {
            setHoveredId(id);
        }
    };

    const handleMouseOut = () => {
        if (selectedId === null) {
            setHoveredId(null);
        }
    };

    const handleClick = (id: number) => {
        if (selectedId === id) {
            setSelectedId(null);
            setHoveredId(null);
        } else {
            setSelectedId(id);
            setHoveredId(id);
        }
    };

    const isVisible = (id: number) => hoveredId === id || selectedId === id;

    const socialLinks = [
        {
            id: 1,
            name: "X",
            icon: "/X_logo_2023.svg",
            url: "/ppTwitter$.jpg",
            component: (
                <div className="w-[600px] h-[250px] rounded-2xl shadow-2xl overflow-hidden bg-white cursor-pointer" onClick={() => window.open('https://x.com/JanNguy74478827', '_blank')}>
                    <div className="flex items-center p-8">
                        <img className="h-32 w-32 rounded-full" src="https://pbs.twimg.com/profile_images/1966466595913396224/k2cHSvN1_400x400.jpg" alt="Photo de profil X" />
                        <div className="ml-6">
                            <p className="text-4xl font-bold text-gray-800">Jan</p>
                            <p className="text-2xl text-gray-500">@JanNguy74478827</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            name: "LinkedIn",
            icon: "/linkedin.svg",
            url: "/PPLinekedin.jpg",
            component: (
                <div className="w-[600px] rounded-2xl shadow-2xl overflow-hidden bg-white cursor-pointer" onClick={() => window.open('https://www.linkedin.com/in/jan-nguyen-0aa40b315/', '_blank')}>
                    <div className="relative">
                        <img className="w-full h-40 object-cover" src="https://media.licdn.com/dms/image/v2/D4E16AQGkHRpqXc8IsQ/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1733853178161?e=1760572800&v=beta&t=5vuskmSKmJmXK38iSLM9MAZwjb9BZgPCqAkZIZ3Ps9o" alt="Image de fond LinkedIn" />
                        <img className="absolute top-20 left-8 rounded-full h-32 w-32 border-4 border-white" src="https://media.licdn.com/dms/image/v2/D4E03AQG0cRXvsaJcLA/profile-displayphoto-shrink_400_400/B4EZOxsZs0HAAg-/0/1733853028575?e=1760572800&v=beta&t=k6G_CEN1_92OT0d4nvKOOIgv8HdKNw_fL_OPP8WbFyY" alt="Photo de profil LinkedIn" />
                    </div>
                    <div className="p-8 pt-20">
                        <p className="text-3xl font-bold">Jan Nguyen</p>
                        <p className="text-lg text-gray-500">Développeur Free-lance | React & TypeScript</p>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            name: "GitHub",
            icon: "/github-mark.svg",
            url: "https://github.com/JanNguy",
            component: (
                <div className="w-[600px] h-[250px] rounded-2xl shadow-2xl bg-white flex items-center p-8 cursor-pointer" onClick={() => window.open('https://github.com/JanNguy', '_blank')}>
                    <img className="h-32 w-32 rounded-full" src="https://avatars.githubusercontent.com/u/75522312?v=4" alt="Photo de profil GitHub" />
                    <div className="ml-6">
                        <p className="text-5xl font-bold">Jan</p>
                        <p className="text-2xl text-gray-600">JanNguy</p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="flex w-screen h-screen font-sans bg-gray-50">
            <div className="w-1/4 h-full flex flex-col justify-between items-center bg-white py-10 shadow-lg">
                <div>
                    <h1 className="edwarian text-[120px] text-gray-800 text-center transform -translate-x-5">Contact</h1>
                    <div className="flex flex-row justify-center gap-6 mt-4">
                        {socialLinks.map(link => (
                            <img
                                key={link.id}
                                src={link.icon}
                                alt={link.name}
                                onMouseOver={() => handleMouseOver(link.id)}
                                onMouseOut={handleMouseOut}
                                onClick={() => handleClick(link.id)}
                                className="w-9 h-9 cursor-pointer transition-transform duration-200 hover:scale-125"
                            />
                        ))}
                    </div>
                </div>
                <Link to="/" className="edwarian text-5xl text-gray-400 hover:text-gray-800 transition-colors">
                    Back
                </Link>
            </div>

            <main className="flex-1 relative flex items-center justify-center">
                <p className={`absolute text-2xl text-gray-300 transition-opacity duration-500 ${hoveredId === null && selectedId === null ? 'opacity-100' : 'opacity-0'}`}>
                    Hover an icon to see details
                </p>
                {socialLinks.map(link => (
                    <div key={link.id} className={`absolute transition-all duration-500 ease-in-out ${isVisible(link.id) ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                        {link.component}
                    </div>
                ))}
            </main>
        </div>
    );
}

export default ContactPage;