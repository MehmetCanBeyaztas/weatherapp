document.querySelector("#btnSelect").addEventListener("click",() => {
    let text = document.querySelector("#citySelect").value;
    getCity(text);
});



function getCity(city){
    const request = new XMLHttpRequest();

    request.open('GET' , 'http://api.tavcan.com/json/havadurumu/' + city);
    request.send();
    
    request.addEventListener('load',function(){
        const data = JSON.parse(this.responseText);
        document.querySelector(".weather .row").innerHTML = "";
        for (const element of data) {
            insertWeatherToHTML(element)
    }
    
    })
}


function insertWeatherToHTML(data){
    let pic;
    let max = data.max;
    let min = data.min;
 
    let avg = (Number(max) + Number(min)) /2 ;    
    
    
    switch(true){
        case avg >=0 && avg < 8:
            pic = "https://cdn.pixabay.com/photo/2013/07/12/15/24/snow-149837_960_720.png";
            break;
        
        case avg >=8 && avg < 13:
            pic = "https://cdn.pixabay.com/photo/2017/01/29/10/56/cloud-2017524_960_720.png";
            break;
        
        case (avg >=13):
            pic = "https://cdn.pixabay.com/photo/2017/01/29/10/49/weather-2017515_960_720.png";
            break;
    }
    let html = `
        <div class="col mt-2">
            <div class= "card h-100">
                <img src="${pic}" class="card-img-top">
                <div class = "card-body text-center">
                <h5 class="card-title">${data.max}°C / ${data.min}°C </h5>
                <p class ="card-text">${data.tarih}</p>
                </div>
            </div>
        </div>
    `;

    document.querySelector(".weather .row").insertAdjacentHTML("beforeend",html);
}