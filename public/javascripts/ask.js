// Gọi ra textarea và span
const textarea = document.querySelector("textarea.question-content");
const span = document.querySelector("span.letter");

// Gắn sự kiện "oninput" cho textarea
textarea.oninput = function () {
  const remaining = 200 - textarea.value.length;
  if (remaining < 0) {
    textarea.value = textarea.value.substr(0, 200);
  } else {
    span.innerText = remaining;
  }
};

// Gọi ra form và gắn sự kiện "onsubmit"
const form = document.querySelector("form.main-form");
form.onsubmit = async function (event) {
  // Ngăn chặn hành vi mặc định của form
  event.preventDefault();

  // Kiểm tra nếu textarea rỗng
  if (textarea.value.trim() === "") {
    alert("Textarea không được bỏ trống");
  } else {
    // Tiến hành POST dữ liệu
    const response = await fetch("/api/v1/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: textarea.value }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    alert("Thêm câu hỏi thành công");
    // Điều hướng về trang chủ
    window.location.href = "/";
  }
};
