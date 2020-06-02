import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Navbar({ isAuth, setIsAuth }) {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function logout() {
    fetch(`http://${window.location.hostname}/api/users/logout`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => {
        if (res.ok) {
          setIsAuth(false);
        }
      })
      .catch(err => {
        console.log("Could not log out");
      });
  }

  function fetchWeather() {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=Copenhagen&units=metric&appid=0a5360816d088e6a4221a5e7c069ce29`;
    fetch(weatherURL)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        console.log("dsadadsasddsa", data);
        setWeather(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log("Could not log out");
      });
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <nav>
      <p className="nav-logo">Blogger</p>
      {!isLoading ? (
        <p className="weather">Temperature: {weather.main.temp} °C</p>
      ) : null}
      <ul>
        <NavLink exact to="/">
          Posts
        </NavLink>
        {isAuth ? (
          <React.Fragment>
            <NavLink to="/create-post">Create Post</NavLink>
            <NavLink to="/" onClick={logout}>
              Logout
            </NavLink>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
}
