export interface IProduct {
    id:string;
    attributes:{
        description:string;
        price:number;
        slug:string;
        title:string;
        image:{
            data:{
                attributes:{
                    formats:{
                        medium:{
                            url:string
                        },
                        small:{
                            url:string;
                        },
                        thumbnail:{
                            url:string;
                        }
                    }
                }
            }
        }
    }

}

