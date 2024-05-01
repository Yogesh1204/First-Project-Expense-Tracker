window.onload = function() {
    // Retrieve expenses from localStorage and display them
    const expenseList = document.querySelector("ul");
    const categories = ["fuel", "food", "movie", "electricity"];
    
    categories.forEach(category => {
        const expenseData = localStorage.getItem(category);
        if (expenseData) {
            const expenseTracker = JSON.parse(expenseData);
            const li = document.createElement("li");
            const liText = document.createTextNode(expenseTracker.expenseamount + ' - ' + expenseTracker.description + ' - ' + category);
            li.appendChild(liText);
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete Expense";
            deleteBtn.addEventListener('click', function() {
                localStorage.removeItem(category);
                li.remove();
            });

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit Expense";
            editBtn.addEventListener('click', function() {
                localStorage.removeItem(category);
                li.remove();
                document.getElementById("expenseAmount").value = expenseTracker.expenseamount;
                document.getElementById("description").value = expenseTracker.description;
                document.getElementById("category").value = category;
            });

            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
            expenseList.appendChild(li);
        }
    });
};

function handleFormSubmit(event){
    event.preventDefault();
    let expenseamount = event.target.expenseAmount.value;
    let description = event.target.description.value;
    let category = event.target.category.value;
    let expenseTracker = {
        expenseamount: expenseamount,
        description: description,
        category: category
    }
    localStorage.setItem(category, JSON.stringify(expenseTracker));
    // console.log(localStorage.getItem(category));

    const li = document.createElement("li");
    const liText = document.createTextNode(expenseamount+ ' - ' + description + ' - ' + category);
    li.appendChild(liText);
    const ul = document.querySelector('ul');
    ul.appendChild(li);

    const deleteBtn = document.createElement("button");
    const deleteBtnText = document.createTextNode("Delete Expense");
    deleteBtn.appendChild(deleteBtnText);
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', function(event){
        event.preventDefault();
        localStorage.removeItem(category);
        li.remove();
    })

    const editBtn = document.createElement("button");
    const editBtnText = document.createTextNode("Edit Expense");
    editBtn.appendChild(editBtnText);
    li.appendChild(editBtn);
    editBtn.addEventListener('click', function(event){
        event.preventDefault();
        localStorage.removeItem(category);
        li.remove();
        document.getElementById("expenseAmount").value = expenseamount;
        document.getElementById("description").value = description;
        document.getElementById("category").value = category;
    })
}