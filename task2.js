var PhongVertexSource = `
    // TODO: Implement a vertex shader to do Lambert and Blinn-Phong shading
    //       Base this shader on the previous task.
    //       You will need two attributes this time (position, normal)
    //       You will need at least one varying (to pass smooth vertex normals
    //       to the fragment shader)
    //       You may need multiple uniforms to get all the required matrices
    //       for transforming points, vectors and normals. Refer to assignment 0
    //       and assignment 1 for how to correctly transform points, vectors and normals
    uniform mat4 ModelViewProjection;
    uniform mat4 Model;

    attribute vec3 Position;
    attribute vec3 Normal;

    varying vec3 vNormal;
    varying vec4 globVect;
    // varying vector - put in both to access same
    // varying gets fed out - to go to fragment shader - and then varying in fragshader is an input
    // model matrix * position gives world position - put this in a varying and then can acess in fragmentSource

    void main() {

        gl_Position = ModelViewProjection * vec4(Position, 1.0);
        globVect = Model * vec4(Position, 1.0);
        vNormal = Normal; 
    }
`;
var PhongFragmentSource = `
    precision highp float;
    // one output of gl_Fragcolor- default output
    
    const vec3 LightPosition = vec3(4.0, -4.0, 10.0);
    const vec3 LightIntensity = vec3(400.0);
    const vec3 ka = 0.3*vec3(1.0, 0.5, 0.5);
    const vec3 kd = 0.7*vec3(1.0, 0.5, 0.5);
    const vec3 ks = vec3(0.4);
    const float n = 60.0; //phong exponent

    
    varying vec4 globVect;
    varying vec3 vNormal;

    uniform mat4 InvertedView;
    uniform mat4 InvertedModel;
    void main() {

        float roughness = 0.5;
    
        const float PI = 3.14159;

        vec3 l = LightPosition - vec3(globVect);
        vec3 camera_loc = vec3(InvertedView * vec4(0.0, 0.0, 0.0, 0.0));
        vec3 norm = vec3(InvertedModel * vec4(vNormal, 0.0)); //should be 0
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
        // else {
        //     vec3 L_r = 10.0 * cos_a * incident_light;
        // }
        //vec3 L_r = 10.0 * cos_a * incident_light;

        // vec3 h = normalize(camera_loc) + normalize(l); //- globVect
        // float cosa = dot(normalize(h), normalize(norm));
        // cosa = max(0.0, cosa);
        // vec3 blinn = ks * incident_light * pow(cosa, n);

        // gl_FragColor = vec4(lambert + blinn + ka, 1.0);

        gl_FragColor = vec4(L_r, 1.0);
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
    gl.useProgram(this.shaderProgram);
    var matrix = (projection.multiply(view)).multiply(model);
    var location = gl.getUniformLocation(this.shaderProgram, "ModelViewProjection");
    var mmatrix = model;
    var mod_norm = gl.getUniformLocation(this.shaderProgram, "Model");
    gl.uniformMatrix4fv(mod_norm, false, mmatrix.transpose().m);
    var inmatrix = view.inverse();
    var camera = gl.getUniformLocation(this.shaderProgram, "InvertedView");
    gl.uniformMatrix4fv(camera, false, inmatrix.transpose().m);
    gl.uniformMatrix4fv(location, false, matrix.transpose().m);
    var modmatrix = model.inverse().transpose();
    var mod = gl.getUniformLocation(this.shaderProgram, "InvertedModel");
    gl.uniformMatrix4fv(mod, false, modmatrix.transpose().m);
    // var mmatrix = model;
    // var mod_norm = gl.getUniformLocation(this.shaderProgram, "Model");
    // gl.uniformMatrix4fv(mod_norm, false, mmatrix.transpose().m);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionVbo); 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexIbo); // change the arrangement of binding
    var pos = gl.getAttribLocation(this.shaderProgram,"Position"); 
    var nor = gl.getAttribLocation(this.shaderProgram,"Normal"); 
    gl.enableVertexAttribArray(pos);
    gl.enableVertexAttribArray(nor);
    gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0);
    gl.vertexAttribPointer(nor, 3, gl.FLOAT, false, 0, 0);
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
    var rotation = Matrix.rotate(Date.now()/25, 0, 1, 0);
    var cubeModel = Matrix.translate(-1.8, 0, 0).multiply(rotation);
    var sphereModel = Matrix.translate(1.8, 0, 0).multiply(rotation).multiply(Matrix.scale(1.2, 1.2, 1.2));

    this.sphereMesh.render(gl, sphereModel, view, projection);
    this.cubeMesh.render(gl, cubeModel, view, projection);
}

Task2.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
