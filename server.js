import express from 'express';
import parser from 'body-parser';
import routes from './routers';
import db from './models';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const app = express();
const port = process.env.PORT || 8000 ;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors())

const options = {
    swaggerDefinition: {
      info: {
        title: 'airbnb docs', // Title (required)
        version: '1.0.0', // Version (required)
      },
    },
    apis: ['./routers/index.js'], 
  };

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/v1',routes)

app.get('/',(req,res)=>{res.send("Hola mundo")});

app.listen(port,()=>{
    db.sequelize.sync();
    console.log(`Server start at port ${port}`)
})