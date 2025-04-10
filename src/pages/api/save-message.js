import { projects } from '../../data/projects.js'; // プロジェクト名取得のためにインポート

// ステップ1でコピーしたGoogle Apps ScriptのWebアプリURLをここに貼り付け
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyiSJ660RQD7LVRLk5fthYR6_46p4c8wd9Dzj2V7i8ykdCsHCON3GQHonz4pCSDL82E/exec';

// // この行を追加 (方法Aの場合)
// export const prerender = false; // ← この行を削除またはコメントアウト

// 関数名を post から POST に変更
export async function POST({ request }) {
  try {
    const data = await request.json();
    
    // データのバリデーション
    if (!data.message) {
      return new Response(JSON.stringify({
        success: false,
        error: 'メッセージは必須です'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    if (data.projectIndex === undefined || data.projectIndex === null || data.projectIndex === '') {
      return new Response(JSON.stringify({
        success: false,
        error: 'プロジェクト情報は必須です'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // タイムスタンプがない場合は追加
    if (!data.timestamp) {
      data.timestamp = new Date().toISOString();
    }
    
    // projectIndexからプロジェクト名を取得
    let projectName = '';
    const selectedProject = projects[Number(data.projectIndex)]; // projects.js からデータ取得
    if (selectedProject) {
        projectName = `${selectedProject.name} - ${selectedProject.keyword}`;
    }
    
    // Google Apps Scriptに送信するデータペイロードを作成
    const payload = {
      timestamp: data.timestamp,
      projectIndex: data.projectIndex,
      projectName: projectName, // プロジェクト名を追加
      name: data.name,        // フォームからの名前
      message: data.message,    // フォームからのメッセージ
    };
    
    // Google Apps ScriptのWebアプリにデータをPOST送信
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      // Apps Scriptがリダイレクトを返すことがあるため、手動で追跡しないように設定する場合があります
      // redirect: 'follow' // 必要に応じて設定
    });
    
    // Google Apps ScriptからのレスポンスをJSONとして解析
    const result = await response.json();
    
    // Apps Script側での処理が成功したか確認
    if (response.ok && result.status === 'success') {
      // フロントエンドに成功レスポンスを返す
      return new Response(JSON.stringify({
        success: true,
        message: 'メッセージがスプレッドシートに保存されました' // 成功メッセージ変更
      }), {
        status: 200, headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Apps Script側でエラーが発生した場合
      console.error('Google Apps Script Error:', result.message || response.statusText);
      return new Response(JSON.stringify({
        success: false,
        // Apps Scriptからのエラーメッセージがあれば表示
        error: `メッセージの保存に失敗しました: ${result.message || 'Google Apps Script エラー'}`
      }), {
        status: response.status, // GASからのステータスを返す
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('サーバーエラー:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'サーバーエラーが発生しました'
    }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
} 