import React from "react";
import { Link } from "react-router-dom";
import "../css/App.css";

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
            link: "https://x.com/JanNguy74478827",
            component: (
                <div
                    className="w-[90vw] max-w-[600px] h-[200px] md:h-[250px] rounded-2xl shadow-2xl overflow-hidden bg-white cursor-pointer"
                    onClick={() =>
                        window.open("https://x.com/JanNguy74478827", "_blank")
                    }
                >
                    <div className="flex items-center p-4 md:p-8">
                        <img
                            className="h-20 w-20 md:h-32 md:w-32 rounded-full"
                            src="/ppTwitter$.jpg"
                            alt="Photo de profil X"
                        />
                        <div className="ml-4 md:ml-6">
                            <p className="text-2xl md:text-4xl font-bold text-gray-800">
                                Jan
                            </p>
                            <p className="text-lg md:text-2xl text-gray-500">
                                @JanNguy74478827
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 2,
            name: "LinkedIn",
            icon: "/linkedin.svg",
            url: "/PPLinekdin.jpg",
            link: "https://www.linkedin.com/in/jan-nguyen-0aa40b315/",
            component: (
                <div
                    className="w-[90vw] max-w-[600px] rounded-2xl shadow-2xl overflow-hidden bg-white cursor-pointer"
                    onClick={() =>
                        window.open(
                            "https://www.linkedin.com/in/jan-nguyen-0aa40b315/",
                            "_blank",
                        )
                    }
                >
                    <div className="relative">
                        <div className="w-full h-32 md:h-40 bg-[#0A66C2]" />
                        <img
                            className="absolute top-16 md:top-20 left-4 md:left-8 rounded-full h-20 w-20 md:h-32 md:w-32 border-4 border-white object-cover"
                            src="/PPLinekdin.jpg"
                            alt="Photo de profil LinkedIn"
                        />
                    </div>
                    <div className="p-4 md:p-8 pt-16 md:pt-20">
                        <p className="text-2xl md:text-3xl font-bold">
                            Jan Nguyen
                        </p>
                        <p className="text-sm md:text-lg text-gray-500">
                            Développeur Free-lance | React & TypeScript
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            name: "GitHub",
            icon: "/github-mark.svg",
            url: "https://github.com/JanNguy",
            link: "https://github.com/JanNguy",
            component: (
                <div
                    className="w-[90vw] max-w-[600px] h-[200px] md:h-[250px] rounded-2xl shadow-2xl bg-white flex items-center p-4 md:p-8 cursor-pointer"
                    onClick={() =>
                        window.open("https://github.com/JanNguy", "_blank")
                    }
                >
                    <img
                        className="h-20 w-20 md:h-32 md:w-32 rounded-full"
                        src="https://avatars.githubusercontent.com/u/75522312?v=4"
                        alt="Photo de profil GitHub"
                        referrerPolicy="no-referrer"
                    />
                    <div className="ml-4 md:ml-6">
                        <p className="text-3xl md:text-5xl font-bold">Jan</p>
                        <p className="text-lg md:text-2xl text-gray-600">
                            JanNguy
                        </p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col md:flex-row w-screen h-screen font-sans bg-gray-50">
            <div className="w-full md:w-1/4 h-auto md:h-full flex flex-col justify-between items-center bg-white py-6 md:py-10 shadow-lg">
                <div>
                    <h1 className="edwarian text-[60px] md:text-[120px] text-gray-800 text-center transform -translate-x-2 md:-translate-x-5">
                        Contact
                    </h1>
                    <div className="flex flex-row justify-center gap-6 mt-4">
                        {socialLinks.map((link) => (
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
                <Link
                    to="/"
                    className="edwarian text-3xl md:text-5xl text-gray-400 hover:text-gray-800 transition-colors mt-5"
                >
                    Back
                </Link>
            </div>

            <main className="flex-1 relative flex items-center justify-center p-4">
                <p
                    className={`absolute text-lg md:text-2xl text-gray-300 transition-opacity duration-500 text-center ${hoveredId === null && selectedId === null ? "opacity-100" : "opacity-0"}`}
                >
                    Tap an icon to see details
                </p>
                {socialLinks.map((link) => (
                    <div
                        key={link.id}
                        className={`absolute transition-all duration-500 ease-in-out ${isVisible(link.id) ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
                    >
                        {link.component}
                    </div>
                ))}
            </main>
        </div>
    );
}

export default ContactPage;
