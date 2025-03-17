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

      // メッセージの表示を開始
      currentMessageIndex = 0;
      showNextMessage();
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

export function showNextMessage() {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  let renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

}