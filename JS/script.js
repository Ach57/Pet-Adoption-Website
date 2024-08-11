document.addEventListener('DOMContentLoaded', () => {
    const breedSelect = document.getElementById('breedSelect');
    const dogRadio = document.getElementById('dog');
    const catRadio = document.getElementById('cat');

    const dogBreeds = [
        "Labrador Retriever",
        "German Shepherd",
        "Golden Retriever",
        "French Bulldog",
        "Bulldog"
    ];

    const catBreeds = [
        "Persian",
        "Maine Coon",
        "Siamese",
        "Ragdoll",
        "Sphynx"
    ];

    function updateBreedOptions(breeds) {
        breedSelect.innerHTML = '<option value="">I don\'t know</option>';
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.toLowerCase().replace(/\s+/g, '-');
            option.textContent = breed;
            breedSelect.appendChild(option);
        });
    }

    dogRadio.addEventListener('change', () => {
        if (dogRadio.checked) {
            updateBreedOptions(dogBreeds);
        }
    });

    catRadio.addEventListener('change', () => {
        if (catRadio.checked) {
            updateBreedOptions(catBreeds);
        }
    });
    function validateForm(event){
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent='';
        const petType = document.querySelector('input[name="petType"]:checked');
        const gender = document.querySelector('input[name="gender"]:checked');
        const getAlong = document.querySelectorAll('input[name="getAlong[]"]:checked');
        const name = document.getElementById('firstName').value.trim();
        const last = document.getElementById('lastName').value.trim();
        const emailInput = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        let errors= [];
        if (!petType) {
            errors.push('Please select the type of pet.');
        }

        if (!gender) {
            errors.push('Please select a gender.');
        }

        if (getAlong.length === 0) {
            errors.push('Please select at least one option for "Get Along with".');
        }

        if(name === ''){
            errors.push('Please enter your first name');
        }

        if(last === ''){
            errors.push('Please enter your last name');
        }

        if(!emailRegex.test(emailInput)){
            errors.push('Please enter a valid email address');
        }

        if (errors.length > 0) {
            event.preventDefault(); // Prevent form submission
            errorMessage.innerHTML = errors.join('<br>');
        }
    }


    const petForm = document.getElementById('petGiveAway');
    petForm.addEventListener('submit', validateForm);

    const resetButton = document.querySelector('input[type="reset"');
    resetButton.addEventListener('click',()=>{
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = ''; // Clear error messages
    })
});