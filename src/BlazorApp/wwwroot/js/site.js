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
