interface Index {
    height: number,
    weight: number
}

export const parseArguments = (args: Array<string>): Index => {
    if(args.length !== 4) throw new Error('We need 2 arguments only!');
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers');
    }
};

export const calculateBmi = (h: number, w: number) : string => {
    const bmi = w/Math.pow(h/100, 2);
    if(bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi <=24.9) {
        return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi <= 29.9) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' ' + error.message;
    }
    console.log(errorMessage);
}