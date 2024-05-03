// BirthdayList.js
import React, { useContext } from 'react';
import { BirthdayContext } from '../BirthdayContext';
import { Link } from 'react-router-dom';
import Image from '../assets/default.jpg';
const BirthdayList = () => {
  const {
    selectedDate,
    birthdays,
    loading,
    handleDateChange,
    addToFavorites,
    favorites,
    removeFavorites,
  } = useContext(BirthdayContext);

  return (
    <div className=' '>
      <div className=' row bg-dark text-white py-3 align-items-center'>
        <h3 className='col-md-4 col-12 text-center mb-md-0 mb-4'>
          Birthdays Tracker
        </h3>
        <input
          type='date'
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className='rounded col-md-5 col-sm-5 col-5 py-md-2 py-1 mx-4'
          style={{
            cursor: 'pointer',
            border: '1px solid #ced4da',
            boxShadow: 'none',
          }}
        />
        <Link
          to='/favorites'
          className='col-md-1 col-sm-5 col-4 mx-md-3 mx-2 btn py-1 px-md-2 px-1 btn-outline-primary '
        >
          Favorites <span className='badge bg-success'>{favorites.length}</span>
        </Link>
      </div>

      <div className='container'>
        {loading ? (
          <div className='text-center mt-4'>
            <button className='btn btn-success px-3 py-1'>Loading...</button>
          </div>
        ) : (
          <div className=' row mt-5'>
            {selectedDate && birthdays.length === 0 && (
              <div className='text-center col'>Data Not found</div>
            )}
            {selectedDate &&
              birthdays.length !== 0 &&
              birthdays.map((birthday, index) => (
                <div key={index} className='col-lg-3 col-md-4 col-12 mb-5'>
                  <div className='d-flex flex-column justify-content-between h-100 border rounded'>
                    {birthday.pages && birthday.pages[0].thumbnail ? (
                      <img
                        src={birthday.pages[0].thumbnail.source}
                        alt=''
                        className='img-fluid'
                        style={{ height: '300px' }}
                      />
                    ) : (
                      <img
                        src={Image}
                        alt=''
                        className='img-fluid'
                        style={{ height: '300px' }}
                      />
                    )}

                    <div className='mt-3 px-3'>
                      <h6
                        className='fw-bold m-0'
                        style={{ wordWrap: 'break-word' }}
                      >
                        {birthday.pages[0].title}
                      </h6>
                      <p className='m-0'>{birthday.pages[0].description}</p>
                      <p className=''>Year : {birthday.year}</p>
                      <div className='mb-2'>
                        {favorites.find(
                          (fav) => fav.pages[0].tid === birthday.pages[0].tid
                        ) ? (
                          <div className=''>
                            <button
                              className='btn btn-danger w-100'
                              onClick={() => {
                                removeFavorites(birthday);
                              }}
                            >
                              Remove From Favorites
                            </button>
                          </div>
                        ) : (
                          <button
                            className='btn btn-primary w-100'
                            onClick={() => {
                              addToFavorites(birthday);
                            }}
                          >
                            Add to Favorites
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayList;
