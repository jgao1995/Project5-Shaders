
const THREE = require('three');
import {textureLoaded} from '../mario'

// options
var options = {
    lightColor: '#ffffff',
    lightIntensity: 1,
    albedo: '#dddddd',
    ambient: '#111111',
}

export default function(renderer, scene, camera) {
    const Shader = {
        initGUI: function(gui) {
            gui.addColor(options, 'lightColor').onChange(function(val) {
                Shader.material.uniforms.u_lightCol.value = new THREE.Color(val);
            });
            gui.add(options, 'lightIntensity').onChange(function(val) {
                Shader.material.uniforms.u_lightIntensity.value = val;
            });
            gui.addColor(options, 'albedo').onChange(function(val) {
                Shader.material.uniforms.u_albedo.value = new THREE.Color(val);
            });
            gui.addColor(options, 'ambient').onChange(function(val) {
                Shader.material.uniforms.u_ambient.value = new THREE.Color(val);
            });
        },

        material: new THREE.ShaderMaterial({
            uniforms: {
                u_albedo: {
                    type: 'v3',
                    value: new THREE.Color(options.albedo)
                },
                u_ambient: {
                    type: 'v3',
                    value: new THREE.Color(options.ambient)
                },
                u_lightPos: {
                    type: 'v3',
                    value: new THREE.Vector3(30, 50, 40)
                },
                u_lightCol: {
                    type: 'v3',
                    value: new THREE.Color(options.lightColor)
                },
                u_lightIntensity: {
                    type: 'f',
                    value: options.lightIntensity
                },
                u_cameraPos: {
                    type: 'v3',
                    value: camera.position
                }
            },
            vertexShader: require('../glsl/hatch-vert.glsl'),
            fragmentShader: require('../glsl/hatch-frag.glsl')
        })
    }
    return Shader;
}

