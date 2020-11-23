# Iteration Project: hsdc-covid

## 1. What is the problem you’re solving?

COVID cases are rising a second time in the states, so individuals need a way to assess their COVID exposure risk based on their day to day activities

Create an application where users fill out a form, marking activities of varying risk levels for contracting COVID, the application will return the user a risk assessment score dependent on location and activities, providing them with testing sites nearby if their risk score is high

## 2. What is the solution?

Create an application where users fill out a form, marking activities of varying risk levels for contracting COVID, the application will return the user a risk assessment score dependent on location and activities, providing them with testing sites nearby if their risk score is high

## 3. What is the project you’re iterating on?

COVID-19 Risk Assessment

## 4. What is the MVP scope?

Adding a location input with the questionnaire to display risk potential based on the user’s location, suggesting nearby testing sites. Have users login so they have the ability to save their risk assessment on a day by day case, where an overall score is given after a set period of time and have that score be compared with other users in the area.

- Getting a user’s location and showing nearby testing sites with Google API
- Adding login page and holding individual user information in a database / tracking users over multiple days, etc - display on graph
- Cross referencing the covid data in their geographic area using COVID-19 Data Tracking API

## 5. What are the tough technical challenges involved with solving this problem?

Pulling external APIs to work with the core features we want to provide, searching through the API data to provide the cross referencing COVID data to the user, setting authentication for each user

## 6. What are the stretch goals?

Google OAuth, implementing social media feed with each user
