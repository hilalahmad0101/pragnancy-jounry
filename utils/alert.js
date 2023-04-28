import { toast } from "react-hot-toast";

export const successAlert=(message)=>{
    toast(message, {
        style: {
            backgroundColor: "#55efc4",
            color: 'white',
        },
    });
}


export const dangerAlert=(message)=>{
    toast(message, {
        style: {
            backgroundColor: "#d63031",
            color: 'white',
        },
    });
}