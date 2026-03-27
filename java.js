const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");
const mainContainer = document.querySelector("#mainContainer");
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
const letterWrapper = document.getElementById("letterWrapper");
const envelope = document.getElementById("envelope");

let yesScale = 1;

// 1. Matrix Effect "I LOVE YOU"
function startMatrix() {
  canvas.style.display = "block";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = ["I", "LOVE", "YOU", "❤️", "💖", "✨", "🌸"];
  const fontSize = 18;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(255, 240, 245, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px 'Arial'";

    drops.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = text === "❤️" || text === "💖" ? "#ff0054" : "#ff4d6d";
      ctx.fillText(text, i * fontSize, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  }
  setInterval(draw, 50);
}

// 2. "Үгүй" товчлуурын зугтах логик (Компьютер + Гар утас)
function moveNoButton() {
  // Дэлгэцийн хэмжээг тооцоолох
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;

  // Санамсаргүй байрлал руу шилжүүлэх
  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;

  // "Тийм" товчлуурыг томруулах
  yesScale += 0.25;
  yesBtn.style.transform = `scale(${yesScale})`;
}

// Хулгана дээгүүр очиход (Desktop)
noBtn.addEventListener("mouseover", moveNoButton);

// Хуруугаар хүрэхэд (Mobile)
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Товчлуур дээр дарагдаж "click" болохоос сэргийлнэ
  moveNoButton();
});

// 3. "Тийм" дарах үед
yesBtn.addEventListener("click", () => {
  mainContainer.style.display = "none";
  startMatrix();

  setTimeout(() => {
    letterWrapper.classList.remove("hidden");
    setTimeout(() => {
      letterWrapper.classList.add("show");
    }, 100);
  }, 1000);
});

// 4. Захидал нээх үйлдэл
envelope.addEventListener("click", (e) => {
  e.stopPropagation();
  envelope.classList.toggle("open");
});

// Дэлгэцийн хэмжээ өөрчлөгдөхөд Matrix-ийг тааруулах
window.addEventListener("resize", () => {
  if (canvas.style.display === "block") {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
