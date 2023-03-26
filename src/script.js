import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";
/**
 * Base
 */
const gui = new dat.GUI();
/**
 * mouse tracking cursor
 * */
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// immerse full screen fixation
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// double click
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// texture

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/textures/matcaps/2.png");

/**
 * Fonts
 */

const fontLoader = new THREE.FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const testGeometry = new THREE.TextBufferGeometry("Manan Bari", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  const Material = new THREE.MeshMatcapMaterial({ matcap: texture });
  // Material.wireframe = true;
  testGeometry.center();
  const text = new THREE.Mesh(testGeometry, Material);
  scene.add(text);

  console.time();
  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 30);

  for (let i = 0; i < 500; i++) {
    // position rotation scaling
    const donut = new THREE.Mesh(donutGeometry, Material);
    donut.position.x = (Math.random() - 0.5) * 20;
    donut.position.y = (Math.random() - 0.5) * 20;
    donut.position.z = (Math.random() - 0.5) * 20;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);
    scene.add(donut);
  }
  gui.add(text.position, "x").min(-10).max(10).step(0.0001).name("Position X");
  gui.add(text.position, "y").min(-10).max(10).step(0.0001).name("Position Y");
  gui.add(text.position, "z").min(-10).max(10).step(0.0001).name("Position Z");

  gui.add(text.scale, "x").min(-10).max(10).step(0.0001).name("Scale X");
  gui.add(text.scale, "y").min(-10).max(10).step(0.0001).name("Scale Y");
  gui.add(text.scale, "z").min(-10).max(10).step(0.0001).name("Scale Z");

  gui.add(text.rotation, "x").min(-10).max(10).step(0.0001).name("rotation X");
  gui.add(text.rotation, "y").min(-10).max(10).step(0.0001).name("rotation Y");
  gui.add(text.rotation, "z").min(-10).max(10).step(0.0001).name("rotation Z");

  console.timeEnd();
});

// Scene
const scene = new THREE.Scene();
const axis = new THREE.AxesHelper(20);
scene.add(axis);

// Object
// const mesh = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
//   new THREE.MeshBasicMaterial({ map: texture })
// );
// scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 2;
// camera.lookAt(mesh.position);
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
// controls.enabled = false;
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   mesh.rotation.y = elapsedTime;

  // custom camera setting
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 5;
  //   camera.lookAt(mesh.position);

  // update controls
  controls.update();
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
