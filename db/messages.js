import { getDatabase } from './init.js';
import { projects } from '../data/projects.js';

// メッセージを保存する関数
export function saveMessage(messageData) {
  const db = getDatabase();
  
  try {
    // プロジェクト名を取得
    const projectIndex = parseInt(messageData.projectIndex);
    const projectName = projects[projectIndex]?.name || '不明なプロジェクト';
    
    // プリペアドステートメントを準備
    const stmt = db.prepare(`
      INSERT INTO messages (project_index, project_name, sender_name, message, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    // データを挿入
    const result = stmt.run(
      projectIndex,
      projectName,
      messageData.name || '匿名',
      messageData.message,
      messageData.timestamp
    );
    
    console.log('メッセージを保存しました:', result.lastInsertRowid);
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    console.error('メッセージ保存エラー:', error);
    throw error;
  }
}

// プロジェクト別にメッセージを取得する関数
export function getMessagesByProject(projectIndex) {
  const db = getDatabase();
  
  try {
    const stmt = db.prepare(`
      SELECT * FROM messages 
      WHERE project_index = ? 
      ORDER BY timestamp DESC
    `);
    
    return stmt.all(projectIndex);
  } catch (error) {
    console.error('メッセージ取得エラー:', error);
    throw error;
  }
}

// すべてのメッセージを取得する関数
export function getAllMessages() {
  const db = getDatabase();
  
  try {
    const stmt = db.prepare(`
      SELECT * FROM messages 
      ORDER BY timestamp DESC
    `);
    
    return stmt.all();
  } catch (error) {
    console.error('メッセージ取得エラー:', error);
    throw error;
  }
} 