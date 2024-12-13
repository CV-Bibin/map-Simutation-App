// For any Relevance Rating of Good or below, you must select the appropriate check box(es) to
// indicate the reason(s)for demotion: User Intent and/or Distance/Prominence. If both reasons apply,
// use both checkboxes.


// Query is "Agra" then the result Taj Mahal must have the Relevance Good (User Intent) since Result is for a prominent site in the queried
// locality. The Taj Mahal does not satisfy the user’s
// primary intent. However, it is promoted to
// secondary intent due to the international
// prominence of the feature in the queried locality.( if the query is  address and the result is either transit station like railway station or airport bus stand (but not bus stop) or international
// prominence feature  can only give the relevance of "good".

// When a query address and a result address are not exactly the same, the kind of connection they
// have depends on their relationship:
// • Street number is the same in both query and result but the unit number is different or missing:
// • If neither address is a street extension, rate result relevance Good when:
// ▪ The query contains a unit number and the result does not.
// ▪ The result contains a unit number and the query does not.
// ▪ The query contains one unit number and the result contains another.
// • The query is full address including street number and name and the result is the street name
// only:
// • Since this result is an unlikely secondary intent, rate relevance as Acceptable.
// • Query is for a street [Main Street, Pleasanton, CA] result is just the locality (Pleasanton, CA).
// • Rate the result relevance Bad as it does not satisfy the user intent.

// Store login credentials in this object (in a real app, store hashed passwords and use proper authentication)
// Define user credentials (admin and three regular users)
const users = [
    { username: 'bibin', password: 'admin123', role: 'admin' },
    { username: 'vivek', password: 'vivek@1995', role: 'user' },
    { username: 'sarath', password: 'sarath123', role: 'user' },
    { username: 'user2', password: 'user234', role: 'user' },
    { username: 'user3', password: 'user345', role: 'user' }
];


const sessionExpiryTime = 10 * 60 * 60 * 1000; 


window.onload = function () {
   
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault(); 
    });

    // Check login status
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginTimestamp = localStorage.getItem('loginTimestamp');

    // If the user is logged in, check if the session has expired
    if (isLoggedIn && loginTimestamp) {
        const currentTime = new Date().getTime();
        const timeElapsed = currentTime - loginTimestamp;

        // If 10 hours have passed, log out the user
        if (timeElapsed >= sessionExpiryTime) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('role');
            localStorage.removeItem('loginTimestamp');
            alert('Session expired. Please log in again.');
            window.location.href = '/login.html'; // Redirect to login page after session expiry
            return;
        }
    }

    // If the user is not logged in and they are on the index.html page, redirect to login
    if (!isLoggedIn && window.location.pathname !== '/login.html') {
        window.location.href = '/login.html'; // Redirect to login if not logged in
    }

    // Optionally, you can check the role and display different content based on the user type
    const userRole = localStorage.getItem('role');
    console.log('Logged in as:', userRole); // This will log either 'admin' or 'user'
};

// Handle login form submission on login.html
document.getElementById('login-form')?.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Find the user from the users array
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // If user is found, set login status and role in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', user.role); // Store the role (admin/user)
        localStorage.setItem('loginTimestamp', new Date().getTime()); // Store the login timestamp
        window.location.href = '/index.html'; // Redirect to index.html after successful login
    } else {
        // If user credentials don't match, alert the user
        alert('Invalid username or password');
    }
});
