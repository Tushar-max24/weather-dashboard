🌦️ Weather Dashboard Web Application

👨‍💻 Developed by

Tushar Sharma

🧠 Project Overview

The Weather Dashboard is a responsive web application built with React JS that allows users to view real-time weather conditions of multiple cities.
It integrates live weather data through the WeatherAPI.com API, displays forecast details, and provides interactive charts for temperature, precipitation, and wind speed.

The system also includes Google Authentication using Firebase, ensuring secure login and personalized user access.

🚀 Key Features

✅ Google Sign-In Authentication – Secure login using Firebase Auth.
✅ Real-Time Weather Data – Integrated with WeatherAPI for up-to-date information.
✅ Dashboard View – Displays current conditions for selected cities.
✅ City Detail View – Shows temperature, wind, and precipitation charts.
✅ Interactive Charts – Temperature, precipitation, and wind visualizations.
✅ Auto Refresh – Data automatically updates every 60 seconds.
✅ Logout Functionality – Ends session and redirects to login page.
✅ Responsive UI – Clean modern design, works across devices.

🛠️ Tech Stack
Category	Technology
Frontend	React JS, Redux Toolkit
Charts	Recharts
Authentication	Firebase Authentication (Google)
API	WeatherAPI.com
Styling	CSS3, Gradient UI
Routing	React Router DOM
⚙️ Setup Instructions

Clone the project

git clone https://github.com/Tushar-max24/weather-dashboard.git
cd weather-dashboard


Install dependencies

npm install


Add your Firebase credentials

Open src/firebaseConfig.js

Replace placeholder values with your Firebase project keys

Add your WeatherAPI key

Open src/pages/CityDetail.jsx

Replace YOUR_WEATHER_API_KEY with your actual API key from weatherapi.com

Run the project

npm start


Access the app

Visit: http://localhost:3000

Sign in using Google

Explore the dashboard and weather details

Deployed Link:

https://weather-dashboard-tushar.vercel.app