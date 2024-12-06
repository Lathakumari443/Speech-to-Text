const resultElement = document.getElementById("result");
let recognition;

function startConverting() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        setupRecognition(recognition);
        recognition.start();
    } else {
        alert("Speech recognition is not supported in this browser.");
    }
}

function setupRecognition(recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        const { finalTranscript, interTranscript } = processResult(event.results);

        // Update the DOM with the transcribed text
        resultElement.innerHTML = finalTranscript + `<span style="color: gray;">${interTranscript}</span>`;
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);
    };

    recognition.onspeechend = function () {
        console.log("Speech ended. Stopping recognition.");
        recognition.stop();
    };
}

function processResult(results) {
    let finalTranscript = '';
    let interTranscript = '';

    for (let i = 0; i < results.length; i++) {
        let transcript = results[i][0].transcript; // Use `results[i]`
        transcript = transcript.replace("\n", "<br>"); // Replace newline with <br>

        if (results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interTranscript += transcript;
        }
    }

    return { finalTranscript, interTranscript };
}

function stopConverting(){
    if(recognition){
        recognition.stop();
    }
}