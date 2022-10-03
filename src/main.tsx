import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Game from './pages/Game/Game';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/game/:id' element={<Game />} />
            </Routes>
        </Router>
    </React.StrictMode>,
);
