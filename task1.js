var WhiteVertexSource = `
    // TODO: Implement a simple GLSL vertex shader with
    // 1) A mat4 uniform matrix specifying the model-view-projection matrix
    uniform mat4 ModelViewProjection;
    attribute vec3 Position;
    void main() {
        gl_Position = ModelViewProjection * vec4(Position, 1.0);
    }
    // 2) A vec3 position attribute
    // 3) A main function that multiplies the projection matrix with
    //    the position, and assigns the result to gl_Position.
    //    Hint: You need to extend the position by one element (1.0)
    //          Remember assignment 0
`;
var WhiteFragmentSource = `
    precision highp float;

    // TODO: Implement a simgple GLSL fragment shader that assigns a white color to gl_FragColor
    void main() {
        gl_FragColor = vec4(1.0);
    }
`;

function createVertexBuffer(gl, vertexData) {
    // TODO: Create a buffer, bind it to the ARRAY_BUFFER target, and
    //       copy the array `vertexData` into it
    //       Return the created buffer
    //       Commands you will need: gl.createBuffer, gl.bindBuffer, gl.bufferData
    var vertbuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertbuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
    return vertbuf;
}
function createIndexBuffer(gl, indexData) {
    // TODO: Create a buffer, bind it to the ELEMENT_ARRAY_BUFFER target, and
    //       copy the array `indexData` into it
    //       Return the created buffer
    //       Commands you will need: gl.createBuffer, gl.bindBuffer, gl.bufferData
    var indbuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indbuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
    return indbuf;
}

function createTextureBuffer(gl, textureData) {

    var texbuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texbuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureData), gl.STATIC_DRAW);
    return texbuf;
}

function createShaderObject(gl, shaderSource, shaderType) {
    // TODO: Create a shader of type `shaderType`, submit the source code `shaderSource`,
    //       compile it and return the shader
    //       Commands you will need: gl.createShader, gl.shaderSource, gl.compileShader
    var fragShader = gl.createShader(shaderType);
    gl.shaderSource(fragShader, shaderSource);
    gl.compileShader(fragShader);
    return fragShader;

}
function createShaderProgram(gl, vertexSource, fragmentSource) {
    var vertexShader = createShaderObject(gl, vertexSource, gl.VERTEX_SHADER);
    var fragmentShader = createShaderObject(gl, fragmentSource, gl.FRAGMENT_SHADER);

    // TODO: Create a shader program, attach `vertexShader` and `fragmentShader`
    //       to it, link the program and return the result.
    //       Commands you will need: gl.createProgram, gl.attachShader, gl.linkProgram
    var shader = gl.createProgram();
    gl.attachShader(shader, vertexShader);
    gl.attachShader(shader, fragmentShader);
    gl.linkProgram(shader);
    var err = gl.getShaderInfoLog(fragmentShader);
    var err2 = gl.getShaderInfoLog(vertexShader);

    if (err.length > 0 || err2.length > 0) {
      throw err;
      console.log("something is wrong");
    }

    return shader;
}

function rotateAroundAxisAtPoint(axis, angle, point) {
    // TODO: Build a transformation matrix that rotates around a given axis
    //       by the given angle at the given point.
    //       Hint: You will need Matrix.translate and Matrix.rotate
    //       Hint: axis and point are arrays. Use axis[0], axis[1], etc.
    //             to get their components

    var res1 = (Matrix.translate(point[0], point[1], point[2])).inverse();
    var res2 = Matrix.rotate(angle, axis[0], axis[1], axis[2]);
    var res3 = (Matrix.translate(point[0], point[1], point[2]));
    return res3.multiply(res2).multiply(res1);
}

var TriangleMesh = function(gl, vertexPositions, indices, vertexSource, fragmentSource) {
    this.indexCount = indices.length;
    this.positionVbo = createVertexBuffer(gl, vertexPositions);
    this.indexIbo = createIndexBuffer(gl, indices);
    this.shaderProgram = createShaderProgram(gl, vertexSource, fragmentSource);
}

TriangleMesh.prototype.render = function(gl, model, view, projection) {
    // TODO:
    //      1) Make a model-view-projection matrix from the specified matrices
    //      2) Bind the shader program
    //      3) Bind the vertex- and index buffers
    //      4) Setup the shader data
    //         Hint: You will need one uniform (for the model-view-projection matrix)
    //               and one attribute (for the vertex position)
    //      5) Draw the geometry
    //
    //       Commands you will need: gl.useProgram, gl.uniformMatrix4fv, gl.getUniformLocation,
    //                               gl.bindBuffer, gl.getAttribLocation, gl.enableVertexAttribArray,
    //                               gl.vertexAttribPointer, gl.drawElements

    // IMPORTANT HINT:
    //      OpenGL expects Matrix in column-major order, but matrix.js stores them in row-major order
    //      To solve this, you need to transpose the matrix before passing it to OpenGL
    //      Example:
    //          var matrix = ....
    //          var uniformLocation = ....
    //          gl.uniformMatrix4fv(uniformLocation, false, matrix.transpose().m);

    gl.useProgram(this.shaderProgram);
    var matrix = (projection.multiply(view)).multiply(model);
    var location = gl.getUniformLocation(this.shaderProgram, "ModelViewProjection");
    gl.uniformMatrix4fv(location, false, matrix.transpose().m);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionVbo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexIbo);
    var pos = gl.getAttribLocation(this.shaderProgram,"Position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0);
    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);

}

var Task1 = function(gl) {
    this.cameraAngle = 0;
    //this.mesh = new TriangleMesh(gl, CubePositions, CubeIndices, WhiteVertexSource, WhiteFragmentSource);
    this.sphereMesh = new ShadedTriangleMesh(gl, SpherePositions, SphereNormals, SphereIndices, PhongVertexSource, PhongFragmentSource);

    gl.enable(gl.DEPTH_TEST);
}

Task1.prototype.render = function(gl, w, h) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projection = Matrix.perspective(60, w/h, 0.1, 100);
    var view =
        Matrix.translate(0, 0, -5).multiply(
        Matrix.rotate(this.cameraAngle, 1, 0, 0));
    var model = Matrix.rotate(Date.now()/25, 0, 1, 0);

    //this.mesh.render(gl, model, view, projection);
    var rotation = Matrix.rotate(Date.now()/100, 0.4327, 1, 0);

    var sphereModel = Matrix.translate(-1.8, 0, 0).multiply(Matrix.scale(1.2, 1.2, 1.2));

    this.sphereMesh.render(gl, sphereModel, view, projection);


}

Task1.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
