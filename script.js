const audioElement =document.getElementById('audio');
const button=document.getElementById('button');
// Robotic voice
const robotVoice = new Audio('robot.mp3');

//converting the received joke to speech

function convertToSpeech(joke){
    VoiceRSS.speech({
        key: 'fab0e4a1283f4fc986876be0fa2b1d14',
        src: joke,
        hl: 'en-in',
        v: 'Jai',
        r: -1, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });

}

// Get Jokes from the API

async function getJoke(){
    robotVoice.play();
    let joke='';
    const apiUrl='https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes/1';
    try{
        const response=await fetch(apiUrl);
        const data=await response.json();
        const [jokeText]=data;
        const {setup,punchline}=jokeText;
        joke=`${setup} ...${punchline}`;
       convertToSpeech(joke);
    }catch(error){
        console.log(error);
    }
}

// Event Listeners
button.addEventListener('click',getJoke);
audioElement.addEventListener('play',()=>{
    robotVoice.pause();
    button.disabled=true;
})
audioElement.addEventListener('ended',()=>{
    button.disabled=false;
})