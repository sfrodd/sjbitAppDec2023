app.post('/submit-form', (req, res) => {
    const { name: userName, age: userAge } = req.body.user;
    const { skills } = req.body;
    
    console.log('User Name:', userName);
    console.log('User Age:', userAge);
    console.log('Skills:', skills);
  
    // Process the extracted data...
  
    res.send('Form submitted successfully');
  });
  