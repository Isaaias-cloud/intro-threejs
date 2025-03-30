import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio); // Aumenta la nitidez
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// Crear el cubo sólido
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Crear las líneas del cubo con alta calidad
const edges = new THREE.EdgesGeometry( geometry );
const lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
const wireframe = new THREE.LineSegments( edges, lineMaterial );
scene.add( wireframe );

camera.position.set(0, 2, 5);  // Mover la cámara más arriba en Y y alejándola en Z
camera.lookAt(cube.position);  // Asegurar que la cámara mira hacia el cubo

function animate() {
    //cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    //cube.rotation.z += 0.01;
    wireframe.rotation.copy(cube.rotation);

    renderer.render( scene, camera );
}

// Ajustar el tamaño de la ventana para mantener alta calidad
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
