
const fs= require("fs");
const posts= [];
const categories= [];

module.exports.initialize= ()=>{
    let res, rej;
    
    const promise= new Promise((resolve,reject)=>{
    res =resolve;
    rej =reject;
    });


    fs.readFile("./data/categories.json", "utf-8", (err, data) => {
        if (err) {
            rej("Unable to read file categories.json")
        }
        data = JSON.parse(data);
        data.forEach(val => {
            categories.push(val);
        })
        fs.readFile("./data/posts.json", "utf-8", (err, data) => {
            if (err) {
                rej("Unable to read file posts.json")
            }
            data = JSON.parse(data);
            data.forEach(val => {
                posts.push(val);
            })
            res("Files read successfully")
        })
    })
    return promise
}


module.exports.getAllPosts= ()=> {
    return new Promise((resolve,reject)=>{
        if(posts.length === 0){
            reject("No results back avaible")
        } else{
            resolve(posts)
        }
    })
}

module.exports.getPublishedPosts= () =>{

    const publishedPosts= [];
    posts.forEach( post =>{
    
        if( post.published){
            publishedPosts.push(post)
        }
    })
    return new Promise((resolve, reject)=> {
        if (publishedPosts.length === 0){
            reject("No results back avaible")
        }
        else{ resolve(publishedPosts)
        }
    })
}




module.exports.getCategories= () =>{
    return new Promise((resolve,reject)=>{
        if (categories.length === 0){
            reject("No results back avaible")
        }
        else{ resolve(categories)
        }
    })
}
module.exports.posts= posts;
module.exports.categories= categories;