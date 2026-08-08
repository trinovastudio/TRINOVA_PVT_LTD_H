/* ==========================================================================
   Trinova Aether — animation mounts
   Wraps the four supplied WebGL/Three.js animations into reusable functions.
   ========================================================================== */

/* ---------- Shader 1: organic energy waves (Home hero) ---------- */
function mountAetherWaves(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  function syncSize() {
    const w = canvas.clientWidth || 1280;
    const h = canvas.clientHeight || 720;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(syncSize).observe(canvas);
  }
  syncSize();

  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!gl) return;

  const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
  const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = v_texCoord;
    vec2 p = (v_texCoord * 2.0 - 1.0) * vec2(u_resolution.x / u_resolution.y, 1.0);

    float noise = 0.0;
    for(float i = 1.0; i < 4.0; i++) {
        p.x += 0.3 / i * sin(i * 3.0 * p.y + u_time * 0.5);
        p.y += 0.3 / i * cos(i * 3.0 * p.x + u_time * 0.5);
        noise += 0.1 / abs(sin(p.x + p.y + u_time * 0.2));
    }

    vec3 color1 = vec3(0.557, 0.361, 0.796); // #8E5CCB
    vec3 color2 = vec3(0.843, 0.761, 0.965); // #D7C2F6
    vec3 color3 = vec3(1.0, 1.0, 1.0);

    vec3 finalColor = mix(color1, color2, 0.5 + 0.5 * sin(u_time * 0.2 + uv.x));
    finalColor = mix(finalColor, color3, noise * 0.05);

    float vignette = 1.0 - length(v_texCoord - 0.5) * 0.8;

    gl_FragColor = vec4(finalColor * vignette, 1.0);
}`;
  runShader(gl, canvas, vs, fs);
}

/* ---------- Shader 3: slow atmospheric drift w/ mouse interaction (Careers / Contact) ---------- */
function mountAetherAtmosphere(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  function syncSize() {
    const w = canvas.clientWidth || 1280;
    const h = canvas.clientHeight || 720;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(syncSize).observe(canvas);
  }
  syncSize();

  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!gl) return;

  const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
  const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = v_texCoord;
    vec2 p = (v_texCoord * 2.0 - 1.0) * vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 m = (u_mouse / u_resolution.x * 2.0 - 1.0);

    float t = u_time * 0.15;

    vec3 colorPrimary = vec3(0.557, 0.361, 0.796); // #8E5CCB
    vec3 colorLight = vec3(0.843, 0.761, 0.965);   // #D7C2F6
    vec3 colorSurface = vec3(0.976, 0.976, 0.984); // #F9F9FB

    float s1 = smoothstep(1.5, 0.0, length(p + vec2(sin(t * 0.2), cos(t * 0.3)) * 0.8));
    float s2 = smoothstep(1.8, 0.2, length(p - vec2(cos(t * 0.4), sin(t * 0.5)) * 0.9));

    vec3 finalColor = mix(colorSurface, colorLight, s1 * 0.12);
    finalColor = mix(finalColor, colorPrimary, s2 * 0.08);

    float dist = length(p - m * 0.2);
    finalColor += colorLight * (1.0 - smoothstep(0.0, 1.5, dist)) * 0.03;

    float n = noise(uv * 200.0 + u_time * 0.02) * 0.01;
    finalColor += n;
    float vignette = 1.0 - length(uv - 0.5) * 0.45;

    gl_FragColor = vec4(finalColor * vignette, 1.0);
}`;
  runShader(gl, canvas, vs, fs);
}

/* ---------- Shared shader boot/render loop ---------- */
function runShader(gl, canvas, vs, fs) {
  function cs(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, "a_position");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const uTime = gl.getUniformLocation(prog, "u_time");
  const uRes = gl.getUniformLocation(prog, "u_resolution");
  const uMouse = gl.getUniformLocation(prog, "u_mouse");

  let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  window.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width && rect.height) {
      const nx = (event.clientX - rect.left) / rect.width;
      const ny = 1.0 - (event.clientY - rect.top) / rect.height;
      mouse.x = nx * canvas.width;
      mouse.y = ny * canvas.height;
    }
  });

  function render(t) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uTime) gl.uniform1f(uTime, t * 0.001);
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }
  render(0);
}

/* ---------- Three.js 4: glowing technology ecosystem (Home capabilities) ---------- */
function mountEcosystemCore(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === "undefined") return;
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  const coreGeometry = new THREE.IcosahedronGeometry(1.5, 2);
  const coreMaterial = new THREE.MeshPhongMaterial({
    color: 0x8e5ccb,
    emissive: 0x8e5ccb,
    emissiveIntensity: 0.5,
    wireframe: true,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(core);

  const group = new THREE.Group();
  const nodeCount = 12;
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const nodeMaterial = new THREE.MeshPhongMaterial({ color: 0xd7c2f6 });
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    const angle = (i / nodeCount) * Math.PI * 2;
    const radius = 3 + Math.random() * 0.5;
    node.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius);
    group.add(node);
    nodes.push({ mesh: node, speed: 0.005 + Math.random() * 0.01, radius, angle, offset: Math.random() * Math.PI * 2 });
  }
  scene.add(group);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x8e5ccb, 1, 100);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  camera.position.z = 8;

  function animate() {
    requestAnimationFrame(animate);
    core.rotation.y += 0.005;
    core.rotation.x += 0.003;
    nodes.forEach((node) => {
      node.angle += node.speed;
      node.mesh.position.x = Math.cos(node.angle) * node.radius;
      node.mesh.position.z = Math.sin(node.angle) * node.radius;
      node.mesh.position.y = Math.sin(node.angle + node.offset) * 0.5;
    });
    group.rotation.y += 0.001;
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", () => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  animate();
}

/* ---------- Three.js 2: industry node — dodecahedron + orbital rings (Industries) ---------- */
function mountIndustryNode(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === "undefined") return;
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  const geom = new THREE.DodecahedronGeometry(2, 1);
  const mat = new THREE.MeshPhongMaterial({ color: 0x8e5ccb, transparent: true, opacity: 0.15, wireframe: true });
  const mesh = new THREE.Mesh(geom, mat);
  group.add(mesh);

  const innerGeom = new THREE.SphereGeometry(0.5, 32, 32);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x8e5ccb,
    emissive: 0x8e5ccb,
    emissiveIntensity: 1.2,
    roughness: 0,
    metalness: 0,
  });
  const innerMesh = new THREE.Mesh(innerGeom, innerMat);
  group.add(innerMesh);

  for (let i = 0; i < 3; i++) {
    const rGeom = new THREE.TorusGeometry(3.5 + i * 0.5, 0.005, 16, 100);
    const rMat = new THREE.MeshBasicMaterial({ color: 0xd7c2f6, transparent: true, opacity: 0.25 });
    const ring = new THREE.Mesh(rGeom, rMat);
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    group.add(ring);
  }

  const pointsGeom = new THREE.BufferGeometry();
  const coords = new Float32Array(1500);
  for (let i = 0; i < 1500; i++) coords[i] = (Math.random() - 0.5) * 15;
  pointsGeom.setAttribute("position", new THREE.BufferAttribute(coords, 3));
  const pointsMat = new THREE.PointsMaterial({ color: 0x8e5ccb, size: 0.012, transparent: true, opacity: 0.4 });
  const points = new THREE.Points(pointsGeom, pointsMat);
  group.add(points);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x8e5ccb, 1.5, 50);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  camera.position.z = 10;

  let mouseX = 0,
    mouseY = 0;
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.2;
  });

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.001;
    group.rotation.x += 0.0005;
    group.position.x += (mouseX - group.position.x) * 0.05;
    group.position.y += (-mouseY - group.position.y) * 0.05;
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", () => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  animate();
}
