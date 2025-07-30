from http.server import HTTPServer, SimpleHTTPRequestHandler
from socketserver import ThreadingMixIn

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

class NoCacheHTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # 记录请求信息
        print(f"Received request: {self.path}")
        # 强制返回200 OK，不使用304 Not Modified
        # 处理根路径请求和查询参数
        original_path = self.path
        path = original_path.split('?')[0]  # 移除查询参数
        print(f"Processing request: {original_path} -> {path}")
        
        if path == '/':
            file_path = 'index.html'
        else:
            file_path = path[1:]
        
        print(f"Resolved file path: {file_path}")
        
        # 读取并发送文件内容
        try:
            with open(file_path, 'rb') as f:
                content = f.read()
                if file_path == 'index.html':
                    # 记录HTML内容的前200字符以验证版本号
                    print(f"Serving index.html content: {content.decode('utf-8')[:200]}")
            
            # 先发送响应头再发送内容
            self.send_response(200)
            self.send_cache_headers(file_path)
            self.end_headers()
            try:
                self.wfile.write(content)
            except ConnectionAbortedError:
                print("Client disconnected before response completed")
        except FileNotFoundError:
            # 处理Vite客户端和favicon请求
            if path in ['/favicon.ico', '/@vite/client']:
                self.send_response(200)
                self.send_cache_headers()
                self.end_headers()
                return
            print(f"File not found: {file_path}")
            self.send_response(404)
            self.send_cache_headers(file_path)
            self.send_header('Content-Type', 'text/plain')
            self.end_headers()
            return



    def send_cache_headers(self, file_path=None):
        if file_path and file_path.endswith(('.css', '.js', '.png', '.jpg', '.svg')):
            # 静态资源缓存10分钟
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')  # Disable cache for development
            self.send_header('Expires', self.date_time_string(time.time() + 600))
        else:
            # HTML等动态内容不缓存
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        if file_path:
            self.send_header('Content-Type', self.guess_type(file_path))
        else:
            self.send_header('Content-Type', 'text/plain')

import time

if __name__ == '__main__':
    server_address = ('', 8080)
    httpd = ThreadedHTTPServer(server_address, NoCacheHTTPRequestHandler)
    print('Serving at http://localhost:8080 with threaded processing and optimized caching')
    httpd.serve_forever()