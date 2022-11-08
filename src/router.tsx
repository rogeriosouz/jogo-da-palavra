import { Route, Routes } from 'react-router-dom';
import { Game } from './pages/Game';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
    </Routes>
  );
}
