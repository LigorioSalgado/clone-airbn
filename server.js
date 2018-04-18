import express from 'express';
import parser from 'body-parser';
import routes from './routers';
import db from './models';

const app = express();
const port = 8000 || process.env.PORT;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use('/api/v1',routes)

app.get('/',(req,res)=>{res.send("Hola mundo")});

app.listen(port,()=>{
    //db.sequelize.sync();
    console.log(`Server start at port ${port}`)
})