import fs from 'node:fs';
import path from 'node:path';

export async function get({ request }) {
  try {
    const url = new URL(request.url);
    const requestedPath = url.searchParams.get('path');
    
    // セキュリティ対策: パスのバリデーション
    if (!requestedPath || requestedPath.includes('..') || !requestedPath.startsWith('/items/')) {
      return new Response(JSON.stringify({
        error: '無効なパスです'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // パスを整形（先頭の / を削除）
    const normalizedPath = requestedPath.startsWith('/') 
      ? requestedPath.substring(1) 
      : requestedPath;
    
    // public ディレクトリを基準にしたパス
    const publicPath = path.join('public', normalizedPath);
    
    // ディレクトリが存在するか確認
    if (!fs.existsSync(publicPath) || !fs.statSync(publicPath).isDirectory()) {
      return new Response(JSON.stringify({
        error: 'ディレクトリが存在しません',
        path: publicPath
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // ディレクトリ内のファイル一覧を取得
    const files = fs.readdirSync(publicPath);
    
    return new Response(JSON.stringify({
      files: files
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('ファイル一覧取得エラー:', error);
    
    return new Response(JSON.stringify({
      error: 'サーバーエラーが発生しました',
      message: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 