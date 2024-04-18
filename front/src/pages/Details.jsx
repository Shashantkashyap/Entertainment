import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import { FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import LoadingPage from "../components/Loading";

function Details() {
  const ID = useSelector((state) => state.cards.selectedCardId);
  const [tmdbID, setTMDBID] = useState("");
  const [movieValue, setMovieValue] = useState([]);
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState([]);
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerSrc, setTrailerSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWQzYzBjODkwOWM5YWM5NzY1ODcyZmFkMzkyMzVmZSIsInN1YiI6IjY1NzQyNTZhN2EzYzUyMDEwY2RkN2Y5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pQzQYYdHD8xWI2oJT4Sp_X9JVyoqE9T2pQoFBEubyjA",
    },
  };

  async function get_IMDB_ID() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${ID}/external_ids`,
        options
      );
      const data = await response.json();
      setTMDBID(data.imdb_id);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  async function getMovie() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${tmdbID}?api_key=61d3c0c8909c9ac9765872fad39235fe&language=en-US`,
        options
      );
      const data = await response.json();
      setMovieValue(data);
      setLanguage(data.spoken_languages[0].english_name);
      setGenre(data.genres);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    get_IMDB_ID();
  }, []);

  useEffect(() => {
    if (tmdbID) {
      setIsLoading(true);
      getMovie();
    }
  }, [tmdbID]);

  const playTrailer = () => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${movieValue.id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const officialTrailer = response.results.find(
          (video) => video.name === "Official Trailer" || video.site === "YouTube" 
        );
        if (officialTrailer) {
          const youtubeKey = officialTrailer.key;
          const youtubeUrl = `https://www.youtube.com/embed/${youtubeKey}`;
          setTrailerSrc(youtubeUrl);
          setShowTrailer(true);
          setIsLoading(false);
        } else {
          console.error("Official Trailer not found");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <div className="min-h-screen flex flex-row gap-5 p-6 max-md:flex-col">
      {isLoading ? (
        <div className=" mx-auto">
          <LoadingPage />
        </div>
      ) : (
        <>
          <div className="w-[5%] max-md:w-full">
            <Nav />
          </div>

          <div className="w-[90%] flex flex-row max-md:flex-col max-md:mx-auto gap-5">
            {/**left */}
            <div className="w-[25%] max-md:w-[50%] max-sm:w-[90%] rounded-lg p-6 max-md:p-2">
              <img
                src={`https://image.tmdb.org/t/p/original/${movieValue.poster_path}`}
                alt=""
                className="w-full rounded-lg"
              />
            </div>

            {/**right */}
            <div className="w-[60%] flex flex-col text-white p-6 pr-10 max-md:w-[90%] max-sm:w-[100%] max-sm:p-1 max-sm:pr-0">
              {/**title */}
              <div className="text-[52px] max-sm:text-[42px]">{movieValue.original_title}</div>

              {/**description */}
              <div className="flex flex-row max-sm:flex-col max-sm:gap-4 max-sm:justify-start justify-between mt-5">
                <div className="flex flex-col max-sm:flex-row max-sm:gap-4 gap-2 items-center">
                  <p className="text-[22px] max-sm:text-[18px] text-gray-500 font-semibold">
                    Length
                  </p>
                  <p className="text-[18px]">{movieValue.runtime} min. </p>
                </div>

                <div className="flex flex-col max-sm:flex-row max-sm:gap-4  gap-2 items-center">
                  <p className="text-[22px] max-sm:text-[18px] text-gray-500 font-semibold">
                    Language
                  </p>
                  <p className="text-[18px]">{language}</p>
                </div>
                <div className="flex flex-col max-sm:flex-row max-sm:gap-4  gap-2 items-center">
                  <p className="text-[22px] max-sm:text-[18px] text-gray-500 font-semibold">
                    Date
                  </p>
                  <p className="text-[18px]">{movieValue.release_date} </p>
                </div>

                <div className="flex flex-col max-sm:flex-row max-sm:gap-4  gap-2 items-center">
                  <p className="text-[22px] max-sm:text-[18px] text-gray-500 font-semibold">
                    Rating
                  </p>
                  <p className="text-[18px]">
                    {Math.ceil(movieValue.vote_average)}/10{" "}
                  </p>
                </div>
              </div>

              {/**genre */}
              <div className="flex flex-col gap-4 mt-5">
                <p className="text-[22px] text-gray-500 font-semibold">
                  Genres
                </p>
                <div className="flex gap-4 flex-wrap">
                  {genre.map((gen, index) => (
                    <p
                      key={index}
                      className="bg-white text-black font-semibold px-2 py-1 rounded-lg"
                    >
                      {gen.name}
                    </p>
                  ))}
                </div>
              </div>

              {/**synopsis */}
              <div className="flex flex-col gap-4 mt-8">
                <p className="text-[22px] text-gray-500 font-semibold">
                  Synopsis
                </p>
                <p className="text-[16px] max-sm:text-[14px] text-white font-semibold">
                  {movieValue.overview}
                </p>
              </div>

              {/**link */}
              <div className="mt-10 flex gap-10 mx-auto">
                <div
                  className="bg-[#5A698F] flex gap-4 w-fit py-3 px-6 items-center rounded-lg"
                  onClick={() => window.open(movieValue.homepage, "_blank")}
                >
                  <button className="font-semibold">Website</button>
                  <FaLink />
                </div>

                {showTrailer && (
                  <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <div className="relative w-[80%] h-[80%]">
                      <button
                        className="absolute top-10 right-4 text-white text-3xl"
                        onClick={closeTrailer}
                      >
                        <MdOutlineCancel color="white" fontSize={40} />
                      </button>
                      <iframe
                        src={trailerSrc}
                        title="YouTube Video Player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {showTrailer === false ? (
                  <button
                    className="bg-[#5A698F] flex gap-4 w-fit py-3 px-6 items-center rounded-lg"
                    onClick={playTrailer}
                  >
                    <div>View Trailer</div>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
