let input;
let slider;
let button;
let dropdown;
let iframe;
let isBouncing = false;
let bounceOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput('淡江大學'); // 設置預設文字
  input.position(10, 10);
  slider = createSlider(10, 100, 40); // 創建滑桿
  slider.position(input.x + input.width + 10, 10); // 設置滑桿位置
  button = createButton('開始跳動'); // 創建按鈕
  button.position(slider.x + slider.width + 10, 10); // 設置按鈕位置
  button.mousePressed(toggleBounce); // 設置按鈕點擊事件
  dropdown = createSelect(); // 創建選單
  dropdown.position(button.x + button.width + 10, 10); // 設置選單位置
  dropdown.option('第一周', 'https://www.tku.edu.tw/');
  dropdown.option('第二周', 'https://www.et.tku.edu.tw/');
  dropdown.option('第三周', 'https://hackmd.io/lO-MlT-cTLyI0UY-EG8hBA');
  dropdown.option('第四周', 'https://example.com/'); // 新增第四周選項
  dropdown.changed(goToPage); // 設置選單改變事件
  
  iframe = createElement('iframe'); // 創建 iframe 元素
  iframe.position(10, 60); // 設置 iframe 位置
  iframe.size(windowWidth - 60, windowHeight - 110); // 調整 iframe 大小，使其再小一點
}

function draw() {
  background(220);
  let txt = input.value();
  let x = 10;
  let y = 50;
  let lineHeight = slider.value(); // 使用滑桿值設置行高
  let textSizeValue = map(slider.value(), 10, 100, 28, 50); // 根據滑桿值設置文字大小
  textSize(textSizeValue); // 設置文字大小
  
  let row = 0;
  while (y < height) {
    let currentX = x;
    let rowBounceOffset = isBouncing ? sin(frameCount * 0.1 + row) * 10 : 0; // 每一排不同的跳動速度
    while (currentX < width) {
      text(txt, currentX, y + rowBounceOffset);
      currentX += textWidth(txt) + 30; // x 軸間隔 30 像素
    }
    y += lineHeight;
    row++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  input.position(10, 10);
  slider.position(input.x + input.width + 10, 10); // 調整滑桿位置
  button.position(slider.x + slider.width + 10, 10); // 調整按鈕位置
  dropdown.position(button.x + button.width + 10, 10); // 調整選單位置
  iframe.size(windowWidth - 60, windowHeight - 110); // 調整 iframe 大小，使其再小一點
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function goToPage() {
  let url = dropdown.value();
  iframe.attribute('src', url); // 設置 iframe 的 src 屬性
}
