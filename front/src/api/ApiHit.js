const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer 61d3c0c8909c9ac9765872fad39235fe'
    }
  };

  const api_key = "61d3c0c8909c9ac9765872fad39235fe"

 export default async function fetchData(endPoint) {
    const data = fetch(`https://api.themoviedb.org/3/${endPoint}?api_key=61d3c0c8909c9ac9765872fad39235fe&language=en-US`, options)
    .then(response => response.json())
    
    .catch(err => console.error(err));
    return data ;
  }

  
  
  