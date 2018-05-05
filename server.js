import express from 'express';
import parser from 'body-parser';
import routes from './routers';
import db from './models';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 8000 ;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors())

app.use('/api/v1',routes)

app.get('/',(req,res)=>{res.send("Hola mundo")});

app.listen(port,()=>{
    //db.sequelize.sync();
    console.log(`Server start at port ${port}`)
})

export default app;