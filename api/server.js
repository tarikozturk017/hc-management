const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors()); // avoid cross origin errors

const uri = 'mongodb+srv://tarikozturkk1:Takomac.1995@hc-managemenet-system.fzpqavf.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => console.log("Connected to DB")
    ).catch(console.error)

// import Patient model
const Model = require('./models/Patient');
const Patient = Model.Patient
const Exercise = Model.Exercise

// check the password when a patient signs in
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // find the patient by their email address
    const patient = await Patient.findOne({ email });
  
    if (!patient) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // compare the hashed password with the plaintext password
    const match = await bcrypt.compare(password, patient.password);
  
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // generate a JWT token and return it to the client
    const token = jwt.sign({ patientId: patient._id }, secretKey);
  
    res.status(200).json({ token });
  });
  

// get all the patients
app.get('/patients', async (req, res) => {
    const patients = await Patient.find();

    res.json(patients);
})

// Create new patient
app.post('/patient/new', (req, res) => {
    console.log(req.body)
    const patient = new Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        diagnosis: req.body.diagnosis
    })

    patient.save();
    res.json(patient)
})

// update patient
app.put('/patient/edit/:id', async (req, res) => {
    const result = await Patient.findById(req.params.id); // get the patient

    const exercise = await Exercise.findById(req.body.exerciseId);
    
    if(result.exercises.includes(exercise)){
        console.log('Exercise is already added to the Patient')
    } else {
        result.exercises.push(exercise)
    }
    
    res.json(result)
    result.save();
})

// Delete patient by id
app.delete('/patient/delete/:id', async (req, res) => {
    const result = await Patient.findByIdAndDelete(req.params.id);

    res.json(result);
})

// get all exercises
app.get('/exercises', async (req, res) => {
    const exercises = await Exercise.find();
    res.json(exercises);
})

// get all exercises of the patient
app.get('/patient/:id/exercises', async (req, res) => {
    try {
      const exercises = await Patient.findById(req.params.id).populate('exercises');
  
      if(exercises)  res.status(200).json(exercises.exercises);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

// create a new exercise
app.post('/exercise/new', (req, res) => {
    console.log(req.body);
    const exercise = new Exercise({
        title: req.body.title,
        description: req.body.description,
    })

    exercise.save()
    res.json(exercise)
})

// delete exercise
app.delete('/exercise/:id', async (req, res) => {
    const result = await Exercise.findByIdAndDelete(req.params.id);

    res.json(result)
})


app.listen(3001, () => console.log("Server started on port 3001"))