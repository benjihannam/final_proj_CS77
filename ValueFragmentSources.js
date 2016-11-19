
// =================================== Only interpolation of the value noise ===========================
var ValueInterpFragmentSource = `
    precision mediump float;

    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform float time;

    void main() {

        float value = 0.0;
        float size = 64.0;
        float init_size = 64.0;
        for(int i = 0; i < 6; i++){
            value += (texture2D(uSampler, vTextureCoord/size))[0] * size;
            size = size / 2.0;
        }
        value = value / 128.0;

        vec4 color = vec4(value, value, value, 1.0);

        gl_FragColor = color;
    }
`;

// =================================== Added in initial colors ===========================
var ValueInitColorsFragmentSource = `
    precision mediump float;

    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform float time;

    void main() {

        float value = 0.0;
        float size = 64.0;
        float init_size = 64.0;
        for(int i = 0; i < 6; i++){
            value += (texture2D(uSampler, vTextureCoord/size))[0] * size;
            size = size / 2.0;
        }
        value = value / 128.0;

        vec4 color = vec4(value, value, value, 1.0);

        //sea
        if(value < 0.4){
           vec3 dark_blue = vec3(0.0, 0.0, 0.1);
           color = vec4(dark_blue, 1.0);
       }
       else if (value < 0.5){
        vec3 light_blue = vec3(0.0, 0.0, 0.2);
        color = vec4(light_blue, 1.0);

       }
       else if (value < 0.6){
           vec3 green = vec3(0.223, 0.462, 0.156);
           color = vec4(green, 1.0);
       }
       else if(value < 0.80){
           vec3 brown = vec3(0.392, 0.333, 0.184);
           color = vec4(brown, 1.0);


       }
       else{
           color = vec4(0.86, 0.86, 0.86, 0.0);
       }

        gl_FragColor = color;
    }
`;

// =================================== Specular ===========================
var ValueSpecularFragmentSource = `
    precision mediump float;

    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform float time;

    const vec3 LightPosition = vec3(5.0, 0.0, 100.0);
    const vec3 LightIntensity = vec3(5000.0);
    uniform mat4 ViewInverse;
    uniform mat4 ModelInverse;
    const float n = 1.0;

    varying vec3 vNormal;
    varying vec4 globalPosition;

    void main() {

        float value = 0.0;
        float size = 64.0;
        float init_size = 64.0;
        for(int i = 0; i < 6; i++){
            value += (texture2D(uSampler, vTextureCoord/size))[0] * size;
            size = size / 2.0;
        }
        value = value / 128.0;

        vec4 color = vec4(value, value, value, 1.0);
        vec3 ks = vec3(0.0);

        //sea
        if(value < 0.4){
           vec3 dark_blue = vec3(0.0, 0.0, 0.05);
           color = vec4(dark_blue, 1.0);
           ks = vec3(0.3);
       }
       else if (value < 0.5){
        vec3 light_blue = vec3(0.0, 0.0, 0.2);
        color = vec4(light_blue, 1.0);
        ks = vec3(0.3);
       }
       //land
       else if (value < 0.6){
           vec3 green = vec3(0.223, 0.462, 0.156);
           color = vec4(green, 1.0);
           vec3 ks = vec3(0.0);
       }
       else if(value < 0.80){
           vec3 brown = vec3(0.392, 0.333, 0.184);
           color = vec4(brown, 1.0);
           vec3 ks = vec3(0.0);


       }
       else{
           color = vec4(0.86, 0.86, 0.86, 0.0);
           vec3 ks = vec3(0.0);
       }

       
       //get the light vector and the eye vector
        vec3 l = LightPosition - vec3(globalPosition);
        vec3 view_direction = vec3(ViewInverse * vec4(0.0, 0.0, 0.0,1.0))  - vec3(globalPosition);


        // combine them and normalize to get h
        vec3 combined = normalize(l) + normalize(view_direction);
        vec3 h = normalize(combined);

        //get the normal vector
        vec3 n2 = vec3(ModelInverse * vec4(vNormal, 1.0));

        // calculate the dot product
        float n_dot_h = dot(normalize(n2), normalize(h));

        //get the amount of incident light falling on the point
        vec3 incident_light = LightIntensity / pow(length(l), 2.0);

         //calculate the light components
        vec3 spec_light = ks * incident_light * pow(n_dot_h, n);
        gl_FragColor = color + vec4(spec_light, 0.0);
    }
`;