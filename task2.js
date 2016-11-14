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

    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);


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
    var rotation = Matrix.rotate(Date.now()/25, 0.4327, 1, 0);
    var cubeModel = Matrix.translate(-3.8, 2, 0).multiply(rotation).multiply(Matrix.scale(0.3, 0.3, 0.3));
    var sphereModel = Matrix.translate(-1.8, 0, 0).multiply(rotation).multiply(Matrix.scale(1.2, 1.2, 1.2));
    var sphereModel2 = Matrix.translate(1.8, 0, 0).multiply(rotation).multiply(Matrix.scale(0.5, 0.5, 0.5));

    this.sphereMesh.render(gl, sphereModel, view, projection);
    this.sphereMesh.render(gl, sphereModel2, view, projection);
    this.cubeMesh.render(gl, cubeModel, view, projection);
}

Task2.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
