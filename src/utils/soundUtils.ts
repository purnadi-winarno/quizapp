export const playSound = (isCorrect: boolean) => {
    const audio = new Audio(isCorrect ? '/assets/audio/correct.mp3' : '/assets/audio/incorrect.mp3');
    audio.play();
};

export const playExpiredSound = () => {
    const audio = new Audio('/assets/audio/failed.mp3');
    audio.play();
};

export const playResultSound = (finalScore: number) => {
  try {
    
    // Determine which sound to play
    let soundFile = '';
    if (finalScore === 100) {
      soundFile = '/assets/audio/yay.mp3';
    } else if (finalScore >= 50) {
      soundFile = '/assets/audio/end-quiz.mp3';
    } else {
      soundFile = '/assets/audio/sad.mp3';
    }

    const audio = new Audio(soundFile);
    audio.volume = 0.5;
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error('Error playing result sound:', error);
      });
    }
  } catch (error) {
    console.error('Error creating audio:', error);
  }
};