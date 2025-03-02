import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [data, setData] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [imageInput, setImageInput] = useState(null);
    const [isCreateListingVisible, setIsCreateListingVisible] = useState(false);
    const [isHomepageVisible, setIsHomepageVisible] = useState(false);
    const [selectedOptionListing, setSelectedOptionListing] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [listings, setListings] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);

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

    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
      setLastName(event.target.value);
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
            body: JSON.stringify({ email: inputValue, firstName, lastName })
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
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageInput(reader.result); // Set the base64 string as the image input
        };
        reader.readAsDataURL(file); // Convert the file to a base64 string
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

    const handleBuy = (index) => {
      setSelectedListing(listings[index]);
      setIsPopupVisible(true);
    };

    const handleConfirmPurchase = async () => {
      if (!selectedListing) return;

      console.log('handleConfirmPurchase called');
      console.log('Selected listing:', selectedListing);

      try {
        const response = await fetch('http://localhost:5000/buy-item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: inputValue, firstName, lastName, price: selectedListing.price })
        });

        if (response.ok) {
          console.log('Purchase confirmed');
          // Remove the listing from the state and local storage
          const updatedListings = listings.filter((listing) => listing !== selectedListing);
          setListings(updatedListings);
          localStorage.setItem('listings', JSON.stringify(updatedListings));
          setIsPopupVisible(false);
          console.log('Popup closed');
        } else {
          const error = await response.json();
          setErrorMessage(`❌ ${error.error}`);
          console.log('Purchase error:', error);
        }
      } catch (error) {
        setErrorMessage(`❌ Fetch error: ${error.message}`);
        console.log('Fetch error:', error);
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
      <div className="container">
      <header className="header">
        <h1>Dormmate</h1>
        <p className="tagline">The campus marketplace tailored for students</p>
      </header>

      {/* Login/Email Form */}
      {!isHomepageVisible && (
        <div className="form-container">
          <h3>Please enter your .edu email</h3>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your .edu email"
            className="input-field"
          />
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="Enter your first name"
            className="input-field"
          />
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Enter your last name"
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
              <option value="">-- Select an option --</option>
              <option value="ozanam">Ozanam</option>
              <option value="munroe">Munroe</option>
              <option value="lecompte">LeCompte</option>
              <option value="university">University</option>
              <option value="seton">Seton</option>
              <option value="corcoran">Corcoran</option>
            </select>
          </div>
          <button onClick={handleSubmit} className="button">
            Submit
          </button>
        </div>
      )}

      {/* Homepage with Listings */}
      {isHomepageVisible && (
        <div className="homepage">
          <div className="homepage-header">
            <h1 style={{ textAlign: 'center' }}>Homepage</h1>
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
                  <img src={listing.image} alt="Listing" className="listing-image" />
                )}
                <button onClick={() => handleBuy(index)} className="button buy-btn">
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Listing Modal */}
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

      {/* Purchase Confirmation Popup */}
      {isPopupVisible && selectedListing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Purchase</h2>
            <p>Title: {selectedListing.title}</p>
            <p>Price: ${selectedListing.price}</p>
            <p>Location: {selectedListing.location}</p>
            {selectedListing.image && (
              <img src={selectedListing.image} alt="Listing" className="listing-image" />
            )}
            <div className="modal-buttons">
              <button onClick={handleConfirmPurchase} className="button modal-btn">
                Confirm
              </button>
              <button
                onClick={() => setIsPopupVisible(false)}
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
}

export default App;
