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
        breedSelect.innerHTML = '<option value="Doesn\'t matter">Doesn\'t matter</option>';
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
        const getAlong = document.querySelectorAll('input[name="getAlong"]:checked');

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

        if (errors.length > 0) {
            event.preventDefault(); // Prevent form submission
            errorMessage.innerHTML = errors.join('<br>');
        }
    }


    const petForm = document.getElementById('petForm');
    petForm.addEventListener('submit', validateForm);

    const resetButton = document.querySelector('input[type="reset"');
    resetButton.addEventListener('click',()=>{
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = ''; // Clear error messages
    })
});