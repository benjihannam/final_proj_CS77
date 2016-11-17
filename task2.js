var PhongVertexSource = `

    uniform mat4 ModelViewProjection;
    uniform mat4 Model;
    // uniform float worley;

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
    // float cell(vec3 pos) {
    //     vec3 v = vec3(0.0, 0.0, 0.0);
    //     return 2.0;
    // }

    const vec3 LightPosition = vec3(4.0, -4.0, 10.0);
    const vec3 LightIntensity = vec3(400.0);
    const vec3 ka = 0.3*vec3(1.0, 0.5, 0.5);
  //  const vec3 kd = 0.7*vec3(1.0, 0.5, 0.5);
    vec3 kd = 0.7*vec3(0.5, 0.7, 0.7);
    const vec3 ks = vec3(0.4);
    const float n = 60.0; //phong exponent

    varying vec4 globalPosition;
    varying vec3 vNormal;

    uniform mat4 ViewInverse;
    uniform mat4 ModelInverse;
    uniform vec3 one[3];
    uniform vec3 two[3];
    uniform vec3 three[6];
    uniform vec3 four[1];
    uniform vec3 five[6];
    uniform vec3 six[6];
    uniform vec3 seven[4];
    uniform vec3 eight[3];
    uniform vec3 nine[2];
    // uniform float worley;
    // uniform float uMyArray[2];
    // uMyArray[0] = 2.0;
    // uMyArray[1] = 3.0;
    void main() {

        // if (sin(vNormal[0]) > 0.0) {
            // kd = 0.7*vec3(worley, 0.7, 0.7);
            // float f = cell(vNormal);
        // one[0] = vec3(0.0, 0.0, 0.0);
        vec3 minimum = one[0];
        float min_d = (minimum[0] - vNormal[0])*(minimum[0] - vNormal[0]) + (minimum[1] - vNormal[1])*(minimum[1] - vNormal[1]) + (minimum[2] - vNormal[2])*(minimum[2] - vNormal[2]);
        float max_d = (minimum[0] - vNormal[0])*(minimum[0] - vNormal[0]) + (minimum[1] - vNormal[1])*(minimum[1] - vNormal[1]) + (minimum[2] - vNormal[2])*(minimum[2] - vNormal[2]);
        float poss = 0.0;
        for (int i = 0; i < 2; i++) {
            vec3 other = one[i+1];
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }
            if (poss > max_d) {
                max_d = poss;
            }

        }
        for (int i = 0; i < 3; i++) {
            vec3 other = two[i];
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }
            if (poss > max_d) {
                max_d = poss;
            }
        }
        for (int i = 0; i < 6; i++) {
            vec3 other = three[i];
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }
            if (poss > max_d) {
                max_d = poss;
            }
        }
        vec3 other4 = four[0];
        poss = (other4[0] - vNormal[0])*(other4[0] - vNormal[0]) + (other4[1] - vNormal[1])*(other4[1] - vNormal[1]) + (other4[2] - vNormal[2])*(other4[2] - vNormal[2]);
        if (poss < min_d) {
            min_d = poss;
        }
        if (poss > max_d) {
            max_d = poss;
        }

        for (int i = 0; i < 6; i++) {
            vec3 other = five[i];
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }
            if (poss > max_d) {
                max_d = poss;
            }
        }
        for (int i = 0; i < 6; i++) {
            vec3 other = six[i];
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }
            if (poss > max_d) {
                max_d = poss;
            }
        }
        for (int i = 0; i < 4; i++) {
            vec3 other = seven[i];
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }
            if (poss > max_d) {
                max_d = poss;
            }
        }
        for (int i = 0; i < 3; i++) {
            vec3 other = eight[i];
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }
            if (poss > max_d) {
                max_d = poss;
            }
        }
        for (int i = 0; i < 2; i++) {
            vec3 other = nine[i];
            poss = (other[0] - vNormal[0])*(other[0] - vNormal[0]) + (other[1] - vNormal[1])*(other[1] - vNormal[1]) + (other[2] - vNormal[2])*(other[2] - vNormal[2]);
            if (poss < min_d) {
                min_d = poss;
            }
            if (poss > max_d) {
                max_d = poss;
            }
        }
        // if (vNormal[0] > 0.0 && vNormal[1]> 0.0 && vNormal[2] > 0.0) {
        //     kd = 0.7*vec3(0.5, 0.0, 0.0);
        // }
        // else{
        //     kd = 0.7*vec3(0.0, 0.5, 0.0);
        // }
        kd = vec3(min_d/0.33, 1.0 - min_d/0.2, 0.0);

        // if (globalPosition[2] > 0.0) {
        //     vec3 min = one[0];
        //     float min_d = (min[0] - globalPosition[0])*(min[0] - globalPosition[0]) + (min[1] - globalPosition[1])*(min[1] - globalPosition[1]) + (min[2] - globalPosition[2])*(min[2] - globalPosition[2]);
        //     vec3 other = one[1];
        //     float max_d = (other[0] - globalPosition[0])*(other[0] - globalPosition[0]) + (other[1] - globalPosition[1])*(other[1] - globalPosition[1]) + (other[2] - globalPosition[2])*(other[2] - globalPosition[2]);
        //     if (min_d < max_d) {
        //         kd = 0.7*vec3(1.6/min_d, 1.0 - 1.6/min_d, 0.0);
        //     }
        //     else {
        //         kd = 0.7*vec3(1.6/max_d, 1.0 - 1.6/min_d, 0.0);
        //     }
        // }
        // else {
        //     vec3 min = two[0];
        //     float min_d = (min[0] - globalPosition[0])*(min[0] - globalPosition[0]) + (min[1] - globalPosition[1])*(min[1] - globalPosition[1]) + (min[2] - globalPosition[2])*(min[2] - globalPosition[2]);
        //     for (int i = 0; i < 3; i++) {
        //         vec3 other = two[i+1];
        //         float max_d = (other[0] - globalPosition[0])*(other[0] - globalPosition[0]) + (other[1] - globalPosition[1])*(other[1] - globalPosition[1]) + (other[2] - globalPosition[2])*(other[2] - globalPosition[2]);
        //         if (max_d < min_d) {
        //             min_d = max_d;
        //         }
        //     }
        //     kd = 0.7*vec3(min_d/2.0, 0.0, 0.0);
        //     // vec3 other = two[1];
        //     // float max_d = (other[0] - globalPosition[0])*(other[0] - globalPosition[0]) + (other[1] - globalPosition[1])*(other[1] - globalPosition[1]) + (other[2] - globalPosition[2])*(other[2] - globalPosition[2]);
        //     // if (min_d < max_d) {
        //     //     kd = 0.7*vec3(min_d/2.0, 0.0, 0.0);
        //     // }
        //     // else {
        //     //     kd = 0.7*vec3(max_d/2.0, 0.0, 0.0);
        //     // }
        // }
        // kd = .7*one[0];

        // }
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

        gl_FragColor = vec4(kd, 1.0);//vec4(L_r, 1.0);
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
    //this.worley = worley;
}

var dist_arr = function() {
    // var lamb = 2.0;
    // this.one = [, 0.5, 0.5, 1.0, 1.0, 1.0];
    // this.two = 
    // this.one =[-0.5745871565615002, -0.4084689615220358, -0.7217118296666857, -0.42447192862999805, -0.27490409049330056, -0.6988167529011846];
    // this.two = [-0.7914265242752359, -0.24846262520148943, 0.035948819198421855, -0.22618968316667298, -0.8132941094654598, 0.7295233995020323];
    // this.one =[-0.9640896522719298, -0.9097148438368039, -0.8032141812621195, -0.9705694242833813, -0.9888746718850396, -0.9073597176823565];
    // this.two = [-0.8724729586543694, -0.885750937293721, -0.7298040153532577, -0.9319334057643472, -0.8281796052171673, -0.7452288788387692, -0.9072995272208891, -0.9046140063785485, -0.5802759829858314, -0.8768411583559126, -0.9565052169546819, -0.6284903366770969];
    // this.one =[-0.5745871565615002, -0.4084689615220358, -0.7217118296666857, -0.42447192862999805, -0.27490409049330056, -0.6988167529011846];
    // this.two = [-0.7914265242752359, -0.24846262520148943, 0.035948819198421855, -0.22618968316667298, -0.8132941094654598, 0.7295233995020323, -0.8724729586543694, -0.885750937293721, -0.7298040153532577, -0.9319334057643472, -0.8281796052171673, -0.7452288788387692,];
    // this.three = [-0.7596228403117371, 0.8944375730966678, -0.6385707336944945];
    // this.four = [-0.11691756994171199, 0.10357936064121298, 0.03245094814916616];
    // this.five = [0.42855879372839434, -0.05606648396727998, -0.6445312146619583, 0.9461477039400101, -0.13680199977352314, -0.5834516818827481];
    // this.six = [0.1268629467939102, -0.38494594544096195, 0.08370690213858123, 0.6377961104464309, -0.5425334606789864, 0.277562097522809];
    // this.seven = [0.16064851556694992, 0.18642257983121802, -0.4473447584025899, 0.9635974609590514, 0.1630041535872513, -0.42334881145695014];
    // this.eight = [0.61616275336507, 0.45396874198860493, 0.5061566115267304, 0.48899263921972747, 0.925933888327334, 0.16228683392686793];
    this.one = [-0.13351875388937973, 1.1889888233169708, -0.0920777952991506, -1.0826673228259205, 0.11159701345511276, 0.5053489632648448, -0.8806593917635542, 0.0851498286743562, 0.8106716612632849, 0.42370113931727615, -0.6527849863087262, 0.913427121444923];
    this.two = [-0.25923653628781956, 0.0012385998318766133, 1.1716632981040032, 0.00885501551076077, 0.1024970325278793, 1.195581844552385];
    this.three = [-0.3553625152272226, 0.8680159930843476, 0.7485089969540619, -0.04641316837302059, -0.26099438059007296, 1.1703536863281894, 0.2059919185872484, 0.21555646937008258, 1.1623694498692956];
    this.four = [0.7486243450691011, 0.519460184579126, 0.7808474285075668, 0.1674438366616673, -0.9132471093314913, -0.7602251501112653];
    this.five = [1.053041818601705, -0.5682841235003948, -0.09031103616613734, -0.9821106649844045, 0.16712307844318977, -0.6689757233080751, -0.05930039279951762, 0.9714944422676332, -0.7019131086230852, 0.22617004769726176, 0.2789651023779504, -1.1450002537903117, -0.3100181265145631, -0.907019213622489, -0.7219452246202905];
    this.six = [0.7606343026785112, -0.24363884760366045, 0.8955867180385914, 0.19820646803853095, 1.041014753854743, -0.5630297312615379, -0.3940392208272017, 0.31413940519051675, 1.0890590096759862, -0.9517233435164102, 0.09581849353810679, -0.7245974701184326];
    this.seven = [-0.4508111894166355, -0.5319587274484173, 0.9766213103287369, -1.0690370216725111, 0.031103682390258198, 0.5442356173895021, -0.035812731822388325, 0.1863794335389491, -1.1848966853667529, -0.43421389194715265, -0.8440972669240305, 0.734137657399134, -0.7188279757404274, 0.6519310634589751, -0.7058840059033559, 0.4386780329249348, -1.1074919171456699, -0.14499392016949747];
    this.eight = [-0.22847455268688457, -1.1765525372497196, 0.05935912622145498];
    this.nine = [-0.15021276529226377, -0.0961414651376635, 1.1866730568376593, 0.5128361419667055, 1.082987469151507, 0.06432132736129281, 0.46234295510931217, -1.095194622513008, -0.16366957774546248, 0.07254643921446735, -0.12265069986957453, 1.191509051572335, -0.8115450482057106, -0.10703726224619421, -0.8774609160661402, 0.9217951947845597, 0.07868533365077454, 0.7642658157606959];
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
    // gl.bindBuffer(gl.ARRAY_BUFFER, this.worley);
    // var w = gl.getUniformLocation(this.shaderProgram, "worley");

    var positionLoc = gl.getAttribLocation(this.shaderProgram, "Position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalVbo);

    var normalLoc = gl.getAttribLocation(this.shaderProgram, "Normal");
    gl.enableVertexAttribArray(normalLoc);
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);

    var f = new dist_arr();
    //console.log(f.lamb);
    var o = gl.getUniformLocation(this.shaderProgram, "one");
    gl.uniform3fv(o, f.one);
    var t = gl.getUniformLocation(this.shaderProgram, "two");
    gl.uniform3fv(t, f.two);
    var th = gl.getUniformLocation(this.shaderProgram, "three");
    gl.uniform3fv(th, f.three);
    var fo = gl.getUniformLocation(this.shaderProgram, "four");
    gl.uniform3fv(fo, f.four);
    var fi = gl.getUniformLocation(this.shaderProgram, "five");
    gl.uniform3fv(fi, f.five);
    var si = gl.getUniformLocation(this.shaderProgram, "six");
    gl.uniform3fv(si, f.six);
    var se = gl.getUniformLocation(this.shaderProgram, "seven");
    gl.uniform3fv(se, f.seven);
    var ei = gl.getUniformLocation(this.shaderProgram, "eight");
    gl.uniform3fv(ei, f.eight);
    var ni = gl.getUniformLocation(this.shaderProgram, "nine");
    gl.uniform3fv(ni, f.nine);
    // var t = gl.Un

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
