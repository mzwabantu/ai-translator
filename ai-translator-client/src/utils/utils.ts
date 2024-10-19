// Function to animate typing effect
export const animateTyping = (
  text: string,
  delay: number,
  setText: React.Dispatch<React.SetStateAction<string>>
) => {
  let index = 0;
  const interval = setInterval(() => {
    setText((prev) => prev + text?.charAt(index));
    index++;
    if (index === text.length) clearInterval(interval);
  }, delay);
};
