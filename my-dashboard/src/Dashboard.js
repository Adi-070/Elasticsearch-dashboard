import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:9200/my_index/_search?from=${page * 5}&size=5`);
      setData(response.data.hits.hits);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='container'>
    <div className="dashboard-container">
      <h1>User Posts</h1>
      <div className="posts">
        {data.map((item, index) => (
          <div className="post" key={index}>
            <div className="post-header">
              <h2 className="user">{item._source.user}</h2>
              <p className="post-date">{new Date(item._source.post_date).toLocaleDateString()}</p>
            </div>
            <p className="message">{item._source.message}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
