import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Avatar from 'react-avatar';

function Characters({ data }) {
  return (
    <div>
      <h3>StarWars Search Results</h3>
      {data.map((item, index) => (
        <div key={index} style={{ padding: 5 }}>
          <Avatar name={item.name} size="50" round={true} /> {item.name}
        </div>
      ))}
    </div>
  );
}

function StarWars() {
  const [searchTerm, setSearchTerm] = useState("luke");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    axios
      .get(`https://swapi.dev/api/people/?search=${searchTerm}`)
      .then((res) => setData(res.data.results))
      .catch((err) => {
        console.error("API error:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [searchTerm]);

  return (
    <div>
      <h2>Search Star Wars Characters</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search character..."
      />

      {loading ? <Spinner animation="border" /> : <Characters data={data} />}
    </div>
  );
}

export default StarWars;
