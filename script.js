let input=document.querySelector('#input');
let searchBtn=document.querySelector('#search');

let apiKey='c1030d29-8dc5-4e9b-ad10-6ffc2d9af87e';

let notFound=document.querySelector('.not_found');
let defBox=document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');





searchBtn.addEventListener('click', function(e){

 e.preventDefault();



 //get input data
let word=input.value;


 //call api to get data

 if(word ===''){
    alert('word is required');

    return;
 }


 getData(word);


})


async function getData(word){
   //Ajax call to get data

  const response=  await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);

  const data=await response.json();
  

  //if empty result

  if(!data.length){
    loading.style.display='none';

    notFound.innerText= 'no response found';

     return;
  }


//if result is suggestions

if (typeof data[0] === 'string') {
    loading.style.display = 'none';
    let heading = document.createElement('h3');
    heading.innerText = 'Did you mean?'
    notFound.appendChild(heading);
    data.forEach(element => {
        let suggetion = document.createElement('span');
        suggetion.classList.add('suggested');
        suggetion.innerText = element;
        notFound.appendChild(suggetion);
        
    })
    return;

}

//result found


let defination= data[0].shortdef[0];


defBox.innerText=defination;

// Sound 
const soundName = data[0].hwi.prs[0].sound.audio;
if(soundName) {
    renderSound(soundName);
}

  console.log(data);

 
}




function renderSound(soundName) {
    // https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);

}