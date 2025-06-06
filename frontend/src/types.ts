
export enum currentUser {
    Student = 'Student',
    Teacher = 'Teacher',
    None = ''
}

export type OptionsType={
    id:number,
    optionName: string;
    correctOption: string;
}

export type getQuestionType={
    timeAllowed:number,
    questionName:string,
    options:string[]
}