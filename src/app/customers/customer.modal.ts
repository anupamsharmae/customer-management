export class Customer{
    constructor(
        public firstName:string,
        public lastName : string,
        public email: string,
        public companyName: string,
        public gender: string,
        public mobile: number,
        public status?: number,
        public id?: string
    ){}
}