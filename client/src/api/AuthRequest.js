import axios from "axios"

const API =  axios.create({baseURL:'http://localhost:6500'})

export const logIn = (formData)=> API.post('/auth/login',formData);
export const signUp = (formData)=> API.post('/auth/register',formData);

// export const signUp = (formData) => 
//     API.post('/auth/register', formData)
//       .then(response => response)
//       .catch(error => {
//         console.error('Error logging in:', error.response || error);
//         throw error;
//       });