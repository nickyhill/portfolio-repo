function toggleEducation() {
    var educationContainer = document.querySelector('.education-container');
    var arrowElement = document.getElementById('arrow');

    if (educationContainer.style.display === 'none' || educationContainer.style.display === '') {
        educationContainer.style.display = 'block';
        arrowElement.textContent = '▼'; // Change the arrow to pointing down
    } else {
        educationContainer.style.display = 'none';
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