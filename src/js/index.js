import { template } from "./template";

const accordion = document.getElementsByClassName("accordion");
const questions = document.getElementsByClassName("accordion__header");

export async function fetchData() {
  return fetch(
    "https://my-json-server.typicode.com/timebandit/fakejson/db"
  ).then((response) => {
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
  });
}

export function insertQuestions(questions) {
  if (!questions.faqs) throw new Error("no faqs found");

  const { faqs } = questions;
  const res = faqs.reduce((prev, question) => prev + template(question), "");
  accordion[0].innerHTML = res;
}

export function addQuestionventListeners() {
  for (const question of questions) {
    question.addEventListener("click", function () {
      /* Toggle between adding and removing the "open" class,
      to highlight the button that controls the answer */
      this.classList.toggle("open");

      /* Toggle between hiding and showing the open answer */
      const answer = this.nextElementSibling;
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  }
}

async function run() {
  console.log("let the circus begin ... 🎪");

  let data;

  try {
    data = await fetchData();
  } catch (error) {
    console.log(error.message);
  }

  insertQuestions(data);
  addQuestionventListeners();
}

// hack to check for the accordion container in the page
// check every 100ms
let tries = 0;
const checkExist = setInterval(function () {
  if (accordion.length) {
    console.log("Exists!");
    clearInterval(checkExist);
    tries = 0;
    run();
  } else if (tries >= 10) {
    console.log("Not found!");
    clearInterval(checkExist);
    tries = 0;
  } else {
    tries++;
  }
}, 100);
