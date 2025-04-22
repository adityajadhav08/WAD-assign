const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://adityajadhav08:adityajadhav2025@cluster0.y3c9zyf.mongodb.net/");

const StudentSchema=new mongoose.Schema({
    name:String,
    marks:Number
});
const Student=mongoose.model('Student',StudentSchema);

app.get('/',async(req,res)=>{
    res.send("welcome student");
    });

 app.get('/student',async(req,res)=>{
    const students=await Student.find();
        res.send(students);
    });

    app.get('/student/:name',async(req,res)=>{
        const{name}=req.params;
        const students=await Student.find({name});
            res.send(students);
        });
        app.post('/addstudent', async (req, res) => {
            const { name, marks } = req.body;
            const newStudent = new Student({ name, marks });
            await newStudent.save();
                
        });
        app.delete('/delete/:name',async(req,res)=>{
            const{name} = req.params;
            const students = await Student.findOneAndDelete({name});
        })
        
        
        app.put('/update', async (req, res) => {
            
            const { name,marks } = req.body;
            const updatedStudent = await Student.findOneAndUpdate(
                { name: name }, // Query to find the student by name
                { marks: marks }, // Update to set the new marks
                { new: true }     // Option to return the updated document
              );
        });                                                                                                               
app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000");
});

