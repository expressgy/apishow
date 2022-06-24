import { Routes, Route, } from "react-router-dom";

import Home from "../Home";
import Cmd from "../Cmd";

export default function App() {
    return (<>
        <Routes>
            <Route path={'/home'} element={<Home/>}></Route>
            <Route path={'/cmd/*'} element={<Cmd/>}></Route>
            <Route path="*" element={<Home />} />
        </Routes>
    </>)
}
