import React, { useState, useEffect } from 'react';

function Dictionary() {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState(null);
    const [error, setError] = useState(null);
    const [debouncedWord, setDebouncedWord] = useState(word);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedWord(word);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [word]);

    useEffect(() => {
        if (debouncedWord) {
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${debouncedWord}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const firstMeaning = data[0]?.meanings[0]?.definitions[0]?.definition;
                    if (firstMeaning) {
                        setDefinition(firstMeaning);
                        setError(null);
                    } else {
                        setError('No definition found');
                        setDefinition(null);
                    }
                })
                .catch(error => {
                    setError(error.message);
                    setDefinition(null);
                });
        }
    }, [debouncedWord]);

    const handleChange = (e) => {
        setWord(e.target.value);
    };

    return (
        <>
            <div className="md:flex md:flex-col md:items-center p-4 flex flex-col justify-center items-center text-black">
                <input
                    type="text"
                    value={word}
                    onChange={handleChange}
                    placeholder="Enter a word"
                    className="text-black px-4 py-3 border rounded-md shadow-sm focus:outline-none bg-stone-200"
                />

            </div>
            <div>
                {error && <p className="mt-4 text-black">Error: {error}</p>}
                {definition && (
                    <div className="mt-4 p-4  bg-slate-50 ">
                        <h2 className="text-2xl font-bold text-black">{debouncedWord}</h2>
                        <p className="text-black ">{definition}</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Dictionary;
