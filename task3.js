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

var Task3 = function(gl) {
    this.cameraAngle = 0;
    this.sphereMesh = new ShadedTriangleMesh(gl, SpherePositions, SphereNormals, SphereIndices, PhongVertexSource, PhongFragmentSource);
    this.cubeMesh = new ShadedTriangleMesh(gl, CubePositions, CubeNormals, CubeIndices, PhongVertexSource, PhongFragmentSource);

    gl.enable(gl.DEPTH_TEST);
}

Task3.prototype.render = function(gl, w, h) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var angle = Date.now()/10;
    var projection = Matrix.perspective(35, w/h, 0.1, 100);
    var view =
        Matrix.translate(0, 0, -10).multiply(
        Matrix.rotate(this.cameraAngle, 1, 0, 0));

    var cubeModel = Matrix.translate(-0, 0, 0).multiply(
        rotateAroundAxisAtPoint([1, 1, 0], angle, [0, 0, 0])).multiply(
        Matrix.scale(0.2, 0.2, 0.2));

    var sphereModel = Matrix.translate(-1, 0, 0).multiply(
        rotateAroundAxisAtPoint([0, 0, 1], angle, [2, 0, 0])).multiply(
        Matrix.scale(0.8, 0.8, 0.8));

    this.sphereMesh.render(gl, sphereModel, view, projection);
    this.cubeMesh.render(gl, cubeModel, view, projection);
}

Task3.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
