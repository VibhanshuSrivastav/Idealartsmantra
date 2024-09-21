//====----=== Express ====----====
const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch');

//====----=== Express ====----====
const { isAdminAuthenticated } = require('../controller/authMiddleware');
const { isAuthenticated } = require('../controller/authMiddleware');



//__+++__++__+++__++ Models ++_+++___+++__+++
//__+++__++__+++__++ Models ++_+++___+++__+++

const student = require('../model/admission');
const contact = require('../model/contact');
const topper = require('../model/topper');
const Question = require('../model/question');
const book = require('../model/book');
const notes = require('../model/notes');
const batch = require('../model/batch');

//__+++__++__+++__++ Models ++_+++___+++__+++ 
//__+++__++__+++__++ Models ++_+++___+++__+++ 


// ********************* Axios  **************************
const axios = require('axios');
const uniqid = require('uniqid');
const sha256 = require("sha256");
// ********************* Axios  **************************


// SESSION AND COOKIE PARSER
const session = require('express-session');
const cookie = require('cookie-parser');
// SESSION AND COOKIE PARSER




// <^><^><^><^><^><^><^><^> Multer <^><^><^><^><^><^><^><^>
// <^><^><^><^><^><^><^><^> Multer <^><^><^><^><^><^><^><^>

const multer = require('multer');
const { buffer } = require('stream/consumers');

// -------------- For Student Image -------------------
// -------------- For Student Image ------------------- 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './views/uploads/students/');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
        // cb(null, uuidv4()+'-'+ Date.now() + path.extname(file.originalname)) //Appending .jpg
    }

});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({

    storage: storage,

    limits: {
        fileSize: 200 * 1024  //max size of the file is 200kb
    },

    fileFilter: fileFilter
});

// -------------- For Student Image ------------------- 
// -------------- For Student Image ------------------- 

// -------------- For topper ------------------- 
// -------------- For topper ------------------- 

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './views/uploads/toppers/');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
        // cb(null, uuidv4()+'-'+ Date.now() + path.extname(file.originalname)) //Appending .jpg
    }

});

const fileFilter1 = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload1 = multer({

    storage:storage1,

    fileFilter:fileFilter1

});
// -------------- For topper ------------------- 
// -------------- For topper ------------------- 

//:::::::::::::::::::::::::::::: Multer For Book ::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::: Multer For Book ::::::::::::::::::::::::::::::::::
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './views/uploads/books/');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
        // cb(null, uuidv4()+'-'+ Date.now() + path.extname(file.originalname)) //Appending .jpg
    }

});

const fileFilter2 = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload2 = multer({

    storage:storage2,

    fileFilter:fileFilter2

});
//:::::::::::::::::::::::::::::: Multer For Book ::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::: Multer For Book ::::::::::::::::::::::::::::::::::

const storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './views/uploads/notes/');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
        // cb(null, uuidv4()+'-'+ Date.now() + path.extname(file.originalname)) //Appending .jpg
    }

});

const fileFilter3 = (req, file, cb) => {
    const allowedFileTypes = ['application/pdf'];

    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


let upload3 = multer({

    storage:storage3,

    fileFilter:fileFilter3

});


// <^><^><^><^><^><^><^><^> Multer <^><^><^><^><^><^><^><^>
// <^><^><^><^><^><^><^><^> Multer <^><^><^><^><^><^><^><^>



// ===================================================================================================
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
// ==================================== Admin Dashboard all api ======================================
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
// ===================================================================================================



// ||||||||||====================|||||||||||| Log In API||||||||||||||====================|||||||||||||
// ||||||||||====================|||||||||||| Log In API||||||||||||||====================|||||||||||||

router.get('/login', (req, res) => {
    res.render('login');
})


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin@gmail.com' && password === 'admin1234') {
        req.session.user = { email, role: 'admin' }; // Set a session variable with role
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});



router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.user = null; // Clear user session
        res.redirect('/login');
    } else {
        res.redirect('/login');
    }
});




// |||||||||||||====================|||||||||||| Log In API||||||||||||||====================|||||||||||||
// |||||||||||||====================|||||||||||| Log In API||||||||||||||====================|||||||||||||

router.get('/dashboard',isAdminAuthenticated,(req, res) => {

    if (req.session.user) {
        res.render('./dashboard/dashboardIndex')
    }
    else {
        res.redirect('/login')
    }
})


router.get('/admissionDetails', isAdminAuthenticated, async (req, res) => {
    try {
        const studentData = await student.find({});
        res.render('./dashboard/admissionDetails', { studentData: studentData });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const students = await student.findByIdAndDelete(req.params.id);
        return res.redirect('/admissionDetails');
        // console.log(registrationData);
    } catch (err) {
        console.log(err);
    }
});

// """"""""""""""" Filter for class """""""""""""""
// """"""""""""""" Filter for class """""""""""""""

router.get('/filter9/admissionDetails', async (req, res) => {
    try {

        const filterData = await student.find({ class: '9th' });

        res.render('./dashboard/admissionDetails', { studentData: filterData });
    } catch (error) {
        console.log(error)
    }
})


router.get('/filter10/admissionDetails', async (req, res) => {
    try {

        const filterData = await student.find({ class: "10th" });
        res.render('./dashboard/admissionDetails', { studentData: filterData });
    } catch (error) {
        console.log(error)
    }
})

router.get('/filter11/admissionDetails', async (req, res) => {
    try {

        const filterData = await student.find({ class: "11th" });
        res.render('./dashboard/admissionDetails', { studentData: filterData });
    } catch (error) {
        console.log(error)
    }
})

router.get('/filter12/admissionDetails', async (req, res) => {
    try {

        const filterData = await student.find({ class: "12th" });
        res.render('./dashboard/admissionDetails', { studentData: filterData });
    } catch (error) {
        console.log(error)
    }
})

// """"""""""""""" Filter for class """""""""""""""
// """"""""""""""" Filter for class """""""""""""""



router.get('/viewContact', isAdminAuthenticated,async (req, res) => {

    if (req.session.user) {
        try {
            const contactData = await contact.find({});
            res.render('./dashboard/viewContact', {contactData: contactData});
        } catch (error) {
            console.log(error)
        }
    }
    else {
        res.redirect('/login')
    }
})

router.get('/deleteContact/:id', async (req, res) => {
    try {
        const contacts = await contact.findByIdAndDelete(req.params.id);
        return res.redirect('/viewContact');
        // console.log(registrationData);
    } catch (err) {
        console.log(err);
    }
});


//......................... Topper Get and Post Api ...............................
//......................... Topper Get and Post Api ...............................
router.get('/addTopper', isAdminAuthenticated,(req, res) => {

    res.render('./dashboard/addTopper');
});



router.post('/addTopper',upload1.single('topperImg'), async (req, res) => {
    
    try {
        
        var toppers = new topper({
            topperImg: req.file.filename,
            topperName: req.body.topperName,
            topperClass: req.body.topperClass,
            topperGrade: req.body.topperGrade
        })
        await toppers.save();
        res.redirect('/addTopper');
    } catch (error) {
        console.error('error uploading topper', error);
        res.status(500).json({ success: false, message: 'Failed to upload topper' });
    }
})

router.get('/viewTopper', isAdminAuthenticated,async (req, res) => {
    if (req.session.user) {
        try {
            const topperData = await topper.find({});
            res.render('./dashboard/viewTopper', {topperData: topperData});
        } catch (error) {
            console.log(error)
        }
    }
    else {
        res.redirect('/login')
    }
});

router.get('/deleteTopper/:id', async (req, res) => {
    try {
        const toppers = await topper.findByIdAndDelete(req.params.id);
        return res.redirect('/viewTopper');
        // console.log(registrationData);
    } catch (err) {
        console.log(err);
    }
});



//......................... Topper Get and Post Api ...............................
//......................... Topper Get and Post Api ...............................


// ......................Create New Question..............................
// ......................Create New Question..............................
router.post('/questions', async (req, res) => {
    try {
        const newQuestion = new Question({
            class: req.body.class,
            subject: req.body.subject,
            question: req.body.question,
            options: req.body.options,
            correctOption: req.body.correctOption,
        });
        await newQuestion.save();
        res.redirect('/addQuestion');
    } catch (error) {
        console.log('error creating question',error);
        res.status(500).json({ success: false, message: 'Failed to create question' });
    }
  });

  router.get('/addQuestion',isAdminAuthenticated, async(req, res) => {


    try {
        const questionData = await Question.find({});
        res.render('./dashboard/addQuestion', { questionData: questionData });

    } catch (error) {
        console.log(error);
    }
 })



router.post('/questions/delete/:id', async (req, res) => {
    try {
      const question = await Question.findByIdAndDelete(req.params.id);
      res.redirect('/addQuestion');
    } catch (error) {
      res.status(500).send({ error: 'Server error' });
    }
  });
 
// ......................Create New Question..............................
// ......................Create New Question..............................



//----------------------------------------- Add Book ----------------------------------------------
//----------------------------------------- Add Book ----------------------------------------------



router.get('/addBook', isAdminAuthenticated,async(req,  res) => {
    try {
        const books = await book.find();
        res.render('./dashboard/addBook', {books}); 
    } catch (error) {
        console.log(error)
    }
})

router.get('/editBook/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const book = await book.findById(id);
      if (!book) {
        return res.status(404).send('Book not found');
      }
      res.render('editBook', { book }); // Render your edit book form
    } catch (err) {
      console.error('Error fetching book for editing:', err);
      res.status(500).send('Error fetching book for editing');
    }
  });
  
  // Handle updating a book
  router.post('/editBook/:id', async (req, res) => {
    const { id } = req.params;
    const { class: bookClass, subject, topicHeading, topicExplaination } = req.body;
    try {
      const updatedBook = await book.findByIdAndUpdate(id, {
        class:bookClass,
        subject,
        topicHeading,
        topicExplaination
      }, { new: true });
      if (!updatedBook) {
        return res.status(404).send('Book not found');
      }
      res.redirect('/addBook'); // Redirect to addBook page or wherever you want
    } catch (err) {
      console.error('Error updating book:', err);
      res.status(500).send('Error updating book');
    }
  });
  
  // Handle deleting a book
  router.get('/deleteBook/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBook = await book.findByIdAndDelete(id);
      if (!deletedBook) {
        return res.status(404).send('Book not found');
      }
      res.redirect('/addBook'); // Redirect to addBook page or wherever you want
    } catch (err) {
      console.error('Error deleting book:', err);
      res.status(500).send('Error deleting book');
    }
  });


  router.post('/addBook', upload2.single('topicImg'), async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Create a new book
        const newBook = new book({
            class: req.body.class,
            subject: req.body.subject,
            topicHeading: req.body.topicHeading,
            topicImg: req.file.filename,
            topicExplaination: req.body.topicExplaination,
        });

        // Save the book to the database
        await newBook.save();
        console.log("Book saved");

        // Redirect after successful addition
        res.redirect('/addBook');
    } catch (error) {
        console.error('Error creating Book:', error);

        // Send an error response back to the client
        res.status(500).json({ success: false, message: 'Failed to create Book' });
    }
});

//----------------------------------------- Add Book ----------------------------------------------
//----------------------------------------- Add Book ----------------------------------------------


// ===========================================Add Batch===========================================
// ===========================================Add Batch===========================================
router.get('/addBatch',isAdminAuthenticated, async(req, res) => {
    try {
        const batches = await batch.find({});
        res.render("./dashboard/addBatch" , {batches:batches })
    } catch (error) {
        console.error("Error fetching batches:", error);
        res.status(500).send("An error occurred while fetching batches.");
    }

})

router.get('/deleteBatch/:id', async (req, res) => {
    try {
        await batch.findByIdAndDelete(req.params.id);
        res.redirect('/addBatch');
    } catch (error) {
        console.error("Error deleting batch:", error);
        res.status(500).send("An error occurred while deleting the batch.");
    }
});

router.post('/addBatch', async (req, res) => {
    try {
        const newBatch = new batch({
            batchNumber: req.body.batchNumber,
            class: req.body.class,
            subject: req.body.subject,
            teacher: req.body.teacher,
            time: req.body.time
        });

        await newBatch.save();
        console.log("New Batch added successfully");
        res.redirect('/addBatch'); // Redirect to the add batch page

    } catch (error) {
        console.error("Error adding new batch:", error);
        res.status(500).send("An error occurred while adding the batch. Please try again.");
    }
});




// ===========================================Add Batch===========================================
// ===========================================Add Batch===========================================


// ===========================================Enable Button===========================================
// ===========================================Enable Button===========================================
router.get('/admin/:id', async (req, res) => {
    try {
        const enableButton = await student.findById(req.params.id);
        
        if (!enableButton) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Render a view to enable buttons based on student data
        res.render('./dashboard/enable-button', { enableButton: enableButton });
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/enableButton', (req, res) => {
    res.render('./dashboard/enable-button')
})
// ===========================================Enable Button===========================================
// ===========================================Enable Button===========================================

router.get('/addNotes',isAdminAuthenticated, async (req, res) => {
    try {
        const allNotes = await notes.find(); // Use your Notes model to find all notes
        res.render('./dashboard/addNotes', { notes: allNotes }); // Pass the retrieved notes to your EJS template
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching notes'); // Handle error if any
    }
});

// Handle updating notes
router.post('/editNotes/:id', async (req, res) => {
    const { id } = req.params;
    const { class:notesClass, subject } = req.body;
    try {
      const updatedNotes = await notes.findByIdAndUpdate(id, {
        class:notesClass,
        subject,
        notes: req.file.filename // Assuming you update the file name in the database
      }, { new: true });
      if (!updatedNotes) {
        return res.status(404).send('Notes not found');
      }
      res.redirect('/addNotes'); // Redirect to addNotes page or wherever you want
    } catch (err) {
      console.error('Error updating notes:', err);
      res.status(500).send('Error updating notes');
    }
  });
  
  // Handle deleting notes
  router.get('/deleteNotes/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedNotes = await notes.findByIdAndDelete(id);
      if (!deletedNotes) {
        return res.status(404).send('Notes not found');
      }
      res.redirect('/addNotes'); // Redirect to addNotes page or wherever you want
    } catch (err) {
      console.error('Error deleting notes:', err);
      res.status(500).send('Error deleting notes');
    }
  });

  router.post('/addNotes', upload3.single('notes'), async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Create a new book
        const newNotes = new notes({
            class: req.body.class,
            subject: req.body.subject,
            notes: req.file.filename
        });

        // Save the book to the database
        await newNotes.save();
        console.log("Notes Uplaoded");

        // Redirect after successful addition
        res.redirect('/addNotes');
    } catch (error) {
        console.error('Error creating Notes:', error);

        // Send an error response back to the client
        res.status(500).json({ success: false, message: 'Failed to create Notes' });
    }
});



// ===================================================================================================
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
// ==================================== Admin Dashboard all api ======================================
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
// ===================================================================================================


router.get('/', async (req, res) => {
    try {
        const topperData = await topper.find({});
        const batchData = await batch.find({});

        res.render('index', { topperData: topperData, batchData: batchData });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("An error occurred while fetching data.");
    }
});

router.get('/aboutus', (req, res) => {
    res.render('about');
})

  


// ..........................test.........................
// ..........................test.........................


router.get('/test/:class', async (req, res) => {
    const { class: className } = req.params;
    const questionData = await Question.find({ class: className });
  
    res.render('testYourself', { questionData: questionData });
  });



router.post('/submitTest/:class', async (req, res) => {
    const { class: className } = req.params;
    const { subject } = req.query; // Get subject from query parameter

    try {
        // Fetch all questions for the specific class and subject
        const allQuestions = await Question.find({ class: className, subject: subject });
        const totalQuestions = allQuestions.length;

        const userAnswers = req.body.answers || {}; // Get user answers from request body, or use an empty object if undefined

        let unansweredCount = 0;
        const results = await Promise.all(
            allQuestions.map(async (question) => {
                const userAnswer = userAnswers[question._id];
                let isCorrect = false;
                
                if (userAnswer !== undefined) {
                    isCorrect = question.correctOption.toLowerCase() === userAnswer.toLowerCase();
                } else {
                    unansweredCount++;
                }

                return {
                    question,
                    isCorrect: isCorrect,
                    userAnswer: userAnswer
                };
            })
        );

        const totalMarks = results.reduce((acc, result) => acc + (result.isCorrect ? 1 : 0), 0);

        res.render('result', { results, totalMarks, totalQuestions, unansweredCount, subject });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// ..........................test.........................
// ..........................test.........................



// <><><><><><><><><><><><><> Admission Get and Post API <><><><><><><><><><><><><><><><><>
// <><><><><><><><><><><><><> Admission Get and Post API <><><><><><><><><><><><><><><><><>
// <><><><><><><><><><><><><> Admission Get and Post API <><><><><><><><><><><><><><><><><>

router.get('/admission', (req, res) => {
    res.render('admission');
});



router.post('/admission', upload.single('sImage'), async (req, res) => {
    try {
        // Check if passwords match
        if (req.body.password !== req.body.cPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        // Determine the subjects
        let subjects = [];
        if (Array.isArray(req.body.subject)) {
            subjects = req.body.subject.includes('Arts')
                ? req.body.subject.filter(sub => sub !== 'Arts').concat(['Political', 'History', 'Geography'])
                : req.body.subject;
        } else {
            subjects = req.body.subject === 'Arts' 
                ? ['Political', 'History', 'Geography']
                : [req.body.subject];
        }

        // Create a new student
        const newStudent = new student({
            sImage: req.file.filename,
            sName: req.body.sName,
            fName: req.body.fName,
            mName: req.body.mName,
            email: req.body.email,
            password: req.body.password, // This will be hashed in the pre-save hook
            phone: req.body.phone,
            aadhar: req.body.aadhar,
            subject: subjects,
            class: req.body.class
        });

        // Save the student to the database
        await newStudent.save();

        // Redirect after successful admission
        res.redirect('/admission');
    } catch (error) {
        console.error('Error creating student:', error);
        // Send an error response back to the client
        res.status(500).json({ success: false, message: 'Failed to create student' });
    }
});

router.get('/book', isAuthenticated,async (req, res) => {
    const { class: bookClass, subject, page = 1, limit = 5 } = req.query;
    let filter = {};

    if (bookClass) {
        filter.class = bookClass;
    }

    if (subject) {
        filter.subject = subject;
    }

    try {
        const skip = (page - 1) * limit;
        const totalBooks = await book.countDocuments(filter);
        const totalPages = Math.ceil(totalBooks / limit);

        const bookData = await book.find(filter).skip(skip).limit(parseInt(limit));

        res.render('book', { bookData, currentPage: parseInt(page), totalPages });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while fetching the book data.");
    }
});



router.post('/admin/:id', async (req, res) => {
    const studentId = req.params.id;
    const updates = req.body;

    console.log('Received Request:', { studentId, updates }); // Log received data

    if (!updates) {
        return res.status(400).json({ message: 'Enable feature data missing' });
    }

    try {
        // Ensure the request body contains valid keys
        const validKeys = ['englishNotesEnabled', 'sstNotesEnabled', 'politicalNotesEnabled', 'historyNotesEnabled', 'geographyNotesEnabled'];
        const updateData = {};

        for (const key in updates) {
            if (validKeys.includes(key) && typeof updates[key] === 'boolean') {
                updateData[key] = updates[key];
            }
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        // Update the student's notes availability
        const updatedStudent = await student.findByIdAndUpdate(studentId, { $set: updateData }, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ success: true, message: 'Student updated successfully', student: updatedStudent });
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ message: 'Server error' });
    }
});



router.get('/notes', isAuthenticated,async (req, res) => {
    const { class: noteClass, subject } = req.query;
    let filter = {};

    if (noteClass) {
        filter.class = noteClass;
    }

    if (subject) {
        filter.subject = subject;
    }

    try {
        const notesData = await notes.find(filter);
        res.render('notes', { notesData });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while fetching the notes data.");
    }
});

// <><><><><><><><><><><><><> Admission Get and Post API <><><><><><><><><><><><><><><><><>
// <><><><><><><><><><><><><> Admission Get and Post API <><><><><><><><><><><><><><><><><>
// <><><><><><><><><><><><><> Admission Get and Post API <><><><><><><><><><><><><><><><><>



//......................... Contact Get and Post Api ...............................
//......................... Contact Get and Post Api ...............................
router.get('/contact', (req, res) => {
    res.render('contact');
});



router.post('/contactUs', async (req, res) => {
    
    try {
        
        var contacts = new contact({
            fullname: req.body.fullname,
            email: req.body.email,
            mobile: req.body.mobile,
            message: req.body.message
        })
        await contacts.save();
        res.redirect('/contact')
        
        
    } catch (error) {
        console.error('error sending message', error)
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
})


//......................... Contact Get and Post Api ...............................
//......................... Contact Get and Post Api ...............................


// :::::::::::::::::::::::::::::::::::::: User Login Api ::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::: User Login Api ::::::::::::::::::::::::::::::::::::::::::


router.get('/userLogin', async (req, res) => {

    res.render('userLogin');


});



router.get('/userProfile', isAuthenticated,async (req, res) => {
    if (req.session.user && req.session.user.id) {
        try {
            const userId = req.session.user.id;
            const user = await student.findById(userId).select('-password'); // Exclude password from the retrieved user

            if (!user) {
                return res.status(404).send('User not found');
            }

            res.render('userProfile', { user });
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.redirect('/userLogin');
    }
});





router.post('/userLogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await student.findOne({ email }).exec();
        if (!user) {
            console.log('User not found');
            return res.redirect('/userLogin');
        }

        const match = await user.comparePassword(password);
        if (!match) {
            console.log('Password does not match');
            return res.redirect('/userLogin');
        }

        req.session.user = { id: user._id, email: user.email, role: user.role }; // Set session with role
        res.redirect('/userProfile');
    } catch (error) {
        console.log(error);
        res.redirect('/userLogin');
    }
});

router.get('/userLogout', (req, res) => {
    if (req.session.user) {
        req.session.user = null; // Clear user session
        res.redirect('/userLogin');
    } else {
        res.redirect('/userLogin');
    }
});


// :::::::::::::::::::::::::::::::::::::: User Login Api ::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::: User Login Api ::::::::::::::::::::::::::::::::::::::::::



module.exports = router;