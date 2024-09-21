function handleFormSubmit(event){
    event.preventDefault();
    let obj={
        title: event.target.title.value,
        url: event.target.url.value
    }
    axios.post("https://crudcrud.com/api/f79c5f4cf56c4169b19538e97e7269b2/appointmentData", obj)
        .then((res)=>{displayUserDetails(res.data)})
        .catch((err)=>{console.log(err)});

    document.getElementById("title").value="";
    document.getElementById("url").value="";
}

window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("https://crudcrud.com/api/f79c5f4cf56c4169b19538e97e7269b2/appointmentData")
        .then((res)=>{
            for(let i=0; i<res.data.length; i++){
                displayUserDetails(res.data[i]);
            }
        })
        .catch((err)=>{console.log(err)});  
})

function displayUserDetails(userDetails){
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.appendChild(document.createTextNode(userDetails.url));
    a.setAttribute("href", userDetails.url);
    a.setAttribute("target", "_blank");
    li.appendChild(document.createTextNode(`${userDetails.title} > `));
    li.appendChild(a);

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    li.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    li.appendChild(editBtn);

    let userList = document.querySelector("ul");
    userList.appendChild(li);

    deleteBtn.addEventListener("click", function(event){
        userList.removeChild(event.target.parentElement);
    });

    editBtn.addEventListener("click", function(event){
        userList.removeChild(event.target.parentElement);
        document.getElementById("title").value = userDetails.title;
        document.getElementById("url").value = userDetails.url;
    })
}