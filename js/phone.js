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
        .then(data=>displaySearchResult(data.data))
        .catch(error=>displayError(error));        
    }
}
const displayError=error=>{
    document.getElementById('error-message').style.display='block';

}
const displaySearchResult=phones=>{
    const searchResult=document.getElementById('search-result');
    searchResult.textContent='';
        if(phones.length==0){
            const err2=document.getElementById('error2');
            const div=document.createElement('div');
            div.classList.add('col');
            div.innerHTML=`
            <h2 class="text-center text-danger">No result Found!...<h2>
            `;
            err2.appendChild(div);
    }
        else{
            phones.forEach(phone=>{
                const div=document.createElement('div');
                div.classList.add('col');
                div.innerHTML=`
                <div  class="card h-100 p-5 bg-light p-2 text-dark bg-opacity-50">
                    <img src="${phone.image}" class="card-img-top rounded" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                        <button onclick="loadPhoneDetail('${phone.slug}')">Details</button>
                    </div>
                </div>
                `;
                searchResult.appendChild(div);
            })
        }
};

const loadPhoneDetail=async id=>{
    const url=` https://openapi.programming-hero.com/api/phone/${id}`;

    fetch(url)
    .then(res=>res.json())
    .then(data=>displayPhoneDetail(data.data));
}

const displayPhoneDetail=phone2=>{
    const phoneDetails=document.getElementById('phone-details');
    phoneDetails.textContent='';
    const div=document.createElement('div');
    div.classList.add('card');
        div.innerHTML=`
        <img src="${phone2.image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone2.name}</h5>
          <p class='card-text'>${phone2.mainFeatures.chipSet}</p>
          <p class='card-text'>${phone2.mainFeatures.displaySize}</p>
          <p class='card-text'>${phone2.mainFeatures.memory}</p>
        </div> 
        `   
    phoneDetails.appendChild(div);
}


