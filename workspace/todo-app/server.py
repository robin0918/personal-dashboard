#!/usr/bin/env python3
"""
Todo List 本地服务器
"""

import http.server
import socketserver
import json
from pathlib import Path

PORT = 8081
DATA_FILE = Path.home() / '.openclaw' / 'data' / 'todo.json'

class TodoHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path(__file__).parent), **kwargs)
    
    def do_GET(self):
        if self.path == '/api/tasks':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            if DATA_FILE.exists():
                with open(DATA_FILE, 'r') as f:
                    data = json.load(f)
            else:
                data = []
            
            self.wfile.write(json.dumps(data).encode())
            return
        
        super().do_GET()
    
    def do_POST(self):
        if self.path == '/api/tasks':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            record = json.loads(post_data.decode())
            
            records = []
            if DATA_FILE.exists():
                with open(DATA_FILE, 'r') as f:
                    records = json.load(f)
            
            # 如果是单个记录（添加/更新），插入到列表
            if isinstance(record, dict) and 'title' in record:
                # 更新已存在的任务或添加新任务
                existing_idx = next((i for i, r in enumerate(records) if r.get('id') == record.get('id')), -1)
                if existing_idx >= 0:
                    records[existing_idx] = record
                else:
                    records.insert(0, record)
            else:
                records = record if isinstance(record, list) else records
            
            DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
            with open(DATA_FILE, 'w') as f:
                json.dump(records, f, indent=2, ensure_ascii=False)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ok'}).encode())
            return
        
        if self.path == '/api/delete':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode())
            record_id = data.get('id')
            
            records = []
            if DATA_FILE.exists():
                with open(DATA_FILE, 'r') as f:
                    records = json.load(f)
            
            records = [r for r in records if r.get('id') != record_id]
            
            with open(DATA_FILE, 'w') as f:
                json.dump(records, f, indent=2, ensure_ascii=False)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ok'}).encode())
            return
        
        super().do_GET()
    
    def log_message(self, format, *args):
        pass

def run_server():
    with socketserver.TCPServer(("", PORT), TodoHandler) as httpd:
        print(f"✅ Todo List 服务器已启动")
        print(f"🌐 打开: http://localhost:{PORT}")
        print(f"📁 数据文件: {DATA_FILE}")
        print(f"\n按 Ctrl+C 停止服务器")
        httpd.serve_forever()

if __name__ == '__main__':
    try:
        run_server()
    except KeyboardInterrupt:
        print("\n👋 服务器已停止")
