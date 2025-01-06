function logoutbtn(){

}







const username = localStorage.getItem('username');
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');




document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    
    if (username) {
        document.getElementById('UserNam').innerHTML = "Hi, " + username.charAt(0).toUpperCase() + username.slice(1).toLowerCase(); // Capitalize first letter

    } else {
        console.log("Username not found in localStorage.");
        document.getElementById('UserNam').innerHTML ="Hi, User "; 
    }
});