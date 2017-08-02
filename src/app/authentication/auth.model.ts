interface IUser {
    access_token: string,
    token_type: string,
    expires_in: number,
    userName: string,
    roles: string[]
}

export class User implements IUser {    
    constructor (
        public access_token:string, 
        public token_type:string, 
        public expires_in:number, 
        public userName:string,
        public roles: string[]        
    ) { }
}
