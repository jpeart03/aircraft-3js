// selecting container element
const container = document.getElementById("canvas-container");

// threejs needs three things: Scene, camera and renderer. Code below sets up those variables.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// .PerspectiveCamera params: field of view (FOV) in degrees, aspect ratio, near clipping plane, far clipping plane.
const camera = new THREE.PerspectiveCamera(
  75,
  container.offsetWidth / container.offsetHeight,
  0.1,
  1000
);
// Add user controls
// Set renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
// .setSize method params: size at which we render our app. usually width and height of element that will contain it...
// 3rd param, a boolean, can be used to render at lower resoultions.
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement); // adds <canvas> element to container element

const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.x = 0.5;
camera.position.y = 0.5;
camera.position.z = 1.75;
controls.update();

// Adding light to the scene
const ambientLight = new THREE.AmbientLight(0x404040, 4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(1, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Loading 3d model
const loader = new THREE.GLTFLoader();
loader.load("plane.glb", function (gltf) {
  scene.add(gltf.scene);
  animate();
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

// added resize function after noticing the renderer wasnt resizing with browser window
function onWindowResize() {
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.render(scene, camera);
}

function resetPosition() {
  camera.position.x = 0.5;
  camera.position.y = 0.5;
  camera.position.z = 1.5;
  controls.update();
}
document
  .getElementById("reset-position")
  .addEventListener("click", resetPosition);
window.addEventListener("resize", onWindowResize, false);
