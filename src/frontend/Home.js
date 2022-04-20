import React from "react";

import HeroSection from "./HeroSection";
import FooterSection from "./FooterSection";
import ContentSection from "./ContentSection";

const Home = ({upload}) => {
    return(
        <div style={{overflowX:"hidden"}}>
            <HeroSection/>
            <ContentSection upload={upload}/>
            <FooterSection/>
        </div>
    );
}

export default Home;