export function template({ id, question, answer }) {
  return `
    <section>
      <div class="accordion__header" role="button" tabindex="1">
        <div class="accordion__question" data-id="${id}" role="heading">
          ${question}
        </div>
        <div class="accordion__icon">
          <svg
            class="svg-rotate__icon"
            width="20px"
            height="20px"
            viewBox="0 0 357 357"
          >
            <g id="add">
              <path
                d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"
              />
            </g>
          </svg>
        </div>
      </div>
      <div class="accordion__answer">
        <p>
          ${answer}
        </p>
      </div>
    </section>
    `;
}
