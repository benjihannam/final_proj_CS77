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
        if(value < 0.1){
            color = vec4(0.0, 0.0, 0.1, 1.0);
            ks = vec3(0.05);

        }
        else if(value < 0.2){
           color = vec4(0.0, 0.0, 0.1, 1.0);
           ks = vec3(0.07);
           
       }
       else if(value < 0.3){
           color = vec4(0.0, 0.0, 0.2, 1.0);
           ks = vec3(0.1);
           if(vTextureCoord[1] < 0.15 || vTextureCoord[1] > 0.85){
            color = vec4(1.0, 1.0, 1.0, 0.0);
            }
       }
       else if(value < 0.35){
           color = vec4(0.0, 0.0, 0.25, 1.0);
           ks = vec3(0.15);
        
       }
        else if(value < 0.5){
           color = vec4(0.0, 0.0, 0.3, 1.0);
           ks = vec3(0.17);
        
       }
       else if(value < 0.6){
        color = vec4(0.0, 0.4, 0.0, 1.0);
        //at the poles
        if(vTextureCoord[1] < 0.15 || vTextureCoord[1] > 0.85){
            color = vec4(1.0, 1.0, 1.0, 0.0);
        }     
       }
       else if(value < 0.7){
           color = vec4(0.3, 0.4, 0.0, 1.0);;
           
       }
       else if(value < 0.75){
           color = vec4(0.2, 0.3, 0.0, 1.0);;
           
       }
       else{
           color = vec4(1.0, 1.0, 1.0, 1.0);;
       }

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

    var positionLoc = gl.getAttribLocation(this.shaderProgram, "Position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalVbo);

    var normalLoc = gl.getAttribLocation(this.shaderProgram, "Normal");
    gl.enableVertexAttribArray(normalLoc);
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);

    var mvp = gl.getUniformLocation(this.shaderProgram, "ModelViewProjection");
    gl.uniformMatrix4fv(mvp, false, ModelViewProjection.transpose().m);

    var modelMatrix = gl.getUniformLocation(this.shaderProgram, "Model");
    gl.uniformMatrix4fv(modelMatrix, false, model.transpose().m);

    var viewInverseMatrix = gl.getUniformLocation(this.shaderProgram, "ViewInverse");
    gl.uniformMatrix4fv(viewInverseMatrix, false, view.inverse().transpose().m);

    var modelInverseMatrix = gl.getUniformLocation(this.shaderProgram, "ModelInverse");
    gl.uniformMatrix4fv(modelInverseMatrix, false, model.inverse().m);

    
    var time = gl.getUniformLocation(this.shaderProgram, "time");
    gl.uniform1i(time, Date.now());
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

    this.cubeMesh = new ShadedTriangleMesh(gl, CubePositions, CubeNormals, CubeIndices, PhongVertexSource, PhongFragmentSource);

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
    var sphereModel = Matrix.translate(-1.8, 0, 0).multiply(rotation).multiply(Matrix.scale(1.2, 1.2, 1.2));
    var sphereModel2 = Matrix.translate(1.8, 0, 0).multiply(rotation).multiply(Matrix.scale(1.5, 1.5, 1.5));

    //this.sphereMesh.render(gl, sphereModel2, view, projection);
    this.earthMesh.render(gl, sphereModel, view, projection, this.earthTexture);
    //this.moonMesh.render(gl, sphereModel2, view, projection, this.moonTexture);
    this.cubeMesh.render(gl, cubeModel, view, projection);


    this.valueMesh.render(gl, sphereModel2, view, projection, this.valueTexture);

}

Task2.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
