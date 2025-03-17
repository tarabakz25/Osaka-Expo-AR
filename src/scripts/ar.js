import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

// クライアントサイドでのみ実行されるコードを定義
export function initAR() {
  try {
    // マーカー検出のイベントリスナーを設定
    const marker = document.querySelector('a-marker');
    if (!marker) {
      console.error('マーカー要素が見つかりません');
      return;
    }
    
    // 初期状態ではオーバーレイとメッセージを非表示に
    const overlay = document.getElementById('overlay');
    const message = document.getElementById('message');
    if (overlay) overlay.style.opacity = '0';
    if (message) message.style.opacity = '0';
    
    // マーカーが見つかった時のイベント
    marker.addEventListener('markerFound', () => {
      console.log('マーカーを検出しました');
      // オーバーレイを徐々に暗く
      if (overlay) overlay.style.opacity = '0.7';

      // インタラクションの開始
      startIntruction();
    });
    
    marker.addEventListener('markerLost', () => {
      console.log('マーカーを見失いました');
      if (overlay) overlay.style.opacity = '0';
      if (message) message.style.opacity = '0';
    });
  } catch (error) {
    console.error('AR初期化エラー:', error);
  }
}

export function startIntruction() {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  let renderer = new THREE.WebGLRenderer({ antialias: true });

  // world

  let geometry = new THREE.BoxGeometry(1, 10, 1);
  let material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

  for (let i = 0; i < 500; i ++){
    let mesh = new THREE.Mesh( getometry, material );
    mesh.position.x = (Math.random() - 0.5) * 1000;
    mesh.position.y = (Math.random() - 0.5) * 1000;
    mesh.position.z = (Math.random() - 0.5) * 1000;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
  }
  
  // lights
  let dirlight1 = new THREE.DirectionalLight( 0xffffff, 3 );
  dirLight1.position.set( 1, 1, 1 );
  scene.add( dirLight1 );

  
  // renderer
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.AnimationLoop(animate);
  document.body.appendChild( renderer.domElement );

  stats = new Stats();
  document.body.appendChild( stats.dom );

  window.addEventListener( 'resize', onWindowResize, false );
  createControls( PerspectiveCamera);
}

function createControls( camera) {
  controls = new TrackballControls( camera, renderer.domElement );
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;

  controls.keys= [ 'KeyA', 'KeyD', 'KeyS'];
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;

    PerspectiveCamera.aspect = aspect;
    PerspectiveCamera.updateProjectionMatrix();

    otrhographicCamera.left = - frustumSize * aspect / 2;
    otrhographicCamera.right = frustumSize * aspect / 2;
    otrhographicCamera.top = frustumSize / 2;
    otrhographicCamera.bottom = - frustumSize / 2;
    otrhographicCamera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    controls.handleResize();
}

function animate() {
    controls.update();
    render();
    stats.update();
}

function render() {
    const camera = ( params.otrhographicCamera ) ? orthographocCamera : PerspectiveCamera;

    renderer.render( scene, camera );
}