const db = require("../models/workout.js")
const router = require('express').Router();

//requests to handle CRUD Operations in MongoDB

//GET all workout data for last workout function
// router.get("/workouts", (req, res) => {
//     db.find().sort({"day": 1}).then((data) => {
//         res.status(200).json(data);
//     }).catch((err) => {
//         res.status(400).json(err);
//     });
// });

router.get("/workouts", (req, res) => {
  db.aggregate([
    {
      '$sort': {
        'day': 1
      }
    }, {
      '$addFields': {
        'totalDuration': {
          '$sum': '$exercises.duration'
        }
      }
    }
  ]).then((data) => {
    res.status(200).json(data)
}).catch((err) => {
    res.status(400).json(err);
  })
})


//GET last 7 workouts to populate chart on stats pages
router.get("/workouts/range", (req, res) => {
    db.aggregate([
        {
          '$sort': {
            'day': -1
          }
        }, {
          '$limit': 7
        }, {
          '$addFields': {
            'totalDuration': {
              '$sum': '$exercises.duration'
            }
          }
        }
      ]).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(400).json(err);
      })
})

//POST route to create a workout record
router.post("/workouts", (req, res) => {
    db.create(req.body).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(400).json(err);
    })
});

//PUT route to add exercises to a workout.
router.put("/workouts/:id", (req, res) => {
    db.findByIdAndUpdate(req.params.id, { $push: {exercises: req.body }}).then((data)=>{
        res.status(200).json(data)
    }).catch((err) => {
        res.status(400).json(err);
    })
})

module.exports = router