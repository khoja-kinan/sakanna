import React from "react";
import SearchBar from '../SearchBar/SearchBar';
import Slide from 'react-reveal/Slide';



const Results = () => {
    return (
        <>
            <div className="resulty">
                <div className="result">
                    <SearchBar />
                </div>
                <div className="comta">
                    <div className="title">
                        <div className="sup">
                            <p className="sup-tit">CHECK</p>
                            <hr className="gr"></hr>
                        </div>
                        <p className="main-tit">Results</p>
                    </div>
                    <Slide bottom>
                    <div className="result-box">
                        
                    </div>
                    </Slide>
                    <Slide bottom>
                    <div className="result-box">
                        
                    </div>
                    </Slide>
                    <Slide bottom>
                    <div className="result-box">
                        
                    </div>
                    </Slide>
                    
                </div>
            </div>
        </>
    )

}
export default Results;