document.getElementById('error-message').style.display='none';
const searchPhone=async ()=>{
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    //clear data
    searchField.value='';
    document.getElementById('error-message').style.display='none';
    if(searchText==''){
        //please write something to display
        const err1=document.getElementById('error1');
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <h5>Please input the Phone brand !...</h5>
        `;
        err1.appendChild(div);

    }
  
    else{
    const err1=document.getElementById('error1');
    err1.textContent='';
    //load data
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res=>res.json())
        .then(data=>console.log(data.data))
        .catch(error=>displayError(error));        
    }

}

