// Sử dụng fetch API để GET dữ liệu từ endpoint “/api/v1/questions”
fetch("/api/v1/questions")
  .then((response) => response.json()) // chuyển đổi response thành JSON
  .then((questions) => {
    // Lấy ngẫu nhiên một question trong mảng questions
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];

    // Sử dụng DOM để gắn content trong question vào div.question-content
    const questionContentDiv = document.querySelector(".question-content");
    questionContentDiv.textContent = randomQuestion.content;

    // Sử dụng DOM gọi ra 2 button like và dislike, gắn cho chúng sự kiện onclick
    const likeButton = document.querySelector(".like-button");
    likeButton.addEventListener("click", () => {
      // Sử dụng fetch API để PUT dữ liệu like (đã được tăng lên 1) đến endpoint "/api/v1/questions"
      fetch(`/api/v1/questions/${randomQuestion.id}/like`, { method: "PUT" })
        .then((response) => console.log(response))
        .then(() => {
          // điều hướng về trang chi tiết câu hỏi
          window.location.href = `/question-detail/${randomQuestion.id}`;
        })
        .catch((error) => {
          console.error(error);
        });
    });

    const dislikeButton = document.querySelector(".dislike-button");
    dislikeButton.addEventListener("click", () => {
      // Sử dụng fetch API để PUT dữ liệu dislike (đã được tăng lên 1) đến endpoint "/api/v1/questions"
      fetch(`/api/v1/questions/${randomQuestion.id}/dislike`, { method: "PUT" })
        .then(() => {
          // điều hướng về trang chi tiết câu hỏi
          window.location.href = `/question-detail/${randomQuestion.id}`;
        })
        .catch((error) => {
          console.error(error);
        });
    });
  })
  .catch((error) => {
    console.error(error);
  });
