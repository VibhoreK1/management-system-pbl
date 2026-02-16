

const Api_Url="https://jsonplaceholder.typicode.com/posts";


async function fetchData(){

    const response = await fetch(Api_Url);
    console.log("response is", response);
    
 const data = await response.json();
 console.log("converted response is",data );

const filterDataById = data.sort((a,b)=> b.id -a.id);

console.log("filtered data", filterDataById);


}

fetchData();