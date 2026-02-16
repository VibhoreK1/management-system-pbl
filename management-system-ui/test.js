import axios from "axios";

async function fetchData(){
   
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");

    const firstTenResponse = response.data.slice(0,10);

    console.log(firstTenResponse);

    const filteredD = firstTenResponse.filter(item=> item.title.startsWith("e")).sort((a,b)=> b.id-a.id).map(item=>({
        pId:item.id,
        pUpperTitle:item.title.toUpperCase(),
        pBody:item.body,
    }));
     console.log("filter data: ", filteredD);

    
}



// async function fetchData(){
//     try{
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     console.log("res",response);

//     if(!response.ok){
//      throw new Error(`http status:  ${response.status}`);
     
//     }
//     else{
//         const data = await response.json();
//     console.log("Original Data:", data);

// //     const sortD =data.sort((a,b)=> b.id - a.id);
// // console.log ("data after sorting in desc order: ", sortD);

// const filtered = data.filter(item => item.title.startsWith("e")).sort((a,b)=> b.id - a.id).map(item=>({
//     pId:item.id,
//     pTitle:item.title.toUpperCase(),
// })


// );
// console.log ("data after sorting in desc order: ", filtered);
//     }


// }


// catch(error){
// console.log(`error fetching date: ${error}`)
// }
// }


fetchData();