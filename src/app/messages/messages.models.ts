interface IMessage {    
    text: string,
    timeStamp: Date,
    messageType: any
}

export class Message implements IMessage {
    constructor(){

    }

    private id: number;
    public text: string;
    public timeStamp: Date;
    public messageType: any;
}