import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */

// AmbientLight is used to simulate light bouncing off objects.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.0);
scene.add(ambientLight);

gui.add(ambientLight, "intensity").min(0).max(1).step(0.0001).name("Ambient Intensity");

// DirectionalLight will have a sun-like effect in a parallel direction.
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.0);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

gui.add(directionalLight, "intensity").min(0).max(1).step(0.0001).name("Directional Int.");

// HemisphereLight has two colors: one from the sky and one from the ground.
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.0);
scene.add(hemisphereLight);

gui.add(hemisphereLight, "intensity").min(0).max(1).step(0.0001).name("Hemisphere Int.");

// PointLight looks like a candle and has a small point that radiates out.
const pointLight = new THREE.PointLight(0xff9000, 1.0, 10, 6);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

gui.add(pointLight, "intensity").min(0).max(5).step(0.001).name("Point Int.");

// RectAreaLight is a mix of directional and diffused light.
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 3, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
scene.add(rectAreaLight);

gui.add(rectAreaLight, "intensity").min(0).max(10).step(0.001).name("RectArea Int.");

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();