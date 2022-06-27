import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import About from "./Pages/About/Index";

const CustomRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/languages" />
                <Route path="/ads" />
                <Route path="/certificates" />
                <Route path="/skills" />
                <Route path="/experience" />
                <Route path="/projects" />
            </Routes>
        </BrowserRouter>
    )
}

export default CustomRoutes;