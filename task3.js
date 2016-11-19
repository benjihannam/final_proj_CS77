var DoubleVertexSource = `

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


var DoubleFragmentSource = `
    precision mediump float;


    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform sampler2D uSampler2;
    uniform float time;


    void main() {
      vec4 color0 = texture2D(uSampler, vTextureCoord);
      vec4 color1 = texture2D(uSampler2, vTextureCoord);
      gl_FragColor = color0 * color1;
    }
`;


var DoubleTriangleMesh = function(gl, textureim, textureim2, texturebuf, vertexPositions, vertexNormals, indices, vertexSource, fragmentSource) {
    this.indexCount = indices.length;
    this.positionVbo = createVertexBuffer(gl, vertexPositions);
    this.normalVbo = createVertexBuffer(gl, vertexNormals);
    this.indexIbo = createIndexBuffer(gl, indices);
    this.moonVertexTextureCoordBuffer = createTextureBuffer(gl, texturebuf);
    this.moonVertexTextureCoordBuffer2 = createTextureBuffer(gl, texturebuf);
    this.texture = textureim;
    //this.texture2 = textureim2;

    this.shaderProgram = createShaderProgram(gl, vertexSource, fragmentSource);
}

DoubleTriangleMesh.prototype.render = function(gl, model, view, projection, tex1, tex2) {
    // TODO: Implement a render method to do Lambert- and Blinn-Phong Shading
    //       This method will closely follow the render method in assignment 1.
    //       However, this time you will need to setup two attributes (for vertex
    //       position and vertex normal). You may also need to supply multiple uniforms.
    gl.useProgram(this.shaderProgram);

    var temp = view.multiply(model);
    var ModelViewProjection = projection.multiply(temp);

    gl.bindTexture(gl.TEXTURE_2D, tex1);
    gl.bindTexture(gl.TEXTURE_2D, tex2);

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



    gl.bindBuffer(gl.ARRAY_BUFFER, this.moonVertexTextureCoordBuffer);
    var texture = gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(texture);
    gl.vertexAttribPointer(texture, 2, gl.FLOAT, false, 0, 0);


    var texture2 = gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(texture2);
    gl.vertexAttribPointer(texture2, 2, gl.FLOAT, false, 0, 0);

    var samplerUniform = gl.getUniformLocation(this.shaderProgram, "uSampler");
    var samplerUniform2 = gl.getUniformLocation(this.shaderProgram, "uSampler2");
    gl.uniform1i(samplerUniform, 0);  // texture unit 0
    gl.uniform1i(samplerUniform2, 1);  // texture unit 1
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[0]);



    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textures[1]);



    //gl.bindBuffer(gl.ARRAY_BUFFER, this.moonVertexTextureCoordBuffer2);



    var time = gl.getUniformLocation(this.shaderProgram, "time");
    var d = new Date();
    var t = d.getMilliseconds();
    gl.uniform1f(time, t);


    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);

}


var textures = [];

var Task3 = function(gl) {
    this.cameraAngle = 0;

    var firstTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, firstTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image1 = new Image();
    image1.src = "earth.png";
    image1.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, firstTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image1);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    var secondTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, secondTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image2 = new Image();
    image2.src = "funky.png";
    image2.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, secondTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image2);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    textures.push(firstTexture);
    textures.push(secondTexture);

    this.firstTexture = firstTexture;
    this.secondTexture = secondTexture;

    this.firstMesh = new MoonTriangleMesh(gl, firstTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);
    this.secondMesh = new MoonTriangleMesh(gl, secondTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);

    this.doubleMesh = new DoubleTriangleMesh(gl, firstTexture, secondTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, DoubleVertexSource, DoubleFragmentSource);

    this.sphereMesh = new ShadedTriangleMesh(gl, SpherePositions, SphereNormals, SphereIndices, SunVertexSource, SunFragmentSource);
    this.cubeMesh = new ShadedTriangleMesh(gl, CubePositions, CubeNormals, CubeIndices, PhongVertexSource, PhongFragmentSource);


    gl.enable(gl.DEPTH_TEST);
}

Task3.prototype.render = function(gl, w, h) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var angle = Date.now()/50; // controls how fast it rotates
    var projection = Matrix.perspective(35, w/h, 0.1, 100);
    var view =
        Matrix.translate(0, 0, -10).multiply(
        Matrix.rotate(this.cameraAngle, 1, 0, 0));

    var rotation = Matrix.rotate(Date.now()/60, 0.4327, 1, 0);

    var cubeModel = Matrix.translate(-4, 0, 0).multiply(rotation).multiply(
        rotateAroundAxisAtPoint([1, 1, 0], angle, [0, 0, 0])).multiply(
        Matrix.scale(0.2, 0.2, 0.2));

    var model1 = Matrix.translate(-3, 0, 0).multiply(rotation).multiply(
        Matrix.scale(1, 1, 1));

    var model2 = Matrix.translate(3, 0, 0).multiply(rotation).multiply(
        Matrix.scale(1, 1, 1));

    var model3 = Matrix.translate(0, 0, 0).multiply(rotation).multiply(
        Matrix.scale(2, 2, 2));

    //this.firstMesh.render(gl, model1, view, projection, this.firstTexture);
    //this.secondMesh.render(gl, model2, view, projection, this.secondTexture);
    //this.sphereMesh.render(gl, sunModel, view, projection);
    this.doubleMesh.render(gl, model3, view, projection, this.firstTexture, this.secondTexture);

    //this.cubeMesh.render(gl, cubeModel, view, projection);
}

Task3.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
