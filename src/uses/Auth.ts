import axios from "axios"
import { useStore } from "vuex";

export default function(){
    const store = useStore();
    const checkAuthenticaiton = async ()=>{
        const token = localStorage.getItem("JWT");
        if(token){
            try {
                const data = await axios.get("https://localhost:44308/api/v1/Users/Authentication", {
                    headers:{
                      Authorization: `Bearer ${token}`,
                    }
                })
                if(store)
                    store.commit("CHANGE_AUTHENTICATION", data.data);
            } catch (error) {
                console.log(error)
            }
        }
       
    }
    return {
        checkAuthenticaiton
    }
}