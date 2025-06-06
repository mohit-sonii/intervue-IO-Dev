
export enum currentUser {
    Student = 'Student',
    Teacher = 'Teacher',
    None = ''
}

export type OptionsType={

    optionIndex:number,
    optionName: string;
    correctOption: string;
    votes:number
}

export type getQuestionType={
    timeAllowed:number,
    questionName:string,
    options:{
        optionText:string,
        optionIndex:number,
        votes:0
    }[],
    totalVotes:0
}