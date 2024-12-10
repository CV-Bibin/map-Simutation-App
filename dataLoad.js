
let currentQuestion = null;

var countQstn=0;


let errorCount = {
    Relevance: 0,
    NameAccuracy: 0,
    AddressAccuracy: 0,
    PinAccuracy: 0,
};

function resetting() {
    let relper = (((countQstn - errorCount.Relevance) / countQstn) * 100).toFixed(1);
    let relname = (((countQstn - errorCount.NameAccuracy) / countQstn) * 100).toFixed(1);
    let reladdrss = (((countQstn - errorCount.AddressAccuracy) / countQstn) * 100).toFixed(1);
    let relpin = (((countQstn - errorCount.PinAccuracy) / countQstn) * 100).toFixed(1);

    // Create HTML content with Tailwind CSS classes
    const resultHTML = `
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Accuracy Results</h2>
            <p class="text-lg text-gray-700"><strong class="text-blue-600">Relevance:</strong> ${relper} %</p>
            <p class="text-lg text-gray-700"><strong class="text-blue-600">Name Accuracy:</strong> ${relname} %</p>
            <p class="text-lg text-gray-700"><strong class="text-blue-600">Address Accuracy:</strong> ${reladdrss} %</p>
            <p class="text-lg text-gray-700"><strong class="text-blue-600">Pin Accuracy:</strong> ${relpin} %</p>
        </div>
    `;

    // Set the innerHTML of the div with the id 'result'
    document.getElementById('result').innerHTML = resultHTML;
}




fetch('data/questions.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch questions data');
        }
        return response.json();
    })
    .then(data => {
        let usedQuestions = [];

        // Function to get a random unique question
        function getUniqueQuestion() {
            let randmNum;
            do {
                randmNum = Math.floor(Math.random() * data.questions.length);
            } while (usedQuestions.includes(randmNum));
            usedQuestions.push(randmNum);
            return data.questions[randmNum];
        }

        // Function to update the page with a new question
        function updateQuestion() {
            const question = getUniqueQuestion();

            currentQuestion = question;

            // Update Answers
            document.getElementById('RelevanceAnswer').value = question.correctAnswers.Relevance;
            document.getElementById('NameAccuracyAnswer').value = question.correctAnswers.NameAccuracy;
            document.getElementById('AddressAccuracyAnswer').value = question.correctAnswers.AddressAccuracy;
            document.getElementById('PinAccuracyAnswer').value = question.correctAnswers.PinAccuracy;




            // Update iframe source
            document.querySelector('.map-section iframe').src = question.iframesrc;

            // Update other details
            document.getElementById('Querylocale').textContent = question.queryLocale;
            document.getElementById('Query').textContent = question.query;
            document.getElementById('Viewportage').textContent = question.viewportAge;

            // Set color based on viewport age
            document.getElementById('Viewportage').style.color = question.viewportAge === "Stale" ? "red" : "green";

            // Set business information
            const business = question.business;
            document.getElementById('ResultName').textContent = business.name;
            document.getElementById('ResultNameBG').style.backgroundColor = getBusinessColor(business.name);
            const tableRows = document.querySelectorAll('.info-section table tbody tr');
            tableRows[0].querySelector('td:nth-child(2)').textContent = business.address;
            tableRows[1].querySelector('td:nth-child(2)').textContent = business.classification;
            tableRows[2].querySelector('td:nth-child(2)').textContent = business.distanceToUser;
            tableRows[3].querySelector('td:nth-child(2)').textContent = business.distanceToViewport;
            tableRows[4].querySelector('td:nth-child(2)').textContent = business.latLng;
        }

        // Function to determine business color based on the name
        function getBusinessColor(name) {
            const firstLetter = name[0];
            switch (firstLetter) {
                case '1': return "rgba(255, 0, 0, 0.8)";
                case '2': return "rgba(40, 175, 26, 0.8)";
                case '3': return "rgba(57, 176, 222, 0.8)";
                default: return "rgba(206, 176, 41, 0.8)";
            }
        }

        // Initial question setup
        updateQuestion();

        // Event listener for the "Next Question" button
        document.getElementById('next-btn').addEventListener('click', () => {
            resetPreviousChanges();
            otherFeatureReset()
            document.getElementById("rate-btn").disabled = false;
            document.getElementById('next-btn').disabled = true;

            function otherFeatureReset() {
                document.getElementById('address-issues').style.display = "none";

                document.getElementById('naviyes').style.backgroundColor = "";
                document.getElementById('navino').style.backgroundColor = "";
                document.getElementById('unexpected-language').style.backgroundColor = "";
                document.getElementById('unexpected-language').style.border = "2px solid white";
                document.getElementById('POI-closed').style.backgroundColor = "";
                document.getElementById('POI-closed').style.border = "2px solid white";
                document.getElementById('userintent').style.border = "2px solid white";
                document.getElementById('distance-rep').style.border = "2px solid white";
                document.getElementById('comments').value = "";

                document.getElementById('ad0').style.border = "2px solid white";
                document.getElementById('ad1').style.border = "2px solid white";
                document.getElementById('ad2').style.border = "2px solid white";
                document.getElementById('ad3').style.border = "2px solid white";
                document.getElementById('ad4').style.border = "2px solid white";
                document.getElementById('ad5').style.border = "2px solid white";
                document.getElementById('ad6').style.border = "2px solid white";
                document.getElementById('ad7').style.border = "2px solid white";
                document.getElementById('ad8').style.border = "2px solid white";
                document.getElementById('ad9').style.border = "2px solid white";
                document.getElementById('ad10').style.border = "2px solid white";
                countQstn++;
document.getElementById('rating-value').innerHTML=countQstn;
                
                



                // Get all the select elements
                const disableOptions = document.querySelectorAll('#NameAccuracy, #AddressAccuracy, #PinAccuracy');

                // Loop over each select element and set the disabled property
                disableOptions.forEach(option => {
                    option.disabled = false;
                });

                const radios = document.querySelectorAll('input[type="radio"]');
                const checkboxes = document.querySelectorAll('input[type="checkbox"]');

                // Iterate over each radio button and uncheck it
                radios.forEach(radio => {
                    radio.checked = false;
                });

                // Iterate over each checkbox and uncheck it
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });

            }


            setTimeout(() => {
                if (usedQuestions.length < data.questions.length) {
                    updateQuestion();



                } else {
                    document.getElementById('next-btn').disabled = true;
                    document.getElementById('rate-btn').disabled = true;
                    alert('No more questions !');
                    resetting();
                     
                    
                }
            }, 1000);
        });

        // Enable the "Next Question" button
        document.getElementById('next-btn').disabled = false;
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

// Function to reset previous changes
function resetPreviousChanges() {
    document.querySelectorAll('select').forEach(select => {
        select.classList.remove('select-error');
        select.selectedIndex = 0;
    });

    document.querySelectorAll('input').forEach(input => input.style.backgroundColor = '');

    // Hide cloned answer divs
    document.querySelectorAll('.Relevance-Answer, .NameAccuracy-Answer, .AddressAccuracy-Answer, .PinAccuracy-Answer')
        .forEach(div => div.classList.add('hidden'));
}

// Event listener for toggling address accuracy issues visibility
document.addEventListener('DOMContentLoaded', function () {
    const addressAccuracySelect = document.getElementById('AddressAccuracy');
    const addressIssuesDiv = document.getElementById('address-issues');

    addressAccuracySelect.addEventListener('change', () => {
        addressIssuesDiv.style.display = (addressAccuracySelect.value === 'Incorrect') ? 'block' : 'none';
    });


    addressIssuesDiv.style.display = (addressAccuracySelect.value === 'Incorrect') ? 'block' : 'none';
});

// Function to check answers 
function checkAsnwr() {
    document.getElementById('address-issues').style.display = "block";







    if (!isNavigationSelected()) {
        alert('Please select "yes" or "no" for navigational result avilability ');
        return;
    }
    function isNavigationSelected() {
        const navYes = document.getElementById('nav-y');
        const navNo = document.getElementById('nav-n');
        return navYes.checked || navNo.checked;
    }


    document.getElementById("rate-btn").disabled = true;

    const sections = [
        { selectId: 'Relevance', inputClass: '.Relevance-Answer input' },
        { selectId: 'NameAccuracy', inputClass: '.NameAccuracy-Answer input' },
        { selectId: 'AddressAccuracy', inputClass: '.AddressAccuracy-Answer input' },
        { selectId: 'PinAccuracy', inputClass: '.PinAccuracy-Answer input' },
    ];
    
    sections.forEach(section => {
        const selectElement = document.getElementById(section.selectId);
        const inputElement = document.querySelector(section.inputClass);
    
        if (selectElement.value !== inputElement.value) {
            selectElement.classList.add('select-error');
            errorCount[section.selectId] ++;  // Increment error count to 1 if mismatch
        } else {
            selectElement.classList.remove('select-error');
            errorCount[section.selectId] + 0;  // Set to 0 if no error
        }
        
        inputElement.style.backgroundColor = 'lightgreen';  // Keep your style unchanged
    });
    
    console.log(errorCount);

    // Show cloned answer divs
    document.querySelectorAll('.Relevance-Answer, .NameAccuracy-Answer, .AddressAccuracy-Answer, .PinAccuracy-Answer')
        .forEach(div => div.classList.remove('hidden'));


    // Enable "Next Question" button
    document.getElementById('next-btn').disabled = false;


    // var nosRelevanceProblm=




    if (currentQuestion.radioAnswers.relevanceReason.length === 0) {
        if (document.getElementById('user-intent').checked) {
            document.getElementById('userintent').style.border = "2px solid red";

        }
        else if (document.getElementById('distance').checked) {
            document.getElementById('distance-rep').style.border = "2px solid red";
        }

    } else if (currentQuestion.radioAnswers.relevanceReason.length === 1) {
        if (currentQuestion.radioAnswers.relevanceReason[0] == "userintent") {
            document.getElementById('userintent').style.border = "2px solid lightgreen";

            if (document.getElementById('distance').checked) {
                document.getElementById('distance-rep').style.border = "2px solid red";
            }
        }
        else {
            document.getElementById('distance-rep').style.border = "2px solid lightgreen";
            if (document.getElementById('user-intent').checked) {
                document.getElementById('userintent').style.border = "2px solid red";
            }
        }
    }
    else {
        document.getElementById('userintent').style.border = "2px solid lightgreen";
        document.getElementById('distance-rep').style.border = "2px solid lightgreen";
    }


    document.getElementById('comments').value = currentQuestion.correctAnswers.comments;



    //result selected good and below need to check checkbox
    const addressReasons = currentQuestion.radioAnswers.addressReason;


    for (i = 0; i <= 10; i++) {
        for (j = 0; j <= addressReasons.length; j++) {

            if (addressReasons.length >= 1) {
                if (document.querySelector(`.ad${i}`).id == addressReasons[j]) {
                    document.getElementById(`ad${i}`).style.border = "2px solid lightgreen";
                }


            }
            else {
                if (document.querySelector(`.ad${i}`).checked) {
                    document.getElementById(`ad${i}`).style.border = "2px solid red";
                }
            }



        }


    }






    if (currentQuestion.radioAnswers.unexpectedlanguage == "yes") {

        if (document.getElementById('language').checked) {
            document.getElementById('unexpected-language').style.backgroundColor = "rgba(40, 175, 26, 0.8";
        }
        else {
            document.getElementById('unexpected-language').style.border = "2px solid green";
        }
    }
    else {
        if (document.getElementById('language').checked) {
            document.getElementById('unexpected-language').style.backgroundColor = "red";
        }

    }




    if (currentQuestion.radioAnswers.POIclosed == "yes") {



        if (document.getElementById('closure').checked) {

            document.getElementById('POI-closed').style.backgroundColor = "rgba(40, 175, 26, 0.8";
        }
        else {
            document.getElementById('POI-closed').style.border = "2px solid green";
        }
    }
    else {
        if (document.getElementById('closure').checked) {

            document.getElementById('POI-closed').style.backgroundColor = "red";
        }

    }




    // Now check the Navigation answers
    const navYes = document.getElementById('nav-y');
    const navNo = document.getElementById('nav-n');



    // Check the navigation answer for "Yes"
    if (currentQuestion) {



        if (currentQuestion.correctAnswers.Navigation == 'nav-yes') {
            document.getElementById('naviyes').style.backgroundColor = "rgba(40, 175, 26, 0.8)";
        } else if (currentQuestion.correctAnswers.Navigation == 'nav-no') {
            document.getElementById('navino').style.backgroundColor = "rgba(40, 175, 26, 0.8)";
        }


        if (navYes.checked) {
            if (navYes.value == currentQuestion.correctAnswers.Navigation) {

            } else {
                document.getElementById('naviyes').style.backgroundColor = "red";
            }
        }


        if (navNo.checked) {
            if (navNo.value == currentQuestion.correctAnswers.Navigation) {

            } else {
                document.getElementById('navino').style.backgroundColor = "red";
            }
        }
    }




}

const closedbox = document.getElementById('closure');
const disableOptions = document.querySelectorAll('#NameAccuracy, #AddressAccuracy, #PinAccuracy'); // Corrected querySelectorAll

// Function to toggle the disable state of select options based on checkbox state
closedbox.addEventListener('change', function () {
    disableOptions.forEach(option => {
        if (closedbox.checked) {
            option.disabled = true;
        } else {
            option.disabled = false;
        }
    });
});
