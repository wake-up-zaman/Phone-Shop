const searchPhone=async ()=>{
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;

    //clear data
    searchField.value='';
    
    if(searchText==''){

        //clear previous data
        const searchError=document.getElementById('searchItemError');
        searchError.textContent='';

        //Error Handeling-press search button before input value
        const emptyError=document.getElementById('emptyValueError');
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <h4>Please input the Phone brand !...</h4>
        `;
        emptyError.appendChild(div);

    }

    else{
         //clear previous data
        const emptyError=document.getElementById('emptyValueError');
        emptyError.textContent='';

        //load phones
        const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>displaySearchResult(data.data))       
    }
}

const displaySearchResult=phones=>{
     //clear previous data
    const searchResult=document.getElementById('search-result');
    const searchError=document.getElementById('searchItemError');
    const phoneDetails=document.getElementById('phone-details');
    searchError.textContent='';
    searchResult.textContent=''; 
    phoneDetails.textContent='';

    //Error Handling-unexpected input data or products which are out of bounds
    if(phones.length==0){
        const searchError=document.getElementById('searchItemError');
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <h4 class="text-center text-danger">No result Found!...</h4>
        `;
        searchError.appendChild(div);
    }  

    //Displaying phones of searched brand
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
//Load phone details
const loadPhoneDetail=async id=>{
    const url=` https://openapi.programming-hero.com/api/phone/${id}`;

    fetch(url)
    .then(res=>res.json())
    .then(data=>displayPhoneDetail(data.data));
}

const displayPhoneDetail=phone2=>{
     //clear previous data
    const phoneDetails=document.getElementById('phone-details');
    const searchError=document.getElementById('searchItemError');
    phoneDetails.textContent='';
    searchError.textContent='';

    const div=document.createElement('div');
    const release=phone2.releaseDate;
    div.classList.add('card');

    //Displaying phone details info
    //If release date doesn't exist 
    if(release.length == 0){
        div.innerHTML=`
        <img src="${phone2.image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone2.name}</h5>
          <p class="card-text">Upcoming</p> 
          <p class='card-text'>${phone2.mainFeatures.chipSet}</p>
          <p class='card-text'>${phone2.mainFeatures.displaySize}</p>
          <p class='card-text'>${phone2.mainFeatures.memory}</p>
          <p class='card-text'>${phone2.mainFeatures.sensors[0]}</p>
          <p class='card-text'>${phone2.mainFeatures.sensors[1]}</p>
          <p class='card-text'>${phone2.mainFeatures.sensors[2]}</p>
          <p class='card-text'>${phone2.mainFeatures.sensors[3]}</p>
          <p class='card-text'>${phone2.mainFeatures.sensors[4]}</p>
        </div> 
        `  
    } 
    //If release date exist
    else{
        div.innerHTML=`
        <img src="${phone2.image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone2.name}</h5>         
          <p class="card-text">${phone2.releaseDate}</p>  
          <p class='card-text'>${phone2.mainFeatures.chipSet}</p>
          <p class='card-text'>${phone2.mainFeatures.displaySize}</p>
          <p class='card-text'>${phone2.mainFeatures.memory}</p>
          <p class='card-text'>${phone2.mainFeatures.sensors[0]}</p>
          <p class='card-text'>${phone2.mainFeatures.sensors[1]}</p>
          <p class='card-text'>${phone2.mainFeatures.sensors[2]}</p>
          <p class='card-text'>${phone2.mainFeatures.sensors[3]}</p>
          <p class='card-text'>${phone2.mainFeatures.sensors[4]}</p>
        </div>
        `
    }

    phoneDetails.appendChild(div);
};


