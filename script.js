        const inputBox = document.querySelector(".inputField input");
        const addBtn = document.querySelector(".inputField button");
        const todoList = document.querySelector(".todoList");
         
        const deleteAllBtn = document.querySelector(".footer button");
        inputBox.onkeyup = ()=>{
            let userData = inputBox.value //getting user entered value
            if(userData.trim()  !=0){ // if user value arent't spacees
                addBtn.classList.add("active");//active the add button
            }else{
                addBtn.classList.remove("active");//unactive the add button
            }
        }

        //Api fetch function 
        async function fetchdeta(){
         try {
       
            await fetch(fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => console.log('=>',json)))
          
            }catch(error){
               console.log(error) 
            }
           }
         
           showTasks();// calling showtask function
        //if user Click on the button 

        addBtn.onclick =()=>{
            let userData = inputBox.value; //getting user entered value
            let getLocalStorage = localStorage.getItem("New Todo")// get in localstroage
            if(getLocalStorage==null){//if localstroage is null
            listArr = []; // creating  blank array
        }else{
            listArr=JSON.parse(getLocalStorage); //transforming  json string  into a js object into
        }
        listArr.push(userData); // pusing or adding user data
        localStorage.setItem("New Todo", JSON.stringify(listArr));  //transforming js object into json string
         showTasks(); // calling show task
    }


// function task inside list inside ul

        function showTasks(){
           let getLocalStorage = localStorage.getItem("New Todo");
               
           if(getLocalStorage==null){//if localstroage is null
                   listArr = []; // creating  blank array
              }else{
                   listArr=JSON.parse(getLocalStorage); //transforming  json string  into a js object into
              }

        const pendingNumber = document.querySelector(".pendingNumber")
           
        pendingNumber.textContent = listArr.length; // passing the lenth value in pendingNumber 
             if(listArr.length > 0){ // if array length is grather than 0
                 deleteAllBtn.classList.add("active");//active the clear all btn button
            }else{
                  deleteAllBtn.classList.remove("active");
        }

        let newLiTag = '';
        
        listArr.forEach((element, index) => {
            newLiTag +=`<li> ${element} <span onclick = "deleteTask(${index})";><i class="fa-solid fa-trash"></i></span></li>`;
        });
           todoList.innerHTML = newLiTag; //adding a new list task
           inputBox.value ="";
        }


    // delete Task
           
    function deleteTask(index){
        let getLocalStorage = localStorage.getItem("New Todo");
        listArr=JSON.parse(getLocalStorage);
        listArr.splice(index, 1); // delete or remove particular index task li
        //after remove the li again upadte to the local strorage
        localStorage.setItem("New Todo", JSON.stringify(listArr));  //transforming js object into json string
        showTasks(); // calling show task
        }
    
        //delete all task function
        
        deleteAllBtn.onclick=() =>{
            listArr=[]
            //after all delete task the li again upadte to the local strorage
            localStorage.setItem("New Todo", JSON.stringify(listArr));  //transforming js object into json string
            showTasks(); // calling show task
         }

        
         fetchdeta();
        