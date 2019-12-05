const express =require('express'); // call express 
const datastore = require('nedb'); // call Nedb


const app =express(); // call express
app.listen(3000,() => console.log('listening at 3000')); // if listen then display on port 3000
app.use(express.static('public')); 
app.use(express.json({limit:'1mb'}));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Starting server at ${port}`);
});


const database=new datastore('database.db'); // create new database 
database.loadDatabase(); // load database 

app.get('/api',(request,response)=>{ 
	database.find({},(err,data)=>{
		if (err) {
			response.end();
			return;
		}
     response.json(data);
	});
});

app.post('/api',(request,response)=>{
	const data=request.body;
	database.insert(data);
	response.json(data);
});

//database.insert({Date:'26',Day:4,Month:'July',Summer:'Yes',In:16,Out:20});