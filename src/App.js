import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameLayout from './layouts/GameLayout';
import ResultView from './views/ResultView'; // 새로 이동할 페이지
import QuestionView from "./views/QuestionView"
import NamewriteView from "./views/NamewriteView"
import RecapLayout from './layouts/RecapLayout';
import RecapView from './views/RecapView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameLayout />} />
        <Route path="/name" element={<NamewriteView />} />
        <Route path="/result" element={<ResultView />} />
        <Route path="/test" element={<QuestionView />} />
        <Route path="/recap-main" element={<RecapLayout />} />
        <Route path="/recap" element={<RecapView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;