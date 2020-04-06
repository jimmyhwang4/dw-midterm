import React from "react";
import '../App.css';

function Header( {c} ) {

    return (
        <div className="Header">
            <div className="menuNav">
                <a href="/world">
                    <div className="menuButton">
                        <img alt="world" height="24" width="auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Globe_icon.svg/420px-Globe_icon.svg.png"></img>
                        <p><strong>World</strong></p>
                    </div>
                </a>
                <a href="/?country=USA">
                    <div className="menuButton">
                        <img alt="us" src="https://www.countryflags.io/US/flat/32.png"></img>
                        <p><strong>USA</strong></p>
                    </div>
                </a>
                <a href="/?country=Spain">
                    <div className="menuButton">
                        <img alt="es" src="https://www.countryflags.io/ES/flat/32.png"></img>
                        <p><strong>Spain</strong></p>
                    </div>
                </a>
                <a href="/?country=Italy">
                    <div className="menuButton">
                        <img alt="it" src="https://www.countryflags.io/IT/flat/32.png"></img>
                        <p><strong>Italy</strong></p>
                    </div>
                </a>
                <a href="/?country=Germany">
                    <div className="menuButton">
                        <img alt="de" src="https://www.countryflags.io/DE/flat/32.png"></img>
                        <p><strong>Germany</strong></p>
                    </div>
                </a>
                <a href="/?country=France">
                    <div className="menuButton">
                        <img alt="fr" src="https://www.countryflags.io/FR/flat/32.png"></img>
                        <p><strong>France</strong></p>
                    </div>
                </a>
                <a href="/news">
                    <div className="menuButton">
                        <p><strong>News</strong></p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Header;