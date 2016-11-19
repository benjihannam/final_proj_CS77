var PhongVertexSource = `
    uniform mat4 ModelViewProjection;
    uniform mat4 Model;
    attribute vec3 Position;
    attribute vec3 Normal;
    varying vec3 vNormal;
    varying vec4 globalPosition;
    void main() {
        gl_Position = ModelViewProjection * vec4(Position, 1.0);
        globalPosition = Model * vec4(Position, 1.0);
        vNormal = Normal;
    }
`;

var PhongFragmentSource = `
    precision highp float;
    // one output of gl_Fragcolor- default output
    const vec3 LightPosition = vec3(4.0, -4.0, 10.0);
    const vec3 LightIntensity = vec3(400.0);
    const vec3 ka = 0.3*vec3(1.0, 0.5, 0.5);
  //  const vec3 kd = 0.7*vec3(1.0, 0.5, 0.5);
    const vec3 kd = 0.7*vec3(0.5, 0.7, 0.7);
    const vec3 ks = vec3(0.4);
    const float n = 60.0; //phong exponent
    varying vec4 globalPosition;
    varying vec3 vNormal;
    uniform mat4 ViewInverse;
    uniform mat4 ModelInverse;
    void main() {
        float roughness = 0.5;
        const float PI = 3.14159;
        vec3 l = LightPosition - vec3(globalPosition);
        vec3 camera_loc = vec3(ViewInverse * vec4(0.0, 0.0, 0.0, 0.0));
        vec3 norm = vec3(ModelInverse * vec4(vNormal, 0.0)); //should be 0
        float cosine = dot(normalize(norm), normalize(l));
        float n_dot_l = dot(normalize(norm), normalize(l));
        float n_dot_v = dot(normalize(norm), normalize(camera_loc));
        float ang_vn = acos(n_dot_v);
        float ang_ln = acos(n_dot_l);
        float alpha = max(ang_vn, ang_ln);
        float beta = min(ang_vn, ang_ln);
        float A = 1.0 - 0.5*(roughness*roughness / (roughness*roughness + 0.57));
        float B = 0.45*(roughness*roughness / (roughness*roughness + 0.09));
        vec3 incident_light = LightIntensity / pow(length(l), 2.0); //this is the irradiance, albedo is kd
        cosine = max(0.0, cosine);
        vec3 lambert = kd * cosine * incident_light;
        float dotted = (1.0/PI) * cos(ang_ln) * (A + (B * sin(alpha) * sin(beta) * 0.5));
        vec3 L_r = kd * dotted * incident_light;
        gl_FragColor = vec4(L_r, 1.0);
    }
`;




var SunVertexSource = `

    uniform mat4 ModelViewProjection;
    uniform mat4 Model;
    // uniform float worley;

    attribute vec3 Position;
    attribute vec3 Normal;

    varying vec3 vNormal;
    varying vec4 globalPosition;

    void main() {

        gl_Position = ModelViewProjection * vec4(Position, 1.0);
        globalPosition = Model * vec4(Position, 1.0);
        vNormal = Normal;
    }
`;

var SunFragmentSource = `
    precision highp float;
    // one output of gl_Fragcolor- default output
    // float cell(vec3 pos) {
    //     vec3 v = vec3(0.0, 0.0, 0.0);
    //     return 2.0;
    // }

    const vec3 LightPosition = vec3(4.0, -4.0, 10.0);
    const vec3 LightIntensity = vec3(400.0);
    const vec3 ka = 0.3*vec3(1.0, 0.5, 0.5);
  //  const vec3 kd = 0.7*vec3(1.0, 0.5, 0.5);
    vec3 kd = 0.7*vec3(0.5, 0.7, 0.7);
    const vec3 ks = vec3(0.4);
    const float n = 60.0; //phong exponent

    varying vec4 globalPosition;
    varying vec3 vNormal;

    uniform mat4 ViewInverse;
    uniform mat4 ModelInverse;
    uniform vec3 one[9];
    uniform vec3 two[10];
    uniform vec3 three[12];
    uniform vec3 four[10];
    uniform vec3 five[8];
    uniform vec3 six[10];
    uniform vec3 seven[12];
    uniform vec3 eight[8];
    uniform vec3 nine[11];
    uniform vec3 ten[7];
    uniform vec3 elev[9];
    uniform vec3 twel[10];
    uniform vec3 thirt[7];
    uniform vec3 fourt[8];
    uniform vec3 fift[8];
    uniform vec3 sixt[7];
    uniform vec3 sevent[9];
    uniform vec3 eighte[8];
    uniform vec3 ninet[7];
    uniform vec3 twenty[9];
    uniform vec3 tweno[14];
    uniform vec3 twent[8];
    uniform vec3 twenth[8];
    uniform vec3 twenf[7];
    uniform vec3 twenfi[9];
    uniform float time;

    void main() {

        vec3 minimum = one[0];
        minimum[0] += 0.1*sin(time);
        minimum[1] += 0.1*cos(time);
        float min_d = (minimum[0] - vNormal[0])*(minimum[0] - vNormal[0]) + (minimum[1] - vNormal[1])*(minimum[1] - vNormal[1]) + (minimum[2] - vNormal[2])*(minimum[2] - vNormal[2]);
        float max_d = (minimum[0] - vNormal[0])*(minimum[0] - vNormal[0]) + (minimum[1] - vNormal[1])*(minimum[1] - vNormal[1]) + (minimum[2] - vNormal[2])*(minimum[2] - vNormal[2]);
        float poss = 0.0;
        for (int i = 0; i < 8; i++) {
            vec3 other = one[i+1];
            other[0] += 0.1*sin(time);
            other[1] += 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }


        }
        // vec3 oh = two[0];
        // float abc = oh[0];
        // if (abc > -.22){
            for (int i = 0; i < 10; i++) {
                vec3 other = two[i];
                other[0] += 0.1*sin(time);
                other[1] -= 0.1*cos(time);
                poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
                if (poss < min_d) {
                    min_d = poss;
                }

            }
        // }
        // vec3 oh2 = three[0];
        // float cbd = oh2[0];
        // if (cbd > 0.0) {
            for (int i = 0; i < 12; i++) {
                vec3 other = three[i];
                other[0] += 0.1*sin(time);
                other[1] += 0.1*cos(time);
                poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
                if (poss < min_d) {
                    min_d = poss;
                }

            }

            for (int i = 0; i < 10; i++) {
                vec3 other = four[i];
                other[0] += 0.1*sin(time);
                other[1] -= 0.1*cos(time);
                poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
                if (poss < min_d) {
                    min_d = poss;
                }
            }

        for (int i = 0; i < 8; i++) {
            vec3 other = five[i];
            other[0] += 0.1*sin(time);
            other[1] += 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 10; i++) {
            vec3 other = six[i];
            other[0] += 0.1*sin(time);
            other[1] -= 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        // if (cbd > 0.0) {
            for (int i = 0; i < 12; i++) {
                vec3 other = seven[i];
                other[0] += 0.1*sin(time);
                other[1] += 0.1*cos(time);
                poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
                if (poss < min_d) {
                    min_d = poss;
                }
                if (poss > max_d) {
                    max_d = poss;
                }
            }
        // }
        for (int i = 0; i < 8; i++) {
            vec3 other = eight[i] ;
            other[0] += 0.1*sin(time);
            other[1] -= 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i <11; i++) {
            vec3 other = nine[i] ;
            other[0] += 0.1*sin(time);
            other[1] += 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 7; i++) {
            vec3 other = ten[i] ;
            other[0] += 0.1*sin(time);
            other[1] -= 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 9; i++) {
            vec3 other = elev[i];
            other[0] += 0.1*sin(time);
            other[1] += 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 10; i++) {
            vec3 other = twel[i];
            other[0] += 0.1*sin(time);
            other[1] -= 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 7; i++) {
            vec3 other = thirt[i];
            other[0] += 0.1*sin(time);
            other[1] += 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 8; i++) {
            vec3 other = fourt[i];
            other[0] += 0.1*sin(time);
            other[1] -= 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 8; i++) {
            vec3 other = fift[i];
            other[0] += 0.1*sin(time);
            other[1] += 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 7; i++) {
            vec3 other = sixt[i];
            other[0] += 0.1*sin(time);
            other[1] -= 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 9; i++) {
            vec3 other = sevent[i];
            other[0] += 0.1*sin(time);
            other[1] += 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 8; i++) {
            vec3 other = eighte[i];
            other[0] += 0.1*sin(time);
            other[1] -= 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 7; i++) {
            vec3 other = ninet[i];
            other[0] += 0.1*sin(time);
            other[1] += 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 9; i++) {
            vec3 other = twenty[i];
            other[0] += 0.1*sin(time);
            other[1] -= 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 14; i++) {
            vec3 other = tweno[i];
            other[0] += 0.1*sin(time);
            other[1] += 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 8; i++) {
            vec3 other = twent[i];
            other[0] += 0.1*sin(time);
            other[1] -= 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 8; i++) {
            vec3 other = twenth[i];
            other[0] += 0.1*sin(time);
            other[1] += 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 7; i++) {
            vec3 other = twenf[i];
            other[0] += 0.1*sin(time);
            other[1] -= 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        for (int i = 0; i < 9; i++) {
            vec3 other = twenfi[i];
            other[0] += 0.1*sin(time);
            other[1] += 0.1*cos(time);
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }

        }
        kd = vec3(0.9*(1.0 - min_d), min_d/0.2, 0.0);

        float roughness = 0.5;

        const float PI = 3.14159;

        vec3 l = LightPosition - vec3(globalPosition);
        vec3 camera_loc = vec3(ViewInverse * vec4(0.0, 0.0, 0.0, 0.0));
        vec3 norm = vec3(ModelInverse * vec4(vNormal, 0.0)); //should be 0
        float cosine = dot(normalize(norm), normalize(l));
        float n_dot_l = dot(normalize(norm), normalize(l));
        float n_dot_v = dot(normalize(norm), normalize(camera_loc));

        float ang_vn = acos(n_dot_v);
        float ang_ln = acos(n_dot_l);

        float alpha = max(ang_vn, ang_ln);
        float beta = min(ang_vn, ang_ln);

        float A = 1.0 - 0.5*(roughness*roughness / (roughness*roughness + 0.57));
        float B = 0.45*(roughness*roughness / (roughness*roughness + 0.09));

        vec3 incident_light = LightIntensity / pow(length(l), 2.0); //this is the irradiance, albedo is kd
        cosine = max(0.0, cosine);
        vec3 lambert = kd * cosine * incident_light;

        float dotted = (1.0/PI) * cos(ang_ln) * (A + (B * sin(alpha) * sin(beta) * 0.5));
        vec3 L_r = kd * dotted * incident_light;

        gl_FragColor = vec4(mix(kd, vec3(1.0, 1.0, 1.0), 0.3), 1.0);//vec4(L_r, 1.0);
    }
`;


var MoonVertexSource = `

    uniform mat4 ModelViewProjection;
    uniform mat4 Model;

    attribute vec3 Position;
    attribute vec3 Normal;

    varying vec3 vNormal;
    varying vec4 globalPosition;

    attribute vec2 aTextureCoord;
    varying vec2 vTextureCoord;

    const vec3 uAmbientColor = 0.2*vec3(1, 1, 1);
    const vec3 uLightingDirection = vec3(-1, -1, -1);
    const vec3 uDirectionalColor = 0.8*vec3(1, 1, 1);
    // const vLightWeighting = 1;


    void main() {

        gl_Position = ModelViewProjection * vec4(Position, 1.0);
        globalPosition = Model * vec4(Position, 1.0);
        vNormal = Normal;

        float directionalLightWeighting = max(dot(vNormal, uLightingDirection), 0.0);
        // vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
        //
        vTextureCoord = aTextureCoord;

    }
`;


var MoonFragmentSource = `
    precision mediump float;


    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    // const vec3 wLightWeighting = 1;

    void main() {
        //vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
        //gl_FragColor = vec4(textureColor.rgb, textureColor.a);
        gl_FragColor = texture2D(uSampler, vTextureCoord);
        //gl_FragColor = vec4(1, 1, 1, 1);
    }
`;



var ValueVertexSource = `

    uniform mat4 ModelViewProjection;
    uniform mat4 Model;

    attribute vec3 Position;
    attribute vec3 Normal;

    varying vec3 vNormal;
    varying vec4 globalPosition;

    attribute vec2 aTextureCoord;
    varying vec2 vTextureCoord;

    const vec3 uAmbientColor = 0.2*vec3(1, 1, 1);
    const vec3 uLightingDirection = vec3(-1, -1, -1);
    const vec3 uDirectionalColor = 0.8*vec3(1, 1, 1);


    void main() {

        gl_Position = ModelViewProjection * vec4(Position, 1.0);
        globalPosition = Model * vec4(Position, 1.0);
        vNormal = Normal;

        float directionalLightWeighting = max(dot(vNormal, uLightingDirection), 0.0);

        vTextureCoord = aTextureCoord;

    }
`;


var ValueFragmentSource = `
    precision mediump float;

    const vec3 LightPosition = vec3(5.0, 0.0, 100.0);
    const vec3 LightIntensity = vec3(10000.0);
    uniform mat4 ViewInverse;
    uniform mat4 ModelInverse;
    const float n = 1.0;

    varying vec3 vNormal;
    varying vec4 globalPosition;

    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform float time;

    void main() {

        vec3 ks = vec3(0.0);

        float value = 0.0;
        float size = 64.0;
        float init_size = 64.0;
        for(int i = 0; i < 6; i++){
            value += (texture2D(uSampler, vTextureCoord/size))[0] * size;
            size = size / 2.0;
        }
        value = value / 128.0;

        vec4 color = vec4(value, value, value, 1.0);
        if(value < 0.5){
            vec3 dark_blue = vec3(0.0, 0.0, 0.05);
           vec3 light_blue = vec3(0.0, 0.0, 0.2);
           color = vec4(mix(dark_blue, light_blue, value * 2.0), 1.0);
           ks = vec3(0.17);

           

       }
       else if (value < 0.51){
           vec3 light_blue = vec3(0.0, 0.0, 0.5);
           vec3 green = vec3(0.223, 0.462, 0.156);
           color = vec4(mix(light_blue, green, 0.8), 1.0);
       }
       else if(value < 0.80){
           vec3 brown = vec3(0.392, 0.333, 0.184);
           vec3 green = vec3(0.223, 0.462, 0.156);
           color = vec4(mix(green, brown, (value-0.5)*1.0/0.3), 1.0);
           if(vTextureCoord[1] < 0.2 || vTextureCoord[1] > 0.80){
            if(value  > 0.6){
                color = vec4(0.86, 0.86, 0.86, 0.0);
            }
            }
            ks = vec3(0.0);

       }
       else{
           color = vec4(0.86, 0.86, 0.86, 0.0);
           ks = vec3(0.0);
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


/*
// else {
//     vec3 L_r = 10.0 * cos_a * incident_light;
// }
//vec3 L_r = 10.0 * cos_a * incident_light;

// vec3 h = normalize(camera_loc) + normalize(l); //- globalPosition
// float cosa = dot(normalize(h), normalize(norm));
// cosa = max(0.0, cosa);
// vec3 blinn = ks * incident_light * pow(cosa, n);

// gl_FragColor = vec4(lambert + blinn + ka, 1.0);
*/

var ShadedTriangleMesh = function(gl, vertexPositions, vertexNormals, indices, vertexSource, fragmentSource) {
    this.indexCount = indices.length;
    this.positionVbo = createVertexBuffer(gl, vertexPositions);
    this.normalVbo = createVertexBuffer(gl, vertexNormals);
    this.indexIbo = createIndexBuffer(gl, indices);
    this.shaderProgram = createShaderProgram(gl, vertexSource, fragmentSource);
    //this.worley = worley;
}

var dist_arr = function() {
    // var lamb = 2.0;
    // this.one = [, 0.5, 0.5, 1.0, 1.0, 1.0];
    // this.two =
    // this.one =[-0.5745871565615002, -0.4084689615220358, -0.7217118296666857, -0.42447192862999805, -0.27490409049330056, -0.6988167529011846];
    // this.two = [-0.7914265242752359, -0.24846262520148943, 0.035948819198421855, -0.22618968316667298, -0.8132941094654598, 0.7295233995020323];
    // this.one =[-0.9640896522719298, -0.9097148438368039, -0.8032141812621195, -0.9705694242833813, -0.9888746718850396, -0.9073597176823565];
    // this.two = [-0.8724729586543694, -0.885750937293721, -0.7298040153532577, -0.9319334057643472, -0.8281796052171673, -0.7452288788387692, -0.9072995272208891, -0.9046140063785485, -0.5802759829858314, -0.8768411583559126, -0.9565052169546819, -0.6284903366770969];
    // this.one =[-0.5745871565615002, -0.4084689615220358, -0.7217118296666857, -0.42447192862999805, -0.27490409049330056, -0.6988167529011846];
    // this.two = [-0.7914265242752359, -0.24846262520148943, 0.035948819198421855, -0.22618968316667298, -0.8132941094654598, 0.7295233995020323, -0.8724729586543694, -0.885750937293721, -0.7298040153532577, -0.9319334057643472, -0.8281796052171673, -0.7452288788387692,];
    // this.three = [-0.7596228403117371, 0.8944375730966678, -0.6385707336944945];
    // this.four = [-0.11691756994171199, 0.10357936064121298, 0.03245094814916616];
    // this.five = [0.42855879372839434, -0.05606648396727998, -0.6445312146619583, 0.9461477039400101, -0.13680199977352314, -0.5834516818827481];
    // this.six = [0.1268629467939102, -0.38494594544096195, 0.08370690213858123, 0.6377961104464309, -0.5425334606789864, 0.277562097522809];
    // this.seven = [0.16064851556694992, 0.18642257983121802, -0.4473447584025899, 0.9635974609590514, 0.1630041535872513, -0.42334881145695014];
    // this.eight = [0.61616275336507, 0.45396874198860493, 0.5061566115267304, 0.48899263921972747, 0.925933888327334, 0.16228683392686793];
    this.one = [-1.1235910031740508, -0.22444316637167452, 0.3566069582262618, -0.28917284896465206, 0.9926489241762603, 0.6091200019317864, 0.8680214631025648, -0.39380497537126785, -0.7290105492831483, 0.3170127885384294, 0.9967439029740867, -0.5882214581151165, -0.06744707073615322, -0.0706473959988064, -1.196018326819326, -1.1881736057938967, -0.15899754931969534, -0.054435850365915896, -0.9592989490291151, 0.5939071363763566, -0.40868060848646964, -0.4054922500875415, -0.18437575515459678, -1.1142628128184637, -0.0067485769732957505, -0.043612492158724786, -1.1991882284431166];

    this.two =[-0.22649532902534694, -0.2532256823589181, -1.1509025239886999, -0.5158726499411777, -0.46017865244453304, 0.9808725793277131, 0.35416368514024876, 1.0649279221217065, 0.4248489199861793, 0.12400029011944042, 0.4431439203364921, -1.1082632331351154, 0.20159077846376586, 0.4283671182837706, 1.102661675225738, -0.37820057072880914, 0.135582851948422, 1.1307438341896607, 1.1338891703318772, -0.3036330300184311, -0.24920339581537385, -0.00966141397036573, 0.053660200919472954, 1.1987607100323963, -0.06576679186638522, 0.4109630783664408, 1.1255150275794554, 0.992745725888742, -0.46015654820382884, 0.49265796946235607];

    this.three =[-0.1952901580843615, 0.06141667085167193, 1.182408451719152, -0.1990856760776464, 0.7800359155541126, 0.8898926137609885, 1.009703799598812, -0.6362483420553626, 0.12524489733128483, 0.13461995753589773, -0.047676065310731895, -1.191471552253565, 1.1645927684478188, -0.2814142912753815, 0.06730289997481478, 0.12398094838620638, 1.166960773762466, -0.2506616782377464, -0.5354850220468402, -0.9266361208957702, -0.5427718587166569, -0.4982729793786668, -0.6866239251659549, -0.8486881779610247, -1.1529994910465247, -0.04721073685426339, -0.32918584412476215, -0.38300632929410294, -0.8711770615356184, 0.7309970445732475, -0.8131414644785292, -0.8222722429048603, 0.3204205319481302, 1.1296183222514378, -0.4017009018480157, 0.05097873564867071];

    this.four =[-0.020371338436391093, 0.7779087443054453, 0.9134785132138771, -1.153059010801654, -0.054418633357934225, 0.32786205933679685, 1.0601599857140036, 0.511748368719927, 0.2327539726908592, 0.2646303161693893, 0.6706293611351903, 0.9592846583509481, -0.6325469031381256, 0.2566509311054029, 0.9869218382896876, 1.1813612958672548, -0.12316033033703927, 0.17092987350990393, 1.1603104764524668, -0.18256117413774386, -0.24566443766263296, 0.8790691338126106, -0.18273251948114366, -0.7961446378027172, -0.2517522992334554, 0.022845095297144413, 1.1730724110009292, 0.2833169491439653, -0.8787750941233476, -0.7664762489968342];

    this.five =[-0.25002286054039485, -0.16408450110038153, 1.1621380493322802, -1.1894814779153022, 0.1527459733759008, -0.04245563936483264, -0.5559488916757727, -0.6932254845107799, 0.8064485460767316, 0.09721627630672294, 0.20721624217020282, -1.1779687706394912, -0.5832450023722212, 1.009214813682338, -0.2851503586740716, -0.6766690366382576, 0.8198053111292868, -0.5568107997329664, 0.23687296503676067, -1.1750697577751095, 0.05569796043877153, -0.5063368960249924, -0.47496638564717664, 0.9787900082392716];

    this.six =[-0.9544734489342767, 0.609122341999542, 0.39742975197699953, 0.4426823134232295, 0.4941547683314776, 0.9999217140944191, -0.2806047663051986, -1.1449659602462565, -0.22430763474338702, -0.5651732190210411, -0.43723038916015977, -0.9640585144565912, -0.17012043661484766, 0.6450626131481169, 0.9974734393278333, 0.06015446186472311, -2.7054944561524495e-05, 1.1984913182771895, -0.6156150156701697, -0.6183932544004324, 0.8237766295504253, -0.06248316194758206, -0.3568720274684409, 1.144000966120045, -0.6447234502745972, -0.05750633979532877, -1.0104576653919566, -0.37572854398976174, 0.2124699055707958, -1.119680579655676];

    this.seven =[0.07926014241324854, -0.12077063942707016, -1.191273386959101, -0.7281698002722629, 0.13595586496518564, -0.9440787810098377, 0.8982610704336925, 0.31224321032369223, -0.7318683125741073, -0.9890675669296239, 0.6530903158729543, -0.18766562647666402, 0.0022540029568733346, 0.13659890270369782, -1.1921978272295315, -0.6487485161739449, -0.8067781224241265, -0.6068232229734669, -0.37930914812132466, -0.09791195960917662, -1.1342565046394777, -0.009953600182449283, 0.010759182851801122, -1.1999104824226554, -0.2758969333581757, -0.23005277672066593, -1.144970131526, 0.6865487490531322, -0.44903150893928734, 0.8757976473782548, -0.7550556705167857, 0.8293617440584474, 0.4266732144308774, -0.3594353669173142, -1.1356159824985779, 0.14554228699180644];

    this.eight =[0.03427980446199803, -1.1632763508288302, 0.292597037935123, 0.11041057786772804, -0.7765602134790582, 0.9081650395915237, -0.7949224667825628, -0.7969258703222968, -0.4159416173159103, -0.20897723556376202, -0.8376216972064294, -0.8334976948889233, -0.034776048916825224, 0.07438605699058322, -1.1971872622723347, 0.2217441269800889, -1.1724348717412771, 0.12738137098827673, -0.9950784472378552, 0.5981120406997206, 0.30344829973607473, 0.10190171014605265, 0.05558376057555045, -1.1943728425536098];

    this.nine =[-0.56931865894374, -0.7951154219594567, 0.6954622422107014, -0.14323343217996043, 0.8844657836837071, 0.7982508762279654, 0.22544333585173154, 0.08728745098803489, 1.1753961898951581, 0.048917583052640656, 0.43703197038348585, -1.1165169622227045, -0.24931719694670368, -0.9366569341328791, 0.707470651721634, 1.0516362191307804, -0.5386560758495824, -0.20954926524005302, -0.06726249080553495, -0.23885750793903857, -1.1740625401705769, -0.3310466692781141, 0.3120921087496099, -1.1104083115755612, 0.05607535223967164, -1.1982861908061904, -0.03107667605113474, -0.5215023230018707, 0.4799478348281779, 0.968341573489126, 0.4817714175451275, -0.4736511117638344, 0.9917413602151732];

    this.ten =[-0.5983249372536174, 0.06930030857610978, 1.0378847415256236, -0.37147879364116065, -0.10489087026712227, 1.1362224303407822, -0.05922231809004437, -0.1771621824443275, 1.1853717889976985, -0.4407345331882268, 0.1827359932073503, -1.101072489912394, -0.08605003460539569, 0.8498571353354729, 0.8428156625643558, -0.6646140613342354, -0.385904313234194, -0.921610552513402, -0.25852596092709595, -0.06354632243938929, -1.1700966594393605];

    this.elev =[-0.938070023032576, 0.5575050254983145, 0.4992121577363537, 0.036148170978447344, -0.11369961419588154, 1.1940543151241574, 0.8712039556935691, 0.17485998692976293, 0.8064909500761931, -0.7523650277783815, 0.2585885031504549, -0.8983756736546479, -0.0019203350865547018, 0.020903964115083582, -1.1998163761998877, -0.8971341223831559, -0.07866221478570853, 0.7930716376348429, 1.1919994739663344, 0.12986551720181164, -0.047667614854199264, 0.01717640345029689, -0.6252520530405951, -1.0240922035310265, -0.33019079827822834, 1.089938869852475, -0.3781630557274145];

    this.twel =[0.3061549589092331, -0.5262024101101941, 1.0341083911899702, -0.7957642704844177, -0.7900241030220161, 0.42734195027479044, -0.0464058586257662, -0.11495359136149833, -1.1935795608665134, 0.36503323982571684, 1.1165692019021296, 0.24499785955387848, 0.05584790016946785, -0.9172245517031782, 0.7717383842984389, 0.29599431754268357, -0.01240763584814343, -1.1628557152781684, -0.9403449432421243, -0.21204864453197528, 0.7146934728057324, -0.5850605586366386, -0.7170876602645386, 0.7638647983930886, -0.27490049973771563, 0.2538259969679101, -1.140176336584478, -0.9553140780217192, -0.5643139417905385, 0.45708291089728686];

    this.thirt =[-1.176912441552908, -0.040816203066141844, 0.23067540502887543, -0.9311197069051542, -0.05183148843070046, 0.7552016871140567, -0.4286295600541762, -0.04884916826765197, 1.1197725032377432, 0.7509897220411086, -0.6252928102311085, -0.6964361699839413, -1.0874248202793864, -0.18289771706416658, -0.4733452073625131, 0.004102565671059725, -0.009122466328638838, 1.1999583115937809, -0.7389845445444951, 0.8671520044109186, -0.3767615216161164]

    this.fourt =[-0.17443985815662555, -0.02823504626165497, -1.1869176542831008, 0.3934406696679278, 1.020617245300088, -0.4935026626547345, 0.5804900971950082, 1.0275360252209635, 0.21725782824016487, 1.1540913902183543, 0.27478738563883537, 0.1804576285936412, 0.3137626281438201, -0.22785465192922327, 1.1356210947206358, -0.11646723083984534, 0.8566147536561228, 0.8322538963316172, 0.1297538459904587, -0.9325223139046835, -0.7440202104247834, -0.18429930019515453, -0.3788711869615896, 1.1236059770390563]

    this.fift =[0.5310612752585615, 0.8298620484994724, -0.6850568606918769, 0.5524069894766735, 0.7974007100458742, -0.7063983476733605, -0.11629161771363677, 0.1137731092615123, -1.1889204932452435, 0.8280934423871616, -0.6851689284805885, 0.5336710504797337, -0.02314994828617049, 0.6602449622582026, -1.0017687705788259, -0.3024929615600755, 1.1344348622838045, 0.248103912588536, 0.3000712448304975, 1.0661574310777469, 0.46180686459122144, 0.2774769653736118, 0.3068402961391931, 1.126434892194069];

    this.sixt =[-0.453843985069422, -0.046197639352937706, 1.1099060389665976, -0.0048196871719680505, 0.33230392068998077, -1.153061522603903, -0.5933008390130877, 0.9069989462424816, -0.5151184581641337, 0.38772365733629266, -0.8470851860099049, -0.756384196810281, -0.15522620488155547, 0.4436138705893009, -1.1041338501915645, -0.11281077026038562, -0.4225629154383027, -1.1174588639451297, -0.44237952589052437, -1.114861360817935, 0.03720888641248219]

    this.sevent =[-0.4234950487167337, 0.5417688880515823, -0.983431957814959, 0.9616147106835886, -0.3534257877850569, -0.6248098596576642, 0.6280680135684865, -0.6186459902537688, -0.81413003204345, -0.6328369166282442, 0.5129108428140566, 0.8811582742482933, 0.21187785919663787, 0.9663553130836446, 0.6791650621588692, 0.16644033162572047, -1.1538769280875352, -0.28436886404034056, 0.228518129955016, -0.0760600422308814, 1.1755825510178768, -0.01965275911975774, -0.008758939771252883, -1.1998070886742853, -0.7077528175764696, 0.6905123469220058, -0.6799107647043338]

    this.eighte =[0.8670672602039738, 0.6100193631370485, -0.5622016923491463, 0.27962538699313105, 0.6152667551891855, -0.9915928917191331, 0.034640267509876164, -0.17356627862123708, 1.1868760671579908, 0.6057706402160683, 0.12545353955706853, 1.0282525666706686, 0.7389691683535388, -0.36733919943923304, 0.8711983016387386, 1.0731763370159082, 0.41543637469406614, 0.34015462403173286, 0.18059280063709743, -0.7287271173278198, -0.9361319505439047, -0.1592499188024542, -0.5796727121723391, 1.0385658429412052]

    this.ninet =[-0.42590692812050684, 0.8688277675184246, 0.7097475600295527, -0.044631532217410896, -0.28595847267338226, -1.1645753639152052, 0.8153037059432638, 0.21622745434584306, 0.853537084760994, 0.0028986874086581035, 0.017503690385187474, 1.199868833845686, 0.23138618355706903, 0.8620870562576912, 0.8020388653250181, -0.7440801712322421, 0.7454766331006334, -0.574986337472414, 0.8364839090560069, -0.8564701621637265, 0.08217987109762075];

    this.twenty =[0.38440391940906915, 0.9374117355166511, 0.6430341086276886, 0.8875004927141044, 0.5652832423400181, -0.5768862377989082, -0.6888304883510277, 0.1486868153114762, 0.9712902703469315, 0.9205816326449018, 0.680496630087723, -0.3597968789137835, -0.047880113141373665, 0.04918774844823617, -1.1980350830289412, 0.34021974899154345, -0.5785783548890276, 0.9947349444198879, -0.7035789706085779, 0.09816362329680915, 0.9671300508094121, 0.885011812309677, -0.7051907070100293, -0.39932462836523863, 0.36501148051551136, 0.06661656279535842, -1.1411962375740672];

    this.tweno =[0.9164580805252669, 0.7655997952904566, 0.11815896111237022, 0.21708444404747396, 0.19722843454884456, 1.1636044382684396, 0.3742381557918224, -0.15533727298196703, 1.129520311624391, 0.5790612862429124, 0.15889641940171556, 1.0389609976683523, 0.011994354910734402, 0.8586558422574072, 0.8381922691169957, -0.7786875659706544, -0.8572860525967473, 0.3141755856615604, -0.20668850951736825, 0.19694289578480817, 1.1655442316074422, 0.47371723312263886, 0.35826805532331885, -1.0427060868612394, 0.13728642336587, -1.1505361247957164, 0.3121202708884225, -0.16522265982715753, -0.22517002347907059, 1.1670475282549868, -0.12839750950446369, -0.039810645390804505, 1.1924467250433535, -1.0848043377965828, 0.13234454772368218, -0.49566568308238923, -0.11903224331297128, 0.012534004237652255, -1.1940160065047922, -1.0476925960791863, -0.5002271750269862, 0.30350123143963653];

    this.twent =[0.21811231346465038, -0.8616741736842866, -0.8061914394984605, 0.045161580234341074, -0.9871164931561314, 0.6808534795459875, -0.35991033741646555, 0.8140369061497589, -0.804865494630559, -1.1900384371903734, -0.10864057792818453, -0.10957072071006893, 1.1328766756428044, 0.12419235905630349, -0.3757215667705787, -0.23496656000175323, 0.26681600179575476, 1.146123875009447, 0.805474693136888, -0.6909355613739396, 0.5601951166735697, 0.0889686645437855, 0.6961301411793116, 0.9733896461700047]

    this.twenth =[-0.21951101776411697, -0.1115273115288962, -1.1744686338354455, -0.8788648691081651, -0.15468210153063341, -0.8022904644289091, 0.7045135216902921, -0.38951449374214797, 0.8899096341316574, 0.22067683298598695, 1.164119794959216, -0.19007061416060073, -0.3632675001426091, -0.3264671365488414, 1.0961094526066908, 1.1044271595438784, -0.46876434210861345, -0.022375004565797756, -0.5655865047292672, -1.0583075055948055, -0.009855418298157568, 0.013694387578480138, -0.08881009601524945, -1.19663078290449];

    this.twenf =[1.1638448144738884, -0.20673160023415088, 0.20670581338430513, -0.8508855567356579, 0.25544908146699596, 0.8066842852791404, -0.8482192450918135, 0.47690822529030147, 0.7021984455311255, 0.06772694294136598, -0.07534315400076932, -1.1957158819489826, 0.8846662468779917, 0.5936415802383144, 0.5522275851919795, 0.7304583315794994, -0.8375660191888122, -0.4526740431329155, -1.0020893352559228, -0.16682731633144757, -0.6387375131397794];

    this.twenfi =[0.37219591738141, 1.1405444399267595, -0.025071490517417413, 0.8174477515703138, 0.8214771046184902, 0.311375239928066, -0.19717994807966818, -1.112327234113233, -0.4047816600654034, -0.7992409725862148, 0.8482467656313567, 0.28581688602212346, 0.9196168487573111, 0.7658461520270448, -0.08822994336981727, 0.14429038262490687, -0.5701827867222043, -1.0459789076303876, 0.9306890958751229, -0.7505399701838786, 0.10250638992535534, 0.23852611913950478, 0.22470675874106386, -1.1543882202553575, -0.7489450947878616, 0.6583544159267706, -0.6675707513237242];

}

ShadedTriangleMesh.prototype.render = function(gl, model, view, projection) {
    // TODO: Implement a render method to do Lambert- and Blinn-Phong Shading
    //       This method will closely follow the render method in assignment 1.
    //       However, this time you will need to setup two attributes (for vertex
    //       position and vertex normal). You may also need to supply multiple uniforms.
    gl.useProgram(this.shaderProgram);

    var temp = view.multiply(model);
    ModelViewProjection = projection.multiply(temp);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexIbo);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionVbo);
    // gl.bindBuffer(gl.ARRAY_BUFFER, this.worley);
    // var w = gl.getUniformLocation(this.shaderProgram, "worley");

    var positionLoc = gl.getAttribLocation(this.shaderProgram, "Position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalVbo);

    var normalLoc = gl.getAttribLocation(this.shaderProgram, "Normal");
    gl.enableVertexAttribArray(normalLoc);
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);

    // // var time = gl.getUniformLocation(this.shaderProgram, "time");
    // // gl.uniform1i(time, Date.now());
    // var time = gl.getAttribLocation(this.shaderProgram, "time");
    // // gl.uniform1f(time, Date.now());
    // // var fl = Date.now();
    // gl.enableVertexAttribArray(time);
    // gl.vertexAttribPointer(fl, 1, gl.FLOAT, false, 0, 0);

    var f = new dist_arr();
    //console.log(f.lamb);
    // if (Math.sin(0.01*Date.now()) > 0) {
    //     //console.log("here");
    //     var t = gl.getUniformLocation(this.shaderProgram, "two");
    //     gl.uniform3fv(t, f.two);
    //     var fo = gl.getUniformLocation(this.shaderProgram, "four");
    //     gl.uniform3fv(fo, f.four);
    // }
    // else {
    //     //console.log("there");
    //     var t2 = gl.getUniformLocation(this.shaderProgram, "four");
    //     gl.uniform3fv(t2, f.two);
    //     var fo2 = gl.getUniformLocation(this.shaderProgram, "two");
    //     gl.uniform3fv(fo2, f.four);
    // }
    var o = gl.getUniformLocation(this.shaderProgram, "one");
    gl.uniform3fv(o, f.one);
    // // var t = gl.getUniformLocation(this.shaderProgram, "two");
    // // gl.uniform3fv(t, f.two);
    // if (Math.sin(0.01*Date.now()) > 0) {
    //     var th = gl.getUniformLocation(this.shaderProgram, "three");
    //     gl.uniform3fv(th, f.three);
    //     var se = gl.getUniformLocation(this.shaderProgram, "seven");
    //     gl.uniform3fv(se, f.seven);
    // }
    // else {
    //     var th = gl.getUniformLocation(this.shaderProgram, "seven");
    //     gl.uniform3fv(th, f.three);
    //     var se = gl.getUniformLocation(this.shaderProgram, "three");
    //     gl.uniform3fv(se, f.seven);
    // }
    var t = gl.getUniformLocation(this.shaderProgram, "two");
    gl.uniform3fv(t, f.two);
    var th = gl.getUniformLocation(this.shaderProgram, "three");
    gl.uniform3fv(th, f.three);

    var fo = gl.getUniformLocation(this.shaderProgram, "four");
    gl.uniform3fv(fo, f.four);
    var fi = gl.getUniformLocation(this.shaderProgram, "five");
    gl.uniform3fv(fi, f.five);
    var si = gl.getUniformLocation(this.shaderProgram, "six");
    gl.uniform3fv(si, f.six);
    var se = gl.getUniformLocation(this.shaderProgram, "seven");
    gl.uniform3fv(se, f.seven);
    var ei = gl.getUniformLocation(this.shaderProgram, "eight");
    gl.uniform3fv(ei, f.eight);
    var ni = gl.getUniformLocation(this.shaderProgram, "nine");
    gl.uniform3fv(ni, f.nine);
    var t = gl.getUniformLocation(this.shaderProgram, "ten");
    gl.uniform3fv(t, f.ten);
    var el = gl.getUniformLocation(this.shaderProgram, "elev");
    gl.uniform3fv(el, f.elev);
    var tw = gl.getUniformLocation(this.shaderProgram, "twel");
    gl.uniform3fv(tw, f.twel);
    var thi = gl.getUniformLocation(this.shaderProgram, "thirt");
    gl.uniform3fv(thi, f.thirt);
    var fo = gl.getUniformLocation(this.shaderProgram, "fourt");
    gl.uniform3fv(fo, f.fourt);
    var fif = gl.getUniformLocation(this.shaderProgram, "fift");
    gl.uniform3fv(fif, f.fift);
    var si = gl.getUniformLocation(this.shaderProgram, "sixt");
    gl.uniform3fv(si, f.sixt);
    var sev = gl.getUniformLocation(this.shaderProgram, "sevent");
    gl.uniform3fv(sev, f.sevent);
    var eih = gl.getUniformLocation(this.shaderProgram, "eighte");
    gl.uniform3fv(eih, f.eighte);
    var nin = gl.getUniformLocation(this.shaderProgram, "ninet");
    gl.uniform3fv(nin, f.ninet);
    var twe = gl.getUniformLocation(this.shaderProgram, "twenty");
    gl.uniform3fv(twe, f.twenty);
    var too = gl.getUniformLocation(this.shaderProgram, "tweno");
    gl.uniform3fv(too, f.tweno);
    var tt = gl.getUniformLocation(this.shaderProgram, "twent");
    gl.uniform3fv(tt, f.twent);
    var tth = gl.getUniformLocation(this.shaderProgram, "twenth");
    gl.uniform3fv(tth, f.twenth);
    var ttf = gl.getUniformLocation(this.shaderProgram, "twenf");
    gl.uniform3fv(ttf, f.twenf);
    var ttfi = gl.getUniformLocation(this.shaderProgram, "twenfi");
    gl.uniform3fv(ttfi, f.twenfi);
    // var t = gl.Un

    var mvp = gl.getUniformLocation(this.shaderProgram, "ModelViewProjection");
    gl.uniformMatrix4fv(mvp, false, ModelViewProjection.transpose().m);

    var modelMatrix = gl.getUniformLocation(this.shaderProgram, "Model");
    gl.uniformMatrix4fv(modelMatrix, false, model.transpose().m);

    var viewInverseMatrix = gl.getUniformLocation(this.shaderProgram, "ViewInverse");
    gl.uniformMatrix4fv(viewInverseMatrix, false, view.inverse().transpose().m);

    var modelInverseMatrix = gl.getUniformLocation(this.shaderProgram, "ModelInverse");
    gl.uniformMatrix4fv(modelInverseMatrix, false, model.inverse().m);

    // if (Date.now() % 2 == 0) {
    //     var time = gl.getUniformLocation(this.shaderProgram, "time");
    //     var t = Date.getSeconds();
    //     // console.log(t);
    //     gl.uniform1f(time, t);
    // }

    var time = gl.getUniformLocation(this.shaderProgram, "time");
    // var t = Date.now()/2.0;
    // console.log("ther");
    // console.log(t);
    var d = new Date();
    var t = d.getMilliseconds();
    var t1 = d.getSeconds();
    gl.uniform1f(time, t/1000.0 + t1);

    // var time = gl.getUniformLocation(this.shaderProgram, "time");
    // var t = Date.now()/2.0;
    // gl.uniform1f(time, t);
    // console.log(Date.now());


    // var texcoordLocation = gl.getAttribLocation(program, "a_texcoords");
    // gl.enableVertexAttribArray(texcoordLocation);
    // gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
    // setTexcoords(gl);


    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);


}

var MoonTriangleMesh = function(gl, textureim, texturebuf, vertexPositions, vertexNormals, indices, vertexSource, fragmentSource) {
    this.indexCount = indices.length;
    this.positionVbo = createVertexBuffer(gl, vertexPositions);
    this.normalVbo = createVertexBuffer(gl, vertexNormals);
    this.indexIbo = createIndexBuffer(gl, indices);
    this.moonVertexTextureCoordBuffer = createTextureBuffer(gl, texturebuf);
    this.texture = textureim;

    this.shaderProgram = createShaderProgram(gl, vertexSource, fragmentSource);
}

MoonTriangleMesh.prototype.render = function(gl, model, view, projection, tex) {
    // TODO: Implement a render method to do Lambert- and Blinn-Phong Shading
    //       This method will closely follow the render method in assignment 1.
    //       However, this time you will need to setup two attributes (for vertex
    //       position and vertex normal). You may also need to supply multiple uniforms.
    gl.useProgram(this.shaderProgram);

    var temp = view.multiply(model);
    var ModelViewProjection = projection.multiply(temp);

    gl.bindTexture(gl.TEXTURE_2D, tex);


    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexIbo);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionVbo);

    var positionLoc = gl.getAttribLocation(this.shaderProgram, "Position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalVbo);

    var normalLoc = gl.getAttribLocation(this.shaderProgram, "Normal");
    gl.enableVertexAttribArray(normalLoc);
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);


    gl.bindBuffer(gl.ARRAY_BUFFER, this.moonVertexTextureCoordBuffer);
    var texture = gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(texture);
    gl.vertexAttribPointer(texture, 2, gl.FLOAT, false, 0, 0);


    var mvp = gl.getUniformLocation(this.shaderProgram, "ModelViewProjection");
    gl.uniformMatrix4fv(mvp, false, ModelViewProjection.transpose().m);

    var modelMatrix = gl.getUniformLocation(this.shaderProgram, "Model");
    gl.uniformMatrix4fv(modelMatrix, false, model.transpose().m);

    var viewInverseMatrix = gl.getUniformLocation(this.shaderProgram, "ViewInverse");
    gl.uniformMatrix4fv(viewInverseMatrix, false, view.inverse().transpose().m);

    var modelInverseMatrix = gl.getUniformLocation(this.shaderProgram, "ModelInverse");
    gl.uniformMatrix4fv(modelInverseMatrix, false, model.inverse().m);

    var samplerUniform = gl.getUniformLocation(this.shaderProgram, "uSampler");

    var time = gl.getUniformLocation(this.shaderProgram, "time");
    // var t = Date.now()/2.0;
    // console.log("ther");
    // console.log(t);
    var d = new Date();
    var t = d.getMilliseconds();
    //console.log()
    // console.log(Math.sin(t /158.0));
    gl.uniform1f(time, t);

    // can pass time directly to fragment shader to move texture around (sin + position or something)


    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);

    // var ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
    // var lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uLightingDirection");
    // var directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirectionalColor");




    // moonTexture.image = new Image();
    // moonTexture.image.crossOrigin = '';
    // moonTexture.image.onload = function () {
    //   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    //   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, moonTexture.image);
    //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    //   gl.bindTexture(gl.TEXTURE_2D, null);
    // }
    // moonTexture.image.src = "moon.gif";

    // gl.activeTexture(gl.TEXTURE0);
    // gl.bindTexture(gl.TEXTURE_2D, moonTexture);
    // gl.uniform1i(shaderProgram.samplerUniform, 0);


    // var texcoordLocation = gl.getAttribLocation(program, "a_texcoords");
    // gl.enableVertexAttribArray(texcoordLocation);
    // gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
    // setTexcoords(gl);
    // shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    //
    // shaderProgram.TextureCoordinateAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    // gl.enableVertexAttribArray(shaderProgram.TextureCoordinateAttribute);
    //
    //
    //
    // gl.bindBuffer(gl.ARRAY_BUFFER, moonVertexTextureCoordBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);


}


var Task2 = function(gl) {
    this.cameraAngle = 0;
    this.sphereMesh = new ShadedTriangleMesh(gl, SpherePositions, SphereNormals, SphereIndices, PhongVertexSource, PhongFragmentSource);

    var moonTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, moonTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image = new Image();
    image.src = "moon.gif";
    image.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, moonTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    var valueTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, valueTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image3 = new Image();
    image3.src = "value1.png";
    image3.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, valueTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image3);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    var earthTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, earthTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image2 = new Image();
    image2.src = "earthnasa.png";
    image2.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, earthTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image2);
        gl.generateMipmap(gl.TEXTURE_2D);
      });



    this.moonTexture = moonTexture;
    this.earthTexture = earthTexture;
    this.valueTexture = valueTexture;


    //this.moonMesh = new MoonTriangleMesh(gl, moonTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);

    this.cubeMesh = new ShadedTriangleMesh(gl, CubePositions, CubeNormals, CubeIndices, SunVertexSource, SunFragmentSource);

    this.earthMesh = new MoonTriangleMesh(gl, earthTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);

    this.valueMesh = new MoonTriangleMesh(gl, valueTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, ValueFragmentSource);


    gl.enable(gl.DEPTH_TEST);
}

Task2.prototype.render = function(gl, w, h) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projection = Matrix.perspective(60, w/h, 0.1, 100);
    var view =
        Matrix.translate(0, 0, -5).multiply(
        Matrix.rotate(this.cameraAngle, 1, 0, 0));
    var rotation = Matrix.rotate(Date.now()/100, 0.2327, 1, 0);
    var cubeModel = Matrix.translate(-3.8, 2, 0).multiply(rotation).multiply(Matrix.scale(0.3, 0.3, 0.3));
    var sphereModel = Matrix.translate(-2.0, 0, 0).multiply(rotation).multiply(Matrix.scale(1.5, 1.5, 1.5));
    var sphereModel2 = Matrix.translate(2.0, 0, 0).multiply(rotation).multiply(Matrix.scale(1.5, 1.5, 1.5));

    //this.sphereMesh.render(gl, sphereModel2, view, projection);
    this.earthMesh.render(gl, sphereModel, view, projection, this.earthTexture);
    //this.moonMesh.render(gl, sphereModel2, view, projection, this.moonTexture);
    this.cubeMesh.render(gl, cubeModel, view, projection);


    this.valueMesh.render(gl, sphereModel2, view, projection, this.valueTexture);

}

Task2.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
