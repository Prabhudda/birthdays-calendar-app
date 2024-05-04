import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BirthdayContext = createContext();

export const BirthdayProvider = ({ children }) => {
  //To manage states
  const [selectedDate, setSelectedDate] = useState('');
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate) {
        setLoading(true);
        const year = new Date(selectedDate).getFullYear();
        const [month, day] = selectedDate.split('-').slice(1);

        try {
          const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`;
          const response = await axios.get(url);

          //filtered birthday of a person based on year,month and day
          const filteredBirthdays = response.data.births.filter(
            (birth) => birth.year === year
          );

          //filtered using day and month only
          setBirthdays(response.data.births);
        } catch (error) {
          console.error('Error fetching data:', error);
          setBirthdays([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //adding fav birthdays to list
  const addToFavorites = (birthday) => {
    const isAlreadyFavorite = favorites.find(
      (fav) => fav.pages[0].tid === birthday.pages[0].tid
    );

    if (!isAlreadyFavorite) {
      setFavorites((prevFavorites) => [...prevFavorites, birthday]);
    }
  };

  //Removing fav birthdays from list
  const removeFavorites = (birthday) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.pages[0].tid !== birthday.pages[0].tid)
    );
  };

  return (
    <BirthdayContext.Provider
      value={{
        selectedDate,
        birthdays,
        loading,
        handleDateChange,
        addToFavorites,
        favorites,
        removeFavorites,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export default BirthdayProvider;
