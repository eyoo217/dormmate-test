// Example React component (App.js)
import React, { useState, useEffect } from 'react';
import './App.css';

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

    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [imageInput, setImageInput] = useState(null);
    const [isCreateListingVisible, setIsCreateListingVisible] = useState(false);
    const [isHomepageVisible, setIsHomepageVisible] = useState(false);
    const [selectedOptionListing, setSelectedOptionListing] = useState('');

    // Function to validate if input is a .edu email
    const validateEmail = (email) => {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/.test(email);
    };

    // Handle user input change
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
      setErrorMessage(''); // Clear error message when typing
    };

    // Handle dropdown selection
    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };

    // Handle dropdown selection for create listing
    const handleListingChange = (event) => {
      setSelectedOptionListing(event.target.value);
    };

    // Handle form submission
    const handleSubmit = () => {
      if (!validateEmail(inputValue)) {
        setErrorMessage('❌ Please enter a valid .edu email.');
      } else if (validateEmail(inputValue) && selectedOption === '') {
        setErrorMessage('✅ Email successfully submitted!');
      } else if (validateEmail(inputValue) && selectedOption !== '') {
        setIsHomepageVisible(true);
      }
    };

    // Handle image input change
    const handleImageChange = (event) => {
      const file = event.target.files[0]; // Get the first file
      if (file) {
        setImageInput(URL.createObjectURL(file)); // Create a preview URL
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
    }
      return (
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <h1>Dormmate</h1>
          <h5>A campus marketplace tailored for students</h5>
          <h3>Please enter your .edu email</h3>

          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your .edu email"
            style={{ display: 'block', margin: '0 auto', padding: '8px', width: '250px' }}
          />

          {errorMessage && <p style={{ color: errorMessage.includes('❌') ? 'red' : 'green' }}>{errorMessage}</p>}

          <div>
            <h3>Select Dorm Building:</h3>
            <select value={selectedOption} onChange={handleChange}>
              <option value="">-- Select an option --</option>
              <option value="ozanam">Ozanam</option>
              <option value="munroe">Munroe</option>
              <option value="lecompte">LeCompte</option>
              <option value="university">University</option>
              <option value="seton">Seton</option>
              <option value="corcoran">Corcoran</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            style={{ display: 'block', margin: '10px auto', padding: '10px 20px', cursor: 'pointer' }}
          >
            Submit
          </button>

          {/* Create Listing Section */}
          {isCreateListingVisible && (
            <div style={{ position: 'absolute', top: '50px', left: '100px' }}>
              <h2>Create a Listing</h2>

              <h4>Title</h4>
              <input
                type="text"
                placeholder="Title"
                style={{ display: 'block', margin: '0 auto', padding: '8px', width: '250px' }}
              />

              <h4>Price $</h4>
              <input type="number" placeholder="Price $" />

              <h4>Location</h4>
              <select value={selectedOptionListing} onChange={handleListingChange}>
                <option value="">-- Select an option --</option>
                <option value="ozanam">Ozanam</option>
                <option value="munroe">Munroe</option>
                <option value="lecompte">LeCompte</option>
                <option value="university">University</option>
                <option value="seton">Seton</option>
                <option value="corcoran">Corcoran</option>
              </select>

              <h4>Image</h4>
              <input type="file" accept="image/*" onChange={handleImageChange} />

              {/* Display image preview */}
              {imageInput && (
                <div>
                  <h4>Image Preview:</h4>
                  <img src={imageInput} alt="Preview" style={{ maxWidth: '300px', marginTop: '10px' }} />
                </div>
              )}

              <button style={{ display: 'block', margin: '10px auto', padding: '10px 20px', cursor: 'pointer' }}>
                Submit
              </button>
            </div>
          )}
          {/* Homepage */}
          {isHomepageVisible && (
            <div>
              <h1>Homepage</h1>
              <button onClick={() => setIsCreateListingVisible(true)}>Create Listing</button>
              <h2>Listings</h2>
            </div>
          )}
        </div>
      );
}

export default App;