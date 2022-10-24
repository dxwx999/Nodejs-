import axios from "axios";

axios.get('http://127.0.0.1/api/get/',{params:{gender:'男',age:16,name:'zs'}})
.then((res)=>{
  console.log(res);
})