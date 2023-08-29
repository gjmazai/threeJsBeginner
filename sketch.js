//A basic ThreeJS cube scene.

const canvasSketch = require('canvas-sketch');

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('#000', 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  // Задаем позицию камеры
  camera.position.set(2, 2, -4);
  // Ставим камеру в нулевой меридиан 
  camera.lookAt(new THREE.Vector3());

  // Контроллер камеры - с помощью которго вращаем
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Сетка - абстрактный объект, который в себе может принять в себя бесконечное кол-во геометрий
  const mesh = new THREE.Mesh(
    // Коробка которая имеет размеры  1 1 1
    new THREE.BoxGeometry(1, 1, 1),
    // Материал для Сетки
    new THREE.MeshPhysicalMaterial({
      color: 'white',
      roughness: 0.75,
      flatShading: true
    })
  );
  scene.add(mesh);

  // Добавляем переливистый Свет
  scene.add(new THREE.AmbientLight('#ffaa04'));

  // Добавляем обычный свет
  const light = new THREE.PointLight('#45caf7', 1, 15.5);
  light.position.set(2, 2, -4).multiplyScalar(2);
  scene.add(light);

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // And render events here
    render ({ time, deltaTime }) {
      mesh.rotation.y = time * (200 * Math.PI / 180);
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
    unload () {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);