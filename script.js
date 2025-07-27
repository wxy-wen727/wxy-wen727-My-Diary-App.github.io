const PASSWORD = "大小姐最棒！";

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  if (input === PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadEntries();
  } else {
    alert("密码错误(｡•́︿•̀｡)");
  }
}

function saveEntry() {
  const date = document.getElementById("datePicker").value;
  const text = document.getElementById("entry").value;
  const fileInput = document.getElementById("imgInput");

  const reader = new FileReader();
  reader.onload = function () {
    const image = reader.result;
    const data = { date, text, image };
    localStorage.setItem(date, JSON.stringify(data));
    loadEntries();
    document.getElementById("entry").value = "";
    fileInput.value = "";
  };

  if (fileInput.files[0]) {
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    const data = { date, text, image: null };
    localStorage.setItem(date, JSON.stringify(data));
    loadEntries();
    document.getElementById("entry").value = "";
  }
}

function loadEntries() {
  const container = document.getElementById("entries");
  container.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const entry = JSON.parse(localStorage.getItem(key));
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `<strong>${entry.date}</strong><p>${entry.text}</p>`;
    if (entry.image) {
      const img = document.createElement("img");
      img.src = entry.image;
      div.appendChild(img);
    }
    container.appendChild(div);
  }
}