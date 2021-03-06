
uniform sampler2D texture;
uniform int u_useTexture;
uniform vec3 u_albedo;
uniform vec3 u_ambient;
uniform vec3 u_lightPos;
uniform vec3 u_lightCol;
uniform float u_lightIntensity;
uniform vec3 u_cameraPos;

varying vec3 f_position;
varying vec3 f_normal;
varying vec2 f_uv;

// this function is from SO
float rand(float x){
    return fract(sin(dot(vec3(x, x, x), vec3(12.9898, 78.233, 78.233))) * 43758.5453);
}

void main() {
    vec4 color = vec4(u_albedo, 1.0);

    if (u_useTexture == 1) {
        color = texture2D(texture, f_uv);
    }

    vec3 camera_dir = normalize(u_cameraPos - f_position);
    float d = clamp(dot(f_normal, camera_dir), 0.0, 1.0);

    // i like using outlines
    if (d < 0.08) {
        gl_FragColor = vec4(0.5, 0.0, 1.0, 0.5);
    }
    else {
        float r = 0.1 + 0.25 * sin(1.34 * fract(d));
        float g = 0.4 + 0.25 * sin(3.56 * fract(d) + 0.25);
        float b = 0.6 + 0.25 * sin(2.53 * fract(d) + 0.5);

        // randomize the resulting dot product
        color = vec4(r, g, b, 1.0);
        gl_FragColor = vec4(d * color.rgb * u_lightCol * u_lightIntensity + u_ambient, 1.0);
    }
}
