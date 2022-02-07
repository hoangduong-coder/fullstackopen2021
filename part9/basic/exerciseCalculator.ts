interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface RatingData {
    point: number;
    description: string;
}

interface ValueVariable {
    hour: Array<number>;
    target: number;
}

const parseArgument = (args: Array<string>, target: string): ValueVariable => {
    const hourList: number[] = [];
    if(args.length !== 7) throw new Error("An array must have 7 elements for 7 days.");
    if((args.filter(hours => isNaN(Number(hours))).length == 0) && !isNaN(Number(target))) {
        args.forEach(hours => hourList.push(Number(hours)));
        return {
            hour: hourList,
            target: Number(target)
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const rating = (arr: Array<number>, target: number): RatingData => {
    if(arr.filter(hours => hours >= target).length >= 5) {
        return {
            point: 3,
            description: "Nice job! Keep going!"
        };
    } else if (arr.filter(hours => hours >= target).length >= 3 && arr.filter(hours => hours >= target).length <= 4) {
        return {
            point: 2,
            description: "Not too bad but could be better"
        };
    } else if (arr.filter(hours => hours >= target).length >= 1 && arr.filter(hours => hours >= target).length <= 2) {
        return {
            point: 1,
            description: "You have to pay more effort!"
        };
    } else {
        return {
            point: 0,
            description: "No exercise did much during last week!!!"
        };
    }
};

export const calculateExercises = (arr: Array<number>, target: number) : Result => {
    let sum = 0;
    arr.forEach(hours => sum += hours);
    return {
        periodLength: arr.length,
        trainingDays: arr.filter(hours => hours > 0).length,
        success: (arr.filter(hours => hours >= target).length >= 3),
        rating: rating(arr, target).point,
        ratingDescription: rating(arr, target).description,
        target: target,
        average: sum/arr.length
    };
};

try {
    const list: string[] = [];
    for(let i=3; i < process.argv.length; i++) {
        list.push(process.argv[i]);
    }
    const { hour, target } = parseArgument(list, process.argv[2]);
    console.log(calculateExercises(hour, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if(error instanceof Error) {
        errorMessage += ' ' + error.message;
    }
    console.log(errorMessage);
}