const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");
const mainContainer = document.querySelector("#mainContainer");
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
const letterWrapper = document.getElementById("letterWrapper");
const envelope = document.getElementById("envelope");

let yesScale = 1;

// 1. Matrix Effect "I LOVE YOU"
// ... (өмнөх товчлуурын коднууд хэвээрээ)

function startMatrix() {
  canvas.style.display = "block";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Урсах тэмдэгтүүд
  const chars = ["I", "LOVE", "YOU", "❤️", "💖", "✨", "🌸"];
  const fontSize = 18;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    // Бага зэргийн бүдгэрэлт өгч ард талын мөрийг үлдээнэ
    ctx.fillStyle = "rgba(255, 240, 245, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px 'Arial'";

    drops.forEach((y, i) => {
      // Санамсаргүй тэмдэгт сонгох
      const text = chars[Math.floor(Math.random() * chars.length)];

      // Өнгийг нь ягаан туяатай болгох
      ctx.fillStyle = text === "❤️" || text === "💖" ? "#ff0054" : "#ff4d6d";

      ctx.fillText(text, i * fontSize, y * fontSize);

      // Дэлгэцээс гарвал буцааж дээрээс эхлүүлэх
      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  }
  setInterval(draw, 50); // Урсах хурд
}

// Захидал нээх үйлдэл
envelope.addEventListener("click", (e) => {
  e.stopPropagation(); // Matrix-ийг дарахаас сэргийлнэ
  envelope.classList.toggle("open");
});

// 2. "Үгүй" товчлуурын зугтах логик
noBtn.addEventListener("mouseover", () => {
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;
  noBtn.style.position = "fixed";
  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";

  yesScale += 0.3;
  yesBtn.style.transform = `scale(${yesScale})`;
});

// 3. "Тийм" дарах үед
yesBtn.addEventListener("click", () => {
  mainContainer.classList.add("hidden"); // Гол контентыг нууна
  startMatrix(); // Matrix эхэлнэ

  setTimeout(() => {
    letterWrapper.classList.remove("hidden");
    setTimeout(() => letterWrapper.classList.add("show"), 100);
  }, 1000); // 1 секундын дараа захидал гарч ирнэ
});

// 4. Захидал дээр дарахад нээгдэнэ
envelope.addEventListener("click", () => {
  envelope.classList.toggle("open");
});
// ... (startMatrix болон бусад хувьсагчид хэвээрээ)

// Захидал нээх үйлдэл - Нэгтгэсэн хувилбар
envelope.addEventListener("click", (e) => {
  e.stopPropagation(); // Matrix-д нөлөөлөхгүй байх

  // Дугтуйг нээх/хаах класс солих
  envelope.classList.toggle("open");
});

// "Тийм" дарах үед (Чиний өмнөх логик)
yesBtn.addEventListener("click", () => {
  mainContainer.style.display = "none"; // mainContainer-ийг нууна
  startMatrix();

  setTimeout(() => {
    letterWrapper.classList.remove("hidden");
    setTimeout(() => {
      letterWrapper.classList.add("show");
    }, 100);
  }, 1000);
});

// "Үгүй" товчлуурын зугтах логик (Хэвээрээ)
noBtn.addEventListener("mouseover", () => {
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;
  noBtn.style.position = "fixed";
  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";

  yesScale += 0.3;
  yesBtn.style.transform = `scale(${yesScale})`;
});
