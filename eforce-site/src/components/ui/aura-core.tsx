import { useRef, useEffect } from "react";

// Inlined Color / OGL-like classes (no external OGL dependency)
class Color extends Array<number> {
  constructor(r = 0, g = 0, b = 0) { super(r, g, b); }
  get r() { return this[0]; }
  get g() { return this[1]; }
  get b() { return this[2]; }
  set(r: number, g: number, b: number) { this[0] = r; this[1] = g; this[2] = b; return this; }
}

const vertexShaderSrc = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragmentShaderSrc = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uFocus;
  uniform float uDistortion;
  varying vec2 vUv;

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  float noise(vec2 st) {
    vec2 i = floor(st); vec2 f = fract(st);
    float a = random(i); float b = random(i + vec2(1.0,0.0));
    float c = random(i + vec2(0.0,1.0)); float d = random(i + vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.y*u.x;
  }
  float fbm(vec2 st) {
    float v = 0.0; float a = 0.5;
    for(int i=0;i<5;i++) { v += a*noise(st); st *= 2.0; a *= 0.5; }
    return v;
  }
  void main() {
    vec2 uv = (vUv - 0.5) * uResolution / min(uResolution.x, uResolution.y);
    float mouseDist = distance(uv, uMouse);
    float mouseEffect = smoothstep(1.0, 0.0, mouseDist) * uPower;
    float dist = length(uv);
    float core = smoothstep(0.2, 0.18, dist);
    vec2 dUv = uv + vec2(fbm(uv*2.0+uTime*0.1), fbm(uv*2.0-uTime*0.1))*0.1*uDistortion;
    float coreTexture = fbm(dUv*5.0+uTime*0.2);
    core *= coreTexture*(1.0+mouseEffect);
    float angle = atan(uv.y, uv.x);
    float rays = 0.0;
    for(int i=0;i<10;i++){
      float ao = float(i)*(3.14159*2.0/10.0);
      rays += pow(abs(sin(angle*5.0+uTime*0.5+ao)), uFocus);
    }
    rays *= smoothstep(0.8, 0.0, dist)*(1.0+mouseEffect*2.0);
    float particles = fbm(uv*4.0+uTime*0.1)*0.2;
    particles *= smoothstep(0.6, 0.0, dist);
    float fc = core + rays + particles;
    vec3 hsv = vec3(uColor.r, 0.7, fc*(0.5+mouseEffect));
    vec3 rgb = hsv2rgb(hsv);
    gl_FragColor = vec4(rgb, 1.0);
  }
`;

interface AuraCoreCanvasProps {
  hue?: number;
  power?: number;
  focus?: number;
  distortion?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AuraCoreCanvas({
  hue = 220,
  power = 1.8,
  focus = 28.0,
  distortion = 1.2,
  className,
  style,
}: AuraCoreCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: true });
    if (!gl) return;

    // Compile shaders
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, vertexShaderSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentShaderSrc);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);

    // Geometry: full-screen triangle
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const posData = new Float32Array([-1,-1, 3,-1, -1,3]);
    const uvData  = new Float32Array([0,0, 2,0, 0,2]);
    const mkBuf = (data: Float32Array, name: string, size: number) => {
      const loc = gl.getAttribLocation(prog, name);
      if (loc < 0) return;
      const buf = gl.createBuffer()!;
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };
    mkBuf(posData, "position", 2);
    mkBuf(uvData,  "uv", 2);
    gl.bindVertexArray(null);

    // Uniform locations
    gl.useProgram(prog);
    const uTime       = gl.getUniformLocation(prog, "uTime");
    const uResolution = gl.getUniformLocation(prog, "uResolution");
    const uMouse      = gl.getUniformLocation(prog, "uMouse");
    const uColor      = gl.getUniformLocation(prog, "uColor");
    const uPower      = gl.getUniformLocation(prog, "uPower");
    const uFocus      = gl.getUniformLocation(prog, "uFocus");
    const uDistortion = gl.getUniformLocation(prog, "uDistortion");

    const color = new Color(hue / 360, 1, 1);
    gl.uniform3fv(uColor, color);
    gl.uniform1f(uPower, power);
    gl.uniform1f(uFocus, focus);
    gl.uniform1f(uDistortion, distortion);

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr; canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(prog);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height * 2 - 1);
      const ar = rect.width / rect.height;
      mousePos.current = { x: nx * ar, y: ny };
    };
    window.addEventListener("mousemove", onMouseMove);

    let raf: number;
    const animate = (t: number) => {
      raf = requestAnimationFrame(animate);
      gl.clearColor(0,0,0,1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform1f(uTime, t * 0.001);
      gl.uniform2f(uMouse, mousePos.current.x, mousePos.current.y);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [hue, power, focus, distortion]);

  return <canvas ref={canvasRef} className={className} style={{ display: "block", width: "100%", height: "100%", ...style }} />;
}
