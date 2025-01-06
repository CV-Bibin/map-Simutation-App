
let usedQuestions = JSON.parse(localStorage.getItem('usedQuestions')) || [];

let errorCount = JSON.parse(localStorage.getItem('errorCount')) || {
    Relevance: 0,
    NameAccuracy: 0,
    AddressAccuracy: 0,
    PinAccuracy: 0
};

// Display the object as a string (for clarity)
document.getElementById('errorItem').innerHTML = JSON.stringify(errorCount, null, 2);

// Assign the value of usedQuestions to the 'profile-wrong' element
document.getElementById('profile-wrong').textContent = usedQuestions.join(", ");
document.getElementById('total-atqstns').innerHTML = usedQuestions.length;  

// Function to load users from the backend API
async function loadUsers() {
    const errorMessage = document.getElementById('error-message');
    const tableBody = document.getElementById('users-table').getElementsByTagName('tbody')[0];

    // Clear previous content
    tableBody.innerHTML = '';
    errorMessage.textContent = '';

    try {
        const response = await fetch('http://localhost:5000/api/users');  // Adjust the URL if needed
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        const users = data.users;

        // Filter users with the role 'user' and populate the table
        users.filter(user => user.role === 'user').forEach(user => {
            const row = tableBody.insertRow();
            row.classList.add('hover:bg-gray-100', 'cursor-pointer');
            row.onclick = () => viewUserProfile(user);  // Set onclick to view user profile
            
            row.insertCell(0).textContent = user.username;
            row.insertCell(1).textContent = user.role;
            row.insertCell(2).textContent = new Date(user.createdAt).toLocaleString();
        });
    } catch (error) {
        errorMessage.textContent = 'Error loading users: ' + error.message;
    }
}

// Function to view user profile and display in the right section
function viewUserProfile(user) {
    // Show the right section
    const userDetailsSection = document.getElementById('user-details');
    userDetailsSection.classList.remove('hidden');  // Show the section
    
    document.getElementById('profile-username').textContent = user.username;
    document.getElementById('profile-role').textContent = user.role;
    // document.getElementById('total-atqstns').textContent = user.total_attempted_questions || 'N/A';  // Example field
    document.getElementById('total-wrong').textContent = user.total_wrong_answers || 'N/A';  // Example field
    document.getElementById('profile-relevance').textContent = user.relevance_accuracy || 'N/A';  // Example field
    document.getElementById('profile-name').textContent = user.name_accuracy || 'N/A';  // Example field
    document.getElementById('profile-address').textContent = user.address || 'N/A';  // Example field
    document.getElementById('profile-pin').textContent = user.pin_accuracy || 'N/A';  // Example field
}

// Load users on page load
window.onload = loadUsers;
function restting(){
    // Reset usedQuestions to an empty array
localStorage.setItem('usedQuestions', JSON.stringify([]));
alert("user data resetting")

}