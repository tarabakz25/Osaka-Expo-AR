import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// ESMで__dirnameを取得するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// データベースファイルのパス
const dbPath = path.join(__dirname, '../../db/messages.sqlite');

// データベース接続を初期化
function initializeDatabase() {
  try {
    // データベース接続
    const db = new Database(dbPath);
    console.log('SQLiteデータベースに接続しました:', dbPath);
    
    // メッセージテーブルの作成
    db.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_index INTEGER,
        project_name TEXT,
        sender_name TEXT,
        message TEXT NOT NULL,
        timestamp TEXT NOT NULL
      )
    `);
    
    console.log('メッセージテーブルを初期化しました');
    
    // データベース接続をクローズするのではなく、返す
    return db;
  } catch (error) {
    console.error('データベース初期化エラー:', error);
    throw error;
  }
}

// シングルトンパターンでデータベース接続を管理
let dbInstance = null;

export function getDatabase() {
  if (!dbInstance) {
    dbInstance = initializeDatabase();
  }
  return dbInstance;
} 