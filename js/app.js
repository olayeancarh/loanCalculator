// Listen for submit event
document.querySelector('#loan-form').addEventListener('submit', function(e){
    // Hide Results
    document.querySelector('#results').style.display = 'none';

    // Show loader
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 1000);

    e.preventDefault();
});

// Calculate Ressults
function calculateResults(){
    // UI variables
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100/ 12;
    const calculatedPayments = parseFloat(years.value) * 12;
    

    // Compute monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Hide loader
        document.querySelector('#loading').style.display = 'none';

        // Show Results
        document.querySelector('#results').style.display = 'block';
    } else{
        setTimeout(showErrors("Please check your numbers"), 1000);
    }

}

function showErrors(errorMsg){
    // Hide loader
    document.querySelector('#loading').style.display = 'none';

    // Hide Results
    document.querySelector('#results').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add Class to our new div
    errorDiv.className = 'alert alert-danger';

    // Create textNode and append to div
    errorDiv.appendChild(document.createTextNode(errorMsg));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear out after 3 seconds 
    setTimeout(clearError, 3000);
}

// function to clear error
function clearError() {
    document.querySelector('.alert').remove();
}