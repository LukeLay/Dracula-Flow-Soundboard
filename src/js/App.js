//Before running, type "npm install" in a terminal to install all necessary packages.

//To begin debuggin, type "npm run watch" and "npm start" in seperate terminals.

//To compile and release, in a terminal type either of the following commands:
//npx electron-packager "$(node -e "const path = require('path'); console.log(path.join(process.env.USERPROFILE, 'Documents', 'GitHub', '[YOUR_APP_NAME_HERE]'))")" [YOUR_APP_NAME_HERE] --platform=win32 --arch=x64 --electron-version=26.1.0 --overwrite
//npx electron-packager "C:\Users\llay\Documents\GitHub\[YOUR_APP_NAME_HERE]" [YOUR_APP_NAME_HERE] --platform=win32 --arch=x64 --electron-version=26.1.0 --overwrite

import React, { useEffect, useState } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "../style/bootstrap-sketchy.css";

export default function App() {

    return (
        <>

            <HashRouter hashType="noslash">

                <div className="App">

                    <Routes>

                        {/* Home Page Route */}
                        <Route exact path="/" element={<Home />} />

                        {/* Catch-all Route for 404 Not Found Page */}
                        <Route path="*" element={<NotFound />} />

                    </Routes>

                </div>

            </HashRouter>

        </>
    );
}