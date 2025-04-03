export async function post({ request }) {
  try {
    const data = await request.json();
    
    // ここでデータの検証を行う
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
    
    // 実際のデータベース保存処理をここに実装
    // 例: JSONファイルに保存する場合、データベース接続、Firebase等
    
    // 簡易的な例として、サーバーのログにメッセージを出力
    console.log('保存されたメッセージ:', data);
    
    // 本番環境では、実際のデータベースに保存する処理を実装してください
    // 例: データベース接続、ファイル書き込み、外部APIなど
    
    return new Response(JSON.stringify({
      success: true,
      message: 'メッセージが保存されました'
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