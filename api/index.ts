import express from 'express';
const app = express();
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const MONGODB_URL = process.env.MONGODB_URL


const {registerUser, loginUser, getUser} = require('./controllers/User.controller')
const {createPlan, getPlans,getPlanById , deletePlan, updatePlan} = require('./controllers/TourPlan.controller')

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
mongoose.connect(MONGODB_URL).then(() => console.log('Connected to DB'))
app.use(express.json())

app.post("/register", registerUser)
app.post("/login", loginUser)
app.post("/user", getUser)

app.post("/plan", getPlans)
// app.get("/plan", getPlans)
app.get("/plan/:id", getPlanById)
app.post("/plan/create", createPlan)
app.put("/plan/update/:id",updatePlan)
app.delete("/plan/delete/:id", deletePlan)

app.post("/getDirection", async(req, res) => {

    const {origin, destination} = req.body
    console.log(req.body);

    const requestData = {
        origin: {
          location: {
            latLng: {
              latitude: origin.lat,
              longitude: origin.lng
            }
          }
        },
        destination: {
          location: {
            latLng: {
              latitude: destination.lat,
              longitude: destination.lng
            }
          }
        }
      };

    const data = await fetch(`https://routes.googleapis.com/directions/v2:computeRoutes?key=${process.env.GOOGLE_API_KEY}&$fields=*`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestData)
    })
    const response = await data.json()
    console.log(response);
    res.json(response)
  })
  
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(PORT,'start server');
})