import { saveMessage } from '../../db/messages.js';

export async function post({ request }) {
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
    
    if (data.projectName === undefined && data.projectIndex === undefined) {
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
    
    // SQLiteにメッセージを保存
    const result = saveMessage(data);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'メッセージが保存されました',
      id: result.id
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('メッセージ保存エラー:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'サーバーエラーが発生しました'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 