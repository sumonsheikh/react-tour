import React, {useState, useEffect} from 'react';
import './App.css';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.netlify.app/api/react-tours-project';

function App() {
  const [loading, setLoading] = useState (false);
  const [tours, setTours]     = useState([]);
  const removeTour = (id) =>{
    const newTours = tours.filter( (tour) => tour.id !== id);
    setTours(newTours);
  }

  const fetchTours = async () =>{
    setLoading(true);
    
    try{
      const response = await fetch(url);
      const tours    = await response.json();

      setLoading(false);
      setTours(tours);

    }catch(error){

      setLoading(true);
      console.log(error);

    }
  }

  useEffect(() =>{
    fetchTours();
  },[]);

  if(loading){
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if(tours.length === 0){
    return(
      <main>
        <h1>No Tours found!</h1>
        <button className="refresh-btn" onClick={fetchTours}>Refresh</button>
      </main>
    );
  }
  return(
    <main>
      <Tours tours = {tours} removeTour={removeTour}/>
    </main>
  );

}

export default App;
