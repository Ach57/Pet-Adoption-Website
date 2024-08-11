const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(cookieParser());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname)); // Set the views directory to the root

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'JS')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname))); // Serve static files from the root directory
const petsFilePath = path.join(__dirname, 'AvailablePets.json');

// Route for the home page
app.get('/', (req, res) => {    
    const loggedIn = req.cookies.loggedIn === 'true';
    const username = req.cookies.username || '';

    res.render('main',{loggedIn:loggedIn, username:username}); // Render main.ejs from the root directory
});


app.get('/CreateAccount', (req, res)=>{
    res.render('CreateAccount', {loggedIn:false ,message: ''});

});



app.post('/CreatedAccount', (req, res)=>{
    
    const {'user-name': username, 'pass-user': password}= req.body;
    let users =[] ;

    if(fs.existsSync('users.txt')){
        users =fs.readFileSync('users.txt', 'utf-8').split('\n').map(line=>line.split(':')[0]);
    }
    
    if(users.includes(username)){
         res.render('CreateAccount', {message: 'User Name already exists!',
                                     loggedIn:false});
    }else{
        fs.appendFileSync('users.txt',`${username}:${password}\n` );
        
        res.render('CreateAccount',{message: `Account created successfully!`,
                                   loggedIn:false});
    }

});

app.get('/FindDogCat', (req, res)=>{
    
    const loggedIn = req.cookies.loggedIn === 'true';
    const username = req.cookies.username || '';
    res.render('FindDogCat' ,{loggedIn:loggedIn,
         username:username,
          results:'',
          showResults:false});
});

app.post('/FindDogCat', (req, res)=>{
    const loggedIn = req.cookies.loggedIn === 'true';
    const username = req.cookies.username || '';


    const petType = req.body.petType; // can be either Cat or Dog
    
    const breed = req.body.breedSelect; // can be a Doesn't matter
    
    const ageRange = req.body.ageRange; // can be Any Age
    
    const gender = req.body.gender; // can be Any Gender
    
    const getAlong = req.body.getAlong; // at least one has to be checked
    
     // Load pet data from the JSON file
     const petsFilePath = path.join(__dirname, 'AvailablePets.json');
     const petsData = JSON.parse(fs.readFileSync(petsFilePath, 'utf8'));
 
     // Filter pets based on the criteria
    
    const filteredPets = petsData.filter(pet => {
        // Filter by pet type
        
        if (petType && petType.toLowerCase() !== pet.type.toLowerCase()) {
            return false;
        }
    
        // Filter by breed if not "Doesn't matter"
        if (breed && breed !== "Doesn't matter" && pet.breed !== breed) {
            return false;
        }
    
        // Filter by age range if not "Any Age"
        if (ageRange && ageRange !== 'Any Age' && pet.age !== ageRange) {
            return false;
        }
    
        // Filter by gender if not "Any Gender"
        if (gender && gender !== 'Any Gender' && pet.gender !== gender) {
            return false;
        }
    
        return true;
    });

     res.render('FindDogCat' ,{loggedIn:loggedIn,
         username:username,
          results:filteredPets,
          showResults: true});
    
});


app.get('/DogCare', (req, res)=>{
    const loggedIn = req.cookies.loggedIn === 'true';
    const username = req.cookies.username || '';
    res.render('DogCare', {loggedIn: loggedIn, username: username});
});

app.get('/CatCare',(req, res)=>{
    const loggedIn = req.cookies.loggedIn === 'true';
    const username = req.cookies.username || '';
    res.render('CatCare', {loggedIn:loggedIn, username:username});
});

app.get('/PetGiveAway', (req, res)=>{
    const loggedIn = req.cookies.loggedIn === 'true';
    const username = req.cookies.username || '';
    const message ='';
    res.render('PetGiveAway', { 
        loginError: req.query.loginError || '', 
        loggedIn: loggedIn, 
        username: username ,
        message: message,
    });
});

app.post('/PetGiveAway', (req, res)=>{
    const petType = req.body.petType;
    const breed =req.body.breed;
    const ageRange = req.body.ageRange;
    const gender = req.body.gender;
    const getAlong = req.body.getAlong ? req.body.getAlong.join(','): 'None';
    const suitableForFamily = req.body.suitable ? 'Suitable for family': 'Not Suitable for family';
    const comment = req.body.comment ? req.body.comment: 'No comment';
    const firstName = req.body['first-name'];
    const lastName = req.body['last-name'];
    const email = req.body.email;
    const username = req.cookies.username ;

    const filePath = path.join(__dirname, 'available_pets.txt'); // path to the file

    let newId = 1;

    if(fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.trim().split('\n');
        const lastLine = lines[lines.length-1];
        const lastId = lastLine ? parseInt(lastLine.split(':')[0], 10): 0;
        newId = lastId+1;
        
    }

    const newEntry =[newId, username, petType, breed, ageRange, gender, getAlong,
        suitableForFamily, comment, firstName, lastName, email
     ].join(':');

    fs.appendFileSync(filePath, `\n${newEntry}`);
     
     
     res.render('PetGiveAway', {username: username,loginError: req.query.loginError || '',loggedIn: true , message: 'Pet information submitted successfully.' });

});



app.post('/PetGiveAwayLogin', (req, res) => {
    const { 'user-name': username, 'pass-user': password } = req.body;

    if (fs.existsSync('users.txt')) {
        const data = fs.readFileSync('users.txt', 'utf-8');
        const usersData = data.split('\n').filter(line => line.trim() !== '').map(line => line.split(':'));
        const user = usersData.find(user => user[0] === username);

        if (user) {
            const storedPassword = user[1];
            if (storedPassword === password) {
                res.cookie('loggedIn', 'true', { maxAge: 3600000 });
                res.cookie('username', username, { maxAge: 3600000 });
                res.redirect('/PetGiveAway?loggedIn=true&username=' + encodeURIComponent(username));; 
            } else {
                res.render('PetGiveAway', { loginError: 'Incorrect password. Try again!', loggedIn: false, message: '' });
            }
        } else {
            res.render('PetGiveAway', { loginError: 'You need to create an account!', loggedIn: false, message: '' });
        }
    } else {
        res.render('PetGiveAway', { loginError: 'You need to create an account!', loggedIn: false, message: '' });
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('loggedIn');
    res.clearCookie('username');
    res.render('PetGiveAway', 
        {loginError:'You successfully logged out!',
            loggedIn:false,
            message:'',
            username:''
        });

});


app.get('/ContactUs', (req, res) =>{
    const loggedIn = req.cookies.loggedIn === 'true';
    const username = req.cookies.username || '';
    res.render('ContactUs', {loggedIn:loggedIn, username:username});
});

app.get('/AboutUs', (req, res)=>{
    const loggedIn = req.cookies.loggedIn === 'true';
    const username = req.cookies.username || '';
    res.render('AboutUs', {loggedIn:loggedIn, username:username});
    
});

app.get('/PrivacyPolicy', (req, res)=>{
    const loggedIn = req.cookies.loggedIn === 'true';
    const username = req.cookies.username || '';
    res.render('PrivacyPolicy', {loggedIn:loggedIn, username:username});
});

app.get('/EmailUs', (req, res)=>{
    const loggedIn = req.cookies.loggedIn === 'true';
    const username = req.cookies.username || '';
    res.render('EmailUs', {loggedIn:loggedIn, username:username});
})
app.get('/TermsOfUse', (req, res)=>{
    const loggedIn = req.cookies.loggedIn === 'true';
    const username = req.cookies.username || '';
    res.render('TermsOfUse', {loggedIn:loggedIn, username:username});
})



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
