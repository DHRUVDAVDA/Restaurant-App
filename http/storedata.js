import { async } from "@firebase/util";

export async function storeUser(userData) {
    const response = await fetch('https://restaurant-app-ca9a9-default-rtdb.firebaseio.com/users.json', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    console.log("res",response);
    const result = await response.json();
    console.log( 'result name =>>>> ',result);
    return result.name;    
  }

  export async function getdata(){
    const response=await fetch('https://restaurant-app-ca9a9-default-rtdb.firebaseio.com/users.json',{
      method:'GET'
    }).then((response) => response.json())


      const users = [];
    
      for (const key in response) {
        const userObj = {
          id: key,
          name:response[key].name,
          email: response[key].email,
          password: response[key].password,
        };
        users.push(userObj);
      }
      return users;
  }

  export function updatePassword(id,userData) {
    return fetch(`https://restaurant-app-ca9a9-default-rtdb.firebaseio.com/users/${id}.json`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }

  export async function storeData(foodData , storeinStorage) {
    const response = await fetch('https://restaurant-app-ca9a9-default-rtdb.firebaseio.com/food_data.json', {
      method: 'POST',
      body: JSON.stringify(foodData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    
    const result = await response.json();
    console.log( 'result name =>>>> ',result);
    return storeinStorage();
  }
  

 export async function storeImage(image){
  const res = await fetch(
    'https://firebasestorage.googleapis.com/v0/b/restaurant-app-ca9a9.appspot.com',{
      method: 'post',
      body: image,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer '
      },
    })
    let responseupload = await res.json();
    console.log("resppppppppppppp",JSON.stringify(responseupload));
    console.log("firebase url",res.url);
    
};
 
export async function getFooddata(){
  const response=await fetch('https://restaurant-app-ca9a9-default-rtdb.firebaseio.com/food_data.json',{
    method:'GET'
  }).then((response) =>{
    return response.json()})


    const Food = [];
  
    for (const key in response) {
      const foodObj = {
        id: key,
        name:response[key].foodname,
        price: response[key].foodprice,
        category: response[key].foodcat,
        url: response[key].url,
        restaurant_name:response[key].restname,
        restaurant_address:response[key].restadd

      };
      Food.push(foodObj);
    } 
    return Food;    
}
