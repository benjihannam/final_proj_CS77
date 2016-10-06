var PhongVertexSource = `
    // TODO: Implement a vertex shader to do Lambert and Blinn-Phong shading
    //       Base this shader on the previous task.
    //       You will need two attributes this time (position, normal)
    //       You will need at least one varying (to pass smooth vertex normals
    //       to the fragment shader)
    //       You may need multiple uniforms to get all the required matrices
    //       for transforming points, vectors and normals. Refer to assignment 0
    //       and assignment 1 for how to correctly transform points, vectors and normals
    void main() {
        gl_Position = vec4(0.0);
    }
`;
var PhongFragmentSource = `
    precision highp float;
    
    const vec3 LightPosition = vec3(4, 2, 4);
    const vec3 LightIntensity = vec3(20);
    const vec3 ka = 0.3*vec3(1, 0.5, 0.5);
    const vec3 kd = 0.7*vec3(1, 0.5, 0.5);
    const vec3 ks = vec3(0.4);
    const float n = 60.0;
    
    // TODO: Implement a fragment shader to do Lambert and Blinn-Phong shading
    //       The material parameters (ka, kd, ks, n) and the position- and intensity
    //       of the single light (in world coordinates) are given to you.
    //       Your code should do the same as your shading code for assignment 1,
    //       except with only a single light and without shadow rays and reflection/refraction.
    
    void main() {
    }
`;

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
}

var Task2 = function(gl) {
    this.cameraAngle = 0;
    this.sphereMesh = new ShadedTriangleMesh(gl, SpherePositions, SphereNormals, SphereIndices, PhongVertexSource, PhongFragmentSource);
    this.cubeMesh = new ShadedTriangleMesh(gl, CubePositions, CubeNormals, CubeIndices, PhongVertexSource, PhongFragmentSource);
    
    gl.enable(gl.DEPTH_TEST);
}

Task2.prototype.render = function(gl, w, h) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    var projection = Matrix.perspective(60, w/h, 0.1, 100);
    var view =
        Matrix.translate(0, 0, -5).multiply(
        Matrix.rotate(this.cameraAngle, 1, 0, 0));
    var rotation = Matrix.rotate(Date.now()/25, 0, 1, 0);
    var cubeModel = Matrix.translate(-1.8, 0, 0).multiply(rotation);
    var sphereModel = Matrix.translate(1.8, 0, 0).multiply(rotation).multiply(Matrix.scale(1.2, 1.2, 1.2));

    this.sphereMesh.render(gl, sphereModel, view, projection);
    this.cubeMesh.render(gl, cubeModel, view, projection);
}

Task2.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
