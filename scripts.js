//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// подключаем модули
const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const FaceTracking = require('FaceTracking');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures');

// определяем плейн
const plane = Scene.root.find('plane0');

//задаем границы по оси X
FaceTracking.face(0).cameraTransform.rotationY.monitor().subscribe(function(event) {
    if(event.newValue > 0.09 ) {
      plane.transform.x = 0.09;
    }
    else {
        if(event.newValue < -0.09){
            plane.transform.x = -0.09;
         }
         else {
             plane.transform.x = FaceTracking.face(0).cameraTransform.rotationY;
         }
    }
  });

//задаем изначальное положение по оси Y
plane.transform.y = Reactive.add(0,-0.195);

//вывод всякого мониторинга
Diagnostics.watch("X - ", FaceTracking.face(0).cameraTransform.rotationX);
Diagnostics.watch("Y - ", FaceTracking.face(0).cameraTransform.rotationY);
Diagnostics.watch("planeX - ", plane.transform.x);
Diagnostics.watch("planeY - ", plane.transform.y);




