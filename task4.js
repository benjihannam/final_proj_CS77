var Task4 = function(gl) {
    this.cameraAngle = 0;
    this.sphereMesh = new ShadedTriangleMesh(gl, DTSpherePositions, DTSphereNormals, DTSphereIndices, SunVertexSource, SunFragmentSource);
    this.cubeMesh = new ShadedTriangleMesh(gl, CubePositions, CubeNormals, CubeIndices, PhongVertexSource, PhongFragmentSource);

    gl.enable(gl.DEPTH_TEST);
}

Task4.prototype.render = function(gl, w, h) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var angle = Date.now()/50; // controls how fast it rotates
    var projection = Matrix.perspective(35, w/h, 0.1, 100);
    var view =
        Matrix.translate(0, 0, -10).multiply(
        Matrix.rotate(this.cameraAngle, 1, 0, 0));

    var rotation = Matrix.rotate(Date.now()/25, 0.4327, 1, 0);
    var sunRotation = Matrix.rotate(Date.now()/80, 0.4327, 1, 0);

    var cubeModel = Matrix.translate(-4, 0, 0).multiply(rotation).multiply(
        rotateAroundAxisAtPoint([1, 1, 0], angle, [0, 0, 0])).multiply(
        Matrix.scale(0.2, 0.2, 0.2));

    var earthModel = Matrix.translate(-0, 0, 0).multiply(
        rotateAroundAxisAtPoint([1, 1, 0], angle, [0, 0, 0])).multiply(rotation).multiply(
        Matrix.scale(0.9, 0.9, 0.9));

    var sunModel = Matrix.translate(-0, 0, 0).multiply(sunRotation).multiply(
        Matrix.scale(2.5, 2.5, 2.5));

    var moonModel = Matrix.translate(-2.5, 0, 0).multiply(
        rotateAroundAxisAtPoint([0, 0, 1], angle, [3, 0, 0])).multiply(rotation).multiply( // point controls radius of rotation
        Matrix.scale(0.3, 0.3, 0.3));

    //this.sphereMesh.render(gl, moonModel, view, projection);
    this.sphereMesh.render(gl, sunModel, view, projection);

    //this.cubeMesh.render(gl, cubeModel, view, projection);
}

Task4.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
