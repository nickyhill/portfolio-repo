function toggleEducation() {
    var educationContainer = document.querySelector('.education-container');
    var arrowElement = document.getElementById('arrowEdu');

    if (educationContainer.style.display === 'none' || educationContainer.style.display === '') {
        educationContainer.style.display = 'block';
        arrowElement.textContent = '▼'; // Change the arrow to pointing down
    } else {
        educationContainer.style.display = 'none';
        arrowElement.textContent = '▶'; // Change the arrow to pointing right
    }
}

function toggleWork() {
    var workContainer = document.querySelector('.work-container');
    var arrowElement = document.getElementById('arrowWork');

    if (workContainer.style.display === 'none' || workContainer.style.display === '') {
        workContainer.style.display = 'block';
        arrowElement.textContent = '▼'; // Change the arrow to pointing down
    } else {
        workContainer.style.display = 'none';
        arrowElement.textContent = '▶'; // Change the arrow to pointing right
    }
}


function togglePortfolio()
{
    var portfolioContainer = document.querySelector(".portfolio-container");

    if (portfolioContainer != null)
    {
        var isPortfolioVisible = !isPortfolioVisible;

        if (isPortfolioVisible)
        {
            portfolioContainer.style.display = "block";
            portfolioContainer.style.height = "auto"; // Expand to content height
        }
        else
        {
            portfolioContainer.style.height = "0"; // Collapse the container
            setTimeout(() => portfolioContainer.style.display = "none", 300); // Delayed hide
        }
    }
}