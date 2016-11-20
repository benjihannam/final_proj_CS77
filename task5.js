var Task5 = function(gl) {
    this.cameraAngle = 0;


    var laurenTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, laurenTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image2 = new Image();
    image2.src = "images/lauren.png";
    image2.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, laurenTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image2);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    var benjiTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, benjiTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image3 = new Image();
    image3.src = "images/benji.png";
    image3.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, benjiTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image3);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    var sydniTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, sydniTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image4 = new Image();
    image4.src = "images/sydni.png";
    image4.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, sydniTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image4);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    var sunTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, sunTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image5 = new Image();
    image5.src = "images/sunsmile.png";
    image5.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, sunTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image5);
        gl.generateMipmap(gl.TEXTURE_2D);
      });


    this.laurenTexture = laurenTexture;
    this.benjiTexture = benjiTexture;
    this.sydniTexture = sydniTexture;
    this.sunTexture = sunTexture;

    this.laurenMesh = new MoonTriangleMesh(gl, laurenTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);
    this.sydniMesh = new MoonTriangleMesh(gl, sydniTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);
    this.sunMesh = new MoonTriangleMesh(gl, sunTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);

    //this.sphereMesh = new ShadedTriangleMesh(gl, SpherePositions, SphereNormals, SphereIndices, SunVertexSource, SunFragmentSource);
    this.cubeMesh = new ShadedTriangleMesh(gl, CubePositions, CubeNormals, CubeIndices, PhongVertexSource, PhongFragmentSource);


    this.benjiMesh = new MoonTriangleMesh(gl, benjiTexture, CubeTextureCoordinates, CubePositions, CubeNormals, CubeIndices, MoonVertexSource, MoonFragmentSource);


    gl.enable(gl.DEPTH_TEST);
}

Task5.prototype.render = function(gl, w, h) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var angle = Date.now()/50; // controls how fast it rotates
    var projection = Matrix.perspective(35, w/h, 0.1, 100);
    var view =
        Matrix.translate(0, 0, -10).multiply(
        Matrix.rotate(this.cameraAngle, 1, 0, 0));

    var rotation = Matrix.rotate(Date.now()/25, 0.4327, 1, 0);

    var cubeModel = Matrix.translate(-4, 0, 0).multiply(rotation).multiply(
        rotateAroundAxisAtPoint([1, 1, 0], angle, [0, 0, 0])).multiply(
        Matrix.scale(0.4, 0.4, 0.4));

    var earthModel = Matrix.translate(0, 2, 0).multiply(
        rotateAroundAxisAtPoint([0, 0, 1], angle, [0, -2, 0])).multiply(rotation).multiply(
        Matrix.scale(0.4, 0.4, 0.4));

    var moonModel = Matrix.translate(-2.5, 0, 0).multiply(
        rotateAroundAxisAtPoint([0, 0, 1], angle, [2.5, 0, 0])).multiply(rotation).multiply( // point controls radius of rotation
        Matrix.scale(0.5, 0.5, 0.5));

    var sunModel = Matrix.translate(-0, 0, 0).multiply(rotation).multiply(
        Matrix.scale(0.9, 0.9, 0.9));

    this.laurenMesh.render(gl, moonModel, view, projection, this.laurenTexture);
    this.sydniMesh.render(gl, earthModel, view, projection, this.sydniTexture);
    this.sunMesh.render(gl, sunModel, view, projection, this.sunTexture);
    this.benjiMesh.render(gl, cubeModel, view, projection, this.benjiTexture);
}

Task5.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
