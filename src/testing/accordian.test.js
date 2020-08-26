// import { checkwin } from "../js/checkwin";
import { fetchData } from "../js/index.js";
import { template } from "../js/template.js";

const questionSelector = ".accordion__question";
const answerSelector = ".accordion__answer p";

let faqs;

describe("accordian", () => {
  // it('',()=>{})
  beforeEach(async () => {
    const res = await fetchData();
    faqs = res.faqs;
  });

  describe("fetch date", () => {
    it("should have 5 faqs", () => {
      expect(faqs).toHaveLength(5);
    });
    it("should have objects containg id, question, answer", () => {
      const keys = Object.keys(faqs[0]);

      expect(keys).toContain("id");
      expect(keys).toContain("question");
      expect(keys).toContain("answer");
    });
  });

  describe("template", () => {
    const dummyFaq = {
      id: "1",
      question: "do you love this candidate",
      answer: "yes"
    };

    const sectionString = template(dummyFaq);
    const sectionElement = stringToElement(sectionString);

    it("should contain an matching id", () => {
      const node = getNode(sectionElement, questionSelector);
      expect(node.dataset.id).toEqual(dummyFaq.id);
    });
    it("should contain an matching question", () => {
      const node = getNode(sectionElement, questionSelector);
      expect(node.innerText.trim()).toEqual(dummyFaq.question);
    });
    it("should contain an matching answer", () => {
      const node = getNode(sectionElement, answerSelector);
      expect(node.innerText.trim()).toEqual(dummyFaq.answer);
    });
  });
});

function getNode(dom, query) {
  return dom.querySelector(query);
}

function stringToElement(string) {
  var parser = new DOMParser(),
    content = "text/html",
    DOM = parser.parseFromString(string, content);

  // return element
  return DOM.body.childNodes[0];
}
