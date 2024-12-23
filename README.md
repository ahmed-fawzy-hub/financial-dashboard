# Financial Dashboard

## Project Overview
A web application built using Angular to display financial instruments with features like lazy loading, caching, and state management (NgRx).

## Features
- Display financial instruments (Stocks, ETFs, Cryptocurrencies, etc.).
- Lazy loading with pagination.
- Caching to improve performance.
- Fully responsive UI/UX.
- Dockerized setup for easy deployment.

## Directory Structure
<include the directory structure here> ```
Technologies Used
Angular
NgRx (State Management)
RxJS
Docker and Docker Compose
Bootstrap (Styling)
Nginx (Web Server)
Setup Instructions
Clone the repository:

bash
git clone https://github.com/your-username/financial-dashboard.git
cd financial-dashboard
Install dependencies:

bash
npm install
Run the development server:

bash
ng serve
Build the production version:

bash
ng build --prod
Run the Docker container:

bash

docker-compose up
Access the app at:


http://localhost:8080