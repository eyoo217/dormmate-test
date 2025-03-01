// Example React component (App.js)
import React, { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);

    const fetchData = async () => { 
      try {
        const response = await fetch('http://localhost:5000/customer');

        if (response.ok) {
          const jsonRes = await response.json();
          console.log('Fetched data:', jsonRes);

          setData(jsonRes);
        } else {
          console.log('Fetch error:', response.statusText);
        }
      } catch (error) {
        console.log('Fetch error:', error);
      }
    };

    useEffect(() => {
      if (!hasFetched) {
        fetchData();
        setHasFetched(true);
      }
    }, [hasFetched]);

    if (data) {
      console.log('Rendering data:', data); // Print the fetched customer data
      return (
        <div>
          <h1>Customers</h1>
          {Array.isArray(data) ? (
            data.map((customer, index) => (
              <div key={index}>
                <p>Name: {customer.first_name} {customer.last_name}</p>
                <p>Email: {customer.email}</p>
                {/* Add more fields as necessary */}
              </div>
            ))
          ) : (
            <p>Data is not an array</p>
          )}
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
}

export default App;