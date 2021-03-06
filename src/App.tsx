import React from 'react';
import { MainPage, SquarePage, TodoPage } from './page';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/todo/:id" element={<TodoPage />} />
        <Route path="/square" element={<SquarePage />} />
      </Routes>
    </div>
  );
}

export default App;
