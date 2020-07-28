function drawface() {

    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {

        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
        // A keypoint is an object describing a body part (like rightArm or leftShoulder)
        neusx = pose.keypoints[0].position.x;
        neusy = pose.keypoints[0].position.y;

        linkeroogx = pose.keypoints[1].position.x;
        linkeroogy = pose.keypoints[1].position.y;

        rechteroogx = pose.keypoints[2].position.x;
        rechteroogy = pose.keypoints[2].position.y;

        let afstand = dist(neusx, neusy, linkeroogx, linkeroogy);

        draweyes(linkeroogx, linkeroogy, afstand, 0);
        draweyes(rechteroogx, rechteroogy, afstand, 0);

        fill(255, 0, 0); //kleur rodeneus
        ellipse(neusx, neusy, afstand, 0);
    }
}