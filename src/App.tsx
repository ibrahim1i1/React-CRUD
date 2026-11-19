import { useState } from 'react';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [cards, setCards] = useState<string[]>(() => {
    const savedCards = localStorage.getItem('myCards');
    if (savedCards) {
      return JSON.parse(savedCards);
    }
    return [];
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddText = () => {
    if (inputValue.trim() === '') return;

    if (editIndex !== null) {
      const updatedCards = [...cards];
      updatedCards[editIndex] = inputValue.trim();
      setCards(updatedCards);
      localStorage.setItem('myCards', JSON.stringify(updatedCards));
      setEditIndex(null);
    } else {
      const updateCards = [...cards, inputValue.trim()];
      setCards(updateCards);
      localStorage.setItem('myCards', JSON.stringify(updateCards));
    }
    setInputValue('');
  };

  const handleDelete = (indexToDelete: number) => {
    const updatedCards = cards.filter((_, index) => index !== indexToDelete);
    setCards(updatedCards);
    localStorage.setItem('myCards', JSON.stringify(updatedCards));

    if (editIndex === indexToDelete) {
      setEditIndex(null);
      setInputValue('');
    }
  };

  const handleEdit = (indexToEdit: number) => {
    setInputValue(cards[indexToEdit]);
    setEditIndex(indexToEdit);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Task Cards
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage your items with instant local saving
            </p>
          </div>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {cards.length} {cards.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddText()}
            placeholder={editIndex !== null ? 'Update your text...' : 'Write a new item...'}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
          />

          <button
            onClick={handleAddText}
            className={`px-5 py-3 rounded-xl text-sm font-semibold text-white transition cursor-pointer ${
              editIndex !== null
                ? 'bg-emerald-600 hover:bg-emerald-500'
                : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            {editIndex !== null ? 'Save' : 'Add'}
          </button>

          {editIndex !== null && (
            <button
              onClick={handleCancelEdit}
              className="px-4 py-3 rounded-xl text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Cards List */}
        {cards.length === 0 ? (
          <div className="border border-dashed border-slate-800 rounded-xl py-12 px-4 text-center">
            <p className="text-slate-400 font-medium">No items yet</p>
            <p className="text-xs text-slate-500 mt-1">
              Type something above and press Add or Enter to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {cards.map((car, index) => {
              const isEditing = editIndex === index;

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between gap-3 p-4 rounded-xl border transition ${
                    isEditing
                      ? 'bg-indigo-950/40 border-indigo-500/60'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded-md border border-slate-800">
                      #{index + 1}
                    </span>
                    <h2 className="text-sm sm:text-base font-medium text-slate-100 truncate">
                      {car}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}