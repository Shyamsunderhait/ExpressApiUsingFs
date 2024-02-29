const express = require('express');
const app = express(); // web server created
const fs = require('fs');
const employees = require('./empData.json');


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('home page')
});

app.get('/about',(req,res)=>{
    res.send('about page')
});

app.get('/contact',(req,res)=>{
    res.send('contact page')
});
// show employees
app.get('/showEmp',(req,res)=>{
    res.json(employees);
});
// for dyanamic variable
app.get('/emp/:id',(req,res)=>{
    const id = Number(req.params.id);
    const emp = employees.find((emp)=>emp.id===id);
    res.json(emp);
})
// add employee
app.post('/addEmp',(req,res)=>{
    const new_emp = req.body;
    console.log(new_emp);
    employees.push(new_emp);
    fs.writeFile('./empData.json',JSON.stringify(employees),(error)=>{
        if (error) {
            res.send('internal server error');
        } else {
            res.send('employee data inserted');
        }
    });
});
//update employee
app.put('/updateEmp/:id',(req,res)=>{
    const id = Number(req.params.id);
    const emp = req.body;
    const empIndex = employees.findIndex((e)=>e.id===id);
    if (empIndex!=-1) {
        employees[empIndex]=emp;
    }
    
    fs.writeFile('./empData.json',JSON.stringify(employees),(error)=>{
        if (error) {
            res.send('internal server error');
        } else {
            res.send('employee data updated');
        }
    });
});
// delete employee
app.delete('/delEmp/:id',(req,res)=>{
    const id = Number(req.params.id);
    const emp = req.body;
    const empIndex = employees.findIndex((emp)=>emp.id===id);
    if (employees!= -1) {
        employees.splice(empIndex,1);
    }
    fs.writeFile('./empData.json',JSON.stringify(employees),(error)=>{
        if (error) {
            res.send('internal server error');
        } else {
            res.send('employee deleted');
        }
    });
});

app.listen(4002,()=>{
    console.log("listen to port");
})