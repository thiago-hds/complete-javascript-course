const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const optionsFormatted = this.options.join('\n');
    const answer = Number.parseInt(
      prompt(`${this.question}\n${optionsFormatted}(write option number)`)
    );
    if (!Number.isNaN(answer) && answer in this.answers) {
      this.answers[answer]++;
    }
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type == 'string') {
      const results = this.answers.join(',');
      console.log(`Poll results are ${results}.`);
    } else {
      console.log(this.answers);
    }
  },
};

const btnPoll = document.querySelector('.poll');
btnPoll.addEventListener('click', poll.registerNewAnswer.bind(poll));

// bonus
const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1];
const obj1 = {
  answers: data1,
};
const obj2 = {
  answers: data2,
};

poll.displayResults.call(obj1, 'array');
poll.displayResults.call(obj1, 'string');
poll.displayResults.call(obj2, 'array');
poll.displayResults.call(obj2, 'string');
