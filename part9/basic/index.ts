/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express(); 

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (isNaN(Number(req.query.weight)) || isNaN(Number(req.query.height))) {
        res.json({
            error: 'Invalid values'
        });
    } else {
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);
        if(weight !== 0 && height !== 0) {
            res.status(200).json({
                weight: weight,
                height: height,
                bmi: calculateBmi(height, weight)
            });
        } else {
            res.json({
                error: "Height or weight is 0"
            });
        }
    }
});

app.post('/exercises', (req, res) => {
    console.log(req.body);
    const arr: Array<string> = req.body.daily_exercises;
    const target: number = req.body.target;
    if(!arr || !target) {
        res.json({
            error: "parameters missing"
        });
    } else {
        if(arr.filter(hour => isNaN(Number(hour)) || Number(hour) < 0).length > 0){
            res.json({
                error: "malformatted parameters"
            });
        } else if(arr.length !== 7){
            res.json({
                error: "Array length must be 7"
            });
        } else {
            const hourList: number[] = [];
            arr.forEach(hour => hourList.push(Number(hour)));
            res.status(200).json(calculateExercises(hourList, target));
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});