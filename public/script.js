// Function to handle form submissions (Login and Question Attempt)
async function handleFormSubmit(event, url, dataToSend, successCallback, errorMessageElement) {
    event.preventDefault(); 
   
    errorMessageElement.textContent = '';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        const data = await response.json();

        if (response.ok) {
            successCallback(data); // Call the success callback if response is ok
        } else {
            // Display the error message from the backend
            errorMessageElement.textContent = data.message || 'Request failed';
        }
    } catch (error) {
        // Handle errors in case the backend request fails
        console.error('Error during request:', error); // Log the error
        errorMessageElement.textContent = 'An error occurred. Please try again.';
    }
}

// Login form handler
document.getElementById('login-form')?.addEventListener('submit', function (event) {


    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message'); 


     




    handleFormSubmit(event, 'http://localhost:5000/login', 
        { username, password }, 
        (data) => {
            // Store the JWT token in localStorage
            localStorage.setItem('token', data.token);

            // Optionally, store the role or other user details
            const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
            localStorage.setItem('role', decodedToken.role);
            localStorage.setItem('username', data.username); 
            localStorage.setItem('userId', decodedToken.userId);

           

           
          
            // Redirect to the home page or dashboard
            window.location.href = '../public/index.html';
        }, 
        errorMessage
    );
});

// Logout function
document.getElementById('logout-btn')?.addEventListener('click', function () {
    // Clear token and role from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');

    let usedQuestions = JSON.parse(localStorage.getItem('usedQuestions')) || [];

// Remove the last element from the array
usedQuestions.pop();

// Save the updated array back into localStorage
localStorage.setItem('usedQuestions', JSON.stringify(usedQuestions));

    // Optionally, redirect the user to the login page
    window.location.replace('../public/login.html'); // Replaces the current page with the login page
});

// Question form handler
document.getElementById('question-form')?.addEventListener('submit', function (event) {
    const userId = localStorage.getItem('userId');
    const questionId = document.getElementById('questionId').value.trim();
    const answer = document.getElementById('answer').value.trim();
    const errorMessage = document.getElementById('error-message'); 

    handleFormSubmit(event, 'http://localhost:5000/attempt', 
        { userId, questionId, answer }, 
        (data) => {
            // Optionally, display whether the answer was correct
            const resultMessage = data.isCorrect ? 'Correct answer!' : 'Wrong answer';
            alert(resultMessage); 
        },
        errorMessage
    );
});

