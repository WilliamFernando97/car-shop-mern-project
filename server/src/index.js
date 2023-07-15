import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js' 
import { clientsRouter } from './routes/clients.js' 
import { carsRouter } from './routes/cars.js';
import { servicesRouter } from './routes/services.js';
import { ordersRouter } from './routes/orders.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/form", ordersRouter);
app.use("/form", clientsRouter);
app.use("/form", carsRouter);
app.use("/form", servicesRouter);

const PWD = 'carshoppassword123'

const DB = 'carshop'

mongoose.connect(
    `mongodb+srv://williamtandazo97:${PWD}@carshop.iqsd0m0.mongodb.net/${DB}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

)

app.listen(3001, () => console.log('RUNNING SERVER ON 3001!'))