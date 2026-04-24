import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import PropertiesSection from "./PropertiesSection";
import { translations } from "../../data/constants";

const PropertiesPage = ({ propertiesData, user }) => {
    const [lang, setLang] = useState("EN");
    const content = translations[lang] || translations["EN"];

    return (
        <div className="bg-black min-h-screen scroll-smooth" dir={content.dir}>
            <Navbar lang={lang} setLang={setLang} content={content} user={user} />

            {/* Add extra padding so it's not hidden behind the fixed navbar */}
            <div className="pt-24 md:pt-32">
                <PropertiesSection
                    properties={propertiesData}
                    user={user}
                    content={content}
                />
            </div>

            <Footer content={content} />
        </div>
    );
};

export default PropertiesPage;