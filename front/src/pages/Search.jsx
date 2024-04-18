import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedSearch } from '../redux/searchSlice';
import { selectedCard } from "../redux/cardSlice";
import Nav from '../components/Nav';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import LoadingPage from '../components/Loading';
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const name = useSelector((state) => state.search.selectedSearch);
  const [results, setResult] = useState([]);
  const [page,setPage] = useState(0)
  const [n, setN] = useState(1); // Start with page 1
  const [loading, setLoading] = useState(false); // State to track loading
  const imageUri = 'https://image.tmdb.org/t/p/original';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWQzYzBjODkwOWM5YWM5NzY1ODcyZmFkMzkyMzVmZSIsInN1YiI6IjY1NzQyNTZhN2EzYzUyMDEwY2RkN2Y5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pQzQYYdHD8xWI2oJT4Sp_X9JVyoqE9T2pQoFBEubyjA',
    },
  };

  const getSearchData = () => {
    setLoading(true); // Set loading to true before fetching data
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${name}&include_adult=false&language=en-US&page=${n}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        
        setPage(response.page)
        setResult(response.results);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // Set loading to false in case of error
      });
  };
  
  useEffect(() => {
    getSearchData();
  }, [n]); // Trigger fetch when n changes

  const handleNextPage = () => {
    setN(n + 1); // Increment n to fetch next page
  };

  const handlePreviousPage = () => {
    if (n > 1) {
      setN(n - 1); // Decrement n to fetch previous page, ensuring it doesn't go below 1
    }
  };

  
  return (
    <div>
      <div className="min-h-screen flex flex-row gap-5 p-6 max-md:flex-col">
        <div className="w-[5%] max-md:w-full">
          <Nav />
        </div>

        <div className="w-[90%] mx-auto flex flex-col gap-4">
          {loading ? ( // Show loading component if loading is true
            <LoadingPage />
          ) : (
            <div className="grid grid-cols-7 max-md:grid-cols-4 max-sm:grid-cols-2 max-md:mt-6 gap-2">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="flex flex-col items-center"
                  onClick={() => {
                    dispatch(selectedCard(result.id));
                    navigate('/details');
                  }}
                >
                  <img
                    src={`${imageUri}/${result.poster_path || result.profile_path}`}
                    alt={result.title}
                    className="w-[140px] rounded-lg text-white"
                    onClick={() => {
                      dispatch(selectedCard(result.id));
                      navigate("/details");
                    }}
                  />
                  <p className="text-center text-white mb-3 font-semibold mt-2">{result.title || result.name}</p>
                </div>
              ))}
            </div>
          )}

          <div className="text-white flex items-center justify-center mt-10 gap-5">
            {n > 1 && <IoIosArrowBack fontSize={40} onClick={handlePreviousPage} />}
            <p className="text-[25px] font-semibold">{n} / {page}</p>
            <IoIosArrowForward fontSize={40} onClick={handleNextPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
