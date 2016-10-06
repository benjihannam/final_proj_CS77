var WhiteVertexSource = `
    // TODO: Implement a simple GLSL vertex shader with
    // 1) A mat4 uniform matrix specifying the model-view-projection matrix
    // 2) A vec3 position attribute
    // 3) A main function that multiplies the projection matrix with
    //    the position, and assigns the result to gl_Position.
    //    Hint: You need to extend the position by one element (1.0)
    //          Remember assignment 0
`;
var WhiteFragmentSource = `
    precision highp float;
    
    // TODO: Implement a simgple GLSL fragment shader that assigns a white color to gl_FragColor
`;

function createVertexBuffer(gl, vertexData) {
    // TODO: Create a buffer, bind it to the ARRAY_BUFFER target, and
    //       copy the array `vertexData` into it
    //       Return the created buffer
    //       Commands you will need: gl.createBuffer, gl.bindBuffer, gl.bufferData
}
function createIndexBuffer(gl, indexData) {
    // TODO: Create a buffer, bind it to the ELEMENT_ARRAY_BUFFER target, and
    //       copy the array `indexData` into it
    //       Return the created buffer
    //       Commands you will need: gl.createBuffer, gl.bindBuffer, gl.bufferData
}
function createShaderObject(gl, shaderSource, shaderType) {
    // TODO: Create a shader of type `shaderType`, submit the source code `shaderSource`,
    //       compile it and return the shader
    //       Commands you will need: gl.createShader, gl.shaderSource, gl.compileShader
}
function createShaderProgram(gl, vertexSource, fragmentSource) {
    var   vertexShader = createShaderObject(gl,   vertexSource, gl.  VERTEX_SHADER);
    var fragmentShader = createShaderObject(gl, fragmentSource, gl.FRAGMENT_SHADER);
    
    // TODO: Create a shader program, attach `vertexShader` and `fragmentShader`
    //       to it, link the program and return the result.
    //       Commands you will need: gl.createProgram, gl.attachShader, gl.linkProgram
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
}

var Task1 = function(gl) {
    this.cameraAngle = 0;
    this.mesh = new TriangleMesh(gl, CubePositions, CubeIndices, WhiteVertexSource, WhiteFragmentSource);
    
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

    this.mesh.render(gl, model, view, projection);
}

Task1.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}