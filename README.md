#Project Space
___

Using various methods of texture mapping, we have implemented multiple models of the sun, earth, and moon.


## Contributors
Sydni Topper, Lauren Mitchell, Benji Hannam

### Oren Nayar Shading

We approached the problem as a suggestion from our Professor, and implemented it using the wikipedia implementation as well as some references to the original paper (citations below). There is a roughness factor, which we have set at 0.5, between 0 and 1. And then like regular shading, we still obtain the global position and normal of the point on the object as well as the light position. The angles between the normal and light source and between the normal and camera location are calculated, and an alpha value is the max of those angles and the beta value is the min of those angles. An A and B are calculated using instructed equations. The incident light is also calculated. Using all 3 of these as well as some PI and trig functions, a final value is passed to gl_FragColor.

### Image mapping

This was the first roadblock that we encountered in our project because it took considerable time for us to figure out all of the webGL, but it really illuminated how everything fit together and led us to a lot of documentation that gave us more ideas. We figured out how to map a 2D image onto 3D objects such as spheres and cubes. We extended this to texture blending by mapping two textures onto one object so that it appears the texture is a combination of both. We then worked to animate these textures, adding in a time element to make them shift with time. This texture blending was used to make a more realistic simulation of the sun. 

### Procedural texturing using value noise, Worley noise, displacement mapping

Value Noise: Generated the java code based off an online algorithm for the turbulence (cited below). This is done by first generating a random value between (0,1) for every pixel point on the texture, to generate a 2D noise map. From there I linearly interpolated at different depths to generate the turbulance and produce a turbulance texture. The next steps involved adding color depending on the value of the texture, where I assumed lower values to be shallower heights on the planet (e.g the sea) whilst higher values were larger heights such as terrain and mountains. 

Worley Noise: used the actual paper from Worley to implement. Used the python file to generate polar coordinates in a 180x360 2D array. In each array, we can force the number of "feature points" and then we use a Poisson density distribution to calculate how many feature points are in each unit. From this, we take these points and convert them to x,y,z cartesian coordinates on a sphere with origin (0,0,0). Using these arrays of feature points, for each position on the object, the closest feature point is calculated and that distance is used to determine what color will be given, procedurally generated, to that position on the object.

Worley Animation: Pass Date.getSeconds + Date.getMilliseconds/1000.0 as a uniform into the FragShader and influence the feature points by adding / subtracting sines and cosines of the time that has been passed in.

## How to Run our Program!
- clone the repo
- if using Chrome, run a local server
- open the HTML file
- enjoy!

## CS77 Acknowledgments

Thank you to the TAs and professor for all of your help and hard work!

### Sources

https://threejs.org/examples/#webgl_shader_lava
http://learningwebgl.com/blog/?p=1253
http://graphics.ucsd.edu/courses/cse168_s06/ucsd/cellular_noise.pdf
http://lodev.org/cgtutor/randomnoise.html
https://en.wikipedia.org/wiki/Oren%E2%80%93Nayar_reflectance_model
http://www1.cs.columbia.edu/CAVE/publications/pdfs/Oren_SIGGRAPH94.pdf

