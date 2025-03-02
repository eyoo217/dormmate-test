import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
<<<<<<< HEAD
  const [data, setData] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [imageInput, setImageInput] = useState(null);
  const [isCreateListingVisible, setIsCreateListingVisible] = useState(false);
  const [isHomepageVisible, setIsHomepageVisible] = useState(false);
  const [selectedOptionListing, setSelectedOptionListing] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (!hasFetched) {
      fetchData();
      setHasFetched(true);
    }
    const storedListings = JSON.parse(localStorage.getItem('listings'));
    if (storedListings) {
      setListings(storedListings);
    }
  }, [hasFetched]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/customer');
      if (response.ok) {
        const jsonRes = await response.json();
        console.log('Fetched data:', jsonRes);
        setData(jsonRes);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/.test(email);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setErrorMessage('');
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleListingChange = (event) => {
    setSelectedOptionListing(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = () => {
    if (!validateEmail(inputValue)) {
      setErrorMessage('❌ Please enter a valid .edu email.');
    } else if (validateEmail(inputValue) && selectedOption === '') {
      setErrorMessage('✅ Email successfully submitted!');
    } else if (validateEmail(inputValue) && selectedOption !== '') {
      setIsHomepageVisible(true);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the first file
    if (file) {
      setImageInput(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleListingSubmit = () => {
    const newListing = {
      title,
      price,
      location: selectedOptionListing,
      image: imageInput,
    };

    const updatedListings = [...listings, newListing];
    setListings(updatedListings);
    localStorage.setItem('listings', JSON.stringify(updatedListings));

    // Clear form fields
    setTitle('');
    setPrice('');
    setSelectedOptionListing('');
    setImageInput(null);
    setIsCreateListingVisible(false);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Dormmate</h1>
        <p className="tagline">The campus marketplace tailored for students</p>
      </header>

      {!isHomepageVisible ? (
        <div className="form-container">
          <h3>Enter your .edu email</h3>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Your .edu email"
            className="input-field"
          />
          {errorMessage && (
            <p className={errorMessage.includes('❌') ? 'error' : 'success'}>
              {errorMessage}
            </p>
          )}
          <div className="dropdown-container">
            <h3>Select Dorm Building:</h3>
            <select
              value={selectedOption}
              onChange={handleChange}
              className="select-field"
            >
=======
    const [data, setData] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [imageInput, setImageInput] = useState(null);
    const [isCreateListingVisible, setIsCreateListingVisible] = useState(false);
    const [isHomepageVisible, setIsHomepageVisible] = useState(false);
    const [selectedOptionListing, setSelectedOptionListing] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [listings, setListings] = useState([]);

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

    const validateEmail = (email) => {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/.test(email);
    };

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
      setErrorMessage(''); // Clear error message when typing
    };

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleListingChange = (event) => {
      setSelectedOptionListing(event.target.value);
    };

    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };

    const handlePriceChange = (event) => {
      setPrice(event.target.value);
    };

    const handleSubmit = async () => {
      console.log('handleSubmit called');
      if (!validateEmail(inputValue)) {
        setErrorMessage('❌ Please enter a valid .edu email.');
      } else if (validateEmail(inputValue) && selectedOption === '') {
        setErrorMessage('✅ Email successfully submitted!');
      } else if (validateEmail(inputValue) && selectedOption !== '') {
        try {
          console.log('Sending request to /submit-email');
          const response = await fetch('http://localhost:5000/submit-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: inputValue })
          });

          if (response.ok) {
            const result = await response.json();
            console.log('Email submission result:', result);
            setIsHomepageVisible(true);
          } else {
            const error = await response.json();
            setErrorMessage(`❌ ${error.error}`);
          }
        } catch (error) {
          setErrorMessage(`❌ Fetch error: ${error.message}`);
        }
      }
    };

    const handleImageChange = (event) => {
      const file = event.target.files[0]; // Get the first file
      if (file) {
        setImageInput(URL.createObjectURL(file)); // Create a preview URL
      }
    };

    const handleListingSubmit = () => {
      const newListing = {
        title,
        price,
        location: selectedOptionListing,
        image: imageInput
      };

      const updatedListings = [...listings, newListing];
      setListings(updatedListings);
      localStorage.setItem('listings', JSON.stringify(updatedListings));

      // Clear form fields
      setTitle('');
      setPrice('');
      setSelectedOptionListing('');
      setImageInput(null);
      setIsCreateListingVisible(false);
    };

    const handleBuy = async (index) => {
      const listing = listings[index];
      try {
        const response = await fetch('http://localhost:5000/buy-item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: inputValue, price: listing.price })
        });

        if (response.ok) {
          // Remove the listing from the state and local storage
          const updatedListings = listings.filter((_, i) => i !== index);
          setListings(updatedListings);
          localStorage.setItem('listings', JSON.stringify(updatedListings));
        } else {
          const error = await response.json();
          setErrorMessage(`❌ ${error.error}`);
        }
      } catch (error) {
        setErrorMessage(`❌ Fetch error: ${error.message}`);
      }
    };

    useEffect(() => {
      if (!hasFetched) {
        fetchData();
        setHasFetched(true);
      }

      const storedListings = JSON.parse(localStorage.getItem('listings'));
      if (storedListings) {
        setListings(storedListings);
      }
    }, [hasFetched]);

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
              value={title}
              onChange={handleTitleChange}
              placeholder="Title"
              style={{ display: 'block', margin: '0 auto', padding: '8px', width: '250px' }}
            />

            <h4>Price $</h4>
            <input
              type="number"
              value={price}
              onChange={handlePriceChange}
              placeholder="Price $"
              style={{ display: 'block', margin: '0 auto', padding: '8px', width: '250px' }}
            />

            <h4>Location</h4>
            <select value={selectedOptionListing} onChange={handleListingChange}>
>>>>>>> 6c59760572861f59c1740ab626a3ebd41357b0f6
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

            <button
              onClick={handleListingSubmit}
              style={{ display: 'block', margin: '10px auto', padding: '10px 20px', cursor: 'pointer' }}
            >
              Submit
            </button>
          </div>
<<<<<<< HEAD
          <button onClick={handleSubmit} className="button">
            Submit
          </button>
        </div>
      ) : (
        <div className="homepage">
          <div className="homepage-header">
            <h1>Homepage</h1>
            <button
              className="button create-btn"
              onClick={() => setIsCreateListingVisible(true)}
            >
              Create Listing
            </button>
          </div>
          <h2>Listings</h2>
          <div className="listings">
            {listings.map((listing, index) => (
              <div key={index} className="listing-card">
                <h3>{listing.title}</h3>
                <p>Price: ${listing.price}</p>
                <p>Location: {listing.location}</p>
                {listing.image && (
                  <img
                    src={listing.image}
                    alt="Listing"
                    className="listing-image"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isCreateListingVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create a Listing</h2>
            <div className="modal-form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Title"
                className="input-field"
              />
            </div>
            <div className="modal-form-group">
              <label>Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={handlePriceChange}
                placeholder="Price $"
                className="input-field"
              />
            </div>
            <div className="modal-form-group">
              <label>Location</label>
              <select
                value={selectedOptionListing}
                onChange={handleListingChange}
                className="select-field"
              >
                <option value="">-- Select an option --</option>
                <option value="ozanam">Ozanam</option>
                <option value="munroe">Munroe</option>
                <option value="lecompte">LeCompte</option>
                <option value="university">University</option>
                <option value="seton">Seton</option>
                <option value="corcoran">Corcoran</option>
              </select>
            </div>
            <div className="modal-form-group">
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input-field"
              />
            </div>
            {imageInput && (
              <div className="modal-form-group">
                <label>Image Preview:</label>
                <img src={imageInput} alt="Preview" className="image-preview" />
              </div>
            )}
            <div className="modal-buttons">
              <button onClick={handleListingSubmit} className="button modal-btn">
                Submit
              </button>
              <button
                onClick={() => setIsCreateListingVisible(false)}
                className="button modal-btn cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
=======
        )}

        {/* Homepage */}
        {isHomepageVisible && (
          <div>
            <h1>Homepage</h1>
            <button onClick={() => setIsCreateListingVisible(true)}>Create Listing</button>
            <h2>Listings</h2>
            {listings.map((listing, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
                <h3>{listing.title}</h3>
                <p>Price: ${listing.price}</p>
                <p>Location: {listing.location}</p>
                {listing.image && <img src={listing.image} alt="Listing" style={{ maxWidth: '200px' }} />}
                <button onClick={() => handleBuy(index)}>Buy</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
>>>>>>> 6c59760572861f59c1740ab626a3ebd41357b0f6
}

export default App;
