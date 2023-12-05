import ApiManager from "./ApiManager";

export const user_login = async (data) => {
    try {
        console.log(data);
        const result = await ApiManager("/signin",
        {
            method: 'POST',
            headers:{
    "Content-Type": "application/json",
            },
            data:data,
            // username:this.data.username,
            // password:this.data.password

        }  );
        return result;
    } catch (error) {
        console.log(data.username);
        console.log('soy error line');
        return error.response.data;
    }
};
export const user_register = async (data) => {
    try {
        console.log(data);
        const result = await ApiManager("/signup",
        {
            method: 'POST',
            headers:{
    "Content-Type": "application/json",
            },
            data:data,
            // username:this.data.username,
            // password:this.data.password

        }  );
        return result;
    } catch (error) {
        console.log(data.username);
        console.log('soy error line');
        return error.response.data;
    }
};