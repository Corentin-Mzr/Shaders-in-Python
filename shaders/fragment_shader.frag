#version 330

out vec4 fragColor;

uniform vec2 resolution;
uniform float time;

vec2 rotate2d(vec2 uv, float a)
{
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c) * uv;
}


void main() {

    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / (exp(0.3 * time) * resolution.y);
    uv.y -= 0.5200;
    uv.x -= 0.4989;
    vec3 col = vec3(0.0);

    //uv = rotate2d(uv, time * 3.1415 / 180.0);

    vec2 z = uv;

    int max_iter = min(int(time + 1) * 100, 1000);

    for (int i = 0; i < max_iter; ++i)
    {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + uv;

        if (length(z) > 2.0)
        {
            col = vec3(float(i) / float(max_iter));
            break;
        }
    }

    //col += 0.01 / length(uv - vec2(xn, yn));

    col *= sin(vec3(0.2, 0.8, 0.3) * time) * 0.15 + 0.25;

    fragColor = vec4(col, 1.0);
}


vec2 function(float r, float i, float time)
{
    float coef_change = 10 * sin(time * 3.1415 / 360.0);
    float a = i;
    float dx = 2 * r * cos(time * 3.1415 / (90.0 + coef_change) * a) - r * cos(time * 3.1415 / (90.0 + coef_change) * a);
    float dy = 2 * r * sin(time * 3.1415 / (89.0 + coef_change) * a) - r * sin(time * 3.1415 / (89.0 + coef_change) * a);

    vec2 v = vec2(dx, dy);

    return v;
}