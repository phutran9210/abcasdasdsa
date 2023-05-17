// Lấy id từ window.location.href
const id = window.location.href.split("/").pop();

// Sử dụng fetch API để GET question từ endpoint /api/v1/questions/:id
fetch(`/api/v1/questions/${id}`)
  .then((response) => response.json())
  .then((question) => {
    // Gắn content vào div.question-content
    const questionContent = document.querySelector(".question-content");
    questionContent.innerHTML = question.content;
    const voteContent = document.querySelector(".vote-number");
    // Tính toán % like và dislike
    const rateBarLike = document.querySelector(".rate-bar .like");
    const rateBarDislike = document.querySelector(".rate-bar .dislike");
    const totalVotes = question.like + question.dislike;
    voteContent.innerHTML = totalVotes;
    const likePercentage =
      totalVotes === 0 ? 0 : Math.round((question.like / totalVotes) * 100);
    const dislikePercentage =
      totalVotes === 0 ? 0 : Math.round((question.dislike / totalVotes) * 100);
    rateBarLike.style.width = likePercentage + "%";
    rateBarLike.innerHTML = likePercentage + "%";
    rateBarDislike.style.width = dislikePercentage + "%";
    rateBarDislike.innerHTML = dislikePercentage + "%";

    // Lắng nghe sự kiện click trên button#btn
    const btn = document.querySelector("#btn");
    btn.addEventListener("click", () => {
      // Điều hướng về trang chủ khi được click
      window.location.href = "/";
    });
  });
