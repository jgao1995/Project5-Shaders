const THREE = require('three');
const EffectComposer = require('three-effectcomposer')(THREE)

var options = {
    amount: 0.5,
    color: '#005cff'
}

var PointilismShader = new EffectComposer.ShaderPass({
    uniforms: {
        // this tDiffuse MUST be defined, basically going to be the texture to which it renders the frame to
        tDiffuse: {
            type: 't',
            value: null
        },
        u_amount: {
            type: 'f',
            value: options.amount
        },
        u_color: {
            type: 'v3',
            value: new THREE.Color(options.color)
        }
    },
    vertexShader: require('../glsl/pass-vert.glsl'),
    fragmentShader: require('../glsl/pointilism-frag.glsl')
});

export default function pointilism(renderer, scene, camera) {

    // this is the THREE.js object for doing post-process effects
    var composer = new EffectComposer(renderer);

    // first render the scene normally and add that as the first pass
    composer.addPass(new EffectComposer.RenderPass(scene, camera));

    // then take the rendered result and apply the pointilism shader
    composer.addPass(PointilismShader);

    // set this to true on the shader for your last pass to write to the screen
    PointilismShader.renderToScreen = true;

    return {
        initGUI: function(gui) {
            gui.add(options, 'amount', 0, 1).onChange(function(val) {
                PointilismShader.material.uniforms.u_amount.value = val;
            });
            gui.addColor(options, 'color').onChange(function(val) {
                PointilismShader.material.uniforms.u_color.value = new THREE.Color(val);
            });
        },
        render: function() {;
            composer.render();
        }
    }
}
