import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import About from "./Pages/About/Index";
import Languages from "./Pages/Languages/Index";
import AcademicDegrees from "./Pages/ADs/Index";
import Certificates from "./Pages/Certificates/Index";
import Skills from "./Pages/Skills/Index";
import Experience from "./Pages/Experience/Index";
import Projects from "./Pages/Projects/Index";

const CustomRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/languages" element={<Languages />} />
                <Route path="/ads" element={<AcademicDegrees />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
        </BrowserRouter>
    )
}

export default CustomRoutes;