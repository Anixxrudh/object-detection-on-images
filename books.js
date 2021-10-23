status = "";
img = "";
objects = [];

function preload(){
    img = loadImage("books.jpg");
}

function setup(){
    canvas = createCanvas(380 , 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(img, 0 ,0 , 380 , 380);

    if(status != ""){
        objectDetector.detect(img, gotResult);
        for(i=0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are : " + objects.length;
            
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + " % " , objects[i].x +15 , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}