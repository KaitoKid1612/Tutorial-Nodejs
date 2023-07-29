const http = require('http')

// Tạo một máy chủ HTTP đơn giản
const server = http.createServer((req, res) => {
  // Thiết lập mã trạng thái và định dạng nội dung
  res.writeHead(200, { 'Content-Type': 'text/plain' })

  // Gửi phản hồi về trình duyệt
  res.end('Xin chào, đây là máy chủ Node.js đơn giản!')
})

// Lắng nghe trên cổng 3000
server.listen(3000, () => {
  console.log('Máy chủ đang lắng nghe trên cổng 3000...')
})
