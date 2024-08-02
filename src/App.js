import './output.css';
import './input.css';

import Dictionary from './Dictionary';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 md:flex md:flex-col md:items-center md:justify-center ">
      <div className="md:w-2/5 flex flex-col bg-slate-50 p-2 rounded border border-none md:shadow-md shadow-md w-4/5">
        <header className="flex felx-col text-3xl item-center justify-center py-4">
          <h1 className="font-bold md:text-black w-fit md:font-bold">Dictionary</h1>
        </header>
        <main className="p-4 ">
          <Dictionary />
        </main>
      </div>
    </div>
  );
}

export default App;
