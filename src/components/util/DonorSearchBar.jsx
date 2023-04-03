import React, { useState } from 'react'
import DemoData from './DemoData';

function DonorSearchBar() {
  const [data,setData] = useState(DemoData);
  const [searchQuery, setSearchQuery] = useState({
    searchText: '',
    selectValue: '',
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const searchedResults = data.filter((item) => {
      return (
        item.city.includes(searchQuery.searchText) &&
        item.blood === searchQuery.selectValue
      );
    });
    setSearchResults(searchedResults);
  };

  return (
    <div>
      <div className="w-[90%] h-[40vh] box-border shadow-xl rounded-lg bg-zinc-100 m-auto">
      <h1 className='text-4xl font-bold text-center text-violet-600'>Search For Donor</h1>
      <label htmlFor="search-text">Enter City*</label>
      <input
        type="text"
        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        id="search-text"
        value={searchQuery.searchText}
        onChange={(e) =>
          setSearchQuery({ ...searchQuery, searchText: e.target.value })
        }
      />
     
      
      <label htmlFor="select-field">Select Blood Group*</label>
      <select
        id="select-field"
        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={searchQuery.selectValue}
        onChange={(e) =>
          setSearchQuery({ ...searchQuery, selectValue: e.target.value })
        }
      >
        <option value="">Select an option</option>
        <option value="A+">A+</option>
        <option value="O+">O+</option>
        <option value="B+">B+</option>
      </select>
   
      <button className = "btn" onClick={handleSearch}>Search</button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((item) => (
            <li key={item.id}>
              {item.city}, {item.blood}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
      </div>
      </div>
   
  );
}

export default DonorSearchBar
