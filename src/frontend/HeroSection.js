import React from 'react';
import Button from './Button';
import scrollDownGif from "./img/9284-scroll-down-arrows.gif";
const HeroSection = ()=>{
    return (
        <div className='container-fluid bg-black' id="hero">
            <div className='container  py-5'>
                <div className='row'>
                    <div className='col-12 py-4 text-center'>
                        <h1>EXPLORE OUR <br/>DIGITAL STORAGE SOLUTION</h1>
                        <p style={{color:"white"}} className="py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer interdum neque id lectus congue rutrum.</p>
                        {/* <div id='explore'>
                            <a href="#marketplace"><Button name="Explore"/></a>
                        </div> */}
                        <div>
                            <a href="#marketplace"><img src={scrollDownGif} alt="scroll Down" style={{width:"120px"}}/></a>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;