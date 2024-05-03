import React, { useContext } from 'react';
import { BirthdayContext } from '../BirthdayContext';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Image from '../assets/default.jpg';

function Favorites() {
  //using context
  const { favorites, removeFavorites } = useContext(BirthdayContext);

  return (
    <div className='mt-0'>
      <h3 className='text-center bg-dark text-white  py-3'>
        Favourite Birthdays
      </h3>
      <div className='container'>
        <div className='mt-4'>
          <Link to='/' className=''>
            <FaArrowLeft size={25} />
          </Link>
        </div>
        <div className=' row mt-4'>
          {favorites.length === 0 ? (
            <h6 className='text-center'>No Favorites Found</h6>
          ) : (
            favorites.map((fav, index) => (
              <div key={index} className='col-lg-3 col-md-4 col-12 mb-5'>
                <div className='d-flex flex-column justify-content-between h-100 border rounded'>
                  {fav.pages[0].thumbnail && fav.pages[0].thumbnail.source ? (
                    <img
                      src={fav.pages[0].thumbnail.source}
                      alt=''
                      className='img-fluid'
                      style={{ maxHeight: '300px' }}
                    />
                  ) : (
                    <img
                      src={Image}
                      alt=''
                      className='img-fluid'
                      style={{ maxHeight: '300px' }}
                    />
                  )}

                  <div className='mt-3 px-3'>
                    <h5 className='fw-bold' style={{ wordWrap: 'break-word' }}>
                      {fav.pages[0].title}
                    </h5>
                    <p className='m-0'>{fav.pages[0].description}</p>
                    <p className=''>Year : {fav.year}</p>
                    <div className='mb-2'>
                      <button
                        className='btn btn-danger w-100'
                        onClick={() => {
                          removeFavorites(fav);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
