Webcam.set
({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/XfBZ-zn7S/model.json',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        gesture = results[0].label;
        toSpeak = "";

        if(gesture == "Amazing")
        {
            toSpeak = "This looks amazing";
            document.getElementById("result_object_gesture_icon").innerHTML = "";
        }

        if(gesture == "Best")
        {
            toSpeak = "All the best";
            document.getElementById("result_object_gesture_icon").innerHTML = "";
        }

        if(gesture == "Victory")
        {
            toSpeak = "This is a marvelous victory";
            document.getElementById("result_object_gesture_icon").innerHTML = "";
        }

        if(gesture == "Thumbs down")
        {
            toSpeak = "All the worse";
            document.getElementById("result_object_gesture_icon").innerHTML = "";
        }

        if(gesture == "Waving Hand")
        {
            toSpeak = "Hello";
            document.getElementById("result_object_gesture_icon").innerHTML = "";
        }

        if(gesture == "Raised Fist")
        {
            toSpeak = "Want a punch?";
            document.getElementById("result_object_gesture_icon").innerHTML = "";
        }
    }
}

function speak()
{
    var syth = window.speechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    syth.speak(utterThis);
}