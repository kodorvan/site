document.addEventListener('DOMContentLoaded', function() {
  const blocks = document.querySelectorAll('.block');
  
  blocks.forEach(block => {
    const question = block.querySelector('.question');
    const answerCont = block.querySelector('.answercont');
    
    question.addEventListener('click', function() {
      // Просто переключаем текущий блок без влияния на другие
      if (block.classList.contains('active')) {
        answerCont.style.maxHeight = '0';
        block.classList.remove('active');
      } else {
        answerCont.style.maxHeight = answerCont.scrollHeight + 'px';
        block.classList.add('active');
      }
    });
  });
});