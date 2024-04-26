import React, { useEffect, useState } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "../js/style/bootstrap-sketchy.css";

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