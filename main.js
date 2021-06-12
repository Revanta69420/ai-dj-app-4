song = "";
song2 = "";
song_status = "";
song2_status = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log('poseNet is initialized');
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song_status = song.isPlaying();
    song2_status = song.isPlaying();
    fill(255, 0, 0);
    stroke(255, 0, 0);
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song_status == false) {
            song.play()
            document.getElementById("song").innerHTML = "Playing Harry Potter Theme Song";
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song.stop();
        if (song2_status == false) {
            song2.play()
            document.getElementById("song").innerHTML = "Playing Peter Pan Song";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
    song_leftWrist.isPlaying(song);
    song_rightWrist.isPlaying(song2);
}