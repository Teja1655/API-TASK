// function toggleForm() {
//     let jobForm = document.getElementById('jobForm');
//     let headerContent = document.querySelector(".header-content");
//     let addNewCardBtn = document.getElementById('addNewCardBtn');

//     if (jobForm.style.display === 'none' || jobForm.style.display === '') {
//         jobForm.style.display = 'block';
//         addNewCardBtn.style.display = 'none';

//         document.getElementById('addNewCardBtn').style.display = 'none';
//         headerContent.style.display = "none"; 
//     } else {
//         jobForm.style.display = 'none';
//         headerContent.style.display = "flex";
//         addNewCardBtn.style.display = 'block';
//     }
// }

// document.getElementById('jobCreationForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Validation
//     let expMin = document.querySelector('input[name="exp_min"]').value;
//     let expMax = document.querySelector('input[name="exp_max"]').value;
//     let salMin = document.querySelector('input[name="sal_min"]').value;
//     let salMax = document.querySelector('input[name="sal_max"]').value;

//     if (parseInt(expMin) > parseInt(expMax)) {
//         console.log("Minimum experience should not be greater than maximum experience.");
//         alert("Minimum experience should not be greater than maximum experience.");
//         return;
//     }
    
//     if (parseInt(salMin) > parseInt(salMax)) {
//         console.log("Minimum salary should not be greater than maximum salary.");
//         alert("Minimum salary should not be greater than maximum salary.");
//         return;
//     }


//     let formData = new FormData(event.target);
//     let object = {};
//     formData.forEach(function(value, key) {
//         object[key] = value;
//     });
//     let json = JSON.stringify(object);


//     console.log("JSON Form Data:", json);

    
//     fetch('https://6530d94e6c756603295f269f.mockapi.io/jobs', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: json
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("Job creation response:", data);
//         alert("Job successfully created!");
        

//         addJobCardToDOM(object);
        
//         toggleForm();
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     });
// });

// function addJobCardToDOM(data) {
//     let card = document.createElement('div');
//     card.innerHTML = `
//         <img src="./assets/Rectangle 1965.png" alt="Company Logo">
//         <h3>${data.job_title}</h3>
//         <p>${data.company_name} - ${data.industry}</p>
//         <p>${data.location} (${data.remote_type})</p>
//         <p>Experience: ${data.exp_min} - ${data.exp_max} years</p>
//         <p>Salary: INR ${data.sal_min} - ${data.sal_max} / Month</p>
//         <p>${data.total_emp} employees</p>
//         <button id="button3">Apply Now</button>
//     `;

//     card.style.border = "1px solid #ccc";
//     card.style.padding = "15px";
//     card.style.marginTop = "20px";
    
//     document.body.appendChild(card);
// }




function toggleForm() {
    let jobForm = document.getElementById('jobForm');

    let jobCardsContainer = document.getElementById('jobs-container');

    let headerContent = document.querySelector(".header-content");
    let addNewCardBtn = document.getElementById('addNewCardBtn');

    if (jobForm.style.display === 'none' || jobForm.style.display === '') {
        jobForm.style.display = 'block';

        jobCardsContainer.style.display = 'none';

        headerContent.style.display = "none"; 
        addNewCardBtn.style.display = 'none';
    } else {
        jobForm.style.display = 'none';

        jobCardsContainer.style.display = 'block'; 

        headerContent.style.display = "flex";
        addNewCardBtn.style.display = 'block';
    }
}

document.getElementById('jobCreationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!validateForm()) return;

    let formData = new FormData(event.target);
    let object = {};
    formData.forEach(function(value, key) {
        object[key] = value;
    });
    let json = JSON.stringify(object);

    fetch('https://6530d94e6c756603295f269f.mockapi.io/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
    .then(response => response.json())
    .then(data => {
        console.log("Job creation response:", data);
        alert("Job successfully created!");
        addJobCardToDOM(object);
        saveJobData(object);
        toggleForm();
    })
    .catch((error) => {
        console.error("Error:", error);
    });
});

function validateForm() {
    let expMin = document.querySelector('input[name="exp_min"]').value;
    let expMax = document.querySelector('input[name="exp_max"]').value;
    let salMin = document.querySelector('input[name="sal_min"]').value;
    let salMax = document.querySelector('input[name="sal_max"]').value;

    if (parseInt(expMin) > parseInt(expMax)) {
        alert("Minimum experience should not be greater than maximum experience.");
        return false;
    }

    if (parseInt(salMin) > parseInt(salMax)) {
        alert("Minimum salary should not be greater than maximum salary.");
        return false;
    }

    return true;
}

function addJobCardToDOM(data) {
    let card = document.createElement('div');
    card.className = "job-card";
    card.innerHTML = `
        <img src="./assets/Rectangle 1965.png" alt="Company Logo">
        <h3>${data.job_title}</h3>
        <p>${data.company_name} - ${data.industry}</p>
        <p>${data.location} (${data.remote_type})</p>
        <p>Experience: ${data.exp_min} - ${data.exp_max} years</p>
        <p>Salary: INR ${data.sal_min} - ${data.sal_max} / Month</p>
        <p>${data.total_emp} employees</p>
        <button id="button3">Apply Now</button>
    `;

    // document.body.appendChild(card);

    document.getElementById('jobs-container').appendChild(card);

}

function saveJobData(jobData) {
    let jobs = getSavedJobData();
    jobs.push(jobData);
    localStorage.setItem('jobs', JSON.stringify(jobs));
}

function getSavedJobData() {
    let jobs = localStorage.getItem('jobs');
    return jobs ? JSON.parse(jobs) : [];
}

function loadAndDisplayJobs() {
    let jobs = getSavedJobData();
    jobs.forEach(job => addJobCardToDOM(job));
}

document.addEventListener('DOMContentLoaded', function() {
    loadAndDisplayJobs();
});











