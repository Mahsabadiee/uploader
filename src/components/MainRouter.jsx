import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router'
import Login from './../pages/Login';
import Upload from './../pages/Upload';

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;